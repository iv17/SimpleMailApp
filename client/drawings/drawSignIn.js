import {
    A, Button, EmptyCol, EmptyRow, H1, H2, H3, H4, H5, H6, HR, I, Image,
    InputArea, InputField, Strong, Label, AContainer, ButtonContainer,
    Form, HorizontalPanel, LI, MainPanel, UL, VerticalPanel
} from '.././js/osc.js';

export default function drawSignIn() {
    var vp1 = new VerticalPanel('vp1', 'container');
    
    var vp2 = new VerticalPanel('vp2', 'row justify-content-md-center');
    vp1.add(vp2);

    var vp3 = new VerticalPanel('vp3', 'col-sm-6 col-md-4 col-md-offset-4');
    vp2.add(vp3);
    var h1 = new H1('h1', 'text-center login-title', 'Sign in to continue to Gmail');
    vp3.add(h1);

    var form = new Form('form1', 'form-signin');
    vp3.add(form);
    var inputEmail = new InputField('i1', 'form-control', 'email', 'Email');
    form.add(inputEmail);
    var inputPassword = new InputField('i2', 'form-control', 'password', 'Password');
    form.add(inputPassword);
    var button1 = new Button('b1', 'btn btn-lg btn-primary btn-block', 'Sign in', 'submit');
    form.add(button1);

    inputEmail.onchange = function (e) {
        var at = document.getElementById("i1").value.indexOf("@");
        if (at == -1) {
            alert('Not a valid email address!');
        }
    }
    inputPassword.onchange = function (e) {
        var password = document.getElementById("i2").value;
        if (password.length < 6) {
            alert('Password must be a least 6 characters long!');
        }
    }

    button1.onclick = function (e) {
        alert(document.getElementById("i1").value + " - " + document.getElementById("i2").value);
    }
    return vp2;
}