import { PrettyScroll } from "./pretty-scroll";
import { looseEqual } from "./tools";

interface PrettyScrollHTMLElement extends HTMLElement {
    __scroll: PrettyScroll;
}

export const PrettyScrollDirective = {
    name: "pretty-scroll",
    inserted(el: PrettyScrollHTMLElement, binding: any) {
        const { selector, ...config } = binding.value || {};
        const scroll = (el.__scroll = new PrettyScroll(el, config));
        scroll.start(selector);
    },
    update(el: PrettyScrollHTMLElement, binding: any) {
        const selector = binding.value;
        const oldSelctor = binding.oldValue;
        if (!looseEqual(selector, oldSelctor)) {
            const { selector, ...config } = binding.value || {};
            el.__scroll.setConfig(config);
            el.__scroll.start(selector);
        }
    },
    componentUpdated(el: PrettyScrollHTMLElement) {
        el.__scroll && el.__scroll.update();
    },
    unbind(el: PrettyScrollHTMLElement, binding: any) {
        const scroll = el.__scroll;
        scroll && scroll.stop();
        el.__scroll = null;
    },
};
