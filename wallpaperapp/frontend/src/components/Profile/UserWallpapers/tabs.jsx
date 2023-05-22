import { useContext, useEffect, useState } from "react"
import { useSpring, animated, config } from "@react-spring/web"
import { useDispatch } from "react-redux"
import useMeasure from "react-use-measure"

import { changeTab } from "redux/userPageTab"
import styles from "../styles.module.css"
import { ThemeContext } from "components/Root/themeProvider"

export default function Tabs({ activeTab }) {
    const dispatch = useDispatch()
    const [uplRef, uplBounds] = useMeasure()
    const [upvRef, upvBounds] = useMeasure()
    const [activeBounds, setActiveBounds] = useState(uplBounds)
    const {theme} = useContext(ThemeContext)

    const [blobProps, set] = useSpring(() => ({
        from: {
            width: uplBounds.width,
            height: uplBounds.height,
            left: uplBounds.left,
        },
        config: config.gentle,
    }), [uplBounds, upvBounds])

    useEffect(() => {
        set.start({
            width: activeBounds.width, 
            height: activeBounds.height, 
            left: activeBounds.left
        })
    })
    
    useEffect(() => {
        if (activeTab === "uploaded") {
            setActiveBounds(uplBounds)
        } else if (activeTab === "upvoted") {
            setActiveBounds(upvBounds)
        }
    }, [activeTab, uplBounds, upvBounds])

    return (
        <>
            <animated.ul className={styles.tabbedViewTabs} style={{ backgroundColor: theme.blur_bg }}>
                <li ref={uplRef} onClick={() => dispatch(changeTab("uploaded"))} className={styles.tabbedViewTab}>
                    Uploaded
                </li>
                <li ref={upvRef} onClick={() => dispatch(changeTab("upvoted"))} className={styles.tabbedViewTab}>
                    Upvoted
                </li>
            </animated.ul>
            <animated.div className={styles.tabBlob} style={{ ...blobProps, backgroundColor: theme.backgroundColor }} />
        </>
    )
}