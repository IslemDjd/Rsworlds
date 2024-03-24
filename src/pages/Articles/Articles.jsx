import Card from "../../components/card/Card";
import "./articles.scss";
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import ArticleLoader from "../../loaders/ArticleLoader";

const Article = () => {
  const [articles, setArticles] = useState([]);

  const articlesCollectionrRef = collection(db, "Articles");

  const getArticles = async () => {
    try {
      const data = await getDocs(articlesCollectionrRef);
      const sortedArticles = data.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .sort((a, b) => {
          return new Date(b.dateAdded) - new Date(a.dateAdded);
        });

      setArticles(sortedArticles);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterAndSortSizes = (sizes) => {
    const sizeOrder = ["S", "M", "L", "XL", "XXL"];
    return sizeOrder.filter((size) => sizes[size] > 0);
  };

  if (!articles || articles.length === 0) {
    return <ArticleLoader />;
  }

  return (
    <div className="frame">
      {articles.map((article) => (
        <Card
          key={article.id}
          img={article.imageUrl}
          name={article.name}
          price={article.price}
          size={filterAndSortSizes(article.size).map((size) => (
            <span key={size}>{size} </span>
          ))}
          articleId={article.id}
        />
      ))}
    </div>
  );
};

export default Article;
