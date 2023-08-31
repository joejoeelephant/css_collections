'use client'
import React, {useEffect, useRef} from 'react'
import * as THREE from 'three';
import gsap from 'gsap'
import image_c1 from '../../../public/carousel/c1.png'
import image_c2 from '../../../public/carousel/c2.png'
import image_c3 from '../../../public/carousel/c3.png'
import image_c4 from '../../../public/carousel/c4.png'

import './style.css'

const generatePlaneImageMesh = (image_url: string) => {

    const vertexShader = `
        uniform float zoom;
        uniform float time; // Uniform to animate the ripple over time
        uniform vec2 rippleOrigin;// Uniform to specify where the ripple originates
        uniform float aspect; // New uniform to handle aspect ratio
        varying vec2 vUv;
        
        void main() {
            vUv = uv;
            vUv.x = uv.x * zoom + (1.0 - zoom) * 0.5;

            vec2 correctedPosition = vec2(position.x * aspect, position.y);

            float distance = length(correctedPosition.xy - rippleOrigin.xy);
  
            // Create a time-dependent circle radius
            float currentRadius = time;
            
            // Create a sine wave based on the distance to create a circular ripple
            float zOffset = 0.0;
            
            // Create a narrow band where the ripple happens
            if (distance < currentRadius + 0.1 && distance > currentRadius - 0.1) {
                zOffset = 0.1 * sin(20.0 * distance - 5.0 * time);
            }

            // New position
            vec3 newPosition = vec3(correctedPosition.x, correctedPosition.y, position.z + zOffset);

            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
    
    `;

    const fragmentShader = `
        uniform sampler2D imageTexture;
        varying vec2 vUv;
        
        void main() {
            gl_FragColor = texture2D(imageTexture, vUv);
        }
    `;
    // Initialize shader material
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(image_url);
    const shaderMaterial = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: {
            imageTexture: { value: texture },
            zoom: { value: 1 / 3 },
            time: { value: 0.0 },
            aspect: { value: 1.0}
        }
    });
    
    const geometry = new THREE.PlaneGeometry(1, 3, 100, 100);
    const mesh = new THREE.Mesh(geometry, shaderMaterial);

    const hitGeometry = new THREE.PlaneGeometry(1, 3);  // adjust these dimensions as needed
    const hitMaterial = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0.0  // make it fully transparent
    });
    const hitMesh = new THREE.Mesh(hitGeometry, hitMaterial);

    return {
        mesh, 
        hitMesh,
        shaderMaterial, 
        originPosition: mesh.position.clone(), 
        originUniforms: {zoom: 1/3, time: 0.0, aspect: 1.0}, 
        isAnimated: false,
    };
}

export default function Page() {
    const containerRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if(!containerRef.current) return;

        const container_width = containerRef.current.offsetWidth
        const container_height = containerRef.current.offsetHeight
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container_width / container_height, 0.1, 1000);
        camera.position.z = 5;
        const renderer = new THREE.WebGLRenderer({ antialias: true });

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        renderer.setSize(container_width , container_height);
        containerRef.current.appendChild(renderer.domElement);

        const generatePlaneImageMeshes = () => {
            const imageUrls = [image_c1.src,image_c2.src,image_c3.src,image_c4.src];

            const planeImageMeshes = imageUrls.map((item, index) => {
                const meshObject = generatePlaneImageMesh(item);
                meshObject.mesh.name = `${index}`
                meshObject.mesh.position.x = index * 1.1
                meshObject.mesh.position.y = index * -0.01
                meshObject.mesh.position.z = index * -0.03

                meshObject.hitMesh.name = `${index}`
                meshObject.hitMesh.position.x = index * 1.1
                meshObject.hitMesh.position.y = index * -0.01
                meshObject.hitMesh.position.z = index * -0.03 + 0.1

                const originPosition = Object.assign({}, meshObject.mesh.position)
                meshObject.originPosition = originPosition
                return meshObject;
            });

            return planeImageMeshes;
        }

        const imageMeshes = generatePlaneImageMeshes()

        const imagesGroup = new THREE.Group()
        let isGroupDragged = false;
        imageMeshes.forEach(item => {
            imagesGroup.add(item.mesh)
            imagesGroup.add(item.hitMesh)
        })

        scene.add(imagesGroup)
        
        containerRef.current.addEventListener('click', (event) => {
            event.preventDefault()
            mouse.x = (event.clientX / container_width) * 2 - 1;
            mouse.y = -(event.clientY / container_height) * 2 + 1;
            if(isGroupDragged) {
                return
            }
            checkForMeshClick()
        });


        const draggableGroup = (imagesGroup: THREE.Group) => {
            if(!containerRef.current) return;
            let  selectedGroup: any;
            let intersectPlane = new THREE.Plane();
            let offset = new THREE.Vector3();

            const onMouseDown = (event: MouseEvent) => {
                event.preventDefault();
                mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                // mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
                raycaster.setFromCamera(mouse, camera);
                const intersects = raycaster.intersectObject(imagesGroup, true);
    
                if (intersects.length > 0) {
                    selectedGroup = imagesGroup;
                    intersectPlane.setFromNormalAndCoplanarPoint(camera.getWorldDirection(intersectPlane.normal), intersects[0].object.position);
                    offset.copy(intersects[0].point).sub(selectedGroup.position);
                    isGroupDragged = false
                }
            }

            function onMouseMove(event: MouseEvent) {
                event.preventDefault();
                if (selectedGroup) {
                    isGroupDragged = true;
                    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                    // mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
                
                    raycaster.setFromCamera(mouse, camera);
  
                    const intersectPoint = new THREE.Vector3();
                    if (raycaster.ray.intersectPlane(intersectPlane, intersectPoint)) {
                        selectedGroup.position.copy(intersectPoint.sub(offset));
                    }
                }
            }

            function onMouseUp(event: MouseEvent) {
                event.preventDefault();
                selectedGroup = null;
            }
              
            containerRef.current.addEventListener('mousedown', onMouseDown, false);
            containerRef.current.addEventListener('mousemove', onMouseMove, false);
            containerRef.current.addEventListener('mouseup', onMouseUp, false);
        }

        const checkForMeshClick = () => {
            raycaster.setFromCamera(mouse, camera);
            const meshes = imageMeshes.map(item => item.mesh)
            const hitMeshes = imageMeshes.map(item => item.hitMesh)
            const intersects = raycaster.intersectObjects([...meshes, ...hitMeshes]);
        
            if (intersects.length > 0) {
                const clickedMesh = intersects[0].object;
                const clickedName = clickedMesh.name;
                const clickedObject = imageMeshes.find(item => item.mesh.name === clickedName);
                // If we have a clicked object, proceed to animate it
                if (clickedObject) {
                    console.log(clickedObject.hitMesh.name)

                    animateImage(clickedObject);
                }
            }
        };

        draggableGroup(imagesGroup)


        const animateImage = (imageObject: any) => {
            const index = Number(imageObject.mesh.name);
            const expand = () => {
                gsap.killTweensOf(imageObject.originUniforms)
                gsap.killTweensOf(imageObject.mesh.position)
                gsap.to(imageObject.originUniforms, {
                    duration: 3,
                    time: 3.0,
                    zoom: 1.0,
                    aspect: 3.0,
                    ease: "power3.inOut",
                    onUpdate: function() {
                        imageObject.shaderMaterial.uniforms.time.value = imageObject.originUniforms.time;
                        imageObject.shaderMaterial.uniforms.zoom.value = imageObject.originUniforms.zoom;
                        imageObject.shaderMaterial.uniforms.aspect.value = imageObject.originUniforms.aspect;

                    }
                });

                gsap.to(imagesGroup.position, {
                    x: -index
                });

                gsap.to(imageObject.mesh.position, {
                    z: 3,
                    duration: 1
                });

                gsap.to(imageObject.hitMesh.position, {
                    z: 3.1,
                    duration: 1
                });

                gsap.to(imageObject.hitMesh.scale, {
                    x: 3,
                    duration: 1
                });


            }

            const reduction = () => {
                gsap.killTweensOf(imageObject.originUniforms)
                gsap.killTweensOf(imageObject.mesh.position)

                gsap.to(imageObject.originUniforms, {
                    duration: 2,
                    time: 0.0,
                    zoom: 1/3,
                    aspect: 1.0,
                    ease: "power3.inOut",
                    onUpdate: function() {
                        imageObject.shaderMaterial.uniforms.time.value = imageObject.originUniforms.time;
                        imageObject.shaderMaterial.uniforms.zoom.value = imageObject.originUniforms.zoom;
                        imageObject.shaderMaterial.uniforms.aspect.value = imageObject.originUniforms.aspect;

                    }
                });

                gsap.to(imageObject.mesh.position, {
                    z: imageObject.originPosition.z,
                    x: imageObject.originPosition.x,
                    y: imageObject.originPosition.y,
                    duration: 3
                });

                gsap.to(imageObject.hitMesh.position, {
                    z: imageObject.originPosition.z + 0.1,
                    x: imageObject.originPosition.x,
                    y: imageObject.originPosition.y,
                    duration: 3
                });

                gsap.to(imageObject.hitMesh.scale, {
                    x: 1,
                    duration: 1
                });


            }

            if(!imageObject.isAnimated) {
                expand()
                imageObject.isAnimated = true;
            }else {
                reduction()
                imageObject.isAnimated = false;
            }
        };

        const animate = () => {
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };
        
        animate();

        // Handle resizing of the window
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            renderer.dispose(); // Cleanup on component unmount
        };
    }, [])
    return (
        <div className='h-screen bg-slate-950 flex justify-center items-center'>
            <div className='w-full h-full overflow-hidden' ref={containerRef}>
                
            </div>
        </div>
    )
}
