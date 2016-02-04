import $ from 'jquery';
import "bootstrap/css/bootstrap.css!"
import 'bootstrap';
import * as tournamentManagement from './tournamentManagement';
import * as playerManagement from './playerManagement';


$(document).ready(function() {

    playerManagement.init();
    tournamentManagement.init();

});
