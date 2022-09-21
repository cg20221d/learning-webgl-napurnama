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
  uniform float uTheta;

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

  vertexShaderCode = 
  `
  attribute vec2 aPosition;
  attribute vec3 aColor;
  varying vec3 vColor;
  uniform float uTheta;
  uniform float uXAcc;
  uniform float uYAcc;

  void main(){
      vColor = aColor;
      float x = -sin(uTheta) * (aPosition.x) + cos(uTheta) * (aPosition.y) + uXAcc;
      float y = sin(uTheta) * (aPosition.y) + cos(uTheta) * (aPosition.x) + uYAcc;
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
  
  
  // const tugasSatu = () => {

  //   var vertices = [
  //     1.0, 0.0, 1.0, 1.0, 1.0,
  //     -1.0, 0.0, 1.0, 1.0, 1.0,
  //     0.0, 1.0, 1.0, 1.0, 1.0,
  //     0.0, -1.0, 1.0, 1.0, 1.0
  //   ];
  
  //   var segment1 = [
  //     -0.35, 0.8, 1.0, 1.0, 1.0,
  //     -0.65, 0.8, 1.0, 1.0, 1.0,
  //     -0.4, 0.85, 1.0, 1.0, 1.0,
  //     -0.6, 0.85, 1.0, 1.0, 1.0,
  //     -0.4, 0.75, 1.0, 1.0, 1.0,
  //     -0.6, 0.75, 1.0, 1.0, 1.0,
  
  //     -0.35, 0.8, 1.0, 1.0, 1.0,
  //     -0.4, 0.85, 1.0, 1.0, 1.0,
  
  //     -0.35, 0.8, 1.0, 1.0, 1.0,
  //     -0.4, 0.75, 1.0, 1.0, 1.0,
  
  //     -0.65, 0.8, 1.0, 1.0, 1.0,
  //     -0.6, 0.85, 1.0, 1.0, 1.0,
  
  //     -0.65, 0.8, 1.0, 1.0, 1.0,
  //     -0.6, 0.75, 1.0, 1.0, 1.0,
  //   ];
  
  //   var segment2 = [
  //     -0.35, 0.8, 1.0, 1.0, 1.0,
  //     -0.35, 0.5, 1.0, 1.0, 1.0,
  //     -0.3, 0.75, 1.0, 1.0, 1.0,
  //     -0.3, 0.55, 1.0, 1.0, 1.0,
  //     -0.4, 0.75, 1.0, 1.0, 1.0,
  //     -0.4, 0.55, 1.0, 1.0, 1.0,
  
  //     -0.3, 0.75, 1.0, 1.0, 1.0,
  //     -0.35, 0.8, 1.0, 1.0, 1.0,
  //     -0.4, 0.75, 1.0, 1.0, 1.0,
  //     -0.35, 0.8, 1.0, 1.0, 1.0,
      
  //     -0.35, 0.5, 1.0, 1.0, 1.0,
  //     -0.3, 0.55, 1.0, 1.0, 1.0,
  //     -0.35, 0.5, 1.0, 1.0, 1.0,
  //     -0.4, 0.55, 1.0, 1.0, 1.0,
  //   ];
    
  //   var segment3 = [
  //     -0.35, 0.5, 1.0, 1.0, 1.0,
  //     -0.35, 0.2, 1.0, 1.0, 1.0,
  //     -0.3, 0.45, 1.0, 1.0, 1.0,
  //     -0.3, 0.25, 1.0, 1.0, 1.0,
  //     -0.4, 0.45, 1.0, 1.0, 1.0,
  //     -0.4, 0.25, 1.0, 1.0, 1.0,
  
  //     -0.3, 0.45, 1.0, 1.0, 1.0,
  //     -0.35, 0.5, 1.0, 1.0, 1.0,
  //     -0.4, 0.45, 1.0, 1.0, 1.0,
  //     -0.35, 0.5, 1.0, 1.0, 1.0,
      
  //     -0.35, 0.2, 1.0, 1.0, 1.0,
  //     -0.3, 0.25, 1.0, 1.0, 1.0,
  //     -0.35, 0.2, 1.0, 1.0, 1.0,
  //     -0.4, 0.25, 1.0, 1.0, 1.0,
  //   ];
  
  //   var segment4 = [
  //     -0.35, 0.2, 1.0, 1.0, 1.0,
  //     -0.65, 0.2, 1.0, 1.0, 1.0,
  //     -0.4, 0.25, 1.0, 1.0, 1.0,
  //     -0.6, 0.25, 1.0, 1.0, 1.0,
  //     -0.4, 0.15, 1.0, 1.0, 1.0,
  //     -0.6, 0.15, 1.0, 1.0, 1.0,
  
  //     -0.35, 0.2, 1.0, 1.0, 1.0,
  //     -0.4, 0.25, 1.0, 1.0, 1.0,
  
  //     -0.35, 0.2, 1.0, 1.0, 1.0,
  //     -0.4, 0.15, 1.0, 1.0, 1.0,
  
  //     -0.65, 0.2, 1.0, 1.0, 1.0,
  //     -0.6, 0.25, 1.0, 1.0, 1.0,
  
  //     -0.65, 0.2, 1.0, 1.0, 1.0,
  //     -0.6, 0.15, 1.0, 1.0, 1.0,
  //   ];
  
  //   var segment5 = [
  //     -0.65, 0.5, 1.0, 1.0, 1.0,
  //     -0.65, 0.2, 1.0, 1.0, 1.0,
  //     -0.6, 0.45, 1.0, 1.0, 1.0,
  //     -0.6, 0.25, 1.0, 1.0, 1.0,
  //     -0.7, 0.45, 1.0, 1.0, 1.0,
  //     -0.7, 0.25, 1.0, 1.0, 1.0,
  
  //     -0.6, 0.45, 1.0, 1.0, 1.0,
  //     -0.65, 0.5, 1.0, 1.0, 1.0,
  //     -0.7, 0.45, 1.0, 1.0, 1.0,
  //     -0.65, 0.5, 1.0, 1.0, 1.0,
      
  //     -0.65, 0.2, 1.0, 1.0, 1.0,
  //     -0.6, 0.25, 1.0, 1.0, 1.0,
  //     -0.65, 0.2, 1.0, 1.0, 1.0,
  //     -0.7, 0.25, 1.0, 1.0, 1.0,
  //   ];
  
  //   var segment6 = [
  //     -0.65, 0.8, 1.0, 1.0, 1.0,
  //     -0.65, 0.5, 1.0, 1.0, 1.0,
  //     -0.6, 0.75, 1.0, 1.0, 1.0,
  //     -0.6, 0.55, 1.0, 1.0, 1.0,
  //     -0.7, 0.75, 1.0, 1.0, 1.0,
  //     -0.7, 0.55, 1.0, 1.0, 1.0,
  
  //     -0.6, 0.75, 1.0, 1.0, 1.0,
  //     -0.65, 0.8, 1.0, 1.0, 1.0,
  //     -0.7, 0.75, 1.0, 1.0, 1.0,
  //     -0.65, 0.8, 1.0, 1.0, 1.0,
      
  //     -0.65, 0.5, 1.0, 1.0, 1.0,
  //     -0.6, 0.55, 1.0, 1.0, 1.0,
  //     -0.65, 0.5, 1.0, 1.0, 1.0,
  //     -0.7, 0.55, 1.0, 1.0, 1.0,
  //   ];
  
  //   var segment7 = [
  //     -0.35, 0.5, 1.0, 1.0, 1.0,
  //     -0.65, 0.5, 1.0, 1.0, 1.0,
  //     -0.4, 0.55, 1.0, 1.0, 1.0,
  //     -0.6, 0.55, 1.0, 1.0, 1.0,
  //     -0.4, 0.45, 1.0, 1.0, 1.0,
  //     -0.6, 0.45, 1.0, 1.0, 1.0,
  
  //     -0.35, 0.5, 1.0, 1.0, 1.0,
  //     -0.4, 0.55, 1.0, 1.0, 1.0,
  
  //     -0.35, 0.5, 1.0, 1.0, 1.0,
  //     -0.4, 0.45, 1.0, 1.0, 1.0,
  
  //     -0.65, 0.5, 1.0, 1.0, 1.0,
  //     -0.6, 0.55, 1.0, 1.0, 1.0,
  
  //     -0.65, 0.5, 1.0, 1.0, 1.0,
  //     -0.6, 0.45, 1.0, 1.0, 1.0,
  //   ];
    
    
  //   draw(gl, shaderProgram, gl.LINES, vertices, dimension, subarrayLen);
  
  //   draw(gl, shaderProgram, gl.LINES, segment1, dimension, subarrayLen);
  //   draw(gl, shaderProgram, gl.LINES, segment2, dimension, subarrayLen);
  //   draw(gl, shaderProgram, gl.LINES, segment3, dimension, subarrayLen);
  //   draw(gl, shaderProgram, gl.LINES, segment4, dimension, subarrayLen);
  //   // draw(gl, shaderProgram, gl.LINES, segment5, dimension, subarrayLen);
  //   draw(gl, shaderProgram, gl.LINES, segment6, dimension, subarrayLen);
  //   draw(gl, shaderProgram, gl.LINES, segment7, dimension, subarrayLen);
  
  //   draw(gl, shaderProgram, gl.LINES, vertices, dimension, subarrayLen);
  
  
  //   segment1 = [
  //     0.65, 0.8, 1.0, 1.0, 1.0,
  //     0.35, 0.8, 1.0, 1.0, 1.0,
  //     0.6, 0.85, 1.0, 1.0, 1.0,
  //     0.4, 0.85, 1.0, 1.0, 1.0,
  //     0.4, 0.75, 1.0, 1.0, 1.0,
  //     0.6, 0.75, 1.0, 1.0, 1.0,
  
  //     0.65, 0.8, 1.0, 1.0, 1.0,
  //     0.6, 0.75, 1.0, 1.0, 1.0,
      
  //     0.65, 0.8, 1.0, 1.0, 1.0,
  //     0.6, 0.85, 1.0, 1.0, 1.0,
      
  //     0.35, 0.8, 1.0, 1.0, 1.0,
  //     0.4, 0.75, 1.0, 1.0, 1.0,
      
  //     0.35, 0.8, 1.0, 1.0, 1.0,
  //     0.4, 0.85, 1.0, 1.0, 1.0,
  //   ];
    
  //   segment3 = [
  //     0.65, 0.5, 1.0, 1.0, 1.0,
  //     0.65, 0.2, 1.0, 1.0, 1.0,
  //     0.7, 0.45, 1.0, 1.0, 1.0,
  //     0.7, 0.25, 1.0, 1.0, 1.0,
  //     0.6, 0.45, 1.0, 1.0, 1.0,
  //     0.6, 0.25, 1.0, 1.0, 1.0,
  
  //     0.7, 0.45, 1.0, 1.0, 1.0,
  //     1-0.35, 0.5, 1.0, 1.0, 1.0,
  //     1-0.4, 0.45, 1.0, 1.0, 1.0,
  //     1-0.35, 0.5, 1.0, 1.0, 1.0,
      
  //     1-0.35, 0.2, 1.0, 1.0, 1.0,
  //     1-0.3, 0.25, 1.0, 1.0, 1.0,
  //     1-0.35, 0.2, 1.0, 1.0, 1.0,
  //     1-0.4, 0.25, 1.0, 1.0, 1.0,
  //   ];
  
  //   var segment4 = [
  //     1-0.35, 0.2, 1.0, 1.0, 1.0,
  //     1-0.65, 0.2, 1.0, 1.0, 1.0,
  //     1-0.4, 0.25, 1.0, 1.0, 1.0,
  //     1-0.6, 0.25, 1.0, 1.0, 1.0,
  //     1-0.4, 0.15, 1.0, 1.0, 1.0,
  //     1-0.6, 0.15, 1.0, 1.0, 1.0,
  
  //     1-0.35, 0.2, 1.0, 1.0, 1.0,
  //     1-0.4, 0.25, 1.0, 1.0, 1.0,
  
  //     1-0.35, 0.2, 1.0, 1.0, 1.0,
  //     1-0.4, 0.15, 1.0, 1.0, 1.0,
  
  //     1-0.65, 0.2, 1.0, 1.0, 1.0,
  //     1-0.6, 0.25, 1.0, 1.0, 1.0,
  
  //     1-0.65, 0.2, 1.0, 1.0, 1.0,
  //     1-0.6, 0.15, 1.0, 1.0, 1.0,
  //   ];
  
  //   var segment5 = [
  //     1-0.65, 0.5, 1.0, 1.0, 1.0,
  //     1-0.65, 0.2, 1.0, 1.0, 1.0,
  //     1-0.6, 0.45, 1.0, 1.0, 1.0,
  //     1-0.6, 0.25, 1.0, 1.0, 1.0,
  //     1-0.7, 0.45, 1.0, 1.0, 1.0,
  //     1-0.7, 0.25, 1.0, 1.0, 1.0,
  
  //     1-0.6, 0.45, 1.0, 1.0, 1.0,
  //     1-0.65, 0.5, 1.0, 1.0, 1.0,
  //     1-0.7, 0.45, 1.0, 1.0, 1.0,
  //     1-0.65, 0.5, 1.0, 1.0, 1.0,
      
  //     1-0.65, 0.2, 1.0, 1.0, 1.0,
  //     1-0.6, 0.25, 1.0, 1.0, 1.0,
  //     1-0.65, 0.2, 1.0, 1.0, 1.0,
  //     1-0.7, 0.25, 1.0, 1.0, 1.0,
  //   ];
  
  //   var segment6 = [
  //     1-0.65, 0.8, 1.0, 1.0, 1.0,
  //     1-0.65, 0.5, 1.0, 1.0, 1.0,
  //     1-0.6, 0.75, 1.0, 1.0, 1.0,
  //     1-0.6, 0.55, 1.0, 1.0, 1.0,
  //     1-0.7, 0.75, 1.0, 1.0, 1.0,
  //     1-0.7, 0.55, 1.0, 1.0, 1.0,
  
  //     1-0.6, 0.75, 1.0, 1.0, 1.0,
  //     1-0.65, 0.8, 1.0, 1.0, 1.0,
  //     1-0.7, 0.75, 1.0, 1.0, 1.0,
  //     1-0.65, 0.8, 1.0, 1.0, 1.0,
      
  //     1-0.65, 0.5, 1.0, 1.0, 1.0,
  //     1-0.6, 0.55, 1.0, 1.0, 1.0,
  //     1-0.65, 0.5, 1.0, 1.0, 1.0,
  //     1-0.7, 0.55, 1.0, 1.0, 1.0,
  //   ];
  
  //   var segment7 = [
  //     1-0.35, 0.5, 1.0, 1.0, 1.0,
  //     1-0.65, 0.5, 1.0, 1.0, 1.0,
  //     1-0.4, 0.55, 1.0, 1.0, 1.0,
  //     1-0.6, 0.55, 1.0, 1.0, 1.0,
  //     1-0.4, 0.45, 1.0, 1.0, 1.0,
  //     1-0.6, 0.45, 1.0, 1.0, 1.0,
  
  //     1-0.35, 0.5, 1.0, 1.0, 1.0,
  //     1-0.4, 0.55, 1.0, 1.0, 1.0,
  
  //     1-0.35, 0.5, 1.0, 1.0, 1.0,
  //     1-0.4, 0.45, 1.0, 1.0, 1.0,
  
  //     1-0.65, 0.5, 1.0, 1.0, 1.0,
  //     1-0.6, 0.55, 1.0, 1.0, 1.0,
  
  //     1-0.65, 0.5, 1.0, 1.0, 1.0,
  //     1-0.6, 0.45, 1.0, 1.0, 1.0,
  //   ];
  
  //   draw(gl, shaderProgram, gl.LINES, segment1, dimension, subarrayLen);
  //   draw(gl, shaderProgram, gl.LINES, segment2, dimension, subarrayLen);
  //   draw(gl, shaderProgram, gl.LINES, segment3, dimension, subarrayLen);
  //   draw(gl, shaderProgram, gl.LINES, segment4, dimension, subarrayLen);
  //   // draw(gl, shaderProgram, gl.LINES, segment5, dimension, subarrayLen);
  //   draw(gl, shaderProgram, gl.LINES, segment6, dimension, subarrayLen);
  //   draw(gl, shaderProgram, gl.LINES, segment7, dimension, subarrayLen);
  
  
  //   // drawSevenSegment(8, 0, 0, 0.3, 0.1);
  
  //   let M = 
  //   [
  //     //|
  //     //|
  //     -0.8, -0.15, 1.0, 1.0, 1.0, //1
  //     -0.8, -0.85, 1.0, 1.0, 1.0, //2
  //     -0.75, -0.85, 1.0, 1.0, 1.0, //3
  //     -0.75, -0.15, 1.0, 1.0, 1.0, //12
  //     // -0.75, -0.25, 1.0, 0.0, 0.0, //4
  //     // -0.5, -0.85, 0.0, 0.0, 1.0, //5
  //     // -0.25, -0.25, 1.0, 0.0, 0.0, //6
  //     // -0.25, -0.85, 1.0, 1.0, 1.0, //7
  //     // -0.20, -0.85, 1.0, 0.0, 0.0, //8
  //     // -0.20, -0.15, 0.0, 0.0, 1.0, //9
  //     // -0.25, -0.15, 0.0, 0.0, 1.0, //10
  //     // -0.5, -0.75, 0.0, 1.0, 0.0, //11
  //     //      \
  //     //      \
  //     // -0.30, -0.15, 0.0, 1.0, 0.0,
  //     // -0.30, -0.85, 0.0, 0.0, 1.0,
  //   ]
  //   draw(gl, shaderProgram, gl.TRIANGLE_FAN, M, dimension, subarrayLen);
  //   M = 
  //   [
  //     //|
  //     //|
  //     // -0.8, -0.15, 1.0, 0.0, 0.0, //1
  //     // -0.8, -0.85, 0.0, 1.0, 0.0, //2
  //     // -0.75, -0.85, 1.0, 0.0, 0.0, //3
  //     -0.75, -0.25, 1.0, 1.0, 1.0, //4
  //     -0.5, -0.85, 1.0, 1.0, 1.0, //5
  //     // -0.25, -0.25, 1.0, 0.0, 0.0, //6
  //     // -0.25, -0.85, 1.0, 1.0, 1.0, //7
  //     // -0.20, -0.85, 1.0, 0.0, 0.0, //8
  //     // -0.20, -0.15, 0.0, 0.0, 1.0, //9
  //     // -0.25, -0.15, 0.0, 0.0, 1.0, //10
  //     -0.5, -0.75, 1.0, 1.0, 1.0, //11
  //     -0.75, -0.15, 1.0, 1.0, 1.0, //12
  //     //      \
  //     //      \
  //     // -0.30, -0.15, 0.0, 1.0, 0.0,
  //     // -0.30, -0.85, 0.0, 0.0, 1.0,
  //   ]
  //   draw(gl, shaderProgram, gl.TRIANGLE_FAN, M, dimension, subarrayLen);
  //   M = 
  //   [
  //     //|
  //     //|
  //     // -0.8, -0.15, 1.0, 0.0, 0.0, //1
  //     // -0.8, -0.85, 0.0, 1.0, 0.0, //2
  //     // -0.75, -0.85, 1.0, 0.0, 0.0, //3
  //     // -0.75, -0.25, 1.0, 0.0, 0.0, //4
  //     -0.5, -0.85, 1.0, 1.0, 1.0, //5
  //     // -0.25, -0.25, 1.0, 0.0, 0.0, //6
  //     // -0.25, -0.85, 1.0, 1.0, 1.0, //7
  //     // -0.20, -0.85, 1.0, 0.0, 0.0, //8
  //     -0.20, -0.15, 1.0, 1.0, 1.0, //9
  //     -0.25, -0.15, 1.0, 1.0, 1.0, //10
  //     -0.5, -0.75, 1.0, 1.0, 1.0, //11
  //     // -0.75, -0.15, 0.0, 0.0, 1.0, //12
  //     //      \
  //     //      \
  //     // -0.30, -0.15, 0.0, 1.0, 0.0,
  //     // -0.30, -0.85, 0.0, 0.0, 1.0,
  //   ]
  //   draw(gl, shaderProgram, gl.TRIANGLE_FAN, M, dimension, subarrayLen);
  //   M = 
  //   [
  //     //|
  //     //|
  //     // -0.8, -0.15, 1.0, 0.0, 0.0, //1
  //     // -0.8, -0.85, 0.0, 1.0, 0.0, //2
  //     // -0.75, -0.85, 1.0, 0.0, 0.0, //3
  //     // -0.75, -0.25, 1.0, 0.0, 0.0, //4
  //     // -0.5, -0.85, 0.0, 0.0, 1.0, //5
  //     -0.25, -0.25, 1.0, 1.0, 1.0, //6
  //     -0.25, -0.85, 1.0, 1.0, 1.0, //7
  //     -0.20, -0.85, 1.0, 1.0, 1.0, //8
  //     -0.20, -0.15, 1.0, 1.0, 1.0, //9
  //     -0.25, -0.15, 1.0, 1.0, 1.0, //10
  //     // -0.5, -0.75, 0.0, 1.0, 0.0, //11
  //     // -0.75, -0.15, 0.0, 0.0, 1.0, //12
  //     //      \
  //     //      \
  //     // -0.30, -0.15, 0.0, 1.0, 0.0,
  //     // -0.30, -0.85, 0.0, 0.0, 1.0,
  //   ]
  //   draw(gl, shaderProgram, gl.TRIANGLE_FAN, M, dimension, subarrayLen);
  
  //   let A = [
  //     0.475, -0.15, 0.0, 0.0, 0.0,
  //     0.2, -0.85, 0.0, 0.0, 0.0,
  //     0.25, -0.85, 0.0, 0.0, 0.0,
      
  //     (0.25+0.525)/2, (-0.85+-0.15)/2, 0.0, 0.0, 0.0,
  //     (0.475+0.75)/2, (-0.15+-0.85)/2, 0.0, 0.0, 0.0,
  
      
  //     0.75, -0.85, 0.0, 0.0, 0.0,
  //     0.8, -0.85, 0.0, 0.0, 0.0,
  //     0.525, -0.15, 0.0, 0.0, 0.0,
  
  //     (0.25+0.525)/2+0.05, (-0.85+-0.15)/2+0.05, 0.0, 0.0, 0.0,
  //     (0.475+0.75)/2-0.05, (-0.15+-0.85)/2+0.05, 0.0, 0.0, 0.0,
  //     ((0.475+0.75)/2-0.05+(0.25+0.525)/2+0.05)/2, -0.2, 0.0, 0.0, 0.0,
  //   ]
  
  //   // draw(gl, shaderProgram, gl.POINTS, A, dimension, subarrayLen);
  
  //   A = [
  //     0.475, -0.15, 0.0, 0.0, 0.0,
  //     0.2, -0.85, 0.0, 0.0, 0.0,
  //     0.25, -0.85, 0.0, 0.0, 0.0,
      
  //     (0.25+0.525)/2, (-0.85+-0.15)/2, 0.0, 0.0, 0.0,
  //     (0.475+0.75)/2, (-0.15+-0.85)/2, 0.0, 0.0, 0.0,
  
      
  //     0.75, -0.85, 0.0, 0.0, 0.0,
  //     0.8, -0.85, 0.0, 0.0, 0.0,
  //     0.525, -0.15, 0.0, 0.0, 0.0,
  
  //     (0.25+0.525)/2+0.05, (-0.85+-0.15)/2+0.05, 0.0, 0.0, 0.0,
  //     (0.475+0.75)/2-0.05, (-0.15+-0.85)/2+0.05, 0.0, 0.0, 0.0,
  //     ((0.475+0.75)/2-0.05+(0.25+0.525)/2+0.05)/2, -0.2, 0.0, 0.0, 0.0,
  //   ]
  
  //   draw(gl, shaderProgram, gl.TRIANGLE_FAN, A, dimension, subarrayLen);
  
  //   A = [
  //     (0.25+0.525)/2+0.015, (-0.85+-0.15)/2+0.05, 1.0, 0.5, 0.0,
  //     (0.475+0.75)/2-0.015, (-0.15+-0.85)/2+0.05, 1.0, 0.5, 0.0,
  //     ((0.475+0.75)/2-0.05+(0.25+0.525)/2+0.05)/2, -0.2, 1.0, 0.5, 0.0,
  //   ]
  
  //   draw(gl, shaderProgram, gl.TRIANGLES, A, dimension, subarrayLen);
  // }
  // tugasSatu();
  
  
  let vertices = [
    -0.5, -0.5, 1.0, 1.0, 0.0,
    -0.5, 0.5, 1.0, 0.0, 1.0,
    0.5, -0.5, 0.0, 1.0, 1.0,
    0.5, 0.5, 1.0, 0.0, 1.0,
  ]
  draw(gl, shaderProgram, gl.TRIANGLES, vertices, dimension, subarrayLen);

  var uTheta = gl.getUniformLocation(shaderProgram, "uTheta");
  var uXAcc = gl.getUniformLocation(shaderProgram, "uXAcc");
  var uYAcc = gl.getUniformLocation(shaderProgram, "uYAcc");
  var theta = 0.0;
  var xAcc = 0;
  var yAcc = 0;

  let freeze = false;

  function render(){
    if(!freeze){
      gl.clear(gl.COLOR_BUFFER_BIT);
      theta += 0.0125;
      gl.uniform1f(uTheta, theta);
      gl.uniform1f(uXAcc, xAcc);
      gl.uniform1f(uYAcc, yAcc);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertices.length/subarrayLen);
    }
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  function onMouseClick(event){
    freeze = !freeze;
  }

  function onKeyDown(event){
    freeze = !freeze;
    onKeyUp();
  }

  function onKeyUp(event){
    freeze = !freeze;
  }

  function onAUp(event){
    if(event.code == "KeyA"){
      xAcc += 0;
    }
  }

  function onADown(event){
    if(event.code == "KeyA"){
      xAcc += -0.1;
    }
  }

  function onDUp(event){
    if(event.code == "KeyD"){
      xAcc += 0;
    }
  }

  function onDDown(event){
    if(event.code == "KeyD"){
      xAcc += 0.1;
    }
  }

  function onWUp(event){
    if(event.code == "KeyW"){
      yAcc += 0;
    }
  }

  function onWDown(event){
    if(event.code == "KeyW"){
      yAcc += 0.1;
    }
  }

  function onSUp(event){
    if(event.code == "KeyS"){
      yAcc += 0;
    }
  }

  function onSDown(event){
    if(event.code == "KeyS"){
      yAcc -= 0.1;
    }
  }

  document.getElementById("stop-btn").addEventListener("click", onMouseClick);
  // document.addEventListener("keydown", onKeyDown);
  // document.addEventListener("keyup", onKeyUp);

  document.addEventListener("keydown", onSDown);
  document.addEventListener("keyup", onSUp);

  document.addEventListener("keydown", onWDown);
  document.addEventListener("keyup", onWUp);

  document.addEventListener("keydown", onADown);
  document.addEventListener("keyup", onAUp);

  document.addEventListener("keydown", onDDown);
  document.addEventListener("keyup", onDUp);
}


