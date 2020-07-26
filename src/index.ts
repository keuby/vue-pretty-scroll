import { PrettyScrollDirective } from './directive';
import { PrettyScrollOptions } from './types';
import { PrettyScroll } from './pretty-scroll';
import { PrettyScrollContainer } from './component';

function install(Vue: any, options: Partial<PrettyScrollOptions> = {}) {
  let { directiveName, componentName, ...config } = options;
  PrettyScroll.setDefaultConfig(config);

  if (directiveName != null && directiveName !== '') {
    PrettyScrollDirective.directiveName = name;
  } else {
    directiveName = PrettyScrollDirective.directiveName;
  }

  if (componentName != null && componentName !== '') {
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
