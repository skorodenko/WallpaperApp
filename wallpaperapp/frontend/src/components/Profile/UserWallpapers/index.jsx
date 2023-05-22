import { useContext } from "react"
import { animated } from "@react-spring/web"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

import Tabs from "./tabs"
import styles from "../styles.module.css"
import Album from "components/Album"
import { clientAxios } from "api/axios"
import { selectTab } from "redux/userPageTab"
import { ThemeContext } from "components/Root/themeProvider"


export default function UserWallpapers() {
    const navigate = useNavigate()
    const activeTab = useSelector(selectTab)
    const {theme} = useContext(ThemeContext)

    const isUploadButtonVisible = activeTab === "uploaded";

    const fetchImages = async ({ pageParam }) => {
        const res = await clientAxios(`/user/images`, { params: { page: pageParam, page_size: 50, "tab": activeTab } }).then(res => res.data)
        return res
    }
    
    return (
        <animated.div className={styles.tabbedView} style={theme}>
            <div className={styles.tabbedViewHeader}>
                <Tabs activeTab={activeTab} />
                {isUploadButtonVisible &&
                    <animated.button
                        className={styles.uploadButton}
                        style={{ backgroundColor: theme.color, color: theme.backgroundColor }}
                        onClick={() => navigate("/profile/uploader")}
                    >
                        Upload
                    </animated.button>}
            </div>
            <div className={styles.tabbedViewContent}>
                <Album fetchImages={fetchImages} queryKey={"personalImages"} />
            </div>
        </animated.div>
    )
}