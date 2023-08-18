import { Suspense } from "react";
import { useDrag } from "@use-gesture/react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import styles from "./styles.module.css"
import { publicAxios } from "api/axios";
import { AiOutlineLoading } from "react-icons/ai";

const fetchImage = async (uuid, signal) => {
    const res = await publicAxios(`/image/${uuid}/`, { responseType: "blob", params: { "thumbnail": true }, signal }).then(res => res.data)
    return URL.createObjectURL(res)
}

function Image({ image, ...props }) {
    //const { data } = useQuery({
    //    queryKey: ["imageThumbnail", image.uuid],
    //    queryFn: ({ signal }) => fetchImage(image.uuid, signal),
    //    suspense: true,
    //    refetchOnWindowFocus: false,
    //})

    return <img alt={image.uuid} load="lazy" src={image.image} {...props} />
}

export default function ImageCard({ image, onClick, ...props }) {
    const navigate = useNavigate()

    const bind = useDrag(
        ({ tap }) => {
            if (tap) navigate(`/image/${image.uuid}`)
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