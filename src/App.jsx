import { BrowserRouter, NavLink, Route, Routes } from "react-router"
import { Container, Navbar, Nav } from "react-bootstrap"
import { Home } from "./pages/Home"
import { Personajes } from "./pages/Personajes"
import { PokemonProvider } from "./context/PokemonContext"

function App() {
  return (
    <BrowserRouter>
      <PokemonProvider>
        <div className="app-shell">
          <Navbar expand="lg" className="pokemon-navbar shadow-sm">
            <Container>
              <Navbar.Brand as={NavLink} to="/" className="brand-text">
                Poké<span>World</span>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="main-nav" />
              <Navbar.Collapse id="main-nav">
                <Nav className="ms-auto gap-2">
                  <Nav.Link as={NavLink} to="/" className="nav-link-custom">
                    Inicio
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/personajes" className="nav-link-custom">
                    Catálogo
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          <main className="app-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/personajes" element={<Personajes />} />
            </Routes>
          </main>
        </div>
      </PokemonProvider>
    </BrowserRouter>
  )
}

export default App
