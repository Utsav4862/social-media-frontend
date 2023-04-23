import logo from "./logo.svg";
import "./App.css";
import Login from "./Components/Login";
import { Route, Routes } from "react-router-dom";
import Signup from "./Components/Signup";
// import HomeRoutes from "./Components/HomeRoutes";
import Main from "./Components/Main";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home/*" element={<Main />} />
    </Routes>
  );
}

export default App;
