const fs = require( "fs" );
const data = fs.readFileSync( "./data.txt", "utf8" );

const splitLines = data.split( /\n/ );
const pool = splitLines[ 0 ].split( "," ).map( e => parseInt( e, 10 ) );
const boards = [];
const boardIndexesByNumber = new Map();
let boardIndex = 0;
let rowIndex = 0;
for ( let i = 2; i < splitLines.length; i++ ) {
  if ( !splitLines[ i ] ) {
    boardIndex++;
    rowIndex = 0;
    continue;
  }

  boards[ boardIndex ] = boards[ boardIndex ] || [];
  const numbersInRow = splitLines[ i ].trim().split( /\s+/ );
  boards[ boardIndex ].push( numbersInRow );
  let columnIndex = 0;
  for ( const number of numbersInRow ) {
    if ( !boardIndexesByNumber.has( number ) ) {
      boardIndexesByNumber.set( number, [] );
    }
    boardIndexesByNumber.get( number ).push( { boardIndex, rowIndex, columnIndex } );
    columnIndex++;
  }

  rowIndex++;
}

const sumUnmarkedNumbers = ( board, markedNumbers ) => {
  return board.flat().reduce( ( accumulator, currentValue ) => {
    if ( !markedNumbers.includes( parseInt( currentValue, 10 ) ) ) {
      return accumulator + parseInt( currentValue, 10 );
    }

    return accumulator;
  }, 0 );
}

const getWinners = ( returnFirst = true ) => {
  const markedBoardData = {};
  for ( let i = 0; i < boards.length; i++ ) {
    markedBoardData[ i ] = {
      frequency: 0,
      markedNumbers: [],
      x: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
      y: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
      draw: undefined,
    };
  }

  const winnerIndexes = [];

  for ( const draw of pool ) {
    const markedBoards = boardIndexesByNumber.get( "" + draw );
    loop: for ( const { boardIndex, rowIndex, columnIndex } of markedBoards ) {
      if ( winnerIndexes.includes( boardIndex ) ) {
        continue;
      }

      markedBoardData[ boardIndex ].frequency++;
      markedBoardData[ boardIndex ].markedNumbers.push( draw );

      markedBoardData[ boardIndex ].x[ rowIndex ]++
      markedBoardData[ boardIndex ].y[ columnIndex ]++;

      if ( markedBoardData[ boardIndex ].frequency >= 5 ) {
        for ( const value of Object.values( markedBoardData[ boardIndex ].y ).concat( Object.values( markedBoardData[ boardIndex ].x ) ) ) {
          if ( value >= 5 ) {
            if ( !returnFirst ) {
              winnerIndexes.push( boardIndex );
              markedBoardData[ boardIndex ].draw = draw;
              continue loop;
            }

            const answer = sumUnmarkedNumbers( boards[ boardIndex ], markedBoardData[ boardIndex ].markedNumbers ) * draw;
            return answer;
          }
        }
      }
    }
  }

  if ( !returnFirst ) {
    const lastIndex = winnerIndexes[ winnerIndexes.length - 1 ];
    const answer = sumUnmarkedNumbers( boards[ lastIndex ], markedBoardData[ lastIndex ].markedNumbers ) * markedBoardData[ lastIndex ].draw;
    return answer;
  }
}
console.log( getWinners( true ) );
console.log( getWinners( false ) );
