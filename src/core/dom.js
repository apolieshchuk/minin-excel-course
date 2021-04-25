class Dom {
  constructor(selector) {
    // #app || event.target
    this.$el = typeof selector === 'string' ? document.querySelector(selector) : selector;
  }

  html(html) {
    // setter
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    }

    // getter
    return this.$el.outerHTML.trim();
  }

  clear() {
    this.html(' ');
    return this;
  }

  get data() {
    return this.$el.dataset;
  }

  getAttr(attr) {
    return this.$el.getAttribute(attr);
  }

  findByDataAttr(dataAttrName, dataAttrValue) {
    return Array.from(this.$el.querySelectorAll(`[${dataAttrName}='${dataAttrValue}']`))
        .map((el) => $(el));
  }

  findParentByDataAttr(dataAttrName, dataAttrValue) {
    return $(this.$el.closest(`[${dataAttrName}='${dataAttrValue}']`));
  }

  getCoords() {
    return this.$el.getBoundingClientRect();
  }

  css(styles = {}) {
    Object.keys(styles).forEach((styleName) => this.$el.style[styleName] = styles[styleName]);
    return this;
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el;
    }

    if (Element.prototype.append) {
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }

    return this;
  }
}

export function $(selector) {
  return new Dom(selector);
}

// static method of class DOM
$.create = (tagName, classes) => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
};


