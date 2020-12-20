

let form = document.getElementById('settings-id');
let body = new Person(20)
let myBox = new Box(100,10000,150,[])
document.querySelector('.moving-area').append(body.body,myBox.scene)
body.translateBody(-15000,1000);
myBox.translateXYZ(-300,-200,-5000);
myBox.rotateY(7);

form.addEventListener('submit',setSpeed);
window.addEventListener('keydown', handleMoves);
window.addEventListener('keyup',endWalking);


let speedInput = document.getElementById('speed-id');
function setSpeed(e){
    e.preventDefault();
    body.stepSpeed = body.stepSpeed * 50/speedInput.value;
}


let pressedKeys =[];
function handleMoves(e) {
    console.log(e.code);
    if(e.code ==='ArrowDown' || e.code ==='ArrowUp' || e.code ==='ArrowLeft' || e.code ==='ArrowRight'){
        if(!pressedKeys.includes(e.code)){
            pressedKeys.push(e.code);
        }
    }
    if(pressedKeys.includes('ArrowDown')){

    }
    if(pressedKeys.includes('ArrowUp')){
        body.walkForward()
    }
    if(pressedKeys.includes('ArrowLeft')){
        body.turnRight(-1);
    }
    if(pressedKeys.includes('ArrowRight')){
        body.turnRight(1);
    }
}

function endWalking(e){
    if(pressedKeys.includes(e.code)){
        pressedKeys = pressedKeys.filter(key=>key!==e.code);
        if(e.code==='ArrowUp'){
            body.stopWalking();
        }
    }
}