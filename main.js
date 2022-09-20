function main(){
    

    let canvas = document.getElementById("myCanvas");
    let gl = canvas.getContext("webgl");
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    //#region analogous to source code
    // Vertex shader
    let vertexShaderCode = 
    `
    attribute vec2 aPosition;
    attribute vec3 aColor;
    varying vec3 vColor;

    void main(){
        vColor = aColor;
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
    precision mediump float;
    varying vec3 vColor;

    void main(){
        gl_FragColor.rgb = vColor;
        gl_FragColor.a = 1.0;
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

    
    gl.clearColor(1.0, 0.5, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    const dimension = 2;
    const subarrayLen = 5;
    

    var vertices = [
      1.0, 0.0, 1.0, 1.0, 1.0,
      -1.0, 0.0, 1.0, 1.0, 1.0,
      0.0, 1.0, 1.0, 1.0, 1.0,
      0.0, -1.0, 1.0, 1.0, 1.0
    ];

    var segment1 = [
      -0.35, 0.8, 1.0, 1.0, 1.0,
      -0.65, 0.8, 1.0, 1.0, 1.0,
      -0.4, 0.85, 1.0, 1.0, 1.0,
      -0.6, 0.85, 1.0, 1.0, 1.0,
      -0.4, 0.75, 1.0, 1.0, 1.0,
      -0.6, 0.75, 1.0, 1.0, 1.0,

      -0.35, 0.8, 1.0, 1.0, 1.0,
      -0.4, 0.85, 1.0, 1.0, 1.0,

      -0.35, 0.8, 1.0, 1.0, 1.0,
      -0.4, 0.75, 1.0, 1.0, 1.0,

      -0.65, 0.8, 1.0, 1.0, 1.0,
      -0.6, 0.85, 1.0, 1.0, 1.0,

      -0.65, 0.8, 1.0, 1.0, 1.0,
      -0.6, 0.75, 1.0, 1.0, 1.0,
    ];

    var segment2 = [
      -0.35, 0.8, 1.0, 1.0, 1.0,
      -0.35, 0.5, 1.0, 1.0, 1.0,
      -0.3, 0.75, 1.0, 1.0, 1.0,
      -0.3, 0.55, 1.0, 1.0, 1.0,
      -0.4, 0.75, 1.0, 1.0, 1.0,
      -0.4, 0.55, 1.0, 1.0, 1.0,

      -0.3, 0.75, 1.0, 1.0, 1.0,
      -0.35, 0.8, 1.0, 1.0, 1.0,
      -0.4, 0.75, 1.0, 1.0, 1.0,
      -0.35, 0.8, 1.0, 1.0, 1.0,
      
      -0.35, 0.5, 1.0, 1.0, 1.0,
      -0.3, 0.55, 1.0, 1.0, 1.0,
      -0.35, 0.5, 1.0, 1.0, 1.0,
      -0.4, 0.55, 1.0, 1.0, 1.0,
    ];
    
    var segment3 = [
      -0.35, 0.5, 1.0, 1.0, 1.0,
      -0.35, 0.2, 1.0, 1.0, 1.0,
      -0.3, 0.45, 1.0, 1.0, 1.0,
      -0.3, 0.25, 1.0, 1.0, 1.0,
      -0.4, 0.45, 1.0, 1.0, 1.0,
      -0.4, 0.25, 1.0, 1.0, 1.0,

      -0.3, 0.45, 1.0, 1.0, 1.0,
      -0.35, 0.5, 1.0, 1.0, 1.0,
      -0.4, 0.45, 1.0, 1.0, 1.0,
      -0.35, 0.5, 1.0, 1.0, 1.0,
      
      -0.35, 0.2, 1.0, 1.0, 1.0,
      -0.3, 0.25, 1.0, 1.0, 1.0,
      -0.35, 0.2, 1.0, 1.0, 1.0,
      -0.4, 0.25, 1.0, 1.0, 1.0,
    ];

    var segment4 = [
      -0.35, 0.2, 1.0, 1.0, 1.0,
      -0.65, 0.2, 1.0, 1.0, 1.0,
      -0.4, 0.25, 1.0, 1.0, 1.0,
      -0.6, 0.25, 1.0, 1.0, 1.0,
      -0.4, 0.15, 1.0, 1.0, 1.0,
      -0.6, 0.15, 1.0, 1.0, 1.0,

      -0.35, 0.2, 1.0, 1.0, 1.0,
      -0.4, 0.25, 1.0, 1.0, 1.0,

      -0.35, 0.2, 1.0, 1.0, 1.0,
      -0.4, 0.15, 1.0, 1.0, 1.0,

      -0.65, 0.2, 1.0, 1.0, 1.0,
      -0.6, 0.25, 1.0, 1.0, 1.0,

      -0.65, 0.2, 1.0, 1.0, 1.0,
      -0.6, 0.15, 1.0, 1.0, 1.0,
    ];

    var segment5 = [
      -0.65, 0.5, 1.0, 1.0, 1.0,
      -0.65, 0.2, 1.0, 1.0, 1.0,
      -0.6, 0.45, 1.0, 1.0, 1.0,
      -0.6, 0.25, 1.0, 1.0, 1.0,
      -0.7, 0.45, 1.0, 1.0, 1.0,
      -0.7, 0.25, 1.0, 1.0, 1.0,

      -0.6, 0.45, 1.0, 1.0, 1.0,
      -0.65, 0.5, 1.0, 1.0, 1.0,
      -0.7, 0.45, 1.0, 1.0, 1.0,
      -0.65, 0.5, 1.0, 1.0, 1.0,
      
      -0.65, 0.2, 1.0, 1.0, 1.0,
      -0.6, 0.25, 1.0, 1.0, 1.0,
      -0.65, 0.2, 1.0, 1.0, 1.0,
      -0.7, 0.25, 1.0, 1.0, 1.0,
    ];

    var segment6 = [
      -0.65, 0.8, 1.0, 1.0, 1.0,
      -0.65, 0.5, 1.0, 1.0, 1.0,
      -0.6, 0.75, 1.0, 1.0, 1.0,
      -0.6, 0.55, 1.0, 1.0, 1.0,
      -0.7, 0.75, 1.0, 1.0, 1.0,
      -0.7, 0.55, 1.0, 1.0, 1.0,

      -0.6, 0.75, 1.0, 1.0, 1.0,
      -0.65, 0.8, 1.0, 1.0, 1.0,
      -0.7, 0.75, 1.0, 1.0, 1.0,
      -0.65, 0.8, 1.0, 1.0, 1.0,
      
      -0.65, 0.5, 1.0, 1.0, 1.0,
      -0.6, 0.55, 1.0, 1.0, 1.0,
      -0.65, 0.5, 1.0, 1.0, 1.0,
      -0.7, 0.55, 1.0, 1.0, 1.0,
    ];

    var segment7 = [
      -0.35, 0.5, 1.0, 1.0, 1.0,
      -0.65, 0.5, 1.0, 1.0, 1.0,
      -0.4, 0.55, 1.0, 1.0, 1.0,
      -0.6, 0.55, 1.0, 1.0, 1.0,
      -0.4, 0.45, 1.0, 1.0, 1.0,
      -0.6, 0.45, 1.0, 1.0, 1.0,

      -0.35, 0.5, 1.0, 1.0, 1.0,
      -0.4, 0.55, 1.0, 1.0, 1.0,

      -0.35, 0.5, 1.0, 1.0, 1.0,
      -0.4, 0.45, 1.0, 1.0, 1.0,

      -0.65, 0.5, 1.0, 1.0, 1.0,
      -0.6, 0.55, 1.0, 1.0, 1.0,

      -0.65, 0.5, 1.0, 1.0, 1.0,
      -0.6, 0.45, 1.0, 1.0, 1.0,
    ];
    
    
    draw(gl, shaderProgram, gl.LINES, vertices, dimension, subarrayLen);

    draw(gl, shaderProgram, gl.LINES, segment1, dimension, subarrayLen);
    draw(gl, shaderProgram, gl.LINES, segment2, dimension, subarrayLen);
    draw(gl, shaderProgram, gl.LINES, segment3, dimension, subarrayLen);
    draw(gl, shaderProgram, gl.LINES, segment4, dimension, subarrayLen);
    // draw(gl, shaderProgram, gl.LINES, segment5, dimension, subarrayLen);
    draw(gl, shaderProgram, gl.LINES, segment6, dimension, subarrayLen);
    draw(gl, shaderProgram, gl.LINES, segment7, dimension, subarrayLen);

    draw(gl, shaderProgram, gl.LINES, vertices, dimension, subarrayLen);


    segment1 = [
      0.65, 0.8, 1.0, 1.0, 1.0,
      0.35, 0.8, 1.0, 1.0, 1.0,
      0.6, 0.85, 1.0, 1.0, 1.0,
      0.4, 0.85, 1.0, 1.0, 1.0,
      0.4, 0.75, 1.0, 1.0, 1.0,
      0.6, 0.75, 1.0, 1.0, 1.0,

      0.65, 0.8, 1.0, 1.0, 1.0,
      0.6, 0.75, 1.0, 1.0, 1.0,
      
      0.65, 0.8, 1.0, 1.0, 1.0,
      0.6, 0.85, 1.0, 1.0, 1.0,
      
      0.35, 0.8, 1.0, 1.0, 1.0,
      0.4, 0.75, 1.0, 1.0, 1.0,
      
      0.35, 0.8, 1.0, 1.0, 1.0,
      0.4, 0.85, 1.0, 1.0, 1.0,
    ];
    
    segment3 = [
      0.65, 0.5, 1.0, 1.0, 1.0,
      0.65, 0.2, 1.0, 1.0, 1.0,
      0.7, 0.45, 1.0, 1.0, 1.0,
      0.7, 0.25, 1.0, 1.0, 1.0,
      0.6, 0.45, 1.0, 1.0, 1.0,
      0.6, 0.25, 1.0, 1.0, 1.0,

      0.7, 0.45, 1.0, 1.0, 1.0,
      1-0.35, 0.5, 1.0, 1.0, 1.0,
      1-0.4, 0.45, 1.0, 1.0, 1.0,
      1-0.35, 0.5, 1.0, 1.0, 1.0,
      
      1-0.35, 0.2, 1.0, 1.0, 1.0,
      1-0.3, 0.25, 1.0, 1.0, 1.0,
      1-0.35, 0.2, 1.0, 1.0, 1.0,
      1-0.4, 0.25, 1.0, 1.0, 1.0,
    ];

    var segment4 = [
      1-0.35, 0.2, 1.0, 1.0, 1.0,
      1-0.65, 0.2, 1.0, 1.0, 1.0,
      1-0.4, 0.25, 1.0, 1.0, 1.0,
      1-0.6, 0.25, 1.0, 1.0, 1.0,
      1-0.4, 0.15, 1.0, 1.0, 1.0,
      1-0.6, 0.15, 1.0, 1.0, 1.0,

      1-0.35, 0.2, 1.0, 1.0, 1.0,
      1-0.4, 0.25, 1.0, 1.0, 1.0,

      1-0.35, 0.2, 1.0, 1.0, 1.0,
      1-0.4, 0.15, 1.0, 1.0, 1.0,

      1-0.65, 0.2, 1.0, 1.0, 1.0,
      1-0.6, 0.25, 1.0, 1.0, 1.0,

      1-0.65, 0.2, 1.0, 1.0, 1.0,
      1-0.6, 0.15, 1.0, 1.0, 1.0,
    ];

    var segment5 = [
      1-0.65, 0.5, 1.0, 1.0, 1.0,
      1-0.65, 0.2, 1.0, 1.0, 1.0,
      1-0.6, 0.45, 1.0, 1.0, 1.0,
      1-0.6, 0.25, 1.0, 1.0, 1.0,
      1-0.7, 0.45, 1.0, 1.0, 1.0,
      1-0.7, 0.25, 1.0, 1.0, 1.0,

      1-0.6, 0.45, 1.0, 1.0, 1.0,
      1-0.65, 0.5, 1.0, 1.0, 1.0,
      1-0.7, 0.45, 1.0, 1.0, 1.0,
      1-0.65, 0.5, 1.0, 1.0, 1.0,
      
      1-0.65, 0.2, 1.0, 1.0, 1.0,
      1-0.6, 0.25, 1.0, 1.0, 1.0,
      1-0.65, 0.2, 1.0, 1.0, 1.0,
      1-0.7, 0.25, 1.0, 1.0, 1.0,
    ];

    var segment6 = [
      1-0.65, 0.8, 1.0, 1.0, 1.0,
      1-0.65, 0.5, 1.0, 1.0, 1.0,
      1-0.6, 0.75, 1.0, 1.0, 1.0,
      1-0.6, 0.55, 1.0, 1.0, 1.0,
      1-0.7, 0.75, 1.0, 1.0, 1.0,
      1-0.7, 0.55, 1.0, 1.0, 1.0,

      1-0.6, 0.75, 1.0, 1.0, 1.0,
      1-0.65, 0.8, 1.0, 1.0, 1.0,
      1-0.7, 0.75, 1.0, 1.0, 1.0,
      1-0.65, 0.8, 1.0, 1.0, 1.0,
      
      1-0.65, 0.5, 1.0, 1.0, 1.0,
      1-0.6, 0.55, 1.0, 1.0, 1.0,
      1-0.65, 0.5, 1.0, 1.0, 1.0,
      1-0.7, 0.55, 1.0, 1.0, 1.0,
    ];

    var segment7 = [
      1-0.35, 0.5, 1.0, 1.0, 1.0,
      1-0.65, 0.5, 1.0, 1.0, 1.0,
      1-0.4, 0.55, 1.0, 1.0, 1.0,
      1-0.6, 0.55, 1.0, 1.0, 1.0,
      1-0.4, 0.45, 1.0, 1.0, 1.0,
      1-0.6, 0.45, 1.0, 1.0, 1.0,

      1-0.35, 0.5, 1.0, 1.0, 1.0,
      1-0.4, 0.55, 1.0, 1.0, 1.0,

      1-0.35, 0.5, 1.0, 1.0, 1.0,
      1-0.4, 0.45, 1.0, 1.0, 1.0,

      1-0.65, 0.5, 1.0, 1.0, 1.0,
      1-0.6, 0.55, 1.0, 1.0, 1.0,

      1-0.65, 0.5, 1.0, 1.0, 1.0,
      1-0.6, 0.45, 1.0, 1.0, 1.0,
    ];

    draw(gl, shaderProgram, gl.LINES, segment1, dimension, subarrayLen);
    draw(gl, shaderProgram, gl.LINES, segment2, dimension, subarrayLen);
    draw(gl, shaderProgram, gl.LINES, segment3, dimension, subarrayLen);
    draw(gl, shaderProgram, gl.LINES, segment4, dimension, subarrayLen);
    // draw(gl, shaderProgram, gl.LINES, segment5, dimension, subarrayLen);
    draw(gl, shaderProgram, gl.LINES, segment6, dimension, subarrayLen);
    draw(gl, shaderProgram, gl.LINES, segment7, dimension, subarrayLen);

    drawSevenSegment(8, 0, 0, 0.3, 0.1);
}

