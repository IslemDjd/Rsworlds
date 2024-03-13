import { db } from "../config/firebase";
import { getDoc, doc } from "firebase/firestore";

export default async function getCartArticleById(articleId, setMyArticle) {
    try {
        const docRef = doc(db, "Articles", articleId);
        const docSnap = await getDoc(docRef);
        const articleData = { ...docSnap.data(), id: docSnap.id };
        setMyArticle(articleData);

    } catch (err) {
        console.error(err);
        return null;
    }

}