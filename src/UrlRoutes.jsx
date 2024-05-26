import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./screens/Login";
import BuyerHome from "./screens/Buyer/BuyerHome";
import SellerHome from "./screens/Seller/SellerHome";
import Register from "./screens/Register";
import HeaderFooterLayout from "./screens/HeaderFooterLayout";
import axios from "axios";
import { ThemeProvider, createTheme } from "@mui/material";
import Addproperty from "./screens/Seller/Addproperty";
import SellerAbout from "./screens/Seller/SellerAbout";
import MyListings from "./screens/Seller/MyListings";

export default function Url_Routes() {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        window.location.reload();

        return Promise.reject(error);
      }
      return Promise.reject(error);
    }
  );

  const theme = createTheme({
    palette: {
      primary: {
        main: "#167800", // #181E7F
        contrastText: "#FFF",
      },
    },
    typography: {
      allVariants: {
        fontFamily: "Inter",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/buyer" element={<HeaderFooterLayout />}>
            <Route index element={<BuyerHome />} />
          </Route>

          <Route path="/seller" element={<HeaderFooterLayout />}>
            <Route index element={<SellerHome />} />
            <Route path="add-property" element={<Addproperty />} />
            <Route path="my-listings" element={<MyListings />} />
            <Route path="about" element={<SellerAbout />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
