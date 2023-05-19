import { useEffect } from "react"
import { useSpring, animated, config } from "@react-spring/web"
import useMeasure from "react-use-measure"

import styles from "../styles.module.css"

export default function Tabs({ activeTab, changeTab, theme }) {
    const [padRef, padBounds] = useMeasure()
    const [uplRef, uplBounds] = useMeasure()
    const [upvRef, upvBounds] = useMeasure()
    const [favRef, favBounds] = useMeasure()

    const [blobProps, set] = useSpring(() => ({
        from: {
            width: uplBounds.width,
            height: uplBounds.height,
            left: Math.abs(uplBounds.left - padBounds.width),
        },
        config: config.gentle,
    }), [uplBounds, upvBounds, favBounds])

    const changeBlobPos = (bounds) => {
        set.start({ width: bounds.width, height: bounds.height, left: Math.abs(bounds.left - padBounds.width) })
    }

    useEffect(() => {
        if (activeTab === "Uploaded") {
            changeBlobPos(uplBounds)
        } else if (activeTab === "Upvoted") {
            changeBlobPos(upvBounds)
        } else if (activeTab === "Favourites") {
            changeBlobPos(favBounds)
        }
    })

    return (
        <>
            <animated.ul reg={padRef} className={styles.tabbedViewTabs} style={{ backgroundColor: theme.blur_bg }}>
                <li ref={uplRef} onClick={() => changeTab("Uploaded")} className={styles.tabbedViewTab}>
                    Uploaded
                </li>
                <li ref={upvRef} onClick={() => changeTab("Upvoted")} className={styles.tabbedViewTab}>
                    Upvoted
                </li>
                <li ref={favRef} onClick={() => changeTab("Favourites")} className={styles.tabbedViewTab}>
                    Favourites
                </li>
            </animated.ul>
            <animated.div className={styles.tabBlob} style={{ ...blobProps, backgroundColor: theme.backgroundColor }} />
        </>
    )
}