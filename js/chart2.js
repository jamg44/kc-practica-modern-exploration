'use strict';

/**
 * Chart 2
 *
 * Crear una gráfica que en el eje Y tenga el número de propiedades
 * y en el eje X el número de habitaciones de un barrio.
 */

const api = 'https://gist.githubusercontent.com/miguepiscy/2d431ec3bc101ef62ff8ddd0e476177f/raw/2482274db871e60195b7196c602700226bdd3a44/practica.json';

// main
d3.json(api).then(data => {
  // chart 2
  drawChart('#chart2', parseChart2(data));
});

// result: [5,1,15,2]
function parseChart2(input) {
  const propertiesList = input.features[0].properties.properties;
  const data = propertiesList.reduce((prev, curr) => {
    prev[curr.bedrooms] = (prev[curr.bedrooms] || 0) + 1;
    return prev;
  }, [] );
  return data;
}

function drawChart(el, data) {
  const maxProperties = d3.max(data);
  const height = 400;
  const width = 600;
  const marginLeft = 22;
  const sizeAxis = 20;

  const svg = d3.select(el)
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  // creamos escalas x e y
  const scaleY = d3.scaleLinear()
    .domain([0, maxProperties])
    .range([height, 0]);

  const scaleX = d3.scaleLinear()
    .domain([0, data.length])
    .range([marginLeft, width]);

  const rect = svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', d => {
      if ( d > 10) return 'rectwarning';
    });

  const rectWidth = 80;
  const rectMargin = ((width - (data.length * rectWidth)) / data.length) / 2;
  rect
    .attr('x', posX) // sumamos 1 para separarlos
    .attr('y', posY) // le damos la vuelta verticalmente
    .attr('width', rectWidth)
    .attr('height', scale)

  const xAxis = d3.axisBottom(scaleX);
  xAxis.tickValues([0,1, 2, 3, 4]); // https://github.com/d3/d3-axis
  svg.append('g')
    .attr('class', 'axisX')
    .attr('transform', `translate(60, ${height - sizeAxis})`)
    .call(xAxis);

  // pintar un eje Y
  svg.append('g')
    .attr('class', 'axisY')
    .attr('transform', `translate(21, ${-sizeAxis})`)
    .call(d3.axisLeft(scaleY));

  function posX(d, i) {
    return rectMargin + i * (rectWidth + (rectMargin * 2));
  }

  function posY(d) {
    return height - scale(d) - sizeAxis;
  }

  function scale(d) {
    const scaleNum = height / maxProperties;
    return scaleNum * d - 20 ;
  }


}
