const helper = require('./helper.js');
const React = require('react');
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');

// RoomList - loads rooms from the server and saves them in an array
// if the array is empty, returns a div indicating there's no rooms
// otherwise, roomNodes maps all the contents of the array to individual divs for each room
// returns a div containing roomNodes to be rendered
const RoomList = (props) => {
    const [rooms, setRooms] = useState(props.rooms);

    useEffect(() => {
        const loadRoomsFromServer = async () => {
            const response = await fetch('/getRoom');
            const data = await response.json();
            setRooms(data.rooms);
        };
        loadRoomsFromServer();
    }, [props.reloadRooms]);

    if(rooms.length === 0) {
        return (
            <div className="roomList">
                <h3 className="emptyRoom">No Rooms Yet!</h3>
                <h4 className="suggestion">(Maybe Make One)</h4>
            </div>
        );
    }

    const roomNodes = rooms.map(room => {
        return (
            <div key={room._id} className="room">
                <h1 className="roomTitle">
                    <a id={room._id} 
                    href="" 
                    className="roomLink" 
                    onClick={(e) => viewRoom(e)}>
                        {room.name}
                    </a>
                </h1>
                <h3 className="roomTheme">Theme: {room.theme}</h3>
            </div>
        );
    });

    return (
        <div className="roomList">
            {roomNodes}
        </div>
    );
};

// Content - returns a RoomList to be rendered
const Content = () => {
    const [reloadRooms, setReloadRooms] = useState(false);

    return (
        <RoomList rooms={[]} reloadRooms={reloadRooms} />
    );
};

// init function - creates a root in the content section 
// and renders Content within the root
// is called when the window loads
const init = () => {
    const contentRoot = createRoot(document.getElementById('content'));
    contentRoot.render( <Content /> );
};
window.onload = init;