import Image from 'next/image';
import styles from '@/styles/Quote.module.scss';
import Modal from './Modal';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
const serverURL = process.env.NEXT_PUBLIC_API_URL;


const Quote = ({ anime, character, quote }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [characterData, setCharacterData] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

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
    console.log(newCharacter,'NEW');
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
    'https://static.wikia.nocookie.net/narutho/images/8/8a/Frases-de-Madara-Uchiha.jpg/revision/latest?cb=20170602190407&path-prefix=es';

  return (
    <div className={styles.card} onClick={handleModalOpen}>
      <Image src={imageUrl || imgURL} alt="Nombre del personaje" width={300} height={400} />
      <div className={styles.cardInfo}>
        <h3 className={styles.cardName}>{character}</h3>
        <h4 className={styles.cardAnime}>{anime}</h4>
        <p className={styles.cardQuote}>{quote}</p>
      </div>
      {modalOpen && (
        <Modal onClose={handleModalClose}>
          <Image src={imageUrl || imgURL} alt={name} width={500} height={500} />
          <h2 className="cardName">{character}</h2>
          <p className="cardAnime">{anime}</p>
          <p className="cardQuote">{quote}</p>
          {!characterData && (
            <div>
              <label htmlFor="image-url">Image URL:</label>
              <input type="text" id="image-url" onChange={handleImageUrlChange} />
              <button onClick={handleSave}>Save</button>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default Quote;
