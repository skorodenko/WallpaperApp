import { animated } from "@react-spring/web"
import { useDrag } from "@use-gesture/react";

import styles from "../styles.module.css"
import { useContext } from "react";
import { ThemeContext } from "components/Root/themeProvider";

export default function ImageCard({ image, close, setActive, ...props }) {
    const {theme} = useContext(ThemeContext)
    
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
            onClick={close}
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