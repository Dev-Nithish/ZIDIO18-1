import * as XLSX from 'xlsx';

export const parseExcel = (buffer) => {
  try {
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const json = XLSX.utils.sheet_to_json(sheet);
    return {
      success: true,
      data: json
    };
  } catch (err) {
    return {
      success: false,
      error: 'Failed to parse Excel file'
    };
  }
};
