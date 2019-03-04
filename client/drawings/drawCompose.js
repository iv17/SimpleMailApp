import {
    A, Button, EmptyCol, EmptyRow, H1, H2, H3, H4, H5, H6, HR, I, Image,
    InputArea, InputField, Strong, Label, AContainer, ButtonContainer,
    Form, HorizontalPanel, LI, MainPanel, UL, VerticalPanel
} from '.././js/osc.js';

export default function drawCompose() {

    var vp9 = new VerticalPanel('vp9', 'col-sm-9 col-md-10');

    var vp10 = new VerticalPanel('vp10', 'inbox-body');
    vp9.add(vp10);

    var vp11 = new VerticalPanel('vp11', 'heading-inbox row');
    vp10.add(vp11);

    var vp12 = new VerticalPanel('vp12', 'col-md-12');
    vp11.add(vp12);
    var inputEmail = new InputField('i1', 'form-control', 'email', 'To');
    vp12.add(inputEmail);
    var hr1 = new HR('hr1', '');
    vp12.add(hr1);

    var vp13 = new VerticalPanel('vp13', 'view-mail');
    vp10.add(vp13);
    var inputTitle = new InputField('inputTitile', 'form-control', 'text', 'Title');
    vp13.add(inputTitle);
    var emptyRow2 = new EmptyRow('er2', '');
    vp13.add(emptyRow2);
    var inputMessage = new InputArea('inputMessage', 'form-control', 'Enter a message', 10, 50);
    vp13.add(inputMessage);
    var emptyRow3 = new EmptyRow('er3', '');
    vp13.add(emptyRow3);

    var vp14 = new VerticalPanel('vp14', 'compose-btn pull-left');
    vp10.add(vp14);

    var buttonSend = new AContainer('buttonSend', 'btn btn-sm btn-primary', 'Send', '', '');
    vp14.add(buttonSend);
    var i1 = new I('i1', 'fa fa-envelope');
    buttonSend.add(i1);
    var ec1 = new EmptyCol('ec1', '');
    vp14.add(ec1);

    var buttonDiscard = new AContainer('buttonDiscard', 'btn btn-sm btn-default', 'Discard', '', '');
    vp14.add(buttonDiscard);
    var i2 = new I('i2', 'fa fa-trash-o');
    buttonDiscard.add(i2);

    return vp9;
}