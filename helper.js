function draw(gl, drawMode, point_array, subarrayLen){
    gl.drawArrays(drawMode, 0, point_array.length/subarrayLen);
  }

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