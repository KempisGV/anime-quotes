import { useState, useEffect, useContext } from 'react';
import axios from '../axiosConfig';
import { CharacterContext } from '@/contexts/CharacterContext';
import Select from 'react-select';
import styles from '../styles/Search.module.scss';

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: '#252525', // Cambia el color de fondo
    color: '#AAAAAA', // Cambia el color del texto
    border: 'none',
    boxShadow: 'none',
    minWidth: '200px',
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: '#AAAAAA', // Cambia el color del texto de la opción seleccionada
  }),
};

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [animeOptions, setAnimeOptions] = useState([]);
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null); // Nuevo estado

  // Obtiene el contexto
  const [characterList, setCharacterList] = useContext(CharacterContext);

  useEffect(() => {
    // Obtiene la lista de animes al cargar el componente
    fetchAnimeOptions();
  }, []);

  const fetchAnimeOptions = async () => {
    try {
      const response = await axios.get('/animes');
      const options = response.data.map(anime => ({
        value: anime,
        label: anime,
      }));
      setAnimeOptions(options);
    } catch (error) {
      console.error('Error fetching anime options:', error);
    }
  };

  const handleSearch = async () => {
    try {
      if (selectedAnime?.value) {
        const response = await axios.get(
          `/characters/search/${selectedAnime.value}`
        );

        // Guarda los personajes en el contexto
        setCharacterList(response.data);
      } else {
        const response = await axios.get('/characters');

        // Guarda los personajes en el contexto
        setCharacterList(response.data);
      }
    } catch (error) {
      console.error('Error searching characters:', error);
    }
  };

  const handleClearSelection = async () => {
    try {
      const response = await axios.get('/characters');

      // Guarda los personajes en el contexto
      setCharacterList(response.data);

      setSelectedAnime(null); // Limpia el valor seleccionado
      setSelectedOption(null); // Limpia el estado de la opción seleccionada
    } catch (error) {
      console.error('Error searching characters:', error);
    }
  };

  const handleSelectChange = option => {
    setSelectedAnime(option);
    setSelectedOption(option); // Actualiza el estado de la opción seleccionada
    setSearchTerm('');
  };

  const filteredOptions = animeOptions.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <Select
        styles={customStyles}
        options={filteredOptions}
        value={selectedOption} // Usa el estado de la opción seleccionada
        onChange={(selectedOption, triggeredAction) => {
          if (triggeredAction.action === 'clear') {
            handleClearSelection();
          } else {
            handleSelectChange(selectedOption);
          }
        }}
        isClearable
        placeholder='Select an anime'
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
