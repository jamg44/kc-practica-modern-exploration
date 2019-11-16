'use strict';

const api = 'https://gist.githubusercontent.com/miguepiscy/2d431ec3bc101ef62ff8ddd0e476177f/raw/2482274db871e60195b7196c602700226bdd3a44/practica.json';
const selectEl = document.getElementById('barrio-select');
let data;
// main
d3.json(api).then(dataReaded => {
  data = dataReaded;
  // cargamos el selector de barrios

  cargaSelectBarrios(selectEl, data);
  setTimeout(() => {
    barrioChanged();
  }, 0);


});

function cargaSelectBarrios(selectEl, data) {
  data.features
    .map( (el, i) => el.properties.name+'@'+i)
    .sort()
    .map( (barrioId, i) => {
      const [name, value] = barrioId.split('@');
      selectEl.add(new Option(name, value, false, name === 'Chopera'));
    });
}

function barrioChanged() {
  const barrio = data.features[selectEl.value].properties;
  //console.log('changed', barrio);

  // pintamos chart 2
  drawChart2('chart2', parseDataChart2(barrio));

  // pintamos chart 3
  //drawChart3('chart3', parseDataChart3(data));

}