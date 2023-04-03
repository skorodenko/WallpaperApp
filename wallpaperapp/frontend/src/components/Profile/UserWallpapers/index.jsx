import { useState } from "react"
import { animated } from "@react-spring/web"

import Tabs from "./tabs"
import styles from "../styles.module.css"

export default function UserWallpapers({ theme }) {
    const [activeTab, changeTab] = useState("Uploaded")

    const isUploadButtonVisible = activeTab === "Uploaded";

    return (
        <animated.div className={styles.tabbedView} style={theme}>
            <div className={styles.tabbedViewHeader}>
                <Tabs activeTab={activeTab} changeTab={changeTab} theme={theme} />
                {isUploadButtonVisible &&
                    <animated.button 
                        className={styles.uploadButton} 
                        style={{backgroundColor: theme.color, color: theme.backgroundColor}}
                    >
                        Upload
                    </animated.button>}
            </div>
            <div className={styles.tabbedViewContent}>
                TEST
            </div>
        </animated.div>
    )
}