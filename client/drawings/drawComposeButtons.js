import {
    A, Button, EmptyCol, EmptyRow, H1, H2, H3, H4, H5, H6, HR, I, Image,
    InputArea, InputField, Strong, Label, AContainer, ButtonContainer,
    Form, HorizontalPanel, LI, MainPanel, UL, VerticalPanel
} from '../js/osc.js';
import drawInbox from './drawInbox.js';
import MessageManager from '../js/managers/MessageManager.js';
import drawSingleMail from './drawSingleMail.js';

export default function drawComposeButtons() {

    var vp14 = new VerticalPanel('vp14', 'compose-btn pull-left');
  
    var buttonSend = new AContainer('buttonSend', 'btn btn-sm btn-primary', 'Send ', '', '');
    vp14.add(buttonSend);
    var i1 = new I('i1', 'fa fa-envelope');
    buttonSend.add(i1);
    var ec1 = new EmptyCol('ec1', '');
    vp14.add(ec1);

    buttonSend.onclick = function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        console.log('SEND');

        var to = document.getElementById('inputEmail').value;
        var subject = document.getElementById('inputTitle').value;
        var bodyText = document.getElementById('inputMessage').value;

        var vp7 = document.getElementById("vp7");
        var vp9 = document.getElementById("vp9");
        vp9.remove(vp7);

        vp7 = new VerticalPanel('vp7', 'row');
        var vp99 = new VerticalPanel('vp9', 'col-sm-9 col-md-10');
        vp7.add(vp99);

        let axios = window._api.axios;
        let messageManager = new MessageManager(axios);

        messageManager.sendMessage(to, subject, bodyText)
            .then(response => {
                vp99 = drawSingleMail(messageManager.message);
            });

    }

    var buttonDiscard = new AContainer('buttonDiscard', 'btn btn-sm btn-default', 'Discard ', '', '');
    vp14.add(buttonDiscard);
    var i2 = new I('i2', 'fa fa-trash-o');
    buttonDiscard.add(i2);
    var ec2 = new EmptyCol('ec2', '');
    vp14.add(ec2);

    buttonDiscard.onclick = function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        console.log('DISCARD');
    }

    var hr2 = new HR('hr2', '');
    vp14.add(hr2);

    return vp14;
}