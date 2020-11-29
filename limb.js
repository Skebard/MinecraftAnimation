class Limb extends Box{
    constructor(length,width,height,position='left'){
        super(length,width,height,'top');
        if(position==='left'){
            this.pos = 1;
        }else if(position==='right'){
            this.pos = -1;
        }else{
            throw 'Parameter position must be "right" or "left"';
        }
    }

    moveForward(deg){
        this.rotateX(-deg);
    }
    moveBackwards(deg){
        this.rotateX(deg);
    }

    raise(deg){
        this.rotateZ(this.pos*deg);

    }
    descend(deg){
        this.rotateZ(-deg*this.pos);
    }

}