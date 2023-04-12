
import styles from "../styles.module.css"

export default function UploaderImage({image}) {

    return (
        <div className={styles.image} style={{backgroundImage: `url(${image?.url})`}}/>
    )
}