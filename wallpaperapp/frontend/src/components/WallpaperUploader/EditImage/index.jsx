import { animated } from "@react-spring/web";
import { TagsInput } from "react-tag-input-component";

import styles from "../styles.module.css"


export default function EditImage({ image, theme, removeImage }) {

    const setTags = (tags) => {
        image.tags = tags.map(tag => ({ name: tag }))
    }

    return (
        <>
            <animated.button
                className={styles.remove_button}
                style={{ color: theme.backgroundColor, backgroundColor: theme.color }}
                onClick={removeImage}
            >
                Remove image
            </animated.button>
            <div className={styles.edit_tags} style={{ color: "black" }}>
                <TagsInput
                    value={image.tags.map(tag => tag.name)}
                    onChange={setTags}
                    placeHolder="Enter image tags"
                />
            </div>
        </>
    )
}