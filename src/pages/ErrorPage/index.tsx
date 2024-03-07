import style from "./styles.module.scss";
import image from "../../assets/404.png";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <div className="container">
        <div className={style.body}>
          <h1 className={style.title}>404 not found</h1>
          <Link to="/" className={style.link}>
            на главную
          </Link>
          <div className={style.bg}>
            <img src={image} alt="404 not found" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
