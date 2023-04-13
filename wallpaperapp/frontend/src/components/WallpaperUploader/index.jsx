import { animated } from "@react-spring/web";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import Fnav from "components/Fnav"
import ListImages from "./ListImages";
import UploaderImage from "./UploaderImage";
import EditImage from "./EditImage";
import { clientAxios } from "api/axios";

import styles from "./styles.module.css"

const upload_url = "/images/"

export default function WallpaperUploader({ theme }) {
    const [images, setImages] = useState([])
    const [imageURLs, setImageURLs] = useState([])
    const [stagedImages, setStagedImages] = useState([])
    const [activeImage, setActiveImage] = useState(null)

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
        setStagedImages(stagedImages.filter(img => !images.includes(img)))
        if (images.includes(activeImage)) setActiveImage(null)
    }

    const stageImage = (image, isStaged) => {
        if (isStaged) {
            // If image is already staged -> unstage
            setStagedImages(stagedImages.filter(img => img.url !== image.url))
        } else {
            // If image is not staged -> stage
            setStagedImages([...stagedImages, image])
        }
    }

    const onImageChange = (e) => {
        setImages([...e.target.files])
    }

    const uploadStagedImages = async () => {
        if(!stagedImages.length) throw new Error("No images were staged to upload")
        if(stagedImages.some(img => img.tags.length === 0)) throw new Error("One of the staged images has not tags")
        
        const uploaded = await Promise.all(stagedImages.map(async image => {
            return await clientAxios.postForm(upload_url, {
                image: image.file,
                tags: image.tags,
            }).then(() => {
                return image
            })
        }))

        return uploaded
    }

    const uploadStaged = () => {
        const promise = uploadStagedImages()
            .then(uploaded => {
                removeImages(uploaded)
                return uploaded.length
            })
            .catch(err => {
                console.log(err)
                throw err
            })
        
        toast.promise(promise, {
            loading: "Uploading images ...",
            success: (quantity) => `Uploaded ${quantity} images`,
            error: (err) => `${err.message}`,
        })
    }

    return (
        <animated.div className={styles.page} style={theme}>
            <Fnav theme={theme} />
            <animated.div className={styles.container_grid} style={theme}>
                <animated.div className={styles.edit_image_container} style={{ ...theme, backgroundColor: theme.blur_bg }}>
                    {activeImage && <EditImage
                        theme={theme}
                        image={activeImage}
                        removeImage={() => removeImages([activeImage])}
                        staged={stagedImages.includes(activeImage)}
                        setStaged={stageImage}
                    />}
                </animated.div>
                <animated.div className={styles.image_container} style={{ ...theme }}>
                    <UploaderImage image={activeImage} />
                </animated.div>
                <ListImages
                    theme={theme}
                    onImageChange={onImageChange}
                    imageList={imageURLs}
                    stagedList={stagedImages}
                    setActiveImage={setActiveImage}
                    uploadStaged={uploadStaged}
                />
            </animated.div>
        </animated.div>
    )
}