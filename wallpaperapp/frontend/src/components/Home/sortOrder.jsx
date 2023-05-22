import { useContext, useEffect, useState } from "react"
import { useSpring, useTransition, animated, config } from "@react-spring/web"
import { useDispatch } from "react-redux"
import useMeasure from "react-use-measure"

import styles from "./styles.module.css"
import { changeSortOrder, changeSortDelta } from "redux/sortOrderSlice"
import { ThemeContext } from "components/Root/themeProvider"

export default function SortOrder({ sortOrder }) {
    const dispatch = useDispatch()
    const { theme } = useContext(ThemeContext)
    const [newRef, newBounds] = useMeasure()
    const [popRef, popBounds] = useMeasure()
    const [activeBounds, setActiveBounds] = useState(newBounds)

    const [blobProps, set] = useSpring(() => ({
        from: {
            width: newBounds.width,
            height: newBounds.height,
            left: newBounds.left,
        },
        config: config.gentle,
    }), [newBounds, popBounds])

    const transition = useTransition(sortOrder.sort === "popular" ? [sortOrder.sort] : [],
        {
            from: { scale: 0 },
            enter: { scale: 1 },
            leave: { scale: 0 },
        })

    useEffect(() => {
        set.start({
            width: activeBounds.width,
            height: activeBounds.height,
            left: activeBounds.left
        })
    })

    useEffect(() => {
        if (sortOrder.sort === "new") {
            setActiveBounds(newBounds)
        } else if (sortOrder.sort === "popular") {
            setActiveBounds(popBounds)
        }
    }, [sortOrder, newBounds, popBounds])

    return (
        <div className={styles.tabbedViewHeader}>
            <animated.ul className={styles.tabbedViewTabs} style={{ backgroundColor: theme.blur_bg }}>
                <li ref={newRef} onClick={() => dispatch(changeSortOrder("new"))} className={styles.tabbedViewTab}>
                    New
                </li>
                <li ref={popRef} onClick={() => dispatch(changeSortOrder("popular"))} className={styles.tabbedViewTab}>
                    Popular
                </li>
                {transition((style, item) => (
                    <animated.select
                        value={sortOrder.delta}
                        onChange={(e) => dispatch(changeSortDelta(e.target.value))}
                        disabled={sortOrder.sort !== "popular"}
                        className={styles.tabbedViewTabs}
                        style={{ ...style, ...theme, backgroundColor: theme.blur_bg }}
                    >
                        {["day", "week", "month", "year", "all"].map(delta => (
                            <option value={delta}>{delta}</option>
                        ))}
                    </animated.select>
                ))}
            </animated.ul>
            <animated.div className={styles.tabBlob} style={{ ...blobProps, backgroundColor: theme.backgroundColor }} />
        </div>
    )
}