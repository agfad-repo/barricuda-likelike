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

    //prevent duplicate listeners
    if (!socket.hasListeners('event')) {

        socket.on("event", function (msg) {
            if (socket.id) {
                console.log('event happend');
            }
        });

        socket.on('musicOn', function (beat) {
            SOUNDS["beat" + beat].loop();
            // bg.play();
        });

        //music is playing
        socket.on('musicEnter', function (beat) {
            //start from random
            SOUNDS["beat" + beat].loop();
        });

        socket.on('musicOff', function (beat) {
            // print("The MOD module communicates with a custom socket event: music off");
            //just to be sure I stop all the beats
            SOUNDS["beat" + beat].stop();
        });

        socket.on('musicOffAll', function () {
            // print("The MOD module communicates with a custom socket event: music off");
            //just to be sure I stop all the beats
            SOUNDS["beat1"].stop();
            SOUNDS["beat2"].stop();
            SOUNDS["beat3"].stop();
            SOUNDS.DJStop.play();
        });


        //music is playing stop all bit without record scratch
        socket.on('musicExit', function () {
            SOUNDS["beat1"].stop();
            SOUNDS["beat2"].stop();
            SOUNDS["beat3"].stop();
        });
    }
}
