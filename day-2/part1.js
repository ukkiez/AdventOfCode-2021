const data = require( "./data.js" );
const _data = data.map( instruction => {
  const split = instruction.split( /\s/ );
  return {
    direction: split[ 0 ],
    value: parseInt( split[ 1 ], 10 ),
  };
} );

let depth = 0;
let horizontalPosition = 0;
for ( const { direction, value } of _data ) {
  switch ( direction ) {
    case "up":
      depth -= value;
      break;

    case "down":
      depth += value;
      break;

    case "forward":
      horizontalPosition += value;
      break;
  }
}

// Answer
console.log( depth * horizontalPosition );
