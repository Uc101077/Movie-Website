import { useContext } from "react";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./pages/Home";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Watchlist from "./pages/Watchlist";
import { Toaster } from "react-hot-toast";
import MovieDetail from "./pages/MovieDetail";


function App() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <Toaster
        position="top-center"
        containerStyle={{
          top: 20,
          right: 20,
          left: "50%",
          transform: "translateX(-50%)",
          bottom: "auto",
          zIndex: 9999,
        }}
        toastOptions={{
          style: {
            background: "#1c1c1c",
            color: "#fff",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
            maxWidth: "250px",
          },
          duration: 1500,
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/watchlist"
            element={user ? <Watchlist /> : <Navigate to="/login" replace />}
          />
          <Route path="/movies/:id" element={<MovieDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
