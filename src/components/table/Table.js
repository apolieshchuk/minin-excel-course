import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {$} from '@core/dom';

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
      listeners: ['mousedown'],
    });
  }

  toHTML() {
    return createTable();
  }

  onMousedown(event) {
    const {target} = event;

    if (!target.dataset.resize) {
      return;
    }

    const $resizer = $(target);
    const $parent = $resizer.findParentByDataAttr('data-type', 'resizable'); // good
    const parentKey = $parent.data.colName;
    const resizeType = $resizer.data.resize;

    const coords = $parent.getCoords();

    // get resized column objects
    const resizedObjects = resizeType === 'col'
      ? this.$root.findByDataAttr('data-col-name', parentKey)
      : [$parent];

    document.onmousemove = (e) => {
      // const delta = e.pageX - coords.right; // zamukanie!
      const delta = resizeType === 'col' ? e.pageX - coords.right : e.pageY - coords.bottom;
      const value = resizeType === 'col' ? coords.width + delta : coords.height + delta;

      resizedObjects.forEach((el) => {
        const changedProp = resizeType === 'col' ? 'width' : 'height';
        el.css({[changedProp]: `${value}px`});
      });
    };

    // 189 ms  Scripting
    // 1927 ms  Rendering

    document.onmouseup = () => {
      document.onmousemove = null;
    };
  }

  _isColResizing() {
    return this._resizeDirection === 'col';
  }

  _getResizedElements(el) {
    return this._isColResizing()
      ? this.$root.findByDataAttr('data-col-name', this._resizeColumnName)
      : [el.parentElement.parentElement];
  }

  // onMousemove(event) {
  //   if (!this._resizingStarted) {
  //     return;
  //   }
  //
  //   const {clientX, clientY} = event;
  //
  //   this._resizedElements.forEach((el) => {
  //     if (this._isColResizing()) {
  //       el.style.width = `${this._startW + (clientX - this._startX)}px`;
  //     } else {
  //       el.style.height = `${this._startH + (clientY - this._startY)}px`;
  //     }
  //   });
  // }
  //
  // onMouseup(event) {
  //   this._resizingStarted = false;
  //
  //   console.log('Table: onMouseup', event);
  // }
}
