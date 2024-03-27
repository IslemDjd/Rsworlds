import { useEffect, useState } from "react";
import SideBar from "../../SideBar/SideBar";
import "./commands.scss";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../../config/firebase";
import CommandDetails from "./CommandDetails/CommandDetails";

const Commands = () => {
  const [commands, setCommands] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isCommandClicked, setIsCommandClicked] = useState(false);
  const [selectedCommand, setSelectedCommand] = useState({});

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

  const filteredCommands = commands.filter((command) => {
    if (filter === "all") {
      return (
        command.status === "Not Confirmed" ||
        command.status === "Pending" ||
        command.status === "Canceled"
      );
    } else if (filter === "completed") {
      return command.status === "Completed";
    } else if (filter === "notConfirmed") {
      return command.status === "Not Confirmed";
    } else if (filter === "pending") {
      return command.status === "Pending";
    } else if (filter === "canceled") {
      return command.status === "Canceled";
    }
    return false;
  });

  return (
    <div className="commands">
      <SideBar />
      <div className="rightSide">
        <h1>Commands</h1>
        <div className="radio-inputs">
          <label className="radio">
            <input
              type="radio"
              name="radio"
              value="all"
              checked={filter === "all"}
              onChange={(e) => setFilter(e.target.value)}
            />
            <span className="name">All</span>
          </label>
          <label className="radio">
            <input
              type="radio"
              name="radio"
              value="completed"
              checked={filter === "completed"}
              onChange={(e) => setFilter(e.target.value)}
            />
            <span className="name">Completed</span>
          </label>
          <label className="radio">
            <input
              type="radio"
              name="radio"
              value="notConfirmed"
              checked={filter === "notConfirmed"}
              onChange={(e) => setFilter(e.target.value)}
            />
            <span className="name">Not Confirmed</span>
          </label>

          <label className="radio">
            <input
              type="radio"
              name="radio"
              value="pending"
              checked={filter === "pending"}
              onChange={(e) => setFilter(e.target.value)}
            />
            <span className="name">Pending</span>
          </label>
          <label className="radio">
            <input
              type="radio"
              name="radio"
              value="canceled"
              checked={filter === "canceled"}
              onChange={(e) => setFilter(e.target.value)}
            />
            <span className="name">Canceled</span>
          </label>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th className="orderId">Order N&deg;</th>
              <th className="clienName">Client Name</th>
              <th className="wilaya">Wilaya</th>
              <th className="orderDate">Date</th>
              <th className="orderPrice">Price</th>
              <th className="orderStatus">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredCommands.map((command, index) => (
              <tr
                key={index}
                onClick={() => {
                  if (!isCommandClicked) {
                    setSelectedCommand(command);
                    setIsCommandClicked(true);
                  }
                }}
              >
                <td>{index + 1}</td>
                <td>
                  {command.user.firstName} {command.user.lastName}
                </td>
                <td>{command.user.wilaya}</td>
                <td>
                  {new Date(command.commandDate).toLocaleDateString("en-GB")}
                </td>
                <td>
                  {command.articles.reduce(
                    (acc, article) => acc + article.quantity * article.price,
                    0
                  )}{" "}
                  DA
                </td>
                <td>{command.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {isCommandClicked && (
          <CommandDetails
            command={selectedCommand}
            setIsCommandClicked={setIsCommandClicked}
          />
        )}

        <div style={{ height: "400px" }}></div>
      </div>
    </div>
  );
};

export default Commands;
