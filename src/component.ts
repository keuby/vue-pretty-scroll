import { RenderContext } from "vue/types/options";
import { CreateElement } from "vue/types/vue";
import { PrettyScrollDirective } from "./directive";
import { VNodeData } from "vue/types/vnode";

const needCopyProps = ["staticClass", "staticStyle", "class", "style", "attrs"];

export const PrettyScrollContainer = {
    name: "PrettyScroll",
    functional: true,
    render(createElement: CreateElement, context: RenderContext) {
        const { className, hasWrapper } = context.props;

        const nodeData = buildVNodeData(context);

        if (hasWrapper != null && hasWrapper !== false) {
            const style: any = nodeData.style || (nodeData.style = {});
            style.position = "relative";
            style.overflow = "hidden";
            return createElement("div", nodeData, [
                createElement(
                    "div",
                    {
                        staticClass: className,
                    },
                    context.children
                ),
            ]);
        } else {
            nodeData.directives[0].value.selector = "parent";
            if (className) {
                if (nodeData.staticClass) {
                    nodeData.staticClass += " " + className;
                } else {
                    nodeData.staticClass = className;
                }
            }
            return createElement("div", nodeData, context.children);
        }
    },
};

function buildVNodeData(context: RenderContext) {
    const { hasWrapper = false, ...props } = context.props;

    for (const prop in props) {
        if (props[prop] === "") {
            props[prop] = true;
        }
    }

    const data: VNodeData = {};
    for (const prop of needCopyProps) {
        const value = context.data[prop];
        value != null && (data[prop] = value);
    }

    const directive = {
        name: PrettyScrollDirective.name,
        value: props,
    };

    data.directives = [directive];

    return data;
}
