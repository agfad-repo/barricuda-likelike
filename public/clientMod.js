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

function initMod(playerId, roomId) {
    print("Mod: " + players[playerId].nickName + " (you) joined the game at " + roomId);

    // add custom client listeners HERE

    // //prevent duplicate listeners
    // if (!socket.hasListeners('event')) {
    //     socket.on("event", function (msg) {
    //         if (socket.id) {
    //             console.log('event happend');
    //         }
    //     });
    // }
}

function afterPool(data) {
    console.log("Answers ", data);
}

const POOLS = {
    pool1: {
        actionId: "sendPoolfromSection",
        postAction: "afterPool",
        questions: {
            question1: {
                type: 'checkbox',
                text: '¿Qué imágenes te definen más?',
                images: true,
                options: [
                    {
                        text: "banana",
                        label: 'banana',
                        class: 'image-checkbox',
                        image: 'assets/fruits/banana.jpg',
                    },
                    {
                        text: "blueberries",
                        label: 'blueberries',
                        class: 'image-checkbox',
                        image: './assets/fruits/blueberry.jpg',
                    },
                    {
                        text: "watermelon",
                        label: 'watermelon',
                        class: 'image-checkbox',
                        image: './assets/fruits/watermelon.jpg',
                    },
                ]
            },
            question2: {
                type: 'radio',
                text: '¿sabes emplear comandos de búsquedas para obtener resultados más acertados?',
                image: 'assets/fruits/banana.jpg',
                options: [
                    {
                        text: "option 1",
                        label: 'Conozco todos esos comandos y muchos más',
                    },
                    {
                        text: "option 2",
                        label: 'Conozco algunos, otros no',
                    },
                    {
                        text: "option 3",
                        label: 'No conocía ninguno',
                    },
                ]
            },
            question3: {
                type: 'radio',
                text: 'Hace unos meses viste un video que te encantó en twitter y quieres enseñárselo a un amigo/a ¿cómo lo buscas?',
                options: [
                    {
                        text: "option 1",
                        label: 'Lo tengo en una carpeta de videos en mis marcadores'
                    },
                    {
                        text: "option 2",
                        label: 'buscando en twitter por el tema del video para volverlo a encontrar'
                    },
                    {
                        text: "option 3",
                        label: 'ufff, no creo que lo vuelva a encontrar, pero se lo cuento'
                    },
                    {
                        text: "option 3",
                        label: 'Con las opciones de búsqueda avanzada en el buscador'
                    },
                ]
            },
            question4: {
                type: 'checkbox',
                text: 'Selecciona todas las imágenes que son falsas',
                images: true,
                options: [
                    {
                        text: "banana",
                        label: 'banana',
                        class: 'image-checkbox',
                        image: 'assets/fruits/banana.jpg',
                    },
                    {
                        text: "blueberries",
                        label: 'blueberries',
                        class: 'image-checkbox',
                        image: './assets/fruits/blueberry.jpg',
                    },
                    {
                        text: "watermelon",
                        label: 'watermelon',
                        class: 'image-checkbox',
                        image: './assets/fruits/watermelon.jpg',
                    },
                ]
            },
            question5: {
                type: 'radio',
                text: 'Tus contraseñas…',
                options: [
                    {
                        text: "option 1",
                        label: 'Son algo como 1234'
                    },
                    {
                        text: "option 2",
                        label: 'Son algo como VTYf3bsu36@mp_34'
                    },
                    {
                        text: "option 3",
                        label: 'fechas, lugares o algo que tiene que ver con mi vida'
                    },
                    {
                        text: "option 4",
                        label: 'Uso la misma contraseña en todo, así no se me olvida'
                    },
                    {
                        text: "option 5",
                        label: 'No me preocupo por recordar contraseñas, tengo un gestor de contraseñas que lo hace por mi.'
                    },
                ]
            },
            question6: {
                type: 'radio',
                text: '¿Qué significa esta imagen? ',
                image: 'assets/fruits/watermelon.jpg',
                options: [
                    {
                        text: "option 1",
                        label: 'Es una licencia que dice que puedo usarlo siempre que diga de quién es',
                    },
                    {
                        text: "option 2",
                        label: 'Ni idea',
                    },
                    {
                        text: "option 3",
                        label: 'Es una licencia que dice que puedo usarlo sin modificarlo',
                    },
                ]
                
            },
            question4: {
                type: 'checkbox',
                text: '¿Cuáles de estas cosas sabes hacer?',
                images: true,
                options: [
                    {
                        text: "banana",
                        label: 'banana',
                        class: 'image-checkbox',
                        image: 'assets/fruits/banana.jpg',
                    },
                    {
                        text: "blueberries",
                        label: 'blueberries',
                        class: 'image-checkbox',
                        image: './assets/fruits/blueberry.jpg',
                    },
                    {
                        text: "watermelon",
                        label: 'watermelon',
                        class: 'image-checkbox',
                        image: './assets/fruits/watermelon.jpg',
                    },
                ]
            },
        }
    },
}