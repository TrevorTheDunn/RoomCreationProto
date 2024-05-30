// getRoom - fetches roomData
// sets the retrieved data accordingly
const getRoom = async () => {
    const response = await fetch('/getRoomData', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const result = await response.json();

    if(!result) {
        return;
    }

    const roomName = document.querySelector("#roomName");
    const roomTheme = document.querySelector("#roomTheme");
    const roomMembers = document.querySelector("#roomMembers");

    roomName.innerHTML = `Name: ${result.name}`;
    roomTheme.innerHTML = "Theme: ";
    switch(result.theme) {
        case 'default': 
            roomTheme.innerHTML += 'Default';
            break;
        case 'coffee':
            roomTheme.innerHTML += 'Coffee Shop';
            break;
        case 'western':
            roomTheme.innerHTML += 'Western';
            break;
        case 'cyberpunk':
            roomTheme.innerHTML += 'Cyberpunk';
            break;
        case 'kawaii':
            roomTheme.innerHTML += 'Kawaii';
            break;
        default:
            roomTheme.innerHTML += 'Undefined';
            break;
    }
    roomMembers.innerHTML = `Amount of Members: ${result.amtMembers}`;

    return;
};

// init - init function for room.handlebars
// runs when the window has loaded
const init = () => {
    getRoom();
};
window.onload = init;