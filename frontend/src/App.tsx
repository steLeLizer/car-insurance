import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Inquiry from "./components/inquiry/Inquiry";
import NotFound from "./components/not-found/NotFound";
import Offer from "./components/offer/Offer";
import React from "react";
import ProtectedRoute from "./guards/ProtectedRoute";

const App = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <div className="flex flex-col h-screen">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Inquiry />} />
              <Route path="/offer" element={<Offer />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
          <footer>
            <p className="footer bg-white relative pt-1 border-b-2 border-blue-700 text-center bg-gradient-to-tr font-normal from-blue-600 to-cyan-300 p-8 shadow text-white">
              ® Qover {new Date().getFullYear()}
            </p>
          </footer>
        </div>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default App;
