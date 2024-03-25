import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "../config/firebase";
import { doc, deleteDoc } from "firebase/firestore";

export default async function deleteArticle(Id, imageUrl, getArticles) {
    try {
        const storageRef = ref(storage, imageUrl);
        await deleteObject(storageRef);
        const Articles = doc(db, "Articles", Id);
        await deleteDoc(Articles);
        getArticles();
    } catch (err) {
        console.error(err);
    }

}

// export default async function updateArticle(article, data) {
//     try {
//         if(data.file[0]){
//             const storageRef = ref(storage, article.imageUrl);
//             await deleteObject(storageRef);

//         }
//         const Articles = doc(db, "Articles", Id);
//         await deleteDoc(Articles);
//         getArticles();
//     } catch (err) {
//         console.error(err);
//     }

// }


