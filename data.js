//settings are just variables that can be sent to the client from the server
//they are either related to the rooms or shared with the server 
module.exports.SETTINGS = {
    //if not specified by the url where is the starting point
    defaultRoom: "r01Patio",
    //minimum time between talk messages enforced by both client and server
    ANTI_SPAM: 1000,
    //shows up at first non lurking login
    INTRO_TEXT: "Click/tap para mover",
};

//miscellaneous assets to preload
// add them in extra-character folder
module.exports.IMAGES = [
    ["robot", "Robot_Sprite_anim.png"],
    ["robotEmote", "Robot_Sprite_anim-emote.png"],
];

//miscellaneous sounds to preload
module.exports.SOUNDS = [
    ["intro", "music/Main.mp3"],
    ["hall", "music/Hall.mp3"],
    ["error", "music/System-Error.mp3"],
    ["vertedero", "music/Vertedero.mp3"],
    ["phishing", "music/Phishing.mp3"],
    ["biblioteca", "music/Biblioteca.mp3"],
];

module.exports.ROOMS = {

    r01Patio: {
        bg: "/salas/r01Patio.png",
        frameDelay: 60,
        avatarScale: 3,
        pageBg: "#1c2016",
        area: "/salas/r01Patio_Int.png",
        tint: "#fdeac8",
        bubblesY: 44,
        spawn: [8, 75, 120, 90],
        areaColors: {
            //h will be replaced by #
            // // #0066ff
            h0066ff: { cmd: "text", label: "créditos", txt:"créditos", iframe: true, url:"./pages/creditos/creditos.html", lines: 1, point: [50, 80], obstacle: false },
            // #ff9900
            hff9900: { cmd: "action", actionId: "PatioExit", label: "entrada", point: [64, 60], obstacle: false },
        }
    },
    r02Entrada: {
        bg: "/salas/r02Entrada_Fondo.png",
        frames: 1,
        animations: { 
            anim: [0, 1],
        },
        bgScale: 1,
        bgResolution: [256, 200],
        frameDelay: 60,
        avatarScale: 3,
        pageBg: "#1c2016",
        area: "/salas/r02Entrada_Int.png",
        tint: "#fdeac8",
        bubblesY: 36,
        spawn: [60, 88, 70, 95],
        areaColors: {
            //h will be replaced by #
            // #ff0000
            hff0000: { cmd: "enter", room: "r01Patio", label: "patio", point: [66, 98], enterPoint: [64, 65], obstacle: false },
            // #0066ff
            h0066ff: { cmd: "enter", room: "r04SalaX", label: "cookie de terceros", point: [98, 72], enterPoint: [60, 95], obstacle: false },
            // #ff9900
            hff9900: { cmd: "action", actionId: "CookiesIntro", label: "malware de secuestro de datos", point: [32, 72], enterPoint: [70, 95], obstacle: false },
        },
        things: {
            mesa: { file: "salas/r02Entrada_Sprite_Mesa.png", id: "mesa", offset: 7.5, scale: 2, position: [44, 57], frames: 1, frameDelay: 60, visible: true, },
            pantalla1: { file: "salas/r02Entrada_Sprite_Pantalla01.png", id: "pantalla1", offset: 7.5, scale: 2, position: [44, 24], frames: 1, frameDelay: 60, visible: true, },
            pantalla2: { file: "salas/r02Entrada_Sprite_Pantalla02.png", id: "pantalla2", offset: 7.5, scale: 2, position: [44, 24], frames: 1, frameDelay: 60, visible: false, 
            //label: "encuesta", command: { cmd: "text", txt: "Encuesta de 10 preguntas", lines: 2, pool: "pool1", section: "pool-section", label: "encuesta", point: [65, 95], obstacle: false }
            },
        }
    },
    r03Cookies: {
        bg: "/salas/r03Cookies.png",
        frames: 1,
        animations: { 
            anim: [0, 1],
        },
        bgScale: 1,
        bgResolution: [256, 200],
        frameDelay: 60,
        avatarScale: 3,
        pageBg: "#1c2016",
        area: "/salas/r03Cookies_Int.png",
        tint: "#fdeac8",
        bubblesY: 24,
        spawn: [60, 88, 70, 95],
        areaColors: {
            //h will be replaced by #
            // #ff0000
            hff0000: { cmd: "enter", room: "r02Entrada", label: "entrada", point: [66, 98], enterPoint: [32, 72], obstacle: false },
            // #0066ff
            h0066ff: { cmd: "text", actionId: 'Cookies', label: "galletas", txt: "mmmm... deliciosas galletas", point: [45, 85], obstacle: false },
            // #29adff
            h29adff: { cmd: "enter", room: "r05SalaXCopia", label: "cookies propias", point: [65, 72], enterPoint: [60, 95], obstacle: false },
            // #ffec27
            hffec27: { cmd: "enter", room: "r08Huella", label: "cookies de terceros", point: [10, 85], enterPoint: [120, 84], obstacle: false },
            // #00cc99
            h00cc99: { cmd: "text", label: "robot", point: [37, 85], obstacle: false },
        },
        things: {
            cookieMonsterA: { file: "salas/r03Cookies_Monster_Sprite_A.png", id: "cookie-monsterA", position: [91, 67], label: "mostruo de las galletas", frames: 1, frameDelay: 30, visible: true, },
            cookieMonsterB: { file: "salas/r03Cookies_Monster_Sprites.png", id: "cookie-monsterB", position: [91, 67], label: "mostruo de las galletas", frames: 2, frameDelay: 30, visible: false, command: { cmd: "text", label: "mostruo de las galletas", txt: "¿Aceptaste las cookies? Cuidado, no todas las cookies son lo que parecen. Mira este vídeo para descubrirlo. \nCuando lo hayas visto sal por la puerta de las cookies que son más peligrosas.\nNOTA: el video es en inglés pero puedes activar la función de subtítulos si lo deseas", lines: 13, url: "https://www.youtube.com/embed/4n2Syt0P4js?start=90", iframe: true, point: [84, 89], obstacle: false } },
        }
    },
    r04SalaX: {
        bg: "/salas/r04SalaX.png",
        frames: 2,
        frameDelay: 60,
        avatarScale: 3,
        pageBg: "#1c2016",
        area: "/salas/r04SalaX_Int.png",
        tint: "#fdeac8",
        bubblesY: 44,
        spawn: [60, 88, 70, 95],
        areaColors: {
            //h will be replaced by #
            // #ff0000
            hff0000: { cmd: "enter", room: "r02Entrada", label: "entrada", point: [60, 95], enterPoint: [98, 72], obstacle: false },
            // #0066ff
            // h0066ff: { cmd: "text", label: "?", point: [80, 78], obstacle: false },
            // #566db8
            h566db8: { cmd: "text", label: "Robot X", point: [45, 82], txt: "has metido la pata, es importante que seas capaz de buscar información ¿por qué no buscas en internet o lo consultas con alguien y lo intentas de nuevo?", lines: 5, obstacle: false },
        }
    },
    r05SalaXCopia: {
        bg: "/salas/r05SalaXCopia.png",
        frames: 2,
        frameDelay: 60,
        avatarScale: 3,
        pageBg: "#1c2016",
        area: "/salas/r05SalaXCopia_Int.png",
        tint: "#fdeac8",
        bubblesY: 44,
        spawn: [60, 88, 70, 95],
        areaColors: {
            //h will be replaced by #
            // #ff0000
            hff0000: { cmd: "enter", room: "r03Cookies", label: "cookies", point: [60, 95], enterPoint: [65, 72], obstacle: false },
            // #0066ff
            // h0066ff: { cmd: "text", label: "?", point: [80, 78], obstacle: false },
            // #566db8
            h566db8: { cmd: "text", label: "Robot X", point: [90, 82], txt: "has metido la pata, es importante que seas capaz de buscar información ¿por qué no buscas en internet o lo consultas con alguien y lo intentas de nuevo?", lines: 5, obstacle: false },
        }
    },
    r06Reciclaje: {
        bg: "/salas/r06Reciclaje2.png",
        frames: 2,
        animations: { 
            anim: [0, 2],
        },
        bgScale: 1,
        bgResolution: [256, 200],
        frameDelay: 60,
        avatarScale: 3,
        pageBg: "#1c2016",
        area: "/salas/r06Reciclaje2_Int.png",
        tint: "#fdeac8",
        bubblesY: 44,
        spawn: [58, 69, 75, 75],
        areaColors: {
            //h will be replaced by #
            // #29adff
            h29adff: { cmd: "enter", room: "r08Huella", label: "Huella", point: [68, 47], enterPoint: [92, 95], obstacle: false },
            // #ffec27
            hffec27: { cmd: "enter", room: "r07Marionetas", label: "Que no jueguen contigo", point: [10, 85], enterPoint: [115, 86], obstacle: false },
            // #0066ff
            h0066ff: { cmd: "text", label: "móvil roto", txt: "¿qué pasa cuando me tiran? Datos e información sobre desechos electrónicos.", lines: 3, url:"https://es.statista.com/grafico/12308/mayores-generados-de-basura-tecnologica-del-mundo/", iframe: false, point: [86, 87], obstacle: false },
            // // #00cc99
            // h00cc99: { cmd: "text", label: "papelera1", point: [60, 80], obstacle: false },
            // // #ff00ff
            // hff00ff: { cmd: "text", label: "papelera2", point: [60, 80], obstacle: false },
            // #ff9900
            hff9900: { cmd: "text", label: "móvil", txt: "¿Qué sabes sobre tu teléfono? ¿De qué materiales está hecho? ¿de dónde vienen? Averigua más sobre la historia de tu móvil investigando sobre el juego Phone Story.", lines: 6, iframe: false, url: "http://www.aeromental.com/2011/09/16/el-gameplay-de-phone-story-el-video-del-polemico-juego-que-fue-rechazado-en-la-app-store/", point: [40, 80], obstacle: false },
        },
        things: {
            papelera: { file: "salas/r06Reciclaje_Sprites_NPCsA.png", id: "papelera", position: [40, 100 - 19], label: "papelera", frames: 2, frameDelay: 60, visible: true, command: { cmd: "text", label: "móvil roto", txt: "¿cuál es el porcentaje de materiales reciclables de un teléfono móvil? Encuéntralo aquí y úsalo para conformar tu código", lines: 4, url:"https://www.recuperacion.org/infografia-ciudad/", iframe: true, point: [86, 87], obstacle: false }},
            contenedor: { file: "salas/r06Reciclaje_Sprites_NPCsB.png", id: "contenedor", position: [60, 100 - 19], label: "contenedor", frames: 2, frameDelay: 60, visible: true, command: { cmd: "text", label: "móvil roto", txt: "¿dónde tiro mis residuos electrónicos para que se traten correctamente?", lines: 3, url:"https://www.ecolec.es/reciclar-aparatos-electronicos/", iframe: true, point: [86, 87], obstacle: false }},
            // components
            monitor: { command: { cmd: "action", actionId: "Monitor", point: [50, 75] }, file: "salas/r06Reciclaje_Sprite_Monitor.png", id: "Monitor", position: [15, 26], label: "Monitor", frames: 1, frameDelay: 60, visible: false, },
            placa: { command: { cmd: "action", actionId: "Placa", point: [59, 68] }, file: "salas/r06Reciclaje_Sprite_Placa.png", id: "Placa", position: [40, 38], label: "Placa", frames: 1, frameDelay: 60, visible: false, },
            teclado: { command: { cmd: "action", actionId: "Teclado", point: [83, 67] }, file: "salas/r06Reciclaje_Sprite_Teclado.png", id: "Teclado", position: [80, 30], label: "Teclado", frames: 1, frameDelay: 60, visible: false, },
            mouse: { command: { cmd: "action", actionId: "Mouse", point: [110, 77] }, file: "salas/r06Reciclaje_Sprite_Mouse.png", id: "Mouse", position: [105, 50], label: "Mouse", frames: 1, frameDelay: 60, visible: false, },
            cabinet1: { file: "pico-cabinet1.png", id: "cabinet1", offset: 9, position: [110, 71], frames: 1, frameDelay: 60, visible: false, label: "Arcade-Teleport", command: { cmd: "text", txt: "¡Vaya, parece que has encontrado un atajo hacia la sala de resolución de problemas!", lines: 3, postAction: true, actionId: "Atajo2", point: [105, 85], obstacle: false } },
        }
    },
    r07Marionetas: {
        bg: "/salas/r07Marionetas.png",
        frames: 4,
        animations: { 
            anim: [0, 4],
        },
        bgScale: 1,
        bgResolution: [256, 200],
        frameDelay: 30,
        avatarScale: 3,
        pageBg: "#1c2016",
        area: "/salas/r07Marionetas_Int.png",
        tint: "#fdeac8",
        bubblesY: 44,
        spawn: [58, 80, 75, 95],
        areaColors: {
            // #00e436
            h00e436: { cmd: "enter", room: "r06Reciclaje", label: "Reciclaje", point: [120, 85], enterPoint: [16, 85], obstacle: false },
            // #ffec27
            hffec27: { cmd: "enter", room: "r08Huella", label: "Huella", point: [10, 86], enterPoint: [36, 95], obstacle: false },
            // #ff00ff
            hff00ff: { cmd: "text", label: "marioneta 1", txt: "cada vuelta al reloj gano una moneda, tengo que esperar 30 vueltas del reloj para ganar un diamante, si no estoy pendiente los perderé.", lines: 5, url: "https://derechoaljuego.digital/patronesoscuros/temporales/", iframe: true, point: [33, 86], obstacle: false },
            // #00cc99
            h00cc99: { cmd: "text", label: "marioneta 2", txt: "dame un like y yo te doy otro, necesito 20 más para desbloquear el logro.", lines: 3, url: "https://derechoaljuego.digital/patronesoscuros/sociales/", iframe: true, point: [53, 86], obstacle: false },
            // #9900cc
            h9900cc: { cmd: "text", label: "marioneta 3", txt: "¿tienes unas monedas? las necesito para ganar.", lines: 2, url: "https://derechoaljuego.digital/patronesoscuros/monetarios/", iframe: true, point: [77, 86], obstacle: false },
            // #b75714
            hb75714: { cmd: "text", label: "marioneta 4", txt: "no puedo atenderte, tengo que lograr más estrellas, la última la conseguí hace ya tiempo...", lines: 3, url: "https://derechoaljuego.digital/patronesoscuros/psicologicos/", iframe: true, point: [95, 86], obstacle: false },
        }
    },
    r08Huella: {
        bg: "/salas/r08Huella.png",
        frames: 2,
        animations: { 
            anim: [0, 2],
        },
        bgScale: 1,
        bgResolution: [256, 200],
        frameDelay: 60,
        avatarScale: 3,
        pageBg: "#1c2016",
        area: "/salas/r08Huella_Int.png",
        tint: "#fdeac8",
        bubblesY: 44,
        spawn: [60, 88, 70, 95],
        areaColors: {
            //h will be replaced by #
            // #ff0000
            hff0000: { cmd: "enter", room: "r06Reciclaje", label: "Materiales y residuos", point: [92, 95], enterPoint: [68, 47], obstacle: false },
            // #00e436
            h00e436: { cmd: "enter", room: "r03Cookies", label: "Cookies", point: [120, 84], enterPoint: [10, 85], obstacle: false },
            // h00e436: { cmd: "enter", room: "r12Resolucion", label: "cookies", point: [120, 84], enterPoint: [10, 85], obstacle: false },
            // #ff77a8
            // hff77a8: { cmd: "enter", room: "r10Nubes", label: "La nube", point: [98, 72], enterPoint: [120, 92], obstacle: false },
            // #29adff
            h29adff: { cmd: "enter", room: "r10Nubes", label: "La nube", point: [32, 72], enterPoint: [120, 92], obstacle: false },
            // #ffec27
            hffec27: { cmd: "enter", room: "r09FakeNews", label: "Fake News", point: [10, 85], enterPoint: [120, 86], obstacle: false },
            // #be1250
            hbe1250: { cmd: "enter", room: "r07Marionetas", label: "Que no jueguen contigo", point: [36, 95], enterPoint: [10, 85], obstacle: false },
            
            // #ff9900
            hff9900: { cmd: "text", label: "espejo 1", txt: "¿Quién eres en internet? Busca tu nombre y apellidos entrecomillados en el buscador ¿que aparece?", lines: 3, point: [36, 84], obstacle: false },
            // #0066ff
            h0066ff: { cmd: "text", label: "espejo 2", txt: "No te gusta lo que aparece y no te gustaría que otras personas lo vieran,tienes derecho al olvido en internet, es decir, a que no aparezcas cuando te busquen. Mira cómo:", lines: 6, url: "https://www.aepd.es/es/areas-de-actuacion/internet-y-redes-sociales/derecho-al-olvido", iframe: false, point: [36, 84], obstacle: false },
            // 
            //#999900
            h999900: { cmd: "text", label: "espejo 3", txt: "Sé donde has estado y otros también lo saben... ¿quieres revisar tu historial de ubicaciones?", url: "https://www.google.com/maps/timeline", lines: 4, iframe: false, point: [36, 84], obstacle: false },
            // #0f8a61
            h0f8a61: { cmd: "text", label: "espejo 4", txt: "¿No quieres que sepan dónde has estado? Resuélvelo en simples pasos:", url: "https://datadetoxkit.org/es/privacy/essentials/#step-2", lines: 3, iframe: true, point: [87, 84], obstacle: false },
            // #ff00ff
            hff00ff: { cmd: "text", label: "espejo 5", txt: "Revisa también muchas otras cosas que saben de ti y decide si prefieres mantener tu privacidad.", url: "https://datadetoxkit.org/es/privacy/degooglise/", lines: 3, iframe: true, point: [87, 84], obstacle: false },
            // #00cc99
            h00cc99: { cmd: "text", label: "espejo 6", txt: "¡Genial! Si te interesa saber más sobre seguridad en la red, por aquí te dejamos información más amplia: ", lines: 4, url: "https://arsgames.net/wp-content/uploads/2019/02/manual-de-seguridad-digital.pdf", iframe: false, point: [87, 84], obstacle: false },
        },
        things: {
            personaje: { file: "salas/r08Huella_NPC_Sprite.png", id: "personaje", position: [60, 77 - 11], frames: 4, frameDelay: 30, visible: true, label: "HuellaTRON", command: { cmd: "text", txt: "Uy si, las cookies de terceros son peligrosas para tu privacidad, seguro ya has aceptado muchas ¿revisamos tu huella digital?", lines: 4, point: [77, 88], obstacle: false }},
            // command: { cmd: "text", txt: "", lines: 2, postAction: true, actionId: "Survey1",  label: "???", point: [65, 95], obstacle: false } },
            nota: { file: "/salas/r14Creacion_Sprite_Nota.png", id: "nota", label: "papelito", offset: 0, position: [95, 70], frames: 1, frameDelay: 60, visible: true, command: { cmd: "text", txt: "El papelito pone: La biblioteca está detrás de las nubes, en la planta -1, al fondo!!!\n\nParece una pista.", lines: 5, point: [90, 80] } }
        }
        
    },
    r09FakeNews: {
        bg: "/salas/r09FakeNews.png",
        frames: 2,
        animations: { 
            anim: [0, 1],
        },
        bgScale: 1,
        bgResolution: [256, 200],
        frameDelay: 60,
        avatarScale: 3,
        pageBg: "#1c2016",
        area: "/salas/r09FakeNews_Int.png",
        tint: "#fdeac8",
        bubblesY: 44,
        spawn: [40, 85, 90, 95],
        areaColors: {
            //h will be replaced by #
            // #00e436
            h00e436: { cmd: "enter", room: "r08Huella", label: "Huella", point: [120, 85], enterPoint: [10, 85], obstacle: false },
            // #ffec27
            hffec27: { cmd: "enter", room: "r10Nubes", label: "La nube", point: [10, 85], enterPoint: [60, 98], obstacle: false },
            // #00cc99
            h00cc99: { cmd: "text", label: "news1", point: [97, 80], obstacle: false, txt: "juega", url:"https://juego.verdaderofalso.com/", iframe: false },
            // #ff00ff
            hff00ff: { cmd: "text", label: "news2", point: [30, 80], obstacle: false, txt: "aprende más", url:" https://datadetoxkit.org/es/misinformation/healthhoax/", iframe: true},
            // #9900cc
            h9900cc: { cmd: "text", label: "M. Fake", txt: "¡No soporto las fake news!\n\n¡Maldita desinformación!\n\n¿sabes reconocerlas?", lines: 5, point: [69, 80], obstacle: false },
        }
    },
    r10Nubes: {
        bg: "/salas/r10Nubes_anim3.png",
        frames: 2,
        animations: { 
            nube: [0, 3], 
            transformacion: [3, 3], 
            cables: [6, 3],
        },
        bgScale: 1,
        bgResolution: [256, 200],
        frameDelay: 60,
        avatarScale: 3,
        pageBg: "#1c2016",
        area: "/salas/r10Nubes_anim3_Int.png",
        tint: "#fdeac8",
        bubblesY: 44,
        spawn: [40, 85, 90, 95],
        areaColors: {
            //h will be replaced by #
            // #00e436
            h00e436: { cmd: "enter", room: "r08Huella", label: "Huella", point: [115, 92], enterPoint: [32, 72], obstacle: false },
            // #ffec27
            hffec27: { cmd: "enter", room: "r11Lago", label: "Lago", point: [10, 85], enterPoint: [10, 83], obstacle: false },
            // HABRIA QUE PONER OTRA SALIDA???
            // #ff0000
            hff0000: { cmd: "enter", room: "r09FakeNews", label: "Fake News", point: [60, 98], enterPoint: [10, 86], obstacle: false },
            // #ff77a8
            hff77a8: { cmd: "enter", room: "r13Netiqueta", label: "Planta -1", point: [86, 77], enterPoint: [60, 95], obstacle: false },
            // #b75714
            hb75714: { cmd: "text", label: "cartel", txt: "La biblioteca está\nen la planta -1, al fondo.", lines: 2, point: [46, 78], obstacle: false },
            // #ff9900
            hff9900: { cmd: "text", label: "nube mediana", txt:"La nube no es lo que parece, está compuesta de servidores y enormes cables que recorren el globo", postAction: false, url:"https://www.submarinecablemap.com/", iframe: false, actionId: "Nube", lines: 3, point: [60, 80], obstacle: false },
            // #689156
            h689156: { cmd: "text", label: "nube grande", txt:"La nube no es lo que parece, está compuesta de servidores y enormes cables que recorren el globo", postAction: false, url:"https://www.submarinecablemap.com", iframe: false, actionId: "Nube", lines: 3, point: [60, 80], obstacle: false },
            // #ff00ff
            hff00ff: { cmd: "text", label: "nube oscura 1", txt: "¿Tienes una web propia? ¿hay una web que te encante visitar? Aquí puedes ver el impacto que tiene en huella de carbono:", url: "https://www.websitecarbon.com/", iframe: true, lines: 4, point: [40, 80], obstacle: false },
            // #0066ff
            h0066ff: { cmd: "text", label: "nube oscura 2", txt: "¡Internet contamina! Mira cuanto", url: "/pages/polution/contaminacion-digital.html", iframe: true, lines: 1, point: [60, 85], obstacle: false },
            // #9900cc
            h9900cc: { cmd: "text", label: "nube oscura 3", txt: "La huella de carbono de internet", url: "https://www.custommade.com/blog/carbon-footprint-of-internet/", iframe: true, lines: 1, point: [80, 80], obstacle: false },
        },
    },
    r11Lago: {
        bg: "/salas/r11Lago_Anim.png",
        frames: 2,
        animations: {
            "pescador": [0, 2],
            "vacio": [2, 2],
        },
        frameDelay: 60,
        avatarScale: 3,
        pageBg: "#1c2016",
        area: "/salas/r11Lago_Int2.png",
        tint: "#fdeac8",
        bubblesY: 44,
        spawn: [10, 72, 21, 82],
        areaColors: {
            //h will be replaced by #
            // #ffec27
            hffec27: { cmd: "enter", room: "r10Nubes", label: "nubes", point: [15, 80], enterPoint: [10, 86], obstacle: false },
            // #9900cc
            h9900cc: { cmd: "text", txt: "como te llamas?", label: "pescador", point: [109, 74], obstacle: false },
        },
        things: {
            pescador: { file: "salas/r11Lago_NPC.png", id: "Phishing", position: [101, 63], frames: 2, frameDelay: 30, visible: true, label: "Phishing",
                command: { cmd: "text", txt: "hola, ¿quieres charlar un rato?", lines: 2, postAction: true, actionId: "Phishing", point: [94, 68], obstacle: false } },
        },
    },
    r12Resolucion: {
        bg: "/salas/r12Resolucion.png",
        frames: 4,
        animations: { 
            anim: [0, 2],
        },
        bgScale: 1,
        bgResolution: [256, 200],
        frameDelay: 30,
        avatarScale: 3,
        pageBg: "#1c2016",
        area: "/salas/r12Resolucion_Int.png",
        tint: "#fdeac8",
        bubblesY: 44,
        spawn: [40, 85, 90, 95],
        areaColors: {
            //h will be replaced by #
            // #00e436
            h00e436: { cmd: "enter", room: "r14Creacion", label: "Creación", point: [110, 89], enterPoint: [15, 85], obstacle: false },
            // #ffec27
            hffec27: { cmd: "enter", room: "r13Netiqueta", label: "Planta -1", point: [10, 87], enterPoint: [99, 73], obstacle: false },
            // #33ffaa
            h33ffaa: { cmd: "text", txt: "necesitas reinstalar el sistema operativo, mejor pasarse a Gnu/linux ->  guía paso a paso: ", url: "https://www.youtube.com/embed/n9q-LVM_X7o", lines: 3, iframe: true, label: "?", point: [80, 85], obstacle: false },
        },
        things: {
            fixit: { file: "salas/r12Resolucion_Sprite_NPC.png", id: "Fixit", offset: 9, position: [50, 65], frames: 4, frameDelay: 30, visible: true, label: "Fixit", command: { cmd: "text", txt: "Vuelve al vertedero y ve a buscar material para crear un nuevo ordenador. cuando lo tengas regresas aquí y te explicaré como montar paso a paso un nuevo ordenador", lines: 6, postAction: true, actionId: "NpcFixit", label: "personaje", point: [50, 85], obstacle: false } },
            // components
            monitor: { command: { cmd: "action", actionId: "Components", point: [30, 90] }, file: "salas/r06Reciclaje_Sprite_Monitor.png", id: "Monitor", position: [10, 60], label: "Componentes", frames: 1, frameDelay: 60, visible: false },
            placa: { command: { cmd: "action", actionId: "Components", point: [30, 90] }, file: "salas/r06Reciclaje_Sprite_Placa.png", id: "Placa", position: [30, 65], label: "Componentes", frames: 1, frameDelay: 60, visible: false },
            teclado: { command: { cmd: "action", actionId: "Components", point: [30, 90] }, file: "salas/r06Reciclaje_Sprite_Teclado.png", id: "Teclado", position: [20, 62], label: "Componentes", frames: 1, frameDelay: 60, visible: false },
            mouse: { command: { cmd: "action", actionId: "Components", point: [30, 90] }, file: "salas/r06Reciclaje_Sprite_Mouse.png", id: "Mouse", position: [12, 66], label: "Componentes", frames: 1, frameDelay: 60, visible: false },
            compu: { command: { cmd: "text", txt: "denunciar phishing", url: "https://ihackear.com/que-es-el-phishing/", iframe: true, actionId: 'DenunciarPhishing', postAction: true, point: [85, 85] }, file: "salas/r12Resolucion_Compu2.png", id: "compu", position: [80, 55], label: "denunciar pishing", frames: 1, frameDelay: 60, visible: true },
        }
    },
    r13Netiqueta: {
        bg: "/salas/r13Netiqueta.png",
        frames: 2,
        animations: { 
            anim: [0, 2],
        },
        bgScale: 1,
        bgResolution: [256, 200],
        frameDelay: 60,
        avatarScale: 3,
        pageBg: "#1c2016",
        area: "/salas/r13Netiqueta_Int.png",
        tint: "#fdeac8",
        bubblesY: 34,
        spawn: [40, 85, 90, 95],
        areaColors: {
            //h will be replaced by #
            // #be1250
            hbe1250: { cmd: "enter", room: "r10Nubes", label: "nubes", point: [60, 95], enterPoint: [86, 77], obstacle: false },
            // #29adff
            h29adff: { cmd: "enter", room: "r12Resolucion", label: "Resolución", point: [100, 76], enterPoint: [10, 85], obstacle: false },
        },
        things: {
            // cabinet: { file: "pico-cabinet.png", id: "cabinet", offset: 9, position: [25, 64], frames: 1, frameDelay: 60, visible: true, label: "Netiqueta", command: { cmd: "text", txt: "reglas netiqueta", iframe: true, url:"https://arsgames.net/netiqueta", lines: 1, point: [38, 86] } },
            cabinet1: { file: "pico-cabinet1.png", id: "cabinet1", offset: 9, position: [25, 64], frames: 1, frameDelay: 60, visible: true, label: "Netiqueta", command: { cmd: "text", txt: "¡Vaya, parece que has encontrado un atajo hacia la biblioteca!", lines: 3, postAction: true, actionId: "Atajo", point: [38, 85], obstacle: false } },
            cabinet2: { file: "pico-cabinet2.png", id: "cabinet1", offset: 9, position: [48, 64], frames: 1, frameDelay: 60, visible: true, label: "Netiqueta", command: { cmd: "text", txt: "reglas netiqueta", iframe: true, url:"https://arsgames.net/netiqueta", lines: 1, point: [50, 86] } },
            nota: { file: "/salas/r14Creacion_Sprite_Nota.png", id: "nota", label: "papelito", offset: 0, position: [85, 80], frames: 1, frameDelay: 60, visible: true, command: { cmd: "text", txt: "10100\n\n Parece el código.\n\n¡Ve a la biblioteca y busca el ordenador!", lines: 7, point: [80, 80] } }
        }
    },
    r14Creacion: {
        bg: "/salas/r14Creacion.png",
        frames: 2,
        animations: { 
            anim: [0,2],
        },
        bgScale: 1,
        bgResolution: [256, 200],
        frameDelay: 60,
        avatarScale: 3,
        pageBg: "#1c2016",
        area: "/salas/r14Creacion_Int.png",
        tint: "#fdeac8",
        bubblesY: 44,
        spawn: [40, 85, 90, 95],
        areaColors: {
            //h will be replaced by #
            // #ffec27
            hffec27: { cmd: "enter", room: "r12Resolucion", label: "resolucion", point: [10, 86], enterPoint: [110, 87], obstacle: false },
            // #00e436
            h00e436: { cmd: "enter", room: "r15Pasillo", label: "pasillo", point: [118, 85], enterPoint: [15, 85], obstacle: false },

            // #ff9900
            hff9900: { cmd: "text", label: "Memes", txt: "Aprende a crear memes", url: "https://the-image-editor.com/es/meme-generator", iframe: true, point: [29, 85], obstacle: false },
            // #0066ff
            h0066ff: { cmd: "text", label: "Videojuegos", txt: "Aprende a crear videojuegos", url: "https://scratch.mit.edu/", iframe: false, point: [47, 85], obstacle: false },
            // #999900
            h999900: { cmd: "text", label: "Sonido", txt: "Aprende a crear sonido", url: "https://splice.com/sounds/beatmaker", iframe: false, point: [66, 85], obstacle: false },
            // #0f8a61
            h0f8a61: { cmd: "text", label: "Realidad virtual", txt: "Aprende a crear realidad virtual", url: " https://hubs.mozilla.com/", iframe: false, point: [84, 85], obstacle: false },
            // #98504f
            h98504f: { cmd: "text", label: "Apps", txt: "Aprende a crear aplicaciones", url: "https://appinventor.mit.edu/", iframe: false, point: [103, 85], obstacle: false },
        },
        things: {
            // nota: { file: "/salas/r14Creacion_Sprite_Nota.png", id: "nota", label: "papelito", offset: 0, position: [85, 80], frames: 1, frameDelay: 60, visible: true, command: { cmd: "text", txt: " Anota el número de bloques de eventos (los naranjas) que hay en scratch. Este número te servirá para terminar el juego", lines: 5, point: [80, 80] } }
            // nota: { file: "/salas/r14Creacion_Sprite_Nota.png", id: "nota", label: "papelito", offset: 0, position: [85, 80], frames: 1, frameDelay: 60, visible: true, command: { cmd: "text", txt: "10100\n\n Parece el código.\n\n¡Ve a la biblioteca! , ", lines: 5, point: [80, 80] } }
        }
    },
    r15Pasillo: {
        bg: "/salas/r15Pasillo.png",
        frames: 1,
        animations: { 
            anim: [0,1],
        },
        bgScale: 1,
        bgResolution: [256, 200],
        frameDelay: 60,
        avatarScale: 3,
        pageBg: "#1c2016",
        area: "/salas/r15Pasillo_Int.png",
        tint: "#fdeac8",
        bubblesY: 44,
        spawn: [40, 85, 90, 95],
        areaColors: {
            //h will be replaced by #
            // #00e436
            h00e436: { cmd: "enter", room: "r16Colabora", label: "colabora", point: [115, 85], enterPoint: [45, 96], obstacle: false },
            // #ffec27
            hffec27: { cmd: "enter", room: "r14Creacion", label: "creacion", point: [15, 85], enterPoint: [110, 85], obstacle: false },
            // #ffec27
            hff00ff: { cmd: "enter", room: "r18Biblioteca", label: "Biblioteca", point: [44, 75], enterPoint: [16, 87], obstacle: false },
            // // #00cc99
            // h00cc99: { cmd: "text", label: "news", point: [97, 80], obstacle: false },
            // // #ff00ff
            // hff00ff: { cmd: "text", label: "news", point: [30, 80], obstacle: false },
            // #9900cc
            // h9900cc: { cmd: "enter", room: "r17SalaCrypto", label: "cripto", point: [70, 80], enterPoint: [15, 85], obstacle: false },
            h9900cc: { cmd: "action", label: "cripto", point: [70, 80], actionId: "Crypto", obstacle: false },
        },
        things: {
            nota: { file: "/salas/r14Creacion_Sprite_Nota.png", id: "nota", label: "papelito", offset: 0, position: [85, 80], frames: 1, frameDelay: 60, visible: true, command: { cmd: "text", txt: "10100\n\nParece el código.\n\n¡Ve a la biblioteca y busca el ordenador!", lines: 7, point: [80, 80] } }
        }
    },
    r16Colabora: {
        bg: "/salas/r16Colabora.png",
        frames: 2,
        frameDelay: 60,
        avatarScale: 3,
        pageBg: "#1c2016",
        area: "/salas/r16Colabora_Int.png",
        tint: "#fdeac8",
        bubblesY: 34,
        spawn: [40, 85, 90, 95],
        areaColors: {
            //h will be replaced by #
            // #be1250
            hbe1250: { cmd: "enter", room: "r15Pasillo", label: "pasillo", point: [60, 95], enterPoint: [115, 85], obstacle: false },

            // #ff00ff
            hff00ff: { cmd: "text", label: "arcade", txt: "Juega.", iframe: false, url:"https://ludipe.itch.io/art", lines: 1, point: [36, 80], obstacle: false },
            // #ff9900
            hff9900: { cmd: "text", label: "terminal", txt: "Si quieres podemos jugar (no es obligatorio), tendremos que llegar a una página específica de la Wikipedia a partir de otra, seleccionando los enlaces en cada artículo para llegar a nuestro objetivo. ¿De qué página parto y a cuál tengo que llegar?\n\nPide a alguien en la sala que te proponga un reto (debe asegurarse de que están en la wikipedia antes de empezar a jugar).\n  Si no hay nadie cerca prueba con estos: brecha digital - gamergate", lines: 15, point: [92, 80], obstacle: false },
            // #0066ff
            h0066ff: { cmd: "text", label: "Borabora", txt: "Hola, esta es una sala para más de una persona, al menos dos son necesarias para participar ¡invita a alguien o busca gente en las otras salas!", lines: 5, point: [50, 87], obstacle: false },
        }
    },
    r17SalaCrypto: {
        bg: "/salas/r17SalaCrypto.png",
        frames: 2,
        animations: { 
            anim: [0,2],
        },
        bgScale: 2,
        bgResolution: [128, 100],
        frameDelay: 60,
        avatarScale: 3,
        pageBg: "#1c2016",
        area: "/salas/r17SalaCrypto_Int.png",
        tint: "#fdeac8",
        bubblesY: 44,
        spawn: [40, 85, 90, 95],
        areaColors: {
            //h will be replaced by #
            // #ffec27
            hffec27: { cmd: "enter", room: "r15Pasillo", label: "pasillo", point: [15, 86], enterPoint: [86, 77], obstacle: false },
            // #29adff
            h29adff: { cmd: "enter", room: "r18Biblioteca", label: "biblioteca", point: [65, 80], enterPoint: [16, 87], obstacle: false },
        }
    },
    r18Biblioteca: {
        bg: "/salas/r18Biblioteca.png",
        frameDelay: 60,
        avatarScale: 3,
        pageBg: "#1c2016",
        area: "/salas/r18Biblioteca_Int_temp.png",
        tint: "#fdeac8",
        bubblesY: 44,
        spawn: [40, 85, 90, 95],
        areaColors: {
            //h will be replaced by #
            // #aa2244
            //haa2244: { cmd: "enter", room: "r17SalaCrypto", label: "crypto", point: [15, 85], enterPoint: [86, 77], obstacle: false },
            haa2244: { cmd: "enter", room: "r15Pasillo", label: "pasillo", point: [15, 86], enterPoint: [44, 74], obstacle: false },
            // #b75714
            // hb75714: { cmd: "text", label: "ordenador", point: [64, 45], obstacle: false },
            hb75714: { cmd: "text", label: "ordenador", txt: "Introduce a continuación la clave de acceso", lines: 2, postAction: true, actionId: "Access", point: [64, 45], obstacle: false },

            // #ff00ff
            hff00ff: { cmd: "text", lines: 5, label: "1 Alfabetización digital", point: [25, 80], txt: "¡revisa de nuevo los contenidos!", iframe: true, url:"https://arsgames.net/alfabetizacion-digital/", obstacle: false },
            // #00cc99
            h00cc99: { cmd: "text", lines: 4, label: "2 Comunicación", point: [49, 80], txt: "¡revisa de nuevo los contenidos!", iframe: true, url:"https://arsgames.net/comunicacion/", obstacle: false },
            // #9900cc
            h9900cc: { cmd: "text", lines: 6, label: "3 Creación digital", point: [90, 80], txt: "¡revisa de nuevo los contenidos!", iframe: true, url:"https://arsgames.net/creacion-digital/", obstacle: false },
            // #ff9900
            hff9900: { cmd: "text", lines: 5, label: "4 Seguridad digital", point: [30, 45], txt: "¡revisa de nuevo los contenidos!", iframe: true, url:"https://arsgames.net/seguridad-digital/", obstacle: false },
            // #0066ff
            h0066ff: { cmd: "text", lines: 6, label: "5 Resolución de problemas", point: [79, 45], txt: "¡revisa los contenidos!", iframe: true, url:"https://arsgames.net/resolucion-de-problemas/", obstacle: false },

        },
        things: {
            // nota: { file: "/salas/r14Creacion_Sprite_Nota.png", id: "nota", label: "papelito", offset: 0, position: [85, 80], frames: 1, frameDelay: 60, visible: true, command: { cmd: "text", txt: "La sala de encriptación te devuelve la traducción del número en código binario.\n\nPara conocer el código binario que te abrirá las puertas suma todos los números que has ido recolectando a lo largo de todo el juego.", lines: 9, point: [80, 80] } }
        }
    },
};