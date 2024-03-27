/* eslint-disable react/prop-types */
import "./commandDetails.scss";

const CommandDetails = (props) => {
  return (
    <div>
      <div className="popUpOverlay"></div>
      <div className="commandDetails">
        <h1>Command Details</h1>
        <div className="clientInfo">
          <h1>Client Information</h1>
          <div>
            <span>Full Name : &nbsp;</span>
            <p>
              {props.command.user.firstName} {props.command.user.lastName}
            </p>
          </div>
          <div>
            <span>Address : &nbsp;</span>
            <p>{props.command.user.address}</p>
          </div>

          <div>
            <span>Wilaya : &nbsp;</span>
            <p>{props.command.user.wilaya}</p>
          </div>
          <div>
            <span>Phone Number : &nbsp;</span>
            <p>{props.command.user.phoneNumber}</p>
          </div>
        </div>

        <div className="articlesInfo">
          <h1>Command Articles</h1>
          {props.command.articles.map((article) => (
            <div className="commandArticleInfo" key={article.id}>
              <div className="left">
                <img src={article.imageUrl} alt="" />
              </div>
              <div className="right">
                <span>
                  <span>Size : </span>
                  {article.size}{" "}
                </span>
                <span>
                  <span>Quantity : </span>
                  {article.quantity}{" "}
                </span>
                <span>
                  <span>Name : </span>
                  {article.name}{" "}
                </span>
                <span>
                  <span>Price : </span>
                  {article.quantity * article.price} DA
                </span>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => {
            props.setIsCommandClicked(false);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CommandDetails;
