/*
WARNING: THIS IS STILL EXPERIMENTAL STUFF
I want to have the ability to assign specific behaviors to each room without messing with the main engine
So this is a file for client-side modifications (mods). There is one for the server side as well.
Their naming convention is roomIdFunction.
The functions are called by the engine at crucial points, only if they exist. 
*/

//when my players joins the game for the first time, after everything in the room is initialized
//called also for lurk mode (nickName == "")

// BARRICUDA functions

const phishingTalk = [
    "¿que comida te gusta?",
    "¿que quieres estudiar?",
    "¿como te llamas?",
];

function initMod(playerId, roomId) {
    silentPrint("Mod: " + players[playerId].nickName + " (you) joined the game at " + roomId);

    // add custom client listeners HERE

    //prevent duplicate listeners
    if (!socket.hasListeners('showPhishing')) {
        socket.on("showPhishing", function (msg) {
            showPhishingQuestion(msg);
        });

        socket.on("showAccess", function () {
            showAccessQuestion();
        });

        socket.on("showPhishingDestroy", function () {
            function sendCommand(event) {
                socket.emit("action", "DestroyFakePlayer");

                document.getElementById('defaultCanvas0').removeEventListener('click', sendCommand)
            }

            document.getElementById('defaultCanvas0').addEventListener('click', sendCommand);
        });
        
        socket.on("showFinalPool", function () {
            function sendCommand(event) {
                let command = { cmd: "text", txt: "Encuesta de 10 preguntas", lines: 2, pool: "pool2", section: "pool-section", label: "encuesta", point: [65, 95], obstacle: false };
                executeCommand(command);
                document.getElementById('defaultCanvas0').removeEventListener('click', sendCommand)
            }

            document.getElementById('defaultCanvas0').addEventListener('click', sendCommand);
        });

        socket.on("loopMusic", function (music) {
            loopMusic(music);
        });
    }
}

function afterPool(data) {
    socket.emit("action", "Survey1");
}

function addPoint(type, personalidad) {
    if (personalidad[type]) {
        personalidad[type] = personalidad[type] + 1;
    } else {
        personalidad[type] = 1;
    }
}

function afterPool2(data) {
    let personalidad = {};

    for (let index = 0; index < data.length; index++) {
        const answer = data[index];
        const question = questions['question' + (index + 1)];
        if (question.solve) {
            switch (question.solve) {
                case 'basic':
                    if (answer.constructor.name === 'Array') {
                        answer.forEach((result) => {
                            let op = result.split('option')[1];
                            option = question.options[op - 1];
                            if (option.result.constructor.name === 'Array') {
                                for (let j = 0; j < option.result.length; j++) {
                                    const element = option.result[j];
                                    addPoint(element, personalidad);
                                }
                            } else {
                                addPoint(option.result, personalidad);
                            }
                        });
                    }    
                    break;
            
                default:
                    break;
            }
        }
    }

    let v = 0;
    let value = "";

    for (let index = 0; index < Object.keys(personalidad).length; index++) {
        const p = Object.keys(personalidad)[index]
        Object.keys(personalidad)[index];
        if (personalidad[p] > v) {
            v = personalidad[p];
            value = p;
        }
    }

    let command;

    switch (value) {
        case "alfabeto":
            command = { cmd: "text", txt: "Tu perfil es alfabeto", lines: 1, iframe: true, url:"./pages/perfilesFAD/alfabeto.html", postAction: true, actionId: "Survey2" };
            break;
        case "comunicador":
            command = { cmd: "text", txt: "Tu perfil es comunicador", lines: 1, iframe: true, url:"./pages/perfilesFAD/comunicadora.html", postAction: true, actionId: "Survey2" };
            break;
        case "creador":
            command = { cmd: "text", txt: "Tu perfil es creador", lines: 1, iframe: true, url:"./pages/perfilesFAD/creadora.html", postAction: true, actionId: "Survey2" };
            break;
        case "experta":
            command = { cmd: "text", txt: "Tu perfil es experta", lines: 1, iframe: true, url:"./pages/perfilesFAD/experta.html", postAction: true, actionId: "Survey2" };
            break;
        case "integrador":
            command = { cmd: "text", txt: "Tu perfil es integrador", lines: 1, iframe: true, url:"./pages/perfilesFAD/integradora.html", postAction: true, actionId: "Survey2" };
            break;
        case "principiante":
            command = { cmd: "text", txt: "Tu perfil es principiante", lines: 1, iframe: true, url:"./pages/perfilesFAD/principiante.html", postAction: true, actionId: "Survey2" };
            break;
        case "resolucion":
            command = { cmd: "text", txt: "Tu perfil es resolucion", lines: 1, iframe: true, url:"./pages/perfilesFAD/resolucion.html", postAction: true, actionId: "Survey2" };
            break;
        case "seguridad":
            command = { cmd: "text", txt: "Tu perfil es seguridad", lines: 1, iframe: true, url:" ./pages/perfilesFAD/resolucion.html", postAction: true, actionId: "Survey2" };
            break;
        default:
            break;
    }
    executeCommand(command);
}

const questions = {
    question1: {
        type: 'radio',
        text: 'Género:',
        options: [
            {
                label: 'Mujer.',
            },
            {
                label: 'Hombre.',
            },
            {
                label: 'Otro.',
            },
        ]
    },
    question2: {
        type: 'checkbox',
        text: '¿Qué imágenes te definen más?',
        images: true,
        solve: 'basic',
        options: [
            {
                label: '1',
                image: 'assets/form-imgs/1/1.jpg',
                result: 'creador',
            },
            {
                label: '2',
                image: 'assets/form-imgs/1/2.jpg',
                result: 'comunicador',
            },
            {
                label: '3',
                image: 'assets/form-imgs/1/3.jpg',
                result: 'comunicador',
            },
            {
                label: '4',
                image: 'assets/form-imgs/1/4.jpg',
                result: 'resolucion',
            },
            {
                label: '5',
                image: 'assets/form-imgs/1/5.jpg',
                result: 'comunicador',
            },
            {
                label: '6',
                image: 'assets/form-imgs/1/6.jpg',
                result: 'comunicador',
            },
            {
                label: '7',
                image: 'assets/form-imgs/1/7.jpg',
                result: 'principiante',
            },
            {
                label: '8',
                image: 'assets/form-imgs/1/8.jpg',
                result: ['seguridad', 'resolucion'],
            },
            {
                label: '9',
                image: 'assets/form-imgs/1/9.jpg',
                result: 'creador',
            },
            {
                label: '10',
                image: 'assets/form-imgs/1/10.jpg',
                result: ['creador', 'seguridad', 'resolucion'],
            },
        ]
    },
    question3: {
        type: 'radio',
        text: '¿Sabes emplear comandos de búsquedas para obtener resultados más acertados?',
        image: 'assets/form-imgs/2/1.png',
        imageClass: 'image600px',
        solve: 'basic',
        options: [
            {
                label: 'Conozco todos esos comandos y muchos más.',
                result: 'integrador',
            },
            {
                label: 'Conozco algunos, otros no.',
                result: 'alfabeto',
            },
            {
                label: 'No conocía ninguno.',
                result: 'principiante',
            },
        ]
    },
    question4: {
        type: 'radio',
        text: 'Hace unos meses viste un video que te encantó en twitter y quieres enseñárselo a un amigo/a ¿cómo lo buscas?',
        solve: 'basic',
        options: [
            {
                label: 'Lo tengo en una carpeta de videos en mis marcadores.',
                result: 'integrador',
            },
            {
                label: 'Buscando en twitter por el tema del video para volverlo a encontrar.',
                result: 'alfabeto',
            },
            {
                label: 'Ufff, no creo que lo vuelva a encontrar, pero se lo cuento.',
                result: 'principiante',
            },
            {
                label: 'Con las opciones de búsqueda avanzada en el buscador.',
                result: 'alfabeto',
            },
        ]
    },
    question5: {
        type: 'checkbox',
        text: 'Selecciona todas las imágenes que son falsas',
        solve: 'q4',
        images: true,
        bigImages: true,
        options: [
            {
                label: '1',
                image: 'assets/form-imgs/4/1.jpg',
                result: true,
            },
            {
                label: '2',
                image: 'assets/form-imgs/4/2.jpg',
                result: true,
            },
            {
                label: '3',
                image: 'assets/form-imgs/4/3.jpg',
                result: false,
            },
            {
                label: '4',
                image: 'assets/form-imgs/4/4.jpg',
                result: false,
            },
            {
                label: '5',
                image: 'assets/form-imgs/4/5.jpg',
                result: true,
            },
            {
                label: '6',
                image: 'assets/form-imgs/4/6.jpg',
                result: true,
            },
        ]
    },
    question6: {
        type: 'radio',
        text: 'Tus contraseñas…',
        solve: 'basic',
        options: [
            {
                label: 'Son algo como 1234.',
                result: "principiante"
            },
            {
                label: 'Son algo como VTYf3bsu36@mp_34',
                result: "alfabeto"
            },
            {
                label: 'Fechas, lugares o algo que tiene que ver con mi vida.',
                result: "principiante"
            },
            {
                label: 'Uso la misma contraseña en todo, así no se me olvida.',
                result: "principiante"
            },
            {
                label: 'No me preocupo por recordar contraseñas, tengo un gestor de contraseñas que lo hace por mi.',
                result: "seguridad"
            },
        ]
    },
    question7: {
        type: 'radio',
        text: '¿Qué significa esta imagen? ',
        image: 'assets/form-imgs/6/1.png',
        solve: 'basic',
        options: [
            {
                label: 'Es una licencia que dice puedo usar el contenido siempre que diga de quién es.',
                result: "principiante"
            },
            {
                label: 'Ni idea.',
                result: "principiante"
            },
            {
                label: 'Es una licencia que dice que puedo usar el contenido sin modificarlo.',
                result: "seguridad"
            },
        ]
        
    },
    question8: {
        type: 'checkbox',
        text: '¿Cuáles de estas cosas sabes hacer?',
        images: true,
        solve: 'q7',
        options: [
            {
                label: '1',
                text: 'Memes.',
                image: 'assets/form-imgs/7/1.jpg',
            },
            {
                label: '2',
                text: 'Mods.',
                image: 'assets/form-imgs/7/2.jpg',
            },
            {
                label: '3',
                text: 'Apps.',
                image: 'assets/form-imgs/7/3.jpg',
            },
            {
                label: '4',
                text: 'Webs.',
                image: 'assets/form-imgs/7/4.jpg',
            },
            {
                label: '5',
                text: 'Editar Wikipedia.',
                image: 'assets/form-imgs/7/5.jpg',
            },
            {
                label: '6',
                text: 'Videojuegos.',
                image: 'assets/form-imgs/7/6.jpg',
            },
            {
                label: '7',
                text: 'Edición audio/música.',
                image: 'assets/form-imgs/7/7.jpg',
            },
            {
                label: '8',
                text: 'Edición video.',
                image: 'assets/form-imgs/7/8.jpg',
            },
            {
                label: '9',
                text: 'Otras.',
                image: 'assets/form-imgs/7/9.jpg',
            },
            {
                label: '10',
                text: 'Ninguna, no soy así de friki.',
                image: 'assets/form-imgs/7/10.jpg',
            },
        ]
    },
    question9: {
        type: 'radio',
        text: '¿Conoces tu huella digital?',
        solve: 'basic',
        options: [
            {
                label: 'Conozco todo lo que hay sobre mi en internet y sé controlarlo (historial de ubicaciones, de búsquedas, el rastreo de facebook en otras webs...).',
                result: ['seguridad', 'resolucion']
            },
            {
                label: 'Ni idea',
                result: 'principiante'
            },
            {
                label: 'Sé algunas cosas.',
                result: 'principiante',
            },
        ]
        
    },
    question10: {
        type: 'radio',
        text: 'Vas a cambiar tu sistema operativo a linux ¿qué harías?',
        solve: 'basic',
        options: [
            {
                label: 'Descargar la distribución que más me interese e instalarlo yo.',
                result: 'resolucion'
            },
            {
                label: '¿Qué es eso?',
                result: 'principiante'
            },
            {
                label: 'Le pido al servicio técnico que lo haga por mí.',
                result: 'alfabeto'
            },
        ]
        
    },
    question11: {
        type: 'radio',
        text: 'En el entorno digital sobre todo…',
        solve: 'basic',
        options: [
            {
                label: 'Creo.',
                result: 'creador'
            },
            {
                label: 'Comunico.',
                result: 'comunicador'
            },
            {
                label: 'Busco.',
                result: 'alfabeto'
            },
            {
                label: 'Me protejo.',
                result: 'seguridad'
            },
            {
                label: 'Resuelvo problemas.',
                result: 'resolucion'
            },
        ]
        
    },
};

const POOLS = {
    pool1: {
        actionId: "sendPoolfromSection",
        postAction: "afterPool",
        questions: questions
    },
    pool2: {
        actionId: "sendPoolfromSection",
        postAction: "afterPool2",
        questions: questions
    },
}

function showPhishingQuestion(msg) {
    let message = phishingTalk[msg];

    if (!me.phishingTalk)
        me.phishingTalk = msg + 1;

    document.getElementById("phishing-message").innerHTML = message;
    
    var e = document.getElementById("phishing-form");
    if (e != null)
        e.style.display = "block";

    e = document.getElementById("phishing-container");
    if (e != null)
        e.style.display = "block";

    screen = "user";
    hideChat();
}

function hidePhishingQuestion() {
    var e = document.getElementById("phishing-form");
    if (e != null)
        e.style.display = "none";

    e = document.getElementById("phishing-container");
    if (e != null)
        e.style.display = "none";

    screen = "game";
    showChat();
}

function phishingSubmit () {
    let v = document.getElementById("phishing-field").value;
    let playerId = me.id;
    if (v != "") {
        if (me.phishingTalk !== 3) {
            document.getElementById("phishing-field").value = "";
            showPhishingQuestion(me.phishingTalk++);
        } else {
            if (v === players[playerId].nickName) {
                //if socket !null the connection has been established ie lurk mode
                if (socket != null) {
                    console.silentLog('el nombre es: ' + v);
                    socket.emit("action", "PlayerPhishing");
                }
            }
            document.getElementById("phishing-field").value = "";
            delete me.phishingTalk;
            hidePhishingQuestion();
        } 

        //prevent page from refreshing on enter (default form behavior)
        return false;
    }
}

function showAccessQuestion() {
    // document.getElementById("access-message").innerHTML = "password";
    
    var e = document.getElementById("access-form");
    if (e != null)
        e.style.display = "block";

    e = document.getElementById("access-container");
    if (e != null)
        e.style.display = "block";

    screen = "user";
    hideChat();
}

function hideAccessQuestion() {
    var e = document.getElementById("access-form");
    if (e != null)
        e.style.display = "none";

    e = document.getElementById("access-container");
    if (e != null)
        e.style.display = "none";

    screen = "game";
    showChat();
}

function accessSubmit () {
    let v = document.getElementById("access-field").value;
    let playerId = me.id;
    if (v != "") {
        if (v === '10100') {
            console.silentLog("¡exito!");
            hideAccessQuestion();
            socket.emit("action", "AccessSuccess");
        } else {
            console.silentLog("¡No!");
            hideAccessQuestion();
            socket.emit("action", "AccessFailed");
        }
        //prevent page from refreshing on enter (default form behavior)
        return false;
    }
}