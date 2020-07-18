import { VueConstructor } from "vue/types/vue";
import { PrettyScrollDirective } from "./directive";
import { PrettyScrollOptions } from "./types";
import { PrettyScroll } from "./pretty-scroll";

function install(
    Vue: VueConstructor,
    options: Partial<PrettyScrollOptions> = {}
) {
    const { name = "pretty-scroll", ...config } = options;
    PrettyScroll.setDefaultConfig(config);
    Vue.directive(name, PrettyScrollDirective);
}

export default {
    install,
};
