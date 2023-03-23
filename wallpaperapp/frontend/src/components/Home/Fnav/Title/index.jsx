import { AiOutlinePicture } from "react-icons/ai"

import styles from "../styles.module.css"

export default function Title() {
    return (
        <>
            <AiOutlinePicture className={styles.title}/>
            <h2 className={styles.title}>WallpaperApp</h2>
        </>
    )
}