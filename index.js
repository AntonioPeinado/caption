const portfinder = require('portfinder');
const electron = require('electron');
const { Display } = require('@caption/display');
const { Transcripter } = require('@caption/transcripter');


portfinder.getPortPromise().then(function(port) {
    const display = new Display(electron);
    const transcripter = new Transcripter(port);

    transcripter.on('connected', function (address) {
        display.intro(`Open Google Chrome and navigate to ${address}`);
    });

    transcripter.on('message', function (message) {
        display.write(message);
    });

    display.on('close', function () {
        transcripter.close();
    })

    display.on('load', function () {
        transcripter.start();
    });
});