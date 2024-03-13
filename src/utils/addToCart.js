export default function addToCart(cartArticle, selectedSize, selectedQt, article, addArticle, removeArticle, setSuccess, setError, dispatch) {
    return () => {
        const existingArticle = cartArticle.bucket.find(item => item.id === article.id && item.size === selectedSize);
        if (existingArticle) {
            if (existingArticle.quantity === selectedQt) {
                setError(`You Already Selected This With ${selectedSize} Size`);
                setSuccess(null);
            } else {
                setSuccess(`Size : ${selectedSize}  Quantity Updated`);
                setError(null);
                dispatch(removeArticle({
                    id: article.id,
                    size: selectedSize,
                    quantity: existingArticle.quantity,
                }));
                dispatch(
                    addArticle({
                        id: article.id,
                        size: selectedSize,
                        quantity: selectedQt,
                    })
                );
            }
        } else {
            if (selectedSize !== "") {
                dispatch(
                    addArticle({
                        id: article.id,
                        size: selectedSize,
                        quantity: selectedQt,
                    })
                );
                setSuccess("Article Added To Cart");
                setError(null);

            } else {
                setError("Please Select a Size First ");
                setSuccess(null);
            }
        }
    }
}