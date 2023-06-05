import Image from 'next/image';
import styles from '@/styles/Quote.module.scss';
import modalStyles from '@/styles/Modal.module.scss';
import Modal from './Modal';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
const serverURL = process.env.NEXT_PUBLIC_API_URL;

const Quote = ({ character: { name, anime, imageURL, quote } }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [newImageURL, setNewImageURL] = useState(imageURL);
  const { data: session } = useSession();
  const isAdmin = process.env.NEXT_PUBLIC_ADMINS.split(',')
    .map(correo => correo.toLowerCase())
    .includes(session?.user?.email.toLowerCase());

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleImageUrlChange = event => {
    setNewImageURL(event.target.value);
  };

  const handleUpdate = () => {
    const newCharacter = {
      imageURL: newImageURL,
    };
    axios
      .put(`${serverURL}/characters/${character._id}`, newCharacter)
      .then(() => {
        setModalOpen(false);
        setCharacterData(newCharacter);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const defaultImg = 'https://pbs.twimg.com/media/FBfbWyaXsAELFdC.jpg:large';

  return (
    <div className={styles.card} onClick={handleModalOpen}>
      <Image
        src={newImageURL || defaultImg}
        alt='Nombre del personaje'
        width={300}
        height={400}
      />
      <div className={styles.cardInfo}>
        <h3 className={styles.cardName}>{name}</h3>
        <h4 className={styles.cardAnime}>{anime}</h4>
        <p className={styles.cardQuote}>{quote}</p>
      </div>
      {modalOpen && (
        <Modal onClose={handleModalClose} className={modalStyles.modal}>
          <Image
            src={newImageURL || defaultImg}
            alt={name}
            width={500}
            height={500}
            className={modalStyles.modalImage}
          />
          <h2 className={modalStyles.modalName}>{name}</h2>
          <p className={modalStyles.modalAnime}>{anime}</p>
          <p className={modalStyles.modalQuote}>{quote}</p>
          {newImageURL == '' && isAdmin && (
            <div className={modalStyles.modalForm}>
              <label htmlFor='image-url' className={modalStyles.modalLabel}>
                Image URL:
              </label>
              <input
                type='text'
                id='image-url'
                onChange={handleImageUrlChange}
                className={modalStyles.modalInput}
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
