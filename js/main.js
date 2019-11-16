'use strict';

const api = 'https://gist.githubusercontent.com/miguepiscy/2d431ec3bc101ef62ff8ddd0e476177f/raw/2482274db871e60195b7196c602700226bdd3a44/practica.json';
const selectEl = document.getElementById('barrio-select');
let data;

// main
d3.json(api).then(dataReaded => {
  data = dataReaded;
  // cargamos el selector de barrios
  cargaSelectBarrios(selectEl, data);
  setTimeout(barrioChanged, 0);

});

function cargaSelectBarrios(selectEl, data) {
  data.features
    .map((el, i) => el.properties.name+'@'+i)
    .sort()
    .map(barrioId => {
      const [name, value] = barrioId.split('@');
      selectEl.add(new Option(name, value, false, name === 'Palacio'));
    });
}

function barrioChanged() {
  const barrio = data.features[selectEl.value].properties;
  pintaBarrio(barrio);
}

function pintaBarrio(barrio) {

  // pintamos chart 1
  document.getElementById('chart1').innerHTML = '';
  drawChart1('chart1', data.features, barrio, 600, 400);

  // pintamos chart 2
  document.getElementById('chart2').innerHTML = '';
  drawChart2('chart2', parseDataChart2(barrio), 600, 400);

  // pintamos chart 3
  document.getElementById('chart3').innerHTML = '';
  drawChart3('chart3', parseDataChart3(data), 600, 400);

}