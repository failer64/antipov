import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { nextPage, previosPage } from "../../app/usersReducer";
import style from "./styles.module.scss";

type Props = {
  currentPage: number;
};

export const Pagination: FC<Props> = ({ currentPage }) => {
  const totalPages = useAppSelector((state) => state.users.totalPages);

  const dispatch = useAppDispatch();

  return (
    <div className={style.body}>
      <button
        className={style.button}
        disabled={currentPage === 1}
        onClick={() => dispatch(previosPage())}
      >
        Предыдущая
      </button>
      <button
        className={style.button}
        disabled={currentPage === totalPages}
        onClick={() => dispatch(nextPage())}
      >
        Следующая
      </button>
    </div>
  );
};
