import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import IncomeSectors from "./Pages/IncomeSectors";
import Incomes from "./Pages/Incomes";
import Login from "./Pages/Login";
import ProfilePage from "./Pages/ProfilePage";
import Register from "./Pages/Register";
import ExpenceSectors from "./Pages/ExpenceSectors";
import Expences from "./Pages/Expences";
import LoanSectors from "./Pages/LoanSectors";
import Loans from "./Pages/Loans";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register/>} />
      <Route path="/income-sectors" element={<IncomeSectors />} />
      <Route path="/incomes" element={<Incomes />} />
      <Route path="/expence-sectors" element={<ExpenceSectors />} />
      <Route path="/expences" element={<Expences />} />
      <Route path="/loan-sectors" element={<LoanSectors />} />
      <Route path="/loans" element={<Loans />} />
    </Routes>
  );
}

export default AppRoutes;
