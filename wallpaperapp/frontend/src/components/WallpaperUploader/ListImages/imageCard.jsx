import { animated } from "@react-spring/web"
import { useDrag } from "@use-gesture/react";

import styles from "../styles.module.css"

export default function ImageCard({ image, theme, setActive, ...props }) {
    const bind = useDrag(
        ({ tap }) => {
            if (tap) setActive(image)
        },
        { filterTaps: true }
    );

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
                }
            } 
        />
    )
}