import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';

export class Table extends ExcelComponent {
  static className = 'excel__table'
  _resizingStarted = false;
  _resizedElements = null;
  _resizeDirection = null;
  _resizeColumnName = null;
  _startX = null;
  _startY = null;
  _startW = null;
  _startH = null;

  constructor($root) {
    super($root, {
      name: 'Table',
      // listeners: ['click', 'mousedown', 'mousemove', 'mouseup'],
      listeners: ['mousedown', 'mousemove', 'mouseup'],
    });
  }

  toHTML() {
    return createTable();
  }

  onMousedown(event) {
    const {target, clientX, clientY} = event;

    if (!target.dataset.resize) {
      return;
    }
    this._resizingStarted = true;
    this._resizeDirection = target.dataset.resize;
    const elem = this._isColResizing() ? target.parentElement : target.parentElement.parentElement;
    this._resizeColumnName = elem.dataset.colName;
    this._resizedElements = this._getResizedElements(target);
    const {width, height} = elem.getBoundingClientRect();
    this._startW = width;
    this._startH = height;
    this._startX = clientX;
    this._startY = clientY;
  }

  _isColResizing() {
    return this._resizeDirection === 'col';
  }

  _getResizedElements(el) {
    return this._isColResizing()
      ? this.$root.findByDataAttr('data-col-name', this._resizeColumnName)
      : [el.parentElement.parentElement];
  }

  onMousemove(event) {
    if (!this._resizingStarted) {
      return;
    }

    const {clientX, clientY} = event;

    this._resizedElements.forEach((el) => {
      if (this._isColResizing()) {
        el.style.width = `${this._startW + (clientX - this._startX)}px`;
      } else {
        el.style.height = `${this._startH + (clientY - this._startY)}px`;
      }
    });
  }

  onMouseup(event) {
    this._resizingStarted = false;

    console.log('Table: onMouseup', event);
  }
}
