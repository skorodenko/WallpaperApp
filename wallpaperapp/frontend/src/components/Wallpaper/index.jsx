import { animated } from "@react-spring/web"
import { useParams } from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

import styles from "./styles.module.css"
import Fnav from "components/Fnav"
import MainImage from "./main-image"
import ImageInfo from "./image-info"
import { clientAxios, publicAxios } from "api/axios"


const fetchImageInfo = async (uuid) => {
    return await publicAxios(`/image/${uuid}/info`).then(res => res.data)
}

const fetchImageInfoPrivate = async (uuid) => {
    return await clientAxios(`/image/${uuid}/info_private`).then(res => res.data)
}

const updateImageInfoPrivate = async (mutation) => {
    return await clientAxios.post(`/image/${mutation.image}/info_private`, mutation)
}

export default function Wallpaper({theme}) {
    const { image_uuid } = useParams()
    const queryClient = useQueryClient()
    
    const privateQuery = useQuery({
        queryKey: ["imageInfoPrivate", image_uuid],
        queryFn: () => fetchImageInfoPrivate(image_uuid),
    })

    const publicQuery = useQuery({
        queryKey: ["imageInfo", image_uuid],
        queryFn: () => fetchImageInfo(image_uuid),
        cache: 100,
    })

    const mutatePrivateInfo = useMutation({
        mutationFn: updateImageInfoPrivate,
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ["imageInfoPrivate", image_uuid] })
            queryClient.refetchQueries({ queryKey: ["imageInfo", image_uuid] })
        },
    })

    return (
        <animated.div className={styles.page} style={theme}>
            <Fnav theme={theme} />
            <animated.div className={styles.container_grid} style={theme}>
                <animated.div className={styles.image_container} style={{ ...theme }}>
                    <MainImage image_uuid={image_uuid}/>
                </animated.div>
                <animated.div className={styles.image_info_container} style={{ ...theme, backgroundColor: theme.blur_bg }}>
                    <ImageInfo theme={theme} info={publicQuery.data} infoPrivate={privateQuery.data} mutatePrivateInfo={mutatePrivateInfo}/>
                </animated.div>
            </animated.div>
        </animated.div>
    )
}