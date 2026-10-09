/* ==========================================================================
   LUMOS AI — MAGICAL WEB ACCESSIBILITY REMEDIATION ENGINE
   ========================================================================== */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Accessibility Presets & Knowledge Base
  // --------------------------------------------------------------------------
  const ACCESSIBILITY_PRESETS = {
    checkout: {
      id: 'checkout',
      title: 'E-Commerce Checkout Form',
      scoreBefore: 42,
      scoreAfter: 98,
      subBefore: { perceivable: 35, operable: 40, understandable: 50, robust: 45 },
      subAfter: { perceivable: 96, operable: 100, understandable: 98, robust: 98 },
      inputCode: `<form class="checkout-box">
  <h2>Payment Details</h2>
  <!-- Missing alt attribute & low contrast -->
  <img src="/assets/card-logos.png" class="brand-img" />
  
  <!-- Missing associated label & aria attributes -->
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
      transcript: 'Audio Transcript: E-Commerce checkout payment section containing credit card number input with screen reader instructions, security guarantee badge, and a fully accessible submit payment button with keyboard focus indicator.',
      violations: [
        {
          id: 'v1',
          wcag: '4.1.2',
          level: 'A',
          title: 'Name, Role, Value — Custom <div> Button',
          desc: 'Interactive element created using a <div> lacks ARIA role="button", tabindex="0", and keyboard event handlers.',
          fix: 'Replaced <div> with semantic <button type="submit"> and added aria-label="Pay $49.99 securely".'
        },
        {
          id: 'v2',
          wcag: '1.1.1',
          level: 'A',
          title: 'Non-Text Content — Card Logos Image',
          desc: 'Image element missing alt attribute, preventing screen readers from declaring image context.',
          fix: 'Added alt="Visa, Mastercard, and American Express logos".'
        },
        {
          id: 'v3',
          wcag: '1.3.1',
          level: 'A',
          title: 'Info and Relationships — Unlabelled Input',
          desc: 'Credit card input field lacks associated <label> element or aria-label attribute.',
          fix: 'Injected <label for="cc"> and aria-describedby="cc-hint".'
        },
        {
          id: 'v4',
          wcag: '2.4.7',
          level: 'AA',
          title: 'Focus Visible — Missing Keyboard Focus Ring',
          desc: 'Interactive submit element lacks glowing keyboard focus indicator when navigating via Tab key.',
          fix: 'Applied CSS :focus-visible custom cyan outline ring.'
        }
      ],
      owoIntro: 'Hoot! I spotted 4 hidden ARIA barriers in this checkout form! Click "Cast Auto-Fix" to refactor!'
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
  <!-- Unlabelled Canvas canvas element -->
  <canvas id="salesChart" width="400" height="200"></canvas>
  <p style="color: #64748B;">Growth +32%</p>
</div>`,
      diffBefore: `<div class="chart-wrapper">
-  <canvas id="salesChart" width="400" height="200"></canvas>
-  <p style="color: #64748B;">Growth +32%</p>
</div>`,
      diffAfter: `<div class="chart-wrapper" role="region" aria-label="Q4 Sales Revenue Chart">
+  <canvas id="salesChart" width="400" height="200" role="img" aria-label="Bar chart showing Q1 $142K, Q2 $198K, Q3 $254K, Q4 $310K"></canvas>
+  <figcaption class="sr-only">Quarterly Revenue Table Data: Q1 $142,000, Q2 $198,000, Q3 $254,000, Q4 $310,000.</figcaption>
+  <button class="btn-toggle-table" aria-expanded="false" aria-controls="data-table">Toggle Accessible Data Table</button>
</div>`,
      transcript: 'Audio Transcript: Quarterly sales bar graph showing Q1 Revenue at \$142,000, Q2 at \$198,000, Q3 at \$254,000, and Q4 peaking at \$310,000 with a 32% year-over-year growth trajectory.',
      violations: [
        {
          id: 'v5',
          wcag: '1.1.1',
          level: 'A',
          title: 'Non-Text Content — Canvas Graphic Chart',
          desc: 'Canvas HTML element renders dynamic graphics without ARIA image role or alt text description.',
          fix: 'Added role="img" and detailed aria-label summary + Voice TTS narration player.'
        },
        {
          id: 'v6',
          wcag: '1.4.3',
          level: 'AA',
          title: 'Contrast (Minimum) — Subtitle Text',
          desc: 'Text color #64748B on dark background has a contrast ratio of 3.1:1 (below required 4.5:1).',
          fix: 'Updated text color to #F59E0B (contrast ratio 7.8:1 AAA).'
        }
      ],
      owoIntro: 'Hoot! Canvas charts are invisible to screen readers without audio descriptions! Let me synthesize a voice transcript!'
    },

    modal: {
      id: 'modal',
      title: 'Modal Dialog & Form',
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
      transcript: 'Audio Transcript: Newsletter subscription modal dialog with trapped focus container, clear close button, and aria-modal attributes.',
      violations: [
        {
          id: 'v7',
          wcag: '2.4.3',
          level: 'A',
          title: 'Focus Order & Trap — Modal Container',
          desc: 'Modal dialog does not trap focus inside window or announce dialog role to screen reader.',
          fix: 'Injected role="dialog" aria-modal="true" and focus trap script.'
        }
      ],
      owoIntro: 'Hoot! Dialogs without role="dialog" leave screen reader users lost in the background DOM!'
    },

    custom: {
      id: 'custom',
      title: 'Custom Sandbox Code',
      scoreBefore: 50,
      scoreAfter: 95,
      subBefore: { perceivable: 50, operable: 50, understandable: 50, robust: 50 },
      subAfter: { perceivable: 95, operable: 95, understandable: 95, robust: 95 },
      inputCode: `<!-- Enter your own custom HTML / JSX component here -->\n<div class="custom-card">\n  <img src="avatar.jpg" />\n  <a href="#">Read More</a>\n</div>`,
      diffBefore: `<div class="custom-card">\n-  <img src="avatar.jpg" />\n</div>`,
      diffAfter: `<div class="custom-card">\n+  <img src="avatar.jpg" alt="Author profile picture" />\n+  <a href="#" aria-label="Read full article about Lumos AI">Read More</a>\n</div>`,
      transcript: 'Audio Transcript: Custom element card verified for WCAG 2.2 accessibility standards.',
      violations: [
        {
          id: 'v8',
          wcag: '2.4.4',
          level: 'A',
          title: 'Link Purpose (In Context)',
          desc: 'Generic "Read More" text lacks context for screen reader rotor navigation.',
          fix: 'Added aria-label specifying exact article topic.'
        }
      ],
      owoIntro: 'Hoot! Paste any custom snippet and I will scan for missing ARIA attributes and low contrast!'
    }
  };

  // --------------------------------------------------------------------------
  // 2. State Management
  // --------------------------------------------------------------------------
  let currentState = {
    currentPresetKey: 'checkout',
    isRemediated: false,
    activeMode: 'playground', // 'playground' | 'overlay'
    activeTab: 'code-editor',  // 'code-editor' | 'url-scanner'
    activeFilter: 'all',
    isPlayingAudio: false,
    speechUtterance: null
  };

  // Sound Effects Synthesis via Web Audio API
  function playSoundEffect(type) {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      if (type === 'spell') {
        // Magical Arpeggio Chime
        const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
          gain.gain.setValueAtTime(0.15, ctx.currentTime + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.4);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.08);
          osc.stop(ctx.currentTime + idx * 0.08 + 0.4);
        });
      } else if (type === 'hoot') {
        // Owl Double-Tone Hoot
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.2);
      } else if (type === 'click') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.05);
      }
    } catch (e) {
      console.warn('Web Audio API not allowed without user gesture.', e);
    }
  }

  // --------------------------------------------------------------------------
  // 3. Starlight Background Canvas Animation
  // --------------------------------------------------------------------------
  function initStarlightCanvas() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = 65;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.5,
        color: ['#8B5CF6', '#F59E0B', '#06B6D4', '#A78BFA'][Math.floor(Math.random() * 4)],
        alpha: Math.random(),
        speed: Math.random() * 0.3 + 0.1,
        dir: Math.random() * Math.PI * 2
      });
    }

    function render() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += Math.cos(p.dir) * p.speed;
        p.y += Math.sin(p.dir) * p.speed;
        p.alpha += (Math.random() - 0.5) * 0.02;
        if (p.alpha < 0.1) p.alpha = 0.1;
        if (p.alpha > 0.9) p.alpha = 0.9;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      requestAnimationFrame(render);
    }

    render();
  }

  // --------------------------------------------------------------------------
  // 4. UI Rendering Functions
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
    document.getElementById('stat-violations-count').textContent = `${data.violations.length} WCAG Barriers`;
    document.getElementById('stat-fixed-count').textContent = `0 Fixed`;
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
      // Circumference = 2 * PI * 42 = 263.89
      const offset = 264 - (264 * totalScore) / 100;
      progressCircle.style.strokeDashoffset = offset;
      progressCircle.style.stroke = totalScore > 80 ? '#10B981' : totalScore > 60 ? '#F59E0B' : '#EF4444';
    }

    // Sub Metrics
    if (subMetrics) {
      document.getElementById('val-perceivable').textContent = `${subMetrics.perceivable} / 100`;
      document.getElementById('bar-perceivable').style.width = `${subMetrics.perceivable}%`;

      document.getElementById('val-operable').textContent = `${subMetrics.operable} / 100`;
      document.getElementById('bar-operable').style.width = `${subMetrics.operable}%`;

      document.getElementById('val-understandable').textContent = `${subMetrics.understandable} / 100`;
      document.getElementById('bar-understandable').style.width = `${subMetrics.understandable}%`;

      document.getElementById('val-robust').textContent = `${subMetrics.robust} / 100`;
      document.getElementById('bar-robust').style.width = `${subMetrics.robust}%`;
    }
  }

  function renderAuditLogCards(violations, isRemediated) {
    const container = document.getElementById('audit-cards-list');
    if (!container) return;

    document.getElementById('violation-count-badge').textContent = `${violations.length} Barriers`;

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
            <span class="v-wcag-tag ${levelBadgeClass}">WCAG ${v.wcag} (${v.level})</span>
            <span class="v-title">${v.title}</span>
            <i class="fa-solid fa-chevron-down v-toggle-icon"></i>
          </div>
          <div class="v-card-body">
            <p class="v-description">${v.desc}</p>
            <div class="v-fix-code">
              <strong>Refactored Fix:</strong> ${v.fix}
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
  // 5. Interactive Spell Remediation Handler
  // --------------------------------------------------------------------------
  function castAutoFixSpell() {
    const presetData = ACCESSIBILITY_PRESETS[currentState.currentPresetKey];
    if (!presetData) return;

    playSoundEffect('spell');

    // Trigger magic visual glow
    const diffContainer = document.getElementById('diff-container');
    const owoAvatar = document.getElementById('owo-avatar-interactive');
    
    if (diffContainer) diffContainer.classList.add('spell-casting-active');
    if (owoAvatar) owoAvatar.classList.add('casting');

    // Speech Bubble Update
    setOwoSpeech('✨ <em>Abra-ca-DOM!</em> Casting AI remediation spell across elements! Injecting ARIA roles & keyboard focus listeners!');

    setTimeout(() => {
      if (diffContainer) diffContainer.classList.remove('spell-casting-active');
      if (owoAvatar) owoAvatar.classList.remove('casting');

      currentState.isRemediated = true;

      // Update Score to Enchanted
      updateScores(presetData.scoreAfter, presetData.subAfter, 'Enchanted & Accessible', 'status-good');

      // Update Audit Cards
      renderAuditLogCards(presetData.violations, true);

      // Update Quick Stats
      document.getElementById('stat-fixed-count').textContent = `${presetData.violations.length} Fixed`;

      // Toast feedback
      showToast(`✨ Auto-Fix Spell Applied! Score jumped to ${presetData.scoreAfter}%!`, 'success');

      setOwoSpeech(`Hoot! Wondrous! Accessibility score jumped from <strong>${presetData.scoreBefore}% to ${presetData.scoreAfter}%</strong>! All WCAG barriers resolved! ✨`);
    }, 1200);
  }

  // --------------------------------------------------------------------------
  // 6. Audio Waveform Visualizer & Voice Synthesizer
  // --------------------------------------------------------------------------
  function initAudioSynthesizer() {
    const canvas = document.getElementById('waveform-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animId = null;

    function drawWaveform() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const bars = 40;
      const barWidth = canvas.width / bars;

      for (let i = 0; i < bars; i++) {
        let height = 4;
        if (currentState.isPlayingAudio) {
          height = Math.sin(Date.now() * 0.01 + i) * 14 + 18;
        }
        ctx.fillStyle = currentState.isPlayingAudio ? '#F59E0B' : '#475569';
        ctx.fillRect(i * barWidth, (canvas.height - height) / 2, barWidth - 3, height);
      }

      animId = requestAnimationFrame(drawWaveform);
    }

    drawWaveform();

    // Play/Pause Speech Audio Synthesizer
    const btnPlay = document.getElementById('btn-play-audio-synth');
    const playIcon = document.getElementById('synth-play-icon');
    const playText = document.getElementById('synth-play-text');

    if (btnPlay) {
      btnPlay.addEventListener('click', () => {
        if (!('speechSynthesis' in window)) {
          showToast('Speech synthesis not supported in this browser.', 'error');
          return;
        }

        if (currentState.isPlayingAudio) {
          window.speechSynthesis.cancel();
          currentState.isPlayingAudio = false;
          if (playIcon) playIcon.className = 'fa-solid fa-play';
          if (playText) playText.textContent = 'Synthesize Audio';
        } else {
          const presetData = ACCESSIBILITY_PRESETS[currentState.currentPresetKey];
          const textToSpeak = presetData ? presetData.transcript : 'Synthesizing voice audio description...';

          const utterance = new SpeechSynthesisUtterance(textToSpeak);
          utterance.rate = 1.0;
          utterance.pitch = 1.1;

          utterance.onend = () => {
            currentState.isPlayingAudio = false;
            if (playIcon) playIcon.className = 'fa-solid fa-play';
            if (playText) playText.textContent = 'Synthesize Audio';
          };

          window.speechSynthesis.speak(utterance);
          currentState.isPlayingAudio = true;
          if (playIcon) playIcon.className = 'fa-solid fa-pause';
          if (playText) playText.textContent = 'Pause Narration';

          playSoundEffect('click');
          showToast('Voice AI Narrator Active', 'info');
        }
      });
    }
  }

  // --------------------------------------------------------------------------
  // 7. Toast Notification Utility
  // --------------------------------------------------------------------------
  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const icon = type === 'success' ? 'fa-circle-check text-success' : 'fa-wand-magic-sparkles text-gold';
    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 400);
    }, 3200);
  }

  // --------------------------------------------------------------------------
  // 8. Event Listeners Initialization
  // --------------------------------------------------------------------------
  function initEventListeners() {
    // Mode Switcher (Dev Playground vs Extension Overlay)
    const btnPlayground = document.getElementById('mode-playground');
    const btnOverlay = document.getElementById('mode-overlay');
    const viewPlayground = document.getElementById('view-playground');
    const viewOverlay = document.getElementById('view-overlay');

    if (btnPlayground && btnOverlay) {
      btnPlayground.addEventListener('click', () => {
        btnPlayground.classList.add('active');
        btnOverlay.classList.remove('active');
        viewPlayground.classList.add('active');
        viewOverlay.classList.add('hidden');
        playSoundEffect('click');
      });

      btnOverlay.addEventListener('click', () => {
        btnOverlay.classList.add('active');
        btnPlayground.classList.remove('active');
        viewOverlay.classList.remove('hidden');
        viewOverlay.classList.add('active');
        viewPlayground.classList.removeClass ? viewPlayground.classList.removeClass('active') : viewPlayground.classList.remove('active');
        playSoundEffect('click');
        showToast('Extension Overlay Mode Active', 'info');
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

    // Hotkey Ctrl+Shift+L to cast auto-fix
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

    if (tabCode && tabUrl) {
      tabCode.addEventListener('click', () => {
        tabCode.classList.add('active');
        tabUrl.classList.remove('active');
        contentCode.classList.remove('hidden');
        contentUrl.classList.add('hidden');
        playSoundEffect('click');
      });

      tabUrl.addEventListener('click', () => {
        tabUrl.classList.add('active');
        tabCode.classList.remove('active');
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
          showToast('Spell Copied! ✨', 'success');
          playSoundEffect('click');
        }
      });
    }

    // Owo Mascot Avatar Click Event
    const owoAvatar = document.getElementById('owo-avatar-interactive');
    if (owoAvatar) {
      owoAvatar.addEventListener('click', () => {
        playSoundEffect('hoot');

        // Wink Animation Toggle
        const leftEyelid = document.querySelector('.eyelid-left');
        if (leftEyelid) {
          leftEyelid.setAttribute('opacity', '1');
          setTimeout(() => leftEyelid.setAttribute('opacity', '0'), 350);
        }

        const tips = [
          'Hoot! Remember to always keep ARIA labels clear and descriptive for screen reader users!',
          'Hoot! Low color contrast is the #1 WCAG violation on the web today!',
          'Hoot! Pressing Tab should seamlessly cycle focus through all interactive buttons and inputs!',
          'Hoot! Complex images and dynamic charts love audio speech transcript narration!'
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
            badge.style.background = '#10B981';
            badge.textContent = 'Fixed & Verified ✓';
          }
          showToast(`DOM Node #${targetId} Remediated!`, 'success');
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
  }

  // --------------------------------------------------------------------------
  // 9. Application Entrypoint
  // --------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    initStarlightCanvas();
    loadPreset('checkout');
    initAudioSynthesizer();
    initEventListeners();
    console.log('✨ Lumos AI Magical Remediation Engine Initialized!');
  });
})();
