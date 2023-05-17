import { Suspense, useState } from "react";
import { useDrag } from "@use-gesture/react";
import { useQuery } from "@tanstack/react-query";

import styles from "./styles.module.css"
import { publicAxios } from "api/axios";
import { AiOutlineLoading } from "react-icons/ai";

const fetchImage = async (uuid) => {
    const res = await publicAxios(`/image/${uuid}/`, { responseType: "blob", params: { "thumbnail": true } }).then(res => res.data)
    await new Promise((r) => setTimeout(r, 1000));
    return URL.createObjectURL(res)
}

function Image({ image, ...props }) {
    const { data } = useQuery({
        queryKey: ["image", image.uuid],
        queryFn: () => fetchImage(image.uuid),
        suspense: true,
        cacheTime: 100, // 100 msec
    })

    return <img alt={image.uuid} load="lazy" src={data} {...props} />
}

export default function ImageCard({ image, onClick, ...props }) {

    const bind = useDrag(
        ({ tap }) => {
            if (tap) console.log(image)
        },
        { filterTaps: true }
    );

    return (
        <Suspense fallback={<div className={styles.image_card}> <AiOutlineLoading className={styles.spinner}/> </div>}>
            <Image
                draggable="false"
                image={image}
                alt={image.uuid}
                className={styles.image_card}
                {...props}
                {...bind()}
            />
        </Suspense>
    )
}