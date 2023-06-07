import { animated } from "@react-spring/web";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import Fnav from "components/Fnav"
import ListImages from "./ListImages";
import UploaderImage from "./UploaderImage";
import EditImage from "./EditImage";
import { clientAxios } from "api/axios";

import styles from "./styles.module.css"
import { ThemeContext } from "components/Root/themeProvider";

const upload_url = "/images/"

export default function WallpaperUploader() {
    const [images, setImages] = useState([])
    const [imageURLs, setImageURLs] = useState([])
    const [activeImage, setActiveImage] = useState(null)
    const {theme} = useContext(ThemeContext)

    useEffect(() => {
        if (images.length < 1) return;
        const newImageURLs = []
        images.map(image => {
            const url = URL.createObjectURL(image)
            newImageURLs.push({
                url: url,
                file: image,
                tags: [],
            })
            return { url: url, file: image }
        })
        setImageURLs(newImageURLs)
        setImages([])
    }, [images])

    const removeImages = (images) => {
        setImageURLs(imageURLs.filter(img => !images.includes(img)))
        if (images.includes(activeImage)) setActiveImage(null)
    }

    const onImageChange = (e) => {
        setImages([...e.target.files])
    }

    const uploadImages = async () => {
        if(!imageURLs.length) throw new Error("No images to upload")
        //if(imageURLs.some(img => img.tags.length === 0)) throw new Error("One of the images has not tags")
        
        const uploaded = await Promise.all(imageURLs.map(async image => {
            return await clientAxios.postForm(upload_url, {
                image: image.file,
                tags: image.tags,
            }).then(() => {
                return image
            }).catch(() => {
                return null
            })
        }))

        return uploaded
    }

    const upload = () => {
        const init_len = imageURLs.length
        
        const promise = uploadImages()
            .then(uploaded => {
                const images = uploaded.filter(img => img)
                if (init_len !== 0 && images.length === 0) {
                    throw new Error(`Any image wasn't uploaded`)
                }
                removeImages(images)
                return images.length
            })
        
        toast.promise(promise, {
            loading: "Uploading images ...",
            success: (quantity) => `Uploaded ${init_len}/${quantity} images`,
            error: (err) => `${err.message}`,
        })
    }

    return (
        <animated.div className={styles.page} style={theme}>
            <Fnav />
            <animated.div className={styles.container_grid} style={theme}>
                <animated.div className={styles.edit_image_container} style={{ ...theme, backgroundColor: theme.blur_bg }}>
                    {activeImage && <EditImage
                        image={activeImage}
                        removeImage={() => removeImages([activeImage])}
                    />}
                </animated.div>
                <animated.div className={styles.image_container} style={{ ...theme }}>
                    <UploaderImage image={activeImage} />
                </animated.div>
                <ListImages
                    onImageChange={onImageChange}
                    imageList={imageURLs}
                    setActiveImage={setActiveImage}
                    upload={upload}
                />
            </animated.div>
        </animated.div>
    )
}