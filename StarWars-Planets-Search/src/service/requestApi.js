const fetchPlanetApi = () => {
  const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
  return fetch(url)
    .then((response) => response.json())
    .then((result) => result.results)
    .catch((error) => error);
};

export default fetchPlanetApi;
