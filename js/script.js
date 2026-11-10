document.addEventListener("DOMContentLoaded", () => {
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ==========================================================================
     SMOOTH INERTIA MOMENTUM SCROLL ENGINE
     Buttery smooth, liquid momentum scrolling with responsive deceleration
     ========================================================================== */

  class SmoothScrollEngine {
    constructor(options = {}) {
      this.ease = options.ease || 0.088; // Butter smooth with snappy responsiveness
      this.current = window.scrollY;
      this.target = window.scrollY;
      this.isTicking = false;
      this.isTouch = false;
      this.maxScroll = 0;

      // Enable smooth scroll indicator class on html
      document.documentElement.classList.add("has-smooth-scroll");

      this.updateBounds();
      this.bindEvents();
    }

    updateBounds() {
      this.maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    }

    bindEvents() {
      // Detect mobile touch to preserve native hardware touch momentum
      window.addEventListener("touchstart", () => {
        this.isTouch = true;
      }, { passive: true });

      // Intercept Wheel Events on desktop
      window.addEventListener("wheel", (e) => {
        if (this.isTouch || motionQuery.matches) return;

        // Ignore zoom or horizontal gestures
        if (e.ctrlKey || e.metaKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

        e.preventDefault();

        let delta = e.deltaY;
        // Normalize delta across line, page, and pixel wheel modes
        if (e.deltaMode === 1) delta *= 28; // lines
        else if (e.deltaMode === 2) delta *= window.innerHeight; // pages

        // Clamp delta so intense wheel flicks glide without jarring jumps
        const clampedDelta = Math.max(-150, Math.min(150, delta));

        this.updateBounds();
        this.target = Math.max(0, Math.min(this.maxScroll, this.target + clampedDelta * 1.12));

        if (!this.isTicking) {
          this.isTicking = true;
          this.tick();
        }
      }, { passive: false });

      // Keyboard arrow & page scrolling with smooth momentum
      window.addEventListener("keydown", (e) => {
        if (motionQuery.matches || this.isTouch) return;
        if (["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) return;

        let keyDelta = 0;
        if (e.key === "ArrowDown") keyDelta = 90;
        else if (e.key === "ArrowUp") keyDelta = -90;
        else if (e.key === "PageDown") keyDelta = window.innerHeight * 0.75;
        else if (e.key === "PageUp") keyDelta = -window.innerHeight * 0.75;
        else if (e.key === "Home") { this.scrollTo(0); return; }
        else if (e.key === "End") { this.scrollTo(this.maxScroll); return; }

        if (keyDelta !== 0) {
          e.preventDefault();
          this.updateBounds();
          this.target = Math.max(0, Math.min(this.maxScroll, this.target + keyDelta));
          if (!this.isTicking) {
            this.isTicking = true;
            this.tick();
          }
        }
      });

      // Sync on native scroll events (scrollbar dragging, touch momentum, page reload)
      window.addEventListener("scroll", () => {
        if (!this.isTicking) {
          this.current = window.scrollY;
          this.target = window.scrollY;
        }
      }, { passive: true });

      window.addEventListener("resize", () => {
        this.updateBounds();
        this.current = window.scrollY;
        this.target = window.scrollY;
      }, { passive: true });

      // Smooth Anchor Navigation
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (e) => {
          const href = anchor.getAttribute("href");
          if (!href || href === "#") return;
          const targetEl = document.querySelector(href);
          if (targetEl) {
            e.preventDefault();
            const targetY = targetEl.getBoundingClientRect().top + window.scrollY - 76;
            this.scrollTo(targetY);
          }
        });
      });
    }

    scrollTo(y) {
      this.updateBounds();
      this.target = Math.max(0, Math.min(this.maxScroll, y));
      if (!this.isTicking) {
        this.isTicking = true;
        this.tick();
      }
    }

    tick() {
      const diff = this.target - this.current;

      if (Math.abs(diff) < 0.35) {
        this.current = this.target;
        window.scrollTo(0, this.current);
        this.isTicking = false;
        return;
      }

      this.current += diff * this.ease;
      window.scrollTo(0, this.current);

      requestAnimationFrame(() => this.tick());
    }
  }

  // Initialize Smooth Momentum Scroll
  const smoothScroll = new SmoothScrollEngine({ ease: 0.088 });

  /* ==========================================================================
     AUTONOMOUS MULTI-AGENT SWARM REBUILD ENGINE
     Inspired by Joel Califa's Swarm Rebuild / Dhvanil Patel
     Tuned for cinematic deliberate pacing and smooth scroll synergy
     ========================================================================== */

  const AGENT_BLUEPRINTS = [
    {
      role: "SYSTEM ARCHITECT",
      code: "ARCH",
      specialty: "Structural hierarchy & wireframes",
      variant: "arrow",
      color: "#38bdf8", // Sky / Cyan
      svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 2l16 10-7 2-3 7L4 2z"/></svg>'
    },
    {
      role: "TYPE ENGINE",
      code: "CODE",
      specialty: "Logic, tokens & typography",
      variant: "code",
      color: "#10b981", // Emerald / Mint
      svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><polyline points="7 8 3 12 7 16"/><polyline points="17 8 21 12 17 16"/><line x1="14" y1="4" x2="10" y2="20"/></svg>'
    },
    {
      role: "SURFACE DESIGN",
      code: "DESIGN",
      specialty: "CAD calipers & smart guides",
      variant: "crosshair",
      color: "#f59e0b", // Amber / Gold
      svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="9"/><line x1="12" y1="3" x2="12" y2="7"/><line x1="12" y1="17" x2="12" y2="21"/><line x1="3" y1="12" x2="7" y2="12"/><line x1="17" y1="12" x2="21" y2="12"/></svg>'
    },
    {
      role: "MOTION & FLOW",
      code: "FLOW",
      specialty: "Pipeline streaming & assembly",
      variant: "beam",
      color: "#ff5d6a", // Coral / Rose
      svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>'
    },
    {
      role: "QA / CALIBRATION",
      code: "QA",
      specialty: "Precision alignment & lock-in",
      variant: "diamond",
      color: "#f8fafc", // Slate / White
      svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polygon points="12,2 22,12 12,22 2,12"/><circle cx="12" cy="12" r="2.5" fill="currentColor"/></svg>'
    }
  ];

  /* DOM Selectors to Construct in Order */
  const TARGET_SELECTORS = [
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
    ".contact-shell",
    ".site-footer"
  ];

  const TEXT_BUILD_SELECTORS = ".hero-title, .hero-role, .hero-pitch, .hero-subpitch, .section-heading, .brand-name, .hero-role, .philosophy-quote";
  const CARD_BUILD_SELECTORS = ".profile-frame, .stack-panel, .flow-mini-widget, .case-study-card, .ownership-card, .capability-card, .project-card, .workflow-step, .info-card, .contact-shell, .philosophy-box";

  /* ==========================================================================
     CONSTRUCTION ENGINE
     ========================================================================== */

  class AutonomousConstructionEngine {
    constructor() {
      this.layer = document.getElementById("liveBuildLayer");
      this.agentCanvas = document.getElementById("buildAgentCanvas");
      this.guideCanvas = document.getElementById("buildGuideCanvas");
      this.bufferEl = document.getElementById("cursorBuffer");
      this.dockEl = document.getElementById("cursorDock");
      this.hudStatus = document.getElementById("buildStatus");
      this.skipBtn = document.getElementById("skipBuild");

      if (!this.layer || !this.agentCanvas || !this.guideCanvas) return;

      this.ctx = this.guideCanvas.getContext("2d");
      this.dpr = Math.min(window.devicePixelRatio || 1, 2);

      this.width = window.innerWidth;
      this.height = window.innerHeight;

      // Construction state: 'buffering' | 'building' | 'docked'
      this.state = "buffering";
      this.bufferStartTime = performance.now();
      this.bufferDuration = 1750; // Calibrated steady buffer duration in ms
      this.isSkipped = false;

      // Active guide line / particle systems on canvas
      this.activeFrames = []; // { rect, color, code, startTime, duration }
      this.wakeParticles = []; // { x, y, vx, vy, color, alpha, radius }
      this.sparks = []; // { x, y, vx, vy, color, alpha, life }
      this.bursts = []; // { rect, color, startTime, duration }

      // Queue of elements to build
      this.buildQueue = [];
      this.allTargets = [];

      // Create Agent Instances
      this.agents = AGENT_BLUEPRINTS.map((bp, i) => this.createAgent(bp, i));

      // Resize Canvas & Bind Events
      this.resize();
      this.bindEvents();

      // Collect all DOM targets
      this.initTargets();

      if (motionQuery.matches) {
        this.skipBuild(true);
      } else {
        document.body.classList.add("live-build-active");
        this.startBufferPhase();
      }

      // Start rAF Loop
      this.rafId = requestAnimationFrame((t) => this.tick(t));
    }

    createAgent(blueprint, index) {
      const el = document.createElement("div");
      el.className = `cursor-agent cursor-agent--${blueprint.variant}`;
      el.style.setProperty("--agent-color", blueprint.color);

      const shape = document.createElement("span");
      shape.className = "cursor-agent-shape";
      shape.innerHTML = blueprint.svg;

      const label = document.createElement("span");
      label.className = "cursor-agent-label";
      label.textContent = blueprint.code;

      el.append(shape, label);
      this.agentCanvas.append(el);

      return {
        blueprint,
        el,
        x: this.width * 0.5,
        y: this.height * 0.5,
        targetX: this.width * 0.5,
        targetY: this.height * 0.5,
        vx: 0,
        vy: 0,
        angle: 0,
        targetAngle: 0,
        scale: 1,
        busy: false,
        task: null, // current element being built
        taskStartTime: 0,
        taskDuration: 0,
        taskType: "generic", // 'text' | 'card' | 'generic'
        orbitOffset: (index * 2 * Math.PI) / AGENT_BLUEPRINTS.length
      };
    }

    initTargets() {
      // Find all DOM targets
      const found = new Set();
      TARGET_SELECTORS.forEach((selector) => {
        document.querySelectorAll(selector).forEach((el) => {
          if (!found.has(el)) {
            found.add(el);
            el.classList.add("build-target");
            if (el.matches(TEXT_BUILD_SELECTORS)) {
              el.classList.add("build-target--text");
            }
          }
        });
      });

      this.allTargets = Array.from(found);

      // Sort targets strictly in top-to-bottom document order
      this.allTargets.sort((a, b) => {
        const topA = a.getBoundingClientRect().top + window.scrollY;
        const topB = b.getBoundingClientRect().top + window.scrollY;
        return topA - topB;
      });

      // Split into initial viewport targets vs below-the-fold targets
      const vh = window.innerHeight;
      const initialTargets = this.allTargets.filter((el) => {
        const rect = el.getBoundingClientRect();
        return rect.top < vh * 0.95 && rect.bottom > -20;
      });

      // Initial targets enter the active queue immediately
      this.buildQueue = [...initialTargets];

      // Below-the-fold targets are monitored by IntersectionObserver on scroll
      // with a generous 280px margin to smoothly anticipate incoming cards
      const belowTargets = this.allTargets.filter((el) => !initialTargets.includes(el));
      this.scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target;
            if (!target.classList.contains("is-built") && !this.buildQueue.includes(target)) {
              // Priority insert into queue
              this.buildQueue.push(target);

              // Wake up docked agents smoothly if necessary
              if (this.state === "docked") {
                this.state = "building";
                this.layer.classList.remove("is-docked");
              }
              this.dispatchTasks();
            }
            this.scrollObserver.unobserve(target);
          }
        });
      }, { threshold: 0.08, rootMargin: "0px 0px 280px 0px" });

      belowTargets.forEach((el) => this.scrollObserver.observe(el));
    }

    startBufferPhase() {
      this.state = "buffering";
      if (this.hudStatus) {
        this.hudStatus.textContent = "SWARM // CALIBRATING · 5 autonomous agents synchronizing…";
      }

      window.setTimeout(() => {
        if (this.isSkipped || this.state !== "buffering") return;
        this.launchAgents();
      }, this.bufferDuration);
    }

    launchAgents() {
      this.state = "building";
      this.layer.classList.add("is-launching");

      if (this.hudStatus) {
        this.hudStatus.textContent = "SWARM // CONSTRUCTING · 5 cores engineering interface…";
      }

      window.setTimeout(() => {
        if (this.bufferEl) this.bufferEl.style.display = "none";
        this.layer.classList.remove("is-launching");
        this.layer.classList.add("is-active");
      }, 550);

      // Trigger simultaneous task dispatch across all 5 agents
      this.dispatchTasks();
    }

    /**
     * Dispatches available agents to unbuilt targets simultaneously.
     */
    dispatchTasks() {
      if (this.isSkipped || this.state === "buffering") return;

      // Sort queue so top elements always build first
      this.buildQueue.sort((a, b) => {
        const topA = a.getBoundingClientRect().top;
        const topB = b.getBoundingClientRect().top;
        return topA - topB;
      });

      // Assign all free agents concurrently
      for (const agent of this.agents) {
        if (!agent.busy && this.buildQueue.length > 0) {
          const target = this.buildQueue.shift();
          if (target && !target.classList.contains("is-built") && !target.classList.contains("is-building")) {
            this.assignTask(agent, target);
          }
        }
      }

      // Check if all queued targets are built and agents are idle
      const allQueuedBuilt = this.buildQueue.length === 0 && this.agents.every((a) => !a.busy);
      const allVisibleBuilt = this.allTargets
        .filter((t) => {
          const r = t.getBoundingClientRect();
          return r.top < window.innerHeight && r.bottom > 0;
        })
        .every((t) => t.classList.contains("is-built"));

      if (allQueuedBuilt && allVisibleBuilt && this.state !== "docked") {
        this.dockAgents();
      }
    }

    assignTask(agent, target) {
      agent.busy = true;
      agent.task = target;
      agent.taskStartTime = performance.now();

      const rect = target.getBoundingClientRect();
      const isText = target.classList.contains("build-target--text");
      const isCard = target.matches(CARD_BUILD_SELECTORS);

      agent.taskType = isText ? "text" : isCard ? "card" : "generic";

      // Tuned deliberate timing: clear, readable, cinematic
      agent.taskDuration = isText ? 780 : isCard ? 720 : 500;

      // Update Telemetry
      if (this.hudStatus) {
        const tag = target.tagName.toLowerCase();
        const snippet = target.textContent.trim().slice(0, 24);
        this.hudStatus.textContent = `${agent.blueprint.code} · Engineering <${tag}> ${snippet}…`;
      }

      // Position agent target coordinate
      agent.targetX = rect.left + Math.min(rect.width * 0.2, 42);
      agent.targetY = rect.top + Math.min(rect.height * 0.35, 26);
      agent.el.classList.add("is-working");

      // Register CAD Supporting Guide Lines on Canvas
      this.activeFrames.push({
        rect,
        color: agent.blueprint.color,
        code: agent.blueprint.code,
        startTime: performance.now(),
        duration: agent.taskDuration + 180
      });

      // Element enters building state
      target.style.setProperty("--build-color", agent.blueprint.color);
      target.classList.add("is-building");

      // Finish Task after duration
      window.setTimeout(() => {
        if (this.isSkipped) return;
        this.finishTask(agent, target);
      }, agent.taskDuration);
    }

    finishTask(agent, target) {
      target.classList.remove("is-building");
      target.classList.add("is-built");
      target.style.removeProperty("--build-color");
      target.style.removeProperty("--typing-clip");

      // Lock-in burst on canvas
      const r = target.getBoundingClientRect();
      this.bursts.push({
        rect: { left: r.left, top: r.top, width: r.width, height: r.height },
        color: agent.blueprint.color,
        startTime: performance.now(),
        duration: 440
      });

      // Emit 6 micro sparks around the element
      for (let i = 0; i < 6; i++) {
        const cornerX = Math.random() < 0.5 ? r.left : r.left + r.width;
        const cornerY = Math.random() < 0.5 ? r.top : r.top + r.height;
        this.sparks.push({
          x: cornerX,
          y: cornerY,
          vx: (Math.random() - 0.5) * 3.5,
          vy: (Math.random() - 0.5) * 3.5,
          color: agent.blueprint.color,
          alpha: 1.0,
          life: 28
        });
      }

      agent.el.classList.remove("is-working");
      agent.busy = false;
      agent.task = null;

      // Immediately grab next available target
      this.dispatchTasks();
    }

    dockAgents() {
      this.state = "docked";
      this.layer.classList.add("is-docked");

      if (this.hudStatus) {
        this.hudStatus.textContent = "SWARM // DOCKED · Standby in bottom-right orbit. Smooth scroll to deploy.";
      }

      this.agents.forEach((agent) => {
        agent.busy = false;
        agent.el.classList.add("is-docked");
        agent.scale = 0.52;
      });
    }

    skipBuild(immediate = false) {
      if (this.isSkipped) return;
      this.isSkipped = true;

      // Instantly mark all targets built
      this.allTargets.forEach((t) => {
        t.classList.remove("is-building");
        t.classList.add("is-built");
        t.style.removeProperty("--build-color");
        t.style.removeProperty("--typing-clip");
      });

      // Also reveal all data-reveal elements immediately
      document.querySelectorAll("[data-reveal]").forEach((el) => {
        el.classList.add("is-visible");
      });

      this.buildQueue = [];
      this.activeFrames = [];
      this.bursts = [];
      this.sparks = [];

      document.body.classList.remove("live-build-active");

      if (immediate) {
        this.layer.style.display = "none";
        return;
      }

      this.dockAgents();
    }

    resize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;

      this.guideCanvas.width = Math.floor(this.width * this.dpr);
      this.guideCanvas.height = Math.floor(this.height * this.dpr);
      this.guideCanvas.style.width = `${this.width}px`;
      this.guideCanvas.style.height = `${this.height}px`;

      this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    }

    bindEvents() {
      window.addEventListener("resize", () => this.resize(), { passive: true });

      // Re-trigger task dispatch on scroll to catch newly visible elements
      window.addEventListener("scroll", () => {
        if (this.state === "docked" && this.allTargets.some((t) => !t.classList.contains("is-built"))) {
          this.state = "building";
          this.layer.classList.remove("is-docked");
        }
        this.dispatchTasks();
      }, { passive: true });

      // Skip Button
      if (this.skipBtn) {
        this.skipBtn.addEventListener("click", () => this.skipBuild());
      }

      // Dock Click -> Replay rebuild with smooth scroll to top
      if (this.dockEl) {
        this.dockEl.addEventListener("click", () => {
          this.allTargets.forEach((t) => {
            t.classList.remove("is-built", "is-building");
          });
          this.layer.classList.remove("is-docked");
          smoothScroll.scrollTo(0);
          window.setTimeout(() => {
            this.initTargets();
            this.launchAgents();
          }, 450);
        });
      }

      // Reduced motion listener
      motionQuery.addEventListener("change", (e) => {
        if (e.matches) this.skipBuild(true);
      });
    }

    /**
     * Animation Loop: Updates agent flight physics, orbital rings, laser beams, and CAD calipers.
     */
    tick(now) {
      const timeSec = now * 0.001;
      const ctx = this.ctx;
      const w = this.width;
      const h = this.height;

      ctx.clearRect(0, 0, w, h);

      /* 1. Update Agent Target Coordinates Based on State */
      if (this.state === "buffering") {
        // Central Orbital Buffer: 5 cursors revolving in a calm, calibrated circle
        const centerX = w * 0.5;
        const centerY = h * 0.5;
        const orbitR = 54;
        const orbitSpeed = 1.55; // Tuned deliberate speed (was 2.6)

        this.agents.forEach((agent) => {
          const theta = timeSec * orbitSpeed + agent.orbitOffset;
          agent.targetX = centerX + Math.cos(theta) * orbitR - 10;
          agent.targetY = centerY + Math.sin(theta) * orbitR - 10;
          agent.targetAngle = (theta * 180) / Math.PI + 45;
          agent.scale = 1;
        });

        // Draw faint concentric radar scan rings on canvas
        ctx.save();
        ctx.strokeStyle = "rgba(56, 189, 248, 0.22)";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        ctx.beginPath();
        ctx.arc(centerX, centerY, orbitR, 0, Math.PI * 2);
        ctx.arc(centerX, centerY, orbitR + 26, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

      } else if (this.state === "docked") {
        // Minimized Bottom-Right Revolving Dock
        let dockX = w - (w < 768 ? 39 : 49);
        let dockY = h - (w < 768 ? 39 : 49);

        if (this.dockEl) {
          const dr = this.dockEl.getBoundingClientRect();
          if (dr.width > 0) {
            dockX = dr.left + dr.width * 0.5;
            dockY = dr.top + dr.height * 0.5;
          }
        }

        const miniOrbitR = w < 768 ? 16 : 20;
        const dockSpeed = 1.35; // Tuned calm standby speed

        this.agents.forEach((agent) => {
          const theta = timeSec * dockSpeed + agent.orbitOffset;
          agent.targetX = dockX + Math.cos(theta) * miniOrbitR - 6;
          agent.targetY = dockY + Math.sin(theta) * miniOrbitR - 6;
          agent.targetAngle = (theta * 180) / Math.PI + 45;
          agent.scale = 0.52;
        });
      } else {
        // In Building State: Update cursor positions for active tasks
        this.agents.forEach((agent) => {
          if (agent.busy && agent.task) {
            const r = agent.task.getBoundingClientRect();
            const elapsed = now - agent.taskStartTime;
            const progress = Math.min(1.0, elapsed / agent.taskDuration);

            if (agent.taskType === "text") {
              // Typing progression: cursor glides along the text width
              const typingClip = (1.0 - progress) * 100;
              agent.task.style.setProperty("--typing-clip", `${typingClip}%`);
              agent.targetX = r.left + progress * r.width;
              agent.targetY = r.top + r.height * 0.5;
            } else if (agent.taskType === "card") {
              // Card scan progression: cursor sweeps around perimeter
              agent.targetX = r.left + Math.sin(progress * Math.PI) * r.width;
              agent.targetY = r.top + progress * r.height;
            } else {
              agent.targetX = r.left + r.width * 0.5;
              agent.targetY = r.top + r.height * 0.5;
            }
          }
        });
      }

      /* 2. Physics Update for Each Agent (Tuned Spring Easing) */
      this.agents.forEach((agent) => {
        const dx = agent.targetX - agent.x;
        const dy = agent.targetY - agent.y;

        // Tuned fluid aerodynamic spring ease: smooth deceleration, no abrupt snapping
        agent.vx = (agent.vx + dx * 0.085) * 0.80;
        agent.vy = (agent.vy + dy * 0.085) * 0.80;

        agent.x += agent.vx;
        agent.y += agent.vy;

        // Bank rotation into velocity vector during flight
        const speed = Math.hypot(agent.vx, agent.vy);
        if (speed > 1.2 && this.state !== "buffering" && this.state !== "docked") {
          const flightAngle = (Math.atan2(agent.vy, agent.vx) * 180) / Math.PI + 35;
          agent.angle += (flightAngle - agent.angle) * 0.14;
        } else {
          agent.angle += (agent.targetAngle - agent.angle) * 0.14;
        }

        // Apply 3D GPU Transform
        agent.el.style.transform = `translate3d(${agent.x}px, ${agent.y}px, 0) rotate(${agent.angle}deg) scale(${agent.scale})`;

        // Emit particle wake trail when flying at speed
        if (speed > 2.8 && Math.random() < 0.55) {
          this.wakeParticles.push({
            x: agent.x + 8,
            y: agent.y + 8,
            vx: -agent.vx * 0.18 + (Math.random() - 0.5) * 1.2,
            vy: -agent.vy * 0.18 + (Math.random() - 0.5) * 1.2,
            color: agent.blueprint.color,
            alpha: 0.85,
            radius: 1.5 + Math.random() * 1.5
          });
        }
      });

      /* 3. Render Connecting Laser Beams & Active Construction on Canvas */
      if (this.state === "building") {
        this.agents.forEach((agent) => {
          if (!agent.busy || !agent.task) return;

          const r = agent.task.getBoundingClientRect();
          const elapsed = now - agent.taskStartTime;
          const progress = Math.min(1.0, elapsed / agent.taskDuration);

          ctx.save();

          // A. Laser Beam Connecting Cursor Pointer Tip to Element Construction Point
          const tipX = agent.x;
          const tipY = agent.y;
          let focalX = r.left + r.width * 0.5;
          let focalY = r.top + r.height * 0.5;

          if (agent.taskType === "text") {
            focalX = r.left + progress * r.width;
            focalY = r.top + r.height * 0.5;
          } else if (agent.taskType === "card") {
            focalX = r.left + r.width * 0.5;
            focalY = r.top + progress * r.height;
          }

          // Outer laser glow
          ctx.strokeStyle = agent.blueprint.color;
          ctx.lineWidth = 2.2;
          ctx.shadowColor = agent.blueprint.color;
          ctx.shadowBlur = 10;
          ctx.globalAlpha = 0.65;
          ctx.beginPath();
          ctx.moveTo(tipX, tipY);
          ctx.lineTo(focalX, focalY);
          ctx.stroke();

          // Inner white-hot laser core
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 0.8;
          ctx.shadowBlur = 0;
          ctx.globalAlpha = 0.9;
          ctx.beginPath();
          ctx.moveTo(tipX, tipY);
          ctx.lineTo(focalX, focalY);
          ctx.stroke();

          // Laser emitter flare at cursor tip
          ctx.beginPath();
          ctx.arc(tipX, tipY, 3, 0, Math.PI * 2);
          ctx.fillStyle = agent.blueprint.color;
          ctx.fill();

          // B. If Text: Render Glowing Vertical Laser Caret & Micro-Sparks
          if (agent.taskType === "text") {
            const caretX = r.left + progress * r.width;
            ctx.strokeStyle = agent.blueprint.color;
            ctx.lineWidth = 2.5;
            ctx.shadowColor = agent.blueprint.color;
            ctx.shadowBlur = 8;
            ctx.globalAlpha = 0.95;
            ctx.beginPath();
            ctx.moveTo(caretX, r.top - 2);
            ctx.lineTo(caretX, r.bottom + 2);
            ctx.stroke();

            // Emit occasional typing spark
            if (Math.random() < 0.35) {
              this.sparks.push({
                x: caretX,
                y: r.top + Math.random() * r.height,
                vx: (Math.random() - 0.5) * 2.8,
                vy: (Math.random() - 0.5) * 2.8,
                color: agent.blueprint.color,
                alpha: 1.0,
                life: 24
              });
            }
          }

          // C. If Card: Render Horizontal Laser Scanner Wipe
          if (agent.taskType === "card") {
            const scanY = r.top + progress * r.height;
            ctx.strokeStyle = agent.blueprint.color;
            ctx.lineWidth = 1.8;
            ctx.shadowColor = agent.blueprint.color;
            ctx.shadowBlur = 12;
            ctx.globalAlpha = 0.85;
            ctx.beginPath();
            ctx.moveTo(r.left, scanY);
            ctx.lineTo(r.right, scanY);
            ctx.stroke();
          }

          // D. Figma / CAD Full-Span Smart Alignment Hairlines
          ctx.setLineDash([3, 5]);
          ctx.lineWidth = 0.65;
          ctx.strokeStyle = agent.blueprint.color;
          ctx.globalAlpha = 0.22;
          ctx.shadowBlur = 0;

          // Horizontal alignment ray
          ctx.beginPath();
          ctx.moveTo(0, r.top);
          ctx.lineTo(w, r.top);
          ctx.stroke();

          // Vertical alignment ray
          ctx.beginPath();
          ctx.moveTo(r.left, 0);
          ctx.lineTo(r.left, h);
          ctx.stroke();

          ctx.restore();
        });
      }

      /* 4. Render CAD Precision Corner Calipers & Dimension Badges */
      for (let i = this.activeFrames.length - 1; i >= 0; i--) {
        const frame = this.activeFrames[i];
        const elapsed = now - frame.startTime;
        const progress = elapsed / frame.duration;

        if (progress >= 1.0) {
          this.activeFrames.splice(i, 1);
          continue;
        }

        const r = frame.rect;
        const alpha = Math.sin(Math.min(1.0, progress * 1.5) * Math.PI) * 0.88;
        const inset = 4;
        const x = r.left - inset;
        const y = r.top - inset;
        const rw = r.width + inset * 2;
        const rh = r.height + inset * 2;

        ctx.save();
        ctx.strokeStyle = frame.color;
        ctx.lineWidth = 1;
        ctx.globalAlpha = alpha;

        // A. Temporary Blueprint Frame Border
        ctx.setLineDash([6, 4]);
        ctx.strokeRect(x, y, rw, rh);
        ctx.setLineDash([]);

        // B. CAD Precision Corner Brackets (┌ ┐ └ ┘)
        const arm = Math.min(14, rw * 0.2, rh * 0.2);
        ctx.lineWidth = 2;

        // Top-Left
        ctx.beginPath();
        ctx.moveTo(x, y + arm);
        ctx.lineTo(x, y);
        ctx.lineTo(x + arm, y);
        ctx.stroke();

        // Top-Right
        ctx.beginPath();
        ctx.moveTo(x + rw - arm, y);
        ctx.lineTo(x + rw, y);
        ctx.lineTo(x + rw, y + arm);
        ctx.stroke();

        // Bottom-Right
        ctx.beginPath();
        ctx.moveTo(x + rw, y + rh - arm);
        ctx.lineTo(x + rw, y + rh);
        ctx.lineTo(x + rw - arm, y + rh);
        ctx.stroke();

        // Bottom-Left
        ctx.beginPath();
        ctx.moveTo(x + arm, y + rh);
        ctx.lineTo(x, y + rh);
        ctx.lineTo(x, y + rh - arm);
        ctx.stroke();

        // C. Vertex Precision Crosshairs (+)
        const cross = 3;
        ctx.lineWidth = 1;
        const corners = [
          [x, y],
          [x + rw, y],
          [x + rw, y + rh],
          [x, y + rh]
        ];
        corners.forEach(([cx, cy]) => {
          ctx.beginPath();
          ctx.moveTo(cx - cross, cy);
          ctx.lineTo(cx + cross, cy);
          ctx.moveTo(cx, cy - cross);
          ctx.lineTo(cx, cy + cross);
          ctx.stroke();
        });

        // D. Monospace Dimension Badge
        ctx.globalAlpha = alpha * 0.95;
        ctx.font = "bold 9px 'JetBrains Mono', monospace";
        const dimText = `[ ${frame.code} // ${Math.round(r.width)}×${Math.round(r.height)} ]`;
        const textMetrics = ctx.measureText(dimText);
        const badgeW = textMetrics.width + 10;
        const badgeH = 14;
        const badgeX = x + 4;
        const badgeY = Math.max(14, y - 8);

        // Badge pill background
        ctx.fillStyle = "rgba(9, 14, 20, 0.92)";
        ctx.fillRect(badgeX - 4, badgeY - 10, badgeW, badgeH);
        ctx.strokeRect(badgeX - 4, badgeY - 10, badgeW, badgeH);

        // Badge text
        ctx.fillStyle = frame.color;
        ctx.fillText(dimText, badgeX, badgeY);

        ctx.restore();
      }

      /* 5. Render Neon Lock-In Bursts on Element Completion */
      for (let i = this.bursts.length - 1; i >= 0; i--) {
        const b = this.bursts[i];
        const elapsed = now - b.startTime;
        const p = elapsed / b.duration;

        if (p >= 1.0) {
          this.bursts.splice(i, 1);
          continue;
        }

        const expand = p * 12;
        const alpha = (1.0 - p) * 0.8;
        const r = b.rect;

        ctx.save();
        ctx.strokeStyle = b.color;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = alpha;
        ctx.shadowColor = b.color;
        ctx.shadowBlur = 10;
        ctx.strokeRect(r.left - expand, r.top - expand, r.width + expand * 2, r.height + expand * 2);
        ctx.restore();
      }

      /* 6. Render Micro-Sparks */
      for (let i = this.sparks.length - 1; i >= 0; i--) {
        const s = this.sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 1;
        s.alpha = s.life / 28;

        if (s.life <= 0) {
          this.sparks.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.alpha;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      /* 7. Render Wake Particle Trails */
      for (let i = this.wakeParticles.length - 1; i >= 0; i--) {
        const p = this.wakeParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.022; // Slightly longer lingering wake trail

        if (p.alpha <= 0) {
          this.wakeParticles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1.0;
      }

      this.rafId = requestAnimationFrame((t) => this.tick(t));
    }
  }

  // Initialize Construction Swarm Engine
  const engine = new AutonomousConstructionEngine();

  /* ==========================================================================
     SCROLL REVEAL OBSERVER FOR DATA-REVEAL ELEMENTS
     ========================================================================== */
  const revealElements = document.querySelectorAll("[data-reveal]");
  if (motionQuery.matches) {
    revealElements.forEach((el) => el.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    revealElements.forEach((el) => revealObserver.observe(el));
  }

  /* ==========================================================================
     MOBILE NAVIGATION
     ========================================================================== */
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

  /* ==========================================================================
     CASE STUDY TABS
     ========================================================================== */
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
        if (engine && !targetCard.classList.contains("is-built")) {
          engine.buildQueue.push(targetCard);
          engine.dispatchTasks();
        }
      }
    });
  });

  /* ==========================================================================
     CINEMATIC SCROLL FOUNDATION & METER
     ========================================================================== */
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

  function updateScrollFoundation() {
    const scrollableHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const progress = Math.min(Math.max(window.scrollY / scrollableHeight, 0), 1);
    document.documentElement.style.setProperty("--page-progress", String(progress));
    document.documentElement.style.setProperty("--hero-drift", `${Math.min(window.scrollY * 0.12, 72)}px`);
    document.documentElement.style.setProperty("--hero-drift-reverse", `${Math.min(window.scrollY * -0.08, 48)}px`);
    if (scrollMeterFill) scrollMeterFill.setAttribute("aria-valuenow", String(Math.round(progress * 100)));
    updateScrollChapter();
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

  /* ==========================================================================
     ACTIVE NAV SCROLLSPY
     ========================================================================== */
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
