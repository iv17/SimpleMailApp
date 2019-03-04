import {
    A, Button, EmptyCol, EmptyRow, H1, H2, H3, H4, H5, H6, HR, I, Image,
    InputArea, InputField, Strong, Label, AContainer, ButtonContainer,
    Form, HorizontalPanel, LI, MainPanel, UL, VerticalPanel
} from '.././js/osc.js';

var messages = [
    {
        "sender": {
            "name": "Jon Smith",
            "email": "john.smith@gmail.com"
        },
        "title": "Faucibus rutrum",
        "message": "Phasellus sodales vulputate urna, vel accumsan augue egestas ac. " +
            "Donec vitae leo at sem lobortis porttitor eu consequat risus." +
            "Mauris sed congue orci. Donec ultrices faucibus rutrum. " +
            "Phasellus sodales vulputate urna, vel accumsan augue egestas ac." +
            "Donec vitae leo at sem lobortis porttitor eu consequat risus." +
            "Mauris sed congue orci. Donec ultrices faucibus rutrum." +
            "Phasellus sodales vulputate urna, vel accumsan augue egestas ac. " +
            "Donec vitae leo at sem lobortis porttitor eu consequat risus." +
            "Mauris sed congue orci. Donec ultrices faucibus rutrum. " +
            "Phasellus sodales vulputate urna, vel accumsan augue egestas ac." +
            "Donec vitae leo at sem lobortis porttitor eu consequat risus." +
            "Mauris sed congue orci. Donec ultrices faucibus rutrum.",
        "time": "12:15 PM"
    },
    {
        "sender": {
            "name": "Ana Nicol",
            "email": "ana.nicol@gmail.com"
        },
        "title": "Donec ultrices faucibus rutrum.",
        "message": "...",
        "time": "15:30 PM"
    },
    {
        "sender": {
            "name": "Jon Smith",
            "email": "john.smith@gmail.com"
        },
        "title": "Mauris sed congue orci",
        "message": "...",
        "time": "12:15 PM"
    }
];

export default function drawInbox() {

    var vp9 = new VerticalPanel('vp9', 'col-sm-9 col-md-10');

    var ul3 = new UL('ul3', 'nav nav-tabs');
    vp9.add(ul3);

    var li31 = new LI('li31', 'active');
    ul3.add(li31);
    var a31 = new AContainer('a31', '', 'Primary ', '#', 'tab');
    li31.add(a31);
    var hp1 = new HorizontalPanel('hp1', 'glyphicon glyphicon-inbox');
    a31.add(hp1);

    var li32 = new LI('li32', '');
    ul3.add(li32);
    var a32 = new AContainer('a32', '', 'Social ', '#', 'tab');
    li32.add(a32);
    var hp2 = new HorizontalPanel('hp2', 'glyphicon glyphicon-user');
    a32.add(hp2);

    var vp10 = new VerticalPanel('vp10', 'tab-content');
    vp9.add(vp10);
    var vp11 = new VerticalPanel('vp11', 'tab-pane fade in active');
    vp10.add(vp11);
    var vp12 = new VerticalPanel('vp12', 'list-group');
    vp11.add(vp12);

    var inbox_rows = [];
    for (let index = 1; index < messages.length + 1; index++) {
        var inbox_rowID = "inbox_row" + index;
        inbox_rows.push(new AContainer(inbox_rowID, 'list-group-item', '', '#'));

    }
    for (let index = 0; index < messages.length; index++) {

        var container = inbox_rows[index];
        vp12.add(container);
        container.add(new InputField("checkbox" + index, '', 'checkbox', ''));
        container.add(new EmptyCol('ec1', ''));
        container.add(new EmptyCol('ec2', ''));
        container.add(new Label("sender" + index, 'name', messages[index].sender.name, 'min-width: 120px;display: inline-block;'));
        container.add(new Label("title" + index, '', messages[index].title, ''));
        container.add(new Label("time" + index, 'badge', messages[index].time, ''));
    }
    return vp9;
}