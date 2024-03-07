import style from "./styles.module.scss";
import loader from "../../assets/loading.gif";

const Preloader = () => {
  return (
    <div className={style.body}>
      <img src={loader} alt="loading..." />
    </div>
  );
};

export default Preloader;
