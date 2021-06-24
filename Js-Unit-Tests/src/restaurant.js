function orderFromMenu(str) {
  this.consumption.push(str);
}

function calculateTotal() {
  let res = 0;
  const costF = Object.entries(this.fetchMenu().food);
  const costD = Object.entries(this.fetchMenu().drink);
  this.consumption.forEach((order) => {
    costF.forEach((food) => { const resFood = (order === food[0]) ? res += food[1] : null; });
    costD.forEach((drink) => { const resDrink = (order === drink[0]) ? res += drink[1] : null; });
  });
  return Math.round(res * 1.1);
}

const createMenu = (objetoRetornado) => ({
  fetchMenu: () => objetoRetornado,
  consumption: [],
  order: orderFromMenu,
  pay: calculateTotal,
});

module.exports = createMenu;
