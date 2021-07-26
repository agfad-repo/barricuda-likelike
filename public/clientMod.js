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
    }
}

function afterPool(data) {
    socket.emit("action", "Survey1");
}

function afterPool2(data) {
    socket.emit("action", "Survey2");
}

const questions = {
    question1: {
        type: 'checkbox',
        text: '¿Qué imágenes te definen más?',
        images: true,
        options: [
            {
                label: '1',
                image: 'assets/form-imgs/1/1.png',
            },
            {
                label: '2',
                image: 'assets/form-imgs/1/2.png',
            },
            {
                label: '3',
                image: 'assets/form-imgs/1/3.png',
            },
            {
                label: '4',
                image: 'assets/form-imgs/1/4.png',
            },
            {
                label: '5',
                image: 'assets/form-imgs/1/5.png',
            },
            {
                label: '6',
                image: 'assets/form-imgs/1/6.png',
            },
            {
                label: '7',
                image: 'assets/form-imgs/1/7.png',
            },
            {
                label: '8',
                image: 'assets/form-imgs/1/8.png',
            },
            {
                label: '9',
                image: 'assets/form-imgs/1/9.png',
            },
            {
                label: '10',
                image: 'assets/form-imgs/1/10.png',
            },
        ]
    },
    question2: {
        type: 'radio',
        text: '¿sabes emplear comandos de búsquedas para obtener resultados más acertados?',
        image: 'assets/form-imgs/2/1.png',
        imageClass: 'image600px',
        options: [
            {
                label: 'Conozco todos esos comandos y muchos más',
            },
            {
                label: 'Conozco algunos, otros no',
            },
            {
                label: 'No conocía ninguno',
            },
        ]
    },
    question3: {
        type: 'radio',
        text: 'Hace unos meses viste un video que te encantó en twitter y quieres enseñárselo a un amigo/a ¿cómo lo buscas?',
        options: [
            {
                label: 'Lo tengo en una carpeta de videos en mis marcadores'
            },
            {
                label: 'buscando en twitter por el tema del video para volverlo a encontrar'
            },
            {
                label: 'ufff, no creo que lo vuelva a encontrar, pero se lo cuento'
            },
            {
                label: 'Con las opciones de búsqueda avanzada en el buscador'
            },
        ]
    },
    question4: {
        type: 'checkbox',
        text: 'Selecciona todas las imágenes que son falsas',
        images: true,
        bigImages: true,
        options: [
            {
                label: '1',
                image: 'assets/form-imgs/4/1.png',
            },
            {
                label: '2',
                image: 'assets/form-imgs/4/2.png',
            },
            {
                label: '3',
                image: 'assets/form-imgs/4/3.png',
            },
            {
                label: '4',
                image: 'assets/form-imgs/4/4.png',
            },
            {
                label: '5',
                image: 'assets/form-imgs/4/5.png',
            },
            {
                label: '6',
                image: 'assets/form-imgs/4/6.png',
            },
        ]
    },
    question5: {
        type: 'radio',
        text: 'Tus contraseñas…',
        options: [
            {
                label: 'Son algo como 1234'
            },
            {
                label: 'Son algo como VTYf3bsu36@mp_34'
            },
            {
                label: 'fechas, lugares o algo que tiene que ver con mi vida'
            },
            {
                label: 'Uso la misma contraseña en todo, así no se me olvida'
            },
            {
                label: 'No me preocupo por recordar contraseñas, tengo un gestor de contraseñas que lo hace por mi.'
            },
        ]
    },
    question6: {
        type: 'radio',
        text: '¿Qué significa esta imagen? ',
        image: 'assets/form-imgs/6/1.png',
        options: [
            {
                label: 'Es una licencia que dice puedo usar el contenido siempre que diga de quién es',
            },
            {
                label: 'Ni idea',
            },
            {
                label: 'Es una licencia que dice que puedo usar el contenido sin modificarlo',
            },
        ]
        
    },
    question7: {
        type: 'checkbox',
        text: '¿Cuáles de estas cosas sabes hacer?',
        images: true,
        options: [
            {
                label: '1',
                text: 'Memes',
                image: 'assets/form-imgs/7/1.png',
            },
            {
                label: '2',
                text: 'Mods',
                image: 'assets/form-imgs/7/2.png',
            },
            {
                label: '3',
                text: 'Apps',
                image: 'assets/form-imgs/7/3.png',
            },
            {
                label: '4',
                text: 'Webs',
                image: 'assets/form-imgs/7/4.png',
            },
            {
                label: '5',
                text: 'Editar Wikipedia',
                image: 'assets/form-imgs/7/5.png',
            },
            {
                label: '6',
                text: 'Videojuegos',
                image: 'assets/form-imgs/7/6.png',
            },
            {
                label: '7',
                text: 'Edición audio/música',
                image: 'assets/form-imgs/7/7.png',
            },
            {
                label: '8',
                text: 'Edición video',
                image: 'assets/form-imgs/7/8.png',
            },
            {
                label: '9',
                text: 'Otras',
                image: 'assets/form-imgs/7/9.png',
            },
            {
                label: '10',
                text: 'Ninguna, noy así de freak',
                image: 'assets/form-imgs/7/10.png',
            },
        ]
    },
    question8: {
        type: 'radio',
        text: '¿Conoces tu huella digital?',
        options: [
            {
                label: 'Conozco todo lo que hay sobre mi en internet y sé controlarlo (historial de ubicaciones, de búsquedas, el rastreo de facebook en otras webs...)',
            },
            {
                label: 'Ni idea',
            },
            {
                label: 'Sé algunas cosas',
            },
        ]
        
    },
    question9: {
        type: 'radio',
        text: 'Vas a cambiar tu sistema operativo a linux ¿qué harías?',
        options: [
            {
                label: 'Descargar la distribución que más me interese e instalarlo yo',
            },
            {
                label: '¿Qué es eso?',
            },
            {
                label: 'Le pido al servicio técnico que lo haga por mí',
            },
        ]
        
    },
    question10: {
        type: 'radio',
        text: 'En el entorno digital sobre todo…',
        options: [
            {
                label: 'Creo',
            },
            {
                label: 'Comunico',
            },
            {
                label: 'Busco',
            },
            {
                label: 'Me protejo',
            },
            {
                label: 'Resuelvo problemas',
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