(function () {
  "use strict";

  const STORAGE_KEY = "ip_cuaderno_progreso_v1";
  const CURRENT_SESSION_ID = "c1t1s1";
  const TOTAL_SESSIONS_PER_TERM = 12;

  const COMPONENT_LABELS = {
    ram: "RAM",
    ssd: "SSD",
    bateria: "Batería"
  };

  const partDescriptions = {
    teclado: "El teclado sirve para escribir instrucciones y texto. Es un dispositivo de entrada.",
    ram: "La memoria RAM guarda información temporal mientras trabajas. Se vacía al apagar.",
    ssd: "La unidad SSD guarda datos de forma permanente, como documentos y programas.",
    bateria: "La batería permite que el portátil funcione sin estar enchufado durante un tiempo limitado."
  };

  const correctDragMap = {
    ram: "ram",
    ssd: "ssd",
    bateria: "bateria"
  };

  const root = document.documentElement;
  const body = document.body;
  const progressBar = document.getElementById("sessionProgressBar");
  const progressText = document.getElementById("sessionProgressText");

  const state = {
    quizDone: false,
    dragDone: false,
    fillDone: false,
    attempts: {
      quiz: 0,
      fill: 0
    },
    answers: {
      quiz: "",
      fill: {
        fill1: "",
        fill2: "",
        fill3: ""
      },
      drag: {
        ram: "",
        ssd: "",
        bateria: ""
      },
      dragAlt: {
        ram: "",
        ssd: "",
        bateria: ""
      }
    }
  };

  let progressStore = loadProgressStore();

  function createEmptyStore() {
    return {
      version: 1,
      sessions: {}
    };
  }

  function createEmptySessionProgress() {
    return {
      completed: false,
      completedAt: "",
      updatedAt: "",
      activities: {
        quiz: {
          done: false,
          attempts: 0,
          answer: ""
        },
        drag: {
          done: false,
          assignments: {
            ram: "",
            ssd: "",
            bateria: ""
          },
          altAssignments: {
            ram: "",
            ssd: "",
            bateria: ""
          }
        },
        fill: {
          done: false,
          attempts: 0,
          answers: {
            fill1: "",
            fill2: "",
            fill3: ""
          }
        }
      }
    };
  }

  function loadProgressStore() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return createEmptyStore();
    }

    try {
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") {
        return createEmptyStore();
      }
      if (!parsed.sessions || typeof parsed.sessions !== "object") {
        parsed.sessions = {};
      }
      return parsed;
    } catch (_err) {
      return createEmptyStore();
    }
  }

  function getSessionProgress(sessionId) {
    if (!progressStore.sessions[sessionId]) {
      progressStore.sessions[sessionId] = createEmptySessionProgress();
    }
    return progressStore.sessions[sessionId];
  }

  function hydrateStateFromStorage() {
    const sessionProgress = getSessionProgress(CURRENT_SESSION_ID);

    state.quizDone = !!sessionProgress.activities.quiz.done;
    state.dragDone = !!sessionProgress.activities.drag.done;
    state.fillDone = !!sessionProgress.activities.fill.done;

    state.attempts.quiz = sessionProgress.activities.quiz.attempts || 0;
    state.attempts.fill = sessionProgress.activities.fill.attempts || 0;

    state.answers.quiz = sessionProgress.activities.quiz.answer || "";
    state.answers.fill = {
      fill1: sessionProgress.activities.fill.answers.fill1 || "",
      fill2: sessionProgress.activities.fill.answers.fill2 || "",
      fill3: sessionProgress.activities.fill.answers.fill3 || ""
    };
    state.answers.drag = {
      ram: sessionProgress.activities.drag.assignments.ram || "",
      ssd: sessionProgress.activities.drag.assignments.ssd || "",
      bateria: sessionProgress.activities.drag.assignments.bateria || ""
    };
    state.answers.dragAlt = {
      ram: sessionProgress.activities.drag.altAssignments.ram || "",
      ssd: sessionProgress.activities.drag.altAssignments.ssd || "",
      bateria: sessionProgress.activities.drag.altAssignments.bateria || ""
    };
  }

  function persistStateToStorage() {
    const sessionProgress = getSessionProgress(CURRENT_SESSION_ID);

    sessionProgress.activities.quiz.done = state.quizDone;
    sessionProgress.activities.quiz.attempts = state.attempts.quiz;
    sessionProgress.activities.quiz.answer = state.answers.quiz;

    sessionProgress.activities.drag.done = state.dragDone;
    sessionProgress.activities.drag.assignments = {
      ram: state.answers.drag.ram,
      ssd: state.answers.drag.ssd,
      bateria: state.answers.drag.bateria
    };
    sessionProgress.activities.drag.altAssignments = {
      ram: state.answers.dragAlt.ram,
      ssd: state.answers.dragAlt.ssd,
      bateria: state.answers.dragAlt.bateria
    };

    sessionProgress.activities.fill.done = state.fillDone;
    sessionProgress.activities.fill.attempts = state.attempts.fill;
    sessionProgress.activities.fill.answers = {
      fill1: state.answers.fill.fill1,
      fill2: state.answers.fill.fill2,
      fill3: state.answers.fill.fill3
    };

    const completedActivities = [state.quizDone, state.dragDone, state.fillDone].filter(Boolean).length;
    sessionProgress.completed = completedActivities === 3;
    if (sessionProgress.completed && !sessionProgress.completedAt) {
      sessionProgress.completedAt = new Date().toISOString();
    }
    sessionProgress.updatedAt = new Date().toISOString();

    localStorage.setItem(STORAGE_KEY, JSON.stringify(progressStore));
    paintSessionChipStatus();
    renderGlobalProgressSummary();
  }

  function renderGlobalProgressSummary() {
    const container = document.getElementById("globalProgressSummary");
    if (!container) {
      return;
    }

    const courses = [
      "Iniciación a la Informática",
      "Informática avanzada"
    ];

    const terms = [
      "Primer trimestre",
      "Segundo trimestre",
      "Tercer trimestre"
    ];

    let html = "";
    courses.forEach(function (courseName, courseIndex) {
      let courseCompleted = 0;
      const courseTotal = terms.length * TOTAL_SESSIONS_PER_TERM;

      html += "<article class='progress-course'>";
      html += "<h3>" + courseName + "</h3>";

      terms.forEach(function (termName, termIndex) {
        let termCompleted = 0;
        for (let i = 1; i <= TOTAL_SESSIONS_PER_TERM; i += 1) {
          const sessionId = "c" + (courseIndex + 1) + "t" + (termIndex + 1) + "s" + i;
          const session = progressStore.sessions[sessionId];
          if (session && session.completed) {
            termCompleted += 1;
          }
        }
        courseCompleted += termCompleted;
        html += "<p class='term-line'>" + termName + ": " + termCompleted + " de " + TOTAL_SESSIONS_PER_TERM + " sesiones</p>";
      });

      const percent = Math.round((courseCompleted / courseTotal) * 100);
      html += "<p class='term-total'>Total curso: " + courseCompleted + " de " + courseTotal + " (" + percent + "%)</p>";
      html += "</article>";
    });

    container.innerHTML = html;
  }

  function updateProgress() {
    const doneCount = [state.quizDone, state.dragDone, state.fillDone].filter(Boolean).length;
    const percentage = Math.round((doneCount / 3) * 100);
    progressBar.style.width = percentage + "%";
    progressBar.parentElement.setAttribute("aria-valuenow", String(doneCount));
    progressText.textContent = doneCount + " de 3 actividades completadas";
  }

  function setFeedback(node, text, level) {
    node.textContent = text;
    node.classList.remove("ok", "warn", "err");
    if (level) {
      node.classList.add(level);
    }
  }

  function initAccessibilityBar() {
    const bar = document.getElementById("accessibilityBar");
    const fontSelect = document.getElementById("fontSelect");
    const visionSelect = document.getElementById("visionSelect");
    const increaseBtn = document.getElementById("increaseFontBtn");
    const decreaseBtn = document.getElementById("decreaseFontBtn");
    const readBtn = document.getElementById("readBtn");
    const downloadBtn = document.getElementById("downloadMp3Btn");
    const toggleBtn = document.getElementById("toggleBarBtn");
    let isReading = false;

    const savedFontFamily = localStorage.getItem("ip_font_family");
    const savedFontSize = localStorage.getItem("ip_font_size");
    const savedVision = localStorage.getItem("ip_vision_mode") || "normal";
    const savedBarMode = localStorage.getItem("ip_bar_mode") || "fixed";

    if (savedFontFamily) {
      body.style.fontFamily = savedFontFamily;
    }
    if (savedFontSize) {
      root.style.setProperty("--ip-font-size", savedFontSize);
    }

    fontSelect.value = localStorage.getItem("ip_font_select") || "standard";
    visionSelect.value = savedVision;
    applyVisionMode(savedVision);

    if (savedBarMode === "static") {
      bar.classList.add("is-static");
      toggleBtn.textContent = "Fijar";
    } else {
      toggleBtn.textContent = "Soltar";
    }

    fontSelect.addEventListener("change", function () {
      const selected = fontSelect.value;
      localStorage.setItem("ip_font_select", selected);
      if (selected === "standard") {
        body.style.fontFamily = "Atkinson Hyperlegible, Segoe UI, Arial, sans-serif";
      } else if (selected === "dyslexic") {
        body.style.fontFamily = "OpenDyslexic, Atkinson Hyperlegible, sans-serif";
      } else if (selected === "hyperlegible") {
        body.style.fontFamily = "Atkinson Hyperlegible, Segoe UI, Arial, sans-serif";
      } else {
        body.style.fontFamily = "'" + selected + "', Atkinson Hyperlegible, sans-serif";
      }
      localStorage.setItem("ip_font_family", body.style.fontFamily);
    });

    increaseBtn.addEventListener("click", function () {
      changeFontSize(1);
    });

    decreaseBtn.addEventListener("click", function () {
      changeFontSize(-1);
    });

    function changeFontSize(step) {
      const current = parseInt(getComputedStyle(root).getPropertyValue("--ip-font-size"), 10) || 16;
      const next = Math.max(14, Math.min(24, current + step));
      root.style.setProperty("--ip-font-size", next + "px");
      localStorage.setItem("ip_font_size", next + "px");
    }

    readBtn.addEventListener("click", function () {
      if (!window.speechSynthesis) {
        alert("Tu navegador no soporta lectura en voz alta.");
        return;
      }
      if (isReading) {
        window.speechSynthesis.cancel();
        isReading = false;
        readBtn.textContent = "Leer (es)";
        return;
      }

      const selected = window.getSelection().toString().trim();
      const text = selected || document.getElementById("contenido-principal").innerText;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "es-ES";
      utterance.onend = function () {
        isReading = false;
        readBtn.textContent = "Leer (es)";
      };
      isReading = true;
      readBtn.textContent = "Detener";
      window.speechSynthesis.speak(utterance);
    });

    downloadBtn.addEventListener("click", function () {
      const selected = window.getSelection().toString().trim();
      const fallbackText = "Sesión 1 de Informática para primaria. Hardware básico y desmontar el portátil con seguridad.";
      const text = (selected || fallbackText).slice(0, 180);
      if (!text) {
        alert("Selecciona un texto para generar el audio.");
        return;
      }
      const url = "https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=es&q=" + encodeURIComponent(text);
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.click();
    });

    visionSelect.addEventListener("change", function () {
      applyVisionMode(visionSelect.value);
      localStorage.setItem("ip_vision_mode", visionSelect.value);
    });

    toggleBtn.addEventListener("click", function () {
      const isStatic = bar.classList.toggle("is-static");
      if (isStatic) {
        toggleBtn.textContent = "Fijar";
        localStorage.setItem("ip_bar_mode", "static");
      } else {
        toggleBtn.textContent = "Soltar";
        localStorage.setItem("ip_bar_mode", "fixed");
      }
    });
  }

  function applyVisionMode(mode) {
    body.classList.remove("mode-protanopia", "mode-deuteranopia", "mode-tritanopia", "mode-high-contrast");
    if (mode === "protanopia") {
      body.classList.add("mode-protanopia");
    } else if (mode === "deuteranopia") {
      body.classList.add("mode-deuteranopia");
    } else if (mode === "tritanopia") {
      body.classList.add("mode-tritanopia");
    } else if (mode === "high-contrast") {
      body.classList.add("mode-high-contrast");
    }
  }

  function initInfographic() {
    const info = document.getElementById("partInfo");
    const buttons = Array.from(document.querySelectorAll(".hotspot-btn"));
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (b) {
          b.classList.remove("active");
        });
        btn.classList.add("active");
        const key = btn.getAttribute("data-part");
        info.textContent = partDescriptions[key] || "Sin descripción disponible.";
      });
    });
  }

  function initCurriculumMenu() {
    const menu = document.getElementById("curriculumMenu");
    if (!menu) {
      return;
    }

    const terms = [
      "Primer trimestre - ¿Cómo funciona un PC? Hardware y software",
      "Segundo trimestre - Aplicaciones y ofimática",
      "Tercer trimestre - Uso seguro de Internet e IA"
    ];

    const courses = [
      "Iniciación a la Informática",
      "Informática avanzada"
    ];

    const parseSessionId = function (sessionId) {
      const match = /^c([12])t([123])s([1-9]|1[0-2])$/.exec(sessionId || "");
      if (!match) {
        return null;
      }
      return {
        course: parseInt(match[1], 10),
        term: parseInt(match[2], 10),
        session: parseInt(match[3], 10)
      };
    };

    const current = parseSessionId(CURRENT_SESSION_ID);

    const buildHref = function (course, term, session) {
      const globalSessionNumber = (term - 1) * TOTAL_SESSIONS_PER_TERM + session;
      if (current && current.course === course) {
        return "sesion" + globalSessionNumber + ".html";
      }
      return "../curso" + course + "/sesion" + globalSessionNumber + ".html";
    };

    const sessionLabel = function (index) {
      if (index === 1) {
        return "Sesión 1: Hardware básico y desmontar el portátil";
      }
      return "Sesión " + index;
    };

    let html = "";
    courses.forEach(function (courseName, courseIndex) {
      const courseId = "course" + (courseIndex + 1);
      html += "<article class='course-card' role='treeitem' aria-expanded='false'>";
      html += "<button class='course-head collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#" + courseId + "' aria-expanded='false' aria-controls='" + courseId + "'>";
      html += "<span>" + courseName + "</span><span aria-hidden='true'>▾</span></button>";
      html += "<div id='" + courseId + "' class='collapse term-wrap'>";

      terms.forEach(function (termName, termIndex) {
        html += "<section class='term-block'><span class='term-title'>" + termName + "</span><div class='session-list'>";
        for (let i = 1; i <= 12; i += 1) {
          const sessionId = "c" + (courseIndex + 1) + "t" + (termIndex + 1) + "s" + i;
          const isCurrent = sessionId === CURRENT_SESSION_ID;
          const isCompleted = !!(progressStore.sessions[sessionId] && progressStore.sessions[sessionId].completed);

          html += "<a href='" + buildHref(courseIndex + 1, termIndex + 1, i) + "' data-session-id='" + sessionId + "' class='session-chip";
          if (isCurrent) {
            html += " current";
          }
          if (isCompleted) {
            html += " completed";
          }
          html += "'";
          if (isCurrent) {
            html += " aria-current='page'";
          }
          html += ">" + sessionLabel(i) + "</a>";
        }
        html += "</div></section>";
      });

      html += "</div></article>";
    });

    menu.innerHTML = html;
  }

  function paintSessionChipStatus() {
    const currentChip = document.querySelector(".session-chip[data-session-id='" + CURRENT_SESSION_ID + "']");
    if (!currentChip) {
      return;
    }
    const currentSession = getSessionProgress(CURRENT_SESSION_ID);
    currentChip.classList.toggle("completed", !!currentSession.completed);
  }

  function clearActivityUI() {
    const quizChecked = document.querySelector("input[name='quizRespuesta']:checked");
    if (quizChecked) {
      quizChecked.checked = false;
    }
    const quizFeedback = document.getElementById("quizFeedback");
    if (quizFeedback) {
      quizFeedback.textContent = "";
      quizFeedback.classList.remove("ok", "warn", "err");
    }

    const zones = Array.from(document.querySelectorAll(".drop-zone"));
    zones.forEach(function (zone) {
      zone.classList.remove("correct", "incorrect");
      applyZoneAssignment(zone, "");
    });

    const altRam = document.getElementById("altRam");
    const altSsd = document.getElementById("altSsd");
    const altBateria = document.getElementById("altBateria");
    if (altRam) {
      altRam.value = "";
    }
    if (altSsd) {
      altSsd.value = "";
    }
    if (altBateria) {
      altBateria.value = "";
    }

    const dragFeedback = document.getElementById("dragFeedback");
    if (dragFeedback) {
      dragFeedback.textContent = "";
      dragFeedback.classList.remove("ok", "warn", "err");
    }

    const fill1 = document.getElementById("fill1");
    const fill2 = document.getElementById("fill2");
    const fill3 = document.getElementById("fill3");
    if (fill1) {
      fill1.value = "";
    }
    if (fill2) {
      fill2.value = "";
    }
    if (fill3) {
      fill3.value = "";
    }

    const fillFeedback = document.getElementById("fillFeedback");
    if (fillFeedback) {
      fillFeedback.textContent = "";
      fillFeedback.classList.remove("ok", "warn", "err");
    }
  }

  function resetCurrentState() {
    state.quizDone = false;
    state.dragDone = false;
    state.fillDone = false;
    state.attempts.quiz = 0;
    state.attempts.fill = 0;
    state.answers.quiz = "";
    state.answers.fill = { fill1: "", fill2: "", fill3: "" };
    state.answers.drag = { ram: "", ssd: "", bateria: "" };
    state.answers.dragAlt = { ram: "", ssd: "", bateria: "" };
  }

  function initProgressReset() {
    const resetBtn = document.getElementById("resetProgressBtn");
    const feedback = document.getElementById("resetProgressFeedback");
    if (!resetBtn || !feedback) {
      return;
    }

    resetBtn.addEventListener("click", function () {
      const confirmed = window.confirm("Advertencia: se borrará tu progreso guardado de este cuaderno en este navegador. Esta acción no se puede deshacer. ¿Quieres continuar?");

      if (!confirmed) {
        setFeedback(feedback, "Reinicio cancelado. Tu progreso sigue guardado.", "warn");
        return;
      }

      localStorage.removeItem(STORAGE_KEY);
      progressStore = createEmptyStore();
      resetCurrentState();
      persistStateToStorage();
      clearActivityUI();
      initCurriculumMenu();
      updateProgress();
      paintSessionChipStatus();
      renderGlobalProgressSummary();
      setFeedback(feedback, "Progreso reiniciado correctamente.", "ok");
    });
  }

  function initQuiz() {
    const form = document.getElementById("quizForm");
    const hintBtn = document.getElementById("quizHintBtn");
    const feedback = document.getElementById("quizFeedback");

    if (state.answers.quiz) {
      const saved = form.querySelector("input[name='quizRespuesta'][value='" + state.answers.quiz + "']");
      if (saved) {
        saved.checked = true;
      }
    }

    form.querySelectorAll("input[name='quizRespuesta']").forEach(function (input) {
      input.addEventListener("change", function () {
        state.answers.quiz = input.value;
        persistStateToStorage();
      });
    });

    if (state.quizDone) {
      setFeedback(feedback, "Correcto. El SSD conserva los datos al apagar el equipo.", "ok");
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      state.attempts.quiz += 1;

      const selected = form.querySelector("input[name='quizRespuesta']:checked");
      if (!selected) {
        setFeedback(feedback, "Selecciona una respuesta antes de comprobar.", "warn");
        persistStateToStorage();
        return;
      }

      state.answers.quiz = selected.value;

      if (selected.value === "ssd") {
        setFeedback(feedback, "Correcto. El SSD conserva los datos al apagar el equipo.", "ok");
        state.quizDone = true;
      } else {
        setFeedback(feedback, "No es correcta. Piensa en qué pieza guarda tus archivos incluso sin energía.", "err");
      }

      persistStateToStorage();
      updateProgress();
    });

    hintBtn.addEventListener("click", function () {
      const text = state.attempts.quiz >= 2
        ? "Pista fuerte: su nombre suele aparecer junto a la capacidad en GB o TB."
        : "Pista: no es memoria temporal.";
      setFeedback(feedback, text, "warn");
    });
  }

  function applyZoneAssignment(zone, componentKey) {
    const base = zone.dataset.baseText || zone.textContent.split(" → ")[0].trim();
    zone.dataset.baseText = base;
    if (!componentKey) {
      zone.textContent = base;
      zone.dataset.assigned = "";
      return;
    }
    zone.textContent = base + " → " + (COMPONENT_LABELS[componentKey] || componentKey);
    zone.dataset.assigned = componentKey;
  }

  function initDragDrop() {
    const items = Array.from(document.querySelectorAll(".drag-item"));
    const zones = Array.from(document.querySelectorAll(".drop-zone"));
    const checkBtn = document.getElementById("dragCheckBtn");
    const resetBtn = document.getElementById("dragResetBtn");
    const feedback = document.getElementById("dragFeedback");

    const altRam = document.getElementById("altRam");
    const altSsd = document.getElementById("altSsd");
    const altBateria = document.getElementById("altBateria");

    let dragged = null;

    zones.forEach(function (zone) {
      zone.dataset.baseText = zone.textContent.trim();
      const key = zone.dataset.target;
      if (state.answers.drag[key]) {
        applyZoneAssignment(zone, state.answers.drag[key]);
      }
    });

    altRam.value = state.answers.dragAlt.ram || "";
    altSsd.value = state.answers.dragAlt.ssd || "";
    altBateria.value = state.answers.dragAlt.bateria || "";

    if (state.dragDone) {
      setFeedback(feedback, "Actividad completada en esta sesión.", "ok");
    }

    items.forEach(function (item) {
      item.addEventListener("dragstart", function () {
        dragged = item;
        item.classList.add("dragging");
      });

      item.addEventListener("dragend", function () {
        item.classList.remove("dragging");
      });
    });

    zones.forEach(function (zone) {
      zone.addEventListener("dragover", function (event) {
        event.preventDefault();
      });

      zone.addEventListener("drop", function (event) {
        event.preventDefault();
        if (!dragged) {
          return;
        }
        const value = dragged.dataset.component;
        applyZoneAssignment(zone, value);
        state.answers.drag[zone.dataset.target] = value;
        persistStateToStorage();
      });
    });

    altRam.addEventListener("change", function () {
      state.answers.dragAlt.ram = altRam.value;
      persistStateToStorage();
    });
    altSsd.addEventListener("change", function () {
      state.answers.dragAlt.ssd = altSsd.value;
      persistStateToStorage();
    });
    altBateria.addEventListener("change", function () {
      state.answers.dragAlt.bateria = altBateria.value;
      persistStateToStorage();
    });

    checkBtn.addEventListener("click", function () {
      let correct = 0;
      zones.forEach(function (zone) {
        const target = zone.dataset.target;
        const assigned = zone.dataset.assigned;
        const altValue = getAlternativeValue(target);
        const finalValue = assigned || altValue;

        if (!assigned && altValue) {
          state.answers.drag[target] = altValue;
        }

        zone.classList.remove("correct", "incorrect");
        if (finalValue && correctDragMap[target] === finalValue) {
          zone.classList.add("correct");
          correct += 1;
        } else {
          zone.classList.add("incorrect");
        }
      });

      if (correct === 3) {
        setFeedback(feedback, "Excelente. Has relacionado correctamente todos los componentes.", "ok");
        state.dragDone = true;
      } else {
        setFeedback(feedback, "Tienes " + correct + " de 3 correctas. Revisa la función de cada componente.", "warn");
      }

      persistStateToStorage();
      updateProgress();
    });

    resetBtn.addEventListener("click", function () {
      zones.forEach(function (zone) {
        zone.classList.remove("correct", "incorrect");
        applyZoneAssignment(zone, "");
      });

      state.answers.drag = { ram: "", ssd: "", bateria: "" };
      state.answers.dragAlt = { ram: "", ssd: "", bateria: "" };

      altRam.value = "";
      altSsd.value = "";
      altBateria.value = "";

      setFeedback(feedback, "Actividad reiniciada.", "warn");
      persistStateToStorage();
    });
  }

  function getAlternativeValue(target) {
    return state.answers.dragAlt[target] || "";
  }

  function initFillBlanks() {
    const form = document.getElementById("fillForm");
    const hintBtn = document.getElementById("fillHintBtn");
    const feedback = document.getElementById("fillFeedback");

    const fill1 = document.getElementById("fill1");
    const fill2 = document.getElementById("fill2");
    const fill3 = document.getElementById("fill3");

    fill1.value = state.answers.fill.fill1;
    fill2.value = state.answers.fill.fill2;
    fill3.value = state.answers.fill.fill3;

    if (state.fillDone) {
      setFeedback(feedback, "Muy bien. Has completado correctamente los tres huecos.", "ok");
    }

    [fill1, fill2, fill3].forEach(function (field) {
      field.addEventListener("change", function () {
        state.answers.fill.fill1 = fill1.value;
        state.answers.fill.fill2 = fill2.value;
        state.answers.fill.fill3 = fill3.value;
        persistStateToStorage();
      });
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      state.attempts.fill += 1;

      const a = fill1.value;
      const b = fill2.value;
      const c = fill3.value;

      state.answers.fill.fill1 = a;
      state.answers.fill.fill2 = b;
      state.answers.fill.fill3 = c;

      if (!a || !b || !c) {
        setFeedback(feedback, "Completa los tres huecos antes de corregir.", "warn");
        persistStateToStorage();
        return;
      }

      const correct = a === "ram" && b === "ssd" && c === "bateria";
      if (correct) {
        setFeedback(feedback, "Muy bien. Has completado correctamente los tres huecos.", "ok");
        state.fillDone = true;
      } else {
        setFeedback(feedback, "Algún hueco no es correcto. Revisa RAM, SSD y batería.", "err");
      }

      persistStateToStorage();
      updateProgress();
    });

    hintBtn.addEventListener("click", function () {
      const text = state.attempts.fill >= 2
        ? "Pista fuerte: orden correcto RAM, SSD, batería."
        : "Pista: cada hueco corresponde a memoria temporal, almacenamiento y energía.";
      setFeedback(feedback, text, "warn");
    });
  }

  function initPrintWorksheet() {
    const printBtn = document.getElementById("printWorksheetBtn");
    if (!printBtn) {
      return;
    }

    printBtn.addEventListener("click", function () {
      window.print();
    });
  }

  hydrateStateFromStorage();
  initCurriculumMenu();
  renderGlobalProgressSummary();
  initAccessibilityBar();
  initInfographic();
  initQuiz();
  initDragDrop();
  initFillBlanks();
  initPrintWorksheet();
  initProgressReset();
  updateProgress();
  paintSessionChipStatus();
})();
