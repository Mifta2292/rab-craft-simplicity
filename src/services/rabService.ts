
import { Rab, RabFormData } from "@/types/rab";
import { v4 as uuidv4 } from "uuid";
import ExcelJS from 'exceljs';

// Simulate database storage with localStorage
const RAB_STORAGE_KEY = "rab_data";

export const getRabList = (): Rab[] => {
  const data = localStorage.getItem(RAB_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const getRabById = (id: string): Rab | undefined => {
  const rabList = getRabList();
  return rabList.find(rab => rab.id === id);
};

export const saveRab = (formData: RabFormData): Rab => {
  const rabList = getRabList();
  
  // Calculate jumlah for each item
  const pekerjaItems = formData.pekerja.map(item => ({
    id: uuidv4(),
    nama: item.nama,
    satuan: item.satuan,
    hargaSatuan: item.hargaSatuan,
    koefisien: item.koefisien,
    jumlah: item.hargaSatuan * item.koefisien,
    kategori: 'pekerja' as const
  }));
  
  const bahanItems = formData.bahan.map(item => ({
    id: uuidv4(),
    nama: item.nama,
    satuan: item.satuan,
    hargaSatuan: item.hargaSatuan,
    koefisien: item.koefisien,
    jumlah: item.hargaSatuan * item.koefisien,
    kategori: 'bahan' as const
  }));
  
  const alatItems = formData.alat.map(item => ({
    id: uuidv4(),
    nama: item.nama,
    satuan: item.satuan,
    hargaSatuan: item.hargaSatuan,
    koefisien: item.koefisien,
    jumlah: item.hargaSatuan * item.koefisien,
    kategori: 'alat' as const
  }));
  
  // Calculate total price
  const totalPekerja = pekerjaItems.reduce((sum, item) => sum + item.jumlah, 0);
  const totalBahan = bahanItems.reduce((sum, item) => sum + item.jumlah, 0);
  const totalAlat = alatItems.reduce((sum, item) => sum + item.jumlah, 0);
  const totalHarga = totalPekerja + totalBahan + totalAlat;
  
  const newRab: Rab = {
    id: uuidv4(),
    nama: formData.nama,
    kode: formData.kode,
    satuan: formData.satuan,
    tanggal: new Date().toISOString(),
    totalHarga,
    items: {
      pekerja: pekerjaItems,
      bahan: bahanItems,
      alat: alatItems
    }
  };
  
  rabList.push(newRab);
  localStorage.setItem(RAB_STORAGE_KEY, JSON.stringify(rabList));
  
  return newRab;
};

export const deleteRab = (id: string): boolean => {
  const rabList = getRabList();
  const updatedList = rabList.filter(rab => rab.id !== id);
  localStorage.setItem(RAB_STORAGE_KEY, JSON.stringify(updatedList));
  return updatedList.length < rabList.length;
};

export const generateExcel = async (rab: Rab): Promise<void> => {
  // Create a new workbook
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'RAB AHSP App';
  workbook.lastModifiedBy = 'RAB AHSP App';
  workbook.created = new Date();
  workbook.modified = new Date();
  
  // Add a worksheet
  const worksheet = workbook.addWorksheet('RAB AHSP');
  
  // Add header information
  worksheet.addRow(['RAB - Analisa Harga Satuan Pekerjaan']);
  worksheet.addRow([]);
  worksheet.addRow(['Nama Pekerjaan', rab.nama]);
  worksheet.addRow(['Kode', rab.kode]);
  worksheet.addRow(['Satuan', rab.satuan]);
  worksheet.addRow(['Tanggal', new Date(rab.tanggal).toLocaleDateString()]);
  worksheet.addRow([]);
  
  // Style the title
  worksheet.getCell('A1').font = { bold: true, size: 14 };
  worksheet.mergeCells('A1:F1');
  
  // Pekerja section
  worksheet.addRow(['A. TENAGA KERJA']);
  worksheet.getCell('A8').font = { bold: true };
  
  // Add headers for Pekerja table
  const headersRow = worksheet.addRow(['No', 'Uraian', 'Satuan', 'Koefisien', 'Harga Satuan', 'Jumlah']);
  headersRow.eachCell((cell) => {
    cell.font = { bold: true };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFE0E0E0' }
    };
    cell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };
  });
  
  // Add pekerja data
  let rowIndex = 10;
  rab.items.pekerja.forEach((item, index) => {
    const row = worksheet.addRow([
      index + 1,
      item.nama,
      item.satuan,
      item.koefisien,
      item.hargaSatuan,
      item.jumlah
    ]);
    
    row.eachCell((cell) => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
    });
    
    rowIndex++;
  });
  
  // Add pekerja total
  const pekerjaTotal = rab.items.pekerja.reduce((sum, item) => sum + item.jumlah, 0);
  const pekerjaRow = worksheet.addRow(['', '', '', '', 'Jumlah A', pekerjaTotal]);
  pekerjaRow.getCell(5).font = { bold: true };
  pekerjaRow.getCell(6).font = { bold: true };
  
  worksheet.addRow([]);
  rowIndex += 2;
  
  // Bahan section
  worksheet.addRow(['B. BAHAN']);
  worksheet.getCell(`A${rowIndex}`).font = { bold: true };
  rowIndex++;
  
  // Add headers for Bahan table
  const bahanHeadersRow = worksheet.addRow(['No', 'Uraian', 'Satuan', 'Koefisien', 'Harga Satuan', 'Jumlah']);
  bahanHeadersRow.eachCell((cell) => {
    cell.font = { bold: true };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFE0E0E0' }
    };
    cell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };
  });
  rowIndex++;
  
  // Add bahan data
  rab.items.bahan.forEach((item, index) => {
    const row = worksheet.addRow([
      index + 1,
      item.nama,
      item.satuan,
      item.koefisien,
      item.hargaSatuan,
      item.jumlah
    ]);
    
    row.eachCell((cell) => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
    });
    
    rowIndex++;
  });
  
  // Add bahan total
  const bahanTotal = rab.items.bahan.reduce((sum, item) => sum + item.jumlah, 0);
  const bahanRow = worksheet.addRow(['', '', '', '', 'Jumlah B', bahanTotal]);
  bahanRow.getCell(5).font = { bold: true };
  bahanRow.getCell(6).font = { bold: true };
  
  worksheet.addRow([]);
  rowIndex += 2;
  
  // Alat section
  worksheet.addRow(['C. ALAT']);
  worksheet.getCell(`A${rowIndex}`).font = { bold: true };
  rowIndex++;
  
  // Add headers for Alat table
  const alatHeadersRow = worksheet.addRow(['No', 'Uraian', 'Satuan', 'Koefisien', 'Harga Satuan', 'Jumlah']);
  alatHeadersRow.eachCell((cell) => {
    cell.font = { bold: true };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFE0E0E0' }
    };
    cell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };
  });
  rowIndex++;
  
  // Add alat data
  rab.items.alat.forEach((item, index) => {
    const row = worksheet.addRow([
      index + 1,
      item.nama,
      item.satuan,
      item.koefisien,
      item.hargaSatuan,
      item.jumlah
    ]);
    
    row.eachCell((cell) => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
    });
    
    rowIndex++;
  });
  
  // Add alat total
  const alatTotal = rab.items.alat.reduce((sum, item) => sum + item.jumlah, 0);
  const alatRow = worksheet.addRow(['', '', '', '', 'Jumlah C', alatTotal]);
  alatRow.getCell(5).font = { bold: true };
  alatRow.getCell(6).font = { bold: true };
  
  worksheet.addRow([]);
  rowIndex += 2;
  
  // Add grand total
  const totalRow = worksheet.addRow(['TOTAL (A + B + C)', '', '', '', '', rab.totalHarga]);
  totalRow.getCell(1).font = { bold: true };
  totalRow.getCell(6).font = { bold: true };
  
  // Auto size columns
  worksheet.columns.forEach(column => {
    column.width = 15;
  });
  
  // Generate Excel file
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
  const url = window.URL.createObjectURL(blob);
  
  // Create a hidden link element
  const element = document.createElement('a');
  element.href = url;
  element.download = `RAB_${rab.kode}_${rab.nama.replace(/\s+/g, "_")}.xlsx`;
  
  // Trigger the download
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
  
  // Clean up
  window.URL.revokeObjectURL(url);
};
