import { FC, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { UserType } from "../../app/usersReducer";
import style from "./styles.module.scss";

type FieldsWithType<T> = {
  [K in keyof T]: T[K];
};

type Props = FieldsWithType<UserType>;

interface PropsType extends Props {
  isFavorite: boolean;
  onHandleAdd: (id: number) => void;
}

const User: FC<PropsType> = (props) => {
  const navigate = useNavigate();

  const onHandleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    props.onHandleAdd(props.id);
  };

  return (
    <div className={style.item} onClick={() => navigate(`users/${props.id}`)}>
      <div className={style.avatar}>
        <img src={props.avatar} alt={props.first_name} />
      </div>
      <div className={style.name}>
        {props.first_name + " " + props.last_name}
      </div>
      <button className={style.icon} onClick={(e) => onHandleClick(e)}>
        <svg
          width="30"
          height="28"
          viewBox="0 0 30 28"
          fill={props.isFavorite ? "#512689" : "none"}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.85 8C9.72375 8 8 9.72173 8 11.8455C8 15.691 12.55 19.1869 15 20C17.45 19.1869 22 15.691 22 11.8455C22 9.72173 20.2762 8 18.15 8C16.848 8 15.6965 8.64569 15 9.63398C14.645 9.1289 14.1734 8.71669 13.625 8.43226C13.0767 8.14784 12.4679 7.99956 11.85 8Z"
            stroke="#151317"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default User;
