let supabase = null;

// Fallback de memoria por si el navegador bloquea sessionStorage
let memoryAuth = { alienAuth: "false" };

function setAuthState(value) {
  try { sessionStorage.setItem("alienAuth", value); }
  catch (e) { memoryAuth.alienAuth = value; }
}

function getAuthState() {
  try { return sessionStorage.getItem("alienAuth"); }
  catch (e) { return memoryAuth.alienAuth; }
}

try {
  if (SUPABASE_URL !== "TU_URL_AQUI") {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  }
} catch (e) {}

const ALIENS = [
  {
    id: "michi-cosmico",
    nombre: "Michi Cosmico",
    especie: "Gatuno Extraterrestre",
    planeta: "Neptuno Sur",
    peligro: "MODERADO",
    peligroClass: "danger-moderate",
    img: "public/alien1.jpg",
    descripcion: "Este sujeto llego a la Tierra un martes a las 3 de la mañana y lo primero que hizo fue tirarse a dormir arriba de un auto. Tiene cara de que te esta juzgando y la verdad es que si, te esta juzgando. Come puro pescado alienigena y ronronea a frecuencias que hacen temblar los vidrios del edificio.",
    habilidades: ["Mirada que paraliza", "Ronroneo hipnotico", "Dormir 23 horas seguidas"],
    dato: "Una vez durmio tanto que lo confundieron con una estatua en el museo"
  },
  {
    id: "don-bigotes",
    nombre: "Don Bigotes",
    especie: "Felino Marciano",
    planeta: "Marte (sector norte)",
    peligro: "ALTO",
    peligroClass: "danger-high",
    img: "public/alien2.jpg",
    descripcion: "Llego a Chile en un OVNI con forma de lata de atun. Tiene antenitas verdes que usa para captar la señal del WiFi del vecino. Se pasea por el barrio como si fuera el dueño de todo y la verdad nadie se atreve a contradecirlo. Dicen que tiene contactos en la NASA.",
    habilidades: ["Robar WiFi intergalactico", "Antenitas detecta-ratones", "Carisma de otra galaxia"],
    dato: "Lo echaron de Marte por hacer mucho escandalo a las 4 AM"
  },
  {
    id: "firulais-et",
    nombre: "Firulais ET",
    especie: "Canino Intergalactico",
    planeta: "Sirio B",
    peligro: "BAJO",
    peligroClass: "danger-low",
    img: "public/alien3.jpg",
    descripcion: "El perrito mas tierno de la galaxia pero no se confien, este pequeño se comio los deberes de un astronauta de la NASA. Tiene antenitas que mueve cuando esta contento. Los vecinos lo adoptaron pensando que era un bulldog verde y nadie ha preguntado nada hasta ahora.",
    habilidades: ["Cara de inocente nivel dios", "Destruir zapatillas cosmicas", "Ladrar en 47 idiomas alien"],
    dato: "Lo encontraron durmiendo adentro de un crater en la luna"
  },
  {
    id: "bolita-galactica",
    nombre: "Bolita Galactica",
    especie: "Hamster Espacial",
    planeta: "Jupiter (sector poniente)",
    peligro: "CRITICO",
    peligroClass: "danger-critical",
    img: "public/alien4.jpg",
    descripcion: "No se dejen engañar por lo chiquitito. Este hamster escapo de un laboratorio alienigena y ahora anda suelto comiendo semillas radioactivas. Lo tienen en la mano porque si lo sueltan empieza a correr en su ruedita a velocidad luz y genera un agujero negro chiquitito.",
    habilidades: ["Correr a velocidad luz", "Almacenar 2kg de semillas en los cachetes", "Generar agujeros negros accidentalmente"],
    dato: "Destruyo una estacion espacial por correr muy rapido en la ruedita"
  },
  {
    id: "gordito-cosmico",
    nombre: "El Gordito Cosmico",
    especie: "Hamster Supremo",
    planeta: "Saturno (anillo VIP)",
    peligro: "EXTREMO",
    peligroClass: "danger-extreme",
    img: "public/alien5.jpg",
    descripcion: "El mas peligroso de todos y mide 8 centimetros. Se paro en dos patitas y empezo a emanar energia cosmica. Los cientificos no entienden como un hamster tan gordito puede tener tanto poder. Come puras semillas de girasol y cada vez que eructa se apagan las luces de toda la ciudad.",
    habilidades: ["Pararse en dos patas amenazantemente", "Eructo electromagnetico", "Ternura letal"],
    dato: "Fue candidato a presidente de la galaxia pero lo descalificaron por ser muy chico"
  },
  {
    id: "comandante-pelusa",
    nombre: "Comandante Pelusa",
    especie: "Hamster de Guerra",
    planeta: "Maipu",
    peligro: "EXTREMO",
    peligroClass: "danger-extreme",
    img: "public/alien6.jpg",
    descripcion: "El jefe final. Llego en una nave nodriza gigante a Maipu y resulta que el comandante era este hamster de 10 centimetros. Tiene ojos que brillan verde y controla una flota entera de OVNIs. Los militares lo vieron y salieron arrancando. Ahora vive en una jaula pero es porque el quiere.",
    habilidades: ["Controlar flotas de OVNIs", "Ojos laser verde", "Intimidacion nivel maximo"],
    dato: "Los aliens grandes le tienen mas miedo que los humanos"
  }
];

function createStars() {
  const container = document.getElementById("stars");
  if (!container) return;
  for (let i = 0; i < 100; i++) {
    const star = document.createElement("div");
    star.className = "star";
    const size = Math.random() * 2 + 0.5;
    star.style.width = size + "px";
    star.style.height = size + "px";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.setProperty("--duration", (Math.random() * 4 + 2) + "s");
    star.style.animationDelay = Math.random() * 5 + "s";
    container.appendChild(star);
  }
}

async function handleLogin(e) {
  e.preventDefault();
  const user = document.getElementById("username").value.trim().toLowerCase();
  const pass = document.getElementById("password").value.trim();
  const error = document.getElementById("loginError");
  let valid = false;

  if (supabase) {
    const { data } = await supabase
      .from("usuarios")
      .select("*")
      .eq("usuario", user)
      .eq("clave", pass)
      .single();
    valid = !!data;
  } else {
    valid = (user === "alien" && pass === "marte123");
  }

  if (valid) {
    setAuthState("true");
    window.location.href = "catalogo.html";
  } else {
    error.textContent = "Acceso denegado — No eres un alien";
    error.classList.add("show");
    setTimeout(() => error.classList.remove("show"), 3000);
  }
}

function checkAuth() {
  if (window.location.pathname.includes("catalogo") && getAuthState() !== "true") {
    window.location.href = "index.html";
  }
}

function logout() {
  try { sessionStorage.removeItem("alienAuth"); } catch(e) {}
  memoryAuth.alienAuth = "false";
  window.location.href = "index.html";
}

function renderCatalog() {
  const grid = document.getElementById("catalogGrid");
  if (!grid) return;
  grid.innerHTML = ALIENS.map(a => `
    <article class="alien-card" id="card-${a.id}">
      <div class="alien-img-wrapper">
        <img src="${a.img}" alt="${a.nombre}" loading="lazy">
        <span class="danger-badge ${a.peligroClass}">${a.peligro}</span>
      </div>
      <div class="alien-info">
        <h2 class="alien-name">${a.nombre}</h2>
        <p class="alien-species">${a.especie} — ${a.planeta}</p>
        <p class="alien-desc">${a.descripcion}</p>
        <button class="btn-download" onclick="downloadPDF('${a.id}')">DESCARGAR ANTECEDENTES</button>
      </div>
    </article>
  `).join("");
}

function downloadPDF(alienId) {
  const alien = ALIENS.find(a => a.id === alienId);
  if (!alien) return;
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.setFillColor(6, 6, 14);
  doc.rect(0, 0, 210, 297, "F");
  doc.setFillColor(0, 30, 50);
  doc.rect(0, 0, 210, 50, "F");
  doc.setDrawColor(0, 180, 220);
  doc.setLineWidth(0.5);
  doc.line(10, 50, 200, 50);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(0, 212, 255);
  doc.text("ANTECEDENTES CLASIFICADOS", 105, 20, { align: "center" });
  doc.setFontSize(10);
  doc.setTextColor(100, 140, 160);
  doc.text("ALIEN DATABASE — NIVEL OMEGA", 105, 30, { align: "center" });
  doc.text("Fecha: " + new Date().toLocaleDateString("es-CL"), 105, 38, { align: "center" });
  let y = 62;
  doc.setDrawColor(0, 100, 136);
  doc.setLineWidth(0.3);
  doc.rect(12, y - 5, 186, 35);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(0, 212, 255);
  doc.text(alien.nombre.toUpperCase(), 20, y + 4);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(180, 200, 210);
  doc.text("Especie: " + alien.especie, 20, y + 13);
  doc.text("Planeta: " + alien.planeta, 20, y + 21);
  doc.text("Peligro: " + alien.peligro, 20, y + 29);
  y += 45;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(0, 212, 255);
  doc.text("DESCRIPCION", 20, y);
  y += 7;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(200, 210, 220);
  const descLines = doc.splitTextToSize(alien.descripcion, 170);
  doc.text(descLines, 20, y);
  y += descLines.length * 6 + 10;
  doc.setDrawColor(0, 100, 136);
  doc.line(20, y - 4, 190, y - 4);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(0, 212, 255);
  doc.text("HABILIDADES", 20, y + 2);
  y += 9;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(200, 210, 220);
  alien.habilidades.forEach(h => {
    doc.text("> " + h, 20, y);
    y += 7;
  });
  y += 6;
  doc.setDrawColor(0, 100, 136);
  doc.line(20, y - 3, 190, y - 3);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(0, 212, 255);
  doc.text("DATO CURIOSO", 20, y + 2);
  y += 9;
  doc.setFont("helvetica", "italic");
  doc.setFontSize(11);
  doc.setTextColor(180, 200, 210);
  doc.text('"' + alien.dato + '"', 20, y);
  doc.setFontSize(8);
  doc.setTextColor(60, 80, 100);
  doc.text("ALIEN DATABASE — TOP SECRET — Proyecto Universitario 2026", 105, 287, { align: "center" });
  doc.save("antecedentes_" + alien.id + ".pdf");
}

function init() {
  createStars();
  checkAuth();
  renderCatalog();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}