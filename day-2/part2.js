const data = require( "./data.js" );
const _data = data.map( instruction => {
  const split = instruction.split( /\s/ );
  return {
    direction: split[ 0 ],
    value: parseInt( split[ 1 ], 10 ),
  };
} );

let aim = 0;
let depth = 0;
let horizontalPosition = 0;
for ( const { direction, value } of _data ) {
  switch ( direction ) {
    case "up":
      aim -= value;
      break;

    case "down":
      aim += value;
      break;

    case "forward":
      horizontalPosition += value;

      if ( aim ) {
        depth += ( value*aim );
      }
      break;
  }
}

// Answer
console.log( depth * horizontalPosition );
