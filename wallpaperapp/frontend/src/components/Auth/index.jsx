import { animated } from "@react-spring/web"
import { useState } from "react"

import Fnav from "components/Fnav"
import Wrapper from "./Wrapper"
import Login from "./Login"
import Register from "./Register"

import styles from "./styles.module.css"

export default function Auth({theme}) {
    const [register, setRegister] = useState(false)

    return (
        <>
            <animated.div className={styles.masonry} style={theme}/>
            <Fnav theme={theme} />
            <Wrapper theme={theme}>
                <Register theme={theme}/>
            </Wrapper>
        </>
    )
}