import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Footer from "./components/footer/Footer";
import Article from "./pages/Articles/Articles";
import Error from "./pages/Error";
import ArticleDetails from "./pages/ArticleDetails/ArticleDetails";


function App() {
  // console.log(import.meta.env.VITE_API_KEY);
  // console.log(import.meta.env.VITE_MEASUREMENT_ID);
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Article />} />
          <Route path="/articles/:ArticleID" element={<ArticleDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
