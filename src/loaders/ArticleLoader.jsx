import './articleLoader.scss'

const ArticleLoader = () => {
  return (
    <div className="loader">
      <div className="loaderMiniContainer">
        <div className="barContainer">
          <span className="bar"></span>
          <span className="bar bar2"></span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 101 114"
          className="svgIcon"
        >
          <circle
            strokeWidth="7"
            stroke="black"
            transform="rotate(36.0692 46.1726 46.1727)"
            r="29.5497"
            cy="46.1727"
            cx="46.1726"
          ></circle>
          <line
            strokeWidth="7"
            stroke="black"
            y2="111.784"
            x2="97.7088"
            y1="67.7837"
            x1="61.7089"
          ></line>
        </svg>
      </div>
    </div>
  );
};

export default ArticleLoader;
