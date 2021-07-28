import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testa o componente NotFound', () => {
  it('Testa se a página tem um heading H2 com o texto `Page requested not found`', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const heading = getByRole('heading');
    expect(heading).toHaveTextContent(/page requested not found 😭/i);
  });

  it('Testa se a página mostra uma imagem específica', () => {
    const { container } = renderWithRouter(<NotFound />);
    const img = container.getElementsByClassName('not-found-image')[0];
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
