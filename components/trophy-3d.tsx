"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function Trophy3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || 320;
    const height = container.clientHeight || 280;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 1000);
    camera.position.set(0, 0.25, 5.8);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;

    container.appendChild(renderer.domElement);

    // ── Generate Balanced Environment Reflection Map ──
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    const envScene = new THREE.Scene();
    envScene.background = new THREE.Color("#4a3b10");

    const envLight1 = new THREE.DirectionalLight(0xffffff, 2.5);
    envLight1.position.set(5, 10, 5);
    envScene.add(envLight1);

    const envLight2 = new THREE.DirectionalLight(0xffcc00, 1.5);
    envLight2.position.set(-5, 5, -5);
    envScene.add(envLight2);

    const envRt = pmremGenerator.fromScene(envScene);

    // ── Perfectly Balanced Metallic Gold Materials ──
    const shinyGoldMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#e6b800"), // Classic rich metallic gold
      emissive: new THREE.Color("#1f1400"), // Subtle warm undertone
      metalness: 0.78,
      roughness: 0.16,
      envMap: envRt.texture,
      envMapIntensity: 1.6,
    });

    const brightAccentGoldMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#f2c424"),
      emissive: new THREE.Color("#2a1b00"),
      metalness: 0.82,
      roughness: 0.14,
      envMap: envRt.texture,
      envMapIntensity: 1.8,
    });

    const polishedDarkBaseMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#18181c"),
      metalness: 0.6,
      roughness: 0.2,
    });

    // ── Main Trophy Group ──
    const trophyGroup = new THREE.Group();
    trophyGroup.scale.set(0.96, 0.96, 0.96);
    trophyGroup.position.set(0, 0.05, 0);

    // 1. Dark Marble Base
    const baseGeo = new THREE.BoxGeometry(1.2, 0.42, 1.2);
    const baseMesh = new THREE.Mesh(baseGeo, polishedDarkBaseMat);
    baseMesh.position.y = -1.15;
    trophyGroup.add(baseMesh);

    // Base Gold Footer Trim
    const baseFooterGeo = new THREE.BoxGeometry(1.3, 0.08, 1.3);
    const baseFooterMesh = new THREE.Mesh(baseFooterGeo, shinyGoldMat);
    baseFooterMesh.position.y = -1.38;
    trophyGroup.add(baseFooterMesh);

    // ── 1b. Engraved Text Plaque ("CHAMPIONS OF NIRMAAN 2026") ──
    const textCanvas = document.createElement("canvas");
    textCanvas.width = 512;
    textCanvas.height = 160;
    const ctx = textCanvas.getContext("2d");

    if (ctx) {
      const grad = ctx.createLinearGradient(0, 0, 512, 160);
      grad.addColorStop(0, "#f3d368");
      grad.addColorStop(0.3, "#ffffff");
      grad.addColorStop(0.65, "#e6b800");
      grad.addColorStop(1, "#a88500");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 160);

      ctx.strokeStyle = "#2b2200";
      ctx.lineWidth = 8;
      ctx.strokeRect(10, 10, 492, 140);

      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 3;
      ctx.strokeRect(18, 18, 476, 124);

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.shadowColor = "rgba(0,0,0,0.3)";
      ctx.shadowBlur = 3;
      ctx.shadowOffsetY = 2;

      ctx.fillStyle = "#0f0f14";
      ctx.font = "900 34px 'Outfit', 'Inter', system-ui, sans-serif";
      ctx.fillText("CHAMPIONS OF", 256, 52);

      ctx.fillStyle = "#d6001c";
      ctx.font = "900 38px 'Outfit', 'Inter', system-ui, sans-serif";
      ctx.fillText("NIRMAAN 2026", 256, 108);
    }

    const textTexture = new THREE.CanvasTexture(textCanvas);
    textTexture.needsUpdate = true;

    const plaqueMat = new THREE.MeshStandardMaterial({
      map: textTexture,
      metalness: 0.4,
      roughness: 0.2,
    });

    const plaqueGeo = new THREE.PlaneGeometry(1.0, 0.32);
    const frontPlaque = new THREE.Mesh(plaqueGeo, plaqueMat);
    frontPlaque.position.set(0, -1.15, 0.61);
    trophyGroup.add(frontPlaque);

    const backPlaque = new THREE.Mesh(plaqueGeo, plaqueMat);
    backPlaque.position.set(0, -1.15, -0.61);
    backPlaque.rotation.y = Math.PI;
    trophyGroup.add(backPlaque);

    // 2. Pedestal Stem Rings & Gold Pearl Beads
    const ring1 = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.6, 0.12, 24), shinyGoldMat);
    ring1.position.y = -0.88;
    trophyGroup.add(ring1);

    const beadCount = 16;
    for (let i = 0; i < beadCount; i++) {
      const angle = (i / beadCount) * Math.PI * 2;
      const bead = new THREE.Mesh(new THREE.SphereGeometry(0.042, 12, 12), brightAccentGoldMat);
      bead.position.set(Math.cos(angle) * 0.52, -0.88, Math.sin(angle) * 0.52);
      trophyGroup.add(bead);
    }

    const stemPoints: THREE.Vector2[] = [];
    stemPoints.push(new THREE.Vector2(0.2, -0.82));
    stemPoints.push(new THREE.Vector2(0.35, -0.62));
    stemPoints.push(new THREE.Vector2(0.22, -0.42));
    stemPoints.push(new THREE.Vector2(0.38, -0.22));
    stemPoints.push(new THREE.Vector2(0.25, -0.05));
    const stemGeo = new THREE.LatheGeometry(stemPoints, 32);
    const stemMesh = new THREE.Mesh(stemGeo, shinyGoldMat);
    trophyGroup.add(stemMesh);

    // 3. Main Fluted Trophy Bowl (Goblet Shape)
    const cupPoints: THREE.Vector2[] = [];
    cupPoints.push(new THREE.Vector2(0.25, -0.05));
    cupPoints.push(new THREE.Vector2(0.48, 0.25));
    cupPoints.push(new THREE.Vector2(0.72, 0.7));
    cupPoints.push(new THREE.Vector2(0.8, 0.95));
    cupPoints.push(new THREE.Vector2(0.78, 0.97));
    cupPoints.push(new THREE.Vector2(0.68, 0.7));
    cupPoints.push(new THREE.Vector2(0.44, 0.25));
    cupPoints.push(new THREE.Vector2(0.22, -0.05));

    const cupGeo = new THREE.LatheGeometry(cupPoints, 36);
    const cupMesh = new THREE.Mesh(cupGeo, shinyGoldMat);
    trophyGroup.add(cupMesh);

    // Decorative Ornate Gold Ribbed Rings around Cup Waist
    const cupWaistRing1 = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.032, 12, 32), brightAccentGoldMat);
    cupWaistRing1.position.y = 0.35;
    cupWaistRing1.rotation.x = Math.PI / 2;
    trophyGroup.add(cupWaistRing1);

    const cupWaistRing2 = new THREE.Mesh(new THREE.TorusGeometry(0.74, 0.036, 12, 32), brightAccentGoldMat);
    cupWaistRing2.position.y = 0.75;
    cupWaistRing2.rotation.x = Math.PI / 2;
    trophyGroup.add(cupWaistRing2);

    // Front & Back 3D Star Medallion Emblem on Cup Bowl
    const starEmblemShape = new THREE.Shape();
    const ePoints = 5;
    for (let i = 0; i < ePoints * 2; i++) {
      const r = i % 2 === 0 ? 0.15 : 0.065;
      const a = (i / (ePoints * 2)) * Math.PI * 2 - Math.PI / 2;
      const x = Math.cos(a) * r;
      const y = Math.sin(a) * r;
      if (i === 0) starEmblemShape.moveTo(x, y);
      else starEmblemShape.lineTo(x, y);
    }
    starEmblemShape.closePath();

    const starEmblemGeo = new THREE.ExtrudeGeometry(starEmblemShape, {
      depth: 0.035,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.012,
      bevelThickness: 0.012,
    });
    starEmblemGeo.center();

    // Front Emblem
    const frontEmblem = new THREE.Mesh(starEmblemGeo, brightAccentGoldMat);
    frontEmblem.position.set(0, 0.55, 0.71);
    trophyGroup.add(frontEmblem);

    // Back Emblem
    const backEmblem = new THREE.Mesh(starEmblemGeo, brightAccentGoldMat);
    backEmblem.position.set(0, 0.55, -0.71);
    backEmblem.rotation.y = Math.PI;
    trophyGroup.add(backEmblem);

    // 4. Domed Conical Lid & Crown Finial
    const lidPoints: THREE.Vector2[] = [];
    lidPoints.push(new THREE.Vector2(0.78, 0.95));
    lidPoints.push(new THREE.Vector2(0.6, 1.15));
    lidPoints.push(new THREE.Vector2(0.3, 1.4));
    lidPoints.push(new THREE.Vector2(0.12, 1.6));
    lidPoints.push(new THREE.Vector2(0.0, 1.65));
    const lidGeo = new THREE.LatheGeometry(lidPoints, 32);
    const lidMesh = new THREE.Mesh(lidGeo, shinyGoldMat);
    trophyGroup.add(lidMesh);

    // Top Crown Finial Cone
    const finialCrownGeo = new THREE.ConeGeometry(0.18, 0.45, 12);
    const finialCrownMesh = new THREE.Mesh(finialCrownGeo, brightAccentGoldMat);
    finialCrownMesh.position.y = 1.85;
    trophyGroup.add(finialCrownMesh);

    // ── 5. Fully Connected Handles (Symmetrical & Embedded in Cup Body) ──
    const createConnectedHandle = (isRight: boolean) => {
      const sign = isRight ? 1 : -1;
      const handleGroup = new THREE.Group();

      const path = new THREE.CatmullRomCurve3([
        new THREE.Vector3(sign * 0.70, 0.88, 0),
        new THREE.Vector3(sign * 1.10, 0.60, 0),
        new THREE.Vector3(sign * 0.92, 0.20, 0),
        new THREE.Vector3(sign * 0.22, -0.05, 0),
      ]);

      const tubeGeo = new THREE.TubeGeometry(path, 32, 0.048, 16, false);
      const mesh = new THREE.Mesh(tubeGeo, shinyGoldMat);
      handleGroup.add(mesh);

      const handleKnotGeo = new THREE.TorusGeometry(0.065, 0.028, 12, 16);
      const knotMesh = new THREE.Mesh(handleKnotGeo, brightAccentGoldMat);
      knotMesh.position.set(sign * 0.70, 0.88, 0);
      knotMesh.rotation.y = Math.PI / 2;
      handleGroup.add(knotMesh);

      return handleGroup;
    };

    trophyGroup.add(createConnectedHandle(true));  // Right handle
    trophyGroup.add(createConnectedHandle(false)); // Left handle

    // Add Trophy Group to Scene
    scene.add(trophyGroup);

    // ── Balanced Natural Lighting ──
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xfff5cc, 0x443311, 1.2);
    hemiLight.position.set(0, 10, 0);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfffae6, 1.7);
    keyLight.position.set(5, 8, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffaa00, 1.0);
    fillLight.position.set(-5, 4, 4);
    scene.add(fillLight);

    const topLight = new THREE.PointLight(0xffffff, 1.2, 12);
    topLight.position.set(0, 3, 3);
    scene.add(topLight);

    // ── Animation Loop ──
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Continuous slow rotation
      trophyGroup.rotation.y += 0.004;

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      if (newW > 0 && newH > 0) {
        camera.aspect = newW / newH;
        camera.updateProjectionMatrix();
        renderer.setSize(newW, newH);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      pmremGenerator.dispose();
      envRt.texture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="relative w-full h-full min-h-[200px] flex items-center justify-center pointer-events-none"
    />
  );
}
