class Person{
    //I am copying the proportions from Minecraft Steve
    // Head 8 blocks square
    // arms 4 blocks wide 4 deep 12 high
    // legs == arms
    //torso 12 blocks high 4 deep 8 wide

    constructor(size=15){
        //assembler body
        
    /*bgImages
    0-left
    1-top
    2-bottom
    3-front
    4-right
    5-back

    */
   let headImages =[
    'assets/images/rightLateralHead.jpg',
       'assets/images/backHead.jpg',
       'assets/images/bottomHead.jpg',
       'assets/images/frontHead.jpg',
       'assets/images/lateralHead.jpg',
       'assets/images/backHead.jpg'
   ]

   let torsoImages = [
    'assets/images/shirt.jpg',
    'assets/images/shirt.jpg',
    'assets/images/shirt.jpg',
    'assets/images/shirt.jpg',
    'assets/images/shirt.jpg',
    'assets/images/shirt.jpg'
   ]

   let armsImages = [
    'assets/images/arms.jpg',
    'assets/images/arms.jpg',
    'assets/images/armBottom.jpg',
    'assets/images/arms.jpg',
    'assets/images/arms.jpg',
    'assets/images/arms.jpg'
   ]
   let legsImages = [
    'assets/images/legOutSide.jpg',
    'assets/images/legs.jpg',
    'assets/images/legBottom.jpg',
    'assets/images/legs.jpg',
    'assets/images/legsIn.jpg',
    'assets/images/leftLeg.jpg'

   ]

   let leftLegImages = [
    'assets/images/legsIn.jpg',
    'assets/images/leftLeg.jpg',
    'assets/images/legBottom.jpg',
    'assets/images/leftLeg.jpg',
    'assets/images/legOutSide.jpg',
    'assets/images/legs.jpg'
   ]
        this.size = size;
        this.rightArm = new Limb(4*size,4*size,12*size,armsImages,'right');
        this.leftArm = new Limb(4*size,4*size,12*size,armsImages,'left');
        this.rightLeg = new Limb(4*size,4*size,12*size,legsImages,'right');
        this.leftLeg = new Limb(4*size,4*size,12*size,leftLegImages,'left');
        this.head = new Head(8*size,headImages,4*size);
        this.torso = new Torso(8*size,4*size,12*size,torsoImages);
        this.stepDistance = 12*size;
        this.assemble();
        this.movements = [];
        this.movingQue = [];
        this.movementsQue = [];
        this.walking = false;
        this.stepSpeed = 500;
        this.walkingForward = false;
        this.walkingBackward = false;
    }

    assemble(){
        this.scene = document.createElement('div');
        this.scene.style = "transform-style: preserve-3d; perspective:100000px";
        this.body = document.createElement('div');
        this.body.style = "position: relative; transform-style: preserve-3d;transform: translateZ(-"+parseInt(this.size*8/2)+"px);";
        this.upperBody = document.createElement('div');
        this.upperBody.classList.add('upper-body');
        let container = document.createElement('div');
        container.classList.add('row');
        container.append(this.rightArm.scene,this.torso.scene,this.leftArm.scene);
        this.upperBody.append(this.head.scene,container);
        this.lowerBody = document.createElement('div');
        this.lowerBody.classList.add('lower-body');
        this.lowerBody.append(this.rightLeg.scene, this.leftLeg.scene);
        this.body.append(this.upperBody,this.lowerBody);
        this.bodyObj = new Move(this.body);
        this.scene.append(this.body);
    }

    walk(speed=1,distance,time=null){
        //calculate distance that moves for each step
        let stepsNum = parseInt(distance/this.stepDistance);
        let stepSpeed = 500*speed;
        if(time){
                stepSpeed = time/stepsNum;
        }else{
            time = stepSpeed*stepsNum;
        }
        console.log(stepSpeed);
        console.log(stepsNum);

        this.translateBody(distance,time*2+(stepSpeed*2));
        //move arms and legs
        //right leg with left arm and vice versa
        this.move1('leftLeg','moveForward',stepSpeed,70,1);
        this.move1('rightArm','moveForward',stepSpeed,70,3);
        this.move1('rightLeg','moveBackwards',stepSpeed,70,2);
        this.move1('leftArm','moveBackwards',stepSpeed,70,4);
        for(let i=0;i<stepsNum;i++){
            this.move1('rightLeg','moveForward',stepSpeed,140,1);
            this.move1('leftArm','moveForward',stepSpeed,140,4);
            this.move1('leftLeg','moveBackwards',stepSpeed,140,2);
            this.move1('rightArm','moveBackwards',stepSpeed,140,3);

            this.move1('leftLeg','moveForward',stepSpeed,140,1);
            this.move1('rightArm','moveForward',stepSpeed,140,3);
            this.move1('rightLeg','moveBackwards',stepSpeed,140,2);
            this.move1('leftArm','moveBackwards',stepSpeed,140,4);
        }
        this.move1('rightLeg','moveForward',stepSpeed,70,1);
        this.move1('leftArm','moveForward',stepSpeed,70,4);
        this.move1('leftLeg','moveBackwards',stepSpeed,70,2);
        this.move1('rightArm','moveBackwards',stepSpeed,70,3);

    }

    startWalk(){
        this.move1('leftLeg','moveForward',this.stepSpeed,70,1);
        this.move1('rightArm','moveForward',this.stepSpeed,70,3);
        this.move1('rightLeg','moveBackwards',this.stepSpeed,70,2);
        this.move1('leftArm','moveBackwards',this.stepSpeed,70,4);
    }
    endWalk(){
        this.move1('rightLeg','moveForward',this.stepSpeed,70,1);
        this.move1('leftArm','moveForward',this.stepSpeed,70,4);
        this.move1('leftLeg','moveBackwards',this.stepSpeed,70,2);
        this.move1('rightArm','moveBackwards',this.stepSpeed,70,3);

    }
    fullStep(){
        this.translateBody(this.stepDistance,this.stepSpeed*4)
        this.move1('rightLeg','moveForward',this.stepSpeed,140,1);
        this.move1('leftArm','moveForward',this.stepSpeed,140,4);
        this.move1('leftLeg','moveBackwards',this.stepSpeed,140,2);
        this.move1('rightArm','moveBackwards',this.stepSpeed,140,3);

        this.move1('leftLeg','moveForward',this.stepSpeed,140,1);
        this.move1('rightArm','moveForward',this.stepSpeed,140,3);
        this.move1('rightLeg','moveBackwards',this.stepSpeed,140,2);
        this.move1('leftArm','moveBackwards',this.stepSpeed,140,4);
        setTimeout(()=>this.walkingForward=false,this.stepSpeed*2);
    }

    translateBody(pos,time){
        let periods = time/5;
        let step = pos/periods;

        let move = setInterval(()=>{
            periods--
            this.bodyObj.translateXYZ(0,0,step);
            if(periods<=0){
                console.log('STOP');
                clearInterval(move);
            }

        },5);
    }
    jump(){

    }
    turnRight(deg){
        this.bodyObj.rotateY(deg);
    }

    turnLeft(){

    }

    turnHead(deg,ms=1000){
        this.move1('head','rotateY',ms,deg,1);
    }

    lookUp(deg,ms){
        this.move1('head','rotateX',ms,-deg,1);

    }
    lookDown(deg,ms){
        this.move1('head','rotateX',ms,deg,1);
    }
    wave(arm='leftArm',speed=1){
        if(arm!=='leftArm' && arm!=='rightArm'){
            arm = 'leftArm';
        }
        console.log(arm);
        this.move(arm,'moveForward',500*speed,170);
        this.move(arm,'raise',250*speed,50);
        this.move(arm,'descend',500*speed,100);
        this.move(arm,'raise',500*speed,100);
        this.move(arm,'descend',500*speed,100);
        this.move(arm,'raise',500*speed,100);
        this.move(arm,'descend',250*speed,50);
        this.move(arm,'moveBackwards',500*speed,170);

    }

    //we need to make sure that the previous action is finished
    move(bodyPart,action,time,finalPos){
        if(this.moving){
            let moveInfo = [bodyPart,action,time,finalPos];
            this.movements.push(moveInfo);
            return false;
        }
        this.moving = true;
        let periods = time/2;
        let deg =finalPos/periods;
        let move = setInterval(()=>{
            this[bodyPart][action](deg)
            periods--;
            if(periods==0){
                clearInterval(move);
                this.moving = false;
                if(this.movements.length>0){
                    let data = this.movements.shift();
                    this.move(...data);
                }
            }
        },2);
    }

    move1(bodyPart,action,time,finalPos,que){
        if(this.movingQue[que]){
            let moveInfo = [bodyPart,action,time,finalPos,que];
            if(this.movementsQue[que]===undefined){
                this.movementsQue[que]=[];
            }
            this.movementsQue[que].push(moveInfo);
            return false;
        }
        this.movingQue[que] = true;
        let periods = time/5;
        let deg =finalPos/periods;
        let move = setInterval(()=>{
            this[bodyPart][action](deg)
            periods--;
            if(periods<=0){
                clearInterval(move);
                this.movingQue[que] = false;
                if(this.movementsQue[que] && this.movementsQue[que].length>0){
                    let data = this.movementsQue[que].shift();
                    this.move1(...data);
                }
            }
        },5);
    }


    walkForward(){
        if(!this.walkingForward){
            if(!this.walkStarted){
                this.startWalk();
                this.walkStarted = true;
                this.translateBody(this.stepDistance/2,this.stepSpeed)
            }
            this.walkingForward = true;
            this.fullStep();
            
        }
        
    }
    stopWalking(){

        setTimeout(()=>{
            this.endWalk();
            this.walkStarted = false;
        },100);
    }
    walkBackward(){

    }

}
