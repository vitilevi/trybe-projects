export const resetStore = (name, email) => {
  localStorage.removeItem('state');
  const store = {
    player: {
      name,
      gravatarEmail: email,
      assertions: 0,
      score: 0,
    },
  };
  localStorage.setItem('state', JSON.stringify(store));
};

export const getFromStore = (key) => {
  const store = JSON.parse(localStorage.getItem(key));
  return store;
};

export const saveTokenToStore = (value) => {
  localStorage.setItem('token', JSON.stringify(value));
};

export const saveScoreToStore = (value) => {
  const defaultStore = {
    player: {
      score: 0,
    },
  };

  const receivedStore = getFromStore('state') || defaultStore;
  receivedStore.player.score += value;
  localStorage.setItem('state', JSON.stringify(receivedStore));
};

export const saveToStore = (key, value) => {
  const defaultStore = {
    player: {},
  };
  const receivedStore = getFromStore('state') || defaultStore;
  const { player } = receivedStore;
  player[key] = value;
  localStorage.setItem('state', JSON.stringify(receivedStore));
};

export const saveAssertionToStore = () => {
  const defaultStore = {
    player: {
      assertions: 0,
    },
  };

  const receivedStore = getFromStore('state') || defaultStore;
  receivedStore.player.assertions += 1;
  localStorage.setItem('state', JSON.stringify(receivedStore));
};

export const saveRankPlayer = (name, score, picture) => {
  const defaultRanking = [];
  const receivedRanking = getFromStore('ranking') || defaultRanking;
  const newArray = [...receivedRanking, { name, score, picture }];
  localStorage.setItem('ranking', JSON.stringify(newArray));
};
