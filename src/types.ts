import { Options } from "@better-scroll/core/src/Options";

export interface Unsubscribable {
    unsubscribe(): void;
}

export interface Observer {
    observe(callback: Function): Unsubscribable;
}

export interface PrettyScrollOptions extends Options {
    name?: string;
}

export type DOMEventCallback = (event: Event) => void;
