import BScroll from '@better-scroll/core';
import ScrollBar from '@better-scroll/scroll-bar';
import MouseWheel from '@better-scroll/mouse-wheel';

import { WindowResizeObserver } from './observer';
import { Unsubscribable } from './types';
import { override } from './tools';

BScroll.use(ScrollBar);
BScroll.use(MouseWheel);

export class PrettyScroll {
  static defaultConfig = {};
  static setDefaultConfig(config: Object) {
    const defaultConfig = PrettyScroll.defaultConfig;
    PrettyScroll.defaultConfig = override(defaultConfig, config);
  }

  private started = false;

  private selector: string;

  private root: HTMLElement;

  private container: HTMLElement;

  private scroll: BScroll;

  private subscription: Unsubscribable;

  private config: Partial<any> = {};

  constructor(root: HTMLElement | string, config: Partial<any> = {}) {
    if (root instanceof HTMLElement) {
      this.root = root;
    } else {
      this.root = document.querySelector(root);
    }

    this.config = { ...config };
  }

  start(selector?: string) {
    if (selector !== undefined) {
      this.selector = selector;
    }

    if (this.started) this.stop();

    this.container = this.getContainer(selector);

    if (this.container != null && this.container.children.length > 0) {
      const config = { ...PrettyScroll.defaultConfig, ...this.config };
      this.scroll = new BScroll(this.container, config);
      this.initObserver();
    }

    this.started = true;
  }

  update() {
    if (!this.started) return;
    this.scroll == null && this.start();
    this.scroll && this.scroll.refresh();
  }

  stop() {
    if (this.scroll != null) {
      this.scroll.destroy();
      this.scroll = null;
    }
    if (this.subscription != null) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
    this.container = null;
    this.started = false;
  }

  setConfig(config: Object) {
    this.config = override(this.config, config);
  }

  private getContainer(selector: string = this.selector) {
    if (selector == null) {
      return this.root;
    } else if (selector === 'parent') {
      return this.root.parentElement;
    } else {
      return this.root.querySelector(selector) as HTMLElement;
    }
  }

  private initObserver() {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }

    const observer = new WindowResizeObserver();
    this.subscription = observer.observe(() => {
      this.update();
    });
  }
}
