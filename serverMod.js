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
            surveyActive: false,
            registeredUsers: [],
        },
        r03Cookies: {
            populated: false,
            monsterActive: false,
            usersList: [],
            talkCounter: 0,
        },
        r06Reciclaje: {
            usersList: [],
            userComponents: {},
        },
        r10Nubes: {
            machineActive: false,
            usersList: [],
        },
        r12Resolucion: {
            usersList: [],
            missionUsersList: [],
        },
    };

    global.increaseTalkCounter = function(roomId, talkLength) {
        global.roomStates[roomId].talkCounter++;
        if (global.roomStates[roomId].talkCounter > talkLength - 1) {
            global.roomStates[roomId].talkCounter = 0;
            global.roomStates[roomId].talk = false;
        }
    }

    global.resetTalk = function(roomId, talk) {
        global.roomStates[roomId].talk = false;
        global.roomStates[roomId].talkCounter = 0;
        global.roomStates[roomId].followPlayer = false;
    }

    //  _        _ _        
    // | |_ __ _| | | _____ 
    // | __/ _` | | |/ / __|
    // | || (_| | |   <\__ \
    //  \__\__,_|_|_|\_\___/
    //                     

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

    global.netiquetaTalk = [
        "¿Qué opinas de las reglas de la netiqueta?",
        "¿Se podrían mejorar?",
        "Entre las personas que estáis en la sala",
        "definid las reglas que debería tener este espacio,",
        "podéis enviarlas a",
        "educacionconectadaarquitecto@fad.com"
    ];

    //  _   _ ____   ____     
    // | \ | |  _ \ / ___|___ 
    // |  \| | |_) | |   / __|
    // | |\  |  __/| |___\__ \
    // |_| \_|_|    \____|___/
    //                       

    var recepcionistaNpc = new NPC({
        id: "recepcionista",
        nickName: "recepcionista",
        room: "r03Cookies",
        x: 30,
        y: 77,
        avatar: 1,
        colors: [2, 2, 1, 5],
        labelColor: "#1e839d",
        actionId: "Recepcionista"
    });

    var divulgadorNpc = new NPC({
        id: "divulgador",
        nickName: "divulgador",
        room: "r02Entrada",
        x: 65,
        y: 73,
        avatar: 1,
        colors: [2, 2, 1, 5],
        labelColor: "#1e839d",
        actionId: "Divulgador"
    });

    var netiquetaNpc = new NPC({
        id: "neti",
        nickName: "neti",
        room: "r13Netiqueta",
        x: 72,
        y: 77,
        avatar: 1,
        colors: [2, 2, 1, 5],
        labelColor: "#1e839d",
        actionId: "Netiqueta"
    });

    divulgadorNpc.behavior = setTimeout(function ramble() {
        var talkCounter = global.roomStates[divulgadorNpc.room].talkCounter;
        var talk = global.roomStates[divulgadorNpc.room].talk;
        var ransomwareActive = global.roomStates[divulgadorNpc.room].ransomwareActive;
        var talkList = ransomwareActive ? ransomwareTalk : divulgadorTalk;

        if (talk === true) {
            divulgadorNpc.talk(talkList[talkCounter]);
            global.increaseTalkCounter(divulgadorNpc.room, talkList.length);
            talk = global.roomStates[divulgadorNpc.room].talk;
            if (talk === false) {
                global.roomStates[divulgadorNpc.room].surveyActive = true;
                deactivateSurvey();
            }
            divulgadorNpc.behavior = setTimeout(ramble, random(2000, 3000));
        } else {
            divulgadorNpc.behavior = setTimeout(ramble, random(1000, 3000));
        }
    }, random(1000, 2000));

}

//  _ __ ___   ___  _ __ ___  ___ 
// | '__/ _ \ / _ \| '_ ` _ \/ __|
// | | | (_) | (_) | | | | | \__ \
// |_|  \___/ \___/|_| |_| |_|___/                          
//

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
        let talkValue = false;
        if (roomState.registeredUsers.includes(player.id) === false) {
            roomState.ransomwareActive = false;
            roomState.surveyActive = false;
            activateSurvey();
            talkValue = true
        }

        setTimeout(function() {
            roomState.talk = talkValue;
        }, 2000);
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
        deactivateCookieMonster();
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
        deactivateCookieMonster();
        // console.log('monstruo----------------off')
    }
}

module.exports.r06ReciclajeJoin = function(player, roomId) {
    const room12 = global.roomStates['r12Resolucion'];
    let roomState = global.roomStates[roomId];
    roomState.usersList.push(player.id);
    
    
    if (room12.missionUsersList.includes(player.id) === true) {
        showComponents(true);
    }
}

module.exports.r06ReciclajeLeave = function(player, roomId) {
    const room12 = global.roomStates['r12Resolucion'];
    let roomState = global.roomStates[roomId];
    roomState.usersList.push(player.id);

    var index = roomState.usersList.indexOf(player.id);
    if (index !== -1) {
        roomState.usersList.splice(index, 1);
    }

    let value = false;
    for (let j = 0; j < roomState.usersList.length; j++) {
        const element = roomState.usersList[j];
        if (room12.missionUsersList.includes(element) === true)
            value = true;
    }
    showComponents(value);

    if (roomState.usersList.length === 0) {
        showComponents(false);
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
    let roomState = global.roomStates[roomId];
    roomState.usersList.push(player.id);
}

module.exports.r10NubesLeave = function(player, roomId) {
    let roomState = global.roomStates[roomId];

    var index = roomState.usersList.indexOf(player.id);
    if (index !== -1) {
        roomState.usersList.splice(index, 1);
    }

    if (roomState.usersList.length === 0)
        io.sockets.emit('changeBgAnim', 'nube' );
        roomState.machineActive = false;
}

module.exports.r12ResolucionJoin = function(player, roomId) {
    let roomState = global.roomStates[roomId];
    roomState.usersList.push(player.id);
    
    
    if (roomState.missionUsersList.includes(player.id) === true) {
        let components = global.roomStates['r06Reciclaje'].userComponents[player.id];

        for (let index = 0; index < components.length; index++) {
            const element = components[index];
            setTimeout(function() {
                io.sockets.emit("thingChanged", { thingId: element, room: "r12Resolucion", property: "visible", value: true });
            }, 1000)
        }
    }
}

module.exports.r12ResolucionLeave = function(player, roomId) {
    let roomState = global.roomStates[roomId];

    var index = roomState.usersList.indexOf(player.id);
    if (index !== -1) {
        roomState.usersList.splice(index, 1);
    }

    if (roomState.missionUsersList.length === 0)
        showComponents(false)

    if (roomState.usersList.length === 0)
        showComponents2(false)
}

module.exports.r13NetiquetaJoin = function(player, roomId) {
    setTimeout(function() {
        global.gameState.NPCs['neti'].talk('¡Hola!');
    }, 5000);
}

//             _   _                 
//   __ _  ___| |_(_) ___  _ __  ___ 
//  / _` |/ __| __| |/ _ \| '_ \/ __|
// | (_| | (__| |_| | (_) | | | \__ \
//  \__,_|\___|\__|_|\___/|_| |_|___/
//        

module.exports.onCookies = function() {
    global.roomStates['r03Cookies'].monsterActive = true;
    activateCookieMonster();
    // console.log('monstruo----------------activo')
}

module.exports.onSurvey1 = function(playerId) {
    console.log('survey1----------------action');
    global.roomStates["r02Entrada"].ransomwareActive = true;
    global.roomStates["r02Entrada"].registeredUsers.push(playerId);
    global.resetTalk("r02Entrada");
    global.roomStates["r02Entrada"].talk = true;
}


module.exports.onCabinet = function(playerId,) {
    console.log('cabinet----------------action');
    this.transferPlayer(playerId, "r13Netiqueta", "r12Resolucion", 10 * 2, 86 * 2);
}

module.exports.onNpcFixit = function(playerId) {
    let roomState = global.roomStates["r12Resolucion"];
    roomState.missionUsersList.push(playerId);
    this.transferPlayer(playerId, "r12Resolucion", "r06Reciclaje", 68 * 2, 65 * 2);
}

module.exports.onRecepcionista = function(playerId) {
    console.log('recepcionista----------------action');
}

module.exports.onDivulgador = function(playerId) {
    console.log('Divulgador----------------action');
    let roomState = global.roomStates["r02Entrada"];

    if (roomState.registeredUsers.includes(playerId) === false) {
        roomState.ransomwareActive = false;
        roomState.surveyActive = false;
        activateSurvey();
    } else {
        roomState.ransomwareActive = true;
        roomState.surveyActive = true;
        deactivateSurvey();
    }

    setTimeout(function() {
        roomState.talk = true;
    }, 1000);
}

const activateSurvey = function() {
    io.sockets.emit("thingChanged", { thingId: "pantalla1", room: "r02Entrada", property: "visible", value: true });
    io.sockets.emit("thingChanged", { thingId: "pantalla2", room: "r02Entrada", property: "visible", value: false });
}

const deactivateSurvey = function() {
    io.sockets.emit("thingChanged", { thingId: "pantalla1", room: "r02Entrada", property: "visible", value: false });
    io.sockets.emit("thingChanged", { thingId: "pantalla2", room: "r02Entrada", property: "visible", value: true });
}

const activateCookieMonster = function() {
    io.sockets.emit("thingChanged", { thingId: "cookieMonsterA", room: "r03Cookies", property: "visible", value: false });
    io.sockets.emit("thingChanged", { thingId: "cookieMonsterB", room: "r03Cookies", property: "visible", value: true });
}

const deactivateCookieMonster = function() {
    io.sockets.emit("thingChanged", { thingId: "cookieMonsterA", room: "r03Cookies", property: "visible", value: true });
    io.sockets.emit("thingChanged", { thingId: "cookieMonsterB", room: "r03Cookies", property: "visible", value: false });
}

const showComponents = function(value) {
    io.sockets.emit("thingChanged", { thingId: "monitor", room: "r06Reciclaje", property: "visible", value: value });
    io.sockets.emit("thingChanged", { thingId: "placa", room: "r06Reciclaje", property: "visible", value: value });
    io.sockets.emit("thingChanged", { thingId: "teclado", room: "r06Reciclaje", property: "visible", value: value });
    io.sockets.emit("thingChanged", { thingId: "mouse", room: "r06Reciclaje", property: "visible", value: value });
}

const showComponents2 = function(value) {
    io.sockets.emit("thingChanged", { thingId: "monitor", room: "r12Resolucion", property: "visible", value: value });
    io.sockets.emit("thingChanged", { thingId: "placa", room: "r12Resolucion", property: "visible", value: value });
    io.sockets.emit("thingChanged", { thingId: "teclado", room: "r12Resolucion", property: "visible", value: value });
    io.sockets.emit("thingChanged", { thingId: "mouse", room: "r12Resolucion", property: "visible", value: value });
}

module.exports.startCloudAnimation = function () {
    // emit to all clients
    io.sockets.emit('changeBgAnim', 'transformacion' );
}

module.exports.onMonitor = function(playerId) {
    io.sockets.emit("thingChanged", { thingId: "monitor", room: "r06Reciclaje", property: "visible", value: false });
    if (!global.roomStates["r06Reciclaje"].userComponents[playerId])
        global.roomStates["r06Reciclaje"].userComponents[playerId] = [];
    global.roomStates["r06Reciclaje"].userComponents[playerId].push('monitor');
}


module.exports.onPlaca = function(playerId) {
    io.sockets.emit("thingChanged", { thingId: "placa", room: "r06Reciclaje", property: "visible", value: false });
    if (!global.roomStates["r06Reciclaje"].userComponents[playerId])
        global.roomStates["r06Reciclaje"].userComponents[playerId] = [];
    global.roomStates["r06Reciclaje"].userComponents[playerId].push('placa');
}

module.exports.onTeclado = function(playerId) {
    io.sockets.emit("thingChanged", { thingId: "teclado", room: "r06Reciclaje", property: "visible", value: false });
    if (!global.roomStates["r06Reciclaje"].userComponents[playerId])
        global.roomStates["r06Reciclaje"].userComponents[playerId] = [];
    global.roomStates["r06Reciclaje"].userComponents[playerId].push('teclado');
}

module.exports.onMouse = function(playerId) {
    io.sockets.emit("thingChanged", { thingId: "mouse", room: "r06Reciclaje", property: "visible", value: false });
    if (!global.roomStates["r06Reciclaje"].userComponents[playerId])
        global.roomStates["r06Reciclaje"].userComponents[playerId] = [];
    global.roomStates["r06Reciclaje"].userComponents[playerId].push('mouse');
}

module.exports.onComponents = function(playerId) {
    const room12 = global.roomStates['r12Resolucion'];
    let command;
    if (room12.missionUsersList.includes(playerId) === true) {
        let components = global.roomStates["r06Reciclaje"].userComponents[playerId];
        if (components.length > 3) {
            command = { cmd: "text", txt: "Aquí está la guia de montaje", iframe: true, url: "https://www.opirata.com/blog/montar-un-ordenador-paso-a-paso/", actionId: "RemoveComponents", postAction: true };
        } else {
            command = { cmd: "text", txt: "Me faltan " + (4 - components.length) + "componentes para montar el ordenador", lines: 2};
        }
    
    } else {
        command = { cmd: "text", txt: "No se que hace eso ahí", lines: 1};
    }
    io.to(playerId).emit("executeCommand", command);    
}

module.exports.onRemoveComponents = function(playerId) {
    let roomState = global.roomStates['r12Resolucion'];
    
    var index = roomState.missionUsersList.indexOf(playerId);
    if (index !== -1) {
        roomState.missionUsersList.splice(index, 1);
    }

    // TODO execute this only if no mission players in the room
    showComponents2(false);

    let components = global.roomStates["r06Reciclaje"].userComponents;
    delete components[playerId];
    
}

module.exports.onNube = function(playerId) {
    let roomState = global.roomStates['r10Nubes'];
    if (roomState.machineActive === false) {
        setTimeout(function() {
            io.sockets.emit('changeBgAnim', 'transformacion' );
            setTimeout(function() {
                io.sockets.emit('changeBgAnim', 'cables' );
            }, 3000);
        }, 1000);
    }
}