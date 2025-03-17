
export interface RabItem {
  id: string;
  nama: string;
  satuan: string;
  hargaSatuan: number;
  koefisien: number;
  jumlah: number;
  kategori: 'pekerja' | 'bahan' | 'alat';
}

export interface Rab {
  id: string;
  nama: string;
  kode: string;
  satuan: string;
  tanggal: string;
  totalHarga: number;
  items: {
    pekerja: RabItem[];
    bahan: RabItem[];
    alat: RabItem[];
  };
}

export interface RabFormData {
  nama: string;
  kode: string;
  satuan: string;
  pekerja: RabItemFormData[];
  bahan: RabItemFormData[];
  alat: RabItemFormData[];
}

export interface RabItemFormData {
  nama: string;
  satuan: string;
  hargaSatuan: number;
  koefisien: number;
}
