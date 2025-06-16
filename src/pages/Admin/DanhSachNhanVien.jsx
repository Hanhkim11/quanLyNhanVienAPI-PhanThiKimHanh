import Axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const DanhSachNhanVien = () => {
  const [danhSachNhanVien, setDanhSachNhanVien] = useState([]);
  const [chiTietNhanVien, setChiTietNhanVien] = useState({});

  const fetchDanhSachNhanVien = async () => {
    const response = await Axios.get(
      "https://apitraining.cybersoft.edu.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien"
    );
    // console.log("response", response);
    setDanhSachNhanVien(response.data);
  };

  useEffect(() => {
    fetchDanhSachNhanVien();
  }, []);

  const fetchChiTietNhanVien = async (maNhanVien) => {
    const response = await Axios.get(
      `https://apitraining.cybersoft.edu.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=${maNhanVien}`
    ).then((res) => {
      setChiTietNhanVien(res.data);
    });
  };

  const handleXoaNhanVien = async (params) => {
    Axios.delete(
      `https://apitraining.cybersoft.edu.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=${params}`
    )
      .then((res) => {
        fetchDanhSachNhanVien();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container mb-5">
      <div>
        <table className="table">
          <thead>
            <tr className="fs-5">
              <th scope="col">Mã nhân viên</th>
              <th scope="col">Tên nhân viên</th>
              <th scope="col">Chức vụ</th>
              <th scope="col">Hs chức vụ</th>
              <th scope="col">Lương căn bản</th>
              <th scope="col">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {danhSachNhanVien?.map((item) => {
              return (
                <tr key={item.maNhanVien}>
                  <th scope="row">{item.maNhanVien}</th>
                  <td>{item.tenNhanVien}</td>
                  <td>{item.chucVu}</td>
                  <td>{item.heSoChucVu}</td>
                  <td>{item.luongCoBan}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => fetchChiTietNhanVien(item.maNhanVien)}
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      className="btn btn-primary me-2 fs-6"
                    >
                      Xem chi tiết
                    </button>
                    <NavLink
                      to={`/capnhat/${item.maNhanVien}`}
                      className="btn btn-success me-2 fs-6"
                    >
                      Cập nhật
                    </NavLink>
                    <button
                      className="btn btn-danger me-2 fs-6"
                      onClick={() => {
                        handleXoaNhanVien(item.maNhanVien);
                      }}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {" "}
                thông tin nhân viên
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="fs-5">
                <p>Mã nhân viên: {chiTietNhanVien?.maNhanVien}</p>
                <p>Tên nhân viên: {chiTietNhanVien?.tenNhanVien}</p>
                <p>Chức vụ: {chiTietNhanVien?.chucVu}</p>
                <p>Lương cơ bản: {chiTietNhanVien?.luongCoBan}</p>
                <p>
                  Số giờ làm trong tháng: {chiTietNhanVien?.soGioLamTrongThang}
                </p>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DanhSachNhanVien;
