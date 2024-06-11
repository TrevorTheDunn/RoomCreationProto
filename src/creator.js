
const createRoom = async (e) => {
    e.preventDefault();

    const name = document.querySelector('#roomName').value;
    const theme = document.querySelector('#roomTheme').value;
    const amtMembers = document.querySelector('#roomMembers').value;

    const data = {name, theme, amtMembers};
    console.log(JSON.stringify(data));

    const response = await fetch('/createRoom', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if(result.redirect) {
        window.location = result.redirect;
    }

    if(result.error) {
        console.log("ERROR: " + result.error);
    }
};

const init = () => {
    const button = document.querySelector('#roomSubmit');

    button.onclick = (e) => {
        createRoom(e);
    };
};
window.onload = init;