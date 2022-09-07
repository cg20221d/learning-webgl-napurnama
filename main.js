function main(){


    let docCanvas = document.querySelector("#myCanvas");
    let gl = docCanvas.getContext("webgl");
    
    //#region analogous to source code
    // Vertex shader
    let vertexShaderCode = 
    `
    void main(){
        
    }
    `; //program code
    
    // Fragment shader
    let fragmentShaderCode = 
    `
    void main(){
        
    }
    `;
    //#endregion

    //#region analogous to .o file creation
    let vertexShaderObject = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShaderObject, vertexShaderCode);
    gl.compileShader(vertexShaderObject); 
    
    let fragmentShaderObject = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShaderObject, fragmentShaderCode);
    gl.compileShader(fragmentShaderObject, fragmentShaderCode);
    //#endregion
    
    //#region analogous to linking and execution (using)
    let shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShaderObject);
    gl.attachShader(shaderProgram, fragmentShaderObject);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);
    //#endregion


    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
}