import * as XLSX from 'xlsx';

export function readExcelFile(filePath: string) {
  const workbook = XLSX.readFile(filePath);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  return data;
}
