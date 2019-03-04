import {
    A, Button, EmptyCol, EmptyRow, H1, H2, H3, H4, H5, H6, HR, I, Image,
    InputArea, InputField, Strong, Label, AContainer, ButtonContainer,
    Form, HorizontalPanel, LI, MainPanel, UL, VerticalPanel
} from '.././js/osc.js';

var messages = [
    {
        "id": "16948d9189e3ed78",
        "threadId": "169489f6c4cdd9ed",
        "labelIds": {
            '0': 'CATEGORY_PERSONAL',
            '1': 'INBOX'
        },
        "payload": {
            "partId": "string",
            "mimeType": "string",
            "filename": "string",
            "headers": [
                {
                    "name": "Date",
                    "value": "Mon, 4 Mar 2019 12:13:19"
                },
                {
                    "name": "Subject",
                    "value": "Апликација My Project се повезала са вашим Google налогом"
                },
                {
                    "name": "From",
                    "value": "Google <no-reply@accounts.google.com>"
                },
                {
                    "name": "To",
                    "value": "ivana.osc1@gmail.com"
                }
            ]
        },
        "snippet": "Апликација My Project је повезана са Google налого…ect може: Прегледајте имејлове и подешавања Слање",
        "historyId": "1788"
    },
    {
        "id": "169488142faac9fb", "threadId": "169488142faac9fb",
        "labelIds": {
            '0': 'CATEGORY_PERSONAL',
            '1': 'INBOX'
        },
        "payload": {
            "partId": "string",
            "mimeType": "string",
            "filename": "string",
            "headers": [
                {
                    "name": "Date",
                    "value": "Mon, 4 Mar 2019 12:13:19"
                },
                {
                    "name": "Subject",
                    "value": "Ivana, добро дошли на нов Google налог "
                },
                {
                    "name": "From",
                    "value": "Google <no-reply@accounts.google.com>"
                },
                {
                    "name": "To",
                    "value": "ivana.osc1@gmail.com"
                }
            ]
        },
        "snippet": "Здраво Ivana, Хвала вам што сте отворили Google на…ите оно што вам одговара. Управљајте подешавањима",
        "historyId": "1532"
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
        for (let j = 0; j < messages[index].payload.headers.length; j++) {
            if (messages[index].payload.headers[j].name == 'From') {
                var from = messages[index].payload.headers[j].value;
            }
            if (messages[index].payload.headers[j].name == 'Subject') {
                var subject = messages[index].payload.headers[j].value;
            }
            if (messages[index].payload.headers[j].name == 'Date') {
                var date = messages[index].payload.headers[j].value;
            }
        }
        container.add(new InputField("checkbox" + index, '', 'checkbox', ''));
        container.add(new EmptyCol('ec1', ''));
        container.add(new EmptyCol('ec2', ''));
        container.add(new Label("sender" + index, 'name', from, 'min-width: 120px;display: inline-block;'));
        container.add(new Label("title" + index, '', subject, ''));
        container.add(new Label("time" + index, 'badge', date, ''));


    }
    return vp9;
}