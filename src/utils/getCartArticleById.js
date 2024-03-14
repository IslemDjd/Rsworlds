import { db } from "../config/firebase";
import { getDoc, doc } from "firebase/firestore";

export default async function getCartArticleById(cartArticle, setMyArticles, setTotalPrice) {
    const articles = await Promise.all(
        cartArticle.map(async (item) => {
            const docRef = doc(db, "Articles", item.id);
            const docSnap = await getDoc(docRef);
            const articleData = {
                ...docSnap.data(),
                id: docSnap.id,
                size: item.size,
                quantity: item.quantity,
            };
            return articleData;
        })
    );
    setMyArticles(articles);
    setTotalPrice(
        articles.reduce(
            (acc, article) => acc + article.quantity * article.price,
            0
        )
    );
}
