import {useSpring, animated} from "@react-spring/web"

import { useSelector } from "react-redux";
import { selectTheme } from "redux/themeSlice"
import Fnav from "components/Fnav"
import { themes } from "themes/theming";
import "./index.css"

export default function Root() {
    const mode = useSelector(selectTheme)

    const [theme_props,] = useSpring(() => ({
        from: {...themes.light},
        to: {...themes.dark},
        reverse: mode === "light",
    }), [mode])

    return (
        <animated.div style={theme_props}>
            <Fnav theme={theme_props}/>
            <h1>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis purus varius, laoreet massa nec, tincidunt magna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut feugiat, urna ac rhoncus congue, odio sem tempus ex, ut mollis enim enim in sapien. Cras non orci ac est facilisis fermentum sed in erat. Curabitur et pharetra ipsum, non auctor purus. Praesent volutpat id nisi sed viverra. Aliquam a odio eu ligula posuere ultrices sed in tellus. Aliquam metus lectus, commodo nec feugiat ac, sollicitudin at magna. Praesent molestie pellentesque dapibus.

Aliquam nisl diam, luctus aliquam interdum vitae, finibus quis arcu. Sed in leo sed mi consequat venenatis. Nulla eu erat non metus facilisis scelerisque. Etiam sodales felis libero, non consectetur nulla ultrices ac. Sed ullamcorper sit amet dui sed euismod. Fusce tincidunt vestibulum mauris, maximus auctor eros feugiat non. Proin efficitur ut erat at vehicula. Morbi sed nisi suscipit, viverra lectus nec, efficitur lacus.

Donec luctus velit eget eros tincidunt, et cursus lectus sollicitudin. Cras at placerat nunc, sed bibendum massa. Pellentesque libero nisi, malesuada non vestibulum eu, auctor ut ex. In libero purus, congue eu quam ac, malesuada vehicula quam. Cras suscipit risus turpis, et viverra libero iaculis in. In pulvinar urna ut purus scelerisque, et hendrerit felis auctor. Fusce fringilla aliquam venenatis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse a enim sodales, dapibus est eget, placerat tellus. Phasellus porta et risus ac tempus. Donec purus magna, eleifend ut interdum quis, blandit non enim. Praesent venenatis volutpat odio, sed sagittis nunc. Nulla et fringilla enim.

Mauris quis ullamcorper mauris, eu porta velit. Aenean auctor sem ut diam maximus lacinia. Sed vitae ex vulputate leo ultricies sollicitudin. Mauris non tincidunt mauris. Nunc non iaculis tellus. Pellentesque est quam, venenatis in ultricies consectetur, vestibulum sit amet sem. In bibendum auctor purus, non mattis metus auctor sit amet. Maecenas id lectus magna.

In eget est diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam gravida, elit vel facilisis consectetur, velit diam luctus quam, in malesuada ex arcu id purus. Duis sit amet nunc ut nisi eleifend maximus. Integer urna urna, pulvinar vitae pulvinar nec, imperdiet quis nunc. Maecenas eleifend lobortis est at pharetra. Morbi non vestibulum libero, a vehicula velit. Pellentesque ut purus et leo consectetur dictum ac vitae nulla. Nulla ullamcorper posuere elit commodo posuere. Sed sit amet metus risus. Vestibulum elementum elit congue molestie vestibulum. Nulla vulputate quam neque, et sollicitudin lacus pellentesque vel. Nulla facilisi. Sed elementum viverra enim, vitae accumsan odio aliquet ac. Sed ac eleifend turpis, quis pellentesque nunc.

Sed commodo leo aliquet nulla dapibus, euismod ornare tortor volutpat. Proin dictum imperdiet turpis iaculis mollis. Suspendisse nec mi consequat, viverra ante eu, rutrum nibh. Sed ut neque dolor. Donec porta, neque et malesuada sollicitudin, elit lectus cursus metus, ut rhoncus diam massa quis dui. Proin faucibus nisi quis nulla malesuada, eu ornare ante commodo. Integer ipsum massa, finibus vel molestie et, aliquet a odio. Vestibulum et metus libero. Suspendisse finibus, dui eget semper fringilla, tortor purus accumsan diam, vel interdum urna lectus ut arcu. Ut maximus mollis leo sit amet sagittis.

Proin lorem turpis, fringilla sit amet consequat id, tristique at risus. Sed fermentum luctus nibh. Vivamus sodales, augue vitae luctus tincidunt, lectus nisi rutrum libero, id semper justo ipsum ac arcu. Sed auctor, nulla eget vulputate maximus, erat elit pulvinar lacus, nec malesuada arcu erat eu est. Quisque ultrices vel lacus at venenatis. Praesent sit amet nisi scelerisque, pulvinar erat non, sodales ante. Morbi eu urna mauris. Nulla eget nunc sollicitudin diam iaculis eleifend ac quis nunc. Sed pretium ut lorem eu rutrum. Phasellus tincidunt eros id varius auctor. Pellentesque nulla ipsum, pellentesque ac dolor eu, molestie convallis urna. Cras sollicitudin arcu eu orci finibus pellentesque. Vivamus ipsum quam, pulvinar et varius ac, ornare id sapien. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.

Phasellus pulvinar odio vel sem faucibus fringilla. Aliquam non volutpat lectus. Ut tempor facilisis est, vel suscipit orci volutpat nec. Nunc rutrum metus id augue pellentesque pellentesque. Maecenas justo velit, rutrum vel nulla ut, porta consectetur turpis. Morbi varius ante magna, sed accumsan neque semper nec. Praesent placerat in dolor id cursus. Aliquam augue ligula, elementum at ultricies sed, venenatis quis velit. Quisque consectetur libero nec urna viverra, non rhoncus odio tincidunt. Maecenas tellus est, gravida a tincidunt in, auctor a dui. Quisque et ligula ante. Suspendisse potenti. Suspendisse arcu velit, sagittis ac nisl id, tempus dictum eros. Mauris ex tellus, maximus non elementum at, dictum vel lacus.

Morbi sed dapibus nulla. Duis id tempor dui, in lobortis ligula. Vestibulum ullamcorper et neque at vestibulum. Integer eleifend risus eu vehicula finibus. Nam finibus vel sapien nec commodo. Sed blandit pulvinar neque, sed interdum ex. Vivamus quis eros non sapien ultrices congue. Aliquam libero sapien, sagittis vel faucibus non, commodo sed ante. Quisque sollicitudin molestie libero id dapibus. Ut at erat nec nulla lobortis consequat. Curabitur tempor felis vitae sollicitudin facilisis. Donec in elit ut eros porttitor dictum. Suspendisse sem nisi, fermentum eu vestibulum auctor, congue ut neque. Praesent blandit diam eget tortor bibendum hendrerit. Vestibulum dictum metus enim, aliquam lacinia odio volutpat et. Suspendisse consequat, magna sit amet ultricies porta, leo mauris sagittis enim, vel fringilla leo ipsum in metus.

Aliquam et felis in leo sagittis varius aliquam vel urna. Phasellus ullamcorper elit nulla, ac ultrices nisi maximus quis. Etiam dui quam, hendrerit quis blandit at, mollis vel orci. Maecenas quis quam in orci sodales hendrerit. Pellentesque elementum egestas lorem id pretium. Proin porttitor eu urna at maximus. Etiam pulvinar massa ante, a pretium urna pellentesque ac. Duis sed metus hendrerit, eleifend orci commodo, varius leo. Aenean elementum sed libero non tempus. Praesent est justo, accumsan hendrerit fringilla quis, tincidunt id lorem. Mauris sed eleifend lectus, vel accumsan turpis. Duis mattis, neque id euismod dictum, velit eros volutpat quam, ut sollicitudin nisl lorem a nisi. Morbi nec leo ligula. Vivamus efficitur finibus placerat. Donec volutpat feugiat ligula, non viverra nisl. Nulla imperdiet suscipit ex vel tempus.
            </h1>
        </animated.div>
    )
}