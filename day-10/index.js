const fs = require( "fs" );
const data = fs.readFileSync( "./data.txt", "utf8" );

const lines = data.split( /\n/ );

const openingEquivalent = new Map( [
  [ ")", "(" ],
  [ "]", "[" ],
  [ "}", "{" ],
  [ ">", "<" ],
] );
const corruptionScores = new Map( [
  [ ")", 3 ],
  [ "]", 57 ],
  [ "}", 1197 ],
  [ ">", 25137 ],
] );
const openingChars = Array.from( openingEquivalent.values() );

const illegalChars = [];
const incompleteLineCaches = [];
loopLines: for ( const line of lines ) {
  const cache = [];
  for ( let x = 0; x < line.length; x++ ) {
    let char = line[ x ];
    if ( openingChars.includes( char ) ) {
      cache.push( char );
    }
    else {
      const lastOpener = cache.pop();
      if ( lastOpener === openingEquivalent.get( char ) ) {
        continue;
      }
      else {
        illegalChars.push( char );
        continue loopLines;
      }
    }
  }

  incompleteLineCaches.push( cache );
}
const corruptionScore = illegalChars.map( char => {
  return corruptionScores.get( char );
} ).reduce( ( a, c ) => a+c );
console.log( "Answer part 1: ", corruptionScore );

// -----------------------------------------------------------------------------

const closingEquivalent = new Map( [
  [ "(", ")" ],
  [ "[", "]" ],
  [ "{", "}" ],
  [ "<", ">" ],
] );
const autocompleteScores = new Map( [
  [ ")", 1 ],
  [ "]", 2 ],
  [ "}", 3 ],
  [ ">", 4 ],
] );
const scores = [];
for ( const cache of incompleteLineCaches ) {
  let score = 0;
  const closingChars = cache.map( char => closingEquivalent.get( char ) ).reverse();
  for ( const char of closingChars ) {
    score *= 5;
    score += autocompleteScores.get( char );
  }

  scores.push( score );
}

// get median of sorted scores
console.log( "Answer part 2: ", scores.sort( ( a, b ) => a-b )[ Math.floor( scores.length/2 ) ] );
