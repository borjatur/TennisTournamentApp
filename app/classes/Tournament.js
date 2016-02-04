import * as utils from '../../utils/utils';
export class Tournament {
  constructor(players) {
    this.players = players;
    this.matches = Tournament.createMatches(players);
    this.winner = null;
  }

  static orderByRank(array) {
    array.sort(function(a,b) {return b.rank-a.rank});
  }

  static orderByRankInverse(array) {
    array.sort(function(a,b) {return a.rank-b.rank});
  }

  static createMatches(players) {

    var matches = [];

    Tournament.orderByRank(players);
    var bestPlayers = utils.divideArrayTwoEqualsParts(players)[0];
    var worstPlayers = utils.divideArrayTwoEqualsParts(players)[1];
    Tournament.orderByRankInverse(worstPlayers);

    for(var i = 0; i < bestPlayers.length; i++)
      matches[i] = new Array(bestPlayers[i],worstPlayers[i]);

    matches = Tournament.orderMatches(matches);

    for(var j = matches.length; j < players.length-1; j++)
      matches[j] = new Array(2);

    return matches;
  }

  static orderMatches(matches) {
    var pairMatches = [];
    var unpairMatches = [];
    for (var i = 0; i < matches.length; i++) {
      if (i % 2 === 0) {
        pairMatches.push(matches[i].slice());
      }
      else {
        unpairMatches.push(matches[i].slice());
      }
    }
    matches = pairMatches.concat(unpairMatches);
    return matches;
  }

  getNumberOfRounds() {
    return (Math.log2(this.players.length));
  }

  getNumberOfMatchesForRound(round) {
    return (this.players.length/Math.pow(2,round+1));
  }

  getNumberOfPreviousMatchesForRound(round) {
    var numberPreviousMatches = 0;

    for (var i = round-1; i >= 0; i--)
      numberPreviousMatches += this.getNumberOfMatchesForRound(i);

    return numberPreviousMatches;
  }

  getMatchesOfRound(round) {

    var numberMatchesOfThisRound = this.getNumberOfMatchesForRound(round);
    var numberPreviousMatches = this.getNumberOfPreviousMatchesForRound(round);
    var matchesOfThisRound = [];

    for (var j = numberPreviousMatches; j < (numberPreviousMatches + numberMatchesOfThisRound); j++)
      matchesOfThisRound.push(this.matches[j]);

    return matchesOfThisRound;
  }

  nextMatchOfMatch(match) {
    return Math.floor(match/2)+(this.players.length/2);
  }

  getPositionInMatch(match) {
    return match % 2;
  }

  winnerOfMatch(match,playerName) {
    var nextMatch = this.nextMatchOfMatch(match);

    //win tournament condition
    if (nextMatch === this.matches.length) {
      this.winner = playerName;
    }
    else {
      var playerPosition;
      if (this.matches[match][0].name === playerName)
        playerPosition = 0;

      else if (this.matches[match][1].name === playerName)
        playerPosition = 1;

      this.matches[nextMatch][this.getPositionInMatch(match)] = this.matches[match][playerPosition];
    }
  }
}
