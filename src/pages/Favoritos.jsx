import { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { PokemonContext } from "../context/PokemonContext";
import { CardPokemon } from "../components/CardPokemon";

const Favoritos = () => {
    const { favoritos } = useContext(PokemonContext)
    return (
        <Container className="py-5">
            <div className="catalog-header mb-4 text-center">
                <span className="catalog-badge">Favoritos</span>
                <h2 className="catalog-title mb-2">Tu colección favorita</h2>
                <p className="catalog-copy mb-0">Guarda tus pokemones preferidos en un espacio visual inspirado en tu aventura.</p>
            </div>

            {favoritos.length > 0 ? (
                <Row className="g-4">
                    {favoritos.map((pokemon) => (
                        <Col key={pokemon.id} xs={12} sm={6} lg={4} xl={3}>
                            <CardPokemon {...pokemon} />
                        </Col>
                    ))}
                </Row>
            ) : (
                <div className="favorite-empty">
                    <div className="favorite-empty-card">
                        <h3>No hay pokemones favoritos</h3>
                        <p>Añade algunos pokemones desde el catálogo para verlos aquí.</p>
                    </div>
                </div>
            )}
        </Container>
    );
}

export { Favoritos };