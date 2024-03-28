/* eslint-disable react/prop-types */
const ConfirmCancel = (props) => {
  const confirmButton = async () => {
    await props.handleCancel();
    props.getCommandById();
    props.setIsCancelClicked(false);
  };
  return (
    <>
      <div className="popUpOverlay"></div>
      <div className="PopUpConfirm">
        <p className="cookieHeading">
          Are You Sure You Want To Cancel This Command ?
        </p>
        <div className="buttonContainer">
          <button
            className="acceptButton"
            onClick={() => {
              confirmButton();
            }}
          >
            Confirm
          </button>
          <button
            className="declineButton"
            onClick={() => {
              props.setIsCancelClicked(false);
            }}
          >
            Go Back
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfirmCancel;
