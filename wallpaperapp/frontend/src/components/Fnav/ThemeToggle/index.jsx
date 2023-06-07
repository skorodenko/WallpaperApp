import { useSpring, useChain, useSpringRef, animated, config } from "@react-spring/web"

import { useDispatch } from "react-redux";
import { toggle } from "redux/themeSlice";

import { useSelector } from "react-redux";
import { selectTheme } from "redux/themeSlice"

import styles from "../styles.module.css"
import { useState } from "react";


export default function ThemeToggle() {
    const dispatch = useDispatch()
    const centralCircle = { cx: 33, cy: 33, r: 22 }
    const mode = useSelector(selectTheme)
    const [firstChange, setFirstChange] = useState(true)

    function polar2cart(angle, shown = false) {
        const extendRadius = 1.2
        const hiddenBiasX = !shown * -5 
        const hiddenBiasY = !shown * 5 
        const x = hiddenBiasX + centralCircle.cx + shown * extendRadius * centralCircle.r * Math.cos(angle * Math.PI / 180)
        const y = hiddenBiasY + centralCircle.cy - shown * extendRadius * centralCircle.r * Math.sin(angle * Math.PI / 180)
        return { cx: x, cy: y, r: 4}
    }

    const ref_m2c = useSpringRef()
    const theme_m2c = useSpring({ref:ref_m2c,from:{opacity: 1},to:{opacity: 0},reverse: mode==="light"})
    const ref_cre = useSpringRef()
    const theme_cre = useSpring({ref:ref_cre,from:{r: centralCircle.r},to:{r: 0.65 * centralCircle.r},reverse: mode==="light", config: config.stiff})
    const ref_sc1 = useSpringRef()
    const theme_sc1 = useSpring({ref:ref_sc1,from:{...polar2cart(90, false)},to:{...polar2cart(270, true)},reverse: mode==="light", config: config.stiff})
    const ref_sc2 = useSpringRef()
    const theme_sc2 = useSpring({ref:ref_sc2,from:{...polar2cart(45, false)},to:{...polar2cart(210, true)},reverse: mode==="light", config: config.stiff})
    const ref_sc3 = useSpringRef()
    const theme_sc3 = useSpring({ref:ref_sc3,from:{...polar2cart(0, false)},to:{...polar2cart(150, true)},reverse: mode==="light", config: config.stiff})
    const ref_sc4 = useSpringRef()
    const theme_sc4 = useSpring({ref:ref_sc4,from:{...polar2cart(315, false)},to:{...polar2cart(90, true)},reverse: mode==="light", config: config.stiff})
    const ref_sc5 = useSpringRef()
    const theme_sc5 = useSpring({ref:ref_sc5,from:{...polar2cart(270, false)},to:{...polar2cart(30, true)},reverse: mode==="light", config: config.stiff})
    const ref_sc6 = useSpringRef()
    const theme_sc6 = useSpring({ref:ref_sc6,from:{...polar2cart(225, false)},to:{...polar2cart(330, true)},reverse: mode==="light", config: config.stiff})

    const timeframes = !firstChange ? [1,1,.9,.8,.6,.4,.2,0] : [0,0,0,0,0,0,0,0]

    const refs = [ref_m2c,ref_cre,ref_sc1,ref_sc2,ref_sc3,ref_sc4,ref_sc5,ref_sc6]

    useChain(mode === "light" ? refs : refs.reverse(), 
            timeframes, 350)

    const onClick = () => {
        dispatch(toggle())
        setFirstChange(false)
    }

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 65 65"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            onClick={onClick}
            className={styles.toggle}
        >
            <mask id="mask">
                <rect x="0" y="0" width="100%" height="100%" fill="white" />
                <animated.circle cx={centralCircle.cx + 18} cy={centralCircle.cy - 10} r={centralCircle.r - 3} 
                    fill="black" style={theme_m2c} />
            </mask>
            <animated.circle fill="currentColor" cx={centralCircle.cx} cy={centralCircle.cy} r={centralCircle.r} 
                style={theme_cre} mask="url(#mask)" />
            <g stroke="currentColor" fill="currentColor">
                <animated.circle style={theme_sc1} />
                <animated.circle style={theme_sc2} />
                <animated.circle style={theme_sc3} />
                <animated.circle style={theme_sc4} />
                <animated.circle style={theme_sc5} />
                <animated.circle style={theme_sc6} />
            </g>
        </svg>
    )
}