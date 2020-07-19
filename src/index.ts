import { VueConstructor } from "vue/types/vue";
import { PrettyScrollDirective } from "./directive";
import { PrettyScrollOptions } from "./types";
import { PrettyScroll } from "./pretty-scroll";
import { PrettyScrollContainer } from "./component";

function install(
    Vue: VueConstructor,
    options: Partial<PrettyScrollOptions> = {}
) {
    let { directiveName, componentName, ...config } = options;
    PrettyScroll.setDefaultConfig(config);

    if (directiveName != null && directiveName !== "") {
        PrettyScrollDirective.name = name;
    } else {
        directiveName = PrettyScrollDirective.name;
    }

    if (componentName != null && componentName !== "") {
        PrettyScrollContainer.name = name;
    } else {
        componentName = PrettyScrollContainer.name;
    }

    Vue.directive(directiveName, PrettyScrollDirective);
    Vue.component(componentName, PrettyScrollContainer);
}

export default {
    install,
};
