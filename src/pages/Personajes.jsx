import { Container, Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import { CardPokemon } from '../components/CardPokemon';
import { useContext, useEffect, useState } from 'react';
import { PokemonContext } from '../context/PokemonContext';

function Personajes() {
    const [pokemons, setPokemons] = useState([])
    // const [buscadorPoke, setBuscadorPoke] = useState('')
    const { getPokemons } = useContext(PokemonContext)
    const [pokemonsFilter, setPokemonsFilter] = useState(pokemons)

    useEffect(() => {
        const getPoke = async () => {
            const pokemonsApi = await getPokemons()
            setPokemons(pokemonsApi)
            setPokemonsFilter(pokemonsApi)
        }
        getPoke()

    }, [getPokemons])

    const buscador = (event) => {
        console.log(pokemonsFilter)
        const pokemonEncontrados = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(event.target.value.toLowerCase()))
        setPokemonsFilter(pokemonEncontrados)
    }

    return (
        <Container className="py-5">
            <div className="catalog-header mb-4">
                <span className="catalog-badge">Pokédex</span>
                <h2 className="catalog-title">Catálogo de personajes</h2>
                <p className="catalog-copy">Descubre cada criatura con su tipo, estilo y personalidad.</p>
            </div>

            <div className="search-panel mb-4 mx-auto">
                <InputGroup size="lg" className="search-input-group">
                    <InputGroup.Text className="search-icon-box">🔎</InputGroup.Text>
                    <Form.Control
                        type="text"
                        placeholder="Buscar por nombre"
                        className="search-input"
                        aria-label="Buscar por nombre"
                        onChange={buscador}
                    />
                </InputGroup>
            </div>

            <Row className="g-4">
                {pokemonsFilter.map((pokemon) => (
                    <Col key={pokemon.name} xs={12} sm={6} lg={4} xl={3}>
                        <CardPokemon {...pokemon} />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export { Personajes };