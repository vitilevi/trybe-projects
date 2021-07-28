const fetchApi = () => {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  return (
    fetch(url)
      .then((response) => response.json())
      .then((result) => result)
      .catch((error) => console.log(error))
  );
};

export default fetchApi;
