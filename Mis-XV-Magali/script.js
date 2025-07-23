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
  const cantidad = parseInt(document.getElementById("acompanantes").value);
  const contenedor = document.getElementById("camposAcompanantes");
  contenedor.innerHTML = ""; // limpiar

  for (let i = 1; i <= cantidad; i++) {
    const campoHTML = `
      <div class="acompanante">
        <label for="acompanante${i}">Acompañante ${i}:</label>
        <div class="fila-acompanante">
          <input type="text" name="acompanante${i}" required placeholder="Nombre">
          <div class="edad-opciones">
            <label>¿Es mayor?</label>
            <label><input type="radio" name="edad${i}" value="Sí" required> Sí</label>
            <label><input type="radio" name="edad${i}" value="No"> No</label>
          </div>
        </div>
        <style>
        .fila-acompanante {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.fila-acompanante input[type="text"] {
  flex: 1;
  padding: 0.5rem;
}

.edad-opciones {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.edad-opciones label {
  margin: 0;
}

        <style/>
      </div>
    `;
    contenedor.insertAdjacentHTML("beforeend", campoHTML);
  }
}





function enviarWhatsApp() {
  const nombre = document.getElementById("nombre").value;
  const asistencia = document.querySelector('input[name="asistencia"]:checked').value;
  const menu = document.getElementById("menu").value;
  const otro = document.getElementById("otro").value;
  const cantidadAcompanantes = parseInt(document.getElementById("acompanantes").value);

  let nombresAcompanantes = '';
  for (let i = 1; i <= cantidadAcompanantes; i++) {
    const inputNombre = document.querySelector(`input[name="acompanante${i}"]`);
    const edad = document.querySelector(`input[name="edad${i}"]:checked`);

    if (inputNombre && edad) {
      const esMayor = edad.value === "Sí" ? "Mayor de edad" : "Menor de edad";
      nombresAcompanantes += `\n- Acompañante ${i}: ${inputNombre.value} (${esMayor})`;
    }
  }

  let mensaje = `Hola! Soy ${nombre}. Confirmo que: ${asistencia} asistiré.\n`;
  mensaje += `Requerimientos alimentarios: ${menu}`;
  if (otro) mensaje += ` (${otro})`;
  if (cantidadAcompanantes > 0) {
    mensaje += `\n\n👥 Acompañantes (${cantidadAcompanantes}):${nombresAcompanantes}`;
  }

  const numero = "5491149153890";
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
}
