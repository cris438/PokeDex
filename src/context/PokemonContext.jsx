import { createContext } from "react";
import { apiClient } from "../utils/api";


const PokemonContext = createContext()

const PokemonProvider = ({ children }) => {



    const getPokemons = async () => {
        const { data } = await apiClient.get('/pokemon')
        const pokemons = await Promise.all(data.results.map(async (item) => {
            const pokemon = await apiClient.get(item.url)
            return {
                name: pokemon.data.name,
                types: pokemon.data.types.map(item => item.type.name),
                image: pokemon.data.sprites.other.home.front_default
            }
        }))
        return pokemons
    }

    return (
        <PokemonContext.Provider value={{
            getPokemons
        }}>
            {children}
        </PokemonContext.Provider>
    );
}

export { PokemonContext, PokemonProvider };