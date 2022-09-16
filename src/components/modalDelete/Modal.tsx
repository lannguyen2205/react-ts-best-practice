import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "../../assets/fonts/themify-icons-font/themify-icons/themify-icons.css";
import "./Modal.css";
import { ModalType, PostType } from "../../interfaces/types";
import { useRef } from "react";

export const Modal: React.FC<ModalType & PostType> = ({
  isOpen,
  onClose,
  onDelete,
  id,
}) => {
  const overlayRef = useRef(null);

  const handleOverLayClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  return isOpen ? (
    <div className="modal">
      <div
        className="modal-overlay"
        ref={overlayRef}
        onClick={handleOverLayClick}
      />
      <div className="modal-container">
        <div className="modal-close" onClick={onClose}>
          <i className="ti-close"></i>
        </div>
        <div className="modal-img">
          <FontAwesomeIcon
            className="close-xmark"
            icon={faXmark}
          ></FontAwesomeIcon>
        </div>
        <h2 className="modal-title">Are you sure ?</h2>
        <p className="modal-desc">
          Do you realldy want to delete this recode, this progress can’t undo
          again
        </p>
        <div className="modal-btn-list">
          <button className="close-btn text-btn box-btn" onClick={onClose}>
            Close
          </button>
          <button
            className="delete-btn text-btn box-btn"
            onClick={()=> {
                onDelete(id)
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  ) : null;
};
