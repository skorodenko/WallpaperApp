import { useSpring } from "@react-spring/web"
import { Toaster } from "react-hot-toast"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SkeletonTheme } from "react-loading-skeleton";
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
import Wallpaper from "components/Wallpaper";
import { themes } from "shared/themes";
import "./index.css"
import { setupAxiosInterceptors } from "api/axios";
import { useEffect } from "react";
import { animated } from "@react-spring/web";

const queryClient = new QueryClient()

export default function Root() {
    const mode = useSelector(selectTheme)

    const [theme_props, theme_api] = useSpring(() => (mode === "light" ? themes.light : themes.dark))

    useEffect(() => {
        mode === "light" ? theme_api.start(themes.light)
                         : theme_api.start(themes.dark)
    })

    useEffect(() => setupAxiosInterceptors(store))

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <div id="modal"></div>
                <div id="overlay"></div>
                <animated.div style={theme_props} className={"colored_static_root"}/>

                <SkeletonTheme baseColor={theme_props.color.get()} highlightColor={theme_props.backgroundColor.get()}>
                    <BrowserRouter>
                        <Routes>
                            <Route
                                element={<Home theme={theme_props} />}
                                path="/"
                            />

                            <Route
                                element={<Wallpaper theme={theme_props}/>}
                                path="/image/:image_uuid"
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
                </SkeletonTheme>

                <Toaster
                    position="bottom-center"
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
            </QueryClientProvider>
        </>
    )
}