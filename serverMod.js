/*
WARNING: THIS IS STILL EXPERIMENTAL STUFF
I want to have the ability to assign specific behaviors to each room without messing with the main engine
So I'm creating a module for server-side modifications (mods). There is one also for the client.
Their naming convention is roomIdFunction.
The functions are called by the engine at crucial points, only if they exist.
*/

//called at the beginning
module.exports.initMod = function (io, gameState, DATA) {
    console.log("MOD: Initialized");

    //EVERYTHING GLOBALLLLL
    global.gameState = gameState;
    global.io = io;
    global.DATA = DATA;

    // lightState on and off 
    // projector, hall ,class, cave
    global.lightState = [0, 0, 0, 0]

    //global function ffs
    global.random = function (min, max) {
        return Math.random() * (max - min) + min;
    }

    // this turns on and off the projector every minute
    setInterval(function () {
        global.lightState[0] =  global.lightState[0] === 1 ? 0 : 1;
        // emit change to all clients
        io.sockets.emit('changeBgAnim', 'bg' + global.lightState.join(""))
    }, 60 * 1000); //every minute changes

    global.VIPList = [];

}

// the cave uses the VIPRoom rules in original likelike
module.exports.caveJoin = function (playerObject, roomId) {
    // console.log(playerObject.nickName + " enters the VIP room");
    //...
    this.setLightState();
    
    global.VIPList.push(playerObject.id);
    if (global.VIPList.length > 2) {
        var expelled = global.VIPList.shift();

        //force leave
        if (io.sockets.sockets[expelled] != null) {
            this.transferPlayer(expelled, "cave", "hall", 34 * 2, 70 * 2);
            io.to(expelled).emit('godMessage', "Sorry, we had to expel you to make room for " + playerObject.nickName);
        }

    }

}

// the cave uses the VIPRoom rules in original likelike
module.exports.caveIntro = function (newComerId, introObj) {
    //the problem with the auto expulsion in cave is that the intro is sent before it's the other person is expelled
    //so the intros arrive too late creating ghosts.
    //since the server has the real list I can override the intro after the fact and expel the ghost. Ugly but necessary.

    // console.log("Obsolete intro? " + gameState.players[introObj.id].room);

    this.setLightState();

    if (gameState.players[introObj.id].room != "Cave")
        io.to("Cave").emit("playerLeft", { id: introObj.id, room: "Cave", disconnect: false });

}

//force change room
module.exports.transferPlayer = function (playerId, from, to, x, y) {
    console.log(playerId + " is transfered to " + to);

    var s = io.sockets.sockets[playerId];
    var p = gameState.players[playerId];

    if (s != null)
        if (p.room != null) {

            //var from = p.room;
            s.leave(from);
            s.join(to);

            //broadcast the change to everybody in the current room
            //from the client perspective leaving the room is the same as disconnecting
            io.to(from).emit("playerLeft", { id: playerId, room: from, disconnect: false });

            //same for joining, sending everybody in the room the player state

            p.room = to;
            p.x = p.destinationX = x;
            p.y = p.destinationY = y;
            p.new = false;


            //check if there is a custom function in the MOD to call at this point
            if (this[from + "Leave"] != null) {
                //call it!
                this[from + "Leave"](p, from);
            }

            io.to(to).emit("playerJoined", p);


            //check if there is a custom function in the MOD to call at this point
            if (this[to + "Join"] != null) {
                //call it!
                this[to + "Join"](p, to);
            }

            //check if there are NPCs in this room and make them send info to the player
            for (var NPCId in gameState.NPCs) {
                var npc = gameState.NPCs[NPCId];

                if (npc.room == to) {
                    npc.sendIntroTo(playerId);
                }
            }

        }
}

//if a player leaves the room on their own accord make sure they are removed from the list as well
module.exports.caveLeave = function (playerObject, roomId) {
    //console.log(playerObject.nickName + " exits the VIP room");

    var index = global.VIPList.indexOf(playerObject.id);
    if (index !== -1) {
        global.VIPList.splice(index, 1);
    }

}


module.exports.hallJoin = function(player, roomId) {
    // console.log("MOD: " + player.nickName + " entered room " + roomId);
    this.setLightState();
}


module.exports.classroomJoin = function(player, roomId) {
    // console.log("MOD: " + player.nickName + " entered room " + roomId);
    this.setLightState();
}


// LIGHTS

module.exports.onHallLight = function (pId) {
    // console.log('switch hall');
    global.lightState[1] = global.lightState[1] ? 0 : 1 
    this.setLightState();
}

module.exports.onClassroomLight = function (pId) {
    // console.log('switch classroom');
    global.lightState[2] = global.lightState[2] ? 0 : 1 
    this.setLightState();
}

module.exports.onCaveLight = function (pId) {
    // console.log('switch cave');
    global.lightState[3] = global.lightState[3] ? 0 : 1 
    this.setLightState();
}


//
module.exports.setLightState = function (pId) {
    // emit to all clients
    io.sockets.emit('changeBgAnim', 'bg' + global.lightState.join(""));
}


