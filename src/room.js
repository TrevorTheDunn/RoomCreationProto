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

    console.log(JSON.stringify(result));

    const rooms = result.rooms;
    console.log(JSON.stringify(rooms));

    if(!result) {
        return;
    }

    const roomName = document.querySelector("#roomName");
    const roomTheme = document.querySelector("#roomTheme");
    const roomMembers = document.querySelector("#roomMembers");

    const index = rooms.length - 1;

    roomName.innerHTML = `Name: ${rooms[index].name}`;
    roomTheme.innerHTML = "Theme: ";
    switch(rooms[index].theme) {
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
    roomMembers.innerHTML = `Amount of Members: ${rooms[index].amtMembers}`;

    return;
};

// init - init function for room.handlebars
// runs when the window has loaded
const init = () => {
    getRoom();
};
window.onload = init;