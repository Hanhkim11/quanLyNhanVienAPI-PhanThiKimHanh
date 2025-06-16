import React from "react";
import { useNavigate } from "react-router-dom";

const TrangChu = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/");
  };
  return (
    <div className="text-center my-5">
      <h1>Page này không tồn tại !</h1>
      <button
        className="btn btn-warning mt-3 fs-5 mb-5"
        onClick={() => {
          goBack();
        }}
      >
        Quay về trang admin page
      </button>
    </div>
  );
};

export default TrangChu;
