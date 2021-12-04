const data = require( "./data.js" );

const length = data[ 0 ].length;
const bitOccurrences = {
  zero: new Array( length ).fill( 0 ),
  one: new Array( length ).fill( 0 ),
};
for ( const element of data ) {
  for ( let i = 0; i < length; i++ ) {
    switch ( element[ i ] ) {
      case "0":
        bitOccurrences.zero[ i ]++;
        break;

      case "1":
        bitOccurrences.one[ i ]++;
        break;
    }
  }
}

const rates = {
  gamma: "",
  epsilon: "",
};

for ( let i = 0; i < length; i++ ) {
  if ( bitOccurrences.zero[ i ] > bitOccurrences.one[ i ] ) {
    rates.gamma += "0";
    rates.epsilon += "1";
  }
  else {
    rates.gamma += "1";
    rates.epsilon += "0";
  }
}

// convert binary string to decimal by specifying base 2 for parseInt();
// Answer
console.log( parseInt( rates.gamma, 2 ) * parseInt( rates.epsilon, 2 ) );
