import { animated } from "@react-spring/web";

import styles from "./styles.module.css"
import Fnav from "components/Fnav";
import UserInfo from "./UserInfo";
import UserWallpapers from "./UserWallpapers";
import { clientAxios } from "api/axios";

const USER_URL = "/auth/user/"

export default function Profile({ theme }) {

//    clientAxios.get(USER_URL)
//        .then((response) => {
//            console.log(response)
//        }).catch((err) => {
//            // You are not authenticated toast to /auth page
//            console.log(err)
//        })

    return (
        <animated.div className={styles.page} style={theme}>
            <Fnav theme={theme} />
            <animated.div className={styles.container_grid}>
                <animated.div className={styles.user_info_container} style={{...theme, backgroundColor: theme.blur_bg}}>
                    <UserInfo />
                </animated.div>
                <animated.div className={styles.user_wallpapers_container} style={theme}>
                    <UserWallpapers theme={theme} />
                </animated.div>
            </animated.div>
        </animated.div>
    )
}