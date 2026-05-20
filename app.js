// Base de datos local: Especies extraterrestres clasificadas
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

function checkAuth() {
  let isAuth = false;
  try {
    if (sessionStorage.getItem("alienAuth") === "true") isAuth = true;
  } catch(e) {}
  
  if (window.location.search.includes("auth=true")) isAuth = true;

  if (!isAuth) {
    window.location.href = "index.html";
  }
}

function logout() {
  try { sessionStorage.removeItem("alienAuth"); } catch(e) {}
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

async function downloadPDF(alienId) {
  const alien = ALIENS.find(a => a.id === alienId);
  if (!alien) return;
  
  const btn = document.querySelector(`#card-${alienId} .btn-download`);
  let originalText = "DESCARGAR ANTECEDENTES";
  if (btn) {
    originalText = btn.textContent;
    btn.textContent = "GENERANDO...";
    btn.disabled = true;
  }

  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Fondo Oscuro General
    doc.setFillColor(10, 10, 15);
    doc.rect(0, 0, 210, 297, "F");

    // Borde de documento
    doc.setDrawColor(0, 212, 255);
    doc.setLineWidth(1);
    doc.rect(5, 5, 200, 287);

    // Cabecera superior
    doc.setFillColor(0, 30, 50);
    doc.rect(5, 5, 200, 30, "F");
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(255, 50, 50);
    doc.text("/// CLASIFICADO - TOP SECRET ///", 105, 18, { align: "center" });
    
    doc.setFontSize(10);
    doc.setTextColor(0, 212, 255);
    doc.text("ALIEN DATABASE EXTRATERRESTRIAL CATALOG", 105, 26, { align: "center" });
    doc.text("FECHA DE ACCESO: " + new Date().toLocaleDateString("es-CL"), 105, 32, { align: "center" });

    // Linea separadora
    doc.setDrawColor(0, 212, 255);
    doc.setLineWidth(0.5);
    doc.line(5, 35, 205, 35);

    // Cargar imagen de forma asincrona
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = alien.img;
    
    await new Promise((resolve) => {
      img.onload = resolve;
      img.onerror = resolve;
    });

    let startY = 45;

    // Colocar imagen
    if (img.complete && img.naturalWidth > 0) {
      doc.setDrawColor(0, 212, 255);
      doc.setLineWidth(0.5);
      doc.rect(15, startY, 70, 70); 
      doc.addImage(img, 'JPEG', 16, startY + 1, 68, 68);
    } else {
      doc.setDrawColor(255, 0, 0);
      doc.rect(15, startY, 70, 70);
      doc.setTextColor(255, 0, 0);
      doc.text("FOTO NO", 50, startY + 30, { align: "center" });
      doc.text("DISPONIBLE", 50, startY + 40, { align: "center" });
    }

    // Caja de datos a la derecha
    doc.setFillColor(15, 20, 25);
    doc.rect(90, startY, 105, 70, "F");
    doc.setDrawColor(0, 100, 136);
    doc.rect(90, startY, 105, 70);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(0, 212, 255);
    doc.text("IDENTIFICACION DE SUJETO", 95, startY + 8);
    
    doc.setFontSize(11);
    doc.setTextColor(180, 200, 210);
    
    let infoY = startY + 18;
    doc.setFont("helvetica", "bold");
    doc.text("NOMBRE: ", 95, infoY);
    doc.setFont("helvetica", "normal");
    doc.text(alien.nombre.toUpperCase(), 125, infoY);
    
    infoY += 10;
    doc.setFont("helvetica", "bold");
    doc.text("ESPECIE: ", 95, infoY);
    doc.setFont("helvetica", "normal");
    const specLines = doc.splitTextToSize(alien.especie, 65);
    doc.text(specLines, 125, infoY);
    infoY += specLines.length * 5 + 5;
    
    doc.setFont("helvetica", "bold");
    doc.text("PLANETA: ", 95, infoY);
    doc.setFont("helvetica", "normal");
    doc.text(alien.planeta, 125, infoY);
    
    infoY += 10;
    doc.setFont("helvetica", "bold");
    doc.text("PELIGRO: ", 95, infoY);
    doc.setFont("helvetica", "bold");
    
    if (alien.peligro === "BAJO") doc.setTextColor(0, 255, 0);
    else if (alien.peligro === "MODERADO") doc.setTextColor(255, 255, 0);
    else if (alien.peligro === "ALTO") doc.setTextColor(255, 128, 0);
    else doc.setTextColor(255, 0, 0);
    doc.text(alien.peligro, 125, infoY);

    startY += 80;

    // Detalles
    doc.setFillColor(0, 30, 50);
    doc.rect(15, startY, 180, 8, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(0, 212, 255);
    doc.text("INFORME DE COMPORTAMIENTO", 18, startY + 6);

    startY += 15;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(200, 210, 220);
    const descLines = doc.splitTextToSize(alien.descripcion, 180);
    doc.text(descLines, 15, startY);

    startY += descLines.length * 6 + 10;

    // Habilidades
    doc.setFillColor(0, 30, 50);
    doc.rect(15, startY, 180, 8, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(0, 212, 255);
    doc.text("CAPACIDADES REGISTRADAS", 18, startY + 6);

    startY += 13;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(200, 210, 220);
    alien.habilidades.forEach(h => {
      doc.text(">> " + h, 18, startY);
      startY += 7;
    });

    startY += 5;

    // Dato Curioso
    doc.setFillColor(0, 30, 50);
    doc.rect(15, startY, 180, 8, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(0, 212, 255);
    doc.text("NOTA ADICIONAL DEL AGENTE", 18, startY + 6);

    startY += 13;
    doc.setFont("helvetica", "italic");
    doc.setFontSize(11);
    doc.setTextColor(255, 200, 0);
    const datoLines = doc.splitTextToSize('"' + alien.dato + '"', 180);
    doc.text(datoLines, 15, startY);

    // Footer
    doc.setDrawColor(0, 212, 255);
    doc.setLineWidth(0.5);
    doc.line(5, 280, 205, 280);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(60, 100, 120);
    doc.text("DOCUMENTO GENERADO POR SISTEMA ALIENWEB — REPRODUCCION PROHIBIDA", 105, 285, { align: "center" });

    doc.save("Expediente_" + alien.id + ".pdf");
  } catch (error) {
    console.error("Error al generar PDF:", error);
    alert("Hubo un error al generar el PDF.");
  } finally {
    if (btn) {
      btn.textContent = originalText;
      btn.disabled = false;
    }
  }
}

function initCatalog() {
  createStars();
  checkAuth();
  renderCatalog();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCatalog);
} else {
  initCatalog();
}