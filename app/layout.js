import "@/assets/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalProvider } from "@/context/GlobalContext";
import 'photoswipe/dist/photoswipe.css';


export const metadata = {
  title: "Next.js Property Search",
  keywords: "Next.js, Tailwind CSS, Property Search, Real Estate",
  description:
    "A simple property search application built with Next.js and Tailwind CSS.",
};

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <GlobalProvider>
      <html>
        <body>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ToastContainer />
        </body>
      </html>
      </GlobalProvider>
    </AuthProvider>
  );
};

export default MainLayout;
