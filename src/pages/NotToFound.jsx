import React from "react";
import { useNavigate } from "react-router";

const NotToFound = () => {
  const navigate = useNavigate();
  const goToHome = () => {
    navigate("/");
  };
  return (
    <div className="text-center my-5">
      <h1>Page này không tồn tại</h1>
      <button
        className="btn btn-warning fs-4 "
        onClick={() => {
          goToHome();
        }}
      >
        Quay về trang chủ
      </button>
    </div>
  );
};

export default NotToFound;
