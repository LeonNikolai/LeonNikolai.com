'use strict';
import * as THREE from 'https://cdn.skypack.dev/pin/three@v0.136.0-4Px7Kx1INqCFBN0tXUQc/mode=imports/optimized/three.js';
import { GLTFLoader } from ' https://cdn.skypack.dev/pin/three@v0.136.0-4Px7Kx1INqCFBN0tXUQc/mode=imports/unoptimized/examples/jsm/loaders/GLTFLoader.js';
scroller: document.body;
const startProgress = document.getElementById("initProgress");
const wrapper = document.getElementById("wrapper");
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
            
            }, true);
        } else {
            window.addEventListener('mousemove', e => {
                doAnimate=true;
                mousex = (e.clientX / width * 2 - 1);
                mousey = (e.clientY / height * 2 - 1);
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
    modelScene.position.set(0,-1,0);
    gltf.scene.children[0].material = new THREE.MeshNormalMaterial();
    scene.add(modelScene);
    models.push(gltf.scene.children[0])

    loader.load( 'models/RentToy/RentToy.glb', function ( gltf2 ) {
        startProgress.value += progressPoint;
        let modelScene2 = gltf2.scene;
        modelScene2.scale.set(1,1,1);
        modelScene2.position.set(0,.2-1,0);
        modelScene2.rotation.set(0,1.5708,0);
        scene.add(modelScene2);
    
        models.push(gltf2.scene.children[0])
        loader.load( 'models/Spill/OleGameOpen.glb', function ( gltf2 ) {
            startProgress.value += progressPoint;
            let modelScene2 = gltf2.scene;
            modelScene2.scale.set(1,1,1);
            modelScene2.position.set(0,.2-1,0);
            modelScene2.rotation.set(0,1.5708,0);
            scene.add(modelScene2);
            gltf2.scene.children[0].scale.set(0.1,0.1,0.1)
            models.push(gltf2.scene.children[0])
            loader.load( 'models/Spill/OleGameOpen.glb', function ( gltf2 ) {
                startProgress.value += progressPoint;
                let modelScene2 = gltf2.scene;
                modelScene2.scale.set(1,1,1);
                modelScene2.position.set(0,0.15-1,-0.1);
                modelScene2.rotation.set(0,3.8,0);
        
                scene.add(modelScene2);
            
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
let currentID = 0;
let nextModel;
let oldModel ;
const observer =  new IntersectionObserver((event) => {
    doAnimate = true;
    let max = 0;
    for (let i = 0; i < event.length; i++) {
        const e = event[i];
        const ratio = e.intersectionRatio;
        const modelID = e.target.dataset.model;
        const thisModel = models[modelID];
        if(!e.isIntersecting || ratio <= 0) {
            thisModel.visible = false;
            continue;
        }
        else {
            // console.log(ratio);
            thisModel.visible = true;
            if(e.boundingClientRect.top < ratio-1 && modelID != 0) thisModel.position.y = 1 + 1-ratio;
            else thisModel.position.y = ratio;
            
            if(ratio >= max) {
                max = ratio;
                currentID = modelID;
                window.requestAnimationFrame( swapBK);;
                model = thisModel;
                if(i-1 >= 0) oldModel  = models[event[i-1].target.dataset.model]; else oldModel = model;
            }
        }
    } 
}, {
    threshold: buildThresholdList(),
    rootMargin: "0% 0px 0% 0px"
})
const renderer = new THREE.WebGLRenderer({ alpha: true });
function swapBK(modelID = -1) {
    if(modelID = -1) modelID = currentID;
    let type =  "";
    switch (modelID) {
        case "0": type = "bk-animated"; break;
        default:
        case "1": type = "bk-solid";    break;
    }
    let _color;
    switch (modelID) {
        default:
        case "1": _color = "red"; break;
        case "2": _color = "yellow"; break;
        case "3": _color = "lime"; break;
        case "0": _color = "cyan"; break;
    }
    renderer.domElement.style.setProperty("--color", _color);
    if(renderer.domElement.classList[0] == type) return;
    renderer.domElement.classList.remove("bk-animated","bk-solid");
    renderer.domElement.classList.add(type);
}



let activeModelFunction = null;
function start3d() {
    
    sections.forEach(e => {
        models[e.dataset.model].modelID = e.dataset.model;
        observer.observe(e);
    });
    
    let activeModelFunction = morphTargetLook;
    function morphTargetLook(thismodel) {
        
        switch (thismodel) {
            case models[3]: 
            case models[1]: 
                thismodel.rotation.y += Math.sign(mousex) * 0.005 + 0.02 * mousex;
                doAnimate = true;
            break;
            
            case 0:
            default:
                thismodel.rotation.y = 1.4 + mousex * 0.1;
                thismodel.position.z = mousey * 0.02;
                if(!thismodel.morphTargetInfluences) break;
                thismodel.morphTargetInfluences[0] =  mousex;
                thismodel.morphTargetInfluences[1] = -mousex;
                thismodel.morphTargetInfluences[2] = -mousey;
                thismodel.morphTargetInfluences[3] =  mousey;
                break;
        }

    }

    renderer.gammaOutput = true;
    document.body.appendChild( renderer.domElement );
    renderer.domElement.classList.add("bk-animated");
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
    
        }
        if(nextModel != undefined) {
            activeModelFunction(nextModel)
    
            
        }
        if(oldModel != undefined) {
            activeModelFunction(oldModel)

        }


        renderer.render( scene, camera );
    };
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