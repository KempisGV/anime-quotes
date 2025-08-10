import styles from "@/styles/Modal.module.scss";
import { useEffect, useCallback } from "react";

const Modal = ({ children, onClose }) => {
  const handleOverlayClick = useCallback(
    (e) => {
      // cierra solo si el click fue sobre el overlay
      if (e.target.classList.contains(styles.overlay)) {
        onClose?.();
      }
    },
    [onClose]
  );

  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [onClose]);

  return (
    <div className={styles.overlay} onMouseDown={handleOverlayClick}>
      {/* detenemos propagación dentro del modal para no cerrar */}
      <div className={styles.modal} onMouseDown={(e) => e.stopPropagation()}>
        <div className={styles.modalContent}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
