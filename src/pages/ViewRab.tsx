
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getRabById, generateExcel, deleteRab } from "@/services/rabService";
import { Rab } from "@/types/rab";
import { toast } from "sonner";
import { Trash2, FileSpreadsheet, ArrowLeft } from "lucide-react";

const ViewRab = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [rab, setRab] = useState<Rab | null>(null);

  useEffect(() => {
    if (id) {
      const rabData = getRabById(id);
      if (rabData) {
        setRab(rabData);
      } else {
        toast.error("RAB tidak ditemukan");
        navigate("/rab");
      }
    }
  }, [id, navigate]);

  const handleDelete = () => {
    if (id && window.confirm("Apakah Anda yakin ingin menghapus RAB ini?")) {
      const success = deleteRab(id);
      if (success) {
        toast.success("RAB berhasil dihapus");
        navigate("/rab");
      } else {
        toast.error("Gagal menghapus RAB");
      }
    }
  };

  const handleExportExcel = () => {
    if (rab) {
      try {
        generateExcel(rab);
        toast.success("File Excel berhasil diunduh");
      } catch (error) {
        toast.error("Gagal mengunduh file Excel");
        console.error(error);
      }
    }
  };

  if (!rab) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <p>Memuat data...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Button 
              variant="outline" 
              size="icon" 
              className="mr-4"
              onClick={() => navigate("/rab")}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-3xl font-bold">Detail RAB</h1>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={handleExportExcel}
            >
              <FileSpreadsheet className="mr-2 h-4 w-4" /> Export Excel
            </Button>
            <Button 
              variant="destructive"
              onClick={handleDelete}
            >
              <Trash2 className="mr-2 h-4 w-4" /> Hapus
            </Button>
          </div>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Informasi RAB</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-500">Kode AHSP</p>
              <p className="font-medium">{rab.kode}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Nama Pekerjaan</p>
              <p className="font-medium">{rab.nama}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Satuan</p>
              <p className="font-medium">{rab.satuan}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Tanggal</p>
              <p className="font-medium">{new Date(rab.tanggal).toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>
        
        {/* Pekerja Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>A. Tenaga Kerja</CardTitle>
          </CardHeader>
          <CardContent>
            {rab.items.pekerja.length === 0 ? (
              <p className="text-center py-4 text-gray-500">Tidak ada data tenaga kerja</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No</TableHead>
                    <TableHead>Uraian</TableHead>
                    <TableHead>Satuan</TableHead>
                    <TableHead>Koefisien</TableHead>
                    <TableHead>Harga Satuan</TableHead>
                    <TableHead>Jumlah</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rab.items.pekerja.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.nama}</TableCell>
                      <TableCell>{item.satuan}</TableCell>
                      <TableCell>{item.koefisien}</TableCell>
                      <TableCell>Rp {item.hargaSatuan.toLocaleString()}</TableCell>
                      <TableCell>Rp {item.jumlah.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={5} className="text-right font-bold">
                      Jumlah A
                    </TableCell>
                    <TableCell className="font-bold">
                      Rp {rab.items.pekerja.reduce((sum, item) => sum + item.jumlah, 0).toLocaleString()}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
        
        {/* Bahan Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>B. Bahan</CardTitle>
          </CardHeader>
          <CardContent>
            {rab.items.bahan.length === 0 ? (
              <p className="text-center py-4 text-gray-500">Tidak ada data bahan</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No</TableHead>
                    <TableHead>Uraian</TableHead>
                    <TableHead>Satuan</TableHead>
                    <TableHead>Koefisien</TableHead>
                    <TableHead>Harga Satuan</TableHead>
                    <TableHead>Jumlah</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rab.items.bahan.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.nama}</TableCell>
                      <TableCell>{item.satuan}</TableCell>
                      <TableCell>{item.koefisien}</TableCell>
                      <TableCell>Rp {item.hargaSatuan.toLocaleString()}</TableCell>
                      <TableCell>Rp {item.jumlah.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={5} className="text-right font-bold">
                      Jumlah B
                    </TableCell>
                    <TableCell className="font-bold">
                      Rp {rab.items.bahan.reduce((sum, item) => sum + item.jumlah, 0).toLocaleString()}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
        
        {/* Alat Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>C. Alat</CardTitle>
          </CardHeader>
          <CardContent>
            {rab.items.alat.length === 0 ? (
              <p className="text-center py-4 text-gray-500">Tidak ada data alat</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No</TableHead>
                    <TableHead>Uraian</TableHead>
                    <TableHead>Satuan</TableHead>
                    <TableHead>Koefisien</TableHead>
                    <TableHead>Harga Satuan</TableHead>
                    <TableHead>Jumlah</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rab.items.alat.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.nama}</TableCell>
                      <TableCell>{item.satuan}</TableCell>
                      <TableCell>{item.koefisien}</TableCell>
                      <TableCell>Rp {item.hargaSatuan.toLocaleString()}</TableCell>
                      <TableCell>Rp {item.jumlah.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={5} className="text-right font-bold">
                      Jumlah C
                    </TableCell>
                    <TableCell className="font-bold">
                      Rp {rab.items.alat.reduce((sum, item) => sum + item.jumlah, 0).toLocaleString()}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
        
        {/* Total */}
        <Card className="mb-6">
          <CardContent className="flex justify-between items-center p-6">
            <div>
              <h3 className="text-xl font-bold">Total (A + B + C):</h3>
              <p className="text-2xl font-bold text-rab-blue">
                Rp {rab.totalHarga.toLocaleString()}
              </p>
            </div>
            <Button 
              className="bg-rab-blue hover:bg-rab-lightBlue"
              onClick={handleExportExcel}
            >
              <FileSpreadsheet className="mr-2 h-4 w-4" /> Download Excel
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ViewRab;
