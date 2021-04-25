const CODES = {
  'A': 65,
  'Z': 90,
};

function createCell(content, colName) {
  return `<div class="cell" contenteditable data-col-name="${colName}"> ${content} </div>`;
}

function createCol(name) {
  return `<div class="column" data-type="resizable" data-col-name="${name}"> 
            ${name} 
            <div class="col-resize" data-resize="col"></div>
          </div>
`;
}

function createRow(rowNumber, rowData) {
  return `
    <div class="row" data-type="resizable" data-row="${rowNumber}">
        <div class="row-info">
            ${rowNumber}
            ${rowNumber ? '<div class="row-resize" data-resize="row"></div>' : ''}
        </div>
        <div class="row-data">${rowData}</div>
    </div>
  `;
}

export function createTable(rowsCount= 30) {
  const colsCount = CODES.Z - CODES.A;

  const rows = [];
  rows.push(createRow('', createHeaderData(colsCount)));

  for (let i = 1; i < rowsCount+1; i++) {
    rows.push(createRow(i, createRowData(colsCount, i)));
  }

  return rows.join('');
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

function createHeaderData(colsCount) {
  return new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(createCol)
      .join('');
}

function createRowData(colsCount, row) {
  return new Array(colsCount)
      .fill('')
      .map((_, index) => {
        return createCell(toChar(_, index) + row, toChar(_, index));
      })
      .join('');
}
