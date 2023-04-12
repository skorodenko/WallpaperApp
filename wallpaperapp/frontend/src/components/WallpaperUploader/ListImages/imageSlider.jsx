import { useSpring, animated } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";
import { useRef } from "react";

import styles from "../styles.module.css"

const springConfig = (vx) => ({
    friction: 40,
    tension: 230,
    restVelocity: vx,
})

export default function ImageSlider({ children }) {
    const ref = useRef()
    const [{ x }, api] = useSpring(() => ({ x: 0 }));

    const bind = useGesture(
        {
            onDrag: ({ event, offset: [ox], active, velocity: [vx] }) => {
                if (active) event.stopPropagation()
                api.start({ x: -ox, config: springConfig(vx) })
            },
            onWheel: ({ offset: [ox,oy], velocity: [vx,vy] }) => {
                api.start({ x: oy ? -oy : -ox, config: springConfig(vy) })
            },
        },
        {
            wheel: {
                axis: "y",
                bounds: () => ({
                        top: -ref.current.scrollWidth + ref.current.offsetWidth, 
                        bottom: 0,
                        left: -ref.current.scrollWidth + ref.current.offsetWidth,
                        right: 0,
                    }),
            },
            drag: {
                axis: "x",
                bounds: () => ({left: -ref.current.scrollWidth + ref.current.offsetWidth, right: 0}),
                from: () => [-ref.current.scrollLeft, 0],
            }
        }
    )

    return (
        <animated.div ref={ref} className={styles.list_images} scrollLeft={x} {...bind()} >
            {children}
        </animated.div>
    )
}