import { createContext, useEffect, useState } from "react";
import { apiClient } from "../utils/api";


const PokemonContext = createContext()

const PokemonProvider = ({ children }) => {
    const [favoritos, setFavoritos] = useState([])
    const [pokemons, setPokemons] = useState([])
    const [pokemonsFilter, setPokemonsFilter] = useState([])
    const [paginados, setPaginados] = useState([])
    const [page, setPage] = useState(0)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getPoke = async () => {
            setLoading(true)
            try {
                // const { data } = await apiClient.get('/pokemon?limit=1025')
                const { data } = await apiClient.get(`/pokemon?limit=20&offset=${page * 20}`)
                const pokemons = await Promise.all(data.results.map(async (item) => {
                    const pokemon = await apiClient.get(item.url)
                    return {
                        id: pokemon.data.id,
                        name: pokemon.data.name,
                        types: pokemon.data.types.map(item => item.type.name),
                        image: pokemon.data.sprites.other.home.front_default,
                        isFavorite: favoritos.some(item => item.name == pokemon.data.name),
                    }
                }))
                // paginate(pokemons)
                setPokemons(pokemons)
                setPokemonsFilter(pokemons)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }

        }
        // const paginate = (pokemons) => {
        //     const limit = 20
        //     const paginado = []
        //     for (let i = 0; i < pokemons.length; i += parseInt(limit)) {
        //         paginado.push(pokemons.slice(i, i + parseInt(limit)))
        //     }
        //     setPaginados(paginado)
        //     setPokemonsFilter(paginado[0])
        // }
        getPoke()

    }, [page])


    const addFavorite = (id) => {
        const pokemon = pokemons.find(poke => poke.id == id)
        if (!favoritos.some(item => item.id == pokemon.id)) {
            setPokemons(() => pokemons.map((pokemon) => {
                return pokemon.id == id ? { ...pokemon, isFavorite: true } : pokemon
            }))
            setPokemonsFilter(() => pokemons.map((pokemon) => {
                return pokemon.id == id ? { ...pokemon, isFavorite: true } : pokemon
            }))
            setFavoritos([...favoritos, {
                name: pokemon.name,
                image: pokemon.image,
                id: pokemon.id,
                types: pokemon.types
            }])
        }
    }

    const getDetailPokemon = async (id) => {
        const pokemon = await apiClient.get(`/pokemon/${id}`)
        return pokemon.data
    }




    return (
        <PokemonContext.Provider value={{
            getDetailPokemon,
            favoritos,
            addFavorite,
            pokemonsFilter,
            pokemons,
            setPokemonsFilter,
            paginados,
            page,
            setPage,
            loading,
        }}>
            {children}
        </PokemonContext.Provider>
    );
}

export { PokemonContext, PokemonProvider };