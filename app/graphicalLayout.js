export function drawListOfPlayes(players) {
  var stringHTML = '';

  for (var i = 0; i < players.length; i++) {
      stringHTML += `<li class="list-group-item">`;
      stringHTML += `<span class="playerName">${players[i].name}</span>`;
      stringHTML += `<button type="button" class="close" data-index="${i}" aria-label="Close">`;
      stringHTML += `<span aria-hidden="true">×</span>`;
      stringHTML += `</button>`;
      stringHTML += `<span class="badge">${players[i].rank}</span>`;
      stringHTML += `</li>`;
  }

  return stringHTML;
}

function drawMatchOfTournament(indexOfMatch,match) {
  var stringHTML = '';
  stringHTML += '<li class="spacer">&nbsp;</li>';
  stringHTML += '<li class="game game-top">';

  if (match[0] && match[0].name) {
    stringHTML += `<i class="player">${match[0].name}</i>&nbsp;&nbsp;`;
    stringHTML += `<a href="#" class="win" data-index="${indexOfMatch}:${match[0].name}">win</a>`;
  }
  else
    stringHTML += '&nbsp;';

  stringHTML += '</li>';
  stringHTML += '<li class="game game-spacer">&nbsp;</li>';
  stringHTML += '<li class="game game-bottom">';

  if (match[1] && match[1].name) {
    stringHTML += `<i class="player">${match[1].name}</i>&nbsp;&nbsp;`;
    stringHTML += `<a href="#" class="win" data-index="${indexOfMatch}:${match[1].name}">win</a>`;
  }
  else
    stringHTML += '&nbsp;';

  stringHTML += '</li>';
  return stringHTML;
}

function drawRoundOfTournament(round,tournament) {
  var matches = tournament.getMatchesOfRound(round);
  var numberPreviousMatches = tournament.getNumberOfPreviousMatchesForRound(round);
  var stringHTML = '';

  stringHTML += '<ul class="round">';

  for (var i = 0; i < matches.length; i++) {
    stringHTML += drawMatchOfTournament(i+numberPreviousMatches,matches[i]);
  }

  stringHTML += '<li class="spacer">&nbsp;</li>';
  stringHTML += '</ul>';
  return stringHTML;
}

export function drawTournament(tournament) {
  var stringHTML = '';

  for (var i = 0; i < tournament.getNumberOfRounds(); i++) {
    stringHTML += drawRoundOfTournament(i,tournament);
  }

  stringHTML += '<ul class="round"><li class="game winner"></li></ul>';

  return stringHTML;
}
