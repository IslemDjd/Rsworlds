import "./sideBar.scss";
import { IoMdSettings } from "react-icons/io";
import { IoLogInOutline } from "react-icons/io5";
import { GrOverview } from "react-icons/gr";
import { FaShoppingBag } from "react-icons/fa";
import { GiLargeDress } from "react-icons/gi";
import { signOut } from "firebase/auth";
import { auth } from "../../../../config/firebase";
import { useDispatch } from "react-redux";
import { changePage } from "../../../../features/AdminPage";

const SideBar = () => {
  // const page = useSelector((state) => state.page.value);
  const dispatch = useDispatch();

  const signout = async () => {
    await signOut(auth);
  };
  return (
    <div className="sideBar">
      <ul>
        <li
          onClick={() => {
            dispatch(changePage("Overview"));
          }}
        >
          <GrOverview />
          &nbsp;Overview
        </li>
        <li
          onClick={() => {
            dispatch(changePage("Articles"));
          }}
        >
          <GiLargeDress />
          &nbsp;Articles
        </li>
        <li
          onClick={() => {
            dispatch(changePage("Commands"));
          }}
        >
          <FaShoppingBag />
          &nbsp;Commands
        </li>
      </ul>

      <ul>
        <li
          onClick={() => {
            dispatch(changePage("Settings"));
          }}
        >
          <IoMdSettings />
          &nbsp;Settings
        </li>
        <li onClick={signout}>
          <IoLogInOutline />
          &nbsp;Log Out
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
