import { animated, useSpringRef, useChain } from "@react-spring/web"
import { useContext, useState } from "react"

import Fnav from "components/Fnav"
import Wrapper from "./Wrapper"
import Login from "./Login"
import Register from "./Register"

import styles from "./styles.module.css"
import { ThemeContext } from "components/Root/themeProvider"

export default function Auth() {
    const [register, setRegister] = useState(false)
    const {theme} = useContext(ThemeContext)

    const loginRef = useSpringRef()
    const registerRef = useSpringRef()

    const order = [loginRef, registerRef]
    useChain(register ? order : order.reverse())

    return (
        <>
            <animated.div className={styles.masonry} style={theme} />
            <Fnav />
            <Wrapper open={!register} refr={loginRef}>
                <Login to_register={() => setRegister(true)} />
            </Wrapper>
            <Wrapper open={register} refr={registerRef}>
                <Register to_login={() => setRegister(false)} />
            </Wrapper>
        </>
    )
}