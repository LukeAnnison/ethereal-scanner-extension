import styles from "./filter.module.scss";

interface Props {
  result: {
    name: string;
    list: object;
    type: string;
  };
  onClick: (e: any) => void;
  selected: string;
}

const Filter = ({ result, onClick, selected }: Props) => {
  {
  }
  return (
    <div
      onClick={onClick}
      className={selected === result.name ? styles.selected : styles.filter}
    >
      <h1 className={selected === result.name ? styles.h1Selected : styles.h1}>
        {result.type === "song" ? "♫" : "#"}
        {result.name}{" "}
      </h1>
    </div>
  );
};
export default Filter;
