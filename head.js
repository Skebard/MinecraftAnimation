class Head extends Box{

    constructor(size,bodyWidth=null){
        bodyWidth = (bodyWidth)?bodyWidth:2;
        super(size,size,size,'center',bodyWidth);
    }

}

/**
 * 
 * 
 * height: 50px;
 *  width: 50px; 
 * position: relative;
 *  transform-style: preserve-3d;
 *  transform-origin: center center; 
 * transform: matrix3d(1, 0, 0, 0, 0, 0.173648, -0.984808, 0, 0, 0.984808, 0.173648, 0, 0, 0, -25, 1);
 */