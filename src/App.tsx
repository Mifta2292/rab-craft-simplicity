import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import RabList from "./pages/RabList";
import CreateRab from "./pages/CreateRab";
import ViewRab from "./pages/ViewRab";
import NotFound from "./pages/NotFound";
import { Toaster } from "@/components/ui/toaster";
import PanduanPage from "./components/PanduanPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/rab" element={<RabList />} />
        <Route path="/rab/create" element={<CreateRab />} />
        <Route path="/rab/:id" element={<ViewRab />} />
        <Route path="/panduan" element={<PanduanPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
