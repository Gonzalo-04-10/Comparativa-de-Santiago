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

function enviarWhatsApp() {
  const nombre = document.getElementById("nombre").value;
  const asistencia = document.querySelector('input[name="asistencia"]:checked').value;
  const menu = document.getElementById("menu").value;
  const otro = document.getElementById("otro").value;

  const mensaje = `Hola! Soy ${nombre}. Confirmo asistencia: ${asistencia}. Requerimientos alimentarios: ${menu}${otro ? ` (${otro})` : ''}.`;

  // Número de WhatsApp de la clienta (sin el "+" y sin espacios)
  const numero = "5491130913877";

  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
}

