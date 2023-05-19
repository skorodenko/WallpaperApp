import { animated } from "@react-spring/web";
import { useEffect } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { useSpring } from "@react-spring/web";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

import styles from "./styles.module.css"

export default function ImageInfo({ theme, info, infoPrivate, mutatePrivateInfo }) {
    const userVote = infoPrivate?.vote

    const [animUp, apiUp] = useSpring(() => ({...theme}))
    const [animDown, apiDown] = useSpring(() => ({...theme}))

    useEffect(() => {
        switch (userVote) {
            case 1:
                apiUp.start({color: theme.backgroundColor, backgroundColor: theme.color})
                apiDown.start({...theme})
                break
            case -1:
                apiUp.start({...theme})
                apiDown.start({color: theme.backgroundColor, backgroundColor: theme.color})
                break
            default:
                apiUp.start({...theme})
                apiDown.start({...theme})
        }
    })

    const onClick = (action) => {
        console.log(userVote)
        if (action === "upvote") {
            mutatePrivateInfo.mutate({image: info.uuid, vote: userVote === 0 || userVote === -1 ? 1 : 0})
        } else if (action === "downvote") {
            mutatePrivateInfo.mutate({image: info.uuid, vote: userVote === 0 || userVote === 1 ? -1 : 0})
        }
    }

    return (
        <>
            <animated.div className={styles.image_info} style={{ ...theme, backgroundColor: theme.blur_bg }}>
                <h3>Uploaded by:</h3>
                <p>{info?.uploaded_by || <Skeleton />}</p>
            </animated.div>
            <animated.div className={styles.image_tags} style={{ ...theme, backgroundColor: theme.blur_bg }}>
                <h3>Tags:</h3>
                {info?.tags.map(tag => (
                    <animated.div style={theme}>
                        <p>{tag.name}</p>
                    </animated.div>
                ))}
            </animated.div>
            <div className={styles.image_votes}>
                <animated.button style={animUp} onClick={() => onClick("upvote")}>
                    {info?.upvotes} <AiOutlineUp />
                </animated.button>
                <animated.button style={animDown} onClick={() => onClick("downvote")}>
                    {info?.downvotes} <AiOutlineDown />
                </animated.button>
            </div>
        </>
    )
}