import { collection, getDocs } from "firebase/firestore";
import SideBar from "../../../SideBar/SideBar";
import "./updateArticles.scss";
import { useEffect, useState } from "react";
import { db } from "../../../../../../config/firebase";
import Button from "../../../../../../components/button/Button";
import updateIcon from "../../../../../../assets/updateIcon.svg";
import UpdateCard from "./UpdateCard/UpdateCard";

const UpdateArticles = () => {
  const [isUpdateClicked, setIsUpdateClicked] = useState(false);
  const [updatedArticle, setUpdatedArticle] = useState({});

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

  const filterAndSortSizes = (sizes) => {
    const sizeOrder = ["S", "M", "L", "XL", "XXL"];
    return sizeOrder.filter((size) => sizes[size] > 0);
  };

  useEffect(() => {
    getArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="updateArticles">
      <SideBar />

      <div className="rightSide">
        <h1 className="pageTitle">Update Articles</h1>
        <div className="frame">
          {articles.map((article) => (
            <div className="card" key={article.id}>
              <div className="image_container">
                <img className="image" src={article.imageUrl} alt="" />
              </div>
              <div className="action">
                <div className="title">
                  <span>{article.name}</span>
                </div>
                <div className="price">
                  <span>
                    <b style={{ fontFamily: "kanit" }}>Size : </b>
                    {filterAndSortSizes(article.size).map((size) => (
                      <span key={size}>{size} </span>
                    ))}
                  </span>
                  <br />
                  <span>
                    <b style={{ fontFamily: "kanit" }}>Price : </b>
                    {article.price}DA
                  </span>
                </div>
                <Button
                  onClick={() => {
                    if (!isUpdateClicked) {
                      setUpdatedArticle(article);
                      setIsUpdateClicked(true);
                    }
                  }}
                  width="100%"
                  margin="0 0.5rem 0.5rem 0.5rem"
                  text="Update"
                  image={updateIcon}
                />
              </div>
            </div>
          ))}
        </div>

        {isUpdateClicked && (
          <UpdateCard
            article={updatedArticle}
            setIsUpdateClicked={setIsUpdateClicked}
            getArticles={getArticles}
          />
        )}
      </div>
    </div>
  );
};

export default UpdateArticles;
