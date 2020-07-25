export interface Unsubscribable {
    unsubscribe(): void;
}

export interface Observer {
    observe(callback: Function): Unsubscribable;
}

export interface PrettyScrollOptions {
    name?: string;
    [x: string]: any;
}

export type DOMEventCallback = (event: Event) => void;
