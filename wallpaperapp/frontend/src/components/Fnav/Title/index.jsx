import { AiOutlinePicture } from "react-icons/ai"
import { Link } from "react-router-dom"

import styles from "../styles.module.css"

export default function Title() {
    return (
        <>
            <AiOutlinePicture className={styles.title} />
            <Link className={styles.dom_link} to={"/"}>
                <h2 className={styles.title}>WallpaperApp</h2>
            </Link>
        </>
    )
}