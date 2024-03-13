import { db } from "../config/firebase";
import { getDoc, doc } from "firebase/firestore";

export default async function getArticleById(articleId, setArticle, navigate) {
    try {
        const docRef = doc(db, "Articles", articleId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const articleData = { ...docSnap.data(), id: docSnap.id };
            setArticle(articleData);
        } else {
            navigate("*");
            return null;
        }
    } catch (err) {
        console.error(err);
        return null;
    }
    
}