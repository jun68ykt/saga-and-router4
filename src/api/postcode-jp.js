const getAddress = (zipCode) => {
  const url = `https://apis.postcode-jp.com/api/v3/postcodes?postcode=${zipCode}`;
  return fetch(url,
  {
      headers: {
        apikey: 'XXXXXXXXXXXXXXX' // 👈 ここに取得したAPIキーを書く
      }
    })
    .then(res => res.json())
    .catch((e) => { console.log(`ERROR: ${e.message}`)});
};

const apis = { getAddress };

export default apis;
