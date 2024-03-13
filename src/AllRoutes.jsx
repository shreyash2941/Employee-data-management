import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import MainForm from "./MainForm";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/" element={<Signup />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/employeelist" element={<MainForm />}></Route>
    </Routes>
  );
}

export default AllRoutes;
