import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import IncomeSectors from "./Pages/IncomeSectors";
import Login from "./Pages/Login";
import ProfilePage from "./Pages/ProfilePage";
import Register from "./Pages/Register";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register/>} />
      <Route path="/income-sectors" element={<IncomeSectors />} />
    </Routes>
  );
}

export default AppRoutes;
