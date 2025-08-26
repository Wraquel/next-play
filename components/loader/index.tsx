import style from "../loader/style/_loader.module.scss";

const Loading = () => {
  return (
    <div className="d-flex direction-col al-it-center">
        <div className={style.loading} />
    </div>
  );
};

export default Loading;
