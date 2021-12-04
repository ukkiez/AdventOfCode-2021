const data = require( "./data.js" );

let increasedCount = 0;
let previousDataPoint;
for ( const element of data ) {
  if ( element > previousDataPoint ) {
    increasedCount++;
  }

  previousDataPoint = element;
}

// Answer for part 1
console.log( increasedCount );

let increasedCount2 = 0;
let previousWindow = [ data[ 0 ], data[ 1 ], data[ 2 ] ];
for ( let i = 1; i < data.length; i++ ) {
  let nextWindow = [ data[ i ], data[ i+1 ], data[ i+2 ] ];

  if ( nextWindow.reduce( ( a, b ) => a+b ) > previousWindow.reduce( ( a, b ) => a+b ) ) {
    increasedCount2++;
  }

  previousWindow = nextWindow;
}

// Answer for part 2
console.log( increasedCount2 );

