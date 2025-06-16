import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/");
  };
  return (
    <div className="text-center my-5">
      <h1>Page này không tồn tại !</h1>
      <button
        className="btn btn-info mt-3 fs-3 text-danger"
        onClick={() => {
          goBack();
        }}
      >
        Quay về trang Admin Page
      </button>
    </div>
  );
};

export default NotFound;
