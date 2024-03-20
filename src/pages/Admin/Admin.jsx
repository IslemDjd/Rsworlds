import "./admin.scss";
import { auth } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import LogInForm from "./components/LogInForm/LogInForm";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { set } from "react-hook-form";
// import { changePage } from "../../features/AdminPage";
// import { useSelector, useDispatch } from "react-redux";

const Admin = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  // const page = useSelector((state) => state.page.value);
  // console.log(page);
  // const signout = async () =>{
  //   await signOut(auth);
  // }
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("logged In");
      setLoggedIn(true);
    } else {
      console.log("Not logged In");
      // return <LogInForm />;
    }
  });

  return (
    <div>
      {loggedIn ? (
        <div>Logged In</div>
      ) : (
        <div>
          <LogInForm />
        </div>
      )}
    </div>
  );
};

export default Admin;
