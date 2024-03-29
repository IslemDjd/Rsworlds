import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import SideBar from "../../SideBar/SideBar";
import "./settings.scss";
import { auth, db } from "../../../../../config/firebase";
import { useState } from "react";
import PopUpSuccess from "../../../../../components/popUp/PopUpSuccess";
import PopUpWarning from "../../../../../components/popUp/PopUpWarning";
import { updatePassword } from "firebase/auth";
const Settings = () => {
  const linksCollectionRef = collection(db, "Links");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const [facebookLink, setFacebookLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [tiktokLink, setTiktokLink] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const updateFacebookLink = async () => {
    try {
      const Links = await getDocs(linksCollectionRef);
      const firstDoc = Links.docs[0];
      await updateDoc(doc(db, "Links", firstDoc.id), {
        facebook: facebookLink,
      });
      setSuccess("Facebook Link Updated Successfully");
      setTimeout(() => {
        setSuccess(null);
        setFacebookLink("");
      }, 3000);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };
  const updateInsatgramLink = async () => {
    try {
      const Links = await getDocs(linksCollectionRef);
      const firstDoc = Links.docs[0];
      await updateDoc(doc(db, "Links", firstDoc.id), {
        instagram: instagramLink,
      });
      setSuccess("Instagram Link Updated Successfully");
      setTimeout(() => {
        setSuccess(null);
        setInstagramLink("");
      }, 3000);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };
  const updateTiktokLink = async () => {
    try {
      const Links = await getDocs(linksCollectionRef);
      const firstDoc = Links.docs[0];
      await updateDoc(doc(db, "Links", firstDoc.id), {
        tiktok: tiktokLink,
      });
      setSuccess("TikTok Link Updated Successfully");
      setTimeout(() => {
        setSuccess(null);
        setTiktokLink("");
      }, 3000);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const updatePhoneNumber = async () => {
    try {
      if (!isValidPhoneNumber(phoneNumber)) {
        setError("Invalid Phone Number Format");
        setTimeout(() => {
          setError(null);
        }, 3000);
        return;
      }

      const Links = await getDocs(linksCollectionRef);
      const firstDoc = Links.docs[0];
      await updateDoc(doc(db, "Links", firstDoc.id), {
        phoneNumber: phoneNumber,
      });
      setSuccess("Phone Number Updated Successfully");
      setTimeout(() => {
        setSuccess(null);
        setPhoneNumber("");
      }, 3000);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const updateAdminPassword = async () => {
    try {
      await updatePassword(auth.currentUser, newPassword);
      setSuccess("Password Updated Successfully");
      setTimeout(() => {
        setSuccess(null);
        setNewPassword("");
      }, 3000);
    } catch (error) {
      setError("Error updating password: " + error.message);
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  return (
    <div className="settings">
      <SideBar />
      <div className="rightSide">
        <h1>Settings</h1>

        <div className="socialLinks">
          <label htmlFor="facebook">Facebook</label>
          <div>
            <input
              type="text"
              id="facebook"
              placeholder="New Facebook Link"
              value={facebookLink}
              onChange={(e) => {
                setFacebookLink(e.target.value);
              }}
            />
            <button onClick={updateFacebookLink}>Modify</button>
          </div>

          <label htmlFor="instagram">Instagram</label>
          <div>
            <input
              type="text"
              id="instagram"
              value={instagramLink}
              placeholder="New Instagram Link"
              onChange={(e) => {
                setInstagramLink(e.target.value);
              }}
            />
            <button onClick={updateInsatgramLink}>Modify</button>
          </div>

          <label htmlFor="tiktok">Tiktok</label>
          <div>
            <input
              type="text"
              id="tiktok"
              value={tiktokLink}
              placeholder="New Tiktok Link"
              onChange={(e) => {
                setTiktokLink(e.target.value);
              }}
            />
            <button onClick={updateTiktokLink}>Modify</button>
          </div>

          <label htmlFor="phoneNumber">Phone Number</label>
          <div>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              placeholder="New Phone Number"
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />
            <button onClick={updatePhoneNumber}>Modify</button>
          </div>

          <h3>Set New Admin Password</h3>
          <label htmlFor="newPassword">New Password</label>
          <div>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              placeholder="New Password"
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
            />
            <button onClick={updateAdminPassword}>Modify</button>
          </div>
        </div>
        {error && <PopUpWarning errorText={error} setError={setError} />}
        {success && (
          <PopUpSuccess successText={success} setSuccess={setSuccess} />
        )}

        <div style={{ height: "400px" }}></div>
      </div>
    </div>
  );
};

export default Settings;
