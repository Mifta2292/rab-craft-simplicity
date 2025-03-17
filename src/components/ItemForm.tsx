
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RabItemFormData } from "@/types/rab";
import { Plus, Trash2 } from "lucide-react";

interface ItemFormProps {
  title: string;
  items: RabItemFormData[];
  onChange: (items: RabItemFormData[]) => void;
}

const ItemForm: React.FC<ItemFormProps> = ({ title, items, onChange }) => {
  const addItem = () => {
    onChange([...items, { nama: "", satuan: "", hargaSatuan: 0, koefisien: 0 }]);
  };

  const updateItem = (index: number, field: keyof RabItemFormData, value: string | number) => {
    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: field === "hargaSatuan" || field === "koefisien" ? Number(value) : value,
    };
    onChange(updatedItems);
  };

  const deleteItem = (index: number) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    onChange(updatedItems);
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.hargaSatuan * item.koefisien, 0);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead style={{ width: "30%" }}>Nama</TableHead>
              <TableHead style={{ width: "15%" }}>Satuan</TableHead>
              <TableHead style={{ width: "20%" }}>Koefisien</TableHead>
              <TableHead style={{ width: "20%" }}>Harga Satuan</TableHead>
              <TableHead style={{ width: "15%" }}>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Input
                    value={item.nama}
                    onChange={(e) => updateItem(index, "nama", e.target.value)}
                    placeholder="Nama item"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={item.satuan}
                    onChange={(e) => updateItem(index, "satuan", e.target.value)}
                    placeholder="Satuan"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={item.koefisien}
                    onChange={(e) => updateItem(index, "koefisien", e.target.value)}
                    placeholder="Koefisien"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={item.hargaSatuan}
                    onChange={(e) => updateItem(index, "hargaSatuan", e.target.value)}
                    placeholder="Harga satuan"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => deleteItem(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3} className="text-right font-bold">
                Total
              </TableCell>
              <TableCell colSpan={2} className="font-bold">
                Rp {calculateTotal().toLocaleString()}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        
        <Button 
          className="mt-4 w-full bg-rab-blue hover:bg-rab-lightBlue" 
          onClick={addItem}
        >
          <Plus className="h-4 w-4 mr-2" /> Tambah {title}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ItemForm;
