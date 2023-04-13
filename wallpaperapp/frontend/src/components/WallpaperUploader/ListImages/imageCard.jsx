import { animated } from "@react-spring/web"
import { useDrag } from "@use-gesture/react";

import styles from "../styles.module.css"

export default function ImageCard({ image, theme, staged, setActive, ...props }) {
    const bind = useDrag(
        ({ tap }) => {
            if (tap) setActive(image)
        },
        { filterTaps: true }
    );

    const border = staged ? "solid 2px green" : "none"

    return (
        <animated.div 
            {...props} 
            {...bind()} 
            className={styles.image_card} 
            style={
                {
                    ...theme,
                    backgroundImage: `url(${image.url})`,
                    backgroundColor: theme.blur_bg,
                    border: border
                }
            } 
        />
    )
}