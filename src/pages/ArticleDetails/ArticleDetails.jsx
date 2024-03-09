import { useNavigate, useParams } from "react-router";
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import Button from "../../components/button/Button";
import icon from "../../assets/cart.svg";
import "./articleDetails.scss";

const ArticleDetails = () => {
  const [article, setArticle] = useState([]);
  const navigate = useNavigate();

  //    2nd method 💩
  //   const location = useLocation();
  //   const pathParts = location.pathname.split("/");
  //   const targetPart = pathParts.slice(2).join("/");

  const test = useParams();

  const getArticleById = async (articleId) => {
    try {
      const docRef = doc(db, "Articles", articleId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const articleData = { ...docSnap.data(), id: docSnap.id };
        setArticle(articleData);
      } else {
        navigate("*");
        return null;
      }
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  useEffect(() => {
    getArticleById(test.ArticleID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

   useEffect(() => {
     const handleReload = () => {
       getArticleById(test.ArticleID);
     };

     window.addEventListener("beforeunload", handleReload);

     return () => {
       window.removeEventListener("beforeunload", handleReload);
     };
     // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

  return (
    <div className="articleFrame">
      <div className="right">
        <img src={article.imageUrl} alt="Picture" />
      </div>
      <div className="left">
        <h1 className="articleTitle">{article.name}</h1>
        <span className="articleSize">Available Sizes : {article.size}</span>
        <span className="articlePrice">Price : {article.price}</span>
        <span className="articleQuantity">Quantity : {article.quantity}</span>
        <Button
          image={icon}
          width="200px"
          height="2rem"
          margin="1rem 0"
          text="Add to cart"
        />
      </div>
    </div>
  );
};

export default ArticleDetails;
