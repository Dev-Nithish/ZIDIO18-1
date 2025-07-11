// server/utils/parseExcel.js
import * as XLSX from 'xlsx';

/**
 * Parse an Excel file buffer into JSON.
 * @param {Buffer} buffer
 * @returns {{ success: boolean, data?: any[], error?: string }}
 */
export function parseExcel(buffer) {
  try {
    // Read workbook from buffer
    const workbook = XLSX.read(buffer, { type: 'buffer' });

    // Get first worksheet
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Convert worksheet to JSON
    const jsonData = XLSX.utils.sheet_to_json(sheet, {
      defval: '',     // keep empty cells explicit
      raw: false      // convert dates/numbers to strings
    });

    return { success: true, data: jsonData };
  } catch (err) {
    console.error('❌ Excel parse error:', err);
    return { success: false, error: 'Invalid Excel file format' };
  }
}
