import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components";
import { Home, ProductPage } from "./pages";
import "./styles/app.scss";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/product/:id" element={<ProductPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
