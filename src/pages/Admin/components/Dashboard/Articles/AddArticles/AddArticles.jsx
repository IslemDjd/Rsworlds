import "./addArticles.scss";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { v4 } from "uuid";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import SideBar from "../../../SideBar/SideBar";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../../../../../../config/firebase";
import { changePage } from "../../../../../../features/AdminPage";
import PopUpSuccess from "../../../../../../components/popUp/PopUpSuccess";
import PopUpWarning from "../../../../../../components/popUp/PopUpWarning";

const AddArticles = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const schema = yup.object().shape({
    file: yup.mixed().required("File is required"),
    name: yup.string().required("Enter The Article Name"),
    price: yup
      .string()
      .required("Enter The Article Price")
      .matches(/^[1-9][0-9]+$/, "Enter A Valid Price"),
    S: yup.string().matches(/^[0-9]+$/, "Enter A Valid Quantity"),
    M: yup.string().matches(/^[0-9]+$/, "Enter A Valid Quantity"),
    L: yup.string().matches(/^[0-9]+$/, "Enter A Valid Quantity"),
    XL: yup.string().matches(/^[0-9]+$/, "Enter A Valid Quantity"),
    XXL: yup.string().matches(/^[0-9]+$/, "Enter A Valid Quantity"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const articlesRef = collection(db, "Articles");

  const onSubmit = async (data, e) => {
    try {
      if (!isFormSubmitted) {
        setIsFormSubmitted(true);
        const hasNonZeroSize =
          data.S == 0 &&
          data.M == 0 &&
          data.L == 0 &&
          data.XL == 0 &&
          data.XXL == 0;

        const validFileTypes = [
          "image/png",
          "image/jpg",
          "image/webp",
          "image/jpeg",
        ];

        const fileType = data.file[0].type;

        if (!validFileTypes.includes(fileType)) {
          setError("File Type Is Not Supported");
          setIsFormSubmitted(false);
          setTimeout(() => {
            setError(null);
          }, 3000);
          return;
        }

        if (hasNonZeroSize) {
          console.log(data);
          setError("Enter A Quantity For At Least One Size");
          setIsFormSubmitted(false);
          setTimeout(() => {
            setError(null);
          }, 3000);
          return;
        }
        const imageRef = ref(storage, `Articles/${data.file[0].name + v4()}`);
        await uploadBytes(imageRef, data.file[0]);
        const url = await getDownloadURL(imageRef);
        
        const currentDate = new Date();
        const timezoneOffset = currentDate.getTimezoneOffset();
        const adjustedOffsetInMs = Math.abs(timezoneOffset) * 60 * 1000;
        const localDate = new Date(currentDate.getTime() + adjustedOffsetInMs);
        const localDateString = localDate.toISOString();

        await addDoc(articlesRef, {
          imageUrl: url,
          name: data.name,
          price: data.price,
          size: {
            S: data.S,
            M: data.M,
            L: data.L,
            XL: data.XL,
            XXL: data.XXL,
          },
          dateAdded: localDateString,
        });

        e.target.reset();
        setSuccess("Article Added Successfully");
        setTimeout(() => {
          window.scroll(0, 0);
          setSuccess(null);
          dispatch(changePage("Articles"));
        }, 3000);
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="addArticles">
      <SideBar />

      <div className="rightSide">
        <h1 className="pageTitle">Add Articles</h1>

        <form className="addArticleForm" onSubmit={handleSubmit(onSubmit)}>
          <input type="file" name="file" required {...register("file")} />
          <p>{errors.file?.message}</p>

          <label htmlFor="name">Article Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter The Article Name"
            {...register("name")}
          />
          <p>{errors.name?.message}</p>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            placeholder="Enter The Price"
            {...register("price")}
          />
          <p>{errors.price?.message}</p>

          <div className="sizes">
            <div>
              <label htmlFor="S">S</label>
              <input
                type="number"
                defaultValue={0}
                name="S"
                placeholder="Size S Quantity"
                {...register("S")}
              />
            </div>
            <p>{errors.S?.message}</p>
            <div>
              <label htmlFor="M">M</label>
              <input
                type="number"
                defaultValue={0}
                name="M"
                placeholder="Size M Quantity"
                {...register("M")}
              />
            </div>
            <p>{errors.M?.message}</p>
            <div>
              <label htmlFor="L">L</label>
              <input
                type="number"
                defaultValue={0}
                name="L"
                placeholder="Size L Quantity"
                {...register("L")}
              />
            </div>
            <p>{errors.L?.message}</p>
            <div>
              <label htmlFor="XL">XL</label>
              <input
                type="number"
                defaultValue={0}
                name="XL"
                placeholder="Size XL Quantity"
                {...register("XL")}
              />
            </div>
            <p>{errors.XL?.message}</p>
            <div>
              <label htmlFor="XXL">XXL</label>
              <input
                type="number"
                defaultValue={0}
                name="XXL"
                placeholder="Size XXL Quantity"
                {...register("XXL")}
              />
            </div>
            <p>{errors.XXL?.message}</p>
          </div>

          <button>Add Article</button>
        </form>

        {error && <PopUpWarning errorText={error} setError={setError} />}
        {success && (
          <PopUpSuccess successText={success} setSuccess={setSuccess} />
        )}
      </div>
    </div>
  );
};

export default AddArticles;
