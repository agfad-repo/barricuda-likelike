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
    global.lightState = [0, 0, 0, 0];

    global.beat = 1;

    //global function ffs
    global.random = function (min, max) {
        return Math.random() * (max - min) + min;
    }

    global.roomStates = {
        r02Entrada: {
            populated: false,
            ransomwareActive: false,
            usersList: [],
            talkCounter: 0,
            surveyActive: false
        },
        r03Cookies: {
            populated: false,
            monsterActive: false,
            usersList: [],
            talkCounter: 0,
        }
    };

    global.recepcionistaTalk = [
        "¡Qué bien que estás aquí!",
        "Toma unas galletas de bienvenida",
    ];

    global.divulgadorTalk = [
        "¡Hola! ¿Eres un robot? ¿No?",
        "Bueno, mejor para estar seguros",
        "¿por qué no respondes unas preguntas?",
        "Puedo decirte en base a tus respuestas",
        "qué ser digital eres."
    ];

    global.ransomwareTalk = [
        "¡Oh, no!",
        "Un ransomware ha encriptado el acceso",
        "a la información de tus resultados,",
        "para acceder necesitarás",
        "encontrar el código.",
        "Explora las salas,",
        "hay fragmentos del código",
        "por todos lados,",
        "toma papel y boli y anótalos,",
        "cuando hayas dado con la clave final,",
        "encuentra el ordenador que está",
        "en la biblioteca e introdúcelo.",
        "Empieza a explorar por la puerta",
        "que define correctamente",
        "qué es el ransomware."
    ];

    var recepcionistaNpc = new NPC({
        id: "recepcionista",
        nickName: "recepcionista",
        room: "r03Cookies",
        x: 28,
        y: 90,
        avatar: 1,
        colors: [2, 2, 1, 5],
        labelColor: "#1e839d"
    });

    var divulgadorNpc = new NPC({
        id: "divulgador",
        nickName: "divulgador",
        room: "r02Entrada",
        x: 64,
        y: 81,
        avatar: 1,
        colors: [2, 2, 1, 5],
        labelColor: "#1e839d"
    });

    global.increaseTalkCounter = function(roomId, talkLength) {
        global.roomStates[roomId].talkCounter++;
        if (global.roomStates[roomId].talkCounter > talkLength - 1) {
            global.roomStates[roomId].talkCounter = 0;
            global.roomStates[roomId].talk = false;
        }
    }

    global.resetTalk = function(roomId) {
        global.roomStates[roomId].talk = false;
        global.roomStates[roomId].talkCounter = 0;
        global.roomStates[roomId].followPlayer = false;
    }

    divulgadorNpc.behavior = setTimeout(function ramble() {
        var talkCounter = global.roomStates[divulgadorNpc.room].talkCounter;
        var talk = global.roomStates[divulgadorNpc.room].talk;
        var ransomwareActive = global.roomStates[divulgadorNpc.room].ransomwareActive;
        var talkList = ransomwareActive ? ransomwareTalk : divulgadorTalk;

        if (talk === true) {
            divulgadorNpc.talk(talkList[talkCounter]);
            global.increaseTalkCounter(divulgadorNpc.room, talkList.length);
            if (talk === false) {
                global.roomStates[divulgadorNpc.room].surveyActive = true;

            }
            divulgadorNpc.behavior = setTimeout(ramble, random(2000, 3000));
        } else {
            divulgadorNpc.behavior = setTimeout(ramble, random(1000, 3000));
        }
    }, random(1000, 2000));

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

module.exports.r02EntradaJoin = function(player, roomId) {
    let roomState = global.roomStates[roomId];
    roomState.usersList.push(player.id);

    if (roomState.usersList.length === 1) {
        global.resetTalk(roomId);
    }

    setTimeout(function() {
        roomState.talk = true;
    }, 1000)
}

module.exports.r02EntradaLeave = function(player, roomId) {
    let roomState = global.roomStates[roomId];
    var index = roomState.usersList.indexOf(player.id);
    if (index !== -1) {
        roomState.usersList.splice(index, 1);
    }

    if (roomState.usersList.length === 0) {
        global.roomStates['r03Cookies'].monsterActive = false;
        console.log('monstruo----------------off')
    }
}

module.exports.r03CookiesJoin = function(player, roomId) {
    global.roomStates[roomId].usersList.push(player.id);

    setTimeout(function() {
        global.gameState.NPCs['recepcionista'].talk('¡Qué bien que estás aquí!');
        setTimeout(function() {
            global.gameState.NPCs['recepcionista'].talk('Toma unas galletas de bienvenida');
        }, 1000)
    }, 1000)
}

module.exports.r03CookiesLeave = function(player, roomId) {
    var index = global.roomStates[roomId].usersList.indexOf(player.id);
    if (index !== -1) {
        global.roomStates[roomId].usersList.splice(index, 1);
    }

    if (global.roomStates[roomId].usersList.length === 0) {
        global.roomStates['r03Cookies'].monsterActive = false;
        console.log('monstruo----------------off')
    }
}

module.exports.r08HuellaJoin = function(player, roomId) {
    // io.emit('musicExit');
    // io.emit('musicOn', 1);
}

module.exports.r09FakeNewsJoin = function(player, roomId) {
    // console.log("MOD: " + player.nickName + " entered room " + roomId);
    // io.emit('musicExit');
    // io.emit('musicOn', 2);
}

module.exports.r10NubesJoin = function(player, roomId) {
    // console.log("MOD: " + player.nickName + " entered room " + roomId);
    // io.emit('musicExit');
    // io.emit('musicOn', 3);
}

module.exports.onCookies = function(playerId, roomId) {
    global.roomStates['r03Cookies'].monsterActive = true;
    console.log('monstruo----------------activo')
}

module.exports.onSurvey1 = function(playerId) {
    console.log('survey1----------------action');
    global.roomStates["r02Entrada"].ransomwareActive = true;
    global.resetTalk("r02Entrada");
    global.roomStates["r02Entrada"].talk = true;
}


module.exports.onCabinet = function(playerId, roomId) {
    console.log('cabinet----------------action');
    this.transferPlayer(playerId, "r13Netiqueta", "r12Resolucion", 10 * 2, 86 * 2);
}

module.exports.onNpcFixit = function(playerId, roomId) {
    console.log('npcFixit----------------action');
    this.transferPlayer(playerId, "r12Resolucion", "r06Reciclaje", 68 * 2, 65 * 2);
}
