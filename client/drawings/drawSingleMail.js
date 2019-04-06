import {
    A, Button, EmptyCol, EmptyRow, H1, H2, H3, H4, H5, H6, HR, I, Image,
    InputArea, InputField, Strong, Label, AContainer, ButtonContainer,
    Form, HorizontalPanel, LI, MainPanel, UL, VerticalPanel
} from '.././js/osc.js';

import drawCompose from './drawCompose.js';

export default function drawSingleMail(message) {

    for (let j = 0; j < message.headers.length; j++) {
        if (message.headers[j].name == 'From') {
            var from = message.headers[j].value;
        }
        if (message.headers[j].name == 'Subject') {
            var subject = message.headers[j].value;
        }
        if (message.headers[j].name == 'Date') {
            var date = message.headers[j].value;
        }
    }
    var vp9 = new VerticalPanel('vp9', 'col-sm-9 col-md-10');

    var vp10 = new VerticalPanel('vp10', 'inbox-body');
    vp9.add(vp10);

    var vp11 = new VerticalPanel('vp11', 'heading-inbox row');
    vp10.add(vp11);

    var vp12 = new VerticalPanel('vp12', 'col-md-8');
    vp11.add(vp12);

    var vp13 = new VerticalPanel('vp13', 'compose-btn pull-left');
    vp12.add(vp13);

    var button1 = new AContainer('button1', 'btn btn-sm btn-primary', 'Reply ', '#', '');
    vp13.add(button1);
    var i1 = new I('i1', 'fa fa-reply');
    button1.add(i1);

    var emptyCol1 = new EmptyCol('ec1', '');
    vp13.add(emptyCol1);

    var button2 = new AContainer('button2', 'btn btn-sm btn-default', 'Forward ', '#', '');
    vp13.add(button2);
    var i2 = new I('i2', 'fa fa-arrow-right');
    button2.add(i2);

    var emptyCol2 = new EmptyCol('ec2', '');
    vp13.add(emptyCol2);

    var button3 = new AContainer('button3', 'btn btn-sm btn-default', 'Delete ', '#', '');
    vp13.add(button3);
    var i3 = new I('i3', 'fa fa-trash-o');
    button3.add(i3);

    var emptyRow4 = new EmptyRow('er4', '');
    vp12.add(emptyRow4);

    var vp14 = new VerticalPanel('vp14', 'col-md-4 text-right');
    vp11.add(vp14);

    var date = new Label('date', 'date', date);
    vp14.add(date);

    var vp15 = new VerticalPanel('vp15', 'col-md-12');
    vp11.add(vp15);

    var h41 = new H4('h41', '', subject);
    vp15.add(h41);
    var hr1 = new HR('hr1', '');
    vp15.add(hr1);

    var vp16 = new VerticalPanel('vp16', 'sender-info');
    vp10.add(vp16);

    var emptyRow2 = new EmptyRow('er2', '');
    vp10.add(emptyRow2);

    var vp17 = new VerticalPanel('vp17', 'row');
    vp16.add(vp17);

    var vp18 = new VerticalPanel('vp18', 'col-md-12');
    vp17.add(vp18);

    var senderImage = new Image('senderImage', '', 'https://bootdey.com/img/Content/avatar/avatar6.png', from, '40px', '40px');
    vp18.add(senderImage);
    var senderName = new Strong('senderName', '', from);
    vp18.add(senderName);
    var senderMail = new Label('senderMail', '', ' [' + from + '] ');
    vp18.add(senderMail);
    var textTo = new Label('textTo', '', ' to ');
    vp18.add(textTo);
    var textMe = new Strong('textMe', '', ' me ');
    vp18.add(textMe);

    var vp19 = new VerticalPanel('vp19', 'view-mail');
    vp10.add(vp19);

    var message = new Label('message', '', message.content);
    vp19.add(message);

    var emptyRow3 = new EmptyRow('er3', '');
    vp10.add(emptyRow3);

    var vp20 = new VerticalPanel('vp20', 'compose-btn pull-left');
    vp10.add(vp20);

    var button4 = new AContainer('button4', 'btn btn-sm btn-primary', 'Reply ', '', '');
    vp20.add(button4);
    var i4 = new I('i4', 'fa fa-reply');
    button4.add(i4);
    var emptyCol3 = new EmptyCol('ec3', '');
    vp20.add(emptyCol3);
    
    button4.onclick = function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();        
        console.log(from + '' + subject);

        var vp7 = document.getElementById("vp7");
        var vp9 = document.getElementById("vp9");
        vp9.remove(vp7);

        vp7 = new VerticalPanel('vp7', 'row');
        var vp99 = new VerticalPanel('vp9', 'col-sm-9 col-md-10');
        vp7.add(vp99);
        vp99 = drawCompose();
        
    }

    var button5 = new AContainer('button5', 'btn btn-sm btn-default', 'Forward ', '', '');
    vp20.add(button5);
    var i5 = new I('i5', 'fa fa-arrow-right');
    button5.add(i5);
    var emptyCol4 = new EmptyCol('ec4', '');
    vp20.add(emptyCol4);

    var button6 = new AContainer('button6', 'btn btn-sm btn-default', 'Delete ', '', '');
    vp20.add(button6);
    var i6 = new I('i6', 'fa fa-trash-o');
    button6.add(i6);

    return vp9;
}