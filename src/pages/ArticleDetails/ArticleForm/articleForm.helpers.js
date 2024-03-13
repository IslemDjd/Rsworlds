export function increment(selectedQt, setSelectedQt, selectedSize, setError, article) {
    if (selectedSize !== "") {
        if (selectedQt == article.size[selectedSize]) {
            setError("You've Selected All Available Articles");
        } else {
            setSelectedQt((prev) =>
                Math.min(article.size[selectedSize], prev + 1)
            );
        }
    } else {
        setError("Please select a size");
    }
}

export function decrement(selectedQt, setSelectedQt, selectedSize, setError) {
    if (selectedSize !== "") {
        if (selectedQt == 1) {
            setError("You Can't Select 0 Items");
        } else {
            setSelectedQt((prev) => Math.max(1, prev - 1));
        }
    } else {
        setError("Please select a size");
    }
}