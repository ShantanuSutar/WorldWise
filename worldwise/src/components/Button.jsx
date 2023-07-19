import styles from "./Button.module.css";
const Button = ({ children, onClick, type }) => {
  return (
    <div className={`${styles.btn} ${styles[type]}`} onClick={onClick}>
      {children}
    </div> // we use the children prop to render the text inside the Button component
  );
};

export default Button;
