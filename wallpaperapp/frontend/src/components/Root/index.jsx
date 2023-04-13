import { useSpring } from "@react-spring/web"
import { Toaster } from "react-hot-toast"
import {
    BrowserRouter,
    Route,
    Routes,
} from "react-router-dom";

import store from "redux/store";
import { useSelector } from "react-redux";
import { selectTheme } from "redux/themeSlice"
import Home from "components/Home"
import Auth from "components/Auth"
import WallpaperUploader from "components/WallpaperUploader";
import Profile from "components/Profile";
import { themes } from "themes/theming";
import "./index.css"
import { setupAxiosInterceptors } from "api/axios";
import { useEffect } from "react";

export default function Root() {
    const mode = useSelector(selectTheme)

    const [theme_props,] = useSpring(() => ({
        from: { ...themes.light },
        to: { ...themes.dark },
        reverse: mode === "light",
    }), [mode])

    useEffect(() => setupAxiosInterceptors(store))

    return (
        <>
            <div id="modal"></div>
            <div id="overlay"></div>
            
            <BrowserRouter>
                <Routes>
                    <Route
                        element={<Home theme={theme_props} />}
                        path="/"
                    />
                    
                    <Route
                        element={<Profile theme={theme_props} />}
                        path="/profile"
                    />
                    
                    <Route
                        element={<WallpaperUploader theme={theme_props} />}
                        path="/profile/uploader"
                    />

                    <Route
                        element={<Auth theme={theme_props} />}
                        path="/auth"
                    />
                </Routes>
            </BrowserRouter>
            
            <Toaster
                position="bottom-center"
                containerStyle={{
                    transform: "translateY(-5%)"
                }}
                toastOptions={{
                    style: {
                        background: mode === "light"
                            ? themes.light.color
                            : themes.dark.color,
                        color: mode === "light"
                            ? themes.light.backgroundColor
                            : themes.dark.backgroundColor,
                    }
                }}
            />
        </>
    )
}