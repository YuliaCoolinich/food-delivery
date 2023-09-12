import ReactDom from "react-dom";
import styles from "./Modal.module.css";

const BackdropItem = ({ onClose }) => {
  return <div className={styles.backdrop} onClick={onClose}></div>;
};
const ModalItem = (props) => {
  return <div className={styles.modal}>{props.children}</div>;
};

const Modal = (props) => {
  return (
    <>
      {ReactDom.createPortal(
        <BackdropItem onClose={props.onClose} />,
        document.getElementById("backdrop")
      )}
      {ReactDom.createPortal(
        <ModalItem>{props.children}</ModalItem>,
        document.getElementById("modal")
      )}
    </>
  );
};

export default Modal;
