//settings are just variables that can be sent to the client from the server
//they are either related to the rooms or shared with the server 
module.exports.SETTINGS = {
    //if not specified by the url where is the starting point
    defaultRoom: "r01Patio",
    //minimum time between talk messages enforced by both client and server
    ANTI_SPAM: 1000,
    //shows up at first non lurking login
    INTRO_TEXT: "Click/tap to move",
};

//miscellaneous assets to preload
module.exports.IMAGES = [
];

//miscellaneous sounds to preload
module.exports.SOUNDS = [
    ["beat1", "beat1.ogg"], //credit https://www.youtube.com/watch?v=ugLVpZm69DE
    ["beat2", "beat2.ogg"], // credit https://www.youtube.com/watch?v=dPdoxIz0w24
    ["beat3", "beat3.ogg"], //credit https://www.youtube.com/watch?v=XShEWT4MwJs
    ["DJStop", "DJStop.mp3"]
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
            h0066ff: { cmd: "text", label: "créditos", txt:"aquí irán los creditos", lines: 8, point: [50, 80], obstacle: false },
            // #ff9900
            hff9900: { cmd: "enter", room: "r02Entrada", label: "entrada", point: [64, 60], enterPoint: [65, 95], obstacle: false },
        }
    },
    r02Entrada: {
        bg: "/salas/r02Entrada_Fondo.png",
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
            hff9900: { cmd: "enter", room: "r03Cookies", label: "malware de secuestro de datos", point: [32, 72], enterPoint: [70, 95], obstacle: false },
        },
        things: {
            mesa: { file: "salas/r02Entrada_Sprite_Mesa.png", id: "mesa", offset: 7.5, scale: 2, position: [44, 57], frames: 1, frameDelay: 60, visible: true, },
            pantalla1: { file: "salas/r02Entrada_Sprite_Pantalla01.png", id: "pantalla1", offset: 7.5, scale: 2, position: [44, 24], frames: 1, frameDelay: 60, visible: true, },
            pantalla2: { file: "salas/r02Entrada_Sprite_Pantalla02.png", id: "pantalla2", label: "encuesta",  offset: 7.5, scale: 2, position: [44, 24], frames: 1, frameDelay: 60, visible: false, command: { cmd: "text", txt: "a continuacion de este mensaje va la encuesta", lines: 2, postAction: true, pool: "pool1", section: "pool-section", actionId: "Survey1",  label: "encuesta", point: [65, 95], obstacle: false } },
        }
    },
    r03Cookies: {
        bg: "/salas/r03Cookies.png",
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
            //
            // // CONVERTIR EN objeto
            // // #ff00ff
            // hff00ff: { cmd: "text", label: "mostruo de las galletas", txt: "¿Aceptaste las cookies? Cuidado, no todas las cookies son lo que parecen. Mira este video para descubrirlo, además te recomiendo fijarte en el precio del paraguas. Cuando lo hayas visto sal por la puerta de las cookies que son más peligrosas.", lines: 8, url: "https://www.youtube.com/embed/4n2Syt0P4js", iframe: true, point: [87, 89], obstacle: false },
        },
        things: {
            cookieMonsterA: { file: "salas/r03Cookies_Monster_Sprite_A.png", id: "cookie-monsterA", position: [91, 67], label: "mostruo de las galletas", frames: 1, frameDelay: 30, visible: true, },
            cookieMonsterB: { file: "salas/r03Cookies_Monster_Sprites.png", id: "cookie-monsterB", position: [91, 67], label: "mostruo de las galletas", frames: 2, frameDelay: 30, visible: false, command: { cmd: "text", label: "mostruo de las galletas", txt: "¿Aceptaste las cookies? Cuidado, no todas las cookies son lo que parecen. Mira este video para descubrirlo, además te recomiendo fijarte en el precio del paraguas. Cuando lo hayas visto sal por la puerta de las cookies que son más peligrosas.", lines: 8, url: "https://www.youtube.com/embed/4n2Syt0P4js", iframe: true, point: [84, 89], obstacle: false } },
            // command: { cmd: "text", txt: "", lines: 2, postAction: true, actionId: "Survey1",  label: "???", point: [65, 95], obstacle: false } },
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
        frameDelay: 30,
        avatarScale: 3,
        pageBg: "#1c2016",
        area: "/salas/r06Reciclaje2_Int.png",
        tint: "#fdeac8",
        bubblesY: 44,
        spawn: [58, 69, 75, 75],
        areaColors: {
            //h will be replaced by #
            // #29adff
            h29adff: { cmd: "enter", room: "r08Huella", label: "huella", point: [68, 47], enterPoint: [92, 95], obstacle: false },
            // #ffec27
            hffec27: { cmd: "enter", room: "r07Marionetas", label: "marionetas", point: [10, 85], enterPoint: [115, 86], obstacle: false },
            // #0066ff
            h0066ff: { cmd: "text", label: "residuo", point: [86, 87], obstacle: false },
            // #00cc99
            h00cc99: { cmd: "text", label: "papelera", point: [60, 80], obstacle: false },
            // #ff00ff
            hff00ff: { cmd: "text", label: "papelera", point: [60, 80], obstacle: false },
            // #ff9900
            hff9900: { cmd: "text", label: "residuo", point: [40, 80], obstacle: false },
        },
        things: {
            papelera1: { file: "salas/r06Reciclaje_Sprites_NPCsA.png", id: "papelera1", position: [40, 100 - 19], label: "papelera", frames: 2, frameDelay: 60, visible: true, },
            papelera2: { file: "salas/r06Reciclaje_Sprites_NPCsB.png", id: "papelera2", position: [60, 100 - 19], label: "papelera", frames: 2, frameDelay: 60, visible: true, },
            // components
            monitor: { command: { cmd: "action", actionId: "Monitor", point: [46, 75] }, file: "salas/r06Reciclaje_Sprite_Monitor.png", id: "Monitor", position: [15, 26], label: "Monitor", frames: 1, frameDelay: 60, visible: false, },
            placa: { command: { cmd: "action", actionId: "Placa", point: [59, 68] }, file: "salas/r06Reciclaje_Sprite_Placa.png", id: "Placa", position: [40, 38], label: "Placa", frames: 1, frameDelay: 60, visible: false, },
            teclado: { command: { cmd: "action", actionId: "Teclado", point: [83, 67] }, file: "salas/r06Reciclaje_Sprite_Teclado.png", id: "Teclado", position: [80, 30], label: "Teclado", frames: 1, frameDelay: 60, visible: false, },
            mouse: { command: { cmd: "action", actionId: "Mouse", point: [110, 77] }, file: "salas/r06Reciclaje_Sprite_Mouse.png", id: "Mouse", position: [105, 50], label: "Mouse", frames: 1, frameDelay: 60, visible: false, },
            // command: { cmd: "text", txt: "", lines: 2, postAction: true, actionId: "Survey1",  label: "???", point: [65, 95], obstacle: false } },
        }
    },
    r07Marionetas: {
        frames: 4,
        bg: "/salas/r07Marionetas.png",
        frameDelay: 30,
        avatarScale: 3,
        pageBg: "#1c2016",
        area: "/salas/r07Marionetas_Int.png",
        tint: "#fdeac8",
        bubblesY: 44,
        spawn: [58, 80, 75, 95],
        areaColors: {
            // #00e436
            h00e436: { cmd: "enter", room: "r06Reciclaje", label: "reciclaje", point: [120, 85], enterPoint: [16, 85], obstacle: false },
            // #ffec27
            hffec27: { cmd: "enter", room: "r08Huella", label: "huella", point: [10, 86], enterPoint: [36, 95], obstacle: false },
        }
    },
    r08Huella: {
        bg: "/salas/r08Huella.png",
        frames: 2,
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
            h00e436: { cmd: "enter", room: "r03Cookies", label: "cookies", point: [120, 84], enterPoint: [10, 85], obstacle: false },
            // #ff77a8
            hff77a8: { cmd: "enter", room: "r10Nubes", label: "La nube", point: [98, 72], enterPoint: [60, 98], obstacle: false },
            // #29adff
            h29adff: { cmd: "enter", room: "r10Nubes", label: "La nube", point: [32, 72], enterPoint: [60, 98], obstacle: false },
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
            h999900: { cmd: "text", label: "espejo 3", txt: "Sé donde has estado y otros también lo saben... ¿quieres revisar tu historial de ubicaciones?", url: "https://www.google.com/maps/timeline", lines: 4, iframe: true, point: [36, 84], obstacle: false },
            // #0f8a61
            h0f8a61: { cmd: "text", label: "espejo 4", txt: "¿No quieres que sepan dónde has estado? Resuélvelo en simples pasos:", url: "https://datadetoxkit.org/es/privacy/essentials/#step-2", lines: 3, iframe: true, point: [87, 84], obstacle: false },
            // #ff00ff
            hff00ff: { cmd: "text", label: "espejo 5", txt: "Revisa también muchas otras cosas que saben de ti y decide si prefieres mantener tu privacidad.", url: "https://datadetoxkit.org/es/privacy/degooglise/", lines: 3, iframe: true, point: [87, 84], obstacle: false },
            // #00cc99
            h00cc99: { cmd: "text", label: "espejo 6", txt: "¡Genial! Si te interesa saber más sobre seguridad en la red, por aquí te dejamos información más amplia: ", lines: 4, url: "https://arsgames.net/wp-content/uploads/2019/02/manual-de-seguridad-digital.pdf", iframe: true, point: [87, 84], obstacle: false },
        },
        things: {
            personaje: { file: "salas/r08Huella_NPC_Sprite.png", id: "personaje", offset: 2, position: [60, 77 - 11], frames: 4, frameDelay: 30, visible: true, label: "HuellaTRON", command: { cmd: "text", txt: "Uy si, las cookies de terceros son peligrosas para tu privacidad, seguro ya has aceptado muchas ¿revisamos tu huella digital?", lines: 4, point: [69, 88], obstacle: false }},
            // command: { cmd: "text", txt: "", lines: 2, postAction: true, actionId: "Survey1",  label: "???", point: [65, 95], obstacle: false } },
        }
        
    },
    r09FakeNews: {
        bg: "/salas/r09FakeNews.png",
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
            h00e436: { cmd: "enter", room: "r08Huella", label: "huella", point: [120, 85], enterPoint: [10, 85], obstacle: false },
            // #ffec27
            hffec27: { cmd: "enter", room: "r10Nubes", label: "nubes", point: [10, 85], enterPoint: [60, 98], obstacle: false },
            // #00cc99
            h00cc99: { cmd: "text", label: "news1", point: [97, 80], obstacle: false, txt: "hay que poner algo", url:"https://juego.verdaderofalso.com/", iframe: true },
            // #ff00ff
            hff00ff: { cmd: "text", label: "news2", point: [30, 80], obstacle: false, txt: "hay que poner algo", url:" https://datadetoxkit.org/es/misinformation/healthhoax/", iframe: true},
            // #9900cc
            h9900cc: { cmd: "text", label: "M. Fake", txt: "¡No soporto las fake news! Maldita desinformación ¿sabes reconocerlas? Mientras juegas fíjate en el año de las noticias mostradas en el juego, si eliminas los números que se repiten, puedes restar al resultado el precio del paraguas.", lines: 8, point: [69, 80], obstacle: false },
        }
    },
    r10Nubes: {
        bg: "/salas/r10Nubes.png",
        frameDelay: 60,
        avatarScale: 3,
        pageBg: "#1c2016",
        area: "/salas/r10Nubes_Int.png",
        tint: "#fdeac8",
        bubblesY: 44,
        spawn: [40, 85, 90, 95],
        areaColors: {
            //h will be replaced by #

            // HABRIA QUE PONER OTRA SALIDA???
            // #ff0000
            hff0000: { cmd: "enter", room: "r08Huella", label: "huella", point: [60, 98], enterPoint: [32, 72], obstacle: false },
            // #ff77a8
            hff77a8: { cmd: "enter", room: "r13Netiqueta", label: "planta -1", point: [86, 77], enterPoint: [60, 95], obstacle: false },
            // #b75714
            hb75714: { cmd: "text", label: "cartel", txt: "Revisa bien los cables, el número de conexiones de las Baleares", lines: 2, point: [60, 80], obstacle: false },
            // #ff9900
            hff9900: { cmd: "text", label: "nube mediana", point: [60, 80], obstacle: false },
            // #689156
            h689156: { cmd: "text", label: "nube grande", txt:"La nube no es lo que parece, está compuesta de servidores y enormes cables que recorren el globo", lines: 3, point: [60, 80], obstacle: false },
            // #ff00ff
            hff00ff: { cmd: "text", label: "nube oscura 1", txt: "¿Tienes una web propia? ¿hay una web que te encante visitar? Aquí puedes ver el impacto que tiene en huella de carbono:", url: "https://www.websitecarbon.com/", iframe: true, lines: 4, point: [40, 80], obstacle: false },
            // #0066ff
            h0066ff: { cmd: "text", label: "nube oscura 2", txt: "¡Internet contamina! Mira cuanto (embeber nada más la infografía que se mueve. Si pudiésemos hacerla nosotros en castellano mucho mejor ", url: "https://www.ticbeat.com/innovacion/huella-carbono-internet/", iframe: true, lines: 5, point: [60, 85], obstacle: false },
            // #9900cc
            h9900cc: { cmd: "text", label: "nube oscura 3", txt: "hacer una infografía similar a esta, que muestre más información y datos.", url: "https://www.custommade.com/blog/carbon-footprint-of-internet/", iframe: true, lines: 3, point: [80, 80], obstacle: false },
        }
    },
    r11Lago: {
        bg: "/salas/r11Lago.png",
        frameDelay: 60,
        avatarScale: 3,
        pageBg: "#1c2016",
        area: "/salas/r11Lago_Int.png",
        tint: "#fdeac8",
        bubblesY: 44,
        spawn: [40, 85, 90, 95],
        areaColors: {
            //h will be replaced by #
            // #be1250
            hbe1250: { cmd: "enter", room: "r10Nubes", label: "nubes", point: [60, 95], enterPoint: [86, 77], obstacle: false },
        }
    },
    r12Resolucion: {
        bg: "/salas/r12Resolucion.png",
        frames: 2,
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
            h00e436: { cmd: "enter", room: "r14Creacion", label: "Planta 2", point: [110, 89], enterPoint: [15, 85], obstacle: false },
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
        }
    },
    r13Netiqueta: {
        bg: "/salas/r13Netiqueta.png",
        frameDelay: 60,
        avatarScale: 3,
        pageBg: "#1c2016",
        area: "/salas/r13Netiqueta_Int.png",
        tint: "#fdeac8",
        bubblesY: 44,
        spawn: [40, 85, 90, 95],
        areaColors: {
            //h will be replaced by #
            // #be1250
            hbe1250: { cmd: "enter", room: "r10Nubes", label: "nubes", point: [60, 95], enterPoint: [86, 77], obstacle: false },
        },
        things: {
            cabinet: { file: "pico-cabinet.png", id: "cabinet", offset: 9, position: [25, 64], frames: 1, frameDelay: 60, visible: true, label: "ascensor", command: { cmd: "text", actionId: "Cabinet", txt: "Oh, un teletransporte", lines: 1, point: [38, 86] } },
        }
    },
    r14Creacion: {
        bg: "/salas/r14Creacion.png",
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
            hff9900: { cmd: "text", txt: "algo del dibujo", url: "https://www.iloveimg.com/es/crear-meme", iframe: true, label: "Memes", point: [29, 85], obstacle: false },
            // #0066ff
            h0066ff: { cmd: "text", txt: "algo del dibujo", url: "https://audio-joiner.com/es/", iframe: true, label: "Sonido", point: [47, 85], obstacle: false },
            // #999900
            h999900: { cmd: "text", txt: "twine + scratch + bitsi", url: "", iframe: true, label: "Videojuegos", point: [66, 85], obstacle: false },
            // #0f8a61
            h0f8a61: { cmd: "text", txt: "mozilla hubs", url: "", iframe: true, label: "Realidad aumentada", point: [84, 85], obstacle: false },
            // #98504f
            h98504f: { cmd: "text", txt: "algo del dibujo", url: "https://appinventor.mit.edu/", iframe: true, label: "Apps", point: [103, 85], obstacle: false },
        }
    },
    r15Pasillo: {
        bg: "/salas/r09FakeNews.png",
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
            h00e436: { cmd: "enter", room: "r16Colabora", label: "colabora", point: [115, 85], enterPoint: [45, 96], obstacle: false },
            // #ffec27
            hffec27: { cmd: "enter", room: "r14Creacion", label: "creacion", point: [15, 85], enterPoint: [110, 85], obstacle: false },
            // // #00cc99
            // h00cc99: { cmd: "text", label: "news", point: [97, 80], obstacle: false },
            // // #ff00ff
            // hff00ff: { cmd: "text", label: "news", point: [30, 80], obstacle: false },
            // #9900cc
            h9900cc: { cmd: "enter", room: "r17SalaCrypto", label: "cripto", point: [70, 80], enterPoint: [15, 85], obstacle: false },
        }
    },
    r16Colabora: {
        bg: "/salas/r16Colabora.png",
        frameDelay: 60,
        avatarScale: 3,
        pageBg: "#1c2016",
        area: "/salas/r16Colabora_Int.png",
        tint: "#fdeac8",
        bubblesY: 44,
        spawn: [40, 85, 90, 95],
        areaColors: {
            //h will be replaced by #
            // #be1250
            hbe1250: { cmd: "enter", room: "r15Pasillo", label: "pasillo", point: [60, 95], enterPoint: [115, 85], obstacle: false },

            // #ff00ff
            hff00ff: { cmd: "text", label: "arcade", point: [36, 80], obstacle: false },
            // #ff9900
            hff9900: { cmd: "text", label: "terminal", point: [92, 80], obstacle: false },
            // #0066ff
            h0066ff: { cmd: "text", label: "robot", txt: "Hola, esta es una sala para más de una persona, al menos dos son necesarias para participar ¡invita a alguien o busca gente en las otras salas!", lines: 5, point: [50, 87], obstacle: false },
        }
    },
    r17SalaCrypto: {
        bg: "/salas/r17SalaCrypto.png",
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
            haa2244: { cmd: "enter", room: "r17SalaCrypto", label: "crypto", point: [15, 85], enterPoint: [86, 77], obstacle: false },
            // #b75714
            hb75714: { cmd: "text", label: "ordenador", point: [64, 45], obstacle: false },

            // #ff00ff
            hff00ff: { cmd: "text", label: "libros", point: [25, 80], txt: "", iframe: true, url:"", obstacle: false },
            // #00cc99
            h00cc99: { cmd: "text", label: "libros", point: [49, 80], txt: "", iframe: true, url:"", obstacle: false },
            // #9900cc
            h9900cc: { cmd: "text", label: "libros", point: [90, 80], txt: "", iframe: true, url:"", obstacle: false },
            // #ff9900
            hff9900: { cmd: "text", label: "libros", point: [30, 45], txt: "", iframe: true, url:"", obstacle: false },
            // #0066ff
            h0066ff: { cmd: "text", label: "libros", point: [79, 45], txt: "", iframe: true, url:"", obstacle: false },

        }
    },
};