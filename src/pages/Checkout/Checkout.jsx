import "./checkout.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import wilayas from "./wilayas.json";
import { db } from "../../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { removeAllArticles } from "../../features/CartArticle";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartArticle = useSelector((state) => state.cartArticle.value.bucket);

  const schema = yup.object().shape({
    firstName: yup.string().required("Please Enter Your First Name"),
    lastName: yup.string().required("Please Enter Your Last Name"),
    phoneNumber: yup
      .string()
      .required("Please Enter Your Phone Number")
      .matches(/^\d{10}$/, "Phone Number must be 10 digits"),
    address: yup.string().required("Please Enter Your Home Address"),
    wilaya: yup.string().required("Please Select a Wilaya"),
  });

  useEffect(() => {
    const selectedArticles = localStorage.getItem("selectedArticles");
    if (
      !selectedArticles ||
      JSON.parse(selectedArticles).length === 0 ||
      cartArticle.length === 0
    ) {
      navigate("/articles");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const commandsRef = collection(db, "Commands");

  const currentDate = new Date();
  const timezoneOffset = currentDate.getTimezoneOffset();
  const adjustedOffsetInMs = Math.abs(timezoneOffset) * 60 * 1000;
  const localDate = new Date(currentDate.getTime() + adjustedOffsetInMs);
  const localDateString = localDate.toISOString();

  const onSubmit = async (data) => {
    const command = {
      user: data,
      articles: JSON.parse(localStorage.getItem("selectedArticles")),
      commandDate: localDateString,
      status: "Not Confirmed"
    };
    await addDoc(commandsRef, command);
    navigate("/confirmationSucces");
    window.scroll(0, 0);
    localStorage.removeItem("selectedArticles");
    dispatch(removeAllArticles());
  };
  return (
    <div style={{ position: "relative", padding: "3rem 0" }}>
      <form action="" onSubmit={handleSubmit(onSubmit)} className="clientForm">
        <h1>Client Information</h1>
        <p className="input-container">
          <input
            type="text"
            placeholder="First Name (Prenom)"
            name="firstName"
            className="input-field"
            autoComplete="Fisrt Name"
            {...register("firstName")}
          />
          <label className="input-label" htmlFor="firstName">
            Fisrt Name
          </label>
        </p>
        <span className="errorSpan">{errors.firstName?.message}</span>
        <p className="input-container">
          <input
            type="text"
            placeholder="Last Name (Nom)"
            name="lastName"
            className="input-field"
            autoComplete="Last Name"
            {...register("lastName")}
          />
          <label className="input-label" htmlFor="lastName">
            Last Name
          </label>
        </p>
        <span className="errorSpan">{errors.lastName?.message}</span>
        <p className="input-container">
          <input
            type="number"
            placeholder="Enter your Phone Number"
            name="phoneNumber"
            className="input-field"
            autoComplete="Phone Number"
            {...register("phoneNumber")}
          />
          <label className="input-label" htmlFor="phoneNumber">
            Phone Number
          </label>
        </p>
        <span className="errorSpan">{errors.phoneNumber?.message}</span>
        <p className="input-container">
          <input
            type="text"
            placeholder="Enter Your Address"
            name="address"
            className="input-field"
            autoComplete="Phone Number"
            {...register("address")}
          />
          <label className="input-label" htmlFor="address">
            Address
          </label>
        </p>
        <span className="errorSpan">{errors.address?.message}</span>
        <p className="input-container">
          <select className="input-field wilayas" {...register("wilaya")}>
            {wilayas.map((wilaya, index) => (
              <option key={index} value={wilaya.value}>
                {wilaya.label}
              </option>
            ))}
          </select>
        </p>
        <span className="errorSpan">{errors.wilaya?.message}</span>

        <button className="confirm"> Confirmer </button>
      </form>
      {/* {orderConfirmed && <ConfirmSucess />} */}
    </div>
  );
};

export default Checkout;
