import {capitalize} from '@core/utils';

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No $root provided for DOM Listener');
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    // THIS - here is FORMULA COMPONENT CALL FROM EXCEL component!!!
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);

      if (!this[method]) {
        throw new Error(`Method ${method} is not implement in ${this.name || ''} Component`);
      }

      // for removing listeners: bind create new function!
      this[method] = this[method].bind(this);

      this.$root.on(listener, this[method]);
    });
  }

  removeDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);

      if (!this[method]) {
        throw new Error(`Method ${method} is not implement in ${this.name || ''} Component`);
      }

      this.$root.off(listener, this[method]);
    });
  }
}

function getMethodName(eventName) {
  return `on${capitalize(eventName)}`;
}
