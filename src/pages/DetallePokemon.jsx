import { useContext, useEffect, useState } from "react";
import { Badge, Button, Card, Col, Container, ProgressBar, Row, Spinner } from "react-bootstrap";
import { Link, useParams } from "react-router";
import { PokemonContext } from "../context/PokemonContext";

const DetallePokemon = () => {
    const { getDetailPokemon } = useContext(PokemonContext);
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true);
                const response = await getDetailPokemon(id);
                setPokemon(response);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, [getDetailPokemon, id]);

    if (loading) {
        return (
            <Container className="py-5">
                <div className="d-flex justify-content-center align-items-center detail-loading">
                    <Spinner animation="border" variant="primary" />
                </div>
            </Container>
        );
    }

    if (!pokemon) {
        return (
            <Container className="py-5">
                <div className="detail-empty">
                    <h2>No se encontró el Pokémon.</h2>
                    <Button as={Link} to="/personajes" variant="primary" className="btn-pokemon-primary mt-3">
                        Volver al catálogo
                    </Button>
                </div>
            </Container>
        );
    }

    const types = pokemon.types?.map((item) => item.type.name) ?? [];
    const stats = pokemon.stats ?? [];
    const abilities = pokemon.abilities?.map((item) => item.ability.name) ?? [];
    const image = pokemon.sprites?.other?.home?.front_default ?? pokemon.sprites?.front_default;

    return (
        <Container className="py-5 detail-page">
            <div className="mb-4">
                <Button as={Link} to="/personajes" variant="outline-secondary" className="btn-pokemon-outline detail-back">
                    ← Volver al catálogo
                </Button>
            </div>

            <Card className="detail-card border-0 shadow-sm overflow-hidden">
                <Card.Body className="p-0">
                    <Row className="g-0">
                        <Col lg={5} className="detail-visual-col">
                            <div className="detail-visual">
                                <div className="detail-image-wrap">
                                    <img src={image} alt={pokemon.name} className="detail-image" />
                                </div>
                            </div>
                        </Col>

                        <Col lg={7}>
                            <div className="detail-content">
                                <div className="detail-header">
                                    <span className="detail-badge">Pokémon #{String(pokemon.id).padStart(3, "0")}</span>
                                    <h1 className="detail-name text-capitalize">{pokemon.name}</h1>

                                    <div className="d-flex flex-wrap gap-2 mt-3">
                                        {types.map((type) => (
                                            <Badge key={type} pill bg="light" text="dark" className="pokemon-type detail-type text-capitalize">
                                                {type}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <p className="detail-copy">
                                    Este Pokémon destaca por su presencia, su estilo único y su fuerza dentro del mundo Pokémon.
                                    Explora sus detalles, habilidades y estadísticas para conocer mejor su perfil en la Pokédex.
                                </p>

                                <div className="detail-metrics">
                                    <div className="detail-metric">
                                        <span>Peso</span>
                                        <strong>{(pokemon.weight / 10).toFixed(1)} kg</strong>
                                    </div>
                                    <div className="detail-metric">
                                        <span>Altura</span>
                                        <strong>{(pokemon.height / 10).toFixed(1)} m</strong>
                                    </div>
                                    <div className="detail-metric">
                                        <span>Experiencia</span>
                                        <strong>{pokemon.base_experience ?? 0}</strong>
                                    </div>
                                </div>

                                <div className="detail-abilities">
                                    <h3>Habilidades</h3>
                                    <div className="d-flex flex-wrap gap-2">
                                        {abilities.map((ability) => (
                                            <Badge key={ability} pill bg="primary" className="detail-ability text-capitalize">
                                                {ability.replace("-", " ")}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div className="detail-stats">
                                    <h3>Estadísticas</h3>
                                    {stats.map((stat) => (
                                        <div key={stat.stat.name} className="stat-row">
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <span className="stat-label text-capitalize">{stat.stat.name.replace("-", " ")}</span>
                                                <span className="stat-value">{stat.base_stat}</span>
                                            </div>
                                            <ProgressBar now={Math.min(stat.base_stat, 100)} className="detail-progress" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
};

export { DetallePokemon };