// Import necessary dependencies
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Button } from "antd";
import "./App.css";
import Pages1 from "./pages/Pages-1";
import Pages2 from "./pages/Pages-2";
import Pages3 from "./pages/Pages-3";
import Pages4 from "./pages/Pages-4";
import Pages5 from "./pages/Pages-5";
import Home from "./pages/Home";
import { ArrowLeftOutlined } from "@ant-design/icons";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div>
      {location.pathname !== "/" && (
        <Button
        size="large"
          type="link"
          icon={<ArrowLeftOutlined />}
          onClick={handleBack}
          style={{ marginBottom: "20px" }}
        >
          Назад
        </Button>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/circle1" element={<Pages1 />} />
        <Route path="/circle2" element={<Pages2 />} />
        <Route path="/circle3" element={<Pages3 />} />
        <Route path="/circle4" element={<Pages4 />} />
        <Route path="/circle5" element={<Pages5 />} />
      </Routes>
    </div>
  );
}

export default App;
