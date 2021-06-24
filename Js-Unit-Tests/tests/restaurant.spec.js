const assert = require('assert');
const createMenu = require('../src/restaurant');

describe('9 - Implemente os casos de teste e a função `createMenu`', () => {
  it('Verifica se a função `createMenu` tem o comportamento esperado', () => {
    // 1
    assert.strictEqual(typeof(createMenu().fetchMenu), 'function');
    // 2
    let menuOBJ = {food: {}, drink: {}};
    assert.deepStrictEqual(Object.keys(createMenu(menuOBJ).fetchMenu()), ['food', 'drink']);
    // 3
    let objetoRetornado = createMenu(menuOBJ);
    assert.deepStrictEqual(objetoRetornado.fetchMenu(), menuOBJ);
    // 4
    assert.deepStrictEqual(objetoRetornado.consumption, []);
    // 5
    objetoRetornado.order('coxinha');
    assert.strictEqual(objetoRetornado.consumption.includes('coxinha'), true);
    // 6
    objetoRetornado.order("agua");
    objetoRetornado.order("sopa");
    objetoRetornado.order("sashimi");
    assert.deepStrictEqual(objetoRetornado.consumption, ["coxinha", "agua", "sopa", "sashimi"]);
    // 7
    objetoRetornado = createMenu(menuOBJ);
    objetoRetornado.order('coxinha');
    objetoRetornado.order('agua');
    objetoRetornado.order('coxinha');
    assert.deepStrictEqual(objetoRetornado.consumption, ['coxinha', 'agua', 'coxinha']);
    // 8
    menuOBJ = {
      food: {coxinha: 5.50, salgadinho: 8.75},
      drink: {agua: 3.00, coca: 4.50},
    }
    objetoRetornado = createMenu(menuOBJ);
    objetoRetornado.order('coxinha');
    objetoRetornado.order('coca');
    objetoRetornado.order('salgadinho');
    assert.deepStrictEqual(objetoRetornado.pay(), 21)
  });
});
