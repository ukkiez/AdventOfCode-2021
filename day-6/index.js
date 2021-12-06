const fs = require( "fs" );
const data = fs.readFileSync( "./data.txt", "utf8" ).split( "," ).map( e => parseInt( e, 10 ) );

const calculatePopulation = ( days ) => {
  let populationByTimerState = new Array( 9 ).fill( 0 );
  for ( const timer of data ) {
    populationByTimerState[ timer ]++;
  }

  for ( let day = 1; day <= days; day++ ) {
    const birthingFish = populationByTimerState[ 0 ];

    // move all values one spot up
    populationByTimerState.copyWithin( 0, 1 );

    populationByTimerState[ 6 ] += birthingFish;
    populationByTimerState[ 8 ] = birthingFish;
  }
  return populationByTimerState.reduce( ( a, c ) => a + c );
}

console.log( "Answer part 1: ", calculatePopulation( 80 ) );
console.log( "Answer part 2: ", calculatePopulation( 256 ) );
