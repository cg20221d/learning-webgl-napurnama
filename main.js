function main(){


    let docCanvas = document.getElementById("myCanvas");
    let gl = docCanvas.getContext("webgl");
    
    //#region analogous to source code
    // Vertex shader
    let vertexShaderCode = 
    `
    void main(){
        float x = 0.0;
        float y = 0.0;
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


    gl.clearColor(1.0, 0.65, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.POINTS, 0, 1);
}
