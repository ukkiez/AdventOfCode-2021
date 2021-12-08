const fs = require( "fs" );
const data = fs.readFileSync( "./data.txt", "utf8" );

const _data = data.split( /\n/ ).map( e => {
  const split = e.split( /\|/ );
  return {
    input: split[ 0 ].trim(),
    output: split[ 1 ].trim(),
  };
} );

/*
const signalPatterns = {
  acdfg: 2, // length 5, 2 digits of 7, and 2 of 4
  bcdef: 5, // length 5, 2 digits of 7, and 3 of 4

  abcdf: 3, // length 5, 3 digits of 7, and 3 of 4

  bcdefg: 6, // length 6, 2 digits of 7
  abcdeg: 0, // length 6, 3 digits of 7, and 3 of 4
  abcdef: 9, // length 6, 3 digits of 7, and 4 of 4

  ab: 1,
  abd: 7,
  abef: 4,
  abcdefg: 8,
};
*/

const patternsBySegmentNumber = new Map( [
  [ 2, 1 ],
  [ 3, 7 ],
  [ 4, 4 ],
  [ 7, 8 ],
] );
const segmentNumbers = Array.from( patternsBySegmentNumber.keys() );

let count = 0;
for ( const { output } of _data ) {
  const outputDigits = output.split( /\s/ );
  for ( const digit of outputDigits ) {
    if ( segmentNumbers.includes( digit.length ) ) {
      count++;
    }
  }
}

let sum = 0;
for ( const { input, output } of _data ) {
  const outputDigits = output.split( /\s/ );
  const inputDigits = input.split( /\s/ );
  const patterns = new Map();
  let result = "";
  for ( const digit of inputDigits ) {
    if ( digit.length === 2 ) {
      patterns.set( 1, digit );
    }
    else if ( digit.length === 3 ) {
      patterns.set( 7, digit );
    }
    else if ( digit.length === 4 ) {
      patterns.set( 4, digit );
    }
    else if ( digit.length === 7 ) {
      patterns.set( 8, digit );
    }
  }

  for ( const digit of outputDigits ) {
    switch (digit.length ) {
      case 2:
        result += "1";
        break;

      case 3:
        result += "7";
        break;

      case 4:
        result += "4";
        break;

      case 7:
        result += "8";
        break;

      case 5: {
        const digitAndPattern7 = digit + patterns.get( 7 );
        const digitAndPattern4 = digit + patterns.get( 4 );

        if ( ( digitAndPattern7.length - new Set( digitAndPattern7 ).size ) === 2 ) {
          if ( ( digitAndPattern4.length - new Set( digitAndPattern4 ).size ) === 2 ) {
            result += "2";
          }
          else {
            result += "5";
          }
        }
        else {
          result += "3";
        }
        break;
      }

      case 6: {
        const digitAndPattern7 = digit + patterns.get( 7 );
        const digitAndPattern4 = digit + patterns.get( 4 );

        if ( ( digitAndPattern7.length - new Set( digitAndPattern7 ).size ) === 2 ) {
          result += "6";
        }
        else {
          if ( ( digitAndPattern4.length - new Set( digitAndPattern4 ).size ) === 3 ) {
            result += "0";
          }
          else {
            result += "9";
          }
        }
        break;
      }
    }
  }

  sum += Number( result );
}

console.log( "Answer part 1: ", count );
console.log( "Answer part 2: ", sum );
