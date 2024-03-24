/* eslint-disable react/prop-types */
import "./popUpConfirm.scss";
import deleteArticle from "../../utils/deleteArticle";

const PopUpConfirm = (props) => {
  const acceptButton = async () => {
    props.setIsDeleteClicked(false);
    await deleteArticle(
      props.article.id,
      props.article.imageUrl,
      props.getArticles
    );
    props.setSuccess("Article Deleted Successfully");
    setTimeout(() => {
      props.setSuccess(null);
    }, 3000);
  };

  return (
    <>
      <div className="popUpOverlay"></div>
      <div className="PopUpConfirm">
        <p className="cookieHeading">
          Are You Sure You Want To Delete This Article
        </p>
        <div className="buttonContainer">
          <button
            className="acceptButton"
            onClick={() => {
              acceptButton();
            }}
          >
            Confirm
          </button>
          <button
            className="declineButton"
            onClick={() => {
              props.setIsDeleteClicked(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default PopUpConfirm;
