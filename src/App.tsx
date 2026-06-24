import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UIProvider } from "./context/UIContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";

export default function App() {
  return (
    <BrowserRouter>
      <UIProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Layout>
      </UIProvider>
    </BrowserRouter>
  );
}
