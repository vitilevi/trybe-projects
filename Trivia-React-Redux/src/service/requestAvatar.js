const fetchAvatar = (hashEmail) => fetch(`https://www.gravatar.com/avatar/${hashEmail}`)
  .then((data) => ((data.url)));

export default fetchAvatar;
