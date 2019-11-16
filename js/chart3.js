'use strict';

/**
 * Chart 3
 *
 * Crear una gráfica que dibuje una regresión lineal de alguna de las características
 * con respecto al precio en un barrio.
 */

const POINTS = 100;

function drawChart3(elementID, width, height, dataSource, barrioSelected) {

  // result: [ [5, 1], [15,2] ]
  function parseDataSource(dataSource) {
    return [...Array(POINTS).keys()].map(_ => [Math.random() * 100, Math.random() * 100]);
  }

  const data = parseDataSource(dataSource);

  const xmax = d3.max(data, d => d[0]);
  const xmin = d3.min(data, d => d[0]);
  const ymax = d3.max(data, d => d[1]);
  const ymin = d3.min(data, d => d[1]);

  const ratio = 5;
  const sizeAxis = 20;

  const scaleX = d3.scaleLinear()
    .domain([xmin, xmax]) // min y max de valores
    .range([ratio + sizeAxis, width - ratio]); // min y max de marco

  const scaleY = d3.scaleLinear()
    .domain([ymin, ymax]) // min y max de valores
    .range([ratio, height - ratio - sizeAxis]); // min y max de marco

  // creamos svg
  const svg = d3.select('#' + elementID)
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  // añadimos puntos
  const group = svg.selectAll('group')
    .data(data)
    .enter()
    .append('g')
    .attr('class', 'color-blue');

  // cada punto es un grupo
  group.attr('transform', d => {
    const coordx = scaleX(d[0]);
    const coordy = scaleY(d[1]);
    return `translate(${coordx}, ${coordy})`;
  });

  // añadimos a cada grupo un punto
  const circle = group
    .append('circle');

  // posicion y tamaño de puntos
  circle
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', 3);

  // pinto un eje X
  const xAxis = d3.axisBottom(scaleX);
  svg.append('g')
    .attr('class', 'axisX')
    .attr('transform', `translate(0, ${height - sizeAxis})`)
    .call(xAxis);

  // pintar un eje Y
  const yAxis = d3.axisLeft(scaleY);
  svg.append('g')
    .attr('class', 'axisY')
    .attr('transform', `translate(21, 0)`)
    .call(yAxis);
}
