'use strict';
import * as THREE from 'https://cdn.skypack.dev/pin/three@v0.136.0-4Px7Kx1INqCFBN0tXUQc/mode=imports/optimized/three.js';
import { GLTFLoader } from ' https://cdn.skypack.dev/pin/three@v0.136.0-4Px7Kx1INqCFBN0tXUQc/mode=imports/unoptimized/examples/jsm/loaders/GLTFLoader.js';
scroller: document.body;
const startProgress = document.getElementById("initProgress");
startProgress.value = 10;
let width = window.innerWidth;
let height = window.innerHeight;
let mousex = 0;
let mousey = 0;
var isMobile = {
    Android:    () => navigator.userAgent.match(/Android/i),
    BlackBerry: () => navigator.userAgent.match(/BlackBerry/i),
    iOS:        () => navigator.userAgent.match(/iPhone|iPad|iPod/i),
    Opera:      () => navigator.userAgent.match(/Opera Mini/i),
    Windows:    () => navigator.userAgent.match(/IEMobile/i),
    any:        () => (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows())
};
const startButton = document.getElementById("initButton");
startButton.addEventListener("click", e => {
    document.getElementById("basicSite").remove();
    start3d();

    if(isMobile.iOS()) {
        if ( typeof( DeviceOrientationEvent ) !== "undefined" && typeof( DeviceOrientationEvent.requestPermission ) === "function" ) {
            DeviceOrientationEvent.requestPermission()
                .then( response => {
                if ( response == "granted" ) {
                    window.addEventListener("deviceorientation", e => {
                        doAnimate=true;
                        mousex = -e.gamma/90;
                        mousey = -(e.beta)/180;
                        console.log(mousex + ", " + mousey);
                    }, true);
                }
            })
                .catch( console.error )
        } else {
            alert( "DeviceMotionEvent is not defined" );
        }
    } else {
        if(isMobile.any()) {
            window.addEventListener("deviceorientation", e => {
                doAnimate=true;
                mousex = -e.gamma/90;
                mousey = -(e.beta)/180;
                console.log(mousex + ", " + mousey);
            }, true);
        } else {
            window.addEventListener('mousemove', e => {
                doAnimate=true;
                mousex = (e.clientX / width * 2 - 1);
                mousey = (e.clientY / height * 2 - 1);
                console.log(mousex + ", " + mousey);
    
            });
        }
    }
})


let doAnimate = true;



window.onload = () => {
    startProgress.value += 10;
    let progressAnimationPoints = 40;
    const startanimate = () => {
    
        if(startProgress.value >= 100) { 
            startButton.disabled = false;
            return;
        }
        if(progressAnimationPoints != 0) {
            progressAnimationPoints -= 0.5;
            startProgress.value += 0.5;
        }
        requestAnimationFrame( startanimate );
    };
    startanimate();
};


const scene = new THREE.Scene();
const loader = new GLTFLoader();

let models = [];
let progressPoint = 50 / 4;
loader.load( 'models/leon2SmootherShapet2.glb', function ( gltf ) {
    startProgress.value += progressPoint;
    let modelScene = gltf.scene;
    modelScene.scale.set(1,1,1);
    modelScene.position.set(0,0,0);
    gltf.scene.children[0].material = new THREE.MeshNormalMaterial();
    scene.add(modelScene);
    models.push(gltf.scene.children[0])

    loader.load( 'models/RentToy/RentToy.glb', function ( gltf2 ) {
        startProgress.value += progressPoint;
        let modelScene2 = gltf2.scene;
        modelScene2.scale.set(1.5,1.5,1.5);
        modelScene2.position.set(0,.2,0);
        modelScene2.rotation.set(0,1.5708,0);
        scene.add(modelScene2);
        gltf2.scene.children[0].position.y = -2;
        models.push(gltf2.scene.children[0])
        loader.load( 'models/DonutTutoeial.glb', function ( gltf2 ) {
            startProgress.value += progressPoint;
            let modelScene2 = gltf2.scene;
            modelScene2.scale.set(1.5,1.5,1.5);
            modelScene2.position.set(0,.2,0);
            modelScene2.rotation.set(.4,0,.1);
            scene.add(modelScene2);
            gltf2.scene.children[0].position.y = -2;
            models.push(gltf2.scene.children[0])
            loader.load( 'models/Spill/OleGameOpen.glb', function ( gltf2 ) {
                startProgress.value += progressPoint;
                let modelScene2 = gltf2.scene;
                modelScene2.scale.set(1,1,1);
                modelScene2.position.set(0,0.15,0);
                modelScene2.rotation.set(0,3.8,0);
        
                scene.add(modelScene2);
                gltf2.scene.children[0].position.y = -2;
                gltf2.scene.children[0].scale.set(0.1,0.1,0.1)
                models.push(gltf2.scene.children[0])
            }, undefined, undefined);
        }, undefined, undefined);
    }, undefined, undefined);
}, undefined, undefined);


// loadModel('models/RentTøy/RentTøy.glb');

function buildThresholdList() {
    let thresholds = [];
    let numSteps = 500;
  
    for (let i=1.0; i<=numSteps; i++) {
      let ratio = i/numSteps;
      thresholds.push(ratio);
    }
    thresholds.push(0);
    return thresholds;
  }


const sections = document.querySelectorAll(".section3d");
let model;
let nextModel;
let oldModel ;
const observer =  new IntersectionObserver((event) => {
    doAnimate = true;
    let max = 0;
    for (let i = 0; i < event.length; i++) {
        const e = event[i];
        const ratio = e.intersectionRatio;
        const thisModel = models[e.target.dataset.model];
        if(ratio <= 0) thisModel.visible = false;
        else {
            thisModel.visible = true;
            thisModel.position.y = ratio * 1.5 - 1.5;
            if(ratio >= max || ratio == 1) {
                model = thisModel;
                if(i-1 >= 0) oldModel  = models[event[i-1].target.dataset.model]; else oldModel = model;
            }
        }
    } 
}, {
    threshold: buildThresholdList(),
    rootMargin: "0% 0px 0% 0px"
})





let activeModelFunction = null;
function start3d() {
    
    sections.forEach(e => {
        models[e.dataset.model].modelID = e.dataset.model;
        observer.observe(e);
    });
    
    let activeModelFunction = morphTargetLook;
    function morphTargetLook(modeld) {
        
        switch (model.modelID) {
            case 2:return;
            case 3:return;
            case 4:return;
            case 1:return;
            case 0:
            default:
                if(!modeld.morphTargetInfluences) break;
                modeld.morphTargetInfluences[0] =  mousex;
                modeld.morphTargetInfluences[1] = -mousex;
                modeld.morphTargetInfluences[2] = -mousey;
                modeld.morphTargetInfluences[3] =  mousey;
                break;
        }

    }

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.gammaOutput = true;
    document.body.appendChild( renderer.domElement );
    renderer.domElement.classList.add("leonCanvas");
    const content = document.getElementById("content");
    content.classList.remove("hidden");
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );






    // renderer.physicallyCorrectLights = true;
    camera.position.x = 0;
    camera.position.y = .15;
    camera.position.z = .42;

    const light2 = new THREE.AmbientLight( 0xffffff); // soft white light
    scene.add( light2 );
    // scene.add( light );

    const animateDesktop = () => {
        requestAnimationFrame( animate );
        if(!doAnimate) return;
        doAnimate = false;
        if(model != undefined) {
            const pos = model.rotation;
            activeModelFunction(model)
            model.rotation.y = 1.4 + mousex * 0.1;
            model.position.z = mousey * 0.02;
        }
        if(nextModel != undefined) {
            activeModelFunction(nextModel)
            nextModel.rotation.y = 1.4 + mousex * 0.1;
            nextModel.position.z = mousey * 0.02;
            
        }
        if(oldModel != undefined) {
            activeModelFunction(oldModel)
            oldModel.rotation.y = 1.4 + mousex * 0.1;
            oldModel.position.z = mousey * 0.02;
        }


        renderer.render( scene, camera );
    };

    const animateMobile = () => {
        console.log(isMobile.any())
    }
    const animate = isMobile.any() ? animateDesktop : animateDesktop;

    animate();
    doAnimate = true;
    const resize = function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();    
        renderer.setSize( window.innerWidth, window.innerHeight );
        width = window.innerWidth;
        height = window.innerHeight;
        animate();
        doAnimate = true;
    };
    resize();

    let doCheck = true;
    window.addEventListener("resize",function(){
         if(doCheck){
            resize();
              doCheck = false;
              setTimeout(function(){
                   doCheck = true;
                   resize();
              },500)
         }
    });
    scene.background = null;
}