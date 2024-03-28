/* eslint-disable react/prop-types */
import { doc, getDoc, updateDoc } from "firebase/firestore";
import "./commandDetails.scss";
import { FaTimes } from "react-icons/fa";
import { db } from "../../../../../../config/firebase";
import { useEffect, useState } from "react";
import PopUpWarning from "../../../../../../components/popUp/PopUpWarning";
import PopUpSuccess from "../../../../../../components/popUp/PopUpSuccess";
import ConfirmCancel from "./ConfirmCancel";

const CommandDetails = (props) => {
  const [commandStatus, setCommandStatus] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isCancelClicked, setIsCancelClicked] = useState(false);

  const getCommandById = async () => {
    const docRef = doc(db, "Commands", props.command.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const commandData = { ...docSnap.data(), id: docSnap.id };
      setCommandStatus(commandData.status);
    } else {
      console.log("Document not found");
    }
  };

  const handleAccept = async () => {
    const commandRef = doc(db, "Commands", props.command.id);
    try {
      await updateDoc(commandRef, {
        status: "Pending",
      });
      props.getCommands();
      getCommandById();

      setSuccess("Command Accepted");
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (error) {
      console.error("Error updating command status:", error);
    }
  };

  const handleCancel = async () => {
    const commandRef = doc(db, "Commands", props.command.id);
    try {
      await updateDoc(commandRef, {
        status: "Canceled",
      });
      props.getCommands();
      getCommandById();

      setError("Command Canceled");
      setTimeout(() => {
        setError(null);
      }, 3000);
    } catch (error) {
      console.error("Error updating command status:", error);
    }
  };

  const handleComplete = async () => {
    const commandRef = doc(db, "Commands", props.command.id);
    try {
      await updateDoc(commandRef, {
        status: "Completed",
      });
      props.getCommands();
      getCommandById();

      setSuccess("Command Completed");
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (error) {
      console.error("Error updating command status:", error);
    }
  };

  useEffect(() => {
    getCommandById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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

        <div className="commandStatus">
          <h1>Command Status</h1>
          <span>{commandStatus}</span>

          {commandStatus === "Not Confirmed" && (
            <div className="commandActions">
              <button onClick={handleAccept}>Accept</button>
              <button
                onClick={() => {
                  setIsCancelClicked(true);
                }}
              >
                Cancel
              </button>
            </div>
          )}

          {commandStatus === "Pending" && (
            <div className="commandActions">
              <button onClick={handleComplete}>Complete</button>
              <button
                onClick={() => {
                  setIsCancelClicked(true);
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <FaTimes
          className="closeCommand"
          onClick={() => {
            props.setIsCommandClicked(false);
          }}
        />
      </div>
      {isCancelClicked && (
        <ConfirmCancel
          setIsCancelClicked={setIsCancelClicked}
          getCommandById={getCommandById}
          handleCancel={handleCancel}
          setError={setError}
        />
      )}

      {error && <PopUpWarning errorText={error} setError={setError} />}
      {success && (
        <PopUpSuccess successText={success} setSuccess={setSuccess} />
      )}
    </div>
  );
};

export default CommandDetails;
