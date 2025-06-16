import Axios from "axios";
import { useFormik } from "formik";
import React, { use, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CapNhat = () => {
  
  const param = useParams();
 
  const { maNhanVien } = param;
  
  const navigate = useNavigate();
  const [thongTinNhanVien, setThongTinNhanVien] = useState({});

  const fetchThongTinNhanVien = async () => {
    Axios.get(
      `https://apitraining.cybersoft.edu.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=${maNhanVien}`
    ).then((res) => {
      setThongTinNhanVien(res.data);
    });
  };
  
  useEffect(() => {
    fetchThongTinNhanVien();
  }, [maNhanVien]); 

  const formikCapNhat = useFormik({
    enableReinitialize: true, 
    initialValues: {
      maNhanVien: thongTinNhanVien.maNhanVien || maNhanVien, // sử dụng maNhanVien từ URL nếu không có trong dữ liệu
      tenNhanVien: thongTinNhanVien.tenNhanVien || "",
      chucVu: thongTinNhanVien.chucVu || "",
      heSoChucVu: thongTinNhanVien.heSoChucVu || "",
      luongCoBan: thongTinNhanVien.luongCoBan || "",
      soGioLamTrongThang: thongTinNhanVien.soGioLamTrongThang || "",
    },

    onSubmit: (values) => {
      Axios.put(
        `https://apitraining.cybersoft.edu.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien=${maNhanVien}`,
        values
      ).then((res) => {
        navigate("/");
      });
    },
  });

  return (
    <div>
      <h2 className="text-primary ms-3 pt-2 text-success">Cập nhật</h2>

      <div className="mt-3 ms-4 fs-5">
        <form onSubmit={formikCapNhat.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword" className="form-label">
              Tên nhân viên
            </label>
            <input
              type="text"
              name="tenNhanVien"
              className="form-control"
              id="exampleInputPassword1"
              data-type="tenNhanVien"
              value={formikCapNhat.values.tenNhanVien}
              onChange={formikCapNhat.handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputChucVu" className="form-label">
              Chức vụ
            </label>
            <input
              type="text"
              name="chucVu"
              className="form-control"
              id="exampleInputChucVu"
              data-type="chucVu"
              value={formikCapNhat.values.chucVu}
              onChange={formikCapNhat.handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputHeSoChucVu" className="form-label">
              Hệ số chức vụ
            </label>
            <input
              type="number"
              name="heSoChucVu"
              className="form-control"
              id="exampleInputHeSoChucVu"
              data-type="heSoChucVu"
              value={formikCapNhat.values.heSoChucVu}
              onChange={formikCapNhat.handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputLuongCanBan" className="form-label">
              Lương căn bản
            </label>
            <input
              type="number"
              name="luongCoBan"
              className="form-control"
              id="exampleInputLuongCanBan"
              data-type="luongCoBan"
              value={formikCapNhat.values.luongCoBan}
              onChange={formikCapNhat.handleChange}
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="exampleInputSoGioLamTrongThang"
              className="form-label"
            >
              Số giờ làm trong tháng
            </label>
            <input
              type="number"
              name="soGioLamTrongThang"
              className="form-control"
              id="exampleInputSoGioLamTrongThang"
              data-type="soGioLamTrongThang"
              value={formikCapNhat.values.soGioLamTrongThang}
              onChange={formikCapNhat.handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary fs-5 mb-5">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CapNhat;
