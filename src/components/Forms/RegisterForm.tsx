import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getRegister } from "../../app/authReducer";
import Preloader from "../Preloader";
import { Popup } from "../Popup";
import style from "./styles.module.scss";

type FormDataType = {
  confirmPassword: string;
  email: string;
  firstName: string;
  password: string;
};

const RegisterForm = () => {
  const {
    register,
    watch,
    reset,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<FormDataType>({
    mode: "onBlur",
  });

  const isFetching = useAppSelector((state) => state.auth.isFetching);
  const isRegister = useAppSelector((state) => state.auth.isRegister);
  const error = useAppSelector((state) => state.auth.error);

  const dispatch = useAppDispatch();

  const onSubmit = (data: FormDataType) => {
    let { email, password } = data; //Данные из формы
    email = "eve.holt@reqres.in";
    password = "pistol";
    //fake данные для сервера
    const fakeData = { email, password };
    dispatch(getRegister(fakeData));
    reset();
  };

  if (isFetching) return <Preloader />;

  return (
    <div className={style.body}>
      <div className={style.card}>
        <h1 className={style.title}>Регистрация</h1>
        <form
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          className={style.form}
        >
          <div className={style.item}>
            <label htmlFor="firstName">Имя</label>
            <input
              className={errors.firstName && style.input}
              id="firstName"
              {...register("firstName", {
                required: "Введите имя",
              })}
            />
            {errors.firstName && (
              <span className={style.error}>{errors.firstName.message}</span>
            )}
          </div>
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
            <label htmlFor="confirmPassword">Подтвердите пароль</label>
            <input
              className={errors.confirmPassword && style.input}
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "Повторите пароль",
                validate: (val: string) => {
                  if (val !== watch("password")) {
                    return "Пароли не совпадают";
                  }
                },
              })}
            />
            {errors.confirmPassword && (
              <span className={style.error}>
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
          <div className={style.item}>
            <button disabled={isSubmitting} className={style.button}>
              Зарегистрироваться
            </button>
          </div>
        </form>
        <span>
          или{" "}
          <Link className={style.link} to={"/login"}>
            авторизоваться
          </Link>
        </span>
        {error && <div className={style.responseError}>{error}</div>}
        {isRegister && (
          <Popup
            title={"Вы успешно зарегистрировались"}
            text={"Переход на страницу авторизации"}
          />
        )}
      </div>
    </div>
  );
};

export default RegisterForm;
