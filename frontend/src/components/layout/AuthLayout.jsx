import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import SidebarLeft from "../sidebar/SidebarAuth";
import "./../../assets/css/layout/Layout.css";

const AuthLayout = ({ children }) => {
  const navigate = useNavigate();
  const [isExpired, setIsExpired] = useState(false);

  const fetchUser = async () => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
    try {
      const response = await axios.get("http://localhost:8000/api/user");
      localStorage.setItem("auth", JSON.stringify(response.data));
      setIsExpired(false);
    } catch (error) {
      console.log(error);
      setIsExpired(true);
    }
  };

  useEffect(() => {
    fetchUser();
    if (isExpired === true) {
      localStorage.removeItem("token");
      localStorage.removeItem("auth");
      navigate("/rekin/all");
    }
  }, [fetchUser()]);

  return (
    <>
      <div className="wrapper-navbar">
        <Navbar />
      </div>
      <div className="wrapper-content">
        <div className="sidebar-left">
          <SidebarLeft />
        </div>
        <div className="body-content">
          <div className="main">{children}</div>
          <div className="sidebar-right"></div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
