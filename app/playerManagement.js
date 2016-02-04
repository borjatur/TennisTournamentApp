import * as playerBussines from './playerBussines';
import * as graphicalLayout from './graphicalLayout';
import * as utils from '../utils/utils';
import {Player} from './classes/Player';

export var players = [];
var $playersBox = $('.playerList');

export function init() {
  addPlayers();
  deletePlayers();
}

export function fillWithGhostPlayers() {
  if (!utils.isPowerOfTwo(players.length) && players.length !== 1) {
    var numberOfGhostPlayers = utils.nearestPowerOfTwo(players.length)-players.length;

    for(var i = 0; i < numberOfGhostPlayers; i++)
      players.push(new Player(null,0));

  }
}

export function playerAlreadyExist(playerName) {
  var playerExist = false;

  for (var player of players)
    if (player.name === playerName) playerExist = true;

  return playerExist;
}

export function removeListOfPlayers() {
  $playersBox.empty();
  players = [];
}

function getPlayerValuesForm() {
  var playerValues = {
    name : $('input[name="playerName"]').val().trim(),
    rank : $('input[name="playerRank"]').val().trim()
  };

  return playerValues;
}

function addPlayers() {
  $('#addPlayer').on('submit',function(event) {
    var playerValues = getPlayerValuesForm();
    var validationPlayerValues = playerBussines.validatePlayerValues(playerValues);

    showOrHideErrorMessage(validationPlayerValues);

    if(validationPlayerValues.success) {
      var player = new Player(playerValues.name,playerValues.rank);
      players.push(player);
      $playersBox.html(graphicalLayout.drawListOfPlayes(players));
      $('.createTournament').show();
    }

    event.preventDefault();
  });
}

function deletePlayers() {
  $('.playerList').on('click','.close',function(event) {
    var index = parseInt($(this).attr('data-index'));
    utils.deleteElementOfArray(index,players);
    $playersBox.html(graphicalLayout.drawListOfPlayes(players));

    if (!players.length) {
        $('.createTournament').hide();
    }

    event.preventDefault();
  });
}

function showOrHideErrorMessage(validationPlayerValues) {
  var $errorSummary = $('#errorsummary');
  if (!validationPlayerValues.success) {
    var message = playerBussines.getErrorMessage(validationPlayerValues.error);
    $errorSummary[0].innerText = message;
    $errorSummary.show('slow');
  }
  else {
    $errorSummary.hide('slow');
  }
}
