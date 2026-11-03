document.addEventListener("DOMContentLoaded", () => {
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  // --- Autonomous Cursor Intro ---
  const intro = document.getElementById("siteIntro");
  const skipIntro = document.getElementById("skipIntro");
  const introStatus = document.getElementById("introStatus");
  const introProgress = document.getElementById("introProgress");
  const introStages = Array.from(document.querySelectorAll(".intro-stage"));
  const cursorSwarm = document.getElementById("cursorSwarm");
  const contentRegions = Array.from(document.querySelectorAll("header, main, footer"));
  let introFinished = false;
  let introTimers = [];

  const introPlan = [
    { at: 0, progress: 0.12, status: "Mapping the system and its structure…" },
    { at: 1350, progress: 0.38, status: "Composing identity, hierarchy, and signal…" },
    { at: 2800, progress: 0.68, status: "Assembling the interface in real time…" },
    { at: 4200, progress: 0.91, status: "Calibrating motion and handing over control…" }
  ];

  const cursorAgents = [
    { variant: "arrow", label: "ARCH", color: "#f8fafc", delay: "0.05s", ping: "1.5s", start: ["3vw", "19vh"], mid: ["30vw", "56vh"], end: ["59vw", "31vh"], rotate: ["-6deg", "11deg", "-3deg"] },
    { variant: "code", label: "CODE", color: "#38bdf8", delay: "0.45s", ping: "1.85s", start: ["92vw", "20vh"], mid: ["66vw", "61vh"], end: ["36vw", "38vh"], rotate: ["12deg", "-8deg", "4deg"] },
    { variant: "crosshair", label: "GRID", color: "#10b981", delay: "0.92s", ping: "2.25s", start: ["17vw", "92vh"], mid: ["47vw", "55vh"], end: ["75vw", "43vh"], rotate: ["0deg", "0deg", "0deg"] },
    { variant: "beam", label: "FLOW", color: "#f59e0b", delay: "1.3s", ping: "2.62s", start: ["85vw", "87vh"], mid: ["61vw", "35vh"], end: ["34vw", "66vh"], rotate: ["-15deg", "8deg", "-7deg"] },
    { variant: "standard", label: "SHIP", color: "#ff5d6a", delay: "1.75s", ping: "3.05s", start: ["48vw", "-7vh"], mid: ["53vw", "41vh"], end: ["78vw", "69vh"], rotate: ["4deg", "-5deg", "10deg"] }
  ];

  function createCursorAgent(agent) {
    if (!cursorSwarm) return;

    const cursor = document.createElement("div");
    const shape = document.createElement("span");
    const label = document.createElement("span");
    cursor.className = `cursor-agent cursor-agent--${agent.variant}`;
    shape.className = "cursor-shape";
    label.className = "cursor-agent-label";
    label.textContent = agent.label;

    if (agent.variant === "code") shape.textContent = "</>";
    if (agent.variant === "standard") shape.textContent = "+";
    if (agent.variant === "beam") shape.textContent = "=";

    cursor.style.setProperty("--agent-color", agent.color);
    cursor.style.setProperty("--agent-delay", agent.delay);
    cursor.style.setProperty("--ping-delay", agent.ping);
    cursor.style.setProperty("--start-x", agent.start[0]);
    cursor.style.setProperty("--start-y", agent.start[1]);
    cursor.style.setProperty("--mid-x", agent.mid[0]);
    cursor.style.setProperty("--mid-y", agent.mid[1]);
    cursor.style.setProperty("--end-x", agent.end[0]);
    cursor.style.setProperty("--end-y", agent.end[1]);
    cursor.style.setProperty("--start-r", agent.rotate[0]);
    cursor.style.setProperty("--mid-r", agent.rotate[1]);
    cursor.style.setProperty("--end-r", agent.rotate[2]);
    cursor.append(shape, label);
    cursorSwarm.append(cursor);
  }

  function setIntroStage(index) {
    if (!intro || !introPlan[index]) return;
    const step = introPlan[index];
    intro.dataset.stage = String(index);
    introStatus.textContent = step.status;
    introProgress.style.transform = `scaleX(${step.progress})`;

    introStages.forEach((stage, stageIndex) => {
      stage.classList.toggle("is-active", stageIndex === index);
      stage.classList.toggle("is-complete", stageIndex < index);
    });
  }

  function releasePage() {
    contentRegions.forEach((region) => {
      region.inert = false;
      region.removeAttribute("aria-hidden");
    });
    document.body.classList.remove("intro-is-active");
  }

  function finishIntro({ immediate = false } = {}) {
    if (!intro || introFinished) return;
    introFinished = true;
    introTimers.forEach((timer) => window.clearTimeout(timer));
    introTimers = [];
    introProgress.style.transform = "scaleX(1)";
    introStages.forEach((stage) => {
      stage.classList.remove("is-active");
      stage.classList.add("is-complete");
    });
    document.removeEventListener("keydown", onIntroKeydown);
    releasePage();

    if (immediate) {
      intro.remove();
      return;
    }

    intro.classList.add("is-leaving");
    window.setTimeout(() => {
      intro.remove();
      const mainContent = document.getElementById("main-content");
      if (mainContent) mainContent.focus({ preventScroll: true });
    }, 720);
  }

  function onIntroKeydown(event) {
    if (event.key === "Escape") {
      event.preventDefault();
      finishIntro();
    }
  }

  function startIntro() {
    if (!intro) return;
    document.body.classList.add("intro-is-active");
    contentRegions.forEach((region) => {
      region.inert = true;
      region.setAttribute("aria-hidden", "true");
    });
    cursorAgents.forEach(createCursorAgent);
    setIntroStage(0);
    document.addEventListener("keydown", onIntroKeydown);

    introPlan.slice(1).forEach((step, index) => {
      const timer = window.setTimeout(() => setIntroStage(index + 1), step.at);
      introTimers.push(timer);
    });
    introTimers.push(window.setTimeout(() => finishIntro(), 5550));
  }

  if (intro) {
    if (motionQuery.matches) {
      finishIntro({ immediate: true });
    } else {
      startIntro();
      skipIntro?.addEventListener("click", () => finishIntro());
      motionQuery.addEventListener("change", (event) => {
        if (event.matches) finishIntro({ immediate: true });
      }, { once: true });
    }
  }

  // --- Live Cursor Construction ---
  // The cursors build the actual portfolio components, not a separate loading mockup.
  const liveBuildLayer = document.getElementById("liveBuildLayer");
  const buildAgentCanvas = document.getElementById("buildAgentCanvas");
  const buildFrameCanvas = document.getElementById("buildFrameCanvas");
  const buildHud = document.getElementById("buildHud");
  const buildStatus = document.getElementById("buildStatus");
  const skipBuild = document.getElementById("skipBuild");
  const cursorBuffer = document.getElementById("cursorBuffer");
  const cursorAssistant = document.getElementById("cursorAssistant");
  const assistantToggle = document.getElementById("assistantToggle");
  const assistantPanel = document.getElementById("assistantPanel");
  let constructionSkipped = false;
  let constructionStarted = false;
  let assistantActive = false;
  let constructionQueue = [];
  let liveAgents = [];
  const queuedBeforeLaunch = new Set();
  const buildTempo = {
    bufferHold: 1500,
    initialStagger: 150,
    travel: 620,
    surface: 900,
    text: 1420,
    scrollDelay: 320,
    dockTravel: 740
  };

  const agentBlueprints = [
    { variant: "pointer", glyph: "", color: "#f8fafc", x: 30, y: 105, angle: -12 },
    { variant: "standard", glyph: "</>", color: "#38bdf8", x: 190, y: 102, angle: 8 },
    { variant: "crosshair", glyph: "", color: "#10b981", x: 320, y: 105, angle: 0 },
    { variant: "beam", glyph: "=", color: "#f59e0b", x: 450, y: 104, angle: -8 },
    { variant: "standard", glyph: "+", color: "#ff5d6a", x: 580, y: 104, angle: 10 }
  ];

  const liveTargetSelectors = [
    ".brand",
    ".nav-panel",
    ".status-indicator",
    ".hero-title",
    ".hero-role",
    ".hero-pitch",
    ".hero-subpitch",
    ".hero-chips",
    ".hero-actions",
    ".hero-quick-links",
    ".profile-frame",
    ".stack-panel",
    ".flow-mini-widget",
    ".philosophy-box",
    ".section-heading",
    ".case-study-nav",
    ".case-study-card",
    ".ownership-card",
    ".capability-card",
    ".project-card",
    ".workflow-step",
    ".info-card",
    ".contact-card",
    ".site-footer"
  ];

  const textBuildSelectors = ".hero-title, .hero-role, .hero-pitch, .hero-subpitch";
  const photoBuildSelectors = ".profile-frame";
  const liveTargets = Array.from(new Set(
    liveTargetSelectors.flatMap((selector) => Array.from(document.querySelectorAll(selector)))
  ));

  function updateBuildStatus(message) {
    if (buildStatus) buildStatus.textContent = message;
  }

  function createLiveAgent(blueprint) {
    if (!buildAgentCanvas) return null;
    const agent = document.createElement("div");
    const shape = document.createElement("span");
    const pulse = document.createElement("span");
    agent.className = `build-agent build-agent--${blueprint.variant}`;
    agent.style.setProperty("--agent-color", blueprint.color);
    shape.className = "build-agent-shape";
    shape.textContent = blueprint.glyph;
    pulse.className = "build-agent-pulse";
    agent.append(shape, pulse);
    buildAgentCanvas.append(agent);
    return { element: agent, color: blueprint.color, x: blueprint.x, y: blueprint.y, angle: blueprint.angle, busy: false };
  }

  function placeLiveAgent(agent, x, y, angle = 0) {
    agent.x = x;
    agent.y = y;
    agent.angle = angle;
    agent.element.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${angle}deg)`;
  }

  function getWorkbenchBounds() {
    const horizontalInset = Math.max(112, window.innerWidth * 0.22);
    const top = Math.max(116, window.innerHeight * 0.22);
    const bottom = Math.min(window.innerHeight - 76, window.innerHeight * 0.73);
    return {
      left: horizontalInset,
      right: Math.max(horizontalInset + 40, window.innerWidth - horizontalInset - 44),
      top,
      bottom: Math.max(top + 40, bottom)
    };
  }

  function clampToWorkbench(x, y) {
    const bounds = getWorkbenchBounds();
    return {
      x: Math.min(bounds.right, Math.max(bounds.left, x)),
      y: Math.min(bounds.bottom, Math.max(bounds.top, y))
    };
  }

  function parkAgentsInBuffer() {
    const bufferRect = cursorBuffer?.getBoundingClientRect();
    if (!bufferRect) return;
    liveAgents.forEach((agent, index) => {
      const orbit = (Math.PI * 2 * index) / liveAgents.length - Math.PI / 2;
      const parked = clampToWorkbench(
        bufferRect.left + bufferRect.width / 2 + Math.cos(orbit) * 35 - 14,
        bufferRect.top + bufferRect.height / 2 + Math.sin(orbit) * 35 - 14
      );
      agent.element.classList.add("is-buffer-parked");
      placeLiveAgent(agent, parked.x, parked.y, -12 + index * 6);
    });
  }

  function createConstructionFrame(rect, color) {
    if (!buildFrameCanvas || rect.width < 4 || rect.height < 4) return null;
    const frame = document.createElement("div");
    const inset = 5;
    frame.className = "build-frame";
    frame.style.setProperty("--frame-color", color);
    frame.style.setProperty("--frame-radius", `${Math.min(14, Math.max(4, rect.height * 0.08))}px`);
    frame.style.left = `${Math.max(inset, rect.left - inset)}px`;
    frame.style.top = `${Math.max(inset, rect.top - inset)}px`;
    frame.style.width = `${Math.min(window.innerWidth - inset * 2, rect.width + inset * 2)}px`;
    frame.style.height = `${Math.min(window.innerHeight - inset * 2, rect.height + inset * 2)}px`;
    buildFrameCanvas.append(frame);
    window.setTimeout(() => frame.remove(), 1080);
    return frame;
  }

  function targetDescription(target) {
    if (target.matches(photoBuildSelectors)) return "Scanning and grading the profile image…";
    if (target.matches(textBuildSelectors)) return `Typing and styling ${target.textContent.trim().slice(0, 30)}…`;
    if (target.matches(".hero-chips, .stack-panel")) return "Placing the technical stack and metadata…";
    if (target.matches(".project-card, .case-study-card")) return "Drawing an engineering case-study panel…";
    if (target.matches(".ownership-card, .capability-card, .workflow-step")) return "Constructing the next interface block…";
    if (target.matches(".contact-card")) return "Wiring the next contact surface…";
    return "Drawing layout, color, and hierarchy…";
  }

  function chooseAvailableAgent() {
    return liveAgents.find((agent) => !agent.busy) || null;
  }

  function finishTarget(target) {
    target.classList.remove("is-building", "is-typing", "is-typing-active");
    target.classList.add("is-built", "is-visible");
    target.removeAttribute("data-build-preview");
    target.style.removeProperty("--build-color");
    if (!constructionSkipped) window.setTimeout(maybeActivateAssistant, 0);
  }

  function constructTarget(target, agent) {
    if (constructionSkipped || !target || target.classList.contains("is-built")) {
      if (agent) agent.busy = false;
      return;
    }

    const rect = target.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) {
      finishTarget(target);
      if (agent) agent.busy = false;
      return;
    }

    agent.busy = true;
    const workbenchPoint = clampToWorkbench(
      rect.left + Math.min(rect.width * 0.68, 54),
      rect.top + Math.min(rect.height * 0.36, 48)
    );
    const isText = target.matches(textBuildSelectors);
    const buildDuration = isText ? buildTempo.text : buildTempo.surface;

    updateBuildStatus(targetDescription(target));
    const angle = Math.atan2(workbenchPoint.y - agent.y, workbenchPoint.x - agent.x) * (180 / Math.PI) + 18;
    agent.element.classList.add("is-active");
    placeLiveAgent(agent, workbenchPoint.x, workbenchPoint.y, angle);

    window.setTimeout(() => {
      if (constructionSkipped) return;
      target.style.setProperty("--build-color", agent.color);
      target.classList.add("is-building");
      createConstructionFrame(rect, agent.color);
      agent.element.classList.add("is-working");

      if (isText) {
        target.dataset.buildPreview = target.textContent.replace(/\s+/g, " ").trim();
        target.classList.add("is-typing");
        window.requestAnimationFrame(() => target.classList.add("is-typing-active"));
      }
    }, buildTempo.travel);

    window.setTimeout(() => {
      if (!constructionSkipped) finishTarget(target);
      agent.element.classList.remove("is-working");
      agent.busy = false;
      flushConstructionQueue();
      maybeActivateAssistant();
    }, buildTempo.travel + buildDuration);
  }

  function flushConstructionQueue() {
    if (constructionSkipped) return;
    while (constructionQueue.length) {
      const agent = chooseAvailableAgent();
      if (!agent) return;
      const target = constructionQueue.shift();
      if (!target || target.classList.contains("is-built") || target.classList.contains("is-building")) continue;
      constructTarget(target, agent);
    }
  }

  function queueConstruction(target) {
    if (constructionSkipped || !target || target.classList.contains("is-built") || target.classList.contains("is-building") || constructionQueue.includes(target)) return;
    if (!constructionStarted) {
      queuedBeforeLaunch.add(target);
      return;
    }
    constructionQueue.push(target);
    flushConstructionQueue();
  }

  function dockCursorCrew() {
    if (!liveBuildLayer) return;
    liveBuildLayer.classList.remove("is-buffering", "is-launching");
    liveBuildLayer.classList.add("is-docking");
    liveAgents.forEach((agent, index) => {
      const dockX = 24 + index * 17;
      const dockY = window.innerHeight - 74 + (index % 2) * 8;
      agent.busy = false;
      agent.element.classList.remove("is-working");
      agent.element.classList.add("is-active");
      placeLiveAgent(agent, dockX, dockY, -18 + index * 12);
    });

    window.setTimeout(() => {
      document.body.classList.remove("live-build-active");
      liveBuildLayer.classList.remove("is-docking");
      if (buildHud) {
        buildHud.setAttribute("aria-hidden", "true");
        buildHud.hidden = true;
      }
      window.setTimeout(() => {
        buildAgentCanvas?.replaceChildren();
        buildFrameCanvas?.replaceChildren();
        if (cursorAssistant) cursorAssistant.hidden = false;
        window.requestAnimationFrame(() => liveBuildLayer.classList.add("is-assistant"));
      }, 140);
    }, buildTempo.dockTravel);
  }

  function activateCursorAssistant({ force = false } = {}) {
    if (assistantActive || !liveBuildLayer) return;
    const allTargetsBuilt = liveTargets.every((target) => target.classList.contains("is-built"));
    if (!force && (!allTargetsBuilt || constructionQueue.length || liveAgents.some((agent) => agent.busy))) return;
    assistantActive = true;
    updateBuildStatus("Every surface is assembled. Cursor crew is docking…");
    document.removeEventListener("keydown", handleConstructionKeydown);
    dockCursorCrew();
  }

  function maybeActivateAssistant() {
    if (!constructionStarted || constructionSkipped || assistantActive) return;
    activateCursorAssistant();
  }

  function skipConstruction({ reducedMotion = false } = {}) {
    if (constructionSkipped) return;
    constructionSkipped = true;
    constructionQueue = [];
    liveTargets.forEach(finishTarget);
    document.removeEventListener("keydown", handleConstructionKeydown);

    if (reducedMotion) {
      document.body.classList.remove("live-build-active");
      liveBuildLayer?.remove();
      return;
    }

    activateCursorAssistant({ force: true });
  }

  function handleConstructionKeydown(event) {
    if (event.key === "Escape") skipConstruction();
  }

  function initializeLiveConstruction() {
    if (!liveBuildLayer) return;
    liveTargets.forEach((target) => {
      target.classList.add("build-target");
      if (target.matches(textBuildSelectors)) target.classList.add("build-target--text");
      if (target.matches(photoBuildSelectors)) target.classList.add("build-target--photo");
    });

    if (motionQuery.matches) {
      skipConstruction({ reducedMotion: true });
      return;
    }

    document.body.classList.add("live-build-active");
    document.querySelectorAll(".hero-copy[data-reveal], .hero-visual[data-reveal]").forEach((element) => element.classList.add("is-visible"));
    liveAgents = agentBlueprints.map(createLiveAgent).filter(Boolean);
    liveBuildLayer.classList.add("is-buffering");
    parkAgentsInBuffer();
    document.addEventListener("keydown", handleConstructionKeydown);
    skipBuild?.addEventListener("click", skipConstruction);
    assistantToggle?.addEventListener("click", () => {
      const isExpanded = assistantToggle.getAttribute("aria-expanded") === "true";
      assistantToggle.setAttribute("aria-expanded", String(!isExpanded));
      if (assistantPanel) assistantPanel.hidden = isExpanded;
    });

    const initialTargets = liveTargets.filter((target) => target.closest("#hero") || target.matches(".brand, .nav-panel"));

    const constructionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        window.setTimeout(() => queueConstruction(entry.target), buildTempo.scrollDelay);
        constructionObserver.unobserve(entry.target);
      });
    }, { threshold: 0.16, rootMargin: "0px 0px -14% 0px" });

    liveTargets.filter((target) => !initialTargets.includes(target)).forEach((target) => constructionObserver.observe(target));

    updateBuildStatus("Five cursor agents are buffering in the central workbench…");
    window.setTimeout(() => {
      if (constructionSkipped) return;
      constructionStarted = true;
      liveBuildLayer.classList.remove("is-buffering");
      liveBuildLayer.classList.add("is-launching");
      liveAgents.forEach((agent, index) => {
        window.setTimeout(() => {
          agent.element.classList.remove("is-buffer-parked");
          agent.element.classList.add("is-active");
        }, index * buildTempo.initialStagger);
      });
      updateBuildStatus("Cursor crew launched. Constructing the live interface…");
      initialTargets.forEach((target, index) => {
        window.setTimeout(() => queueConstruction(target), index * buildTempo.initialStagger);
      });
      queuedBeforeLaunch.forEach(queueConstruction);
      queuedBeforeLaunch.clear();
    }, buildTempo.bufferHold);
  }

  initializeLiveConstruction();

  // --- Mobile Navigation ---
  const menuToggle = document.getElementById("menuToggle");
  const siteNav = document.getElementById("siteNav");
  const navLinks = document.querySelectorAll(".nav-link");

  function setMenuState(isOpen) {
    if (!menuToggle || !siteNav) return;
    menuToggle.classList.toggle("is-active", isOpen);
    siteNav.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  }

  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = !siteNav.classList.contains("is-open");
      setMenuState(isOpen);
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => setMenuState(false));
    });

    document.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (!siteNav.contains(target) && !menuToggle.contains(target)) {
        setMenuState(false);
      }
    });
  }

  // --- Case Study Tabs ---
  const caseTabs = document.querySelectorAll(".case-tab");
  const caseCards = document.querySelectorAll(".case-study-card");

  caseTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetId = tab.getAttribute("data-tab");
      if (!targetId) return;

      caseTabs.forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      caseCards.forEach((c) => {
        c.classList.remove("active");
      });

      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");

      const targetCard = document.getElementById(targetId);
      if (targetCard) {
        targetCard.classList.add("active");
        queueConstruction(targetCard);
      }
    });
  });

  // --- Cinematic Scroll Foundation ---
  const scrollMeterFill = document.getElementById("scrollMeterFill");
  const chapterNumber = document.getElementById("chapterNumber");
  const chapterLabel = document.getElementById("chapterLabel");
  const chapterMap = {
    hero: ["01", "HOME"],
    philosophy: ["02", "MINDSET"],
    ownership: ["03", "OWNERSHIP"],
    "case-studies": ["04", "CASE STUDIES"],
    capabilities: ["05", "CAPABILITIES"],
    projects: ["06", "PROJECTS"],
    workflow: ["07", "WORKFLOW"],
    about: ["08", "ABOUT"],
    contact: ["09", "CONTACT"]
  };
  let isScrollFrameQueued = false;
  let assistantScrollTimer;

  function updateScrollChapter() {
    const viewportMarker = window.scrollY + window.innerHeight * 0.42;
    let activeSection = "hero";
    document.querySelectorAll("section[id]").forEach((section) => {
      if (section.offsetTop <= viewportMarker) activeSection = section.id;
    });
    const chapter = chapterMap[activeSection] || ["--", "PORTFOLIO"];
    if (chapterNumber) chapterNumber.textContent = chapter[0];
    if (chapterLabel) chapterLabel.textContent = chapter[1];
  }

  function signalAssistantScroll() {
    if (!assistantActive || !cursorAssistant) return;
    cursorAssistant.classList.add("is-scrolling");
    window.clearTimeout(assistantScrollTimer);
    assistantScrollTimer = window.setTimeout(() => cursorAssistant.classList.remove("is-scrolling"), 480);
  }

  function updateScrollFoundation() {
    const scrollableHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const progress = Math.min(Math.max(window.scrollY / scrollableHeight, 0), 1);
    document.documentElement.style.setProperty("--page-progress", String(progress));
    document.documentElement.style.setProperty("--hero-drift", `${Math.min(window.scrollY * 0.12, 72)}px`);
    document.documentElement.style.setProperty("--hero-drift-reverse", `${Math.min(window.scrollY * -0.08, 48)}px`);
    if (scrollMeterFill) scrollMeterFill.setAttribute("aria-valuenow", String(Math.round(progress * 100)));
    updateScrollChapter();
    signalAssistantScroll();
    isScrollFrameQueued = false;
  }

  function queueScrollFoundationUpdate() {
    if (isScrollFrameQueued || motionQuery.matches) return;
    isScrollFrameQueued = true;
    window.requestAnimationFrame(updateScrollFoundation);
  }

  if (!motionQuery.matches) {
    updateScrollFoundation();
    window.addEventListener("scroll", queueScrollFoundationUpdate, { passive: true });
    window.addEventListener("resize", queueScrollFoundationUpdate, { passive: true });
  }

  // --- Scroll Reveal Animations ---
  const revealElements = document.querySelectorAll("[data-reveal]");

  function revealImmediately() {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  }

  if (motionQuery.matches) {
    revealImmediately();
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealElements.forEach((element) => observer.observe(element));
  }

  // --- Active Nav ScrollSpy ---
  const sections = document.querySelectorAll("section[id]");
  
  function highlightNavOnScroll() {
    const scrollY = window.scrollY;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute("id");
      const matchingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (matchingLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          matchingLink.classList.add("active");
        } else {
          matchingLink.classList.remove("active");
        }
      }
    });
  }

  window.addEventListener("scroll", highlightNavOnScroll, { passive: true });
});
