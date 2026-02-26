class GameLogic {
    constructor(interfaceObjects) {
        this.mouse = interfaceObjects[0]
        this.oldmouse = []
        this.mousev = []
        this.ticks = interfaceObjects[1]
        this.canvas = interfaceObjects[2]
        this.renderer = interfaceObjects[3]
        this.renderer.width = this.canvas.width
        this.renderer.height = this.canvas.height
        this.objects = []
        this.objectTemplate = class{
            constructor(xy,xyv,wh) {
                this.dead = false
                this.offscreen = false
                this.x = xy[0]
                this.y = xy[1]
                this.xv = xyv[0]
                this.yv = xyv[1]
                this.width = wh[0]
                this.height = wh[1]
                this.size = 1.0
            }
            update(){
                this.x += this.xv
                this.y += this.yv
                this.dead = this.offscreen||(this.size<=0)
                this.size -= 0.02
            }
            draw(parent){
                this.offscreen = (this.x < 0) || (this.x > parent.canvas.width) || (this.y < 0) || (this.y > parent.canvas.height);
                parent.renderer.fillRect(this.x,this.y,this.width*this.size,this.height*this.size)
            }
        }
    }
    tick(){
        this.mousev[0] = this.mouse[0] - this.oldmouse[0]
        this.mousev[1] = this.mouse[1] - this.oldmouse[1]
        this.mousev[2] = this.mouse[2] - this.oldmouse[2]

        this.renderer.fillStyle = "#FFFFFF"
        this.renderer.fillRect(0,0,this.canvas.width,this.canvas.height)
        this.renderer.fillStyle = "#FF0000"
        if(this.mouse[2]&1){
            const newObject = new this.objectTemplate(this.mouse,this.mousev,[30,30])

            this.objects.push(newObject)
        }
        for(let i = 0; i < this.objects.length; i++){
            if(this.objects[i] === undefined){
                continue
            }
            if(this.objects[i].dead){
                delete this.objects[i]
                continue
            }
            this.objects[i].update()
            this.objects[i].draw(this)
        }
        //this.iter(this.objects, (object) => {object.update(); object.draw()})
        this.oldmouse[0] = this.mouse[0]
        this.oldmouse[1] = this.mouse[1]
        this.oldmouse[2] = this.mouse[2]

    }
    quit(){

    }
    iter(table, funct){
        for(let i = 0; i < table.length; i++){
            funct(table[i])
        }
    }

}