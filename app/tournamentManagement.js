import {Tournament} from './classes/Tournament';
import * as playerManagement from './playerManagement';
import * as graphicalLayout from './graphicalLayout';

var tournament = {};
var $tournamentBox = $('#tournament-container');

export function init() {
  generateTournament();
  setWinner();
  removeTournament();
}

function generateTournament() {
  $('.createTournament').on('click',function(event) {
    playerManagement.fillWithGhostPlayers();
    tournament = new Tournament(playerManagement.players);
    $tournamentBox.html(graphicalLayout.drawTournament(tournament));

    $('.createTournament').hide();
    $('.removeTournament').show();

    event.preventDefault();
  });
}

function removeTournament() {
  $('.removeTournament').on('click',function(event) {
    playerManagement.removeListOfPlayers();
    tournament = {};
    $tournamentBox.empty();

    $('.removeTournament').hide();
    $('.createTournament').show();

    event.preventDefault();
  });
}

function setWinner() {
  $tournamentBox.on('click','.win',function(event) {
    var indexWinner = $(this).attr('data-index');
    var indexWinner = indexWinner.split(":");
    var indexMatch = indexWinner[0];
    var playerName = indexWinner[1];

    tournament.winnerOfMatch(indexMatch,playerName);
    if (tournament.winner)
      $('.winner').html(`Congratulations ${tournament.winner} you WIN!!`);
    else
      $tournamentBox.html(graphicalLayout.drawTournament(tournament));

    event.preventDefault();
  });
}
