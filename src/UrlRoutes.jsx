import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./screens/Login";
import BuyerHome from "./screens/Buyer/BuyerHome";
import SellerHome from "./screens/Seller/SellerHome";
import Register from "./screens/Register";

export default function Url_Routes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/buyer">
          <Route index element={<BuyerHome />} />
        </Route>

        <Route path="/seller">
          <Route index element={<SellerHome />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>
    </BrowserRouter>
  )
}
