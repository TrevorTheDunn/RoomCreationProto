const createRoom = async (e) => {
    e.preventDefault();
    console.log("Called!");

    const name = document.querySelector("#roomName").value;
    const theme = document.querySelector("#roomTheme").value;
    const members = document.querySelector("#roomMembers").value;

    console.log("Name: " + name);
    console.log("Theme: " + theme);
    console.log("Members: " + members);

    const data = {name, theme, members};
    
    const response = await fetch("/createRoom", {
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