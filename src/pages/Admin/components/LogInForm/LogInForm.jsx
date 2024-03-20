import "./logInForm.scss";
import { auth } from "../../../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const LogInForm = () => {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="adminCard">
      <h1>Admin Authentification</h1>
      <form className="adminForm" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter The Email"
          {...register("email")}
        />
        <p>{errors.email?.message}</p>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter The Password"
          {...register("password")}
        />
        <p>{errors.password?.message}</p>
        <button>Log In</button>
      </form>
    </div>
  );
};

export default LogInForm;
