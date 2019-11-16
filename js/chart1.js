'use strict';

/**
 * Chart 1
 *
 * Crear un mapa con los barrios de la ciudad de Madrid y pintarlos por colores
 * según el precio medio del alquiler en el barrio.
 */

function drawChart1(elementID, width, height, data, barrioSelected) {

  //const maxPrice = d3.max(data, d => d.properties.avgprice);

  const svg = d3.select('#' + elementID)
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  const projection = d3.geoMercator()
    .scale(height * 130)
    .center([-3.773521, 40.477007])
    .translate([width/2, height/2])
    ;

  const path = d3.geoPath().projection(projection);

  // const features = topojson
  //         .feature(spain, spain.objects.subunits)
  //         .features;

  // hasta aquí es comun para todos los mapas

  // generamos los nodos path
  const barrios = svg.selectAll('.barrio')
    .data(data)
    .enter()
    .append('path')
    .attr('class', 'barrio')
    .on('click', barrioClicked);

  // los pintamos
  barrios
    .attr('d', path)
    .attr('class', d => {
      // ponemos clase 'barrio-selected' solo al barrio seleccionado
      if (d.properties.name === barrioSelected.name) {
        return 'barrio-selected';
      }
    })

  // ponemos la escala de colores a los barrios en base a avgprice
  const color = d3.scaleOrdinal(d3.schemeBlues[9]);
  barrios.attr('fill', (d) => color(d.properties.avgprice));

  // handler de click en un barrio
  function barrioClicked(clicked) {
    let i = 0;
    while (i <= data.length) {
      if (data[i].properties.name === clicked.properties.name) break;
      i++;
    }
    // change combobox selected value
    selectEl.value = i;
    // repaint all charts for selected barrio
    pintaBarrio(clicked.properties);
  }

}
