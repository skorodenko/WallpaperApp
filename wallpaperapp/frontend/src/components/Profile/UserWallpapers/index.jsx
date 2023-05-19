import { useState } from "react"
import { animated } from "@react-spring/web"
import { useNavigate } from "react-router-dom"

import Tabs from "./tabs"
import styles from "../styles.module.css"
import Album from "components/Album"
import { publicAxios } from "api/axios"

const fetchImages = async ({ pageParam }) => {
    const res = await publicAxios(`/images/`, { params: { page: pageParam, sort: "new", page_size: 50 } }).then(res => res.data)
    return res
}

export default function UserWallpapers({ theme }) {
    const [activeTab, changeTab] = useState("Uploaded")
    const navigate = useNavigate()

    const isUploadButtonVisible = activeTab === "Uploaded";

    return (
        <animated.div className={styles.tabbedView} style={theme}>
            <div className={styles.tabbedViewHeader}>
                <Tabs activeTab={activeTab} changeTab={changeTab} theme={theme} />
                {isUploadButtonVisible &&
                    <animated.button 
                        className={styles.uploadButton} 
                        style={{backgroundColor: theme.color, color: theme.backgroundColor}}
                        onClick={() => navigate("/profile/uploader")}
                    >
                        Upload
                    </animated.button>}
            </div>
            <div className={styles.tabbedViewContent}>
                <Album theme={theme} fetchImages={fetchImages} />
            </div>
        </animated.div>
    )
}