import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const AdminPage = () => {
  return (
    <div className="d-flex justify-content-between ">
      <div className="col-3 bg-black text-center">
        <h2 className="text-light my-4">Admin Page</h2>
        <ul className="fs-5">
          <li className="mb-3 ">
            <NavLink to={"/"}>Trang chủ</NavLink>
          </li>

          <li>
            <NavLink to={"themnhanvien"}>Thêm nhân viên</NavLink>
          </li>
        </ul>
      </div>

      <div className="col-9 bg-secondary">
        <header className="fs-2 text-start text-light my-4 ms-4">
          Danh sách nhân viên
        </header>
        <div className="content bg-light ms-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
