import { useNavigate, useParams } from "react-router";
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import Button from "../../components/button/Button";
import icon from "../../assets/cart.svg";
import "./articleDetails.scss";
import ArticleLoader from "../../loaders/ArticleLoader";

const ArticleDetails = () => {
  const [article, setArticle] = useState([]);
  // const [selectedSizes, setSelectedSizes] = useState({});
  // const [selectedQuantities, setSelectedQuantities] = useState({});
  const navigate = useNavigate();

  //    2nd method 💩
  //   const location = useLocation();
  //   const pathParts = location.pathname.split("/");
  //   const targetPart = pathParts.slice(2).join("/");

  const { ArticleID } = useParams();

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
    getArticleById(ArticleID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ArticleID]);

  // Check if article and article.size are defined
  if (!article || !article.size) {
    return <ArticleLoader />;
  }

  const sizesOrder = ["S", "M", "L", "XL", "XXL"];
  const sizeElements = sizesOrder
    .filter((size) => article.size[size] > 0) // Filter sizes with quantity > 0
    .map((size) => (
      <button
        key={size}
        style={{ backgroundColor: "gray", width: "80px", margin: "10px", display:"inline"}}
      >
        {size}
      </button>
    ));

  // const handleSizeChange = (size) => {
  //   setSelectedSizes((prev) => ({
  //     ...prev,
  //     [size]: !prev[size],
  //   }));
  // };

  // const handleQuantityChange = (size, increment) => {
  //   setSelectedQuantities((prev) => {
  //     const currentQuantity = prev[size] || 0;
  //     const newQuantity = Math.max(
  //       0,
  //       Math.min(article.size[size], currentQuantity + increment)
  //     );
  //     return {
  //       ...prev,
  //       [size]: newQuantity,
  //     };
  //   });

  //   console.log(selectedQuantities);
  //   console.log(selectedSizes);
  // };


  // const sizeElements = sizesOrder
  //   .filter((size) => article.size[size] > 0)
  //   .map((size) => (
  //     <div key={size}>
  //       <input
  //         type="checkbox"
  //         id={size}
  //         checked={selectedSizes[size]}
  //         onChange={() => handleSizeChange(size)}
  //       />
  //       <label htmlFor={size}>{size}</label>
  //       <button
  //         style={{ display: "inline" }}
  //         onClick={() => handleQuantityChange(size, -1)}
  //       >
  //         -
  //       </button>
  //       <span style={{ display: "inline" }}>
  //         {selectedQuantities[size] || 0}
  //       </span>
  //       <button
  //         style={{ display: "inline" }}
  //         onClick={() => handleQuantityChange(size, 1)}
  //       >
  //         +
  //       </button>
  //     </div>
  //   ));

  return (
    <div className="articleFrame">
      <div className="right">
        <img src={article.imageUrl} alt="Picture" />
      </div>
      <div className="left">
        <h1 className="articleTitle">{article.name}</h1>
        <span className="articleSize">
          Available Sizes : <br />
          {sizeElements}
        </span>
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
