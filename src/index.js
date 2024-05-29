const createRoom = async (e) => {
    e.preventDefault();
    console.log("Called!");

    const name = document.querySelector("#roomName").value;
    const theme = document.querySelector("#roomTheme").value;
    const members = document.querySelector("#roomMembers").value;

    console.log("Name: " + name);
    console.log("Theme: " + theme);
    console.log("Members: " + members);
};

const init = () => {
    const button = document.querySelector("#roomSubmit");

    button.onclick = (e) => {
        createRoom(e);
    };
};
window.onload = init;