
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Aplikasi RAB - Analisa Harga Satuan Pekerjaan</h1>
        <p className="text-xl mb-8 text-gray-600">
          Buat dan kelola Rencana Anggaran Biaya (RAB) berdasarkan Analisa Harga Satuan Pekerjaan (AHSP) dengan mudah
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Lihat Daftar RAB</CardTitle>
              <CardDescription>Akses semua RAB yang telah dibuat</CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/rab">
                <Button className="w-full bg-rab-blue hover:bg-rab-lightBlue">
                  Lihat Daftar
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Buat RAB Baru</CardTitle>
              <CardDescription>Mulai membuat RAB dengan analisa AHSP</CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/rab/create">
                <Button className="w-full bg-rab-blue hover:bg-rab-lightBlue">
                  Buat RAB
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-4">Fitur Utama</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Input AHSP</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Input rincian pekerja, bahan, dan alat dengan koefisien dan harga satuan</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Kalkulasi Otomatis</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Hitung total biaya secara otomatis berdasarkan input yang dimasukkan</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Laporan Excel</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Download laporan RAB dalam format Excel untuk analisis lebih lanjut</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
