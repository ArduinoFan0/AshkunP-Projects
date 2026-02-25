{
    function new_window(){
        window.open("./game.html", undefined, "popup=true")
    }
    const game_canvas = document.getElementById("game-canvas")
    if(game_canvas !== null){
        const renderer = game_canvas.getContext("2d")
        renderer.willReadFrequently = true
        let mouse = [0,0,0]
        let ticks = 0
        function mouse_event_handler(event){
            mouse[0] = event.clientX
            mouse[1] = event.clientY
            mouse[2] = event.buttons
        }
        function rectangle(){
            if(mouse[2]&1){
                renderer.fillRect(mouse[0],mouse[1], 10,10)
            }

        }
        GameLogic = new GameLogic([mouse, ticks, renderer])
        GameLogic.initGame()
        function game(){
            const imagedata = renderer.getImageData(0,0,renderer.canvas.width,renderer.canvas.height)
            game_canvas.setAttribute("width", window.innerWidth.toString())
            game_canvas.setAttribute("height", window.innerHeight.toString())
            renderer.putImageData(imagedata,0,0)
            ticks++
            GameLogic.tick()
            setTimeout(() => {game()}, 15)
        }
        game_canvas.addEventListener("mousedown", mouse_event_handler)
        game_canvas.addEventListener("mouseup", mouse_event_handler)
        game_canvas.addEventListener("mousemove", mouse_event_handler)
        game_canvas.addEventListener("close", GameLogic.quit())


        game()

    }
    else{
        console.error("Couldn't find game canvas")
    }

}