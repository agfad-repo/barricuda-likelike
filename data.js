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
            h0066ff: { cmd: "text", label: "créditos", point: [50, 80], obstacle: false },
            // #ff9900
            hff9900: { cmd: "enter", room: "r02Entrada", label: "entrada", point: [64, 60], enterPoint: [65, 95], obstacle: false },
        }
    },
    r02Entrada: {
        bg: "/salas/r02Entrada.png",
        frameDelay: 60,
        avatarScale: 3,
        pageBg: "#1c2016",
        area: "/salas/r02Entrada_Int.png",
        tint: "#fdeac8",
        bubblesY: 44,
        spawn: [60, 88, 70, 95],
        areaColors: {
            //h will be replaced by #
            // #ff0000
            hff0000: { cmd: "enter", room: "r01Patio", label: "patio", point: [66, 98], enterPoint: [64, 65], obstacle: false },
            // #0066ff
            h0066ff: { cmd: "enter", room: "r04SalaX", label: "?", point: [98, 72], enterPoint: [60, 95], obstacle: false },
            // #ff9900
            hff9900: { cmd: "enter", room: "r03Cookies", label: "?", point: [32, 72], enterPoint: [70, 95], obstacle: false },
            // #999900
            h999900: { cmd: "text", label: "?", point: [65, 95], obstacle: false },
            // #ff00ff
            hff00ff: { cmd: "text", label: "?", point: [65, 95], obstacle: false },
        }
    },
    r03Cookies: {
        bg: "/salas/r03Cookies.png",
        frameDelay: 60,
        avatarScale: 3,
        pageBg: "#1c2016",
        area: "/salas/r03Cookies_Int.png",
        tint: "#fdeac8",
        bubblesY: 44,
        spawn: [60, 88, 70, 95],
        areaColors: {
            //h will be replaced by #
            // #ff0000
            hff0000: { cmd: "enter", room: "r02Entrada", label: "entrada", point: [66, 98], enterPoint: [32, 72], obstacle: false },
            // #0066ff
            h0066ff: { cmd: "text", label: "galletas", point: [45, 82], obstacle: false },
            // #29adff
            h29adff: { cmd: "enter", room: "r05SalaXCopia", label: "?", point: [65, 72], enterPoint: [60, 95], obstacle: false },
            // #ffec27
            hffec27: { cmd: "enter", room: "r08Huella", label: "huella", point: [10, 85], enterPoint: [120, 84], obstacle: false },
            // #00cc99
            h00cc99: { cmd: "text", label: "robot", point: [37, 85], obstacle: false },
            //
            // CONVERTIR EN objeto
            // #ff00ff
            hff00ff: { cmd: "text", label: "mostruo de las galletas", point: [87, 89], obstacle: false },
        }
    },
    r04SalaX: {
        bg: "/salas/r04SalaX.png",
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
            h566db8: { cmd: "text", label: "?", point: [45, 82], txt: "has metido la pata, es importante que seas capaz de buscar información ¿por qué no buscas en internet o lo consultas con alguien y lo intentas de nuevo?", lines: 5, obstacle: false },
        }
    },
    r05SalaXCopia: {
        bg: "/salas/r05SalaXCopia.png",
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
            h566db8: { cmd: "text", label: "?", point: [45, 82], txt: "has metido la pata, es importante que seas capaz de buscar información ¿por qué no buscas en internet o lo consultas con alguien y lo intentas de nuevo?", lines: 5, obstacle: false },
        }
    },
    r06Reciclaje: {
        bg: "/salas/r06Reciclaje.png",
        frameDelay: 60,
        avatarScale: 3,
        pageBg: "#1c2016",
        area: "/salas/r06Reciclaje_Int.png",
        tint: "#fdeac8",
        bubblesY: 44,
        spawn: [58, 69, 75, 75],
        areaColors: {
            //h will be replaced by #
            // #29adff
            h29adff: { cmd: "enter", room: "r08Huella", label: "huella", point: [68, 47], enterPoint: [92, 95], obstacle: false },
            // #ffec27
            hffec27: { cmd: "enter", room: "r07Marionetas", label: "marionetas", point: [10, 85], enterPoint: [65, 72], obstacle: false },
            // #0066ff
            h0066ff: { cmd: "text", label: "residuo", point: [86, 87], obstacle: false },
            // #00cc99
            h00cc99: { cmd: "text", label: "papelera", point: [60, 80], obstacle: false },
            // #ff00ff
            hff00ff: { cmd: "text", label: "papelera", point: [60, 80], obstacle: false },
            // #ff9900
            hff9900: { cmd: "text", label: "residuo", point: [40, 80], obstacle: false },
        }
    },
    // r07Marionetas: {
    //     bg: "/salas/r07Marionetas.png",
    //     frameDelay: 60,
    //     avatarScale: 3,
    //     pageBg: "#1c2016",
    //     area: "/salas/r07Marionetas_Int.png",
    //     tint: "#fdeac8",
    //     bubblesY: 44,
    //     spawn: [58, 69, 75, 75],
    //     areaColors: {
    //     }
    // },
    r08Huella: {
        bg: "/salas/r08Huella.png",
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
            hff0000: { cmd: "enter", room: "r06Reciclaje", label: "reciclaje", point: [92, 95], enterPoint: [68, 47], obstacle: false },
            // #00e436
            h00e436: { cmd: "enter", room: "r03Cookies", label: "cookies", point: [120, 84], enterPoint: [10, 85], obstacle: false },
            // #ff77a8
            hff77a8: { cmd: "enter", room: "r10Nubes", label: "nubes", point: [98, 72], enterPoint: [60, 98], obstacle: false },
            // #29adff
            h29adff: { cmd: "enter", room: "r10Nubes", label: "nubes", point: [32, 72], enterPoint: [60, 98], obstacle: false },
            // #ffec27
            hffec27: { cmd: "enter", room: "r09FakeNews", label: "fake", point: [10, 85], enterPoint: [120, 86], obstacle: false },
            // #be1250
            hbe1250: { cmd: "enter", room: "r07Marionetas", label: "marionetas", point: [36, 95], enterPoint: [60, 95], obstacle: false },
            //
            // CONVERTIR EN objeto
            // #9900cc
            h9900cc: { cmd: "text", label: "personaje", txt: "Uy si, las cookies de terceros son peligrosas para tu privacidad, seguro ya has aceptado muchas ¿revisamos tu huella digital?", lines: 2, point: [69, 88], obstacle: false },
            // #ff9900
            hff9900: { cmd: "text", label: "espejo", txt: "¿Quién eres en internet? Busca tu nombre y apellidos entrecomillados en el buscador ¿que aparece?", lines: 3, point: [36, 84], obstacle: false },
            // #0066ff
            h0066ff: { cmd: "text", label: "espejo", txt: "No te gusta lo que aparece y no te gustaría que otras personas lo vieran,tienes derecho al olvido en internet, es decir, a que no aparezcas cuando te busquen. Mira cómo:", lines: 6, url: "https://www.aepd.es/es/areas-de-actuacion/internet-y-redes-sociales/derecho-al-olvido", iframe: true, point: [36, 84], obstacle: false },
            // #ff00ff
            hff00ff: { cmd: "text", label: "espejo", txt: "Sé donde has estado y otros también lo saben... ¿quieres revisar tu historial de ubicaciones?", url: "https://www.google.com/maps/timeline", lines: 4, iframe: true, point: [36, 84], obstacle: false },
            // #0f8a61
            h0f8a61: { cmd: "text", label: "espejo", txt: "¿No quieres que sepan dónde has estado? Resuélvelo en simples pasos:", url: "https://datadetoxkit.org/es/privacy/essentials/#step-2", lines: 3, iframe: true, point: [87, 84], obstacle: false },
            // #999900
            h999900: { cmd: "text", label: "espejo", txt: "Revisa también muchas otras cosas que saben de ti y decide si prefieres mantener tu privacidad.", url: "https://datadetoxkit.org/es/privacy/degooglise/", lines: 3, iframe: true, point: [87, 84], obstacle: false },
            // #00cc99
            h00cc99: { cmd: "text", label: "espejo", txt: "¡Genial! Si te interesa saber más sobre seguridad en la red, por aquí te dejamos información más amplia: ", lines: 4, url: "https://arsgames.net/wp-content/uploads/2019/02/manual-de-seguridad-digital.pdf", iframe: true, point: [87, 84], obstacle: false },
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
            h00cc99: { cmd: "text", label: "news", point: [97, 80], obstacle: false },
            // #ff00ff
            hff00ff: { cmd: "text", label: "news", point: [30, 80], obstacle: false },
            // #9900cc
            h9900cc: { cmd: "text", label: "personaje", point: [69, 80], obstacle: false },
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
            hb75714: { cmd: "text", label: "cartel", point: [60, 80], obstacle: false },
            // #ff00ff
            hff00ff: { cmd: "text", label: "nube", point: [60, 80], obstacle: false },
            // #ff9900
            hff9900: { cmd: "text", label: "nube", point: [60, 80], obstacle: false },
            // #689156
            h689156: { cmd: "text", label: "nube", point: [60, 80], obstacle: false },
            // #9900cc
            h9900cc: { cmd: "text", label: "nube", point: [60, 80], obstacle: false },
            // #0066ff
            h0066ff: { cmd: "text", label: "nube", point: [60, 80], obstacle: false },
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
        frameDelay: 60,
        avatarScale: 3,
        pageBg: "#1c2016",
        area: "/salas/r12Resolucion_Int.png",
        tint: "#fdeac8",
        bubblesY: 44,
        spawn: [40, 85, 90, 95],
        areaColors: {
            //h will be replaced by #
            // #be1250
            hbe1250: { cmd: "enter", room: "r10Nubes", label: "nubes", point: [60, 95], enterPoint: [86, 77], obstacle: false },
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
            // #be1250
            hbe1250: { cmd: "enter", room: "r10Nubes", label: "nubes", point: [60, 95], enterPoint: [86, 77], obstacle: false },
        }
    },
    // r15Pasillo: {
    //     bg: "/salas/r15Pasillo.png",
    //     frameDelay: 60,
    //     avatarScale: 3,
    //     pageBg: "#1c2016",
    //     area: "/salas/r15Pasillo_Int.png",
    //     tint: "#fdeac8",
    //     bubblesY: 44,
    //     spawn: [40, 85, 90, 95],
    //     areaColors: {
    //         //h will be replaced by #
    //         // #be1250
    //         hbe1250: { cmd: "enter", room: "r10Nubes", label: "nubes", point: [60, 95], enterPoint: [86, 77], obstacle: false },
    //     }
    // },
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
            hbe1250: { cmd: "enter", room: "r10Nubes", label: "nubes", point: [60, 95], enterPoint: [86, 77], obstacle: false },
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
            // #be1250
            hbe1250: { cmd: "enter", room: "r10Nubes", label: "nubes", point: [60, 95], enterPoint: [86, 77], obstacle: false },
        }
    },
    r18Biblioteca: {
        bg: "/salas/r18Biblioteca.png",
        frameDelay: 60,
        avatarScale: 3,
        pageBg: "#1c2016",
        area: "/salas/r18Biblioteca_Int.png",
        tint: "#fdeac8",
        bubblesY: 44,
        spawn: [40, 85, 90, 95],
        areaColors: {
            //h will be replaced by #
            // #be1250
            hbe1250: { cmd: "enter", room: "r10Nubes", label: "nubes", point: [60, 95], enterPoint: [86, 77], obstacle: false },
        }
    },
};