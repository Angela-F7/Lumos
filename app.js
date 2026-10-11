/* ==========================================================================
   LUMOS: WEB ACCESSIBILITY REMEDIATION STUDIO ENGINE
   ========================================================================== */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Accessibility Presets and Knowledge Base (No Em Dashes, Clean Copy)
  // --------------------------------------------------------------------------
  const ACCESSIBILITY_PRESETS = {
    checkout: {
      id: 'checkout',
      title: 'Checkout Form',
      scoreBefore: 42,
      scoreAfter: 98,
      subBefore: { perceivable: 35, operable: 40, understandable: 50, robust: 45 },
      subAfter: { perceivable: 96, operable: 100, understandable: 98, robust: 98 },
      inputCode: `<form class="checkout-box">
  <h2>Payment Details</h2>
  <!-- Missing alt attribute and low contrast -->
  <img src="/assets/card-logos.png" class="brand-img" />
  
  <!-- Missing associated label and aria attributes -->
  <input type="text" placeholder="Card Number" id="cc" />

  <!-- Non-semantic DIV button without keyboard focus -->
  <div class="btn-submit" onclick="submitPayment()">
    <span>Pay $49.99</span>
  </div>
</form>`,
      diffBefore: `<form class="checkout-box">
-  <img src="/assets/card-logos.png" class="brand-img" />
-  <input type="text" placeholder="Card Number" id="cc" />
-  <div class="btn-submit" onclick="submitPayment()">
-    <span>Pay $49.99</span>
-  </div>
</form>`,
      diffAfter: `<form class="checkout-box">
+  <img src="/assets/card-logos.png" alt="Visa, Mastercard, and American Express logos" class="brand-img" />
+  <label for="cc" class="sr-only">Credit Card Number</label>
+  <input type="text" id="cc" aria-required="true" aria-describedby="cc-hint" autocomplete="cc-number" />
+  <span id="cc-hint" class="sr-only">16 digits without spaces</span>
+  <button type="submit" role="button" aria-label="Pay $49.99 securely" class="btn-submit">
+    <span>Pay $49.99</span>
+  </button>
</form>`,
      transcript: 'Audio Transcript: Checkout payment section containing credit card input with accessible screen reader instructions, security validation, and semantic keyboard-navigable submit button.',
      violations: [
        {
          id: 'v1',
          wcag: '4.1.2',
          level: 'A',
          title: 'Name, Role, Value: Custom <div> Button',
          desc: 'Interactive element created using a <div> lacks ARIA role="button", tabindex="0", and keyboard event handlers.',
          fix: 'Replaced <div> with semantic <button type="submit"> and added aria-label="Pay $49.99 securely".'
        },
        {
          id: 'v2',
          wcag: '1.1.1',
          level: 'A',
          title: 'Non-Text Content: Card Logos Image',
          desc: 'Image element missing alt attribute, preventing screen readers from announcing image content.',
          fix: 'Added alt="Visa, Mastercard, and American Express logos".'
        },
        {
          id: 'v3',
          wcag: '1.3.1',
          level: 'A',
          title: 'Info and Relationships: Unlabelled Input',
          desc: 'Credit card input field lacks an associated <label> element or aria-label attribute.',
          fix: 'Injected <label for="cc"> and aria-describedby="cc-hint".'
        },
        {
          id: 'v4',
          wcag: '2.4.7',
          level: 'AA',
          title: 'Focus Visible: Missing Keyboard Focus Ring',
          desc: 'Interactive submit element lacks a visible focus indicator when navigating via Tab key.',
          fix: 'Applied CSS :focus-visible custom focus outline ring.'
        }
      ],
      owoIntro: 'Detected 4 WCAG accessibility barriers in this checkout form. Click "Run Auto-Fix" to apply refactoring.'
    },

    chart: {
      id: 'chart',
      title: 'Dynamic Revenue Sales Chart',
      scoreBefore: 38,
      scoreAfter: 96,
      subBefore: { perceivable: 25, operable: 35, understandable: 45, robust: 40 },
      subAfter: { perceivable: 98, operable: 95, understandable: 95, robust: 96 },
      inputCode: `<div class="chart-wrapper">
  <h3>Q4 Revenue Overview</h3>
  <!-- Unlabelled Canvas element -->
  <canvas id="salesChart" width="400" height="200"></canvas>
  <p style="color: #64748B;">Growth +32%</p>
</div>`,
      diffBefore: `<div class="chart-wrapper">
-  <canvas id="salesChart" width="400" height="200"></canvas>
-  <p style="color: #64748B;">Growth +32%</p>
</div>`,
      diffAfter: `<div class="chart-wrapper" role="region" aria-label="Q4 Sales Revenue Chart">
+  <canvas id="salesChart" width="400" height="200" role="img" aria-label="Bar chart showing Q1 $142K, Q2 $198K, Q3 $254K, Q4 $310K"></canvas>
+  <figcaption class="sr-only">Quarterly Revenue Data: Q1 $142,000, Q2 $198,000, Q3 $254,000, Q4 $310,000.</figcaption>
+  <button class="btn-toggle-table" aria-expanded="false" aria-controls="data-table">Toggle Accessible Data Table</button>
</div>`,
      transcript: 'Audio Transcript: Quarterly sales bar graph showing Q1 Revenue at $142,000, Q2 at $198,000, Q3 at $254,000, and Q4 peaking at $310,000 with a 32% year-over-year growth trajectory.',
      violations: [
        {
          id: 'v5',
          wcag: '1.1.1',
          level: 'A',
          title: 'Non-Text Content: Canvas Graphic Chart',
          desc: 'Canvas HTML element renders dynamic graphics without ARIA image role or text description.',
          fix: 'Added role="img" and descriptive aria-label summary plus audio speech transcript.'
        },
        {
          id: 'v6',
          wcag: '1.4.3',
          level: 'AA',
          title: 'Contrast (Minimum): Subtitle Text',
          desc: 'Text color #64748B has a contrast ratio of 3.1:1, falling below the required 4.5:1 ratio.',
          fix: 'Updated text color for verified contrast ratio exceeding 7:1 AAA standard.'
        }
      ],
      owoIntro: 'Canvas charts require alternative text descriptions for assistive technology users. An audio narration player has been prepared.'
    },

    modal: {
      id: 'modal',
      title: 'Modal Dialog and Form',
      scoreBefore: 48,
      scoreAfter: 100,
      subBefore: { perceivable: 40, operable: 45, understandable: 55, robust: 50 },
      subAfter: { perceivable: 100, operable: 100, understandable: 100, robust: 100 },
      inputCode: `<div class="modal-window">
  <div class="close-btn" onclick="closeModal()">X</div>
  <h2>Subscribe Newsletter</h2>
  <input type="email" placeholder="email..." />
  <button class="btn-sub">Submit</button>
</div>`,
      diffBefore: `<div class="modal-window">
-  <div class="close-btn" onclick="closeModal()">X</div>
-  <input type="email" placeholder="email..." />
</div>`,
      diffAfter: `<div class="modal-window" role="dialog" aria-modal="true" aria-labelledby="modal-head">
+  <button class="close-btn" aria-label="Close dialog window" onclick="closeModal()">
+    <span aria-hidden="true">&times;</span>
+  </button>
+  <h2 id="modal-head">Subscribe Newsletter</h2>
+  <label for="newsletter-email" class="sr-only">Email Address</label>
+  <input type="email" id="newsletter-email" placeholder="email@domain.com" aria-required="true" />
</div>`,
      transcript: 'Audio Transcript: Newsletter subscription modal dialog with trapped focus container, explicit close button, and aria-modal attributes.',
      violations: [
        {
          id: 'v7',
          wcag: '2.4.3',
          level: 'A',
          title: 'Focus Order and Trap: Modal Container',
          desc: 'Modal dialog does not trap keyboard focus inside its container or announce its dialog role to screen readers.',
          fix: 'Injected role="dialog" aria-modal="true" and focus trap script.'
        }
      ],
      owoIntro: 'Dialogs lacking role="dialog" leave screen reader users without modal boundary context.'
    },

    custom: {
      id: 'custom',
      title: 'Custom Sandbox Code',
      scoreBefore: 50,
      scoreAfter: 95,
      subBefore: { perceivable: 50, operable: 50, understandable: 50, robust: 50 },
      subAfter: { perceivable: 95, operable: 95, understandable: 95, robust: 95 },
      inputCode: `<!-- Enter your custom HTML or JSX component here -->\n<div class="custom-card">\n  <img src="avatar.jpg" />\n  <a href="#">Read More</a>\n</div>`,
      diffBefore: `<div class="custom-card">\n-  <img src="avatar.jpg" />\n</div>`,
      diffAfter: `<div class="custom-card">\n+  <img src="avatar.jpg" alt="Author profile picture" />\n+  <a href="#" aria-label="Read full article on accessibility remediation">Read More</a>\n</div>`,
      transcript: 'Audio Transcript: Custom element card verified for WCAG 2.2 accessibility standards.',
      violations: [
        {
          id: 'v8',
          wcag: '2.4.4',
          level: 'A',
          title: 'Link Purpose (In Context)',
          desc: 'Generic "Read More" text lacks context for screen reader rotor navigation.',
          fix: 'Added aria-label specifying exact article target context.'
        }
      ],
      owoIntro: 'Paste any HTML snippet into the editor to inspect for missing ARIA attributes and color contrast barriers.'
    }
  };

  // --------------------------------------------------------------------------
  // 2. Application State
  // --------------------------------------------------------------------------
  let currentState = {
    currentPresetKey: 'checkout',
    isRemediated: false,
    activeMode: 'playground',
    activeTab: 'code-editor',
    activeFilter: 'all',
    isPlayingAudio: false,
    theme: 'dark'
  };

  // Sound Effects Synthesis via Web Audio API (Clean, Non-Intrusive)
  function playSoundEffect(type) {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      if (type === 'spell') {
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.07);
          gain.gain.setValueAtTime(0.12, ctx.currentTime + idx * 0.07);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.07 + 0.35);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.07);
          osc.stop(ctx.currentTime + idx * 0.07 + 0.35);
        });
      } else if (type === 'hoot') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(420, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(310, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.2);
      } else if (type === 'click') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(750, ctx.currentTime);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.04);
      }
    } catch (e) {
      // Audio playback requires user interaction
    }
  }

  // --------------------------------------------------------------------------
  // 3. Light Mode and Dark Mode Theme Switching
  // --------------------------------------------------------------------------
  function initThemeSwitch() {
    const savedTheme = localStorage.getItem('lumos-theme');
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme ? savedTheme : (systemPrefersDark ? 'dark' : 'light');

    applyTheme(initialTheme);

    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'dark';
        const targetTheme = current === 'dark' ? 'light' : 'dark';
        applyTheme(targetTheme);
        localStorage.setItem('lumos-theme', targetTheme);
        playSoundEffect('click');
        showToast(`Switched to ${targetTheme === 'dark' ? 'Dark' : 'Light'} Mode`, 'info');
      });
    }

    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('lumos-theme')) {
          applyTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
  }

  function applyTheme(theme) {
    currentState.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);

    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
      themeToggleBtn.setAttribute('title', `Current: ${theme === 'dark' ? 'Dark' : 'Light'} Mode. Click to switch.`);
    }

    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#090D16' : '#FFFFFF');
    }
  }

  // --------------------------------------------------------------------------
  // 4. Ambient Dither Wave Engine (React Bits Pro: Flowing Retro Dither Waves)
  // --------------------------------------------------------------------------
  function initDitherWaveCanvas() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.warn('WebGL not available for Dither Wave canvas.');
      return;
    }

    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = (a_position + 1.0) * 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision highp float;
      varying vec2 v_uv;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_speed;
      uniform float u_frequency;
      uniform float u_amplitude;
      uniform float u_pixelSize;
      uniform float u_colorNum;
      uniform vec3 u_waveColor;
      uniform vec3 u_bgColor;

      // 4x4 Bayer Dithering Matrix
      float bayer4(vec2 p) {
        vec2 m = mod(floor(p), 4.0);
        int x = int(m.x);
        int y = int(m.y);
        if (y == 0) {
          if (x == 0) return 0.0 / 16.0;
          if (x == 1) return 8.0 / 16.0;
          if (x == 2) return 2.0 / 16.0;
          return 10.0 / 16.0;
        }
        if (y == 1) {
          if (x == 0) return 12.0 / 16.0;
          if (x == 1) return 4.0 / 16.0;
          if (x == 2) return 14.0 / 16.0;
          return 6.0 / 16.0;
        }
        if (y == 2) {
          if (x == 0) return 3.0 / 16.0;
          if (x == 1) return 11.0 / 16.0;
          if (x == 2) return 1.0 / 16.0;
          return 9.0 / 16.0;
        }
        if (x == 0) return 15.0 / 16.0;
        if (x == 1) return 7.0 / 16.0;
        if (x == 2) return 13.0 / 16.0;
        return 5.0 / 16.0;
      }

      void main() {
        vec2 coord = gl_FragCoord.xy;
        vec2 pixelCoord = floor(coord / max(1.0, u_pixelSize));
        vec2 uv = pixelCoord * u_pixelSize / u_resolution;

        // Flowing harmonic wave calculation
        float t = u_time * u_speed;
        float wave1 = sin(uv.x * u_frequency * 3.14159 + t) * u_amplitude;
        float wave2 = cos(uv.y * (u_frequency * 0.7) - t * 0.8) * (u_amplitude * 0.6);
        float wave3 = sin((uv.x + uv.y) * (u_frequency * 1.2) + t * 1.1) * (u_amplitude * 0.4);
        float height = (wave1 + wave2 + wave3 + 1.0) * 0.5;

        // Gentle perspective wave depth
        float val = clamp(height * 0.8 + (uv.y * 0.25), 0.0, 1.0);

        // Retro Dither thresholding
        float dither = bayer4(pixelCoord) - 0.5;
        float ditheredVal = clamp(val + (dither / max(2.0, u_colorNum)), 0.0, 1.0);
        float stepped = floor(ditheredVal * u_colorNum) / (u_colorNum - 1.0);

        vec3 col = mix(u_bgColor, u_waveColor, stepped * 0.45);
        gl_FragColor = vec4(col, 1.0);
      }
    `;

    function compile(type, src) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
    }

    const vs = compile(gl.VERTEX_SHADER, vsSource);
    const fs = compile(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;

    const quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const aPos = gl.getAttribLocation(prog, 'a_position');
    const uRes = gl.getUniformLocation(prog, 'u_resolution');
    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uSpeed = gl.getUniformLocation(prog, 'u_speed');
    const uFreq = gl.getUniformLocation(prog, 'u_frequency');
    const uAmp = gl.getUniformLocation(prog, 'u_amplitude');
    const uPixel = gl.getUniformLocation(prog, 'u_pixelSize');
    const uColors = gl.getUniformLocation(prog, 'u_colorNum');
    const uWaveColor = gl.getUniformLocation(prog, 'u_waveColor');
    const uBgColor = gl.getUniformLocation(prog, 'u_bgColor');

    let startTime = performance.now();

    function resize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    }

    window.addEventListener('resize', resize);
    resize();

    function frame() {
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      // Theme colors adhering to project design tokens (No purple to blue gradient)
      const bgColor = isDark ? [0.027, 0.039, 0.063] : [0.945, 0.961, 0.976];
      const waveColor = isDark ? [0.145, 0.388, 0.922] : [0.114, 0.306, 0.847];

      gl.useProgram(prog);
      gl.enableVertexAttribArray(aPos);
      gl.bindBuffer(gl.ARRAY_BUFFER, quad);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

      const elapsed = (performance.now() - startTime) * 0.001;

      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, elapsed);
      gl.uniform1f(uSpeed, 0.06);
      gl.uniform1f(uFreq, 3.2);
      gl.uniform1f(uAmp, 0.32);
      gl.uniform1f(uPixel, 3.0); // Retro dither grid size
      gl.uniform1f(uColors, 4.0); // 4-step dither palette
      gl.uniform3f(uWaveColor, waveColor[0], waveColor[1], waveColor[2]);
      gl.uniform3f(uBgColor, bgColor[0], bgColor[1], bgColor[2]);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      requestAnimationFrame(frame);
    }

    frame();
  }

  // --------------------------------------------------------------------------
  // 5. Preset Loading and UI Rendering
  // --------------------------------------------------------------------------
  function loadPreset(presetKey) {
    const data = ACCESSIBILITY_PRESETS[presetKey] || ACCESSIBILITY_PRESETS.checkout;
    currentState.currentPresetKey = presetKey;
    currentState.isRemediated = false;

    // Load raw code into input editor
    const textarea = document.getElementById('raw-code-input');
    if (textarea) textarea.value = data.inputCode;
    updateLineNumbers(data.inputCode);

    // Update diff panes
    const diffBeforeView = document.getElementById('diff-before-view');
    const diffAfterView = document.getElementById('diff-after-view');
    if (diffBeforeView) diffBeforeView.innerHTML = highlightDiff(data.diffBefore, 'del');
    if (diffAfterView) diffAfterView.innerHTML = highlightDiff(data.diffAfter, 'add');

    // Update Transcript
    const transcriptEl = document.getElementById('audio-transcript-text');
    if (transcriptEl) transcriptEl.innerHTML = `<i class="fa-solid fa-quote-left text-muted"></i> ${data.transcript}`;

    // Update Scores
    updateScores(data.scoreBefore, data.subBefore, 'Inaccessible', 'status-poor');

    // Update Owo Speech
    setOwoSpeech(data.owoIntro);

    // Update Audit Cards
    renderAuditLogCards(data.violations, false);

    // Update Stats Summary
    const statViolations = document.getElementById('stat-violations-count');
    const statFixed = document.getElementById('stat-fixed-count');
    if (statViolations) statViolations.textContent = `${data.violations.length} WCAG Barriers`;
    if (statFixed) statFixed.textContent = '0 Fixed';
  }

  function updateLineNumbers(codeText) {
    const lineNumbersEl = document.getElementById('input-line-numbers');
    const linesBadge = document.getElementById('editor-lines-badge');
    if (!lineNumbersEl) return;

    const lineCount = codeText.split('\n').length;
    let numHtml = '';
    for (let i = 1; i <= lineCount; i++) {
      numHtml += `<div>${i}</div>`;
    }
    lineNumbersEl.innerHTML = numHtml;
    if (linesBadge) linesBadge.textContent = `${lineCount} Lines`;
  }

  function highlightDiff(diffText, type) {
    const lines = diffText.split('\n');
    return lines
      .map((line) => {
        if (line.startsWith('-')) {
          return `<span class="diff-line-del">${escapeHtml(line)}</span>`;
        } else if (line.startsWith('+')) {
          return `<span class="diff-line-add">${escapeHtml(line)}</span>`;
        }
        return escapeHtml(line);
      })
      .join('\n');
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function updateScores(totalScore, subMetrics, labelText, labelClass) {
    const scoreValEl = document.getElementById('score-val');
    const scoreLabelEl = document.getElementById('score-label');
    const progressCircle = document.getElementById('radial-progress');

    if (scoreValEl) scoreValEl.textContent = `${totalScore}%`;
    if (scoreLabelEl) {
      scoreLabelEl.textContent = labelText;
      scoreLabelEl.className = `score-status ${labelClass}`;
    }

    if (progressCircle) {
      const offset = 264 - (264 * totalScore) / 100;
      progressCircle.style.strokeDashoffset = offset;
      progressCircle.style.stroke = totalScore > 80 ? '#10B981' : totalScore > 60 ? '#F59E0B' : '#EF4444';
    }

    if (subMetrics) {
      const elPer = document.getElementById('val-perceivable');
      const barPer = document.getElementById('bar-perceivable');
      if (elPer) elPer.textContent = `${subMetrics.perceivable} / 100`;
      if (barPer) barPer.style.width = `${subMetrics.perceivable}%`;

      const elOp = document.getElementById('val-operable');
      const barOp = document.getElementById('bar-operable');
      if (elOp) elOp.textContent = `${subMetrics.operable} / 100`;
      if (barOp) barOp.style.width = `${subMetrics.operable}%`;

      const elUnd = document.getElementById('val-understandable');
      const barUnd = document.getElementById('bar-understandable');
      if (elUnd) elUnd.textContent = `${subMetrics.understandable} / 100`;
      if (barUnd) barUnd.style.width = `${subMetrics.understandable}%`;

      const elRob = document.getElementById('val-robust');
      const barRob = document.getElementById('bar-robust');
      if (elRob) elRob.textContent = `${subMetrics.robust} / 100`;
      if (barRob) barRob.style.width = `${subMetrics.robust}%`;
    }
  }

  // Render Audit Log Cards (No Colored Left-Border Cards)
  function renderAuditLogCards(violations, isRemediated) {
    const container = document.getElementById('audit-cards-list');
    if (!container) return;

    const countBadge = document.getElementById('violation-count-badge');
    if (countBadge) countBadge.textContent = `${violations.length} Barriers`;

    const filtered = violations.filter((v) => {
      if (currentState.activeFilter === 'all') return true;
      return v.level === currentState.activeFilter;
    });

    if (filtered.length === 0) {
      container.innerHTML = `<p class="text-muted" style="font-size:0.8rem; padding:1rem;">No violations match filter "${currentState.activeFilter}".</p>`;
      return;
    }

    container.innerHTML = filtered
      .map((v) => {
        const statusClass = isRemediated ? 'remediated' : '';
        const levelBadgeClass = `wcag-${v.level.toLowerCase()}`;
        return `
        <div class="violation-card ${statusClass}">
          <div class="v-card-header" onclick="this.nextElementSibling.classList.toggle('hidden')">
            <div class="v-header-left">
              <span class="v-wcag-tag ${levelBadgeClass}">WCAG ${v.wcag} (${v.level})</span>
              <span class="v-title">${v.title}</span>
            </div>
            <div class="v-header-right">
              <span class="v-status-badge ${isRemediated ? 'status-pass' : 'status-fail'}">
                <i class="fa-solid ${isRemediated ? 'fa-check' : 'fa-triangle-exclamation'}"></i>
                ${isRemediated ? 'Fixed' : 'Barrier'}
              </span>
              <i class="fa-solid fa-chevron-down v-toggle-icon"></i>
            </div>
          </div>
          <div class="v-card-body">
            <p class="v-description">${v.desc}</p>
            <div class="v-fix-code">
              <strong>Remediation:</strong> ${v.fix}
            </div>
          </div>
        </div>`;
      })
      .join('');
  }

  function setOwoSpeech(text) {
    const bubbleText = document.getElementById('owo-speech-text');
    if (bubbleText) {
      bubbleText.innerHTML = text;
    }
  }

  // --------------------------------------------------------------------------
  // 6. Automated Remediation Handler
  // --------------------------------------------------------------------------
  function castAutoFixSpell() {
    const presetData = ACCESSIBILITY_PRESETS[currentState.currentPresetKey];
    if (!presetData) return;

    playSoundEffect('spell');

    const diffContainer = document.getElementById('diff-container');
    const owoAvatar = document.getElementById('owo-avatar-interactive');
    
    if (diffContainer) diffContainer.classList.add('spell-casting-active');
    if (owoAvatar) owoAvatar.classList.add('casting');

    setOwoSpeech('Analyzing DOM tree: Injecting ARIA roles, labels, and keyboard focus listeners across barrier elements.');

    setTimeout(() => {
      if (diffContainer) diffContainer.classList.remove('spell-casting-active');
      if (owoAvatar) owoAvatar.classList.remove('casting');

      currentState.isRemediated = true;

      // Update Scores to Remediated
      updateScores(presetData.scoreAfter, presetData.subAfter, 'WCAG 2.2 Compliant', 'status-good');

      // Update Audit Cards
      renderAuditLogCards(presetData.violations, true);

      // Update Quick Stats
      const statFixed = document.getElementById('stat-fixed-count');
      if (statFixed) statFixed.textContent = `${presetData.violations.length} Fixed`;

      // Toast feedback
      showToast(`Remediation applied. Accessibility score reached ${presetData.scoreAfter}%.`, 'success');

      setOwoSpeech(`Automated remediation complete. Accessibility score improved from <strong>${presetData.scoreBefore}% to ${presetData.scoreAfter}%</strong>. All detected barriers have been resolved.`);
    }, 900);
  }

  // --------------------------------------------------------------------------
  // 7. Audio Waveform Visualizer & Speech Synthesizer
  // --------------------------------------------------------------------------
  function initAudioSynthesizer() {
    const canvas = document.getElementById('waveform-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function drawWaveform() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const bars = 40;
      const barWidth = canvas.width / bars;
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';

      for (let i = 0; i < bars; i++) {
        let height = 4;
        if (currentState.isPlayingAudio) {
          height = Math.sin(Date.now() * 0.01 + i) * 14 + 18;
        }
        ctx.fillStyle = currentState.isPlayingAudio
          ? '#F59E0B'
          : (isDark ? '#334155' : '#CBD5E1');
        ctx.fillRect(i * barWidth, (canvas.height - height) / 2, barWidth - 3, height);
      }

      requestAnimationFrame(drawWaveform);
    }

    drawWaveform();

    // Play/Pause Speech Audio Synthesizer
    const btnPlay = document.getElementById('btn-play-audio-synth');
    const playIcon = document.getElementById('synth-play-icon');
    const playText = document.getElementById('synth-play-text');

    if (btnPlay) {
      btnPlay.addEventListener('click', () => {
        if (!('speechSynthesis' in window)) {
          showToast('Speech synthesis is not supported in this browser.', 'error');
          return;
        }

        if (currentState.isPlayingAudio) {
          window.speechSynthesis.cancel();
          currentState.isPlayingAudio = false;
          if (playIcon) playIcon.className = 'fa-solid fa-play';
          if (playText) playText.textContent = 'Play Audio';
        } else {
          const presetData = ACCESSIBILITY_PRESETS[currentState.currentPresetKey];
          const textToSpeak = presetData ? presetData.transcript : 'Synthesizing voice description...';

          const utterance = new SpeechSynthesisUtterance(textToSpeak);
          utterance.rate = 1.0;
          utterance.pitch = 1.0;

          utterance.onend = () => {
            currentState.isPlayingAudio = false;
            if (playIcon) playIcon.className = 'fa-solid fa-play';
            if (playText) playText.textContent = 'Play Audio';
          };

          window.speechSynthesis.speak(utterance);
          currentState.isPlayingAudio = true;
          if (playIcon) playIcon.className = 'fa-solid fa-pause';
          if (playText) playText.textContent = 'Pause Narration';

          playSoundEffect('click');
          showToast('Audio narration active', 'info');
        }
      });
    }
  }

  // --------------------------------------------------------------------------
  // 8. Toast Notifications Utility
  // --------------------------------------------------------------------------
  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const icon = type === 'success' ? 'fa-circle-check text-success' : 'fa-circle-info text-accent';
    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px)';
      setTimeout(() => toast.remove(), 250);
    }, 2800);
  }

  // --------------------------------------------------------------------------
  // 9. Event Listeners Initialization
  // --------------------------------------------------------------------------
  function initEventListeners() {
    // Mode Switcher (Dev Playground vs Extension Overlay)
    const btnPlayground = document.getElementById('mode-playground');
    const btnOverlay = document.getElementById('mode-overlay');
    const viewPlayground = document.getElementById('view-playground');
    const viewOverlay = document.getElementById('view-overlay');

    if (btnPlayground && btnOverlay && viewPlayground && viewOverlay) {
      btnPlayground.addEventListener('click', () => {
        btnPlayground.classList.add('active');
        btnOverlay.classList.remove('active');
        btnPlayground.setAttribute('aria-selected', 'true');
        btnOverlay.setAttribute('aria-selected', 'false');
        viewPlayground.classList.add('active');
        viewOverlay.classList.add('hidden');
        viewOverlay.classList.remove('active');
        playSoundEffect('click');
      });

      btnOverlay.addEventListener('click', () => {
        btnOverlay.classList.add('active');
        btnPlayground.classList.remove('active');
        btnOverlay.setAttribute('aria-selected', 'true');
        btnPlayground.setAttribute('aria-selected', 'false');
        viewOverlay.classList.remove('hidden');
        viewOverlay.classList.add('active');
        viewPlayground.classList.remove('active');
        playSoundEffect('click');
      });
    }

    // Preset Select Dropdown
    const selectPreset = document.getElementById('preset-select');
    if (selectPreset) {
      selectPreset.addEventListener('change', (e) => {
        loadPreset(e.target.value);
        playSoundEffect('click');
      });
    }

    // Master Cast Auto-Fix Button
    const btnCast = document.getElementById('btn-cast-spell');
    if (btnCast) {
      btnCast.addEventListener('click', castAutoFixSpell);
    }

    // Hotkey Ctrl+Shift+L to run auto-fix
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        castAutoFixSpell();
      }
    });

    // Tab Toggle: Code Editor vs URL Scanner
    const tabCode = document.getElementById('tab-code-editor');
    const tabUrl = document.getElementById('tab-url-scanner');
    const contentCode = document.getElementById('content-code-editor');
    const contentUrl = document.getElementById('content-url-scanner');

    if (tabCode && tabUrl && contentCode && contentUrl) {
      tabCode.addEventListener('click', () => {
        tabCode.classList.add('active');
        tabUrl.classList.remove('active');
        tabCode.setAttribute('aria-selected', 'true');
        tabUrl.setAttribute('aria-selected', 'false');
        contentCode.classList.remove('hidden');
        contentUrl.classList.add('hidden');
        playSoundEffect('click');
      });

      tabUrl.addEventListener('click', () => {
        tabUrl.classList.add('active');
        tabCode.classList.remove('active');
        tabUrl.setAttribute('aria-selected', 'true');
        tabCode.setAttribute('aria-selected', 'false');
        contentUrl.classList.remove('hidden');
        contentCode.classList.add('hidden');
        playSoundEffect('click');
      });
    }

    // Raw Code Textarea Input Event
    const textarea = document.getElementById('raw-code-input');
    if (textarea) {
      textarea.addEventListener('input', (e) => {
        updateLineNumbers(e.target.value);
      });
    }

    // Copy Fixed Code Button
    const btnCopyFixed = document.getElementById('btn-copy-fixed-code');
    if (btnCopyFixed) {
      btnCopyFixed.addEventListener('click', () => {
        const presetData = ACCESSIBILITY_PRESETS[currentState.currentPresetKey];
        if (presetData) {
          navigator.clipboard.writeText(presetData.diffAfter);
          showToast('Remediated code copied to clipboard', 'success');
          playSoundEffect('click');
        }
      });
    }

    // Copy Raw Input Code Button
    const btnCopyInput = document.getElementById('btn-copy-input-code');
    if (btnCopyInput) {
      btnCopyInput.addEventListener('click', () => {
        const inputVal = textarea ? textarea.value : '';
        navigator.clipboard.writeText(inputVal);
        showToast('Source code copied to clipboard', 'info');
        playSoundEffect('click');
      });
    }

    // Reset Code Button
    const btnReset = document.getElementById('btn-reset-code');
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        loadPreset(currentState.currentPresetKey);
        showToast('Source code reset to preset defaults', 'info');
        playSoundEffect('click');
      });
    }

    // URL Scanner Action Button
    const btnRunUrlScan = document.getElementById('btn-run-url-scan');
    const simulatedFrame = document.getElementById('simulated-dom-frame');
    if (btnRunUrlScan && simulatedFrame) {
      btnRunUrlScan.addEventListener('click', () => {
        simulatedFrame.innerHTML = `
          <div style="font-family: var(--font-mono-code); font-size: 0.8rem; line-height: 1.6;">
            <p style="color: var(--color-error);"><i class="fa-solid fa-triangle-exclamation"></i> [Barrier] &lt;form class="checkout-box"&gt;: missing aria-labelledby</p>
            <p style="color: var(--color-error);"><i class="fa-solid fa-triangle-exclamation"></i> [Barrier] &lt;div class="btn-submit"&gt;: missing role="button", tabindex="0"</p>
            <p style="color: var(--color-warning);"><i class="fa-solid fa-circle-exclamation"></i> [Barrier] Contrast ratio 2.1:1 below threshold 4.5:1</p>
            <p style="color: var(--color-success); margin-top: 0.5rem;"><i class="fa-solid fa-check"></i> DOM tree parsed: 3 remediation actions queued.</p>
          </div>
        `;
        showToast('Live DOM scan complete: 3 barriers found', 'info');
        playSoundEffect('click');
      });
    }

    // Owl Mascot Avatar Click Event
    const owoAvatar = document.getElementById('owo-avatar-interactive');
    if (owoAvatar) {
      owoAvatar.addEventListener('click', () => {
        playSoundEffect('hoot');

        const leftEyelid = document.querySelector('.eyelid-left');
        if (leftEyelid) {
          leftEyelid.setAttribute('opacity', '1');
          setTimeout(() => leftEyelid.setAttribute('opacity', '0'), 300);
        }

        const tips = [
          'Maintain accessible name-role-value mappings for all custom widgets.',
          'Color contrast ratio must meet 4.5:1 for standard body text under WCAG AA.',
          'Ensure the Tab key navigates every interactive button and field in logical order.',
          'Data charts require descriptive labels or supplementary audio transcripts.'
        ];
        const randomTip = tips[Math.floor(Math.random() * tips.length)];
        setOwoSpeech(randomTip);
      });
    }

    // Audit Log Filter Pills
    const filterPills = document.querySelectorAll('.filter-pill');
    filterPills.forEach((pill) => {
      pill.addEventListener('click', (e) => {
        filterPills.forEach((p) => p.classList.remove('active'));
        e.target.classList.add('active');
        currentState.activeFilter = e.target.getAttribute('data-filter');
        const presetData = ACCESSIBILITY_PRESETS[currentState.currentPresetKey];
        renderAuditLogCards(presetData.violations, currentState.isRemediated);
        playSoundEffect('click');
      });
    });

    // Modal Export Report Controls
    const btnExportReport = document.getElementById('btn-export-report');
    const modalReport = document.getElementById('modal-report');
    const btnCloseModal = document.getElementById('btn-close-modal');

    if (btnExportReport && modalReport) {
      btnExportReport.addEventListener('click', () => {
        modalReport.classList.remove('hidden');
        playSoundEffect('click');
      });
    }

    if (btnCloseModal && modalReport) {
      btnCloseModal.addEventListener('click', () => {
        modalReport.classList.add('hidden');
      });
    }

    // Download JSON Report
    const btnDownloadJson = document.getElementById('btn-download-json');
    if (btnDownloadJson) {
      btnDownloadJson.addEventListener('click', () => {
        const preset = ACCESSIBILITY_PRESETS[currentState.currentPresetKey];
        const report = {
          auditDate: new Date().toISOString(),
          standard: 'WCAG 2.2 AA/AAA',
          scenario: preset.title,
          scoreBefore: preset.scoreBefore,
          scoreAfter: currentState.isRemediated ? preset.scoreAfter : preset.scoreBefore,
          remediated: currentState.isRemediated,
          violations: preset.violations
        };
        const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `lumos-wcag-audit-${currentState.currentPresetKey}.json`;
        a.click();
        URL.revokeObjectURL(url);
        showToast('Audit JSON report downloaded', 'success');
      });
    }

    // Copy Markdown Report
    const btnCopyMarkdown = document.getElementById('btn-copy-markdown-report');
    if (btnCopyMarkdown) {
      btnCopyMarkdown.addEventListener('click', () => {
        const preset = ACCESSIBILITY_PRESETS[currentState.currentPresetKey];
        const md = `# Lumos WCAG 2.2 Compliance Report\n\n**Date:** ${new Date().toLocaleDateString()}\n**Standard:** WCAG 2.2\n**Scenario:** ${preset.title}\n**Status:** ${currentState.isRemediated ? 'Remediated (' + preset.scoreAfter + '%)' : 'Identified Barriers (' + preset.scoreBefore + '%)'}\n\n## Barriers:\n` +
          preset.violations.map(v => `- **WCAG ${v.wcag} (${v.level}):** ${v.title}\n  - Issue: ${v.desc}\n  - Fix: ${v.fix}`).join('\n');
        navigator.clipboard.writeText(md);
        showToast('Markdown compliance report copied', 'success');
      });
    }

    // Quick Fix Buttons in Simulated Extension View Mode
    const quickFixBtns = document.querySelectorAll('.btn-quick-fix-node');
    quickFixBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const targetId = e.target.getAttribute('data-target');
        const nodeElem = document.getElementById(`demo-target-${targetId}`);
        if (nodeElem) {
          nodeElem.classList.remove('barrier-target');
          nodeElem.classList.add('fixed');
          const badge = nodeElem.querySelector('.ext-node-badge');
          if (badge) {
            badge.className = 'ext-node-badge badge-success';
            badge.textContent = 'Fixed and Verified';
          }
          showToast(`DOM Node #${targetId} Remediated`, 'success');
          playSoundEffect('spell');
        }
      });
    });

    const btnExtRemediatePage = document.getElementById('btn-ext-remediate-page');
    if (btnExtRemediatePage) {
      btnExtRemediatePage.addEventListener('click', () => {
        quickFixBtns.forEach((btn) => btn.click());
      });
    }

    // Analytics Page Timeframe Toggle
    const timeframeBtns = document.querySelectorAll('.tf-btn');
    timeframeBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        timeframeBtns.forEach((b) => b.classList.remove('active'));
        e.target.classList.add('active');
        const range = e.target.getAttribute('data-range');
        playSoundEffect('click');
        showToast(`Analytics timeframe switched to ${range.toUpperCase()}`, 'info');
      });
    });

    // Analytics CSV Export
    const btnExportCsv = document.getElementById('btn-export-csv');
    if (btnExportCsv) {
      btnExportCsv.addEventListener('click', () => {
        const csvContent = 'Target Component,WCAG Criteria,Identified Barriers,Initial Score,Remediated Score,Status\n' +
          '"Checkout Form (checkout.jsx)","4.1.2, 1.1.1, 1.3.1, 2.4.7","4 Violations","42%","98%","Certified AAA"\n' +
          '"Dynamic Sales Chart (sales-canvas.jsx)","1.1.1, 1.4.3","2 Violations","38%","96%","Synthesized"\n' +
          '"Modal Dialog Window (newsletter.html)","2.4.3, 4.1.2","2 Violations","48%","100%","Trapped"\n' +
          '"Marketing Hero Navigation (header.jsx)","2.1.1, 1.4.3","3 Violations","56%","97%","Certified AA"\n' +
          '"Customer Support Table (orders-grid.html)","1.3.1, 4.1.2","2 Violations","45%","95%","Remediated"\n';
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'lumos-accessibility-analytics.csv';
        link.click();
        URL.revokeObjectURL(url);
        playSoundEffect('click');
        showToast('Analytics CSV report downloaded successfully', 'success');
      });
    }

    // Docs Sidebar Active State Tracker
    const docsSidebarLinks = document.querySelectorAll('.sidebar-link');
    if (docsSidebarLinks.length > 0) {
      window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('.doc-section');
        let currentId = '';
        sections.forEach((sec) => {
          const top = sec.offsetTop - 120;
          if (window.scrollY >= top) {
            currentId = sec.getAttribute('id');
          }
        });
        if (currentId) {
          docsSidebarLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
          });
        }
      });
    }
  }

  // --------------------------------------------------------------------------
  // 10. Application Entrypoint
  // --------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    initThemeSwitch();
    initDitherWaveCanvas();
    loadPreset('checkout');
    initAudioSynthesizer();
    initEventListeners();
    console.log('Lumos Accessibility Remediation Studio initialized with Dither Wave');
  });
})();
