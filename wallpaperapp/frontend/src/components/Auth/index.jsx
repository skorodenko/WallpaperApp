import { animated, useSpringRef, useChain } from "@react-spring/web"
import { useState } from "react"

import Fnav from "components/Fnav"
import Wrapper from "./Wrapper"
import Login from "./Login"
import Register from "./Register"

import styles from "./styles.module.css"

export default function Auth({ theme }) {
    const [register, setRegister] = useState(false)

    const loginRef = useSpringRef()
    const registerRef = useSpringRef()

    const order = [loginRef, registerRef]
    useChain(register ? order : order.reverse())

    return (
        <>
            <animated.div className={styles.masonry} style={theme} />
            <Fnav theme={theme} />
            <Wrapper theme={theme} open={!register} refr={loginRef}>
                <Login theme={theme} register={() => setRegister(true)} />
            </Wrapper>
            <Wrapper theme={theme} open={register} refr={registerRef}>
                <Register theme={theme} login={() => setRegister(false)} />
            </Wrapper>
        </>
    )
}