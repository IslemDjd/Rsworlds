// import Card from "../../components/card/Card";
import "./articles.scss";
// import { db } from "../../config/firebase";
// import { useEffect, useState } from "react";
// import { getDocs, collection } from "firebase/firestore";

const Article = () => {
  // const [articles, setArticles] = useState([]);

  // const articlesCollectionrRef = collection(db, "Articles");

  // const getArticles = async () => {
  //   try {
  //     const data = await getDocs(articlesCollectionrRef);
  //     const filteredArticles = data.docs.map((doc) => ({
  //       ...doc.data(),
  //       id: doc.id,
  //     }));
  //     setArticles(filteredArticles);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // useEffect(() => {
  //   getArticles();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <h1>Hey</h1>
    // <div className="frame">
    //   {articles.map((article) => (
    //     <Card
    //       key={article.id}
    //       img={article.imageUrl}
    //       name={article.name}
    //       price={article.price}
    //       size={article.size}
    //       articleId={article.id}
    //     />
    //   ))}
    // </div>
  );
};

export default Article;
