import React, { useState, useEffect } from "react";
import "./App.css";
import Home from "./Pages/UserPages.jsx/Home";
import Login from "./Pages/Login";
import { Route, Routes } from "react-router-dom";
import ResetLogin from "./Pages/ResetLogin";
import UpdateProfile from "./Pages/UserPages.jsx/UpdateProfile";
import Users from "./Pages/AdminPages/Users";
import AddUser from "./Pages/AdminPages/AddUser";
import UserSideBar from "./Components/UserSideBar";
import Navbar from "./Components/Navbar";
import Resource from './Pages/AdminPages/Bookings'
import Dashboard from "./Pages/AdminPages/Dashboard";
import AddEvent from "./Pages/UserPages.jsx/AddEvent";

function App() {
  return (
    
      <div className="w-100">
        <Routes>

          {/* USERS ROUTES  */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/resetPass" element={<ResetLogin />} />
          <Route path="/addEvent" element={<AddEvent />} />
          <Route path="/updateProfile" element={<UpdateProfile />} />
          


          {/* ADMIN ROUTES  */}
          <Route path="/admin/booking" element={<Resource/>}/>
          <Route path="/users" element={<Users />} />
          <Route path="/addUser" element={<AddUser />} />
          <Route path="/admin" element={<Dashboard />} />
        </Routes>
      </div>
  );
}

export default App;
