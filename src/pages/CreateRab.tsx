
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ItemForm from "@/components/ItemForm";
import { RabFormData, RabItemFormData } from "@/types/rab";
import { saveRab } from "@/services/rabService";
import { toast } from "sonner";

const CreateRab = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RabFormData>({
    nama: "",
    kode: "",
    satuan: "",
    pekerja: [],
    bahan: [],
    alat: []
  });

  const handleInputChange = (field: keyof RabFormData, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handlePekerjaChange = (items: RabItemFormData[]) => {
    setFormData({
      ...formData,
      pekerja: items
    });
  };

  const handleBahanChange = (items: RabItemFormData[]) => {
    setFormData({
      ...formData,
      bahan: items
    });
  };

  const handleAlatChange = (items: RabItemFormData[]) => {
    setFormData({
      ...formData,
      alat: items
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.nama || !formData.kode || !formData.satuan) {
      toast.error("Harap lengkapi data RAB");
      return;
    }

    if (formData.pekerja.length === 0 && formData.bahan.length === 0 && formData.alat.length === 0) {
      toast.error("Harap tambahkan minimal satu item");
      return;
    }

    // Check if all items have required fields
    const allItems = [...formData.pekerja, ...formData.bahan, ...formData.alat];
    const hasIncompleteItems = allItems.some(
      item => !item.nama || !item.satuan || item.koefisien <= 0 || item.hargaSatuan <= 0
    );

    if (hasIncompleteItems) {
      toast.error("Harap lengkapi semua data item");
      return;
    }

    try {
      const newRab = saveRab(formData);
      toast.success("RAB berhasil dibuat");
      navigate(`/rab/${newRab.id}`);
    } catch (error) {
      toast.error("Gagal menyimpan RAB");
      console.error(error);
    }
  };

  const calculateTotalHarga = () => {
    const totalPekerja = formData.pekerja.reduce(
      (sum, item) => sum + item.hargaSatuan * item.koefisien, 0
    );
    const totalBahan = formData.bahan.reduce(
      (sum, item) => sum + item.hargaSatuan * item.koefisien, 0
    );
    const totalAlat = formData.alat.reduce(
      (sum, item) => sum + item.hargaSatuan * item.koefisien, 0
    );
    
    return totalPekerja + totalBahan + totalAlat;
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Buat RAB Baru</h1>
        
        <form onSubmit={handleSubmit}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Informasi RAB</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="kode">Kode AHSP</Label>
                <Input
                  id="kode"
                  value={formData.kode}
                  onChange={(e) => handleInputChange("kode", e.target.value)}
                  placeholder="Contoh: AHS-001"
                  required
                />
              </div>
              <div>
                <Label htmlFor="nama">Nama Pekerjaan</Label>
                <Input
                  id="nama"
                  value={formData.nama}
                  onChange={(e) => handleInputChange("nama", e.target.value)}
                  placeholder="Nama pekerjaan"
                  required
                />
              </div>
              <div>
                <Label htmlFor="satuan">Satuan</Label>
                <Input
                  id="satuan"
                  value={formData.satuan}
                  onChange={(e) => handleInputChange("satuan", e.target.value)}
                  placeholder="Contoh: m²"
                  required
                />
              </div>
            </CardContent>
          </Card>
          
          <ItemForm 
            title="Tenaga Kerja" 
            items={formData.pekerja} 
            onChange={handlePekerjaChange} 
          />
          
          <ItemForm 
            title="Bahan" 
            items={formData.bahan} 
            onChange={handleBahanChange} 
          />
          
          <ItemForm 
            title="Alat" 
            items={formData.alat} 
            onChange={handleAlatChange} 
          />
          
          <Card className="mb-6">
            <CardContent className="flex justify-between items-center p-6">
              <div>
                <h3 className="text-xl font-bold">Total Harga:</h3>
                <p className="text-2xl font-bold text-rab-blue">
                  Rp {calculateTotalHarga().toLocaleString()}
                </p>
              </div>
              <div className="flex gap-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate("/rab")}
                >
                  Batal
                </Button>
                <Button 
                  type="submit" 
                  className="bg-rab-blue hover:bg-rab-lightBlue"
                >
                  Simpan RAB
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </Layout>
  );
};

export default CreateRab;
