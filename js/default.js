//FileStart:default.js 
 var windowWidth = window.innerWidth, windowHeight = window.innerHeight;
 var scene,camera,renderer;
 Init();
 createPlane();
 animate();
 function Init(){
 		scene = new THREE.Scene();
 		var VIEW_ANGLE = 2.64, ASPECT = windowWidth / windowHeight, NEAR = 0.1, FAR = 10000;
 		camera = new LeiaCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
 		camera.position.set(0,0,50);	
 		scene.add(camera);
 		renderer = new LeiaWebGLRenderer({
         antialias:true, 
 		renderMode: _renderMode, 
 		camPanelVisible: _camPanelVisible, 
 		gyroPanelVisible: _gyroPanelVisible,
 		camFov: _camFov,    
		devicePixelRatio: 1 
      } );
 		renderer.Leia_setSize( windowWidth, windowHeight );
 		document.body.appendChild( renderer.domElement );
 		
 		var xl = new THREE.DirectionalLight( 0x555555 );
 		xl.position.set( 1, 0, 2 );
 		scene.add( xl );
 		var pl = new THREE.PointLight(0x111111);
 		pl.position.set(-20, 10, 20);
 		scene.add(pl);
 
 		var ambientLight = new THREE.AmbientLight(0x111111);	
 		scene.add(ambientLight);
 }
function fx(x, y, t){
	if (t==null) t=0;
	var r = Math.sqrt(x*x+y*y);	
	var z = 5*Math.exp(1-r/5)*(Math.cos(1.2*r-t));
	return z;
}

function createPlane(){
	graph = new THREE.Mesh(new THREE.PlaneGeometry(40, 30, 100, 100), new THREE.MeshLambertMaterial({color:0xffffff}));
	scene.add(graph);
	
	for (var i=0; i<graph.geometry.vertices.length; i++) {
		graph.geometry.vertices[i].z = fx(graph.geometry.vertices[i].x, graph.geometry.vertices[i].y);
	}
	updateStuff();
	
}
function updateStuff(){
	graph.geometry.verticesNeedUpdate = true;
	graph.geometry.elementsNeedUpdate = true;
	graph.geometry.morphTargetsNeedUpdate = true;
	graph.geometry.uvsNeedUpdate = true;
	graph.geometry.normalsNeedUpdate = true;
	graph.geometry.colorsNeedUpdate = true;
	graph.geometry.tangentsNeedUpdate = true;
	graph.geometry.computeVertexNormals();
	graph.geometry.computeFaceNormals();
}
 function animate() 
 {
 	requestAnimationFrame( animate );
    updateStuff();
    renderer.setClearColor(new THREE.Color().setRGB(1.0, 1.0, 1.0)); 
	renderer.Leia_render(scene, camera,undefined,undefined,0.4);
 }
 //FileEnd
