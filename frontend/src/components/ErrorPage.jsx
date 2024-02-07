import { Link } from "react-router-dom";
import '../styles/error-page.css'

const ErrorPage = () => {
  return (
    <div className="error-page"> 
      <h1>Oh no, this route doesn't exist!</h1>
      <p>Looks like you've landed on... a deserted island</p>
      <Link to="/home/welcome">
        You can go back to the home page by clicking here, though!
      </Link>
    </div>
  );
};

export default ErrorPage;