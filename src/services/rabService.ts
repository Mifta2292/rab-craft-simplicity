
import { Rab, RabFormData } from "@/types/rab";
import { v4 as uuidv4 } from "uuid";
import * as XLSX from "xlsx";

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

export const generateExcel = (rab: Rab): void => {
  // Create workbook and worksheet
  const workbook = XLSX.utils.book_new();
  
  // Header information
  const headerData = [
    ["RAB - Analisa Harga Satuan Pekerjaan"],
    [""],
    ["Nama Pekerjaan", rab.nama],
    ["Kode", rab.kode],
    ["Satuan", rab.satuan],
    ["Tanggal", new Date(rab.tanggal).toLocaleDateString()],
    [""]
  ];
  
  // Create AHSP table headers
  const tableHeaders = ["No", "Uraian", "Satuan", "Koefisien", "Harga Satuan", "Jumlah"];
  
  // Pekerja section
  const pekerjaData = [
    ["A. TENAGA KERJA"],
    tableHeaders,
    ...rab.items.pekerja.map((item, index) => [
      index + 1,
      item.nama,
      item.satuan,
      item.koefisien,
      item.hargaSatuan,
      item.jumlah
    ]),
    ["", "", "", "", "Jumlah A", rab.items.pekerja.reduce((sum, item) => sum + item.jumlah, 0)],
    [""]
  ];
  
  // Bahan section
  const bahanData = [
    ["B. BAHAN"],
    tableHeaders,
    ...rab.items.bahan.map((item, index) => [
      index + 1,
      item.nama,
      item.satuan,
      item.koefisien,
      item.hargaSatuan,
      item.jumlah
    ]),
    ["", "", "", "", "Jumlah B", rab.items.bahan.reduce((sum, item) => sum + item.jumlah, 0)],
    [""]
  ];
  
  // Alat section
  const alatData = [
    ["C. ALAT"],
    tableHeaders,
    ...rab.items.alat.map((item, index) => [
      index + 1,
      item.nama,
      item.satuan,
      item.koefisien,
      item.hargaSatuan,
      item.jumlah
    ]),
    ["", "", "", "", "Jumlah C", rab.items.alat.reduce((sum, item) => sum + item.jumlah, 0)],
    [""]
  ];
  
  // Total
  const totalData = [
    ["TOTAL (A + B + C)", "", "", "", "", rab.totalHarga]
  ];
  
  // Combine all data
  const allData = [
    ...headerData,
    ...pekerjaData,
    ...bahanData,
    ...alatData,
    ...totalData
  ];
  
  // Create worksheet
  const worksheet = XLSX.utils.aoa_to_sheet(allData);
  
  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "RAB AHSP");
  
  // Generate Excel file
  XLSX.writeFile(workbook, `RAB_${rab.kode}_${rab.nama.replace(/\s+/g, "_")}.xlsx`);
};
