import { animated } from "@react-spring/web"

import Fnav from "components/Fnav"

export default function Auth({theme}) {

    return (
        <animated.div style={theme}>
            <Fnav theme={theme} />
        </animated.div>
    )
}