function draw(gl, shaderProgram, drawMode, vertices, dimension, subarrayLen){
  setBuffer(gl, shaderProgram, vertices, dimension, subarrayLen)
  gl.drawArrays(drawMode, 0, vertices.length/subarrayLen);
}

// function drawSevenSegment(number, x, y, length, width){
//   let segmentArray = drawSevenSegmentHelper(number);
//   if(segmentArray[0]){
//     drawSegmentOne(x, y, length, width);
//   }if(segmentArray[1]){
//     drawSegmentTwo(x, y, length, width);
//   }if(segmentArray[2]){
//     drawSegmentThree(x, y, length, width);
//   }if(segmentArray[3]){
//     drawSegmentFour(x, y, length, width);
//   }if(segmentArray[4]){
//     drawSegmentFive(x, y, length, width);
//   }if(segmentArray[5]){
//     drawSegmentSix(x, y, length, width);
//   }if(segmentArray[6]){
//     drawSegmentSeven(x, y, length, width);
//   }
// }

// function drawSevenSegmentHelper(number){
//   let segmentArray = [];
//   if(number == 0) segmentArray = [1,1,1,1,1,1,0];
//   if(number == 1) segmentArray = [0,1,1,0,0,0,0];
//   if(number == 2) segmentArray = [1,1,0,1,1,0,1];
//   if(number == 3) segmentArray = [1,1,1,1,0,0,1];
//   if(number == 4) segmentArray = [0,1,1,0,0,1,1];
//   if(number == 5) segmentArray = [1,0,1,1,0,1,1];
//   if(number == 6) segmentArray = [1,0,1,1,1,1,1];
//   if(number == 7) segmentArray = [1,1,1,0,0,0,0];
//   if(number == 8) segmentArray = [1,1,1,1,1,1,1];
//   if(number == 9) segmentArray = [1,1,1,1,0,1,1];
//   return segmentArray;
// }

function setBuffer(gl, shaderProgram, vertices, dimension, subarrayLen){
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    //Tell GPU how to collect position values from ARRAY_BUFFER for each vertex
    var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
    gl.vertexAttribPointer(aPosition, dimension, gl.FLOAT, false, subarrayLen * Float32Array.BYTES_PER_ELEMENT, 0 * Float32Array.BYTES_PER_ELEMENT);
    gl.enableVertexAttribArray(aPosition);
    
    var aColor = gl.getAttribLocation(shaderProgram, "aColor");
    gl.vertexAttribPointer(aColor, subarrayLen-dimension, gl.FLOAT, false, subarrayLen * Float32Array.BYTES_PER_ELEMENT, dimension * Float32Array.BYTES_PER_ELEMENT);
    gl.enableVertexAttribArray(aColor);
}

