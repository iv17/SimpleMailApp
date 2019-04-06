import {
    A, Button, EmptyCol, EmptyRow, H1, H2, H3, H4, H5, H6, HR, I, Image,
    InputArea, InputField, Strong, Label, AContainer, ButtonContainer,
    Form, HorizontalPanel, LI, MainPanel, UL, VerticalPanel
} from '.././js/osc.js';
import drawSingleMail from './drawSingleMail.js';
import MessageManager from '.././js/managers/MessageManager.js';

export default function drawInbox(messages) {

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
        for (let j = 0; j < messages[index].headers.length; j++) {
            if (messages[index].headers[j].name == 'From') {
                var from = messages[index].headers[j].value;
            }
            if (messages[index].headers[j].name == 'Subject') {
                var subject = messages[index].headers[j].value;
            }
            if (messages[index].headers[j].name == 'Date') {
                var date = messages[index].headers[j].value;
            }
        }
        container.add(new InputField("checkbox" + index, '', 'checkbox', ''));
        container.add(new EmptyCol('ec1', ''));
        container.add(new EmptyCol('ec2', ''));
        container.add(new Label("sender" + index, 'name', from, 'min-width: 120px;display: inline-block;'));
        container.add(new Label("title" + index, '', subject, ''));
        container.add(new Label("time" + index, 'badge', date, ''));
        container.onclick = function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            console.log(messages[index].id);

            var vp7 = document.getElementById("vp7");
            var vp9 = document.getElementById("vp9");
            vp9.remove(vp7);

            vp7 = new VerticalPanel('vp7', 'row');
            var vp99 = new VerticalPanel('vp9', 'col-sm-9 col-md-10');
            vp7.add(vp99);

            let axios = window._api.axios;
            let url = window.a.url;
            let code = window.a.code;
            let messageManager = new MessageManager(axios);

           
            messageManager.fetchMessage(url, code, messages[index].id)
            .then(response => {
               console.log(messageManager.message)
                vp99 = drawSingleMail(messageManager.message);
			})
           
        }
    }
    return vp9;
}