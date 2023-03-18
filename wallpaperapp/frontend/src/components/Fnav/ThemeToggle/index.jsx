import { useSpring, useChain, useSpringRef, animated } from "@react-spring/web"

import { useDispatch } from "react-redux";
import { toggle } from "redux/themeSlice";

import { useSelector } from "react-redux";
import { selectTheme } from "redux/themeSlice"

import styles from "../styles.module.css"


export default function ThemeToggle() {
    const dispatch = useDispatch()
    const centralCircle = { cx: 20, cy: 20, r: 16 }
    const mode = useSelector(selectTheme)

    function polar2cart(angle, shown = false) {
        const hiddenBiasX = !shown * -4 
        const hiddenBiasY = !shown * 4 
        const x = hiddenBiasX + centralCircle.cx + shown * centralCircle.r * Math.cos(angle * Math.PI / 180)
        const y = hiddenBiasY + centralCircle.cy - shown * centralCircle.r * Math.sin(angle * Math.PI / 180)
        return { cx: x, cy: y, r: 2}
    }

    const ref_m2c = useSpringRef()
    const theme_m2c = useSpring({ref:ref_m2c,from:{opacity: 1},to:{opacity: 0},reverse: mode==="light"})
    const ref_cre = useSpringRef()
    const theme_cre = useSpring({ref:ref_cre,from:{r: centralCircle.r},to:{r: 0.65 * centralCircle.r},reverse: mode==="light"})
    const ref_sc1 = useSpringRef()
    const theme_sc1 = useSpring({ref:ref_sc1,from:{...polar2cart(90, false)},to:{...polar2cart(90, true)},reverse: mode==="light"})
    const ref_sc2 = useSpringRef()
    const theme_sc2 = useSpring({ref:ref_sc2,from:{...polar2cart(45, false)},to:{...polar2cart(45, true)},reverse: mode==="light"})
    const ref_sc3 = useSpringRef()
    const theme_sc3 = useSpring({ref:ref_sc3,from:{...polar2cart(0, false)},to:{...polar2cart(0, true)},reverse: mode==="light"})
    const ref_sc4 = useSpringRef()
    const theme_sc4 = useSpring({ref:ref_sc4,from:{...polar2cart(315, false)},to:{...polar2cart(315, true)},reverse: mode==="light"})
    const ref_sc5 = useSpringRef()
    const theme_sc5 = useSpring({ref:ref_sc5,from:{...polar2cart(270, false)},to:{...polar2cart(270, true)},reverse: mode==="light"})
    const ref_sc6 = useSpringRef()
    const theme_sc6 = useSpring({ref:ref_sc6,from:{...polar2cart(225, false)},to:{...polar2cart(225, true)},reverse: mode==="light"})
    const ref_sc7 = useSpringRef()
    const theme_sc7 = useSpring({ref:ref_sc7,from:{...polar2cart(180, false)},to:{...polar2cart(180, true)},reverse: mode==="light"})
    const ref_sc8 = useSpringRef()
    const theme_sc8 = useSpring({ref:ref_sc8,from:{...polar2cart(135, false)},to:{...polar2cart(135, true)},reverse: mode==="light"})

    const timeframes = [0,0,.3,.4,.5,.6,.7,.8,.9,1]
    const refs = [ref_m2c,ref_cre,ref_sc1,ref_sc2,ref_sc3,ref_sc4,ref_sc5,ref_sc6,ref_sc7,ref_sc8]

    useChain(mode === "light" ? refs : refs.reverse(), 
             mode === "light" ? timeframes : timeframes.reverse(), 
             350)

    
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 40 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            onClick={() => dispatch(toggle())}
            className={styles.toggle}
        >
            <mask id="mask">
                <rect x="0" y="0" width="100%" height="100%" fill="white" />
                <animated.circle cx={centralCircle.cx + 12} cy={centralCircle.cy - 6} r={centralCircle.r - 3} 
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
                <animated.circle style={theme_sc7} />
                <animated.circle style={theme_sc8} />
            </g>
        </svg>
    )
}