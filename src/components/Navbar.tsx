
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-rab-blue text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">RAB-AHSP</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-rab-gray transition-colors">Beranda</Link>
          <Link to="/rab" className="hover:text-rab-gray transition-colors">Daftar RAB</Link>
          <Link to="/rab/create" className="hover:text-rab-gray transition-colors">Buat RAB</Link>
          <Link to="/panduan" className="hover:text-rab-gray transition-colors">Panduan</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
