import styles from '@/styles/Modal.module.scss';
import { useEffect } from 'react';

const Modal = ({ children, onClose }) => {
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.classList.contains(styles.modal)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
         <div className={styles.modalContent}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
