import { Suspense, useEffect, useImperativeHandle, useRef, useState } from "react"
import { animated, config, useTransition } from "@react-spring/web"
import { useGesture } from "@use-gesture/react"
import { useSpring } from "@react-spring/web"
import { useQueryClient, useInfiniteQuery } from "@tanstack/react-query"
import { AiOutlineLoading } from "react-icons/ai"

import styles from "./styles.module.css"
import ImageCard from "./imageCard"
import { AiOutlineUp } from "react-icons/ai"
import { createPortal } from "react-dom"


function AlbumPage({ fetchImages, albumPageRef }) {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ["images"],
        queryFn: fetchImages,
        getNextPageParam: (lastPage, allPages) => lastPage?.next,
        suspense: true,
        cacheTime: 100,
    })

    useImperativeHandle(albumPageRef, () => ({
        fetchNext() {
            if (hasNextPage && !isFetchingNextPage) {
                fetchNextPage({
                    cancelRefetch: true,
                })
            }
        }
    }))

    return (
        data?.pages.map((group, i) => (
            <>
                <div key={i} className={styles.image_grid}>
                    {group.data.map((image) => (
                        <ImageCard key={image.uuid} image={image} />
                    ))}
                </div>
                <div className={styles.page_separator}><div className={styles.separator}> <h2> Page {i} </h2> </div></div>
            </>
        ))
    )
}


export default function Album({ fetchImages, theme }) {
    const ref = useRef()
    const qclient = useQueryClient()
    const albumPageRef = useRef()
    const [showUpButton, setShowUpButton] = useState(false)

    const [{ y }, api] = useSpring(() => ({
        y: 0,
        onChange: (props) => {
            window.scroll(0, props.value.y)
        },
        onRest: () => {
            if (window.scrollY > 0) {
                setShowUpButton(true)
            } else {
                setShowUpButton(false)
            }
        }
    }));

    const transition = useTransition(showUpButton ? [showUpButton] : [], {
        from: { scale: 0 },
        enter: { scale: 1 },
        leave: { scale: 0 },
    })

    const onUpButtonClick = () => {
        api.stop()
        api.start({
            y: 0,
            onRest: () => {
                qclient.resetQueries({
                    queryKey: ["images"],
                })
            },
        })
    }

    const bind = useGesture(
        {
            onDrag: ({ event, active, offset: [, oy], movement: [, my], overflow: [, ovy] }) => {
                if (active) event.stopPropagation()

                if (ovy === -1) {
                    albumPageRef.current.fetchNext()
                } else {
                    api.start({ y: - 1.5 * my - oy })
                }
            },
            onWheel: ({ offset: [, oy], overflow: [, ovy] }) => {
                if (ovy === 1) {
                    albumPageRef.current.fetchNext()
                } else {
                    api.start({ y: oy })
                }
            },
            onScroll: ({ event }) => {
                event.preventDefault()
            }
        },
        {
            wheel: {
                axis: "y",
                from: () => [0, window.scrollY],
                bounds: (state) => ({
                    top: 0,
                    bottom: document.body.scrollHeight - document.body.offsetHeight,
                }),
            },
            drag: {
                axis: "y",
                from: () => [0, -window.scrollY],
                bounds: (state) => ({
                    top: -document.body.scrollHeight + document.body.offsetHeight,
                    bottom: 0,
                }),
            }
        }
    )

    return (
        <>
            <div ref={ref} {...bind()}>
                <Suspense fallback={
                    <animated.div style={theme} className={styles.image_grid_loading}>
                        <AiOutlineLoading className={styles.spinner} />
                    </animated.div>
                }>
                    <AlbumPage fetchImages={fetchImages} albumPageRef={albumPageRef} />
                </Suspense>
            </div>
            {transition((style, item) => (
                <animated.div
                    className={styles.up_button}
                    style={{ ...style, backgroundColor: theme.color, color: theme.backgroundColor }}
                    onClick={onUpButtonClick}
                >
                    <AiOutlineUp />
                </animated.div>
            ))}
        </>
    )
}