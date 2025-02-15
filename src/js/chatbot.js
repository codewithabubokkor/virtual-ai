import { auth } from './firebase-config';
import { signOut } from 'firebase/auth';

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let avatar, scene, camera, renderer, controls;
let chatBox = document.getElementById("chat-box");
let inputField = document.getElementById("chat-input");


function initThreeJS() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    document.body.appendChild(renderer.domElement);

    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    scene.background = new THREE.Color(0xffffff);

    const loader = new GLTFLoader();
    loader.load("/models/67b0d4fec77fe3f7bbcb50fd.glb", (gltf) => {
        avatar = gltf.scene;
        avatar.scale.set(3, 3, 3);
        avatar.position.y = -2;
        scene.add(avatar);
    }, undefined, function (error) {
        console.error('Error loading model:', error);
    });

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    camera.position.z = 10;
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}


window.onload = function () {
    initThreeJS();
};


document.addEventListener('DOMContentLoaded', () => {
    const logut = document.getElementById('logout-btn');
    if (logut) {
        logut.addEventListener('click', function (e) {
            signOut(auth).then(() => {
                window.location.href = 'login.html';
            }).catch((error) => {
                alert("Error: " + error.message);
            });
        });
    }
});

