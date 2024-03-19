import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
// import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Footer from "./components/footer/Footer";
import Article from "./pages/Articles/Articles";
import Error from "./pages/Error";
import ArticleDetails from "./pages/ArticleDetails/ArticleDetails";
import Checkout from "./pages/Checkout/Checkout";
import ConfirmSucess from "./pages/Checkout/ConfirmSuccess/ConfirmSucess";
import Admin from "./pages/Admin/Admin";

function App() {
  // console.log(import.meta.env.VITE_API_KEY);
  // console.log(import.meta.env.VITE_MEASUREMENT_ID);
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="admin" element={<Admin />} />
          <Route path="/" element={<Article />} />
          <Route path="articles" element={<Article />} />
          <Route path="articles/:ArticleID" element={<ArticleDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="confirmationSucces" element={<ConfirmSucess />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
