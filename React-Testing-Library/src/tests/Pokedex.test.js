import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';
import { readFavoritePokemonIds } from '../services/pokedexService';

const pokemonNames = pokemons.map(({ name }) => name);
const nextButton = /Próximo pokémon/i;

describe('Testa o componente Pokedex', () => {
  let favorite;
  function setFavoritePokemonObject() {
    const favoritePokemonIds = readFavoritePokemonIds();
    const isPokemonFavorite = pokemons.reduce((acc, pokemon) => {
      acc[pokemon.id] = favoritePokemonIds.includes(pokemon.id);
      return acc;
    }, {});
    return isPokemonFavorite;
  }

  beforeEach(() => {
    favorite = setFavoritePokemonObject();
  });

  it('Testa se a página tem um h2 com o texto `Encountered pokémons`', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favorite } />,
    );
    const heading = getByRole('heading');
    expect(heading).toHaveTextContent(/encountered pokémons/i);
  });

  it('Testa se é exibido proximo pokemon ao clicar em proximo pokemon', () => {
    const { getByText, getByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favorite } />,
    );
    const nextBtn = getByText(nextButton);
    pokemonNames.forEach(() => {
      const pokemonName = getByTestId('pokemon-name').textContent;
      expect(pokemonNames).toContain(pokemonName);
      fireEvent.click(nextBtn);
    });
  });

  it('Testa se é exibido somente um pokemon por vez`', () => {
    const { getByText, container } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favorite } />,
    );
    let pokemon = container.getElementsByClassName('pokemon');
    const nextBtn = getByText(nextButton);
    expect(pokemon.length).toBe(1);
    fireEvent.click(nextBtn);
    pokemon = container.getElementsByClassName('pokemon');
    expect(pokemon.length).toBe(1);
  });

  it('Testa se a Pokédex tem os botões de filtro', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favorite } />,
    );
    const filterBtns = getAllByTestId('pokemon-type-button');
    const pokemonTypes = pokemons.map(({ type }) => type);
    filterBtns.forEach((btn) => {
      expect(pokemonTypes).toContain(btn.textContent);
    });
  });

  it('Testa se a Pokédex contém um botão para resetar o filtro `All`', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favorite } />,
    );
    const allBtn = getByText('All');
    expect(allBtn).toBeInTheDocument();
    const nextBtn = getByText(nextButton);
    pokemonNames.forEach((pokemon) => {
      const pokemonName = getByText(pokemon);
      expect(pokemonName).toBeInTheDocument();
      fireEvent.click(nextBtn);
    });
  });

  it('Testa se é criado dinamicamente os botãos de filtro de pokémon', () => {
    const { getByText, getAllByRole } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favorite } />,
    );
    const filterBtns = getAllByRole('button');
    fireEvent.click(filterBtns[3]);
    const nextBtn = getByText(nextButton);
    expect(nextBtn).toBeInTheDocument();
    expect(nextBtn.disabled).toBeTruthy();
  });

  it('Testa se ao clicar em um filtro só circula por pokemons daquele tipo', () => {
    const { getByText, getAllByRole } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favorite } />,
    );
    const firePokemons = pokemons.filter((pokemon) => pokemon.type === 'Fire');
    const firePokemonsName = firePokemons.map(({ name }) => name);
    const nextBtn = getByText(nextButton);
    const filterBtns = getAllByRole('button');
    fireEvent.click(filterBtns[2]);
    firePokemonsName.forEach((name) => {
      const firePokemon = getByText(name);
      expect(firePokemon).toBeInTheDocument();
      fireEvent.click(nextBtn);
    });
    const allBtn = getByText('All');
    fireEvent.click(allBtn);
    pokemonNames.forEach((name) => {
      const nameRegEx = new RegExp(name, 'ig');
      const pokemon = getByText(nameRegEx);
      expect(pokemon).toBeInTheDocument();
      fireEvent.click(nextBtn);
    });
  });
});
