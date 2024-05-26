import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar/Navbar";

export default function HeaderFooterLayout() {
  return (
    <div className="!font-['Inter']">
      <Navbar />
      <main>
        <div className="min-h-screen p-4">
          <Outlet /> {/* Renders the nested routes */}
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
}
