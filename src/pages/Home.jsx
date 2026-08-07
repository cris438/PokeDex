import { NavLink } from "react-router"
import { Button, Col, Container, Row } from "react-bootstrap"

const Home = () => {
  return (
    <Container className="py-5">
      <Row className="align-items-center hero-section g-4">
        <Col lg={7} className="text-center text-lg-start">
          <div className="hero-badge mb-3">Pokémon • Colección</div>
          <h1 className="display-4 fw-bold hero-title mb-3">
            Descubre tu próxima aventura Pokémon
          </h1>
          <p className="lead text-secondary mb-4 hero-copy">
            Explora personajes, descubre tipos y vive la emoción de cada batalla.
            Una experiencia visual moderna para navegar tu mundo Pokémon favorito.
          </p>
          <div className="d-flex flex-wrap justify-content-center justify-content-lg-start gap-3">
            <Button as={NavLink} to="/personajes" variant="primary" size="lg" className="btn-pokemon-primary">
              Ver catálogo
            </Button>
            <Button as={NavLink} to="/personajes" variant="outline-primary" size="lg" className="btn-pokemon-secondary">
              Explorar pokémon
            </Button>
          </div>
        </Col>

        <Col lg={5}>
          <div className="hero-visual">
            <div className="pokeball-circle">
              <div className="pokeball-inner">
                <div className="pokeball-button" />
              </div>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="g-4 mt-4">
        <Col md={4}>
          <div className="feature-card h-100">
            <div className="feature-icon">⚡</div>
            <h3>Energia</h3>
            <p>Diseño dinámico con una estética moderna y atractiva.</p>
          </div>
        </Col>
        <Col md={4}>
          <div className="feature-card h-100">
            <div className="feature-icon">🎯</div>
            <h3>Fácil de explorar</h3>
            <p>Organización visual clara para navegar el catálogo sin esfuerzo.</p>
          </div>
        </Col>
        <Col md={4}>
          <div className="feature-card h-100">
            <div className="feature-icon">🌟</div>
            <h3>Estilo premium</h3>
            <p>Una interfaz inspirada en tonos Pokémon con enfoque premium.</p>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export { Home }