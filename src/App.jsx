import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Test from "./pages/Test";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/register" exact element={<Register />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/home" exact element={<Home />} />
          <Route path="/test" exact element={<Test />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
