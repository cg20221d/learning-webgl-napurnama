// const { glMatrix } = require("./gl-matrix");

// const { mat4, glMatrix } = require("./gl-matrix");

let gl;

function main(){
  

  let canvas = document.getElementById("myCanvas");
  gl = canvas.getContext("webgl");
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  gl.enable(gl.DEPTH_TEST);
  gl.enable(gl.CULL_FACE);
  gl.frontFace(gl.CCW);
  gl.cullFace(gl.BACK);

  //prepare program
  let shaderProgram = gl.createProgram();

  //#region analogous to source code
  // Vertex shader
  const vertexShaderCode = 
  `
  attribute vec3 aPosition;
  attribute vec3 aColor;
  varying vec3 vColor;

  uniform mat4 uModel;
  uniform mat4 uView;
  uniform mat4 uProjection;

  void main(){
      vColor = aColor;
      float x = (aPosition.x);
      float y = (aPosition.y);
      float z = (aPosition.z);
      float w = 1.0;

      gl_PointSize = 10.0;
      gl_Position = uProjection * uView * uModel * vec4(x, y, z, w);
  }


  `; 

  //analogous to .o file creation
  let vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexShaderCode);
  gl.compileShader(vertexShader); 
  gl.attachShader(shaderProgram, vertexShader);
  //#endregion
  
  vertexShader = `
  precision mediump float;
  
  attribute vec3 aPosition;
  attribute vec3 aColor;
  
  varying vec3 vColor;

  uniform mat4 uModel;
  uniform mat4 uView;
  uniform mat4 uProjection;

  void main(){
      vColor = aColor;
      gl_Position = uProjection * uView * uModel * vec4(aPosition, 1.0);
  }

  `

  //#region Fragment shader
  const fragmentShaderCode = `
  precision mediump float;
  varying vec3 vColor;

  void main(){
      gl_FragColor.rgb = vColor;
      gl_FragColor.a = 1.0;
  }
  `;

  //analogous to .o file creation
  let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragmentShaderCode);
  gl.compileShader(fragmentShader);
  gl.attachShader(shaderProgram, fragmentShader);
  //#endregion
  
  //#region analogous to linking and execution (using)
  gl.linkProgram(shaderProgram);
  gl.useProgram(shaderProgram);
  //#endregion

  const dimension = 3;
  const subarrayLen = 6;

  //#region create cube
  var vertices = [
    //top
    -1.0, 1.0, -1.0,  0.5,0.5,0.5,
    -1.0, 1.0, 1.0, 0.5,0.5,0.5,
    1.0, 1.0, 1.0,  0.5,0.5,0.5,
    1.0, 1.0, -1.0,  0.5,0.5,0.5,

    //left
    -1.0, 1.0, 1.0,  0.75,0.25,0.5,
    -1.0, -1.0, 1.0, 0.75,0.25,0.5,
    -1.0, -1.0, -1.0,  0.75,0.25,0.5,
    -1.0, 1.0, -1.0,  0.75,0.25,0.5,

    //right
    1.0, 1.0, 1.0,  0.25,0.5,0.25,
    1.0, -1.0, 1.0, 0.25,0.5,0.25,
    1.0, -1.0, -1.0,  0.25,0.5,0.25,
    1.0, 1.0, -1.0,  0.25,0.5,0.25,

    //front
    1.0, 1.0, 1.0,  1.0,0.5,0.5,
    1.0, -1.0, 1.0, 1.0,0.5,0.5,
    -1.0, -1.0, 1.0,  1.0,0.5,0.5,
    -1.0, 1.0, 1.0,  1.0,0.5,0.5,

    //back
    1.0, 1.0, -1.0,  0.5,0.1,0.5,
    1.0, -1.0, -1.0, 0.5,0.1,0.5,
    -1.0, -1.0, -1.0,  0.5,0.1,0.5,
    -1.0, 1.0, -1.0,  0.5,0.1,0.5,

    //bottom
    -1.0, -1.0, -1.0,  0.5,0.5,0.5,
    -1.0, -1.0, 1.0, 0.5,0.5,0.5,
    1.0, -1.0, 1.0,  0.5,0.5,0.5,
    1.0, -1.0, -1.0,  0.5,0.5,0.5,
  ]

  const indices = [
    0, 1, 2,
    0, 2, 3,

    5, 4, 6,
    6, 4, 7,

    8, 9, 10,
    8, 10, 11,

    13, 12, 14,
    15, 14, 12,
    
    16, 17, 18,
    16, 18, 19,

    21, 20, 22,
    22, 20, 23,
  ]

  var boxVertexBufferObject = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, boxVertexBufferObject);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

	var boxIndexBufferObject = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, boxIndexBufferObject);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

	var positionAttribLocation = gl.getAttribLocation(shaderProgram, 'aPosition');
	var colorAttribLocation = gl.getAttribLocation(shaderProgram, 'aColor');
	gl.vertexAttribPointer(
		positionAttribLocation, // Attribute location
		dimension, // Number of elements per attribute
		gl.FLOAT, // Type of elements
		gl.FALSE,
		subarrayLen * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
		0 // Offset from the beginning of a single vertex to this attribute
	);
	gl.vertexAttribPointer(
		colorAttribLocation, // Attribute location
		3, // Number of elements per attribute
		gl.FLOAT, // Type of elements
		gl.FALSE,
		subarrayLen * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
		dimension * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
	);

	gl.enableVertexAttribArray(positionAttribLocation);
	gl.enableVertexAttribArray(colorAttribLocation);

  var ModelUniformPointer = gl.getUniformLocation(shaderProgram, 'uModel');
  var ViewUniformPointer = gl.getUniformLocation(shaderProgram, 'uView');
  var ProjectionUniformPointer = gl.getUniformLocation(shaderProgram, 'uProjection');

  var modelMatrix = new Float32Array(16);
  var viewMatrix = new Float32Array(16);
  var projectionMatrix = new Float32Array(16);

  glMatrix.mat4.identity(modelMatrix);

  // glMatrix.mat4.identity(viewMatrix);
  glMatrix.mat4.lookAt(viewMatrix, [0, 0, -7], [0, 0, 0], [0, 1, 0])
  console.log(viewMatrix);

  // glMatrix.mat4.identity(projectionMatrix);
  glMatrix.mat4.perspective(projectionMatrix, Math.PI / 180 * 45, canvas.width / canvas.height, 0.1, 1000.0);
  console.log(projectionMatrix);

  gl.uniformMatrix4fv(ModelUniformPointer, gl.FALSE, modelMatrix);
  gl.uniformMatrix4fv(ViewUniformPointer, gl.FALSE, viewMatrix);
  gl.uniformMatrix4fv(ProjectionUniformPointer, gl.FALSE, projectionMatrix);

  // draw(gl, shaderProgram, gl.TRIANGLES, vertices, dimension, subarrayLen);

  var angle = 0;
  var identityMatrix = new Float32Array(16);
  glMatrix.mat4.identity(identityMatrix);


  var xSpeed = 0.0;
  var zSpeed = 0.0;
 
  function onKeydown(event) {
    console.log(event.keyCode, xSpeed, zSpeed);

    // horizontal
    if (event.keyCode == 74) {  // j
      xSpeed += 0.1;
    } else if (event.keyCode == 76) {   // l
      xSpeed -= 0.1;
    }

    //depth
    if (event.keyCode == 73) {  // i
      zSpeed += 0.1;
    } else if (event.keyCode == 75) {   // k
      zSpeed -= 0.1;
    }
  }

  function onKeyup(event) {
    console.log(event.keyCode, xSpeed, zSpeed);

    if (event.keyCode == 74) xSpeed += 0.1; // j
    if (event.keyCode == 76) xSpeed -= 0.1; // l
    if (event.keyCode == 73) {  // i
      zSpeed += 0.1;
    } else if (event.keyCode == 75) {   // k
      zSpeed -= 0.1;
    }
  }

  document.addEventListener('keydown', onKeydown);
  document.addEventListener('keyup', onKeyup);

  const loop = () => {
    angle = performance.now() / 1000/ 6 * 2 * Math.PI;
    glMatrix.mat4.translate(
      modelMatrix, identityMatrix, [xSpeed, 0, zSpeed]
    );

    gl.uniformMatrix4fv(ModelUniformPointer, gl.FALSE, modelMatrix);

    gl.clearColor(0.75, 0.85, 0.8, 1.0);
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0)

    requestAnimationFrame(loop);
  }

  loop();
  //#endregion
  
  // #region TUGAS WEBGL #2
  // const modelLoc = gl.getUniformLocation(shaderProgram, 'uModel');
  // const viewLoc = gl.getUniformLocation(shaderProgram, 'uView');
  // const projectionLoc = gl.getUniformLocation(shaderProgram, 'uProjection');
  
  // const model = glMatrix.mat4.create();
  // const view = glMatrix.mat4.create();
  // const projection = glMatrix.mat4.create();

  // console.log(model);
  // console.log(view);
  // console.log(projection);

  // glMatrix.mat4.rotateZ(model, model, .1)
  // glMatrix.mat4.scale(model, model, [.8, .8, .8])

  // glMatrix.mat4.lookAt(view, [0,0,0], [0,0,0], [0,0,0])

  // gl.uniformMatrix4fv(modelLoc, false, model);
  // gl.uniformMatrix4fv(viewLoc, false, view);
  // gl.uniformMatrix4fv(projectionLoc, false, projection);
  // //#endregion

  // gl.clearColor(1.0, 0.5, 0.0, 1.0);
  // gl.clear(gl.COLOR_BUFFER_BIT);
  
  
  const tugasSatu = () => {

    var vertices = [
      1.0, 0.0, 1.0, 1.0, 1.0, 1,
      -1.0, 0.0, 1.0, 1.0, 1.0, 1,
      0.0, 1.0, 1.0, 1.0, 1.0, 1,
      0.0, -1.0, 1.0, 1.0, 1.0, 1,
    ];
  
    var segment1 = [
      -0.35, 0.8, 1.0, 1.0, 1.0, 1,
      -0.65, 0.8, 1.0, 1.0, 1.0, 1,
      -0.4, 0.85, 1.0, 1.0, 1.0, 1,
      -0.6, 0.85, 1.0, 1.0, 1.0, 1,
      -0.4, 0.75, 1.0, 1.0, 1.0, 1,
      -0.6, 0.75, 1.0, 1.0, 1.0, 1,
  
      -0.35, 0.8, 1.0, 1.0, 1.0, 1,
      -0.4, 0.85, 1.0, 1.0, 1.0, 1,
  
      -0.35, 0.8, 1.0, 1.0, 1.0, 1,
      -0.4, 0.75, 1.0, 1.0, 1.0, 1,
  
      -0.65, 0.8, 1.0, 1.0, 1.0, 1,
      -0.6, 0.85, 1.0, 1.0, 1.0, 1,
  
      -0.65, 0.8, 1.0, 1.0, 1.0, 1,
      -0.6, 0.75, 1.0, 1.0, 1.0, 1,
    ];
  
    var segment2 = [
      -0.35, 0.8, 1.0, 1.0, 1.0, 1,
      -0.35, 0.5, 1.0, 1.0, 1.0, 1,
      -0.3, 0.75, 1.0, 1.0, 1.0, 1,
      -0.3, 0.55, 1.0, 1.0, 1.0, 1,
      -0.4, 0.75, 1.0, 1.0, 1.0, 1,
      -0.4, 0.55, 1.0, 1.0, 1.0, 1,
  
      -0.3, 0.75, 1.0, 1.0, 1.0, 1,
      -0.35, 0.8, 1.0, 1.0, 1.0, 1,
      -0.4, 0.75, 1.0, 1.0, 1.0, 1,
      -0.35, 0.8, 1.0, 1.0, 1.0, 1,
      
      -0.35, 0.5, 1.0, 1.0, 1.0, 1,
      -0.3, 0.55, 1.0, 1.0, 1.0, 1,
      -0.35, 0.5, 1.0, 1.0, 1.0, 1,
      -0.4, 0.55, 1.0, 1.0, 1.0, 1,
    ];
    
    var segment3 = [
      -0.35, 0.5, 1.0, 1.0, 1.0, 1,
      -0.35, 0.2, 1.0, 1.0, 1.0, 1,
      -0.3, 0.45, 1.0, 1.0, 1.0, 1,
      -0.3, 0.25, 1.0, 1.0, 1.0, 1,
      -0.4, 0.45, 1.0, 1.0, 1.0, 1,
      -0.4, 0.25, 1.0, 1.0, 1.0, 1,
  
      -0.3, 0.45, 1.0, 1.0, 1.0, 1,
      -0.35, 0.5, 1.0, 1.0, 1.0, 1,
      -0.4, 0.45, 1.0, 1.0, 1.0, 1,
      -0.35, 0.5, 1.0, 1.0, 1.0, 1,
      
      -0.35, 0.2, 1.0, 1.0, 1.0, 1,
      -0.3, 0.25, 1.0, 1.0, 1.0, 1,
      -0.35, 0.2, 1.0, 1.0, 1.0, 1,
      -0.4, 0.25, 1.0, 1.0, 1.0, 1,
    ];
  
    var segment4 = [
      -0.35, 0.2, 1.0, 1.0, 1.0, 1,
      -0.65, 0.2, 1.0, 1.0, 1.0, 1,
      -0.4, 0.25, 1.0, 1.0, 1.0, 1,
      -0.6, 0.25, 1.0, 1.0, 1.0, 1,
      -0.4, 0.15, 1.0, 1.0, 1.0, 1,
      -0.6, 0.15, 1.0, 1.0, 1.0, 1,
  
      -0.35, 0.2, 1.0, 1.0, 1.0, 1,
      -0.4, 0.25, 1.0, 1.0, 1.0, 1,
  
      -0.35, 0.2, 1.0, 1.0, 1.0, 1,
      -0.4, 0.15, 1.0, 1.0, 1.0, 1,
  
      -0.65, 0.2, 1.0, 1.0, 1.0, 1,
      -0.6, 0.25, 1.0, 1.0, 1.0, 1,
  
      -0.65, 0.2, 1.0, 1.0, 1.0, 1,
      -0.6, 0.15, 1.0, 1.0, 1.0, 1,
    ];
  
    var segment5 = [
      -0.65, 0.5, 1.0, 1.0, 1.0, 1,
      -0.65, 0.2, 1.0, 1.0, 1.0, 1,
      -0.6, 0.45, 1.0, 1.0, 1.0, 1,
      -0.6, 0.25, 1.0, 1.0, 1.0, 1,
      -0.7, 0.45, 1.0, 1.0, 1.0, 1,
      -0.7, 0.25, 1.0, 1.0, 1.0, 1,
  
      -0.6, 0.45, 1.0, 1.0, 1.0, 1,
      -0.65, 0.5, 1.0, 1.0, 1.0, 1,
      -0.7, 0.45, 1.0, 1.0, 1.0, 1,
      -0.65, 0.5, 1.0, 1.0, 1.0, 1,
      
      -0.65, 0.2, 1.0, 1.0, 1.0, 1,
      -0.6, 0.25, 1.0, 1.0, 1.0, 1,
      -0.65, 0.2, 1.0, 1.0, 1.0, 1,
      -0.7, 0.25, 1.0, 1.0, 1.0, 1,
    ];
  
    var segment6 = [
      -0.65, 0.8, 1.0, 1.0, 1.0, 1,
      -0.65, 0.5, 1.0, 1.0, 1.0, 1,
      -0.6, 0.75, 1.0, 1.0, 1.0, 1,
      -0.6, 0.55, 1.0, 1.0, 1.0, 1,
      -0.7, 0.75, 1.0, 1.0, 1.0, 1,
      -0.7, 0.55, 1.0, 1.0, 1.0, 1,
  
      -0.6, 0.75, 1.0, 1.0, 1.0, 1,
      -0.65, 0.8, 1.0, 1.0, 1.0, 1,
      -0.7, 0.75, 1.0, 1.0, 1.0, 1,
      -0.65, 0.8, 1.0, 1.0, 1.0, 1,
      
      -0.65, 0.5, 1.0, 1.0, 1.0, 1,
      -0.6, 0.55, 1.0, 1.0, 1.0, 1,
      -0.65, 0.5, 1.0, 1.0, 1.0, 1,
      -0.7, 0.55, 1.0, 1.0, 1.0, 1,
    ];
  
    var segment7 = [
      -0.35, 0.5, 1.0, 1.0, 1.0, 1,
      -0.65, 0.5, 1.0, 1.0, 1.0, 1,
      -0.4, 0.55, 1.0, 1.0, 1.0, 1,
      -0.6, 0.55, 1.0, 1.0, 1.0, 1,
      -0.4, 0.45, 1.0, 1.0, 1.0, 1,
      -0.6, 0.45, 1.0, 1.0, 1.0, 1,
  
      -0.35, 0.5, 1.0, 1.0, 1.0, 1,
      -0.4, 0.55, 1.0, 1.0, 1.0, 1,
  
      -0.35, 0.5, 1.0, 1.0, 1.0, 1,
      -0.4, 0.45, 1.0, 1.0, 1.0, 1,
  
      -0.65, 0.5, 1.0, 1.0, 1.0, 1,
      -0.6, 0.55, 1.0, 1.0, 1.0, 1,
  
      -0.65, 0.5, 1.0, 1.0, 1.0, 1,
      -0.6, 0.45, 1.0, 1.0, 1.0, 1,
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
      0.65, 0.8, 1.0, 1.0, 1.0, 1,
      0.35, 0.8, 1.0, 1.0, 1.0, 1,
      0.6, 0.85, 1.0, 1.0, 1.0, 1,
      0.4, 0.85, 1.0, 1.0, 1.0, 1,
      0.4, 0.75, 1.0, 1.0, 1.0, 1,
      0.6, 0.75, 1.0, 1.0, 1.0, 1,
  
      0.65, 0.8, 1.0, 1.0, 1.0, 1,
      0.6, 0.75, 1.0, 1.0, 1.0, 1,
      
      0.65, 0.8, 1.0, 1.0, 1.0, 1,
      0.6, 0.85, 1.0, 1.0, 1.0, 1,
      
      0.35, 0.8, 1.0, 1.0, 1.0, 1,
      0.4, 0.75, 1.0, 1.0, 1.0, 1,
      
      0.35, 0.8, 1.0, 1.0, 1.0, 1,
      0.4, 0.85, 1.0, 1.0, 1.0, 1,
    ];
    
    segment3 = [
      0.65, 0.5, 1.0, 1.0, 1.0, 1,
      0.65, 0.2, 1.0, 1.0, 1.0, 1,
      0.7, 0.45, 1.0, 1.0, 1.0, 1,
      0.7, 0.25, 1.0, 1.0, 1.0, 1,
      0.6, 0.45, 1.0, 1.0, 1.0, 1,
      0.6, 0.25, 1.0, 1.0, 1.0, 1,
  
      0.7, 0.45, 1.0, 1.0, 1.0, 1,
      1-0.35, 0.5, 1.0, 1.0, 1.0, 1,
      1-0.4, 0.45, 1.0, 1.0, 1.0, 1,
      1-0.35, 0.5, 1.0, 1.0, 1.0, 1,
      
      1-0.35, 0.2, 1.0, 1.0, 1.0, 1,
      1-0.3, 0.25, 1.0, 1.0, 1.0, 1,
      1-0.35, 0.2, 1.0, 1.0, 1.0, 1,
      1-0.4, 0.25, 1.0, 1.0, 1.0, 1,
    ];
  
    var segment4 = [
      1-0.35, 0.2, 1.0, 1.0, 1.0, 1,
      1-0.65, 0.2, 1.0, 1.0, 1.0, 1,
      1-0.4, 0.25, 1.0, 1.0, 1.0, 1,
      1-0.6, 0.25, 1.0, 1.0, 1.0, 1,
      1-0.4, 0.15, 1.0, 1.0, 1.0, 1,
      1-0.6, 0.15, 1.0, 1.0, 1.0, 1,
  
      1-0.35, 0.2, 1.0, 1.0, 1.0, 1,
      1-0.4, 0.25, 1.0, 1.0, 1.0, 1,
  
      1-0.35, 0.2, 1.0, 1.0, 1.0, 1,
      1-0.4, 0.15, 1.0, 1.0, 1.0, 1,
  
      1-0.65, 0.2, 1.0, 1.0, 1.0, 1,
      1-0.6, 0.25, 1.0, 1.0, 1.0, 1,
  
      1-0.65, 0.2, 1.0, 1.0, 1.0, 1,
      1-0.6, 0.15, 1.0, 1.0, 1.0, 1,
    ];
  
    var segment5 = [
      1-0.65, 0.5, 1.0, 1.0, 1.0, 1,
      1-0.65, 0.2, 1.0, 1.0, 1.0, 1,
      1-0.6, 0.45, 1.0, 1.0, 1.0, 1,
      1-0.6, 0.25, 1.0, 1.0, 1.0, 1,
      1-0.7, 0.45, 1.0, 1.0, 1.0, 1,
      1-0.7, 0.25, 1.0, 1.0, 1.0, 1,
  
      1-0.6, 0.45, 1.0, 1.0, 1.0, 1,
      1-0.65, 0.5, 1.0, 1.0, 1.0, 1,
      1-0.7, 0.45, 1.0, 1.0, 1.0, 1,
      1-0.65, 0.5, 1.0, 1.0, 1.0, 1,
      
      1-0.65, 0.2, 1.0, 1.0, 1.0, 1,
      1-0.6, 0.25, 1.0, 1.0, 1.0, 1, 
      1-0.65, 0.2, 1.0, 1.0, 1.0, 1,
      1-0.7, 0.25, 1.0, 1.0, 1.0, 1,
    ];
  
    var segment6 = [
      1-0.65, 0.8, 1.0, 1.0, 1.0, 1,
      1-0.65, 0.5, 1.0, 1.0, 1.0, 1,
      1-0.6, 0.75, 1.0, 1.0, 1.0, 1,
      1-0.6, 0.55, 1.0, 1.0, 1.0, 1,
      1-0.7, 0.75, 1.0, 1.0, 1.0, 1,
      1-0.7, 0.55, 1.0, 1.0, 1.0, 1,
  
      1-0.6, 0.75, 1.0, 1.0, 1.0, 1,
      1-0.65, 0.8, 1.0, 1.0, 1.0, 1,
      1-0.7, 0.75, 1.0, 1.0, 1.0, 1,
      1-0.65, 0.8, 1.0, 1.0, 1.0, 1,
      
      1-0.65, 0.5, 1.0, 1.0, 1.0, 1,
      1-0.6, 0.55, 1.0, 1.0, 1.0, 1,
      1-0.65, 0.5, 1.0, 1.0, 1.0, 1,
      1-0.7, 0.55, 1.0, 1.0, 1.0, 1,
    ];
  
    var segment7 = [
      1-0.35, 0.5, 1.0, 1.0, 1.0, 1,
      1-0.65, 0.5, 1.0, 1.0, 1.0, 1,
      1-0.4, 0.55, 1.0, 1.0, 1.0, 1,
      1-0.6, 0.55, 1.0, 1.0, 1.0, 1,
      1-0.4, 0.45, 1.0, 1.0, 1.0, 1,
      1-0.6, 0.45, 1.0, 1.0, 1.0, 1,
  
      1-0.35, 0.5, 1.0, 1.0, 1.0, 1,
      1-0.4, 0.55, 1.0, 1.0, 1.0, 1,
  
      1-0.35, 0.5, 1.0, 1.0, 1.0, 1,
      1-0.4, 0.45, 1.0, 1.0, 1.0, 1,
  
      1-0.65, 0.5, 1.0, 1.0, 1.0, 1,
      1-0.6, 0.55, 1.0, 1.0, 1.0, 1,
  
      1-0.65, 0.5, 1.0, 1.0, 1.0, 1,
      1-0.6, 0.45, 1.0, 1.0, 1.0, 1,
    ];
  
    draw(gl, shaderProgram, gl.LINES, segment1, dimension, subarrayLen);
    draw(gl, shaderProgram, gl.LINES, segment2, dimension, subarrayLen);
    draw(gl, shaderProgram, gl.LINES, segment3, dimension, subarrayLen);
    draw(gl, shaderProgram, gl.LINES, segment4, dimension, subarrayLen);
    // draw(gl, shaderProgram, gl.LINES, segment5, dimension, subarrayLen);
    draw(gl, shaderProgram, gl.LINES, segment6, dimension, subarrayLen);
    draw(gl, shaderProgram, gl.LINES, segment7, dimension, subarrayLen);
  
  
    // drawSevenSegment(8, 0, 0, 0.3, 0.1);
  
    let M = 
    [
      -0.8, -0.15, 1.0, 1.0, 1.0,  1,//1
      -0.8, -0.85, 1.0, 1.0, 1.0,  1,//2
      -0.75, -0.85, 1.0, 1.0, 1.0,  1,//3
      -0.75, -0.15, 1.0, 1.0, 1.0,  1,//12
    ]
    draw(gl, shaderProgram, gl.TRIANGLE_FAN, M, dimension, subarrayLen);
    M = 
    [
      -0.75, -0.25, 1.0, 1.0, 1.0,  1,//4
      -0.5, -0.85, 1.0, 1.0, 1.0,  1,//5
      -0.5, -0.75, 1.0, 1.0, 1.0,  1,//11
      -0.75, -0.15, 1.0, 1.0, 1.0,  1,//12
    ]
    draw(gl, shaderProgram, gl.TRIANGLE_FAN, M, dimension, subarrayLen);
    M = 
    [
      -0.5, -0.85, 1.0, 1.0, 1.0,  1,//5
      -0.20, -0.15, 1.0, 1.0, 1.0,  1,//9
      -0.25, -0.15, 1.0, 1.0, 1.0,  1,//10
      -0.5, -0.75, 1.0, 1.0, 1.0,  1,//11
    ]
    draw(gl, shaderProgram, gl.TRIANGLE_FAN, M, dimension, subarrayLen);
    M = 
    [
      -0.25, -0.25, 1.0, 1.0, 1.0, 1, //6
      -0.25, -0.85, 1.0, 1.0, 1.0,  1,//7
      -0.20, -0.85, 1.0, 1.0, 1.0,  1,//8
      -0.20, -0.15, 1.0, 1.0, 1.0,  1,//9
      -0.25, -0.15, 1.0, 1.0, 1.0,  1,//10
    ]
    draw(gl, shaderProgram, gl.TRIANGLE_FAN, M, dimension, subarrayLen);
  
    let A = [
      0.475, -0.15, 0.0, 0.0, 0.0, 0,
      0.2, -0.85, 0.0, 0.0, 0.0, 0,
      0.25, -0.85, 0.0, 0.0, 0.0, 0,
      
      (0.25+0.525)/2, (-0.85+-0.15)/2, 0.0, 0.0, 0.0, 0,
      (0.475+0.75)/2, (-0.15+-0.85)/2, 0.0, 0.0, 0.0, 0,
  
      
      0.75, -0.85, 0.0, 0.0, 0.0, 0,
      0.8, -0.85, 0.0, 0.0, 0.0, 0,
      0.525, -0.15, 0.0, 0.0, 0.0, 0,
  
      (0.25+0.525)/2+0.05, (-0.85+-0.15)/2+0.05, 0.0, 0.0, 0.0, 0,
      (0.475+0.75)/2-0.05, (-0.15+-0.85)/2+0.05, 0.0, 0.0, 0.0, 0,
      ((0.475+0.75)/2-0.05+(0.25+0.525)/2+0.05)/2, -0.2, 0.0, 0.0, 0.0, 0,
    ]
  
    // draw(gl, shaderProgram, gl.POINTS, A, dimension, subarrayLen);
  
    A = [
      0.475, -0.15, 0.0, 0.0, 0.0, 0,
      0.2, -0.85, 0.0, 0.0, 0.0, 0,
      0.25, -0.85, 0.0, 0.0, 0.0, 0,
      
      (0.25+0.525)/2, (-0.85+-0.15)/2, 0.0, 0.0, 0.0, 0,
      (0.475+0.75)/2, (-0.15+-0.85)/2, 0.0, 0.0, 0.0, 0,
  
      
      0.75, -0.85, 0.0, 0.0, 0.0, 0,
      0.8, -0.85, 0.0, 0.0, 0.0, 0,
      0.525, -0.15, 0.0, 0.0, 0.0, 0,
  
      (0.25+0.525)/2+0.05, (-0.85+-0.15)/2+0.05, 0.0, 0.0, 0.0, 0,
      (0.475+0.75)/2-0.05, (-0.15+-0.85)/2+0.05, 0.0, 0.0, 0.0, 0,
      ((0.475+0.75)/2-0.05+(0.25+0.525)/2+0.05)/2, -0.2, 0.0, 0.0, 0.0, 0,
    ]
  
    draw(gl, shaderProgram, gl.TRIANGLE_FAN, A, dimension, subarrayLen);
  
    A = [
      (0.25+0.525)/2+0.015, (-0.85+-0.15)/2+0.05, 0, 1.0, 0.5, 0,
      (0.475+0.75)/2-0.015, (-0.15+-0.85)/2+0.05, 0, 1.0, 0.5, 0,
      ((0.475+0.75)/2-0.05+(0.25+0.525)/2+0.05)/2, -0.2, 0, 1.0, 0.5, 0,
    ]
  
    draw(gl, shaderProgram, gl.TRIANGLES, A, dimension, subarrayLen);
  }
  // tugasSatu();
  //#endregion
  // tugasSatu();
}


