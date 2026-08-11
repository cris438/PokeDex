import { useContext, useState } from "react";
import { Badge, Button, Card } from "react-bootstrap";
import { NavLink } from "react-router";
import { PokemonContext } from "../context/PokemonContext";

const CardPokemon = ({ id, name, image, types, isFavorite }) => {

  const { addFavorite } = useContext(PokemonContext)
  return (
    <Card className="pokemon-card h-100 border-0 shadow-sm">
      <div className="pokemon-card-image-wrap">
        <Card.Img variant="top" src={image} className="pokemon-card-image" />
      </div>

      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <Card.Title className="pokemon-card-title mb-0 text-capitalize">{name}</Card.Title>
          <span className="pokemon-id">#{String(id).padStart(3, '0')}</span>
        </div>

        <div className="d-flex flex-wrap gap-2 mb-3">
          {types.map((type) => (
            <Badge key={type} pill bg="light" text="dark" className="pokemon-type text-capitalize">
              {type}
            </Badge>
          ))}
        </div>

        <div className="mt-auto d-grid gap-2">
          <NavLink to={`/detalle/${id}`} className="btn btn-pokemon-card">
            Ver detalles
          </NavLink>
          {(isFavorite != undefined) && <Button onClick={() => {
            addFavorite(id)
          }} variant="outline-secondary" className={`${isFavorite ? 'btn-pokemon-card' : 'btn-pokemon-outline'} `}>Agregar a favoritos</Button>}
        </div>
      </Card.Body>
    </Card >
  )
}

export { CardPokemon };