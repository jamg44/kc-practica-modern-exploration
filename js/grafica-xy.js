const api = 'https://gist.githubusercontent.com/miguepiscy/2d431ec3bc101ef62ff8ddd0e476177f/raw/2482274db871e60195b7196c602700226bdd3a44/practica.json';

function parseData(data) {
  const bpi =  data.bpi;
  const arr = [];
  for (let item in bpi) {
    arr.push({ date: new Date(item), value: bpi[item] })
  }
  return arr;
}

d3.json(api)
  .then(data => {
    // data: { type: "FeatureCollection", features: Array(128) }
    // drawChart(parseData(data))
    console.log(data.features);
  });

