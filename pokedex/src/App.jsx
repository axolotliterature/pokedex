import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import './App.css'

function App() {
  const DEBUG = false

  const [allPokemon, setAllPokemon] = useState([]);
  const [loadNext, setLoadNext] = useState('https://pokeapi.co/api/v2/pokemon')
  const [pokemon, setPokemon] = useState("bulbasaur");
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonType, setPokemonType] = useState("");

  const getPokemon = async () => {
    const toArray = [];
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
      const res = await axios.get(url);
      toArray.push(res.data);
      setPokemonType(res.data.types[0].type.name)
      setPokemonData(toArray);
      console.log(res);
    } catch (entry) {
      console.log(entry)
    }
  }

  const getAllPokemon = async () => {

  }

  if (DEBUG) {
    useEffect(() => {
      getPokemon();
    }, []);
  }

  const handleChange = (entry) => {
    setPokemon(entry.target.value.toLowerCase());
  }

  const handleSubmit = (entry) => {
    entry.preventDefault();
    getPokemon();
  }

  return (
    <>
    <div className="app-container">
      <h1>Pokedex</h1>
      <div className="Pokedex-container">


{/* SEARCH BY NAME OR NUMBER*/}
        <form onSubmit={handleSubmit}>
          <label>
            <input type="text" onChange={handleChange} placeholder="Search By Name/Number"></input>
          </label>
        </form>

        {pokemonData.map((data) => {
          return(
            <div className="pokedexContainer">
              <div className="titleCard">
                <h1>{data.name}</h1>
              </div>
              <div className="dataContainer">
              <img src={data.sprites["front_default"]}/>
                <div className="divTable">
                  <div className="divTableBody">

                    <div className="divTableRow">
                      <div className="divTableCell">Type</div>
                      <div className="divTableCell">
                        {pokemonType}
                        </div>
                    </div>

                    <div className="divTableRow">
                      <div className="divTableCell">Height</div>
                      <div className="divTableCell">
                        {" "}
                        {Math.round(data.height * 3.9)}"</div>
                    </div>

                    <div className="divTableRow">
                      <div className="divTableCell">Weight</div>
                      <div className="divTableCell">
                        {" "}
                        {Math.round(data.weight / 4.3)}lbs</div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          );
        })}
        </div>
        <div className="all-Container"></div>
        <button>Load Pokemon</button>
      </div>
    </>
  )
}

export default App
