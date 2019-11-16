'use strict';

/**
 * Chart 2
 *
 * Crear una gráfica que en el eje Y tenga el número de propiedades
 * y en el eje X el número de habitaciones de un barrio.
 */


// result: [5,1,15,2]
function parseDataChart2(barrio) {
  const propertiesList = barrio.properties;
  const data = propertiesList.reduce((prev, curr) => {
    prev[curr.bedrooms] = (prev[curr.bedrooms] || 0) + 1;
    return prev;
  }, [] );
  for (let i = 0; i < 7; i++) {
    if (data[i] == null) data[i] = 0;
  }
  return data;
}

function drawChart2(elementID, data, width, height) {
  const maxProperties = d3.max(data);
  const marginLeft = 10;
  const sizeAxis = 20;
  const rectWidth = 60;
  const rectMargin = ((width - (data.length * rectWidth)) / data.length) / 2;

  const svg = d3.select('#' + elementID)
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  // creamos escalas x e y
  const scaleY = d3.scaleLinear()
    .domain([0, maxProperties])
    .range([height, 0]);

  const scaleX = d3.scaleLinear()
    .domain([0, data.length ])
    .range([marginLeft - 15, width]);

  // pintamos rects
  const rect = svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect');

  rect
    .attr('x', posX) // sumamos 1 para separarlos
    .attr('y', posY) // le damos la vuelta verticalmente
    .attr('width', rectWidth)
    .attr('height', scale)
    .attr('class', 'color-blue')

  // pintar un eje x
  const xAxis = d3.axisBottom(scaleX);
  xAxis.tickValues([0,1,2,3,4,5,6]); // https://github.com/d3/d3-axis
  // @Miguel Angel, aquí tengo un problema con el eje x, no se como hacer para que
  // corresponda con mis barras.
  // Por ejemplo si pinchas "Casa de Campo" y "Ciudad Universitaria" verás el problema
  // en las barras.
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
    const result = marginLeft + rectMargin + i * (rectWidth + (rectMargin * 2));
    return result;
  }

  function posY(d) {
    return height - scale(d) - sizeAxis;
  }

  function scale(d) {
    const scaleNum = height / maxProperties;
    return scaleNum * d - 20 ;
  }

}
