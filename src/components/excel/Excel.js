import {$} from '@core/dom';

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
  }

  getRoot() {
    const $root = $.create('div', 'excel');

    // create all components instance and render templates
    this.components = this.components.map((Component) => {
      // set component base div wrapper
      const $el = $.create('div', Component.className);

      // create component
      const component = new Component($el);

      // DEBUG
      if (component.name) {
        window[`c${component.name}`] = component;
      }

      // set component content
      $el.html(component.toHTML());

      $root.append($el);

      return component;
    });

    return $root;
  }

  render() {
    this.$el.append(this.getRoot());

    this.components.forEach((component) => component.init());
  }
}
