import Axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";

const ThemNhanVien = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      maNhanVien: "",
      tenNhanVien: "",
      chucVu: "",
      heSoChucVu: "",
      luongCoBan: "",
      soGioLamTrongThang: "",
    },

    onSubmit: (values) => {
      console.log("values", values);
      const maNhanVien = Math.floor(Math.random() * (9990 - 1000 + 1) + 1000);
      const payload = {
        ...values,
        maNhanVien: maNhanVien,
        heSoChucVu: Number(values.heSoChucVu),
        luongCoBan: Number(values.luongCoBan),
        soGioLamTrongThang: Number(values.soGioLamTrongThang),
      };
      Axios.post(
        "https://apitraining.cybersoft.edu.vn/api/QuanLyNhanVienApi/ThemNhanVien",
        payload
      )
        .then((res) => {
          console.log("res", res);
          navigate("/");
          alert(`Thêm nhân viên thành công!`);
        })
        .catch((err) => {
          console.error("Lỗi khi thêm nhân viên:", err);
          alert("Thêm thất bại. Vui lòng kiểm tra lại!");
        });
    },
  });
  return (
    <div>
      <h2 className="text-primary ms-3 pt-2 text-success">Thêm nhân viên</h2>

      <div className="mt-3 ms-4 fs-5">
        <form onSubmit={formik.handleSubmit}>
          {/* <div className="mb-3">
            <label htmlFor="exampleInputID1" className="form-label">
              Mã nhân viên
            </label>
            <input
              type="text"
              name="maNhanVien"
              className="form-control"
              id="exampleInputID1"
              data-type="maNhanVien"
              value={formik.values.maNhanVien}
              onChange={formik.handleChange}
            />
          </div> */}
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
              value={formik.values.tenNhanVien}
              onChange={formik.handleChange}
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
              value={formik.values.chucVu}
              onChange={formik.handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputHeSoChucVu" className="form-label">
              Hệ số chức vụ
            </label>
            <input
              type="text"
              name="heSoChucVu"
              className="form-control"
              id="exampleInputHeSoChucVu"
              data-type="heSoChucVu"
              value={formik.values.heSoChucVu}
              onChange={formik.handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputLuongCanBan" className="form-label">
              Lương căn bản
            </label>
            <input
              type="text"
              name="luongCoBan"
              className="form-control"
              id="exampleInputLuongCanBan"
              data-type="luongCoBan"
              value={formik.values.luongCoBan}
              onChange={formik.handleChange}
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
              type="text"
              name="soGioLamTrongThang"
              className="form-control"
              id="exampleInputSoGioLamTrongThang"
              data-type="soGioLamTrongThang"
              value={formik.values.soGioLamTrongThang}
              onChange={formik.handleChange}
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

export default ThemNhanVien;
