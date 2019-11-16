'use strict';

/**
 * Chart 1
 *
 * Crear un mapa con los barrios de la ciudad de Madrid y pintarlos por colores
 * según el precio medio del alquiler en el barrio.
 */


// result: [5,1,15,2]
function parseDataChart1(barrio) {
  const propertiesList = barrio.properties;
  const data = propertiesList.reduce((prev, curr) => {
    prev[curr.bedrooms] = (prev[curr.bedrooms] || 0) + 1;
    return prev;
  }, [] );
  for (let i = 0; i < 5; i++) {
    if (data[i] == null) data[i] = 0;
  }
  return data;
}

function drawChart1(elementID, data, width, height) {
  const svg = d3.select('#' + elementID)
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  // http://centrodedescargas.cnig.es/CentroDescargas/index.jsp

  // npx live-server (con node)
  // npm install -g live-server (opcion 2)
  // live-server (opcion 2)
  // d3.json(/spain.json)

  d3.json('https://gist.githubusercontent.com/miguepiscy/d7385665112660012fdb73cf5ce3299f/raw/a95c33d4dc754294f0746c3682a739c1f030a133/spain.json')
    .then((spain) => {
      const projection = d3.geoMercator()
        .scale(height)
        .center([-3.703521, 40.417007])
        .translate([width/2, height/2])
        ;

      const path = d3.geoPath().projection(projection);

      const featuresSubunits = topojson
              .feature(spain, spain.objects.subunits)
              .features;

      // hasta aquí es comun para todos los mapas

      // select class => .class ej .subunits
      // selec id => #id ej #path34
      // element => elemento ej path o circle o rect
      const subunits = svg.selectAll('.subunits')
        .data(featuresSubunits)
        .enter()
        .append('path')
        .attr('class', 'subunits');

      subunits
        // .attr('d', (d) => path(d))
        .attr('d', path)

      const color = d3.scaleOrdinal(d3.schemeCategory10);
      subunits.attr('fill', (d) => color(d.properties.POP_EST));

      const featuresPlaces = topojson
        .feature(spain, spain.objects.places)
        .features;

      const group  = svg.selectAll('.places')
        .data(featuresPlaces)
        .enter()
        .append('g')
        .filter(d => {
          return d.properties.NAME === 'Madrid' ||
                 d.properties.NAME === 'Badajoz';
        })
        .attr('class', (d) => {
          console.log(d);
          return 'places'
        });

      group.attr('transform', (d) => {
        const translate = projection(d.geometry.coordinates); // cambiamos de lat,lon a x,y
        return `translate(${translate})`
      })

      group.append('circle').attr('r', 2);

      group.append('text')
        .text(d => d.properties.NAME);


    });

}
