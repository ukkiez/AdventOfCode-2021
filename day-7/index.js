const fs = require( "fs" );
const data = fs.readFileSync( "./data.txt", "utf8" );

const horPositions = data.split( "," ).map( e => parseInt( e, 10 ) );

const getMedian = ( array ) => {
  array = [ ...array ].sort( ( a, b ) => a - b );
  const middle = Math.floor( array.length / 2 );

  if ( ( array.length % 2 ) === 0 ) {
    return ( array[ middle - 1 ] + array[ middle ] ) / 2;
  }

  return array[ middle ];
}

const getTriangularNumber = ( n ) => {
  return ( n * ( n + 1 ) ) / 2;
}

const median = getMedian( horPositions );
const average = Math.floor( horPositions.reduce( ( a, c ) => a + c ) / ( horPositions.length ) );
let totalFuelCostPart1 = 0;
let totalFuelCostPart2 = 0;
for ( let i = 0; i < horPositions.length; i++ ) {
  totalFuelCostPart1 += Math.abs( median - horPositions[ i ] );
  totalFuelCostPart2 += getTriangularNumber( Math.abs( average - horPositions[ i ] ) );
}

console.log( "Answer part 1: ", totalFuelCostPart1 );
console.log( "Answer part 2: ", totalFuelCostPart2 );
