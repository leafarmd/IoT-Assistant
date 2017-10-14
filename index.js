'use strict';

const express = require('express');
const bodyParser = require('body-parser');
var pos = 0;
const restService = express();
process.env.DEBUG = 'actions-on-google:*';
const Assistant = require('actions-on-google').ApiAiAssistant;
restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());

restService.post('/echo', function(req, res) {

  const assistant = new Assistant({ request: req, response: res });
  var message = assistant.getArgument('echoText').toLowerCase();
  var song = "talk";
  //palavras globais
  var events = "events";
  // var pucrs = "pucrs";
  var building = "building";
  var smartcity = "smart city";

  //prédios
  var p32 = "thirty-two";
  var p30 = "thirty";

  //biblioteca
  // var title = "title";
  // var book1 = "designing interfaces";
  // var book2 = "scrum";
  // var keyWord = "software development";

    //EVENTOS
    if(message.indexOf(smartcity) > -1) {
      sendResponse("Smart cities are projects in which a given urban space is the scene of intensive experiences of communication and information technologies sensitive to the Internet of Things context, of urban management and social action driven by data.");
    }//else
    //
    // if(message.indexOf(song) > -1) {
    //   sendResponse('<speak> playing audio news <audio src="https://leafarmd.000webhostapp.com/news2.mp3"></audio></speak>')
    // }else
    //
    // //Sessão de eventos
    if(message.indexOf(events) > -1) {
        if(message.indexOf(building) > -1) {
              if(message.indexOf(p30) > -1) {
                sendResponse("<speak>There will be an event called Electrical Engineering, on October 16, 2017, at 5:30 p.m. in room 201 of building 30, second floor.</speak>");
              }else if(message.indexOf(p32) > -1) {
                sendResponse("<speak>There will be an event called Smart Cities and IoT, on October 16, 2017, at 6:00 pm in the ground floor auditorium of building 32.</speak>");
              }else
                sendResponse("<speak>No events were identified in the building mentioned.</speak>");
        }else
          sendResponse("<speak>There will be an event called Entrepreneurship in the academic world, on October 16, 2017, at 7:00 pm in the auditorium of building 15, second floor. There will be an event called Legislation and Philosophy, on October 16, 2017, at 4:00 p.m. in Room 303 of Building 11 on the third floor.</speak>");
    }

    function sendResponse(msg) {
      assistant.ask(msg);
    }

});

restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});
