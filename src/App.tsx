import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UIProvider } from "./context/UIContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Post from "./pages/Post";

export default function App() {
  return (
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <UIProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<Post />} />
            <Route path="/work/:slug" element={<Post />} />
          </Routes>
        </Layout>
      </UIProvider>
    </BrowserRouter>
  );
}
