import { Outlet } from "react-router-dom";
import TopNavBar from "../components/TopNavBar";
import Footer from "../components/Footer";

export default function HeaderFooterLayout() {
  return (
    <div className="!font-['Inter']">
      <TopNavBar />
      <main>
        <div className="min-h-screen py-16 sm:py-24">
          <Outlet /> {/* Renders the nested routes */}
        </div>
      </main>
      <Footer />
    </div>
  );
}
