import { Container, Row, Col, Form, InputGroup, Button, Spinner } from 'react-bootstrap';
import { CardPokemon } from '../components/CardPokemon';
import { useContext, useEffect, useState } from 'react';
import { PokemonContext } from '../context/PokemonContext';
import { NavLink } from 'react-router';

function Personajes() {

    // const [buscadorPoke, setBuscadorPoke] = useState('')
    const { pokemonsFilter, pokemons, setPokemonsFilter, paginados, page, setPage, loading } = useContext(PokemonContext)
    const buscador = (event) => {
        const pokemonEncontrados = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(event.target.value.toLowerCase())).slice(0, 20)
        if (event.target.value == "") {
            setPokemonsFilter(pokemons)
        } else {
            setPokemonsFilter(pokemonEncontrados)
        }
    }

    const irAdelante = () => {
        // setPage(prev => prev == paginados.length - 1 ? prev : prev + 1)
        setPage(prev =>  pokemons.length < 20 ? prev : prev + 1)
        setPokemonsFilter(pokemons)

        //     setPokemonsFilter(paginados[page == paginados.length - 1 ? page : page + 1])
    }


    const irAtras = () => {
        setPage(prev => prev == 0 ? prev : prev - 1)
        // setPokemonsFilter(paginados[page == 0 ? page : page - 1])
        setPokemonsFilter(pokemons)
    }


    useEffect(() => {
        setPokemonsFilter(pokemons)
    }, [setPokemonsFilter, pokemons])
    return (
        <Container className="py-5">
            <Row className="align-items-center justify-content-end mb-4">
              <Col lg={8}>
                <div className="catalog-header">
                  <span className="catalog-badge">Pokédex</span>
                  <h2 className="catalog-title mb-2">Catálogo de personajes</h2>
                  <p className="catalog-copy mb-0">Descubre cada criatura con su tipo, estilo y personalidad.</p>
                </div>
              </Col>
              <Col lg="auto" className="d-flex gap-2 flex-wrap justify-content-center mt-3 mt-lg-0">
                <Button variant="outline-primary" className="btn-pokemon-secondary" onClick={irAtras}>
                  Anterior
                </Button>
                <Button variant="primary" className="btn-pokemon-primary" onClick={irAdelante}>
                  Siguiente
                </Button>
              </Col>
            </Row>

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

            {loading ? (
                <div className="text-center py-5">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-3 mb-0">Cargando pokemones...</p>
                </div>
            ) : (
                <Row className="g-4">
                    {pokemonsFilter?.length > 0 ? (
                        pokemonsFilter.map((pokemon) => (
                            <Col key={pokemon.name} xs={12} sm={6} lg={4} xl={3}>
                                <CardPokemon {...pokemon} />
                            </Col>
                        ))
                    ) : (
                        <Col xs={12} className="text-center py-5">
                            <p className="mb-0">No se encontraron pokemones.</p>
                        </Col>
                    )}
                </Row>
            )}
        </Container>
    )
}

export { Personajes };