import axios from "axios"
import { useState } from "react"
import useSWR from "swr"

import Image from "./Image"
import styles from "./styles.module.css"


const fetcher = url => axios.get(url).then(r => r.data)

function AlbumPage({index}) {
    const {data, error, isLoading} = useSWR(`http://127.0.0.1:8000/images/?sort=new&page=${index}`, fetcher);

    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>

    return data.results.map(item => <Image image={item.image}/>)
}

export default function Album({theme}) {
    const [pageIndex, setPageIndex] = useState(1);

    return (
        <div>
            <AlbumPage index={pageIndex}/>
        </div>
    )
}