import { animated } from "@react-spring/web"

import { publicAxios } from "api/axios"
import Fnav from "components/Fnav"
import Album from "components/Album"
import SortOrder from "./sortOrder"
import { useSelector } from "react-redux"
import { selectSortOrder } from "redux/sortOrderSlice"
import { useContext } from "react"
import { ThemeContext } from "components/Root/themeProvider"


export default function Home() {
    const { theme } = useContext(ThemeContext)
    const sortOrder = useSelector(selectSortOrder)

    const fetchImages = async ({ pageParam }) => {
        const res = await publicAxios(`/images/`, { params: { page: pageParam, page_size: 50, ...sortOrder } }).then(res => res.data)
        return res
    }

    return (
        <animated.div style={theme}>
            <Fnav />
            <SortOrder sortOrder={sortOrder} />
            <Album fetchImages={fetchImages} queryKey={"images"} />
        </animated.div>
    )
}