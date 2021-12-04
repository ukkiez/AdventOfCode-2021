const data = require( "./data.js" );

const rates = {
  oxygenGenerator: [ ...data ],
  co2Scrubber: [ ...data ],
};

let oxygenGeneratorFound = false;
let co2ScrubberFound = false;
for ( let i = 0; i < data[ 0 ].length; i++ ) {
  // oxygen generator rating equals most common bit, co2 scrubber rating equals
  // least common bit

  let bitOccurrences = {
    oxygenGenerator: {
      zero: 0,
      one: 0,
    },
    co2Scrubber: {
      zero: 0,
      one: 0,
    },
  };

  for ( const type of Object.keys( bitOccurrences ) ) {
    if ( type === "oxygenGenerator" && oxygenGeneratorFound ) {
      continue;
    }
    else if ( type === "co2Scrubber" && co2ScrubberFound ) {
      continue;
    }

    for ( const element of rates[ type ] ) {
      switch ( element[ i ] ) {
        case "0":
          bitOccurrences[ type ].zero++;
          break;

        case "1":
          bitOccurrences[ type ].one++;
          break;
      }
    }

    switch ( type ) {
      case "oxygenGenerator":
        const mostCommonBit = ( bitOccurrences[ type ].one >= bitOccurrences[ type ].zero ) ? "1" : "0";
        rates[ type ] = rates[ type ].filter( binaryString => ( binaryString[ i ] === mostCommonBit ) );

        if ( rates[ type ].length === 1 ) {
          oxygenGeneratorFound = true;
        }
        break;

      case "co2Scrubber":
        const leastCommonBit = ( bitOccurrences[ type ].zero <= bitOccurrences[ type ].one ) ? "0" : "1";
        rates[ type ] = rates[ type ].filter( binaryString => ( binaryString[ i ] === leastCommonBit ) );

        if ( rates[ type ].length === 1 ) {
          co2ScrubberFound = true;
        }
        break;
    }
  }
}

// Answer
console.log( parseInt( rates.oxygenGenerator, 2 ) * parseInt( rates.co2Scrubber, 2 ) );
