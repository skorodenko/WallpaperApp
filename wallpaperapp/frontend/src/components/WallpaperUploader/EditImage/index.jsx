import { animated } from "@react-spring/web";
import { TagsInput } from "react-tag-input-component";

import styles from "../styles.module.css"


export default function EditImage({ image, theme, removeImage, staged, setStaged }) {

    const setTags = (tags) => {
        image.tags = tags.map(tag => ({name: tag}))
    }

    return (
        <>
            <animated.div className={styles.edit_controls}>
                <animated.button
                    className={styles.stage_button}
                    style={{ color: theme.backgroundColor, backgroundColor: theme.color }}
                    onClick={() => setStaged(image, staged)}
                >
                    {staged ? "Unstage changes" : "Stage changes"}
                </animated.button>
                <animated.button
                    className={styles.remove_button}
                    style={{ color: theme.backgroundColor, backgroundColor: theme.color }}
                    onClick={removeImage}
                >
                    Remove image
                </animated.button>
            </animated.div>
            <div className={styles.edit_tags} style={{color: "black"}}>
                <TagsInput
                    value={image.tags.map(tag => tag.name)}
                    onChange={setTags}
                    placeHolder="Enter image tags"
                />
            </div>
        </>
    )
}