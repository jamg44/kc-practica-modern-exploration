const api = 'https://gist.githubusercontent.com/miguepiscy/2d431ec3bc101ef62ff8ddd0e476177f/raw/2482274db871e60195b7196c602700226bdd3a44/practica.json';
let dataSource;
// main
d3.json(api).then(dataSource => {
  drawChart2('#chart2', parseDataChart2(dataSource));
  drawChart3('#chart3', parseDataChart3(dataSource));

});
