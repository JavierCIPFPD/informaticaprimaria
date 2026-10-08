(function () {
  "use strict";

  const STORAGE_KEY = "ip_cuaderno_progreso_v1";
  const CURRENT_SESSION_ID = SESSION_ID; // Definido en el HTML
  const CORRECT_DRAG_MAP = CORRECT_MAP; // Definido en el HTML
  const CORRECT_FILL_ANSWERS = FILL_ANSWERS; // Definido en el HTML
  const QUIZ_CORRECT_ANSWER = window.QUIZ_CORRECT_ANSWER || "";
  const TOTAL_SESSIONS_PER_TERM = 12;

  const BASE_COMPONENT_LABELS = {
    windows: "Windows",
    macos: "macOS",
    linux: "Linux",
    paso1: "Paso 1",
    paso2: "Paso 2",
    paso3: "Paso 3",
    seguro: "Seguro",
    rapido: "Rápido",
    gratuito: "Gratuito",
    descargar: "Descargar",
    ubuntu: "Ubuntu",
    conectar: "Conectar",
    procesos: "Procesos",
    archivos: "Archivos",
    software: "Software",
    cpu90: "CPU 90%",
    ram10: "RAM 10%",
    disco100: "Disco 100%"
  };

  const COMPONENT_LABELS = Object.assign(
    {},
    BASE_COMPONENT_LABELS,
    window.SESSION_COMPONENT_LABELS || {}
  );

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
        item1: "",
        item2: "",
        item3: ""
      },
      dragAlt: {
        alt1: "",
        alt2: "",
        alt3: ""
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
            item1: "",
            item2: "",
            item3: ""
          },
          altAssignments: {
            alt1: "",
            alt2: "",
            alt3: ""
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
      item1: sessionProgress.activities.drag.assignments.item1 || "",
      item2: sessionProgress.activities.drag.assignments.item2 || "",
      item3: sessionProgress.activities.drag.assignments.item3 || ""
    };
    state.answers.dragAlt = {
      alt1: sessionProgress.activities.drag.altAssignments.alt1 || "",
      alt2: sessionProgress.activities.drag.altAssignments.alt2 || "",
      alt3: sessionProgress.activities.drag.altAssignments.alt3 || ""
    };
  }

  function persistStateToStorage() {
    const sessionProgress = getSessionProgress(CURRENT_SESSION_ID);

    sessionProgress.activities.quiz.done = state.quizDone;
    sessionProgress.activities.quiz.attempts = state.attempts.quiz;
    sessionProgress.activities.quiz.answer = state.answers.quiz;

    sessionProgress.activities.drag.done = state.dragDone;
    sessionProgress.activities.drag.assignments = {
      item1: state.answers.drag.item1,
      item2: state.answers.drag.item2,
      item3: state.answers.drag.item3
    };
    sessionProgress.activities.drag.altAssignments = {
      alt1: state.answers.dragAlt.alt1,
      alt2: state.answers.dragAlt.alt2,
      alt3: state.answers.dragAlt.alt3
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
      const fallbackText = "Sesión de Informática para primaria.";
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
    if (!info || buttons.length === 0) {
      return;
    }

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (b) {
          b.classList.remove("active");
        });
        btn.classList.add("active");
        info.textContent = btn.getAttribute("data-description") || "Sin descripción disponible.";
      });
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

    const topicMatrix = {
      c1: {
        t1: {
          1: "Hardware básico y desmontar",
          2: "Sistemas operativos",
          3: "BIOS y arranque",
          4: "Linux Ubuntu",
          5: "Instalar Ubuntu",
          6: "Monitor del sistema"
        }
      },
      c2: {
        t1: {
          1: "Montaje y cableado",
          2: "Señales POST",
          3: "HDD vs SSD",
          4: "Terminal básica",
          5: "Permisos y sudo",
          6: "Instalación APT"
        }
      }
    };

    const parseSessionId = function (sessionId) {
      const m = /^c([12])t([123])s([1-9]|1[0-2])$/.exec(sessionId || "");
      if (!m) {
        return null;
      }
      return {
        course: parseInt(m[1], 10),
        term: parseInt(m[2], 10),
        session: parseInt(m[3], 10)
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

    const sessionLabel = function (course, term, index) {
      const courseKey = "c" + course;
      const termKey = "t" + term;
      const termTopics = topicMatrix[courseKey] && topicMatrix[courseKey][termKey] ? topicMatrix[courseKey][termKey] : {};
      return "Sesión " + index + ": " + (termTopics[index] || "Sesión");
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
          html += ">" + sessionLabel(courseIndex + 1, termIndex + 1, i) + "</a>";
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
      setFeedback(feedback, "Correcto. ¡Bien hecho!", "ok");
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

      const isCorrect = QUIZ_CORRECT_ANSWER
        ? selected.value === QUIZ_CORRECT_ANSWER
        : (Object.values(CORRECT_DRAG_MAP).includes(selected.value) || Object.keys(CORRECT_DRAG_MAP).includes(selected.value));

      if (isCorrect) {
        setFeedback(feedback, "¡Correcto! Muy bien.", "ok");
        state.quizDone = true;
      } else {
        setFeedback(feedback, "No es correcta. Intenta de nuevo.", "err");
      }

      persistStateToStorage();
      updateProgress();
    });

    hintBtn.addEventListener("click", function () {
      const text = state.attempts.quiz >= 2
        ? "Pista fuerte: revisa la explicación del bloque anterior."
        : "Pista: piensa en lo que dice el título de la sesión.";
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

    const altInputs = document.querySelectorAll("select[id^='alt']");
    let dragged = null;

    zones.forEach(function (zone) {
      zone.dataset.baseText = zone.textContent.trim();
      const key = zone.dataset.target;
      const stateKey = "item" + (zones.indexOf(zone) + 1);
      if (state.answers.drag[stateKey]) {
        applyZoneAssignment(zone, state.answers.drag[stateKey]);
      }
    });

    altInputs.forEach(function (select, idx) {
      const stateKey = "alt" + (idx + 1);
      select.value = state.answers.dragAlt[stateKey] || "";
    });

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

    zones.forEach(function (zone, zoneIdx) {
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
        const stateKey = "item" + (zoneIdx + 1);
        state.answers.drag[stateKey] = value;
        persistStateToStorage();
      });
    });

    altInputs.forEach(function (select, idx) {
      select.addEventListener("change", function () {
        const stateKey = "alt" + (idx + 1);
        state.answers.dragAlt[stateKey] = select.value;
        persistStateToStorage();
      });
    });

    checkBtn.addEventListener("click", function () {
      let correct = 0;
      zones.forEach(function (zone, zoneIdx) {
        const target = zone.dataset.target;
        const assigned = zone.dataset.assigned;
        const stateKey = "item" + (zoneIdx + 1);
        const altValue = state.answers.dragAlt["alt" + (zoneIdx + 1)] || "";
        const finalValue = assigned || altValue;

        if (!assigned && altValue) {
          state.answers.drag[stateKey] = altValue;
        }

        zone.classList.remove("correct", "incorrect");
        if (finalValue && CORRECT_DRAG_MAP[target] === finalValue) {
          zone.classList.add("correct");
          correct += 1;
        } else {
          zone.classList.add("incorrect");
        }
      });

      if (correct === 3) {
        setFeedback(feedback, "¡Excelente! Lo has acertado todo.", "ok");
        state.dragDone = true;
      } else {
        setFeedback(feedback, "Tienes " + correct + " de 3 correctas. Revisa cada relación.", "warn");
      }

      persistStateToStorage();
      updateProgress();
    });

    resetBtn.addEventListener("click", function () {
      zones.forEach(function (zone) {
        zone.classList.remove("correct", "incorrect");
        applyZoneAssignment(zone, "");
      });

      state.answers.drag = { item1: "", item2: "", item3: "" };
      state.answers.dragAlt = { alt1: "", alt2: "", alt3: "" };

      altInputs.forEach(function (select) {
        select.value = "";
      });

      setFeedback(feedback, "Actividad reiniciada.", "warn");
      persistStateToStorage();
    });
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

      const correct = a === CORRECT_FILL_ANSWERS.fill1 && b === CORRECT_FILL_ANSWERS.fill2 && c === CORRECT_FILL_ANSWERS.fill3;
      if (correct) {
        setFeedback(feedback, "Muy bien. ¡Perfecto!", "ok");
        state.fillDone = true;
      } else {
        setFeedback(feedback, "Algún hueco no es correcto. Revisa cada respuesta.", "err");
      }

      persistStateToStorage();
      updateProgress();
    });

    hintBtn.addEventListener("click", function () {
      const text = state.attempts.fill >= 2
        ? "Pista fuerte: las respuestas están todas en la explicación."
        : "Pista: lee con cuidado la explicación del bloque anterior.";
      setFeedback(feedback, text, "warn");
    });
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
      hydrateStateFromStorage();
      persistStateToStorage();
      clearActivityUI();
      initCurriculumMenu();
      updateProgress();
      paintSessionChipStatus();
      renderGlobalProgressSummary();
      setFeedback(feedback, "Progreso reiniciado correctamente.", "ok");
    });
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

    const altInputs = document.querySelectorAll("select[id^='alt']");
    altInputs.forEach(function (select) {
      select.value = "";
    });

    const dragFeedback = document.getElementById("dragFeedback");
    if (dragFeedback) {
      dragFeedback.textContent = "";
      dragFeedback.classList.remove("ok", "warn", "err");
    }

    const fill1 = document.getElementById("fill1");
    const fill2 = document.getElementById("fill2");
    const fill3 = document.getElementById("fill3");
    if (fill1) fill1.value = "";
    if (fill2) fill2.value = "";
    if (fill3) fill3.value = "";

    const fillFeedback = document.getElementById("fillFeedback");
    if (fillFeedback) {
      fillFeedback.textContent = "";
      fillFeedback.classList.remove("ok", "warn", "err");
    }
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
