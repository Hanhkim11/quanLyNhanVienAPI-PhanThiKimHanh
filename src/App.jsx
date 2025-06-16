import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Form, Route, Router, Routes } from "react-router-dom";
import AdminPage from "./TemplateLayput/AdminPage";
import NotFound from "./pages/Admin/NotFound";
import DanhSachNhanVien from "./pages/Admin/DanhSachNhanVien";
import ThemNhanVien from "./pages/ProductPage/ThemNhanVien";
import QuanLyNhanVien from "./pages/Admin/TrangChu";
import TrangChu from "./pages/Admin/TrangChu";
import CapNhat from "./pages/ProductPage/CapNhat";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminPage />}>
          <Route index element={<DanhSachNhanVien />} />
          <Route path="themnhanvien" element={<ThemNhanVien />} />
          <Route path="capnhat/:maNhanVien" element={<CapNhat />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
