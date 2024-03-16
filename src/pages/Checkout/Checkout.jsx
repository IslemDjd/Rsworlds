import "./checkout.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import wilayas from "./wilayas.json";

const Checkout = () => {
  const schema = yup.object().shape({
    firstName: yup.string().required("Please Enter Your First Name"),
    lastName: yup.string().required("Please Enter Your Last Name"),
    phoneNumber: yup
      .string()
      // .typeError("Please Enter a Valid Phone Number")
      // .positive("Please Enter a Valid Phone Number")
      // .integer("Please Enter a Valid Phone Number")
      .required("Please Enter Your Phone Number")
      .matches(/^\d{10}$/, "Phone Number must be 10 digits"),
    address: yup.string().required("Please Enter Your Home Address"),
    wilaya: yup.string().required("Please Select a Wilaya"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    // console.log(data);
    // console.log(JSON.parse(localStorage.getItem("selectedArticles")));
    const command = {
      user: data,
      articles: JSON.parse(localStorage.getItem("selectedArticles")),
    };
    console.log(command);

  };
  return (
    <div>
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
          {/* <label className="input-label" htmlFor="address">
            Wilaya
          </label> */}
        </p>
        <span className="errorSpan">{errors.wilaya?.message}</span>

        <button className="confirm"> Confirmer </button>
      </form>
    </div>
  );
};

export default Checkout;
