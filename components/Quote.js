import Image from 'next/image';
import styles from '@/styles/Quote.module.scss';
import modalStyles from '@/styles/Modal.module.scss';
import Modal from './Modal';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react'
const serverURL = process.env.NEXT_PUBLIC_API_URL;


const Quote = ({ anime, character, quote }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [characterData, setCharacterData] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const { data: session } = useSession();
  const isAdmin = process.env.NEXT_PUBLIC_ADMINS.split(',').map(correo => correo.toLowerCase()).includes(session?.user?.email.toLowerCase());


  useEffect(() => {
    axios.get(`${serverURL}/characters`).then((response) => {
      setCharacters(response.data);
    });
  }, []);

  useEffect(() => {
    const newCharacterData = characters.find((c) => c.name === character);
    setCharacterData(newCharacterData);
    setImageUrl(newCharacterData?.imageURL || '');
  }, [characters, character]);


  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
  };

  const handleSave = () => {
    const newCharacter = {
      name: character,
      anime: anime,
      imageURL: imageUrl,
    };
    axios.post(`${serverURL}/characters`, newCharacter)
      .then(() => {
        setModalOpen(false);
        setCharacterData(newCharacter);
        setCharacters([...characters, newCharacter]);
      })
      .catch(error => {
        console.log(error);
      });

  };

  const imgURL =
    characterData?.image ||
    'https://pbs.twimg.com/media/FBfbWyaXsAELFdC.jpg:large';

  return (
    <div className={styles.card} onClick={handleModalOpen}>
      <Image src={imageUrl || imgURL} alt="Nombre del personaje" width={300} height={400} />
      <div className={styles.cardInfo}>
        <h3 className={styles.cardName}>{character}</h3>
        <h4 className={styles.cardAnime}>{anime}</h4>
        <p className={styles.cardQuote}>{quote}</p>
      </div>
      {modalOpen && (
        <Modal onClose={handleModalClose} className={modalStyles.modal}>
          <Image src={imageUrl || imgURL} alt={character} width={500} height={500} className={modalStyles.modalImage} />
          <h2 className={modalStyles.modalName}>{character}</h2>
          <p className={modalStyles.modalAnime}>{anime}</p>
          <p className={modalStyles.modalQuote}>{quote}</p>
          {(!characterData && isAdmin) && (
            <div className={modalStyles.modalForm}>
              <label htmlFor="image-url" className={modalStyles.modalLabel}>Image URL:</label>
              <input type="text" id="image-url" onChange={handleImageUrlChange} className={modalStyles.modalInput}/>
              <button onClick={handleSave} className={modalStyles.modalButton}>Save</button>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default Quote;
