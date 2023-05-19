import { Suspense } from "react";
import { useQuery } from "@tanstack/react-query";

import styles from "./styles.module.css"
import { clientAxios } from "api/axios";
import { AiOutlineLoading } from "react-icons/ai";

const fetchImage = async (uuid) => {
    const res = await clientAxios(`/image/${uuid}/`, { responseType: "blob" }).then(res => res.data)
    return URL.createObjectURL(res)
}

function Image({ image_uuid, ...props }) {
    const { data } = useQuery({
        queryKey: ["image", image_uuid],
        queryFn: () => fetchImage(image_uuid),
        suspense: true,
    })

    return <img alt={image_uuid} src={data} {...props} />
}

export default function MainImage({ image_uuid }) {

    return (
        <div className={styles.image_container}>
            <Suspense fallback={<div className={styles.image_container}> <AiOutlineLoading className={styles.spinner} /> </div>}>
                <Image
                    draggable="false"
                    image_uuid={image_uuid}
                    className={styles.image}
                />
            </Suspense>
        </div>
    )
}
