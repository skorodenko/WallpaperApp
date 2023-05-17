import { animated } from "@react-spring/web"

import { publicAxios } from "api/axios"
import Fnav from "components/Fnav"
import Album from "components/Album"


const fetchImages = async ({ pageParam }) => {
    const res = await publicAxios(`/images/`, { params: { page: pageParam, sort: "new", page_size: 50 } }).then(res => res.data)
    return res
}

export default function Home({ theme }) {

    return (
        <animated.div style={theme}>
            <Fnav theme={theme} />
            <Album theme={theme} fetchImages={fetchImages} />
        </animated.div>
    )
}