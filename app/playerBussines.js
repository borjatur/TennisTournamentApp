import * as utils from '../utils/utils';
import * as playerManagement from './playerManagement';

export function validatePlayerValues(playerValues) {
  var validationResult = {
    success : false,
    error : null
  };
  var validPlayer = false;

  if (utils.isEmpty(playerValues.name) || utils.isEmpty(playerValues.rank)) {
    validationResult.error = {
      name : utils.isEmpty(playerValues.name),
      rank : utils.isEmpty(playerValues.rank)
    }
  }
  else if(playerManagement.playerAlreadyExist(playerValues.name)) {
    validationResult.error = {
      exists : playerManagement.playerAlreadyExist(playerValues.name)
    }
  }
  else if (!utils.isANumber(playerValues.rank)) {
    validationResult.error = {
      number : !utils.isANumber(playerValues.rank)
    }
  }
  else {
    validPlayer = true;
  }

  setValidationResult(validPlayer,validationResult);
  return validationResult;
}

function setValidationResult(validPlayer,validationResult) {
  if (validPlayer)
    validationResult.success = true;
}

export function getErrorMessage(error) {
  var message = "";

  if (error.name && error.rank) {
    message = "Player name and Rank can not be empty";
  }
  else if (error.name) {
    message = "Player name can not be empty";
  }
  else if (error.rank) {
    message = "Rank can not be empty";
  }
  else if (error.number) {
    message = "Rank must be a numeric value";
  }
  else if (error.exists) {
    message = "This player alreay exists";
  }
  return message;
}
