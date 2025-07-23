// Cuenta regresiva
const countdown = document.getElementById('countdown');
const targetDate = new Date('2025-10-05T14:00:00'); // 🟢 CORREGIDO

setInterval(() => {
  const now = new Date();
  let diff = targetDate - now;
  if (diff <= 0) {
    countdown.textContent = "¡Ya empezó el gran día!";
    return;
  }
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);
  countdown.textContent = `Faltan ${d} días, ${h}h ${m}m ${s}s`;
}, 1000);

// Animaciones al scrollear
const secciones = document.querySelectorAll('.animar');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });

secciones.forEach(sec => observer.observe(sec));

// Mostrar animaciones iniciales
window.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".titulo-principal").style.opacity = "1";
  document.querySelector(".hero p").style.opacity = "1";
});

const audio = document.getElementById("miAudio");
const playPauseBtn = document.getElementById("playPauseBtn");


    audio.volume = 0.4;
    audio.currentTime = 3;
    audio.play();


function generarCamposAcompanantes() {
  const cantidad = parseInt(document.getElementById('acompanantes').value);
  const contenedor = document.getElementById('camposAcompanantes');

  contenedor.innerHTML = ''; // Limpiar campos anteriores

  for (let i = 1; i <= cantidad; i++) {
    const label = document.createElement('label');
    label.textContent = `Nombre del acompañante ${i}:`;

    const input = document.createElement('input');
    input.type = 'text';
    input.name = `acompanante${i}`;
    input.placeholder = `Acompañante ${i}`;
    input.required = true;

    contenedor.appendChild(label);
    contenedor.appendChild(input);
  }
}


function enviarWhatsApp() {
  const nombre = document.getElementById("nombre").value;
  const asistencia = document.querySelector('input[name="asistencia"]:checked').value;
  const menu = document.getElementById("menu").value;
  const otro = document.getElementById("otro").value;
  const cantidadAcompanantes = parseInt(document.getElementById("acompanantes").value);

  // Obtener nombres de acompañantes
  let nombresAcompanantes = '';
  for (let i = 1; i <= cantidadAcompanantes; i++) {
    const input = document.querySelector(`input[name="acompanante${i}"]`);
    if (input && input.value.trim() !== '') {
      nombresAcompanantes += `\n- Acompañante ${i}: ${input.value}`;
    }
  }

  // Armar mensaje
  let mensaje = `Hola! Soy ${nombre}. Confirmo que: ${asistencia} asistiré.\n`;
  mensaje += `Requerimientos alimentarios: ${menu}`;
  if (otro) mensaje += ` (${otro})`;
  if (cantidadAcompanantes > 0) {
    mensaje += `\n\n👥 Acompañantes (${cantidadAcompanantes}):${nombresAcompanantes}`;
  }

  // Número de WhatsApp de la clienta
  const numero = "5491149153890";

  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
}


