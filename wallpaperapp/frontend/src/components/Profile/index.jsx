import { animated } from "@react-spring/web";
import styles from "./styles.module.css"
import Fnav from "components/Fnav";
import UserInfo from "./UserInfo";
import UserWallpapers from "./UserWallpapers";
import { useContext } from "react";
import { ThemeContext } from "components/Root/themeProvider";

export default function Profile() {
    const {theme} = useContext(ThemeContext)

    return (
        <animated.div className={styles.page} style={theme}>
            <Fnav />
            <animated.div className={styles.container_grid}>
                <animated.div className={styles.user_info_container} style={{...theme, backgroundColor: theme.blur_bg}}>
                    <UserInfo />
                </animated.div>
                <animated.div className={styles.user_wallpapers_container} style={theme}>
                    <UserWallpapers />
                </animated.div>
            </animated.div>
        </animated.div>
    )
}