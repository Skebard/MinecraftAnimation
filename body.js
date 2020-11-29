class Person{
    //I am copying the proportions from Minecraft Steve
    // Head 8 blocks square
    // arms 4 blocks wide 4 deep 12 high
    // legs == arms
    //torso 12 blocks high 4 deep 8 wide

    constructor(size=15){
        //assembler body
        this.rightArm = new Limb(4*size,4*size,12*size,'right');
        this.leftArm = new Limb(4*size,4*size,12*size,'left');
        this.rightLeg = new Limb(4*size,4*size,12*size,'right');
        this.leftLeg = new Limb(4*size,4*size,12*size,'left');
        this.head = new Head(8*size)
        this.torso = new Torso(8*size,4*size,12*size);
        this.assemble();
        this.movements = [];
        this.movingQue = [];
        this.movementsQue = [];
    }

    assemble(){
        this.body = document.createElement('div');
        this.body
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
    }

    walk(speed=1){
        //move arms and legs
        //right leg with left arm and vice versa
        this.move1('leftLeg','moveForward',500,70,1);
        this.move1('rightArm','moveForward',500,70,3);
        this.move1('rightLeg','moveBackwards',500,70,2);
        this.move1('leftArm','moveBackwards',500,70,4);
        for(let i=0;i<5;i++){
            this.move1('rightLeg','moveForward',500,140,1);
            this.move1('leftArm','moveForward',500,140,4);
            this.move1('leftLeg','moveBackwards',500,140,2);
            this.move1('rightArm','moveBackwards',500,140,3);

            this.move1('leftLeg','moveForward',500,140,1);
            this.move1('rightArm','moveForward',500,140,3);
            this.move1('rightLeg','moveBackwards',500,140,2);
            this.move1('leftArm','moveBackwards',500,140,4);
        }
        this.move1('rightLeg','moveForward',500,70,1);
        this.move1('leftArm','moveForward',500,70,4);
        this.move1('leftLeg','moveBackwards',500,70,2);
        this.move1('rightArm','moveBackwards',500,70,3);



    }

    jump(){

    }

    turnHead(){

    }
    wave(arm='leftArm',speed=1){
        if(arm!=='leftArm' && arm!=='rightArm'){
            arm = 'leftArm';
        }
        console.log(arm);
        this.move(arm,'moveForward',1000*speed,170);
        this.move(arm,'raise',500*speed,50);
        this.move(arm,'descend',500*speed,100);
        this.move(arm,'raise',500*speed,100);
        this.move(arm,'descend',500*speed,100);
        this.move(arm,'raise',500*speed,100);
        this.move(arm,'descend',500*speed,50);
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
        let periods = time/2;
        let deg =finalPos/periods;
        let move = setInterval(()=>{
            this[bodyPart][action](deg)
            periods--;
            if(periods==0){
                clearInterval(move);
                this.movingQue[que] = false;
                if(this.movementsQue[que].length>0){
                    let data = this.movementsQue[que].shift();
                    this.move1(...data);
                }
            }
        },2);
    }


}

/*let body = new Person(20)
document.querySelector('body').append(body.body)
*/