class GameLogic {
    renderer;
    mouse;
    ticks;
    active;
    constructor(interfaceObjects) {
        this.mouse = interfaceObjects[0]
        this.ticks = interfaceObjects[1]
        this.renderer = interfaceObjects[2]



        this.active = true
    }
    tick(){
        this.mouse[2]&1?this.renderer.fillRect(this.mouse[0], this.mouse[1],10,10):undefined
    }
    initGame(){

    }
    quit(){

    }

}