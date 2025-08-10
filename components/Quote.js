import Image from "next/image";
import styles from "@/styles/Quote.module.scss";
import modalStyles from "@/styles/Modal.module.scss";
import Modal from "./Modal";
import React, { useState } from "react";
import api from "../axiosConfig"; // usa tu instancia con baseURL
import { useSession } from "next-auth/react";

const defaultImg = "https://pbs.twimg.com/media/FBfbWyaXsAELFdC.jpg:large";

const Quote = ({ character: { _id, name, anime, imageURL, quote } }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [newImageURL, setNewImageURL] = useState(imageURL || "");
  const { data: session } = useSession();

  // admins seguros (evita crash si la env no existe)
  const adminList = (process.env.NEXT_PUBLIC_ADMINS || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  const userEmail = (session?.user?.email || "").toLowerCase();
  const isAdmin = !!userEmail && adminList.includes(userEmail);

  const handleUpdate = async () => {
    try {
      if (!_id) {
        console.error("No character id");
        return;
      }
      if (!newImageURL) {
        console.warn("Empty imageURL; nothing to save");
        return;
      }
      const resp = await api.put(`/characters/${_id}`, {
        imageURL: newImageURL,
      });
      const saved = resp?.data?.imageURL || newImageURL;
      setNewImageURL(saved);
      setModalOpen(false);
    } catch (error) {
      console.error("PUT /characters/:id failed", error);
    }
  };

  return (
    <div className={styles.card} onClick={() => setModalOpen(true)}>
      <Image
        className={styles.cardImage}
        src={newImageURL || defaultImg}
        alt={`${name}-picture`}
        width={300}
        height={175}
        priority
        unoptimized // 👈 evita el bloqueo del optimizer para dominios no listados
      />
      <div className={styles.cardInfo}>
        <h3 className={styles.cardName}>{name}</h3>
        <h4 className={styles.cardAnime}>{anime}</h4>
        <p className={styles.cardQuote}>{quote}</p>
      </div>

      {modalOpen && (
        <Modal
          onClose={() => setModalOpen(false)}
          className={modalStyles.modal}
        >
          <Image
            src={newImageURL || defaultImg}
            alt={name}
            width={500}
            height={500}
            className={modalStyles.modalImage}
            unoptimized // 👈 también aquí
          />
          <h2 className={modalStyles.modalName}>{name}</h2>
          <p className={modalStyles.modalAnime}>{anime}</p>
          <p className={modalStyles.modalQuote}>{quote}</p>

          {isAdmin && (
            <div className={modalStyles.modalForm}>
              <label htmlFor="image-url" className={modalStyles.modalLabel}>
                Image URL:
              </label>
              <input
                type="text"
                id="image-url"
                value={newImageURL}
                onChange={(e) => setNewImageURL(e.target.value)}
                className={modalStyles.modalInput}
                placeholder="https://..."
              />
              <button
                onClick={handleUpdate}
                className={modalStyles.modalButton}
              >
                Save
              </button>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default Quote;
