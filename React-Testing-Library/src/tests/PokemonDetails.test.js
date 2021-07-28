import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

const pikachu = pokemons[0];

describe('Testa o componente Pokemon Details', () => {
  it('Testa se as informações do pokemon estão na tela', () => {
    const { queryByText, getByText, container } = renderWithRouter(<App />);
    fireEvent.click(getByText(/more details/i));
    const headings = container.getElementsByTagName('h2');
    expect(headings[0]).toBeInTheDocument();
    expect(headings[0]).toHaveTextContent(`${pikachu.name} Details`);
    expect(queryByText(/more details/i)).not.toBeInTheDocument();
    expect(headings[1]).toBeInTheDocument();
    expect(headings[1]).toHaveTextContent(/Summary/i);
    const paragraph = headings[1].nextElementSibling;
    expect(paragraph).toHaveTextContent(pikachu.summary);
  });

  it('Testa se na página existe uma seção com localizações', () => {
    const { getAllByAltText, getByText, container } = renderWithRouter(<App />);
    fireEvent.click(getByText(/more details/i));
    const headings = container.getElementsByTagName('h2');
    expect(headings[2]).toBeInTheDocument();
    expect(headings[2]).toHaveTextContent(/Game Locations of Pikachu/i);
    const locations = pikachu.foundAt;
    const altTextImage = getAllByAltText(`${pikachu.name} location`);
    locations.forEach(({ location, map }) => {
      const locationName = getByText(location);
      expect(locationName).toBeInTheDocument();
      const imgSrc = altTextImage.map((img) => img.src);
      expect(imgSrc).toContain(map);
    });
  });

  it('Testa se a página pode favoritar um Pokémon', () => {
    const { getByText, getByRole, getByLabelText, container } = renderWithRouter(<App />);
    fireEvent.click(getByText(/more details/i));
    const check = getByRole('checkbox');
    expect(check).toBeInTheDocument();
    expect(check).not.toBeChecked();
    fireEvent.click(check);
    const star = container.getElementsByClassName('favorite-icon')[0];
    expect(star).toBeInTheDocument();
    const label = getByLabelText(/Pokémon favoritado?/i);
    expect(label).toBeInTheDocument();
  });
});
