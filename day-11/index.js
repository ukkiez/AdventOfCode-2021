const fs = require( "fs" );
const data = fs.readFileSync( "./data.txt", "utf8" );
// const data = fs.readFileSync( "./test.txt", "utf8" );

const rows = [];
for ( const row of data.split( /\n/ ) ) {
  const numbers = row.split( /[0-9]{0}/ ).map( e => parseInt( e ) );
  rows.push( numbers );
}

const coordinate = ( x, y ) => {
  return Number( x + "." + y );
};

const handleFlash = ( _rows, _x, _y, flashCache ) => {
  for ( let x = _x; x < _rows.length; x++ ) {
    for ( let y = _y; y < _rows[ 0 ].length; y++ ) {
      if ( flashCache.has( coordinate( x, y ) ) ) {
        // this octopus already flashed
        continue;
      }

      if ( _rows[ x ][ y ] > 9 ) {
        // octopus flashes, increasing the energy level of all adjacent
        // (including diagonal) octopuses
        _rows[ x ][ y ]++;
        flashCache.add( coordinate( x, y ) );

        // increase adjacent squares
        if ( _rows[ x-1 ] ) {
          // up
          _rows[ x-1 ][ y ]++;
          if ( !isNaN( _rows[ x-1 ][ y-1 ] ) ) {
            // diagonal upleft
            _rows[ x-1 ][ y-1 ]++;
          }
          if ( !isNaN( _rows[ x-1 ][ y+1 ] ) ) {
            // diagonal upright
            _rows[ x-1 ][ y+1 ]++;
          }
        }
        if ( _rows[ x+1 ] ) {
          // down
          _rows[ x+1 ][ y ]++;
          if ( !isNaN( _rows[ x+1 ][ y-1 ] ) ) {
            // diagonal downleft
            _rows[ x+1 ][ y-1 ]++;
          }
          if ( !isNaN( _rows[ x+1 ][ y+1 ] ) ) {
            // diagonal downright
            _rows[ x+1 ][ y+1 ]++;
          }
        }
        if ( !isNaN( _rows[ x ][ y-1 ] ) ) {
          // left
          _rows[ x ][ y-1 ]++;
        }
        if ( !isNaN( _rows[ x ][ y+1 ] ) ) {
          // right
          _rows[ x ][ y+1 ]++;
        }

        handleFlash( _rows, 0, 0, flashCache );
      }
    }
  }
}

const solve = ( _rows ) => {
  let totalFlashes = 0;
  const totalOctopuses = _rows.length * _rows[ 0 ].length;

  for ( let step = 1; step <= 1000; step++ ) {
    const flashCache = new Set();

    // increase energy levels by 1
    for ( let x = 0; x < _rows.length; x++ ) {
      for ( let y = 0; y < _rows[ 0 ].length; y++ ) {
        _rows[ x ][ y ]++;
      }
    }

    // handle all energy levels greater than 9 (greater, since we've already
    // just increased everything by 1); if one flashes, increase the levels of
    // all adjacent squares, and start looping from the diagonal topleft of that
    // flashing octopus, and do the same
    handleFlash( _rows, 0, 0, flashCache );

    let flashes = 0;
    // set all energy levels greater than 9 (which would've flashed) back to 0
    for ( let x = 0; x < _rows.length; x++ ) {
      for ( let y = 0; y < _rows[ 0 ].length; y++ ) {
        if ( _rows[ x ][ y ] > 9 ) {
          _rows[ x ][ y ] = 0;
          flashes++;
        }
      }
    }

    totalFlashes += flashes;

    if ( step === 100 ) {
      console.log( "Answer part 1: ", totalFlashes );
    }
    if ( flashes === totalOctopuses ) {
      console.log( "Answer part 2: ", step );
      return;
    }
  }
}
solve( [ ...rows ] );
