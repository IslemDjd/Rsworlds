import SideBar from "../../../SideBar/SideBar";
import "./deleteArticles.scss";
import { db } from "../../../../../../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { useState, useEffect } from "react";
import Button from "../../../../../../components/button/Button";
import deleteIcon from "../../../../../../assets/delete.svg";
import PopUpConfirm from "../../../../../../components/popUp/PopUpConfirm";
import PopUpSuccess from "../../../../../../components/popUp/PopUpSuccess";

const DeleteArticles = () => {
  const [articles, setArticles] = useState([]);
  const [success, setSuccess] = useState(null);
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  const [deletedArticle, setDeletedArticle] = useState({});

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

  return (
    <div className="deleteArticles">
      <SideBar />

      <div className="rightSide">
        <h1 className="pageTitle">Delete Articles</h1>
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
                    <b style={{ fontFamily: "kanit" }}>Price : </b>
                    {article.price}DA
                  </span>
                </div>
                <Button
                  onClick={() => {
                    if (!isDeleteClicked) {
                      setDeletedArticle(article);
                      setIsDeleteClicked(true);
                    }
                  }}
                  width="100%"
                  margin="0 0.5rem 0.5rem 0.5rem"
                  text="Delete"
                  image={deleteIcon}
                />
              </div>
            </div>
          ))}
        </div>
        {isDeleteClicked && (
          <PopUpConfirm
            article={deletedArticle}
            setIsDeleteClicked={setIsDeleteClicked}
            getArticles={getArticles}
            setSuccess={setSuccess}
          />
        )}

        {success && (
          <PopUpSuccess successText={success} setSuccess={setSuccess} />
        )}
      </div>
    </div>
  );
};

export default DeleteArticles;
