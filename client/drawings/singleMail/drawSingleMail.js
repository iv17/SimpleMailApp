import {
    EmptyCol, EmptyRow, H4, HR, Image, Strong, Label, VerticalPanel
} from '../../js/osc.js';

import drawSingleMailButtons from './drawSingleMailButtons.js';

export default function drawSingleMail(message) {

    var vp9 = new VerticalPanel('vp9', 'col-sm-9 col-md-10');

    var vp10 = new VerticalPanel('vp10', 'inbox-body');
    vp9.add(vp10);

    var vp11 = new VerticalPanel('vp11', 'heading-inbox row');
    vp10.add(vp11);

    var vp12 = new VerticalPanel('vp12', 'col-md-12');
    vp11.add(vp12);
    var h41 = new H4('h41', 'col-md-8', message.headers.subject);
    vp12.add(h41);

    var vp13 = new VerticalPanel('vp13', 'col-md-4 text-right');
    vp12.add(vp13);
    var date = new Label('date', 'date', message.headers.date);
    vp13.add(date);

    var vp14 = new VerticalPanel('vp14', 'col-md-12');
    vp13.add(vp14);
    var hr1 = new HR('hr1', 'col-md-12');
    vp10.add(hr1);

    var vp15 = new VerticalPanel('vp15', 'sender-info');
    vp10.add(vp15);

    var emptyRow2 = new EmptyRow('er2', '');
    vp10.add(emptyRow2);

    var vp16 = new VerticalPanel('vp16', 'row');
    vp15.add(vp16);

    var vp17 = new VerticalPanel('vp17', 'col-md-12');
    vp16.add(vp17);

    var senderImage = new Image('senderImage', '', 'http://chittagongit.com//images/google-user-icon/google-user-icon-7.jpg', message.headers.from, '40px', '40px');
    vp17.add(senderImage);
    var emptyCol = new EmptyCol('emptyCol1', '');
    vp17.add(emptyCol);
    var senderName = new Strong('senderName', '', message.headers.from);
    vp17.add(senderName);
    var textTo = new Label('textTo', '', ' to ');
    vp17.add(textTo);
    if(message.headers.to == undefined) {
        var textMe = new Strong('textMe', '', '');
        vp17.add(textMe);
    } else {
        var textMe = new Strong('textMe', '', message.headers.to);
        vp17.add(textMe);
    }

    var vp18 = new VerticalPanel('vp18', 'view-mail');
    vp10.add(vp18);

    var content = new Label('message', '', message.content);
    vp18.add(content);

    var emptyRow3 = new EmptyRow('er3', '');
    vp10.add(emptyRow3);
 
    var vp19 = drawSingleMailButtons(message);
    vp10.add(vp19);

    return vp9;
}