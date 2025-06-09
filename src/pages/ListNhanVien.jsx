import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Table, Modal } from "antd";
import ModalChiTietNhanVien from "./ModalChiTietNhanVien";
import { useFormik } from "formik";

const ListNhanVien = () => {
  const [dsNhanVien, setDsNhanVien] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chiTietNhanVien, setChiTietNhanVien] = useState();
  const [thongTinCapNhap, setThongTinCapNhap] = useState();

  const [isModalThemMoi, setIsModalThemMoi] = useState(false);

  const formikCapNhap = useFormik({
    enableReinitialize: true,
    initialValues: {
      maNhanVien: thongTinCapNhap?.maNhanVien,
      tenNhanVien: thongTinCapNhap?.tenNhanVien,
      heSoChucVu: thongTinCapNhap?.heSoChucVu,
      chucVu: thongTinCapNhap?.chucVu,
      luongCoBan: thongTinCapNhap?.luongCoBan,
      soGioLamTrongThang: thongTinCapNhap?.soGioLamTrongThang,
    },
    onSubmit: (values) => {
      Axios.put(
        `https://apitraining.cybersoft.edu.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien=${values.maNhanVien}`,
        values
      ).then((res) => {
        console.log(res);
        fetchData();
        setIsModalOpen(false);
      });
    },
  });

  const formikThemMoi = useFormik({
    initialValues: {
      maNhanVien: "",
      tenNhanVien: "",
      heSoChucVu: "",
      chucVu: "",
      luongCoBan: "",
      soGioLamTrongThang: "",
    },
    onSubmit: (values) => {
      const date = new Date();
      let ramdomNumber = Math.floor(Math.random() * 1000);

      let data = {
        ...values,
        maNhanVien: ramdomNumber,
        heSoChucVu: Number(values.heSoChucVu),
        soGioLamTrongThang: Number(values.soGioLamTrongThang),
        luongCoBan: Number(values.luongCoBan),
      };
      console.log(data);
      Axios.post(
        "https://apitraining.cybersoft.edu.vn/api/QuanLyNhanVienApi/ThemNhanVien",
        data
      ).then((res) => {
        formikThemMoi.resetForm();
        setIsModalThemMoi(false);
        fetchData();
      });
    },
  });

  // Và nên có thêm trong useEffect:
  useEffect(() => {
    if (isModalThemMoi) {
      console.log(formikThemMoi);
      formikThemMoi.resetForm(); // reset mỗi khi mở modal
    }
  }, [isModalThemMoi]);

  const fetchData = async () => {
    const result = await Axios.get(
      "https://apitraining.cybersoft.edu.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien"
    );
    console.log(result.data);
    setDsNhanVien(result.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderDsNhanVien = () => {
    return dsNhanVien.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.maNhanVien}</td>
          <td>{item.tenNhanVien}</td>
          <td>{item.chucVu}</td>
          <td>{item.heSoChucVu}</td>
          <td>{item.luongCoBan}</td>
          <td>{item.soGioLamTrongThang}</td>
          <td>
            <button
              type="button"
              onClick={() => {
                xemChiTietNhanVien(item.maNhanVien);
              }}
              className="btn btn-info"
            >
              Xem chi tiết
            </button>
            <button
              onClick={() => {
                updateNhanVien(item);
              }}
              className="btn btn-warning"
            >
              Cập nhập
            </button>
            <button
              onClick={() => {
                handleXoaNhanVien(item.maNhanVien);
              }}
              className="btn btn-danger"
            >
              Xoá nhân viên
            </button>
          </td>
        </tr>
      );
    });
  };

  const xemChiTietNhanVien = async (params) => {
    const result = await Axios.get(
      "https://apitraining.cybersoft.edu.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=" +
        params
    );
    setChiTietNhanVien(result.data);
    setIsModalOpen(true);
  };

  const updateNhanVien = async (params) => {
    setThongTinCapNhap(params);
    setIsModalOpen(true);
  };

  const handleXoaNhanVien = async (params) => {
    Axios.delete(
      `https://apitraining.cybersoft.edu.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=${params}`
    )
      .then((res) => {
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Danh Sách Nhân Viên</h1>
      <button
        onClick={() => {
          setIsModalThemMoi(true);
        }}
        className="btn btn-info"
      >
        Thêm mới
      </button>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Mã Nhân Viên</th>
            <th scope="col">Tên Nhân Viên</th>
            <th scope="col">Chức vụ</th>
            <th scope="col">Hs chức vụ</th>
            <th scope="col">Lương Cơ Bản</th>
            <th scope="col">Số Giờ Làm</th>
            <th scope="col">Hành Động</th>
          </tr>
        </thead>
        <tbody>{renderDsNhanVien()}</tbody>
      </table>

      {/* modal xem chi tiết của nhân viên */}
      <Modal
        title="Chi tiết nhân viên"
        closable={{ "aria-label": "Custom Close Button" }}
        open={false}
        onOk={() => {
          setIsModalOpen(false);
        }}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      >
        <p>Mã Nhân Viên: {chiTietNhanVien?.maNhanVien}</p>
        <p>Tên Nhân Viên: {chiTietNhanVien?.tenNhanVien}</p>
        <p>Chức Vụ: {chiTietNhanVien?.chucVu}</p>
        <p>Hệ Số Chức Vụ: {chiTietNhanVien?.heSoChucVu}</p>
        <p>Lương Cơ Bản: {chiTietNhanVien?.luongCoBan}</p>
        <p>Số Giờ Làm Trong Tháng: {chiTietNhanVien?.soGioLamTrongThang}</p>
      </Modal>

      {/* modal cập nhật thông tin nhân viên */}
      <Modal
        title="Cập nhập nhân viên"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={() => {
          setIsModalOpen(false);
        }}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      >
        <form onSubmit={formikCapNhap.handleSubmit} className="form-group">
          <label>Mã Nhân Viên</label>
          <input
            type="text"
            name="maNhanVien"
            className="form-control"
            onChange={formikCapNhap.handleChange}
            value={formikCapNhap.values.maNhanVien}
          />

          <label>Tên Nhân Viên</label>
          <input
            type="text"
            onChange={formikCapNhap.handleChange}
            name="tenNhanVien"
            className="form-control"
            value={formikCapNhap.values.tenNhanVien}
          />
          <label>Hệ Số Chức Vụ</label>
          <input
            onChange={formikCapNhap.handleChange}
            type="text"
            name="heSoChucVu"
            className="form-control"
            value={formikCapNhap.values.heSoChucVu}
          />
          <label>Chức Vụ</label>
          <input
            onChange={formikCapNhap.handleChange}
            type="text"
            name="chucVu"
            className="form-control"
            value={formikCapNhap.values.chucVu}
          />
          <label>Lương Cơ Bản</label>
          <input
            onChange={formikCapNhap.handleChange}
            type="text"
            name="luongCoBan"
            className="form-control"
            value={formikCapNhap.values.luongCoBan}
          />
          <label>Số Giờ Làm Trong Tháng</label>
          <input
            onChange={formikCapNhap.handleChange}
            type="text"
            name="soGioLamTrongThang"
            className="form-control"
            value={formikCapNhap.values.soGioLamTrongThang}
          />
          <button type="submit" className="btn btn-success mt-3">
            Cập nhập
          </button>
        </form>
      </Modal>

      {/* Modal thêm mới nhân viên */}
      <Modal
        title="Thêm mới nhân viên"
        open={isModalThemMoi}
        onOk={() => {
          setIsModalThemMoi(false);
        }}
        onCancel={() => {
          setIsModalThemMoi(false);
        }}
      >
        <form onSubmit={formikThemMoi.handleSubmit} className="form-group">
          <label>Tên Nhân Viên</label>
          <input
            value={formikThemMoi.values.tenNhanVien}
            onChange={formikThemMoi.handleChange}
            type="text"
            name="tenNhanVien"
            className="form-control"
          />
          <label>Hệ Số Chức Vụ</label>
          <input
            value={formikThemMoi.values.heSoChucVu}
            onChange={formikThemMoi.handleChange}
            type="text"
            name="heSoChucVu"
            className="form-control"
          />
          <label>Chức Vụ</label>
          <input
            value={formikThemMoi.values.chucVu}
            onChange={formikThemMoi.handleChange}
            type="text"
            name="chucVu"
            className="form-control"
          />
          <label>Lương Cơ Bản</label>
          <input
            value={formikThemMoi.values.luongCoBan}
            onChange={formikThemMoi.handleChange}
            type="text"
            name="luongCoBan"
            className="form-control"
          />
          <label>Số Giờ Làm Trong Tháng</label>
          <input
            value={formikThemMoi.values.soGioLamTrongThang}
            onChange={formikThemMoi.handleChange}
            type="text"
            name="soGioLamTrongThang"
            className="form-control"
          />
          <button type="submit" className="btn btn-success mt-3">
            Thêm mới
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default ListNhanVien;
