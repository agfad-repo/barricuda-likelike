/*
WARNING: THIS IS STILL EXPERIMENTAL STUFF
I want to have the ability to assign specific behaviors to each room without messing with the main engine
So I'm creating a module for server-side modifications (mods). There is one also for the client.
Their naming convention is roomIdFunction.
The functions are called by the engine at crucial points, only if they exist.
*/

//called at the beginning
module.exports.initMod = function (io, gameState, DATA) {
    console.silentLog("MOD: Initialized");

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
        r11Lago: {
            phishingList: [],
        },
        r12Resolucion: {
            usersList: [],
            missionUsersList: [],
        },
        r13Netiqueta: {
            talkCounter: 0,
            talk: false,
            usersList: [],
        },
        r16Colabora: {
            talkCounter: 0,
            talk: false,
            usersList: [],
        },
        r17SalaCrypto: {
            usersList: [],
        }
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
        "educacionconectada@fad.com"
    ];

    global.colaboraTalk = [
        "Hola,",
        "esta es una sala para",
        "más de una persona,",
        "al menos dos son necesarias",
        "para participar",
        "¡invita a alguien o busca gente",
        "en las otras salas!"
    ];

    global.phishingTalk = [
        "YO soy el auténtico NAME",
        "ese otro NAME es un impostor",
        "Mi plato favorito son acelgas con nocilla",
        "me gustan las croquetas frías",
        "Me gusta jugar al parchís con los pies",
        "me gustan las croquetas frías",
        "me aburro",
        "me aburroo",
        "me aburrooo",
        "me aburroooo",
    ]

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
        avatar: 'robot',
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
        avatar: 'robot',
        colors: [2, 2, 1, 5],
        labelColor: "#1e839d",
        actionId: "Divulgador"
    });

    var netiquetaNpc = new NPC({
        id: "neti",
        nickName: "Neti",
        room: "r13Netiqueta",
        x: 72,
        y: 77,
        avatar: 'robot',
        colors: [2, 2, 1, 5],
        labelColor: "#1e839d",
        actionId: "Netiqueta"
    });

    var colaboraNpc = new NPC({
        id: "colabora",
        nickName: "Colabora",
        room: "r16Colabora",
        x: 64,
        y: 75,
        avatar: 'robot',
        colors: [2, 2, 1, 5],
        labelColor: "#1e839d",
        actionId: "Colabora"
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

    netiquetaNpc.behavior = setTimeout(function ramble() {
        var talkCounter = global.roomStates[netiquetaNpc.room].talkCounter;
        var talkList = netiquetaTalk;
        var talk = global.roomStates[netiquetaNpc.room].talk;

        if (talk === true) {
            netiquetaNpc.talk(talkList[talkCounter]);
            global.increaseTalkCounter(netiquetaNpc.room, talkList.length);
            talk = global.roomStates[netiquetaNpc.room].talk;
            netiquetaNpc.behavior = setTimeout(ramble, random(2000, 3000));
        } else {
            netiquetaNpc.behavior = setTimeout(ramble, random(1000, 3000));
        }
    }, random(1000, 2000));

    colaboraNpc.behavior = setTimeout(function ramble() {
        var talkCounter = global.roomStates[colaboraNpc.room].talkCounter;
        var talkList = colaboraTalk;
        var talk = global.roomStates[colaboraNpc.room].talk;

        if (talk === true) {
            colaboraNpc.talk(talkList[talkCounter]);
            global.increaseTalkCounter(colaboraNpc.room, talkList.length);
            talk = global.roomStates[colaboraNpc.room].talk;
            colaboraNpc.behavior = setTimeout(ramble, random(2000, 3000));
        } else {
            colaboraNpc.behavior = setTimeout(ramble, random(1000, 3000));
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
    console.silentLog(playerId + " is transfered to " + to);

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
            if (this["anyRoomLeave"] != null) {
                //call it!
                this["anyRoomLeave"](p, from);
            }
            if (this[from + "Leave"] != null) {
                //call it!
                this[from + "Leave"](p, from);
            }

            io.to(to).emit("playerJoined", p);


            //check if there is a custom function in the MOD to call at this point
            if (this["anyRoomJoin"] != null) {
                //call it!
                this["anyRoomJoin"](p, to);
            }
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

module.exports.anyRoomJoin = function(player, roomId) {
    if (global.roomStates["r11Lago"].phishingList.includes(player.id) === true) {
        generateFakePlayer(player, roomId);
    }

    // music
    switch (roomId) {
        case 'r02Entrada':
            io.to(player.id).emit('loopMusic', 'hall');
            break;
        case 'r06Reciclaje':
            io.to(player.id).emit('loopMusic', 'vertedero');
            break;
        case 'r11Lago':
            io.to(player.id).emit('loopMusic', 'phishing');
            break;
        case 'r13Netiqueta':
            io.to(player.id).emit('loopMusic', 'error');
            break;
        case 'r12Resolucion':
            io.to(player.id).emit('loopMusic', 'error');
            break;
        case 'r18Biblioteca':
            io.to(player.id).emit('loopMusic', 'biblioteca');
            break;
        default:
            io.to(player.id).emit('loopMusic', 'intro');
            break;
    }
}

module.exports.anyRoomLeave = function(player, roomId) {
    if (global.roomStates["r11Lago"].phishingList.includes(player.id) === true) {
        destroyFakePlayer(player, roomId);
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
        // console.silentLog('monstruo----------------off')
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
    // console.silentLog("MOD: " + player.nickName + " entered room " + roomId);
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
    let roomState = global.roomStates[roomId];
    roomState.usersList.push(player.id);

    setTimeout(function() {
        roomState.talk = true;
    }, 1000)
}

module.exports.r13NetiquetaLeave = function(player, roomId) {
    let roomState = global.roomStates[roomId];
    var index = roomState.usersList.indexOf(player.id);
    if (index !== -1) {
        roomState.usersList.splice(index, 1);
    }

    if (roomState.usersList.length === 0) {
        roomState.talkCounter = 0;
        roomState.talk = false;
    }
}

module.exports.r14CreacionJoin = function(player, roomId) {
    io.to(player.id).emit('godMessage', "¡Qué emoción que hayas llegado hasta aquí! Esta es una sala en la que puedes aprender a crear un montón de cosas.\n \n Explora libremente, crea y...\n \n creo que alguien dejó una nota para ti por algún lado, pero la perdí, búscala.");
}

module.exports.r16ColaboraJoin = function(player, roomId) {
    let roomState = global.roomStates[roomId];
    roomState.usersList.push(player.id);

    if (roomState.usersList.length === 1)
        roomState.talkCounter = 0;

    setTimeout(function() {
        roomState.talk = true;
    }, 1000)
}

module.exports.r16ColaboraLeave = function(player, roomId) {
    let roomState = global.roomStates[roomId];
    var index = roomState.usersList.indexOf(player.id);
    if (index !== -1) {
        roomState.usersList.splice(index, 1);
    }

    if (roomState.usersList.length === 0) {
        roomState.talkCounter = 0;
        roomState.talk = false;
    }
}

module.exports.r17SalaCryptoJoin = function(player, roomId) {
    let roomState = global.roomStates[roomId];
    roomState.usersList.push(player.id);

    io.to(player.id).emit('godMessage', "en esta sala se encriptarán todos tus mensajes");
}

module.exports.r17SalaCryptoTalkFilter = function (player, message) {

    function dec2bin(dec) {
        return (dec >>> 0).toString(2);
    }
    let newMessage = "";
    message.split(" ").forEach((element) => {
        if (isNaN(element) === false)
            newMessage += dec2bin(element) + " ";
        else {
            newMessage += element.replace(/[aeiou]/ig, 'i') + " ";
        }
    })
    return newMessage;
}

module.exports.r17SalaCryptoLeave = function(player, roomId) {
    let roomState = global.roomStates[roomId];
    var index = roomState.usersList.indexOf(player.id);
    if (index !== -1) {
        roomState.usersList.splice(index, 1);
    }

    if (roomState.usersList.length === 0) {
        roomState.talkCounter = 0;
        roomState.talk = false;
    }
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
    // console.silentLog('monstruo----------------activo')
}

module.exports.onSurvey1 = function(playerId) {
    global.roomStates["r02Entrada"].ransomwareActive = true;
    global.roomStates["r02Entrada"].registeredUsers.push(playerId);
    global.resetTalk("r02Entrada");
    global.roomStates["r02Entrada"].talk = true;
}

module.exports.onSurvey2 = function(playerId) {
    io.to(playerId).emit('godMessage', "¡Gracias por participar!");
    this.transferPlayer(playerId, "r18Biblioteca", "r01Patio", 64 * 2, 86 * 2);
}


module.exports.onCabinet = function(playerId,) {
    console.silentLog('cabinet----------------action');
    this.transferPlayer(playerId, "r13Netiqueta", "r12Resolucion", 10 * 2, 86 * 2);
}

module.exports.onNpcFixit = function(playerId) {
    let roomState = global.roomStates["r12Resolucion"];
    roomState.missionUsersList.push(playerId);
    this.transferPlayer(playerId, "r12Resolucion", "r06Reciclaje", 68 * 2, 65 * 2);
}

module.exports.onRecepcionista = function(playerId) {
    console.silentLog('recepcionista----------------action');
}

module.exports.onDivulgador = function(playerId) {
    console.silentLog('Divulgador----------------action');
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

module.exports.onNetiqueta = function(playerId) {
    let roomState = global.roomStates["r13Netiqueta"];
    roomState.talk = true;
}

module.exports.onColabora = function(playerId) {
    let roomState = global.roomStates["r13Netiqueta"];
    roomState.talk = true;
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

module.exports.onPhishingDialogEnd = function(playerId) {
    io.to(playerId).emit('godMessage', "Ten cuidado, dar datos a desconocidos puede traer problemas, incluso que te suplanten la personalidad");
}

module.exports.onPhishing = function(playerId) {
    let roomState = global.roomStates['r11Lago'];
    io.to(playerId).emit("showPhishing", 0);  
}

module.exports.onPlayerPhishing = function(playerId) {
    let roomState = global.roomStates["r11Lago"];
    if (roomState.phishingList.includes(playerId) === false) {
        roomState.phishingList.push(playerId);
        console.silentLog("PLAYER PHISHING:  CREAR NPCs");
        let player = global.gameState.players[playerId];
        let phishingNPC = generateFakePlayer(player, player.room);

        for (var playerId in global.gameState.players) {
            if (global.gameState.players[playerId].room === player.room) {
                console.silentLog('send intro to: ' + playerId);
                phishingNPC.sendIntroTo(playerId);
            }
        }
    }
}

const generateFakePlayer = function(player, roomId) {
    let spawn = DATA.ROOMS[roomId].spawn;
    var phishingNPC = new NPC({
        id: "_" + player.nickName,
        nickName: "_" + player.nickName,
        room: roomId,
        x: random(spawn[0], spawn[2]),
        y: random(spawn[1], spawn[3]),
        avatar: player.avatar,
        colors: player.colors,
        labelColor: "#f00",
        actionId: "FakePlayer"
    });

    phishingNPC.behavior = setTimeout(function ramble() {
        var dice = random(0, 100);

        if (dice < 40) {
            let msg = global.phishingTalk[Math.floor(random(0, global.phishingTalk.length - 1))];
            msg = msg.replace("NAME", player.nickName);
            phishingNPC.talk(msg);
            phishingNPC.move(random(17, 113) * 2, random(76, 98) * 2);
            phishingNPC.behavior = setTimeout(ramble, random(1000, 3000));
        }
        else if (dice < 60) {
            phishingNPC.move(random(17, 113) * 2, random(76, 98) * 2);
            phishingNPC.behavior = setTimeout(ramble, random(1000, 3000));
        }
        else {
            phishingNPC.behavior = setTimeout(ramble, random(1000, 3000));
        }


    }, random(1000, 2000));

    return phishingNPC;
}

const destroyFakePlayer = function(player) {
    for (var NPCId in global.gameState.NPCs) {
        var npc = global.gameState.NPCs[NPCId];

        if (npc.id === "_" + player.nickName) {
            //to kill the bot
            clearTimeout(npc.behavior);
            npc.delete();
        }
    }
}

module.exports.onFakePlayer = function(playerId) {
    let msg = global.phishingTalk[Math.floor(random(0, global.phishingTalk.length - 1))];
    let player = global.gameState.players[playerId];
    msg = msg.replace("NAME", player.nickName);
    if (global.gameState.NPCs['_'+player.nickName]) {
        global.gameState.NPCs['_'+player.nickName].talk(msg);
    }
}

module.exports.onDenunciarPhishing = function(playerId) {
    let roomState = global.roomStates["r11Lago"];
    var index = roomState.phishingList.indexOf(playerId);
    if (index !== -1) {
        roomState.phishingList.splice(index, 1);

        io.to(playerId).emit('showPhishingDestroy');
    }
}

module.exports.onDestroyFakePlayer = function(playerId) {
    let player = global.gameState.players[playerId];
    destroyFakePlayer(player);
}

module.exports.onCrypto = function(playerId) {
    let roomState = global.roomStates["r17SalaCrypto"];
    if (roomState.usersList.length === 0) {
        this.transferPlayer(playerId, "r15Pasillo", "r17SalaCrypto", 22 * 2, 87 * 2);
    } else {
        io.to(playerId).emit('godMessage', "lo siento, está ocupado. A la sala de criptografía se entra de 1 en 1. Espera un poco");
    }
}

module.exports.onAccess = function(playerId) {
    io.to(playerId).emit("showAccess", 0);  
}

module.exports.onAccessSuccess = function(playerId) {
    io.to(playerId).emit('godMessage', "Oh ¿lo has logrado? genial, pero seguro has aprendido mucho en el camino y tu perfil digital ha cambiado, ahora que ya tenemos el acceso a tus resultados ¿por qué no vuelves a hacer el test?");
    io.to(playerId).emit('showFinalPool');    
}

module.exports.onAccessFailed = function(playerId) {
    io.to(playerId).emit('godMessage', "No es correcto, revisa tus pistas");
}