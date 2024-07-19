const helper = require('./helper.js');
const React = require('react');
const {createRoot} = require('react-dom/client');

// handleSignup function - takes in a form
// retrieves information entered into the form
// calls helper's sendPost function and passes in the
// action from the form as well as the information pulled from it
const handleSignup = (e) => {
    e.preventDefault();
    helper.hideError();

    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;
    const pass2 = e.target.querySelector('#pass2').value;

    if(!username || !pass || !pass2) {
        helper.handleError('All fields are required!');
        return false;
    }

    if(pass !== pass2) {
        helper.handleError('Passwords do not match!');
        return false;
    }

    helper.sendPost(e.target.action, {username, pass, pass2});
    return false;
};

// SignupWindow - returns a form for the user to signup
const SignupWindow = (props) => {
    return (
        <form id="signupForm"
            name="signupForm"
            onSubmit={handleSignup}
            action="/signup"
            method="POST"
            className="mainForm"
        >
            <label htmlFor="username">Username: </label>
            <input id="user" type="text" name="username" placeholder="username" />
            <label htmlFor="pass">Password: </label>
            <input id="pass" type="text" name="pass" placeholder="password" />
            <label htmlFor="pass2">Password: </label>
            <input id="pass2" type="text" name="pass2" placeholder="retype password" />
            <input className="formSubmit" type="submit" value="Sign Up" />
        </form>
    );
};

// init - called when window loads
// creates a root at the content section and renders SignupWindow there
const init = () => {
    const root = createRoot(document.getElementById('content'));
    root.render( <SignupWindow /> );
};
window.onload = init;