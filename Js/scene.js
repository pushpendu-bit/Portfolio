/* 3D desk scene for the hero (plain JavaScript + Three.js). Called from app.js */
function initScene(canvas) {
    let renderer;
    try {
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    } catch (e) {
        return function () { }; // no WebGL: dark hero without the 3D desk
    }
    renderer.shadowMap.enabled = true;
    renderer.setClearColor(0x141517);
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x141517, 14, 32);
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 80);

    const M = (c, r, m) => new THREE.MeshStandardMaterial({ color: c, roughness: r == null ? 0.7 : r, metalness: m || 0 });
    const put = (mesh, x, y, z, parent) => {
        mesh.position.set(x, y, z); mesh.castShadow = true; mesh.receiveShadow = true;
        (parent || scene).add(mesh); return mesh;
    };
    const tex = (w, hgt, draw) => {
        const c = document.createElement("canvas"); c.width = w; c.height = hgt;
        draw(c.getContext("2d"), w, hgt); const t = new THREE.CanvasTexture(c); t.anisotropy = 4; return t;
    };

    // Desk and wall
    put(new THREE.Mesh(new THREE.BoxGeometry(20, 0.3, 10), M(0x1a1c1f, 0.5)), 2, -0.15, 1);
    const wall = new THREE.Mesh(new THREE.PlaneGeometry(50, 24), M(0x2a2d32, 0.95));
    wall.position.set(0, 8, -4.4); wall.receiveShadow = true; scene.add(wall);

    // Monitor with a sunset-mountain screen
    const mon = new THREE.Group(); mon.position.set(4.3, 0, -1.5); mon.rotation.y = -0.4; scene.add(mon);
    put(new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.65, 0.06, 32), M(0x111214, 0.4, 0.5)), 0, 0.03, 0, mon);
    put(new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.3, 0.1), M(0x111214, 0.4, 0.5)), 0, 0.7, -0.05, mon);
    put(new THREE.Mesh(new THREE.BoxGeometry(3.7, 2.15, 0.12), M(0x0c0d0f, 0.4, 0.4)), 0, 2.1, 0, mon);
    const screenTex = tex(512, 290, (g, w, hh) => {
        const sky = g.createLinearGradient(0, 0, 0, hh);
        sky.addColorStop(0, "#3b3a78"); sky.addColorStop(0.5, "#d9728f"); sky.addColorStop(1, "#2c4f86");
        g.fillStyle = sky; g.fillRect(0, 0, w, hh);
        g.fillStyle = "rgba(255,190,200,.35)"; g.beginPath(); g.ellipse(170, 110, 140, 30, 0, 0, 7); g.fill();
        g.fillStyle = "#1a2c47"; g.beginPath(); g.moveTo(0, hh); g.lineTo(0, 200); g.lineTo(120, 140); g.lineTo(210, 190); g.lineTo(330, 120); g.lineTo(430, 185); g.lineTo(w, 160); g.lineTo(w, hh); g.fill();
    });
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(3.5, 1.97), new THREE.MeshBasicMaterial({ map: screenTex }));
    screen.position.set(0, 2.1, 0.07); mon.add(screen);
    const glow = new THREE.PointLight(0x6fa8ff, 1.1, 9); glow.position.set(0, 2.1, 1.5); mon.add(glow);

    // Closed laptop, keyboard, mouse, notebook
    put(new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.1, 1.6), M(0x9ea3aa, 0.35, 0.85)), 3.5, 0.05, 1.5).rotation.y = -0.2;
    const kb = new THREE.Group(); kb.position.set(1.8, 0, 1.9); kb.rotation.y = -0.2; scene.add(kb);
    put(new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.1, 0.8), M(0xb9bec4, 0.4, 0.5)), 0, 0.05, 0, kb);
    const keysTex = tex(256, 90, (g, w, hh) => {
        g.fillStyle = "#2b2d31"; g.fillRect(0, 0, w, hh); g.fillStyle = "#dfe2e6";
        for (let r = 0; r < 5; r++) for (let c = 0; c < 15; c++) g.fillRect(4 + c * 16.6, 5 + r * 16.4, 14, 13);
    });
    const keys = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 0.7), new THREE.MeshStandardMaterial({ map: keysTex, roughness: 0.6 }));
    keys.rotation.x = -Math.PI / 2; keys.position.y = 0.102; kb.add(keys);
    const mouse = put(new THREE.Mesh(new THREE.SphereGeometry(1, 32, 16), M(0xd5d8dc, 0.35, 0.3)), 5.2, 0.08, 2.4);
    mouse.scale.set(0.32, 0.12, 0.5);
    put(new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.07, 1.7), M(0xc9a56b, 0.8)), 0.4, 0.035, 2.1).rotation.y = -0.25;
    put(new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.06, 1.1), M(0x15161a, 0.4, 0.5)), 0.5, 0.1, 2.0).rotation.y = -0.25;

    // Warm glowing puck
    put(new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.07, 16, 40), new THREE.MeshStandardMaterial({ color: 0x331a08, emissive: 0xff7a1a, emissiveIntensity: 1.3 })), 2.3, 0.09, -0.3).rotation.x = Math.PI / 2;
    const puckLight = new THREE.PointLight(0xff7a1a, 0.7, 3.5); puckLight.position.set(2.3, 0.4, -0.3); scene.add(puckLight);

    // Desk lamp
    const lamp = new THREE.Group(); lamp.position.set(0.5, 0, -2.4); scene.add(lamp);
    put(new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.7, 0.1, 32), M(0x101113, 0.4, 0.6)), 0, 0.05, 0, lamp);
    put(new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 2.4, 12), M(0x101113, 0.4, 0.6)), 0, 1.25, 0, lamp);
    const shade = put(new THREE.Mesh(new THREE.ConeGeometry(0.65, 0.8, 32, 1, true), new THREE.MeshStandardMaterial({ color: 0x0f1012, roughness: 0.4, metalness: 0.6, side: THREE.DoubleSide })), 0.35, 2.7, 0, lamp);
    shade.rotation.z = -0.5;
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.14, 16, 16), new THREE.MeshBasicMaterial({ color: 0xffd9a0 }));
    bulb.position.set(0.45, 2.45, 0); lamp.add(bulb);
    const spot = new THREE.SpotLight(0xffb673, 3.4, 40, 0.75, 0.6, 1);
    spot.position.set(0.95, 2.45, -2.4); spot.target.position.set(3.2, 0, 0); spot.castShadow = true; spot.shadow.mapSize.set(1024, 1024);
    scene.add(spot, spot.target);

    // Plant
    const plant = new THREE.Group(); plant.position.set(2.6, 0, -2.4); scene.add(plant);
    put(new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.3, 0.55, 24), M(0x232427, 0.6)), 0, 0.28, 0, plant);
    for (let i = 0; i < 13; i++) {
        const len = 1 + Math.random() * 0.7, geo = new THREE.ConeGeometry(0.11, len, 6); geo.translate(0, len / 2, 0);
        const piv = new THREE.Group(); piv.position.y = 0.5; piv.rotation.y = i * 0.5;
        const leaf = new THREE.Mesh(geo, M(0x2f7a45, 0.8)); leaf.rotation.z = 0.35 + Math.random() * 0.6; leaf.castShadow = true;
        piv.add(leaf); plant.add(piv);
    }

    scene.add(new THREE.AmbientLight(0x3d4556, 0.6));
    const rim = new THREE.DirectionalLight(0x4c78c8, 0.45); rim.position.set(7, 4, -3); scene.add(rim);

    let mx = 0, my = 0, visible = true;
    const onMove = (e) => { mx = (e.clientX / innerWidth - 0.5) * 2; my = (e.clientY / innerHeight - 0.5) * 2; };
    addEventListener("pointermove", onMove);
    const io = new IntersectionObserver((es) => { visible = es[0].isIntersecting; });
    io.observe(canvas);
    const onResize = () => {
        const w = canvas.clientWidth, hh = canvas.clientHeight;
        renderer.setPixelRatio(Math.min(devicePixelRatio, 2)); renderer.setSize(w, hh, false);
        camera.aspect = w / hh; camera.fov = w > 820 ? 38 : 55; camera.updateProjectionMatrix();
    };
    addEventListener("resize", onResize); onResize();

    let raf;
    function tick(ms) {
        raf = requestAnimationFrame(tick);
        if (!visible) return;
        const t = ms / 1000, wide = innerWidth > 820, sway = still ? 0 : 1;
        camera.position.set(0.8 + mx * 0.5 * sway + Math.sin(t * 0.25) * 0.12 * sway, 3.5 - my * 0.25 * sway, wide ? 10.8 : 13);
        camera.lookAt(wide ? 1.7 : 2.6, 1.0, 0);
        if (!still) { plant.rotation.y = Math.sin(t * 0.5) * 0.03; puckLight.intensity = 0.7 + Math.sin(t * 2) * 0.08; }
        renderer.render(scene, camera);
    }
    raf = requestAnimationFrame(tick);

    return function dispose() {
        cancelAnimationFrame(raf); io.disconnect();
        removeEventListener("pointermove", onMove); removeEventListener("resize", onResize);
        renderer.dispose();
    };
}