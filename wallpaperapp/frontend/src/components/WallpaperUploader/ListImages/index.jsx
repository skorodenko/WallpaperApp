import { animated, useSpring, config } from "@react-spring/web"
import { useDrag } from "@use-gesture/react"
import { createPortal } from "react-dom"
import { useContext, useEffect, useState } from "react"
import { AiOutlinePicCenter } from "react-icons/ai"

import ImageSlider from "./imageSlider"
import ImageCard from "./imageCard"
import styles from "../styles.module.css"
import { ThemeContext } from "components/Root/themeProvider"

const height = 435
const vheight = 35

export default function ListImages({ onImageChange, imageList, setActiveImage, upload }) {
    const [domReady, setDomReady] = useState(false)
    const [isOpen, setOpen] = useState(false)
    const {theme} = useContext(ThemeContext)

    useEffect(() => setDomReady(true), [domReady])

    const [{ y }, api] = useSpring(() => ({ y: height }))

    const open = ({ canceled }) => {
        api.start({ y: 0, immediate: false, config: canceled ? config.wobbly : config.stiff })
        setOpen(true)
    }
    const close = (velocity = 0) => {
        api.start({ y: height, immediate: false, config: { ...config.stiff, velocity } })
        setOpen(false)
    }

    const bind = useDrag(
        ({ last, velocity: [, vy], direction: [, dy], movement: [, my], cancel, canceled }) => {
            if (my < -70) cancel()

            if (last) {
                my > height * 0.5 || (vy > 0.5 && dy > 0) ? close(vy) : open({ canceled })
            }
            else api.start({ y: my, immediate: true })
        },
        { from: () => [0, y.get()], filterTaps: true, bounds: { top: 0 }, rubberband: true }
    )

    const display = y.to((py) => (py < height ? 'block' : 'none'))

    const bgStyle = {
        opacity: y.to([0, height], [1, 0], 'clamp'),
    }

    return (
        <>
            <animated.div
                className={styles.list_images_container}
                {...bind()}
                style={{ ...theme, display, bottom: `calc(-100vh + ${vheight}vh)`, y }}
            >
                <animated.div className={styles.list_images_controls}>
                    <animated.label
                        className={styles.add_button}
                        style={{ color: theme.backgroundColor, backgroundColor: theme.color }}
                    >
                        Add images
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={onImageChange}
                        />
                    </animated.label>
                    <animated.button
                        className={styles.add_button}
                        style={{ color: theme.backgroundColor, backgroundColor: theme.color }}
                        onClick={upload}
                    >
                        Upload
                    </animated.button>
                </animated.div>
                <ImageSlider theme={theme}>
                    {imageList.map((img, i) => {
                        return <ImageCard 
                                    key={i} 
                                    image={img} 
                                    setActive={setActiveImage}
                                    close={close}
                                />})}
                </ImageSlider>
            </animated.div>

            <animated.div className={styles.openButton} style={{ backgroundColor: theme.color, color: theme.backgroundColor }} onClick={open}>
                <AiOutlinePicCenter />
            </animated.div>

            {domReady && isOpen && createPortal(
                <animated.div
                    className={styles.list_images_container_overlay}
                    onClick={() => close()}
                    style={{ ...theme, backgroundColor: theme.blur_bg, ...bgStyle }}
                />, document.getElementById("overlay"))}
        </>
    )
}