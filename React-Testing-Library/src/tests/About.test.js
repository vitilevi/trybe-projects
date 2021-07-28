import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Testa o component About', () => {
  it('Testa se a página contém as informações sobre a Pokedex', () => {
    const { getByText } = renderWithRouter(<About />);
    const text = getByText(/This application simulates a Pokédex,/i);
    expect(text).toBeInTheDocument();
  });

  it('Testa se a página contém um h2 com o texto About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const role = getByRole('heading');
    expect(role).toHaveTextContent('About Pokédex');
  });

  it('Testa se a página contem dois parágrafos sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const firstParagraph = getByText(/This application simulates/i);
    expect(firstParagraph).toBeInTheDocument();
    const secondParagraph = getByText(/One can filter Pokémons/i);
    expect(secondParagraph).toBeInTheDocument();
  });

  it('Testa se a página contem a imagem de uma Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const imageSource = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const image = getByRole('img');
    expect(image.src).toBe(imageSource);
  });
});
