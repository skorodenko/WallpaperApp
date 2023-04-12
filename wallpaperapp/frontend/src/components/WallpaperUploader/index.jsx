import { animated } from "@react-spring/web";
import { useEffect, useState } from "react";

import Fnav from "components/Fnav"
import ListImages from "./ListImages";
import UploaderImage from "./UploaderImage";
import EditImage from "./EditImage";

import styles from "./styles.module.css"

export default function WallpaperUploader({ theme }) {
    const [images, setImages] = useState([])
    const [imageURLs, setImageURLs] = useState([])
    const [stagedImages, setStagedImages] = useState([])
    const [activeImage, setActiveImage] = useState(null)

    useEffect(() => {
        if (images.length < 1) return;
        const newImageURLs = []
        images.forEach(image => newImageURLs.push({
            url: URL.createObjectURL(image),
            tags: [],
        }))
        setImageURLs(newImageURLs)
    }, [images])

    const removeImage = (image) => {
        if(image.url === activeImage.url) setActiveImage(null)
        if(stagedImages.includes(image)) setStagedImages(stagedImages.filter(img => img.url !== image.url))
        setImageURLs(imageURLs.filter(img => img.url !== image.url))
    }

    const stageImage = (image, isStaged) => {
        if(isStaged) {
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

    return (
        <animated.div className={styles.page} style={theme}>
            <Fnav theme={theme} />
            <animated.div className={styles.container_grid} style={theme}>
                <animated.div className={styles.edit_image_container} style={{...theme, backgroundColor: theme.blur_bg}}>
                    {activeImage && <EditImage 
                        theme={theme} 
                        image={activeImage}
                        removeImage={removeImage}
                        staged={stagedImages.includes(activeImage)}
                        setStaged={stageImage}
                    />}
                </animated.div>
                <animated.div className={styles.image_container} style={{...theme}}>
                    <UploaderImage image={activeImage}/>
                </animated.div>
                <ListImages 
                    theme={theme} 
                    onImageChange={onImageChange} 
                    imageList={imageURLs} 
                    stagedList={stagedImages}
                    setActiveImage={setActiveImage}
                />
            </animated.div>
        </animated.div>
    )
}