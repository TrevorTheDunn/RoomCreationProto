const helper = require('./helper.js');
const React = require('react');
const {createRoot} = require('react-dom/client');

// handleLogin function - takes in a form
// retrieves information entered into the form
// calls helper's sendPost function and passes in the
// action from the form as well as the information pulled from it
const handleLogin = (e) => {
    e.preventDefault();
    helper.hideError();

    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;

    if (!username || !pass) {
        helper.handleError('Username or password is empty!');
        return false;
    }

    helper.sendPost(e.target.action, {username, pass});
    return false;
};

// LoginWindow - returns a form for the user to login
const LoginWindow = (props) => {
    return (
        <form id="loginForm"
            name="loginForm"
            onSubmit={handleLogin}
            action="/login"
            method="POST"
            className="mainForm"
        >
            <label htmlFor="username">Username: </label>
            <input id="user" type="text" name="username" placeholder="username" />
            <label htmlFor="pass">Password: </label>
            <input id="pass" type="text" name="pass" placeholder="password" />
            <input className="formSubmit" type="submit" value="Log In" />
        </form>
    );
};

// init - called when window loads
// creates a root at the content section and renders LoginWindow there
const init = () => {
    const root = createRoot(document.getElementById('content'));
    root.render( <LoginWindow /> );
};
window.onload = init;