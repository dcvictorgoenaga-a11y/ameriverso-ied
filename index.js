// Base de Datos Simulada de Laboratorios
const LABS_DATA = [
  {
    id: 1,
    title: "Densidad y Flotabilidad (Arquímedes)",
    grade: "8",
    subject: "quimica",
    subjectName: "Química",
    icon: "fa-flask",
    desc: "Ajusta la masa y volumen de diferentes bloques para observar el principio de Arquímedes en fluidos.",
    badge: "PhET"
  },
  {
    id: 2,
    title: "Simulador de Tiro Parabólico",
    grade: "10",
    subject: "fisica",
    subjectName: "Física",
    icon: "fa-bullseye",
    desc: "Calcula ángulos de disparo y velocidades para dar en el blanco cambiando la gravedad (Tierra, Luna, Marte).",
    badge: "Juego Canvas"
  },
  {
    id: 3,
    title: "Reto de Velocidad y Ecuaciones",
    grade: "7",
    subject: "matematicas",
    subjectName: "Matemáticas",
    icon: "fa-calculator",
    desc: "Resuelve problemas matemáticos contra reloj para acelerar tu auto en la pista de carreras virtual.",
    badge: "H5P Gamificado"
  },
  {
    id: 4,
    title: "Estructura Celular e Histología",
    grade: "6",
    subject: "ciencias",
    subjectName: "Ciencias Naturales",
    icon: "fa-dna",
    desc: "Arrastra y ubica las organelas en células animales y vegetales para medir su rendimiento biológico.",
    badge: "Interactivo 2D"
  },
  {
    id: 5,
    title: "Lógica de Algoritmos con Bloques",
    grade: "9",
    subject: "tecnologia",
    subjectName: "Tecnología",
    icon: "fa-code",
    desc: "Arma secuencias lógicas tipo Scratch para guiar al rover explorador a través del mapa de la IED.",
    badge: "Blockly"
  },
  {
    id: 6,
    title: "Leyes de Newton y Fuerzas",
    grade: "11",
    subject: "fisica",
    subjectName: "Física",
    icon: "fa-magnet",
    desc: "Mide fuerzas de rozamiento y coeficientes estáticos en planos inclinados.",
    badge: "PhET"
  }
];

// Estado de Filtros
let currentGrade = "todos";
let currentSubject = "todas";

// Carga Inicial del DOM
document.addEventListener("DOMContentLoaded", () => {
  renderLabs();
  initFilterEvents();
  initRatingSystem();
  initSurveyForm();
  initModalEvents();
});

// Renderizar Laboratorios
function renderLabs() {
  const container = document.getElementById("labsGrid");
  container.innerHTML = "";

  const filtered = LABS_DATA.filter(lab => {
    const matchGrade = (currentGrade === "todos" || lab.grade === currentGrade);
    const matchSubject = (currentSubject === "todas" || lab.subject === currentSubject);
    return matchGrade && matchSubject;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">
        <i class="fa-solid fa-folder-open" style="font-size: 2.5rem; margin-bottom: 10px;"></i>
        <p>No se encontraron laboratorios para los filtros seleccionados.</p>
      </div>
    `;
    return;
  }

  filtered.forEach(lab => {
    const card = document.createElement("div");
    card.className = "lab-card";
    card.innerHTML = `
      <div class="lab-thumb">
        <i class="fa-solid ${lab.icon}"></i>
        <span class="lab-badge">${lab.badge}</span>
      </div>
      <div class="lab-content">
        <h3>${lab.title}</h3>
        <p>${lab.desc}</p>
        <div class="lab-footer">
          <small><strong>${lab.grade}° Grado</strong> • ${lab.subjectName}</small>
          <button class="btn btn-outline" style="padding: 4px 10px; font-size: 0.8rem;" onclick="openLabDemo('${lab.title}')">
            Probar
          </button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// Configurar Filtros
function initFilterEvents() {
  document.querySelectorAll("#gradeFilters .filter-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll("#gradeFilters .filter-btn").forEach(b => b.classList.remove("active"));
      e.target.classList.add("active");
      currentGrade = e.target.dataset.grade;
      renderLabs();
    });
  });

  document.querySelectorAll("#subjectFilters .filter-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll("#subjectFilters .filter-btn").forEach(b => b.classList.remove("active"));
      e.target.classList.add("active");
      currentSubject = e.target.dataset.subject;
      renderLabs();
    });
  });
}

// Sistema de Estrellas para la Encuesta
function initRatingSystem() {
  const stars = document.querySelectorAll("#ratingStars i");
  const ratingInput = document.getElementById("surveyRating");

  stars.forEach(star => {
    star.addEventListener("click", () => {
      const val = parseInt(star.dataset.value);
      ratingInput.value = val;

      stars.forEach((s, idx) => {
        if (idx < val) {
          s.classList.remove("fa-regular");
          s.classList.add("fa-solid");
        } else {
          s.classList.remove("fa-solid");
          s.classList.add("fa-regular");
        }
      });
    });
  });
}

// Manejo de la Encuesta
function initSurveyForm() {
  const form = document.getElementById("studentSurveyForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const rating = document.getElementById("surveyRating").value;

    if (rating === "0") {
      alert("Por favor selecciona una calificación con las estrellas.");
      return;
    }

    alert("¡Muchas gracias por tus respuestas! La información se ha enviado con éxito a la coordinación de la IED Las Américas.");
    form.reset();
    document.querySelectorAll("#ratingStars i").forEach(s => {
      s.classList.remove("fa-solid");
      s.classList.add("fa-regular");
    });
  });
}

// Control de Modales y Login
function initModalEvents() {
  const loginModal = document.getElementById("loginModal");
  const profileModal = document.getElementById("profileModal");

  document.getElementById("openLoginBtn").addEventListener("click", () => {
    loginModal.classList.add("active");
  });

  document.getElementById("closeLoginBtn").addEventListener("click", () => {
    loginModal.classList.remove("active");
  });

  document.getElementById("closeProfileBtn").addEventListener("click", () => {
    profileModal.classList.remove("active");
  });

  // Selector Estudiante / Docente
  const roleStudentBtn = document.getElementById("roleStudentBtn");
  const roleTeacherBtn = document.getElementById("roleTeacherBtn");

  roleStudentBtn.addEventListener("click", () => {
    roleStudentBtn.classList.add("active");
    roleTeacherBtn.classList.remove("active");
  });

  roleTeacherBtn.addEventListener("click", () => {
    roleTeacherBtn.classList.add("active");
    roleStudentBtn.classList.remove("active");
  });

  // Credenciales Demo
  document.getElementById("demoLoginBtn").addEventListener("click", () => {
    document.getElementById("loginId").value = "1045238910";
    document.getElementById("loginPassword").value = "americas2026";
  });

  // Enviar Formulario de Login
  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    loginModal.classList.remove("active");
    
    // Cargar perfil demo
    loadStudentProfile();
    profileModal.classList.add("active");
  });

  document.getElementById("logoutBtn").addEventListener("click", () => {
    profileModal.classList.remove("active");
    alert("Has cerrado sesión correctamente.");
  });
}

// Carga de Datos de Perfil Estudiantil
function loadStudentProfile() {
  document.getElementById("profName").textContent = "Camilo Andrés Torres";
  document.getElementById("profGrade").textContent = "Grado 9°B";
  document.getElementById("profId").textContent = "1045238910";

  const list = document.getElementById("progressList");
  list.innerHTML = `
    <div class="progress-item">
      <span><i class="fa-solid fa-flask"></i> Química: Densidad y Flotabilidad</span>
      <strong style="color: #10b981;">4.8 / 5.0 (Completado)</strong>
    </div>
    <div class="progress-item">
      <span><i class="fa-solid fa-bullseye"></i> Física: Tiro Parabólico</span>
      <strong style="color: #10b981;">4.5 / 5.0 (Completado)</strong>
    </div>
    <div class="progress-item">
      <span><i class="fa-solid fa-calculator"></i> Matemáticas: Velocidad</span>
      <strong style="color: #f59e0b;">3.8 / 5.0 (En progreso)</strong>
    </div>
    <div class="progress-item">
      <span><i class="fa-solid fa-code"></i> Tecnología: Algoritmos</span>
      <strong style="color: #64748b;">Pendiente</strong>
    </div>
  `;
}

function openLabDemo(title) {
  alert(`Iniciando simulación interactiva: ${title}\n\nRecuerda iniciar sesión para que tus respuestas y puntos queden registrados.`);
}
