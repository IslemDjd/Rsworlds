import SideBar from "../../../SideBar/SideBar";
import "./addArticles.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../../../../../config/firebase";
import { v4 } from "uuid";
import { addDoc, collection } from "firebase/firestore";

const AddArticles = () => {
  const schema = yup.object().shape({
    file: yup.mixed().required("File is required"),
    name: yup.string().required("Enter The Article Name"),
    price: yup
      .string()
      .required("Enter The Article Price")
      .matches(/^[0-9]+$/, "Enter A Valid Price"),
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
      const imageRef = ref(storage, `Articles/${data.file[0].name + v4()}`);
      await uploadBytes(imageRef, data.file[0]);
      alert("image Uploaded");
      const url = await getDownloadURL(imageRef);
      const currentDate = new Date().toISOString();

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
        dateAdded: currentDate,
      });

      // console.log(data);
      // console.log(url);
      e.target.reset();
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

          <button type="submit">Add Article</button>
        </form>

        <div style={{ height: "400px" }}></div>
      </div>
    </div>
  );
};

export default AddArticles;
