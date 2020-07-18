import { Observer, Unsubscribable, DOMEventCallback } from "./types";
import { debounce } from "./tools";

const options = {
    subtree: true,
    childList: true,
    characterData: true,
};

export class MutationSubscriber implements Unsubscribable {
    constructor(private observer: MutationObserver) {}

    unsubscribe() {
        this.observer.disconnect();
    }
}

export class DOMEventSubscriber implements Unsubscribable {
    constructor(
        private root: HTMLElement | Window,
        private event: string,
        private callback: DOMEventCallback
    ) {}

    unsubscribe() {
        this.root.removeEventListener(this.event, this.callback);
    }
}

export class ContentObserver implements Observer {
    private observer: MutationObserver;

    constructor(private el: HTMLElement) {}

    observe(callback: MutationCallback): Unsubscribable {
        this.observer = new MutationObserver(callback);
        this.observer.observe(this.el, options);
        return new MutationSubscriber(this.observer);
    }
}

export class WindowResizeObserver implements Observer {
    private root: HTMLElement | Window;
    private event = "resize";
    private debounceTime = 300;
    private lastestTimer: number;
    private lastestEvent: Event;

    constructor(root?: HTMLElement) {
        this.root = root || window;
    }

    observe(callback: DOMEventCallback) {
        const debounced = debounce(callback, this.debounceTime);
        this.root.addEventListener(this.event, debounced);
        return new DOMEventSubscriber(this.root, this.event, debounced);
    }
}
