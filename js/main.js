/* ==========================================================================
   SEFNI MARCELLA PRATIWI - PORTFOLIO INTERAKTIF
   Interactive JavaScript ES6+ Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. WEB AUDIO API SYNTHESIZER (PLAYFUL SFX)
     -------------------------------------------------------------------------- */
  let soundEnabled = true;
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
  }

  function playPopSound(freq = 520, type = 'sine') {
    if (!soundEnabled) return;
    try {
      initAudio();
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, audioCtx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } catch (e) {
      console.log('Web Audio error:', e);
    }
  }

  function playFanfareSound() {
    if (!soundEnabled) return;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => playPopSound(freq, 'triangle'), idx * 90);
    });
  }

  // Sound Toggle Button
  const soundToggleBtn = document.getElementById('sound-toggle-btn');
  const soundIcon = document.getElementById('sound-icon');

  soundToggleBtn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    if (soundEnabled) {
      soundIcon.className = 'ph-bold ph-speaker-high';
      playPopSound(600);
    } else {
      soundIcon.className = 'ph-bold ph-speaker-slash';
    }
  });

  /* --------------------------------------------------------------------------
     2. DARK / LIGHT THEME TOGGLE
     -------------------------------------------------------------------------- */
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  const htmlElem = document.documentElement;

  const savedTheme = localStorage.getItem('claymind-theme') || 'light';
  htmlElem.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElem.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    htmlElem.setAttribute('data-theme', newTheme);
    localStorage.setItem('claymind-theme', newTheme);
    updateThemeIcon(newTheme);
    playPopSound(440);
  });

  function updateThemeIcon(theme) {
    if (theme === 'dark') {
      themeIcon.className = 'ph-bold ph-sun';
    } else {
      themeIcon.className = 'ph-bold ph-moon-stars';
    }
  }

  /* --------------------------------------------------------------------------
     3. DETAIL PENGALAMAN MAGANG MODAL (TANPA GAMBAR TAMBAHAN)
     -------------------------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.course-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      playPopSound(500);

      const category = btn.getAttribute('data-category');
      projectCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
          card.style.display = 'flex';
          card.style.animation = 'bounceIn 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Modal Detail Data Pengalaman Magang Sefni (Satu-satunya gambar utama di hero)
  const projectDetailsData = {
    'smcc': {
      title: 'SMCC (Subdirektorat Mitigasi Crisis Center) UNESA',
      badge: 'Aug 2024 - Dec 2024 • Surabaya, Indonesia',
      iconClass: 'ph-buildings',
      bgGradient: 'linear-gradient(135deg, #4F46E5 0%, #818CF8 100%)',
      role: 'Anggota Magang / Intern Administrasi',
      desc: 'Berperan aktif dalam manajemen administrasi, pengarsipan dokumen kegiatan secara sistematis, penyusunan LPJ, dan pendukung evaluasi Monitoring & Evaluasi (Monev) program studi UNESA.',
      highlights: [
        'Mengelola administrasi & pengarsipan dokumen kegiatan secara sistematis & rapi.',
        'Menyusun Laporan Pertanggungjawaban (LPJ) kegiatan institusi.',
        'Menginput dan memperbarui data administrasi secara berkala.',
        'Berkoordinasi dengan unit internal UNESA dan instansi eksternal.',
        'Mendukung kegiatan Monitoring dan Evaluasi (Monev) prodi via pengumpulan data.'
      ]
    },
    'bpbd': {
      title: 'BPBD (Badan Penanggulangan Bencana Daerah) Kota Surabaya',
      badge: 'Oct 2024 • Surabaya, Indonesia',
      iconClass: 'ph-shield-check',
      bgGradient: 'linear-gradient(135deg, #06B6D4 0%, #22D3EE 100%)',
      role: 'Anggota Magang / UI & System Intern',
      desc: 'Melakukan analisis kebutuhan pengguna sistem kebencanaan, menyusun dokumentasi pengembangan aplikasi, laporan evaluasi hasil pengujian, dan membuat prototype antarmuka pengguna berbasis Figma.',
      highlights: [
        'Melakukan analisis kebutuhan pengguna sistem (user requirement analysis).',
        'Menyusun dokumentasi lengkap hasil pengembangan aplikasi.',
        'Menyusun laporan evaluasi berdasarkan hasil pengujian pengguna (user testing).',
        'Membuat prototype antarmuka interaktif menggunakan Figma.'
      ]
    }
  };

  const projectModal = document.getElementById('course-modal');
  const projectModalBody = document.getElementById('course-modal-body');
  const closeProjectModalBtn = document.getElementById('close-course-modal');

  document.querySelectorAll('.open-project-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project-id');
      const data = projectDetailsData[projectId];
      if (!data) return;

      projectModalBody.innerHTML = `
        <div class="section-badge" style="margin-bottom:12px;">${data.badge}</div>
        <h2 style="font-size: 1.8rem; font-weight: 700; margin-bottom: 16px;">${data.title}</h2>
        <div style="width:100%; height:140px; background:${data.bgGradient}; border-radius:18px; margin-bottom:20px; box-shadow: var(--clay-shadow-outer); display:flex; align-items:center; justify-content:center; color:white;">
          <i class="ph-bold ${data.iconClass}" style="font-size: 4rem; filter: drop-shadow(2px 4px 6px rgba(0,0,0,0.2));"></i>
        </div>
        <p style="font-size:1.05rem; color:var(--color-text-muted); margin-bottom:20px;">${data.desc}</p>
        <p style="font-weight:700; margin-bottom:12px; color:var(--color-text-main);">Posisi / Peran: <span style="color:var(--color-primary);">${data.role}</span></p>
        <h4 style="font-size:1.15rem; font-weight:700; margin-bottom:12px;">Rincian Tugas & Pencapaian:</h4>
        <ul style="display:flex; flex-direction:column; gap:10px; margin-bottom:28px;">
          ${data.highlights.map(hl => `<li style="display:flex; align-items:center; gap:10px; background:var(--color-bg); padding:10px 16px; border-radius:12px; font-weight:600;"><i class="ph-bold ph-check-circle" style="color:var(--color-mint);"></i> ${hl}</li>`).join('')}
        </ul>
        <button class="clay-button primary open-contact-btn" data-subject="Diskusi Pengalaman Magang ${data.title}" style="width:100%;">
          Hubungi Sefni Mengenai Magang Ini <i class="ph-bold ph-paper-plane-tilt"></i>
        </button>
      `;

      bindContactButtons();

      projectModal.classList.add('active');
      playPopSound(580);
    });
  });

  closeProjectModalBtn.addEventListener('click', () => {
    projectModal.classList.remove('active');
  });

  /* --------------------------------------------------------------------------
     4. SIMULATOR PRODUKTIVITAS & XP TRACKER SEFNI
     -------------------------------------------------------------------------- */
  let currentXP = 1450;
  let currentLevel = 4;
  const maxLevelXP = 2000;

  const xpValElem = document.getElementById('user-xp-val');
  const levelNumElem = document.getElementById('user-level-num');
  const progressFill = document.getElementById('sim-progress-fill');
  const progressPercentLabel = document.getElementById('progress-percent-label');

  function addXP(amount) {
    currentXP += amount;

    if (currentXP >= maxLevelXP && currentLevel === 4) {
      currentLevel = 5;
      levelNumElem.textContent = currentLevel;
      
      const badgeMaster = document.getElementById('badge-master');
      const badgeGenius = document.getElementById('badge-genius');
      const badgeLegend = document.getElementById('badge-legend');

      if (badgeMaster) badgeMaster.classList.remove('locked');
      if (badgeGenius) badgeGenius.classList.remove('locked');
      if (badgeLegend) badgeLegend.classList.remove('locked');

      playFanfareSound();
      triggerConfetti();
      alert('🎉 SELAMAT! Anda telah meningkatkan Level Sefni menjadi Level 5 Admin & Productivity Specialist! Semua Badge Terbuka!');
    } else {
      playPopSound(650 + amount);
    }

    const levelProgressXP = Math.min(currentXP, maxLevelXP) - 1000;
    const percent = Math.min(100, Math.floor((levelProgressXP / 1000) * 100));

    xpValElem.textContent = `${currentXP.toLocaleString()} XP`;
    progressFill.style.width = `${percent}%`;
    progressPercentLabel.textContent = `${percent}% (${levelProgressXP}/1000 XP)`;
  }

  document.getElementById('sim-task-1').addEventListener('click', () => addXP(150));
  document.getElementById('sim-task-2').addEventListener('click', () => addXP(250));
  document.getElementById('sim-task-3').addEventListener('click', () => addXP(300));

  /* --------------------------------------------------------------------------
     5. QUIZ MICRO-WIDGET
     -------------------------------------------------------------------------- */
  const quizBtns = document.querySelectorAll('.quiz-opt-btn');
  const quizRewardMsg = document.getElementById('quiz-reward');

  quizBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const isCorrect = btn.getAttribute('data-correct') === 'true';
      if (isCorrect) {
        btn.classList.add('correct');
        quizRewardMsg.style.display = 'flex';
        playFanfareSound();
        triggerConfetti();
      } else {
        btn.classList.add('incorrect');
        playPopSound(250, 'sawtooth');
        setTimeout(() => btn.classList.remove('incorrect'), 800);
      }
    });
  });

  /* --------------------------------------------------------------------------
     6. CONTACT & HIRE MODAL
     -------------------------------------------------------------------------- */
  const contactModal = document.getElementById('enroll-modal');
  const closeContactModalBtn = document.getElementById('close-enroll-modal');
  const selectedSubjectText = document.getElementById('modal-selected-plan');
  const contactForm = document.getElementById('enrollment-form');

  function bindContactButtons() {
    document.querySelectorAll('.open-contact-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const subject = btn.getAttribute('data-subject') || 'Tawaran Kerja / Kerjasama';
        if (selectedSubjectText) selectedSubjectText.textContent = subject;
        if (projectModal) projectModal.classList.remove('active');
        contactModal.classList.add('active');
        playPopSound(600);
      });
    });
  }
  bindContactButtons();

  closeContactModalBtn.addEventListener('click', () => {
    contactModal.classList.remove('active');
  });

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const senderName = document.getElementById('parent-name').value;
    contactModal.classList.remove('active');
    triggerConfetti();
    playFanfareSound();
    alert(`🎉 Terima kasih, ${senderName}! Pesan Anda telah berhasil terkirim ke Sefni Marcella Pratiwi. Sefni akan segera menghubungi Anda kembali!`);
    contactForm.reset();
  });

  /* --------------------------------------------------------------------------
     7. CANVAS CONFETTI ENGINE (60 FPS)
     -------------------------------------------------------------------------- */
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  function triggerConfetti() {
    const colors = ['#4F46E5', '#06B6D4', '#FF5A5F', '#F59E0B', '#10B981', '#EC4899'];
    for (let i = 0; i < 90; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2 - 50,
        size: Math.random() * 10 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.7) * 16,
        gravity: 0.35,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        opacity: 1
      });
    }
    requestAnimationFrame(updateConfetti);
  }

  function updateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
      let p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rotation += p.rotationSpeed;
      p.opacity -= 0.012;

      ctx.save();
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();

      if (p.opacity <= 0 || p.y > canvas.height) {
        particles.splice(i, 1);
        i--;
      }
    }
    if (particles.length > 0) {
      requestAnimationFrame(updateConfetti);
    }
  }

});
