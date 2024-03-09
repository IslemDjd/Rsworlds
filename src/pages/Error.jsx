import icon from '../assets/dressIcon.svg'
import Button from '../components/button/Button';
const Error = () => {
  return (
    <>
      <h1>Page Not Found</h1>
      <a href="/articles">
        <Button
          image={icon}
          width="30%"
          margin="0 auto"
          text="Return to articles"
        />
      </a>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default Error;
