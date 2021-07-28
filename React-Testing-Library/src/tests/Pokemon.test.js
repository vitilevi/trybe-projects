import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

const pikachu = pokemons[0];

describe('Testa o componente Pokemon', () => {
  it('Testa se é renderizado um card com as informações do pokemon', () => {
    const { getByText, getByTestId, getAllByRole } = renderWithRouter(
      <Pokemon pokemon={ pikachu } showDetailsLink isFavorite />,
    );
    const pokemonName = getByText(pikachu.name);
    const pokemonType = getByText(pikachu.type);
    const pokemonWeight = getByTestId('pokemon-weight');
    const pokemonImg = getAllByRole('img')[0];
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    const weightValue = pikachu.averageWeight.value;
    const weightMeasurementUnit = pikachu.averageWeight.measurementUnit;
    expect(pokemonWeight.textContent).toBe(
      `Average weight: ${weightValue} ${weightMeasurementUnit}`,
    );
    const pokemonImgSrc = pikachu.image;
    expect(pokemonImg.src).toBe(pokemonImgSrc);
    expect(pokemonImg.alt).toBe(`${pikachu.name} sprite`);
  });

  it('Testa se o link de detalhes redireciona p/ o id correspondente ao pokemon', () => {
    const { getByText, history } = renderWithRouter(
      <Pokemon pokemon={ pikachu } showDetailsLink isFavorite />,
    );
    const detailsBtn = getByText(/more details/i);
    expect(detailsBtn.href).toBe(`http://localhost/pokemons/${pikachu.id}`);
    fireEvent.click(detailsBtn);
    expect(history.location.pathname).toBe(`/pokemons/${pikachu.id}`);
  });

  it('Testa se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { container } = renderWithRouter(
      <Pokemon pokemon={ pikachu } showDetailsLink isFavorite />,
    );
    const star = container.getElementsByClassName('favorite-icon')[0];
    const pokemonName = pikachu.name;
    expect(star).toBeInTheDocument();
    expect(star.src).toBe('http://localhost/star-icon.svg');
    expect(star.alt).toBe(`${pokemonName} is marked as favorite`);
  });
});
