import { useEffect, useState } from "react";
import SideBar from "../../SideBar/SideBar";
import "./commands.scss";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../../config/firebase";

const Commands = () => {
  const [commands, setCommands] = useState([]);

  const articlesCollectionrRef = collection(db, "Commands");

  const getCommands = async () => {
    try {
      const data = await getDocs(articlesCollectionrRef);
      const sortedCommands = data.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .sort((a, b) => {
          return new Date(a.commandDate) - new Date(b.commandDate);
        });

      setCommands(sortedCommands);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCommands();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // const data = [
  //   {
  //     Product_Name: "Islem Djoudi",
  //     Address: "Oued Kouba 2 Annaba",
  //     Date: "26/03/2024",
  //     Price: "3000 DA",
  //     Status: "Complete",
  //   },
  //   {
  //     Product_Name: "Laouar Mohammed Mouaad",
  //     Address: "Palmier",
  //     Date: "26/03/2024",
  //     Price: "5000 DA",
  //     Status: "Canceled",
  //   },
  // ];
  return (
    <div className="commands">
      <SideBar />
      <div className="rightSide">
        <h1>Commands</h1>
        <table className="table">
          <thead>
            <tr>
              <th className="orderId">Order ID</th>
              <th className="clienName">Client Name</th>
              <th className="address">Address</th>
              <th className="orderDate">Date</th>
              <th className="orderPrice">Price</th>
              <th className="orderStatus">Status</th>
            </tr>
          </thead>
          <tbody>
            {commands.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {item.user.firstName}
                  &nbsp;
                  {item.user.lastName}
                </td>
                <td>{item.user.address}</td>
                <td>
                  {new Date(item.commandDate).toLocaleDateString("en-GB")}
                </td>
                <td>/</td>
                <td>Pending</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ height: "400px" }}></div>
      </div>
    </div>
  );
};

export default Commands;
