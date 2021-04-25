const CODES = {
  'A': 65,
  'Z': 90,
};

function createCell(content) {
  return `<div class="cell" contenteditable> ${content} </div>`;
}

function createCol(name) {
  return `<div class="column"> ${name} </div>`;
}

function createRow(rowNumber, rowData) {
  return `
    <div class="row">
        <div class="row-info">${rowNumber}</div>
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
        return createCell(toChar(_, index) + row);
      })
      .join('');
}
