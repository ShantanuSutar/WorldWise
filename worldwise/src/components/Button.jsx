import styles from "./Button.module.css";
const Button = ({ children, onClick, type }) => {
  return (
    <button className={`${styles.btn} ${styles[type]}`} onClick={onClick}>
      {children}
    </button> // we use the children prop to render the text inside the Button component
  );
};

export default Button;
