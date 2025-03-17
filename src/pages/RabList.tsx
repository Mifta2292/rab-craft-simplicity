
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getRabList, deleteRab } from "@/services/rabService";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Rab } from "@/types/rab";
import { Trash2, Eye, FileSpreadsheet, Plus } from "lucide-react";
import { toast } from "sonner";

const RabList = () => {
  const [rabList, setRabList] = useState<Rab[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = getRabList();
    setRabList(data);
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus RAB ini?")) {
      const success = deleteRab(id);
      if (success) {
        setRabList(rabList.filter(rab => rab.id !== id));
        toast.success("RAB berhasil dihapus");
      } else {
        toast.error("Gagal menghapus RAB");
      }
    }
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Daftar RAB</h1>
        <Link to="/rab/create">
          <Button className="bg-rab-blue hover:bg-rab-lightBlue">
            <Plus className="mr-2 h-4 w-4" /> Buat RAB Baru
          </Button>
        </Link>
      </div>

      {rabList.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Tidak ada data RAB</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Link to="/rab/create">
              <Button className="bg-rab-blue hover:bg-rab-lightBlue">
                <Plus className="mr-2 h-4 w-4" /> Buat RAB Baru
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kode</TableHead>
                  <TableHead>Nama Pekerjaan</TableHead>
                  <TableHead>Satuan</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Total Harga</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rabList.map((rab) => (
                  <TableRow key={rab.id}>
                    <TableCell>{rab.kode}</TableCell>
                    <TableCell>{rab.nama}</TableCell>
                    <TableCell>{rab.satuan}</TableCell>
                    <TableCell>{new Date(rab.tanggal).toLocaleDateString()}</TableCell>
                    <TableCell>Rp {rab.totalHarga.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => navigate(`/rab/${rab.id}`)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleDelete(rab.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </Layout>
  );
};

export default RabList;
