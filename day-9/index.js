const fs = require( "fs" );
const data = fs.readFileSync( "./data.txt", "utf8" );

const rows = [];
for ( const row of data.split( /\n/ ) ) {
  const numbers = row.split( /[0-9]{0}/ ).map( e => parseInt( e ) );
  rows.push( numbers );
}

const lowPoints = [];
let risk = 0;

let columnMaxIndex = rows[ 0 ].length-1;
for ( let x = 0; x < rows.length; x++ ) {
  const row = rows[ x ];
  for ( let y = 0; y <= columnMaxIndex; y++ ) {
    const n = row[ y ];
    if ( n === 9 ) {
      continue;
    }

    let above = false;
    let below = false;
    let left = false;
    let right = false;

    above = ( rows[ x-1 ] && !isNaN( rows[ x-1 ][ y ] ) ? ( rows[ x-1 ][ y ] > n ) : true );
    below = ( rows[ x+1 ] && !isNaN( rows[ x+1 ][ y ] ) ? ( rows[ x+1 ][ y ] > n ) : true );
    left = !isNaN( row[ y-1 ] ) ? ( row[ y-1 ] > n ) : true;
    right = !isNaN( row[ y+1 ] ) ? ( row[ y+1 ] > n ) : true;

    if ( above && below && right && left ) {
      lowPoints.push( {
        value: row[ y ],
        x,
        y,
        cache: new Set( [
          // cache the original coordinate upfront
          x + "." + y,
        ] ),
      } );

      risk += ( row[ y ] + 1 );
    }
  }
}
console.log( "Answer part 1: ", risk );

function isPartOfBasin( { value, x, y, cache } ) {
  // above
  if ( rows[ x-1 ] ) {
    const above = rows[ x-1 ][ y ];
    if ( !isNaN( above ) && ( above !== 9 ) && ( ( above - value ) >= 1 ) ) {
      const coordinate = ( x-1 ) + "." + y;

      if ( !cache.has( coordinate ) ) {
        cache.add( coordinate );
        isPartOfBasin( {
          value: above,
          x: x-1,
          y,
          cache,
        } )
      }
    }
  }
  // below
  if ( rows[ x+1 ] ) {
    const below = rows[ x+1 ][ y ];
    if ( !isNaN( below ) && ( below !== 9 ) && ( ( below - value ) >= 1 ) ) {
      const coordinate = ( x+1 ) + "." + y;

      if ( !cache.has( coordinate ) ) {
        cache.add( coordinate );
        isPartOfBasin( {
          value: below,
          x: x+1,
          y,
          cache,
        } )
      }
    }
  }

  // left
  const left = rows[ x ][ y-1 ];
  if ( !isNaN( left ) && ( left !== 9 ) && ( ( left - value ) >= 1 ) ) {
    const coordinate = x + "." + ( y-1 );

    if ( !cache.has( coordinate ) ) {
      cache.add( coordinate );
      isPartOfBasin( {
        value: left,
        x,
        y: y-1,
        cache,
      } )
    }
  }
  // right
  const right = rows[ x ][ y+1 ];
  if ( !isNaN( right ) && ( right !== 9 ) && ( ( right - value ) >= 1 ) ) {
    const coordinate = x + "." + ( y+1 );

    if ( !cache.has( coordinate ) ) {
      cache.add( coordinate );
      isPartOfBasin( {
        value: right,
        x,
        y: y+1,
        cache,
      } )
    }
  }
}

for ( const lowPoint of lowPoints ) {
  isPartOfBasin( lowPoint );
}

lowPoints.sort( ( a, b ) => b.cache.size - a.cache.size );
// console.log( lowPoints.map( e => e.cache ) );
console.log( "Answer part 2: ", lowPoints[ 0 ].cache.size * lowPoints[ 1 ].cache.size * lowPoints[ 2 ].cache.size );
