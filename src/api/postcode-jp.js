const getAddress = (zipCode) => {
  const url = `https://postcode-jp.appspot.com/api/postcode?general=true&office=true&postcode=${zipCode}`;
  return fetch(url)
    .then(res => res.json())
    .catch((e) => { console.log(`ERROR: ${e.message}`)});
};

const apis = { getAddress };

export default apis;
