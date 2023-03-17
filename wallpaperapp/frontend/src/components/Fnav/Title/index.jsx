import styles from "../styles.module.css"
import {AiOutlinePicture} from "react-icons/ai"

export default function Title(props) {
    return (
        <>
            <h2 className={styles.title}><AiOutlinePicture/></h2>
            <h2 className={styles.title}>WallpaperApp</h2>
        </>
    )
}