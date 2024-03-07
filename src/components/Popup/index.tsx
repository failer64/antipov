import { FC, useState } from "react";
import { Navigate } from "react-router-dom";
import style from "./styles.module.scss";

type Props = {
  title: string;
  text: string;
};

export const Popup: FC<Props> = ({ title, text }) => {
  const [isRedirect, setIsRedirect] = useState(false);

  const onHandleClick = () => {
    setIsRedirect(true);
  };

  if (isRedirect) return <Navigate to={`/`} />;

  return (
    <div className={style.body}>
      <div className={style.overlay} onClick={onHandleClick}></div>
      <div className={style.content}>
        <h2 className={style.title}>{title}</h2>
        <div className={style.text}>{text}</div>
        <button className={style.button} onClick={onHandleClick}>
          Ok
        </button>
      </div>
    </div>
  );
};
