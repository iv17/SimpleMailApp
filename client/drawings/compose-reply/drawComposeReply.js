import {
    EmptyRow, HR, InputArea, InputField, VerticalPanel
} from '../../js/osc.js';

import drawComposeButtons from './drawComposeButtons.js';
import drawReplayButtons from './drawReplayButtons.js';

export default function drawComposeReply(message, type) {
    console.log('drawComposeReply: ' + type);

    var vp9 = new VerticalPanel('vp9', 'col-sm-9 col-md-10');

    var vp10 = new VerticalPanel('vp10', 'inbox-body');
    vp9.add(vp10);

    var vp11 = new VerticalPanel('vp11', 'heading-inbox row');
    vp10.add(vp11);

    var vp12 = new VerticalPanel('vp12', 'col-md-12');
    vp11.add(vp12);
    if(message) {
        var inputEmail = new InputField('inputEmail', 'form-control', 'email', '', message.headers.from);
        vp12.add(inputEmail);
    } else {
        var inputEmail = new InputField('inputEmail', 'form-control', 'email', 'To', '');
        vp12.add(inputEmail);
    }
    var hr1 = new HR('hr1', '');
    vp12.add(hr1);

    var vp13 = new VerticalPanel('vp13', 'view-mail');
    vp10.add(vp13);
    if(message) {
        var inputTitle = new InputField('inputTitle', 'form-control', 'text', '', message.headers.subject);
        vp13.add(inputTitle);
    } else {
        var inputTitle = new InputField('inputTitle', 'form-control', 'text', 'Title', '');
        vp13.add(inputTitle);
    }
    var emptyRow2 = new EmptyRow('er2', '');
    vp13.add(emptyRow2);
    var inputMessage = new InputArea('inputMessage', 'form-control', 'Enter a message', 13, 50);
    vp13.add(inputMessage);
    var emptyRow3 = new EmptyRow('er3', '');
    vp13.add(emptyRow3);
   
    if(type == 'COMPOSE') {
        var vp14 = drawComposeButtons();
        vp10.add(vp14);
    } 
    if(type == 'REPLY') {
        var vp14 = drawReplayButtons();
        vp10.add(vp14);
    }
    

    return vp9;
}