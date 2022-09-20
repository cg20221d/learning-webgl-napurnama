function main(){
    let drawPoint = (gl, point_array) => {
      gl.drawArrays(gl.POINTS, 0, point_array.length/dimension);
    }

    let drawLine = (gl, point_array) => {
      gl.drawArrays(gl.LINES, 0, point_array.length/dimension);
    }

    let drawLineStrip = (gl, point_array) => {
      gl.drawArrays(gl.LINE_STRIP, 0, point_array.length/dimension);
    }

    let drawLineLoop = (gl, point_array) => {
      gl.drawArrays(gl.LINE_LOOP, 0, point_array.length/dimension);
    }

    let drawTriangle = (gl, point_array) => {
      gl.drawArrays(gl.TRIANGLES, 0, point_array.length/dimension);
    }

    let drawTriangleStrip = (gl, point_array) => {
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, point_array.length/dimension);
    }

    let canvas = document.getElementById("myCanvas");
    let gl = canvas.getContext("webgl");
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    const dimension = 2;
    var vertices = [
        0.0, 0.0,
        1.0, 0.0,
        -1.0, 0.0,
        0.0, 1.0,
        0.0, -1.0
    ];

    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    //#region analogous to source code
    // Vertex shader
    let vertexShaderCode = 
    `
    attribute vec2 aPosition;

    void main(){
        float x = aPosition.x;
        float y = aPosition.y;
        float z = 0.0;
        float w = 1.0;

        gl_PointSize = 10.0;
        gl_Position = vec4(x, y, z, w);
    }
    `; //program code
    
    // Fragment shader
    let fragmentShaderCode = 
    `
    precision highp float;
    void main(){
        float r = 0.0;
        float g = 0.0;
        float b = 1.0;
        float a = 1.0;
        gl_FragColor = vec4(r, g, b, a);
    }
    `;
    //#endregion

    //#region analogous to .o file creation
    let vertexShaderObject = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShaderObject, vertexShaderCode);
    gl.compileShader(vertexShaderObject); 
    
    let fragmentShaderObject = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShaderObject, fragmentShaderCode);
    gl.compileShader(fragmentShaderObject);
    //#endregion
    
    //#region analogous to linking and execution (using)
    let shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShaderObject);
    gl.attachShader(shaderProgram, fragmentShaderObject);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);
    //#endregion

    //Tell GPU how to collect position values from ARRAY_BUFFER for each vertex
    var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    gl.clearColor(1.0, 0.65, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // drawPoint(gl, vertices);
    // drawLine(gl, vertices);
    // drawLineStrip(gl, vertices);
    // drawLineLoop(gl, vertices);
    // drawTriangle(gl, vertices);
    // drawTriangleStrip(gl, vertices);
}

