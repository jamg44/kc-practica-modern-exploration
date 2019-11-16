'use strict';

/**
 * Chart 3
 *
 * Crear una gráfica que dibuje una regresión lineal de alguna de las características
 * con respecto al precio en un barrio.
 */

// result: [5,1,15,2]
function parseDataChart3(input) {
  const propertiesList = input.features[0].properties.properties;
  const data = propertiesList.reduce((prev, curr) => {
    prev[curr.bedrooms] = (prev[curr.bedrooms] || 0) + 1;
    return prev;
  }, [] );
  // return data;
  return [
    [5, 20],
    [480, 90],
    [25, 50],
    [100, 33],
    [330, 95],
  ];

}

function drawChart3(elementID, data) {
  const xmax = d3.max(data, d => d[0]);
  const xmin = d3.min(data, d => d[0]);
  const ymax = d3.max(data, d => d[1]);
  const ymin = d3.min(data, d => d[1]);

  const height = 500;
  const width = 500;
  const ratio = 5;
  const sizeAxis = 20;

  const scaleX = d3.scaleLinear()
    .domain([xmin, xmax]) // min y max de valores
    .range([ratio + sizeAxis, width - ratio]); // min y max de marco

  const scaleY = d3.scaleLinear()
    .domain([ymin, ymax]) // min y max de valores
    .range([ratio, height - ratio - sizeAxis]); // min y max de marco

  // creamos svg
  document.getElementById(elementID).innerHTML = '';
  const svg = d3.select('#' + elementID)
    .append('svg');

  svg
    .attr('width', width)
    .attr('height', height);

  // añadimos puntos
  const group = svg.selectAll('group')
    .data(data)
    .enter()
    .append('g')
    .attr('class', d => {
      const r = d[1] / 10;
      d.push(r);
      return 'point';
    });



  group.attr('transform', d => {
    const coordx = scaleX(d[0]);
    const coordy = scaleY(d[1]);
    return `translate(${coordx}, ${coordy})`;
  });

  const circle = group
    .append('circle');

  // posicion y tamaño de puntos
  circle
    .attr('cx', d => 0)
    .attr('cy', d => 0)
    .attr('r', (d) => {
      //debugger;
      // const r = d[1] / 10;
      // d.push(r);
      return d[2];
    })
    .attr('class', (d) => {
      if (d[2] > 5) {
        return 'rectwarning';
      }
    });

  group.append('text')
    .attr('x',  d => {
      return d[2];
    })
    .attr('y', 0)
    .text(d => d)

  // pintar un eje X
  const xAxis = d3.axisBottom(scaleX);
  //xAxis.tickValues([0,100, 120]); // https://github.com/d3/d3-axis

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
