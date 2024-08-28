import { Outlet } from "react-router-dom";

// Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
