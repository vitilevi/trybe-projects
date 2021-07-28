import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Testa o componente Favorite Pokemons', () => {
  it('Testa se é exibido a mensagem No favorite pokemon found na tela', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const text = getByText(/No favorite pokemon found/i);
    expect(text).toBeInTheDocument();
  });

  it('Testa se é exibido todos os cards de pokémons favoritados', () => {
    const { getByText, getByRole, container } = renderWithRouter(<App />);
    const btnDetails = getByText(/more details/i);
    fireEvent.click(btnDetails);
    const checkBox = getByRole('checkbox');
    fireEvent.click(checkBox);
    const favBtn = getByText(/favorite pokémons/i);
    fireEvent.click(favBtn);
    const pokemon = container.getElementsByClassName('pokemon');
    expect(pokemon.length).toBe(1);
  });

  it('Testa se nenhum card é exibido se nenhum pokémon for favoritado', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const text = getByText(/no favorite pokemon found/i);
    expect(text).toBeInTheDocument();
  });
});
