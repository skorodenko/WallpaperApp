import { useImperativeHandle } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useSelector } from "react-redux"

import styles from "./styles.module.css"
import ImageCard from "./imageCard"
import { selectTab } from "redux/userPageTab"
import { selectSortOrder } from "redux/sortOrderSlice"


export default function AlbumPage({ fetchImages, albumPageRef, queryKey }) {
    const activeTab = useSelector(selectTab)
    const sortOrder = useSelector(selectSortOrder)

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: [queryKey, sortOrder, activeTab],
        queryFn: fetchImages,
        getNextPageParam: (lastPage, allPages) => lastPage?.next,
        suspense: true,
        refetchOnWindowFocus: false,
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
        <>
            {
                data?.pages.map((group, i) => (
                    <div key={`Page ${i}`}>
                        <div key={i} className={styles.image_grid}>
                            {group.data.map((image) => (
                                <ImageCard key={image.uuid} image={image} />
                            ))}
                        </div>
                        <div key={`PageSeparator ${i}`} className={styles.page_separator}><div className={styles.separator}> <h2> Page {i + 1} </h2> </div></div>
                    </div>
                ))
            }
        </>
    )
}