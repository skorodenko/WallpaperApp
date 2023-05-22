import { Suspense, useContext, useRef, useState } from "react"
import { animated, useTransition } from "@react-spring/web"
import { useGesture } from "@use-gesture/react"
import { useSpring } from "@react-spring/web"
import { useQueryClient } from "@tanstack/react-query"
import { AiOutlineLoading } from "react-icons/ai"

import styles from "./styles.module.css"
import { AiOutlineUp } from "react-icons/ai"
import AlbumPage from "./albumPage"
import { ThemeContext } from "components/Root/themeProvider"



export default function Album({ fetchImages, queryKey }) {
    const ref = useRef()
    const {theme} = useContext(ThemeContext)
    const qclient = useQueryClient()
    const albumPageRef = useRef()
    const [showUpButton, setShowUpButton] = useState(false)
    const [restoredScroll, setRestoredScroll] = useState(false) // TODO Maybe can be rewroked

    const [, api] = useSpring(() => ({
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
            onDrag: ({ first, event, active, offset: [, oy], movement: [, my], overflow: [, ovy] }) => {
                if (active) event.stopPropagation()

                if (!restoredScroll && first) {
                    setRestoredScroll(true)
                    api.start({ y: - 1.5 * my - oy, immediate: true })
                } else if (ovy === -1) {
                    albumPageRef.current.fetchNext()
                } else {
                    api.start({ y: - 1.5 * my - oy })
                }
            },
            onWheel: ({ first, offset: [, oy], overflow: [, ovy] }) => {
                if (!restoredScroll && first) {
                    setRestoredScroll(true)
                    api.start({ y: oy, immediate: true })
                } else if (ovy === 1) {
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
                    <AlbumPage 
                        fetchImages={fetchImages} 
                        albumPageRef={albumPageRef} 
                        queryKey={queryKey}
                    />
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