/* eslint-disable react/prop-types */
import "./updateCard.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../../../../../../config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import PopUpWarning from "../../../../../../../components/popUp/PopUpWarning";
import PopUpSuccess from "../../../../../../../components/popUp/PopUpSuccess";
import { useState } from "react";

const UpdateCard = (props) => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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

  const onSubmit = async (data) => {
    try {
      const validFileTypes = [
        "image/png",
        "image/jpg",
        "image/webp",
        "image/jpeg",
      ];

      const hasNonZeroSize =
        data.S == 0 &&
        data.M == 0 &&
        data.L == 0 &&
        data.XL == 0 &&
        data.XXL == 0;

      const articleRef = doc(db, "Articles", props.article.id);
      let imageUrl = props.article.imageUrl;

      const currentDate = new Date();
      const timezoneOffset = currentDate.getTimezoneOffset();
      const adjustedOffsetInMs = Math.abs(timezoneOffset) * 60 * 1000;
      const localDate = new Date(currentDate.getTime() + adjustedOffsetInMs);
      const localDateString = localDate.toISOString();

      if (data.file[0]) {
        const fileType = data.file[0].type;
        console.log(fileType);
        if (!validFileTypes.includes(fileType)) {
          setError("File Type Is Not Supported");
          setTimeout(() => {
            setError(null);
          }, 3000);
          return;
        } else {
          const imageRef = ref(storage, `Articles/${data.file[0].name + v4()}`);
          await uploadBytes(imageRef, data.file[0]);
          imageUrl = await getDownloadURL(imageRef);
        }
      }

      if (hasNonZeroSize) {
        setError("Enter A Quantity For At Least One Size");
        setTimeout(() => {
          setError(null);
        }, 3000);
        return;
      }

      await updateDoc(articleRef, {
        imageUrl: imageUrl,
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

      props.getArticles();
      setSuccess("Article Updated Successfully");
      setTimeout(() => {
        window.scroll(0, 0);
        setSuccess(null);
        props.setIsUpdateClicked(false);
      }, 3000);
      return;
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div className="popUpOverlay"></div>
      <div className="updateCard">
        <h1 className="cardTitle">Update Article</h1>

        <form className="addArticleForm" onSubmit={handleSubmit(onSubmit)}>
          <img className="oldImage" src={props.article.imageUrl} alt="" />
          <input type="file" name="file" {...register("file")} />
          <p>{errors.file?.message}</p>

          <label htmlFor="name">Article Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter The Article Name"
            defaultValue={props.article.name}
            {...register("name")}
          />
          <p>{errors.name?.message}</p>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            placeholder="Enter The Price"
            defaultValue={props.article.price}
            {...register("price")}
          />
          <p>{errors.price?.message}</p>

          <div className="sizes">
            <div>
              <label htmlFor="S">S</label>
              <input
                type="number"
                name="S"
                placeholder="Size S Quantity"
                defaultValue={props.article.size.S}
                {...register("S")}
              />
            </div>
            <p>{errors.S?.message}</p>
            <div>
              <label htmlFor="M">M</label>
              <input
                type="number"
                name="M"
                placeholder="Size M Quantity"
                defaultValue={props.article.size.M}
                {...register("M")}
              />
            </div>
            <p>{errors.M?.message}</p>
            <div>
              <label htmlFor="L">L</label>
              <input
                type="number"
                name="L"
                placeholder="Size L Quantity"
                defaultValue={props.article.size.L}
                {...register("L")}
              />
            </div>
            <p>{errors.L?.message}</p>
            <div>
              <label htmlFor="XL">XL</label>
              <input
                type="number"
                name="XL"
                placeholder="Size XL Quantity"
                defaultValue={props.article.size.XL}
                {...register("XL")}
              />
            </div>
            <p>{errors.XL?.message}</p>
            <div>
              <label htmlFor="XXL">XXL</label>
              <input
                type="number"
                name="XXL"
                placeholder="Size XXL Quantity"
                defaultValue={props.article.size.XXL}
                {...register("XXL")}
              />
            </div>
            <p>{errors.XXL?.message}</p>
          </div>
          <div className="buttons">
            <button type="submit">Update Article</button>
            <button
              type="button"
              onClick={() => {
                props.setIsUpdateClicked(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      {error && <PopUpWarning errorText={error} setError={setError} />}
      {success && (
        <PopUpSuccess successText={success} setSuccess={setSuccess} />
      )}
    </div>
  );
};

export default UpdateCard;
