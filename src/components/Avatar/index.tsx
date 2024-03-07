import { ChangeEvent, FC, useRef, useState } from "react";
import loader from "../../assets/loading.gif";
import style from "./styles.module.scss";

interface File {
  description: string;
  id: number;
  title: string;
  url: string;
  user: number;
}

type Props = {
  src: string;
  name: string;
};

const Avatar: FC<Props> = ({ src, name }) => {
  const filePicker = useRef<HTMLInputElement | null>(null);

  const [uploaded, setUploaded] = useState<null | File>(null);
  const [isFetching, setIsFetching] = useState(false);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length) {
      setIsFetching(true);
      const response = await fetch(
        "https://api.slingacademy.com/v1/sample-data/photos/1"
      );
      if (response.ok) {
        const data = await response.json();
        setUploaded(data.photo);
        setIsFetching(false);
      }
    }
  };

  const handleClick = () => {
    filePicker.current?.click();
  };

  return (
    <div className={style.body}>
      <div className={style.avatar}>
        {isFetching ? (
          <img src={loader} alt="Loading ..." />
        ) : (
          <img src={uploaded ? uploaded.url : src} alt={name} />
        )}
      </div>
      <button onClick={handleClick}>change avatar</button>
      <input
        ref={filePicker}
        className={style.input}
        accept="image/*,.png,.jpg"
        type="file"
        onChange={handleChange}
      />
    </div>
  );
};

export default Avatar;
