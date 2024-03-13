import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import "./articleDetails.scss";
import ArticleLoader from "../../loaders/ArticleLoader";
import ArticleForm from "./ArticleForm/ArticleForm";
import getArticleById from "../../utils/getArticleById";

const ArticleDetails = () => {
  const [article, setArticle] = useState([]);
  const navigate = useNavigate();

  const { ArticleID } = useParams();

  useEffect(() => {
    getArticleById(ArticleID, setArticle, navigate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ArticleID]);

  // Check if article and article.size are defined
  if (!article || !article.size) {
    return <ArticleLoader />;
  }

  return (
    <div className="articleFrame">
      <div className="right">
        <img src={article.imageUrl} alt="Picture" />
      </div>
      <div className="left">
        <h1 className="articleTitle">{article.name}</h1>
        <span className="articlePrice">
          <h3>Price : </h3>
          <span>{article.price}</span>
          <h3> DA</h3>
        </span>
        <ArticleForm article={article} />
      </div>
    </div>
  );
};

export default ArticleDetails;
