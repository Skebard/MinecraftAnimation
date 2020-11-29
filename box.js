class Box extends Move{

    
    /**
     * 
     * @param {int} length -Pixels
     * @param {int} width - Pixels
     * @param {int} height - Pixels
     */
    constructor(length,width,height,transformOrigin='center',translateZ=true){
        super();
        this.length = length;
        this.width = width;
        this.height = height;
        this.xCenter = parseInt(this.length/2);
        this.yCenter = parseInt(this.height/2);
        this.zCenter = parseInt(this.width/2);
        this.scene = this.createScene(1000);
        this.scene.appendChild(this.createBox(transformOrigin,translateZ));
        this.obj = this.box;

    }

    createBox(transformOrigin,translateZ){
        let box = document.createElement('div');
        let style = "height:"+this.height+"px; width:"+this.length+"px;   position: relative; transform-style: preserve-3d; transform-origin:"+transformOrigin+";";
        if(translateZ===true){
            style +="transform: translateZ("+parseInt(-this.width/2)+ "px);";
        }else{
            //style +="transform: translateZ( 1px);";
            style +="transform: translateZ("+parseInt(-translateZ/2)+"px);";
        }
        box.style  = style;
        //box.style += "transform-origin:"+transformOrigin+";";
        box.append(this.createFront(),this.createBack(),this.createLeft(),this.createRight(),this.createTop(),this.createBottom());
        this.box = box;
        return box;
    }
    createFront(){
        let styles = 'transform: rotateY(  0deg) translateZ( '+ parseInt(this.width/2)+'px);';
        styles += "width:"+this.length+"px;height:"+this.height+"px;";
        styles += 'background: hsla(  0, 100%, 50%, 0.7);';
  
        let face = this.createFace(styles);
        return face;
    }
    createBack(){
        let styles = 'transform: rotateY(  180deg) translateZ( '+ parseInt(this.width/2)+'px);'
        styles += "width:"+this.length+"px;height:"+this.height+"px;";
        styles += 'background: hsla(120, 100%, 50%, 0.7);';
        let face = this.createFace(styles);
        return face;
    }
    createLeft(){
        let styles = 'transform: rotateY(  -90deg) translateZ( '+ parseInt(this.length/2)+'px);'
        styles += "width:"+this.width+"px;height:"+this.height+"px;";
        styles += 'background: hsla(180, 100%, 50%, 0.7);';
        styles +='left:'+(this.length-this.width)/2+'px'; //center the face
        let face = this.createFace(styles);
        return face;

    }
    createRight(){
        let styles = 'transform: rotateY(  90deg) translateZ( '+ parseInt(this.length/2)+'px);'
        styles += "width:"+this.width+"px;height:"+this.height+"px;";
        styles += 'background: hsla( 60, 100%, 50%, 0.7);';
        styles +='left:'+(this.length-this.width)/2+'px';
        let face = this.createFace(styles);
        return face;

    }
    createTop(){
        let styles = 'transform: rotateX(  90deg) translateZ( '+ parseInt(this.height/2)+'px);'
        styles += "width:"+this.length+"px;height:"+this.width+"px;";
        styles += 'background: hsla(240, 100%, 50%, 0.7);';
        styles +='top:'+(this.height-this.width)/2+'px';//center the face
        let face = this.createFace(styles);
        return face;

    }
    createBottom(){
        let styles = 'transform: rotateX(  -90deg) translateZ( '+ parseInt(this.height/2)+'px);'
        styles += "width:"+this.length+"px;height:"+this.width+"px;";
        styles += 'background: hsla(300, 100%, 50%, 0.7);';
        styles +='top:'+(this.height-this.width)/2+'px';
        let face = this.createFace(styles);
        return face;
    }
    createFace(styles){
        let face = document.createElement('div');
        face.classList.add('box__face');
        face.style = styles;
        return face;
    }


    // width: 300px;
    // height: 200px;
    // border: 1px solid #CCC;
    // perspective: 0;
    // transform-style: preserve-3d;
    // transform: translateZ(-150px);
    createScene(perspective){
        let scene = document.createElement('div');
        scene.style = "width:"+this.length+"px;height:"+this.height+"px;perspective:"+perspective+"px;transform-style: preserve-3d;";
        return scene;
    }
}







//todo ********* MATRIX ROTATIONS **********

function eventRotate(rotateFunction, direction, element) {
    let smooth = setInterval(function () {
        rotateFunction(mainCube, ROTATE_INTERVAL * direction);
    }, 25);
    element.addEventListener("mouseout", () => {
        clearInterval(smooth);
    }, {
        once: true
    });
    element.addEventListener("mouseup", () => {
        clearInterval(smooth);
    }, {
        once: true
    });
}
