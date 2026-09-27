document.addEventListener('DOMContentLoaded', () => {
  initEventConfig();
  initIntroSequence();
});

const EVENT_CONFIG = {
  date: "2026-09-29",
  startTime: "18:30:00", 
  endTime: "21:00:00",
  location: "PLH101, Bennett University",
  title: "Multiverse of Code",
  description: "Join the GFG Student Chapter for a night of technology, community, and Marvel-themed surprises.",
  lumaUrl: "https://luma.com/pq0254fm" 
};

function initEventConfig() {
  const registerLinks = document.querySelectorAll('.register-link');
  const regNote = document.getElementById('registration-note');
  
  const endUTC = new Date("2026-09-29T15:30:00Z").getTime();
  const isEnded = Date.now() > endUTC;

  registerLinks.forEach(link => {
    if (isEnded || !EVENT_CONFIG.lumaUrl) {
      const btn = document.createElement('button');
      btn.className = link.className;
      btn.classList.add('disabled');
      btn.disabled = true;
      btn.setAttribute('aria-disabled', 'true');
      btn.innerHTML = isEnded ? 'Event Ended <span aria-hidden="true">&rarr;</span>' : 'Registration details soon <span aria-hidden="true">&rarr;</span>';
      link.parentNode.replaceChild(btn, link);
    } else {
      link.href = EVENT_CONFIG.lumaUrl;
      link.innerHTML = "Register on Luma <span aria-hidden=\"true\">↗</span>"; link.target = "_blank";
    }
  });

  if (regNote) {
    if (isEnded) regNote.textContent = 'This event has concluded.';
    else if (!EVENT_CONFIG.lumaUrl) regNote.textContent = 'The Luma registration link will appear here soon.';
    else regNote.textContent = 'Seats are limited. Secure your spot now.';
  }

  const calendarLink = document.getElementById('calendar-link');
  if (calendarLink) {
    calendarLink.addEventListener('click', (e) => {
      if (e.currentTarget.tagName === 'A') e.preventDefault();
      generateICS();
    });
  }
}

function generateICS() {
  const dtStamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const dtStart = "20260929T130000Z"; 
  const dtEnd = "20260929T153000Z";   
  const uid = Date.now() + "@gfgbennett.com";
  
  const ics = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//GFG//Multiverse of Code//EN\nBEGIN:VEVENT\nUID:" + uid + "\nDTSTAMP:" + dtStamp + "\nDTSTART:" + dtStart + "\nDTEND:" + dtEnd + "\nSUMMARY:" + EVENT_CONFIG.title + "\nDESCRIPTION:" + EVENT_CONFIG.description + "\nLOCATION:" + EVENT_CONFIG.location + "\nEND:VEVENT\nEND:VCALENDAR";
  const blob = new Blob([ics], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'multiverse-of-code.ics';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

let audioCtx;
let soundEnabled = false;
let thwipPlayed = false;

function playThwip() {
  if (!soundEnabled) return;
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.15);
    
    gain.gain.setValueAtTime(0, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.15);
    
    const bufferSize = audioCtx.sampleRate * 0.15; 
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    
    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;
    
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 1000;
    
    const noiseGain = audioCtx.createGain();
    noiseGain.gain.setValueAtTime(0.3, audioCtx.currentTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
    
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(audioCtx.destination);
    
    noise.start();
  } catch(e) {}
}

function initIntroSequence() {
  const soundToggle = document.getElementById('sound-toggle');
  if (soundToggle) {
    soundToggle.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      soundToggle.setAttribute('aria-pressed', soundEnabled);
      soundToggle.querySelector('.sound-label').textContent = soundEnabled ? 'Sound on' : 'Sound off';
      if (soundEnabled && !audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
    });
  }

  const opening = document.getElementById('opening');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Added pageWrapper lock
  const pageWrapper = document.getElementById('page-wrapper');

  if (prefersReducedMotion) {
    if (opening) opening.style.display = 'none';
    initStonesScroll();
    return;
  }
  if (!opening) {
    initStonesScroll();
    return;
  }



  
  
  const brandStage = document.getElementById('brand-stage');
  const gfgMark = document.querySelector('.gfg-mark');
  const marvelMark = document.querySelector('.marvel-mark');
  const doomSigil = document.querySelector('.doom-sigil');
  const brandX = document.querySelector('.brand-x');
  const bottomLine = document.querySelector('.opening-bottomline');
  const brandCaption = document.querySelector('.brand-caption');
  
  let targetScrollY = window.scrollY;
  let currentScrollY = targetScrollY;
  let isAnimating = false;
  let lastProgress = -1;

  // Track length determines how many pixels the intro takes
  let trackLength = window.innerHeight * 5;
  
  if (opening) {
    opening.style.position = 'fixed';
    opening.style.top = '0';
    opening.style.left = '0';
    opening.style.width = '100%';
    opening.style.height = '100vh';
    opening.style.pointerEvents = 'auto';
    opening.style.display = 'flex';
    opening.style.zIndex = '9999';
  }
  
  if (pageWrapper) {
    pageWrapper.style.marginTop = `${trackLength}px`;
    pageWrapper.style.position = 'relative';
    pageWrapper.style.zIndex = '1';
  }
  
  window.addEventListener('resize', () => {
    trackLength = window.innerHeight * 5;
    const deadZone = window.innerHeight * 1; 
    if (pageWrapper) pageWrapper.style.marginTop = `${trackLength + deadZone}px`;
  });

  // We no longer need lockPage or unlockPage because the timeline is purely scroll-based!
  function unlockPage() {}
  function lockPage() {}

  // We will draw the web dynamically and beautifully in drawAtmos rather than pre-rendered frames

  

  const matrixCanvas = document.getElementById('matrix-canvas');
  const matrixCtx = matrixCanvas ? matrixCanvas.getContext('2d') : null;

  function resizeCanvas() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2); 
    
    if (matrixCanvas) {
      matrixCanvas.width = w * dpr;
      matrixCanvas.height = h * dpr;
      matrixCanvas.style.width = w + 'px';
      matrixCanvas.style.height = h + 'px';
      if (matrixCtx) matrixCtx.scale(dpr, dpr);
    }
  }

  window.addEventListener('resize', resizeCanvas);
  
  document.addEventListener('mousemove', (e) => {
    const glow = document.getElementById('cursor-glow');
    if (glow) {
      glow.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
    }
  });
  if (matrixCanvas) resizeCanvas();

  
  
  const runes = 'ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛟᛞ0123456789LATVERIA';
  const drops = [];

  let fontSize = 24;
  let columns = 0;
  
  // Audio Synthesis
  let audioCtx = null;
  let spiderText = false;
  
  let isSmoothScrolling = false;
  let wheelTimeout;
  
  window.addEventListener('wheel', (e) => {
    if (!isSmoothScrolling) {
      targetScrollY = window.scrollY;
      isSmoothScrolling = true;
    }
    e.preventDefault();
    targetScrollY += e.deltaY * 0.8; // Decreased sensitivity by 0.2
    targetScrollY = Math.max(0, Math.min(targetScrollY, document.documentElement.scrollHeight - window.innerHeight));
    
    clearTimeout(wheelTimeout);
    wheelTimeout = setTimeout(() => {
      isSmoothScrolling = false;
    }, 150);
  }, { passive: false });
  let lastCharCount = 0;
  
  function initAudio() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') audioCtx.resume();
  }
  
  window.addEventListener('scroll', initAudio, { once: true });
  window.addEventListener('click', initAudio, { once: true });

  function playBlip() {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = 'square';
    osc.frequency.setValueAtTime(800 + Math.random()*200, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.02, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.03);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.03);
  }
  
  let lastBuzzTime = 0;
  function playBuzz() {
    if (!audioCtx || audioCtx.currentTime - lastBuzzTime < 0.1) return;
    lastBuzzTime = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(50 + Math.random()*20, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.1);
  }

  function initMatrix() {
    if (!matrixCanvas) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    matrixCanvas.width = w;
    matrixCanvas.height = h;
    columns = Math.floor(w / fontSize);
    for (let x = 0; x < columns; x++) {
      drops[x] = {
        y: Math.random() * -100,
        speed: Math.random() * 0.5 + 0.5,
        headChar: ''
      };
    }
  }
  initMatrix();
  window.addEventListener('resize', initMatrix);

  function drawMatrix(p) {
    if (!matrixCtx) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    
    // Fade trail
    matrixCtx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    matrixCtx.fillRect(0, 0, w, h);
    
    let alpha = 1;
    if (p > 0.6) alpha = 1 - (p - 0.6) / 0.2; // Fade rain as override starts
    if (alpha <= 0) return;

    matrixCtx.font = fontSize + 'px monospace';
    
    for (let i = 0; i < drops.length; i++) {
      let drop = drops[i];
      if (drop.y * fontSize > h && Math.random() > 0.975) {
        drop.y = 0;
      }
      if (drop.y >= 0) {
        // Draw tail
        matrixCtx.fillStyle = `rgba(0, 80, 0, ${alpha * 0.4})`;
        matrixCtx.fillText(drop.headChar, i * fontSize, (drop.y - drop.speed) * fontSize);
        
        // Draw head
        drop.headChar = runes.charAt(Math.floor(Math.random() * runes.length));
        matrixCtx.fillStyle = `rgba(0, 160, 0, ${alpha * 0.8})`; // Bright head
        matrixCtx.fillText(drop.headChar, i * fontSize, drop.y * fontSize);
      }
      drop.y += drop.speed;
    }
  }

  function tick() {
    if (isSmoothScrolling) {
      currentScrollY += (targetScrollY - currentScrollY) * 0.12;
      window.scrollTo(0, currentScrollY);
    } else {
      targetScrollY = window.scrollY;
      currentScrollY += (window.scrollY - currentScrollY) * 0.12;
    }
    
    let p = currentScrollY / trackLength; 
    if (p < 0) p = 0;
    if (p > 1) p = 1;
    
    if (p < 0.99) {
      if (matrixCanvas && matrixCanvas.style.display === 'none') matrixCanvas.style.display = 'block';
      drawMatrix(p);
    } else {
      if (matrixCanvas && matrixCanvas.style.display !== 'none') matrixCanvas.style.display = 'none';
    }
    
    const sigil = document.querySelector('.bg-sigil');
    if (sigil) {
      sigil.style.backgroundPositionY = `-${currentScrollY * 0.3}px`;
    }

    const termSys = document.getElementById('terminal-sys');
    const termOverride = document.getElementById('terminal-override');
    const brandLockup = document.getElementById('brand-lockup');

    // Typewriter effect
    if (termSys) {
       const fullText = "LATVERIAN_OS // V.9.4 // DECRYPTING...";
       let typeProgress = Math.min((p / 0.2) * fullText.length, fullText.length);
       let charCount = Math.floor(typeProgress);
       
       if (charCount > lastCharCount && charCount < fullText.length) {
         playBlip();
       }
       lastCharCount = charCount;
       
       let displayStr = fullText.substring(0, charCount);
       if (charCount < fullText.length) {
         displayStr += (Math.floor(Date.now() / 200) % 2 === 0 ? '█' : '');
       }
       if (charCount > 15 && Math.random() > 0.995 && !spiderText) {
         spiderText = true;
         termSys.innerText = "PARKER_PROTOCOL_DETECTED";
         termSys.style.color = "#f00";
         setTimeout(() => { spiderText = false; termSys.style.color = "#0f0"; }, 150);
       }
       if (!spiderText) {
         termSys.innerText = displayStr;
       }
       termSys.style.opacity = p > 0 ? 1 : 0;
    }

    // Logo reveal and emphasis
    if (brandLockup) {
       let scale = 1;
       let filter = "grayscale(1) sepia(1) hue-rotate(70deg) brightness(1.5) contrast(1.5)";
       if (p < 0.2) {
         brandLockup.style.opacity = 0;
       } else if (p < 0.3) {
         brandLockup.style.opacity = (p - 0.2) / 0.1;
       } else {
         brandLockup.style.opacity = 1;
       }
       
       // Emphasis: As override happens, logo scales up and glows violently!
       if (p > 0.6) {
         let overP = Math.min((p - 0.6) / 0.25, 1);
         scale = 1 + overP * 1.5; // Grow 250%
         filter = `grayscale(1) sepia(1) hue-rotate(70deg) brightness(${1.5 + overP * 2}) contrast(2) drop-shadow(0 0 ${overP * 30}px #0f0)`;
       }
       brandLockup.style.transform = `scale(${scale})`;
       brandLockup.style.filter = filter;
       brandLockup.style.zIndex = "10";
    }

    // System Override Glitch
    if (termOverride) {
       if (p > 0.6 && p < 0.85) {
          if (!termOverride.hasAttribute('data-text')) {
             termOverride.setAttribute('data-text', termOverride.innerText);
          }
          if (Math.random() > 0.3) {
             termOverride.classList.add('glitch-text');
             termOverride.style.opacity = 1;
             playBuzz();
          } else {
             termOverride.classList.remove('glitch-text');
             termOverride.style.opacity = 0.5;
          }
       } else {
          termOverride.style.opacity = 0;
          termOverride.classList.remove('glitch-text');
       }
    }

    // TV Power Off Transition
    if (opening) {
      if (p > 0.90) {
        let fadeP = Math.min((p - 0.90) / 0.10, 1);
        let squish = Math.min(fadeP / 0.8, 1);
        let pop = Math.max(0, (fadeP - 0.8) / 0.2);
        
        let scaleY = 1 - squish + (squish >= 1 ? 0.002 : 0);
        let scaleX = 1 + squish * 4;
        let brightness = 1 + squish * 20;
        
        if (pop > 0) {
           scaleY = 0;
           scaleX = 0;
        }
        
        opening.style.transform = `scaleY(${scaleY}) scaleX(${scaleX})`;
        opening.style.filter = `brightness(${brightness}) ${pop > 0 ? 'contrast(200%)' : ''}`;
        opening.style.opacity = pop >= 1 ? 0 : 1;
        opening.style.pointerEvents = fadeP >= 0.99 ? 'none' : 'auto';
        
        // Spider-Man Thwip
        if (fadeP >= 0.99) {
          if (!thwipPlayed) {
            thwipPlayed = true;
            const audio = new Audio('assets/audio/thwip.mp3');
            audio.play().catch(e => console.log(e));
          }
        }
        
        // Final pop sound
        if (fadeP > 0.9 && fadeP < 0.95 && Math.random() > 0.5) playBlip();
      } else {
        opening.style.transform = 'none';
        opening.style.filter = 'none';
        opening.style.opacity = 1;
        opening.style.pointerEvents = 'auto';
      }
    }

    requestAnimationFrame(tick);
  }

  window.addEventListener('scroll', () => {
    if (!isAnimating) {
      isAnimating = true;
      requestAnimationFrame(tick);
    }
  });



  isAnimating = true;
  requestAnimationFrame(tick);
  initStonesScroll();
}

function initStonesScroll() {
  const stonesSection = document.getElementById('why-attend');
  const arc = document.getElementById('stones-arc');
  const slots = document.querySelectorAll('.stone-slot');
  const panels = document.querySelectorAll('.stone-content-panel');
  if (!stonesSection || !arc) return;
  
  let currentContinuousIndex = 0;
  let targetContinuousIndex = 0;
  let animFrameId = null;
  
  function updateStones() {
    const rect = stonesSection.getBoundingClientRect();
    const sectionTop = rect.top;
    const sectionHeight = rect.height;
    const vh = window.innerHeight;
    
    const totalScroll = sectionHeight - vh;
    let progress = -sectionTop / totalScroll;
    if (progress < 0) progress = 0;
    if (progress > 1) progress = 1;
    
    const rawIndex = progress * 5;
    const base = Math.floor(rawIndex);
    const fraction = rawIndex - base;
    
    let easedFraction = 0;
    const deadZone = 0.15; // smaller deadzone
    if (fraction < deadZone) {
      easedFraction = 0;
    } else if (fraction > 1 - deadZone) {
      easedFraction = 1;
    } else {
      let x = (fraction - deadZone) / (1 - 2 * deadZone);
      easedFraction = x * x * (3 - 2 * x); // smoothstep
    }
    
    targetContinuousIndex = base + easedFraction;
    
    if (!animFrameId) {
      animFrameId = requestAnimationFrame(animateWheel);
    }
  }
  
  function animateWheel() {
    const diff = targetContinuousIndex - currentContinuousIndex;
    if (Math.abs(diff) < 0.001) {
      currentContinuousIndex = targetContinuousIndex;
      animFrameId = null;
    } else {
      currentContinuousIndex += diff * 0.12; // fluid interpolation
      animFrameId = requestAnimationFrame(animateWheel);
    }
    
    const activeIndex = Math.min(5, Math.max(0, Math.round(currentContinuousIndex)));
    const wheelRot = 75 - (currentContinuousIndex * 30);
    arc.style.setProperty('--wheel-rot', wheelRot + 'deg');
    
    slots.forEach((slot, i) => {
      if (i === activeIndex) {
        slot.classList.add('active');
        slot.setAttribute('aria-current', 'true');
        if(panels[i]) panels[i].classList.add('active');
      } else {
        slot.classList.remove('active');
        slot.removeAttribute('aria-current');
        if(panels[i]) panels[i].classList.remove('active');
      }
    });
  }
  
  window.addEventListener('scroll', updateStones);
  updateStones();

  function scrollToStone(index) {
    const rect = stonesSection.getBoundingClientRect();
    const sectionHeight = rect.height;
    const vh = window.innerHeight;
    const totalScroll = sectionHeight - vh;
    
    const targetProgress = index / 5;
    const targetScrollY = window.scrollY + rect.top + (targetProgress * totalScroll);
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
  }

  slots.forEach((slot, i) => {
    slot.addEventListener('click', () => {
      scrollToStone(i);
    });
    slot.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        scrollToStone(i);
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        const next = Math.min(5, i + 1);
        slots[next].focus();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const prev = Math.max(0, i - 1);
        slots[prev].focus();
      }
    });
  });
}

function initSiteBackground() {
  const canvas = document.getElementById('site-bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;
  
  let w = window.innerWidth;
  let h = window.innerHeight;
  canvas.width = w;
  canvas.height = h;
  
  window.addEventListener('resize', () => {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
  });
  
  const particles = [];
  const stoneColors = ['#2f8d46', '#1b6329', '#3eab58']; // Only green Doom/GFG theme colors
  
  for (let i = 0; i < 40; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.4 - 0.2,
      size: Math.random() * 2 + 1,
      color: stoneColors[Math.floor(Math.random() * stoneColors.length)],
      type: Math.random() > 0.8 ? 'rune' : 'ember', // 20% runes, 80% embers
      angle: Math.random() * Math.PI * 2,
      vAngle: (Math.random() - 0.5) * 0.02,
      life: Math.random() * Math.PI * 2
    });
  }
  
  function draw() {
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'screen';
    
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.angle += p.vAngle;
      p.life += 0.01;
      
      if (p.y < -50) p.y = h + 50;
      if (p.x < -50) p.x = w + 50;
      if (p.x > w + 50) p.x = -50;
      if (p.y > h + 50) p.y = -50;
      
      const alpha = (Math.sin(p.life) * 0.5 + 0.5) * 0.5;
      
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      
      if (p.type === 'ember') {
        ctx.beginPath();
        ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 4, 0, Math.PI * 2);
        const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 4);
        grd.addColorStop(0, p.color);
        grd.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grd;
        ctx.globalAlpha = alpha * 0.3;
        ctx.fill();
      } else {
        // Draw Doom-like triangular rune
        ctx.beginPath();
        ctx.moveTo(0, -p.size * 3);
        ctx.lineTo(p.size * 2.5, p.size * 2);
        ctx.lineTo(-p.size * 2.5, p.size * 2);
        ctx.closePath();
        ctx.strokeStyle = '#2f8d46'; // GFG / Doom green
        ctx.lineWidth = 1;
        ctx.globalAlpha = alpha * 0.4;
        ctx.stroke();
      }
      
      ctx.restore();
    });
    
    requestAnimationFrame(draw);
  }
  
  draw();
}

initSiteBackground();

// Decrypt text on scroll
const decryptObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.decrypted) {
      entry.target.dataset.decrypted = "true";
      const originalText = entry.target.dataset.originalText || entry.target.innerText;
      if (!entry.target.dataset.originalText) {
         entry.target.dataset.originalText = originalText;
      }
      let iterations = 0;
      const maxIterations = 15;
      const interval = setInterval(() => {
        entry.target.innerText = originalText.split('').map((char, index) => {
          if (index < (iterations / maxIterations) * originalText.length) return char;
          const localRunes = 'ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛟᛞ0123456789LATVERIA';
          return localRunes.charAt(Math.floor(Math.random() * localRunes.length));
        }).join('');
        iterations++;
        if (iterations >= maxIterations) {
          clearInterval(interval);
          entry.target.innerText = originalText;
        }
      }, 40);
    }
  });
});
document.querySelectorAll('p, .section-title, .hero-content h1, .register-link').forEach(el => {
  decryptObserver.observe(el);
});
