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

// Audio controlado
const audio = document.getElementById("miAudio");

audio.addEventListener("canplay", () => {
  audio.currentTime = 4;
  audio.volume = 0.4;
  audio.play();
});

audio.addEventListener("ended", () => {
  audio.currentTime = 10;
  audio.play();
});

audio.addEventListener("timeupdate", () => {
  if (audio.currentTime < 10) {
    audio.currentTime = 10;
  }
});

// SLIDER PRINCIPAL
const sliderContenedor = document.getElementById("sliderContenedor");
const sliderImagenes = sliderContenedor.querySelectorAll("img");
let currentSlide = 0;

function actualizarSlide() {
  sliderContenedor.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function cambiarSlide(dir) {
  currentSlide = (currentSlide + dir + sliderImagenes.length) % sliderImagenes.length;
  actualizarSlide();
}

setInterval(() => {
  cambiarSlide(1);
}, 4000);

// GALERÍA POPUP
const galeriaPopup = document.getElementById("galeriaPopup");
const galeriaImg = document.getElementById("galeriaImg");
let galeriaIndex = 0;
const imagenes = Array.from(sliderImagenes).map(img => img.src);

function abrirGaleria() {
  galeriaIndex = 0;
  galeriaImg.src = imagenes[galeriaIndex];
  galeriaPopup.style.display = "flex";
}

function cerrarGaleria() {
  galeriaPopup.style.display = "none";
}

function cambiarFoto(dir) {
  galeriaIndex = (galeriaIndex + dir + imagenes.length) % imagenes.length;
  galeriaImg.src = imagenes[galeriaIndex];
}
