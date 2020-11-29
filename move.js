
class Move{

    constructor(htmlElement){
        this.obj = htmlElement;
    }

    rotateY( degrees) {
        let [cosine, sine] = calculateCosSin(degrees);
        let rotationMatrix = [
            [cosine, 0, sine, 0],
            [0, 1, 0, 0],
            [-sine, 0, cosine, 0],
            [0, 0, 0, 1]
        ];
        this.obj.style.transform = "matrix3d(" + this.getRotatedMatrix(rotationMatrix) + ")";
    }
    
     rotateX(degrees) {
        let [cosine, sine] = calculateCosSin(degrees);
        let rotationMatrix = [
            [1, 0, 0, 0],
            [0, cosine, -sine, 0],
            [0, sine, cosine, 0],
            [0, 0, 0, 1]
        ];
        this.obj.style.transform = "matrix3d(" + this.getRotatedMatrix(rotationMatrix) + ")";
    }
    
     rotateZ(degrees) {
        let [cosine, sine] = calculateCosSin(degrees);
        let rotationMatrix = [
            [cosine, -sine, 0, 0],
            [sine, cosine, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ];
        this.obj.style.transform = "matrix3d(" + this.getRotatedMatrix(rotationMatrix) + ")";
    }
    getRotatedMatrix(rotationMatrix){
        let currentMatrix = (this.currentMatrix)?this.currentMatrix: getCurrentMatrix3D(this.obj);
        let rotatedMatrix = multiplyMatrices(currentMatrix, rotationMatrix);
        rotatedMatrix[3] = currentMatrix[3]; // to avoid changing the position(translation)
        this.currentMatrix = rotatedMatrix;
        return rotatedMatrix.join();
    }
}


function rotateY(obj, degrees) {
    let [cosine, sine] = calculateCosSin(degrees);
    let rotationMatrix = [
        [cosine, 0, sine, 0],
        [0, 1, 0, 0],
        [-sine, 0, cosine, 0],
        [0, 0, 0, 1]
    ];
    let currentMatrix = getCurrentMatrix3D(obj);
    let rotatedMatrix = multiplyMatrices(currentMatrix, rotationMatrix);
    rotatedMatrix[3] = currentMatrix[3]; // to avoid changing the position(translation)
    obj.style.transform = "matrix3d(" + rotatedMatrix.join() + ")";
    // make sure that the transition is finished before next rotation;
    return rotatedMatrix;
}

function rotateX(obj, degrees) {
    let [cosine, sine] = calculateCosSin(degrees);
    let rotationMatrix = [
        [1, 0, 0, 0],
        [0, cosine, -sine, 0],
        [0, sine, cosine, 0],
        [0, 0, 0, 1]
    ];
    let currentMatrix = getCurrentMatrix3D(obj);
    let rotatedMatrix = multiplyMatrices(currentMatrix, rotationMatrix);
    rotatedMatrix[3] = currentMatrix[3]; // to avoid changing the position(translation)
    obj.style.transform = "matrix3d(" + rotatedMatrix.join() + ")";
    // make sure that the transition is finished before next rotation;
    return rotatedMatrix;
}

function rotateZ(obj, degrees) {
    let [cosine, sine] = calculateCosSin(degrees);
    let rotationMatrix = [
        [cosine, -sine, 0, 0],
        [sine, cosine, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ];
    let currentMatrix = getCurrentMatrix3D(obj);
    let rotatedMatrix = multiplyMatrices(currentMatrix, rotationMatrix);
    rotatedMatrix[3] = currentMatrix[3]; // to avoid changing the position(translation)
    obj.style.transform = "matrix3d(" + rotatedMatrix.join() + ")";
    // make sure that the transition is finished before next rotation;
    return rotatedMatrix;
}

//Returns the homogeneous matrix 4X4 of the entered 3D object
// obj (mandatory): elementHTML
function getCurrentMatrix3D(obj) {
    let matrixString = window.getComputedStyle(obj).transform;
    let matrixFloat = [
        [],
        [],
        [],
        []
    ];
    matrixString = matrixString.slice(9, -1);
    let nextComa = matrixString.indexOf(",");
    for (let m = 0; m < 4; m++) {
        for (let n = 0; n < 4; n++) {
            if (matrixString.indexOf(",") !== -1) {
                matrixFloat[m][n] = parseFloat(matrixString.slice(0, nextComa));
            } else {
                matrixFloat[m][n] = parseFloat(matrixString.slice(0));
            }
            matrixString = matrixString.slice(nextComa + 2); //delete read number
            nextComa = matrixString.indexOf(",");
        }
    }
    return matrixFloat;
}

//todo ******* MATH OPERATIONS **************

function getRandom(min, max) {
    return Math.floor((Math.random() * (max - min))) + min;

}

function calculateCosSin(degrees) {
    let angleRad = (degrees * Math.PI * 2) / 360;
    let cosine = parseFloat(Math.cos(angleRad));
    let sine = parseFloat(Math.sin(angleRad));
    return [cosine, sine];
}

//Returns the multiplication of two matrices
// both matrices must be passed as arrays where each element is an array that represent a row of the matrix
// the returned matrix will be in the same format
function multiplyMatrices(matrixA, matrixB) {
    if (matrixA[0].length !== matrixB.length) {
        console.log("Matrices can not be multiplied due to size incompatibility");
        return false;
    }
    let rows = matrixA.length;
    let columns = matrixB[0].length;
    let result = new Array(rows).fill(0).map(el => new Array(columns).fill(0));
    return result.map((row, index) => {
        return row.map((el, index1) => {
            let a = 0;
            matrixA[index].forEach((value, index2) => {
                a += value * matrixB[index2][index1];
            });
            return a;
        });
    });
}