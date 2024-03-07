import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getLogin } from "../../app/authReducer";
import Preloader from "../Preloader";
import { Popup } from "../Popup";
import style from "./styles.module.scss";

export type FormDataType = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<FormDataType>({
    mode: "onBlur",
  });

  const isFetching = useAppSelector((state) => state.auth.isFetching);
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const error = useAppSelector((state) => state.auth.error);

  const dispatch = useAppDispatch();

  const onSubmit = (data: FormDataType) => {
    let { email, password } = data; //Данные из формы
    email = "eve.holt@reqres.in";
    password = "cityslicka";
    const fakeData = { email, password }; //fake данные для сервака
    dispatch(getLogin(fakeData));
    reset();
  };

  if (isFetching) return <Preloader />;

  return (
    <div className={style.body}>
      <div className={style.card}>
        <h1 className={style.title}>Авторизация</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
          <div className={style.item}>
            <label htmlFor="email">Электронная почта</label>
            <input
              className={errors.email && style.input}
              id="email"
              {...register("email", {
                required: "Введите почту",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Невалидный email",
                },
              })}
            />
            {errors.email && (
              <span className={style.error}>{errors.email.message}</span>
            )}
          </div>
          <div className={style.item}>
            <label htmlFor="password">Пароль</label>
            <input
              className={errors.password && style.input}
              type="password"
              id="password"
              {...register("password", {
                required: "Введите пароль",
              })}
            />
            {errors.password && (
              <span className={style.error}>{errors.password.message}</span>
            )}
          </div>
          <div className={style.item}>
            <button className={style.button}>Зарегистрироваться</button>
          </div>
        </form>
        <span>
          или{" "}
          <Link className={style.link} to={"/register"}>
            зарегистрироваться
          </Link>
        </span>
        {error && <div className={style.responseError}>{error}</div>}
        {isAuth && (
          <Popup
            title={"Вы успешно авторизовались"}
            text={"Переход на главную страницу"}
          />
        )}
      </div>
    </div>
  );
};

export default LoginForm;
