/**
 * vue-pretty-scroll v1.0.0
 * release at 2020-7-18
 * by Knight Chen
 * github https://github.com/keuby/vue-pretty-scroll#readme
 */

import BScroll from '@better-scroll/core';
import ScrollBar from '@better-scroll/scroll-bar';
import MouseWheel from '@better-scroll/mouse-wheel';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function isObject(obj) {
  return obj !== null && _typeof(obj) === "object";
}
function looseEqual(a, b) {
  if (a === b) return true;
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);

  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);

      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i]);
        });
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key]);
        });
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
}
function override(target, source) {
  if (!isObject(source)) return target;

  for (var prop in source) {
    target[prop] = source[prop];
  }

  return target;
}
function debounce(callback, time) {
  var _this = this;

  if (time === void 0) {
    time = 300;
  }

  var lastestValue;
  var timer;
  return function (value) {
    lastestValue = value;

    if (timer != null) {
      clearTimeout(_this.lastestTimer);
      timer = null;
    }

    timer = setTimeout(function () {
      callback(lastestValue);
    }, time);
  };
}

var DOMEventSubscriber =
/** @class */
function () {
  function DOMEventSubscriber(root, event, callback) {
    this.root = root;
    this.event = event;
    this.callback = callback;
  }

  DOMEventSubscriber.prototype.unsubscribe = function () {
    this.root.removeEventListener(this.event, this.callback);
  };

  return DOMEventSubscriber;
}();

var WindowResizeObserver =
/** @class */
function () {
  function WindowResizeObserver(root) {
    this.event = "resize";
    this.debounceTime = 300;
    this.root = root || window;
  }

  WindowResizeObserver.prototype.observe = function (callback) {
    var debounced = debounce(callback, this.debounceTime);
    this.root.addEventListener(this.event, debounced);
    return new DOMEventSubscriber(this.root, this.event, debounced);
  };

  return WindowResizeObserver;
}();

BScroll.use(ScrollBar);
BScroll.use(MouseWheel);

var PrettyScroll =
/** @class */
function () {
  function PrettyScroll(root, config) {
    if (config === void 0) {
      config = {};
    }

    this.started = false;
    this.config = {};

    if (root instanceof HTMLElement) {
      this.root = root;
    } else {
      this.root = document.querySelector(root);
    }

    this.config = __assign({}, config);
  }

  PrettyScroll.setDefaultConfig = function (config) {
    var defaultConfig = PrettyScroll.defaultConfig;
    PrettyScroll.defaultConfig = override(defaultConfig, config);
  };

  PrettyScroll.prototype.start = function (selector) {
    if (selector !== undefined) {
      this.selector = selector;
    }

    if (this.started) this.stop();
    this.container = this.getContainer(selector);

    if (this.container != null) {
      var config = __assign(__assign({}, PrettyScroll.defaultConfig), this.config);

      this.scroll = new BScroll(this.container, config);
      this.initObserver();
    }

    this.started = true;
  };

  PrettyScroll.prototype.update = function () {
    if (!this.started) return;
    this.scroll == null && this.start();
    this.scroll && this.scroll.refresh();
  };

  PrettyScroll.prototype.stop = function () {
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
  };

  PrettyScroll.prototype.setConfig = function (config) {
    this.config = override(this.config, config);
  };

  PrettyScroll.prototype.getContainer = function (selector) {
    if (selector === void 0) {
      selector = this.selector;
    }

    if (selector != null) {
      return this.root.querySelector(selector);
    } else {
      return this.root;
    }
  };

  PrettyScroll.prototype.initObserver = function () {
    var _this = this;

    if (this.subscription != null) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }

    var observer = new WindowResizeObserver();
    this.subscription = observer.observe(function () {
      _this.update();
    });
  };

  PrettyScroll.defaultConfig = {};
  return PrettyScroll;
}();

var PrettyScrollDirective = {
  inserted: function inserted(el, binding) {
    var _a = binding.value || {},
        selector = _a.selector,
        config = __rest(_a, ["selector"]);

    var scroll = el.__scroll = new PrettyScroll(el, config);
    scroll.start(selector);
  },
  update: function update(el, binding) {
    var selector = binding.value;
    var oldSelctor = binding.oldValue;

    if (!looseEqual(selector, oldSelctor)) {
      var _a = binding.value || {},
          selector_1 = _a.selector,
          config = __rest(_a, ["selector"]);

      el.__scroll.setConfig(config);

      el.__scroll.start(selector_1);
    }
  },
  componentUpdated: function componentUpdated(el) {
    el.__scroll && el.__scroll.update();
  },
  unbind: function unbind(el, binding) {
    var scroll = el.__scroll;
    scroll && scroll.stop();
    el.__scroll = null;
  }
};

function install(Vue, options) {
  if (options === void 0) {
    options = {};
  }

  var _a = options.name,
      name = _a === void 0 ? "pretty-scroll" : _a,
      config = __rest(options, ["name"]);

  PrettyScroll.setDefaultConfig(config);
  Vue.directive(name, PrettyScrollDirective);
}

var index = {
  install: install
};

export default index;
