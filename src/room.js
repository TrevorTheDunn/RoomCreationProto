// getRoom - fetches roomData
// sets the retrieved data accordingly
const getRoom = async () => {
    const response = await fetch('/getRoom', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const result = await response.json();

    const rooms = result.rooms;

    const roomData = rooms[rooms.length - 1];

    console.log("Room Data: " + JSON.stringify(roomData));

    if(!result) {
        return;
    }

    const roomName = document.querySelector("#roomName");
    const roomTheme = document.querySelector("#roomTheme");
    const roomMembers = document.querySelector("#roomMembers");

    roomName.innerHTML = `Name: ${roomData.name}`;
    roomTheme.innerHTML = "Theme: ";
    switch(roomData.theme) {
        case 'default':
            roomTheme.innerHTML += 'Default';
            break;
        case 'coffee':
            roomTheme.innerHTML += 'Coffee';
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
    roomMembers.innerHTML = `Amount of Members: ${roomData.amtMembers}`;

    return;
};

// init - init function for room.handlebars
// runs when the window has loaded
const init = () => {
    getRoom();
};
window.onload = init;