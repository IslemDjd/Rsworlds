import "./overview.scss";
import SideBar from "../../SideBar/SideBar";
import { FaCartShopping } from "react-icons/fa6";
import { MdRemoveShoppingCart } from "react-icons/md";
import { TbShoppingCartCopy } from "react-icons/tb";
import { MdShoppingCartCheckout } from "react-icons/md";
import { TbShoppingCartQuestion } from "react-icons/tb";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../../config/firebase";
import { useEffect, useState } from "react";

const Overview = () => {
  const [commands, setCommands] = useState([]);

  const getCommands = async () => {
    try {
      const commandsRef = collection(db, "Commands");
      const data = await getDocs(commandsRef);
      const commandsData = data.docs.map((doc) => doc.data());
      setCommands(commandsData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCommands();
  }, []);
  return (
    <div className="overview">
      <SideBar />

      <div className="rightSide">
        <h1>Overview</h1>

        <div className="overviewFrame">
          <div className="row">
            <div className="Card">
              <FaCartShopping className="icon" />
              <h3>
                Total Commands
                <br />
                &nbsp; {commands?.length}
              </h3>
            </div>
            <div className="Card">
              <TbShoppingCartCopy className="icon" />
              <h3>
                Commands Completed <br />
                &nbsp;{" "}
                {
                  commands.filter((command) => command.status === "Completed")
                    .length
                }
              </h3>
            </div>
          </div>

          <div className="row">
            <div className="Card">
              <MdShoppingCartCheckout className="icon" />
              <h3>
                Commands Processing <br />
                &nbsp;{" "}
                {
                  commands.filter((command) => command.status === "Pending")
                    .length
                }
              </h3>
            </div>
            <div className="Card">
              <MdRemoveShoppingCart className="icon" />
              <h3>
                Commands Canceled <br />
                &nbsp;{" "}
                {
                  commands.filter((command) => command.status === "Canceled")
                    .length
                }
              </h3>
            </div>
          </div>

          <div className="row">
            <div className="Card">
              <TbShoppingCartQuestion className="icon" />
              <h3>
                Commands Not Confirmed <br />
                &nbsp;{" "}
                {
                  commands.filter(
                    (command) => command.status === "Not Confirmed"
                  ).length
                }
              </h3>
            </div>
          </div>
        </div>

        <div style={{ height: "400px" }}></div>
      </div>
    </div>
  );
};

export default Overview;
