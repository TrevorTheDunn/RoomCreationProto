const createRoom = async (e) => {
    e.preventDefault();
    console.log("Called!");

    const name = e.target.querySelector("#roomName").value;
    const theme = e.target.querySelector("#roomTheme").value;
    const members = e.target.querySelector("#roomMembers").value;

    console.log("Name: " + name);
    console.log("Theme: " + theme);
    console.log("Members: " + members);

    const data = {name, theme, members};
    
    const response = await fetch(e.target.action, {
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
    const button = document.querySelector("#roomSubmit");

    button.onclick = (e) => {
        createRoom(e);
    };
};
window.onload = init;