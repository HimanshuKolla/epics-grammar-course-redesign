// ══════════════════════════════════════
// GCR — Grammar Correction Realm
// app.js
// ══════════════════════════════════════

// ══════════════════════════════════════
// SENTENCE SURVIVAL — ROUND DATA
// Each round: 10 sentences, exactly 2 are incorrect (isWrong: true)
// ══════════════════════════════════════
const SS_ROUNDS = [
  {
    roundName: "Round 1 — Grammar Fundamentals",
    sentences: [
      { id: 1,  text: "The students completed their homework before the deadline.", isWrong: false },
      { id: 2,  text: "She don't know the answer to the question.", isWrong: true,
        errorType: "Subject-Verb Agreement",
        correction: "She doesn't know the answer to the question.",
        explanation: "'Don't' is used for plural subjects (they, we, you). For third-person singular (she, he, it) use 'doesn't'.",
        keywords: ["doesn't know", "does not know"] },
      { id: 3,  text: "The manager reviewed all the reports carefully.", isWrong: false },
      { id: 4,  text: "They have been working on this project for three months.", isWrong: false },
      { id: 5,  text: "Running down the street, the keys fell out of his pocket.", isWrong: true,
        errorType: "Dangling Modifier",
        correction: "Running down the street, he felt the keys fall out of his pocket.",
        explanation: "The phrase 'Running down the street' must logically connect to the subject. Keys can't run — the sentence needs a human subject like 'he'.",
        keywords: ["he felt", "he dropped", "running down the street, he"] },
      { id: 6,  text: "The conference will begin at nine o'clock tomorrow morning.", isWrong: false },
      { id: 7,  text: "Each of the employees was given a performance review.", isWrong: false },
      { id: 8,  text: "The new policy applies to all members of the department.", isWrong: false },
      { id: 9,  text: "Our team successfully launched the product last quarter.", isWrong: false },
      { id: 10, text: "The committee meets every Tuesday to discuss progress.", isWrong: false }
    ]
  },
  {
    roundName: "Round 2 — Word Choice",
    sentences: [
      { id: 1,  text: "The weather forecast predicts rain for the entire weekend.", isWrong: false },
      { id: 2,  text: "She has less friends now than she did in high school.", isWrong: true,
        errorType: "Less vs. Fewer",
        correction: "She has fewer friends now than she did in high school.",
        explanation: "Use 'fewer' for countable nouns (friends, apples, people). 'Less' is reserved for uncountable nouns (water, time, money).",
        keywords: ["fewer friends"] },
      { id: 3,  text: "Between you and me, the project needs more time.", isWrong: false },
      { id: 4,  text: "The athletes trained hard for the upcoming competition.", isWrong: false },
      { id: 5,  text: "She presented her findings to the board of directors.", isWrong: false },
      { id: 6,  text: "The research team published their results in a peer-reviewed journal.", isWrong: false },
      { id: 7,  text: "He was late to every meeting throughout the entire semester.", isWrong: false },
      { id: 8,  text: "The new policy will be implemented starting next month.", isWrong: false },
      { id: 9,  text: "Our department exceeded its quarterly goals by fifteen percent.", isWrong: false },
      { id: 10, text: "The data shows that less people are reading books then before.", isWrong: true,
        errorType: "Multiple Word Choice Errors",
        correction: "The data show that fewer people are reading books than before.",
        explanation: "'Data' is plural — use 'show'. Use 'fewer' with countable nouns (people). Comparisons require 'than', not 'then'.",
        keywords: ["data show", "fewer people", "than before"] }
    ]
  },
  {
    roundName: "Round 3 — Tense & Clarity",
    sentences: [
      { id: 1,  text: "The team has decided to postpone the meeting until Friday.", isWrong: false },
      { id: 2,  text: "The data show a significant increase in customer satisfaction.", isWrong: false },
      { id: 3,  text: "She was very unique in her approach to problem-solving.", isWrong: true,
        errorType: "Redundancy",
        correction: "She was unique in her approach to problem-solving.",
        explanation: "'Unique' means one of a kind — it is an absolute adjective and cannot be modified with 'very', 'quite', or 'rather'. Simply remove 'very'.",
        keywords: ["she was unique", "unique in her approach"] },
      { id: 4,  text: "The engineer explained the process step by step.", isWrong: false },
      { id: 5,  text: "Neither the manager nor the employees were informed in time.", isWrong: false },
      { id: 6,  text: "The latest report highlights several key areas for improvement.", isWrong: false },
      { id: 7,  text: "He submitted his resignation letter with two weeks' notice.", isWrong: false },
      { id: 8,  text: "All participants must register before the event begins.", isWrong: false },
      { id: 9,  text: "Between you and I, this project is behind schedule.", isWrong: true,
        errorType: "Pronoun Case Error",
        correction: "Between you and me, this project is behind schedule.",
        explanation: "Prepositions like 'between' require object pronouns. 'I' is a subject pronoun; 'me' is the correct object pronoun after 'between'.",
        keywords: ["between you and me"] },
      { id: 10, text: "The company announced record profits for the third consecutive year.", isWrong: false }
    ]
  }
];

// ══════════════════════════════════════
// GLOBAL STATE
// ══════════════════════════════════════
let globalScore = 2847;
let gameMode    = 'practice';

// Sentence Survival state
let ssRoundIndex    = 0;
let ssScore         = 0;
let ssLives         = 3;
let ssSelectedCards = new Set();
let ssWrongIndices  = [];
let ssCorrectQueue  = [];
let ssCorrectionIdx = 0;
let ssTimerInterval = null;
let ssTimeLeft      = 60;

const SS_TIME_PER_CORRECTION = 60;
const MAX_ROUNDS = SS_ROUNDS.length;

// Focus mode state
let fCurrentQ     = 0;
let fScore        = 0;
let fStreak       = 0;
let fBestStreak   = 0;
let fCombo        = 0;
let fCorrectCount = 0;
let fTimeLeft     = 55;
let fTimerInterval = null;
let fQuestionStart = 0;
let fTotalTime    = 0;

const QUESTIONS = [
  {
    sentence: "The team have decided to postponed the meeting until next week due to a scheduling conflict.",
    errorType: "Verb Tense Error",
    correctAnswer: "The team has decided to postpone the meeting until next week.",
    keywords: ["postpone", "has decided"],
    correctFeedback: "Correct! 'Have' → 'has' (team is singular) and 'postponed' → 'postpone' (base verb after 'to').",
    wrongFeedback: "'Have' should be 'has' (team = singular) and 'postponed' should be 'postpone' (infinitive requires the base verb form)."
  },
  {
    sentence: "She was very unique among her peers, being the most unique student in the entire school.",
    errorType: "Redundancy & Wordiness",
    correctAnswer: "She was unique among her peers, being the most distinctive student in the entire school.",
    keywords: ["was unique", "distinctive"],
    correctFeedback: "Excellent! 'Very unique' is redundant — unique is absolute. The second 'unique' was replaced with 'distinctive' to avoid repetition.",
    wrongFeedback: "'Very unique' is redundant — unique cannot be qualified. Remove 'very' and replace the second 'unique' with 'distinctive'."
  },
  {
    sentence: "Between you and I, the new policy effects everyone in the department negative.",
    errorType: "Multiple Errors",
    correctAnswer: "Between you and me, the new policy affects everyone in the department negatively.",
    keywords: ["me", "affects", "negatively"],
    correctFeedback: "Well done! Three fixes: 'I' → 'me' (object pronoun), 'effects' → 'affects' (verb), 'negative' → 'negatively' (adverb).",
    wrongFeedback: "Three errors: 'you and I' → 'you and me' (prepositions take objects), 'effects' → 'affects' (verb form), 'negative' → 'negatively' (adverb)."
  },
  {
    sentence: "The data shows that less people are reading physical books then they were a decade ago.",
    errorType: "Word Choice Error",
    correctAnswer: "The data show that fewer people are reading physical books than they were a decade ago.",
    keywords: ["fewer", "than", "data show"],
    correctFeedback: "Perfect! 'Data' is plural → 'show'; 'less' → 'fewer' (countable noun); 'then' → 'than' (comparison).",
    wrongFeedback: "'Data' is plural → 'show'; use 'fewer' with countable nouns; comparisons use 'than' not 'then'."
  },
  {
    sentence: "Running down the street, the rain began to fall heavily on the parade.",
    errorType: "Dangling Modifier",
    correctAnswer: "As we were running down the street, the rain began to fall heavily on the parade.",
    keywords: ["as we", "we were running"],
    correctFeedback: "Spot on! 'Running down the street' was a dangling modifier — rain can't run. Adding a clear subject fixes it.",
    wrongFeedback: "Dangling modifier: 'Running down the street' has no logical subject. Add a subject like 'we' to clarify who is running."
  }
];

// ══════════════════════════════════════
// PAGE NAVIGATION
// ══════════════════════════════════════
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function startGame(mode) {
  gameMode = mode;
  if (mode === 'practice') {
    startSentenceSurvival();
  } else {
    startFocusMode();
  }
}

// ══════════════════════════════════════
// ══ SENTENCE SURVIVAL ═════════════════
// ══════════════════════════════════════

function startSentenceSurvival() {
  ssRoundIndex = 0;
  ssScore      = 0;
  ssLives      = 3;
  showPage('practice');
  ssLoadRound();
}

function ssLoadRound() {
  clearInterval(ssTimerInterval);
  ssSelectedCards = new Set();

  const round = SS_ROUNDS[ssRoundIndex];

  // Identify the ground-truth wrong sentence indices
  ssWrongIndices = round.sentences
    .map((s, i) => s.isWrong ? i : -1)
    .filter(i => i !== -1);

  // Show identify phase, hide correct phase
  document.getElementById('ss-identify-phase').style.display = '';
  document.getElementById('ss-correct-phase').style.display  = 'none';

  // Reset flip card state
  document.getElementById('ss-flip-inner').classList.remove('flipped');
  document.getElementById('ss-flip-back').classList.remove('wrong-reveal');

  // Update HUD
  document.getElementById('ss-round-label').textContent = round.roundName;
  document.getElementById('ss-score').textContent       = ssScore.toLocaleString();
  ssUpdateLives();
  ssUpdateProgress();

  // Build card grid
  const grid = document.getElementById('ss-card-grid');
  grid.innerHTML = '';
  round.sentences.forEach((s, i) => {
    const card = document.createElement('div');
    card.className   = 'ss-sentence-card';
    card.dataset.index = i;
    card.innerHTML = `
      <div class="ss-card-num">${i + 1}</div>
      <div class="ss-card-text">${s.text}</div>
      <div class="ss-card-check">✓</div>
    `;
    card.addEventListener('click', () => ssToggleCard(i, card));
    grid.appendChild(card);
  });

  document.getElementById('ss-selected-count').textContent = '0 / 2 selected';
  document.getElementById('ss-confirm-btn').disabled = true;
  document.querySelectorAll('.ss-identify-actions button').forEach(b => b.disabled = false);
}

// ── Phase 1: Identify ──

function ssToggleCard(idx, cardEl) {
  if (ssSelectedCards.has(idx)) {
    ssSelectedCards.delete(idx);
    cardEl.classList.remove('selected');
  } else {
    if (ssSelectedCards.size >= 2) {
      showToast('⚠️ You can only select 2 sentences!');
      return;
    }
    ssSelectedCards.add(idx);
    cardEl.classList.add('selected');
  }
  const count = ssSelectedCards.size;
  document.getElementById('ss-selected-count').textContent = `${count} / 2 selected`;
  document.getElementById('ss-confirm-btn').disabled = count < 2;
}

function ssClearSelections() {
  ssSelectedCards.clear();
  document.querySelectorAll('.ss-sentence-card').forEach(c => c.classList.remove('selected'));
  document.getElementById('ss-selected-count').textContent = '0 / 2 selected';
  document.getElementById('ss-confirm-btn').disabled = true;
}

function ssConfirmIdentify() {
  const selected = [...ssSelectedCards];
  const correct  = ssWrongIndices;

  // Reveal each card
  const cards = document.querySelectorAll('.ss-sentence-card');
  cards.forEach((card, i) => {
    const isActuallyWrong = correct.includes(i);
    const wasSelected     = selected.includes(i);

    if (isActuallyWrong && wasSelected) {
      // ✅ Correctly identified
      card.classList.add('reveal-wrong');
      card.querySelector('.ss-card-check').textContent = '✓';
    } else if (isActuallyWrong && !wasSelected) {
      // ❌ Missed a wrong sentence
      card.classList.add('reveal-wrong');
      card.querySelector('.ss-card-check').textContent = '✗';
    } else if (!isActuallyWrong && wasSelected) {
      // ❌ False positive
      card.classList.add('reveal-neutral');
      card.querySelector('.ss-card-check').textContent = '✗';
    } else {
      card.classList.add('reveal-neutral');
    }
  });

  // Calculate identify score and penalties
  const identifyHits = selected.filter(i => correct.includes(i)).length;
  const missedWrong  = correct.filter(i => !selected.includes(i)).length;
  const falsePicks   = selected.filter(i => !correct.includes(i)).length;

  ssScore += identifyHits * 50;
  ssLives  = Math.max(0, ssLives - missedWrong - falsePicks);

  document.getElementById('ss-score').textContent = ssScore.toLocaleString();
  ssUpdateLives();

  // Disable buttons
  document.querySelectorAll('.ss-identify-actions button').forEach(b => b.disabled = true);

  // Queue the actual wrong sentences for correction phase
  ssCorrectQueue  = correct.map(i => SS_ROUNDS[ssRoundIndex].sentences[i]);
  ssCorrectionIdx = 0;

  // Brief pause, then transition
  setTimeout(() => ssStartCorrectionPhase(), 1300);
}

// ── Phase 2: Correct ──

function ssStartCorrectionPhase() {
  document.getElementById('ss-identify-phase').style.display = 'none';
  document.getElementById('ss-correct-phase').style.display  = '';
  ssCorrectionIdx = 0;
  ssLoadCorrectionCard();
}

function ssLoadCorrectionCard() {
  const sentence = ssCorrectQueue[ssCorrectionIdx];
  const total    = ssCorrectQueue.length;

  // Reset flip card
  document.getElementById('ss-flip-inner').classList.remove('flipped');
  document.getElementById('ss-flip-back').classList.remove('wrong-reveal');
  document.getElementById('ss-answer-wrap').style.display = '';
  document.getElementById('ss-next-wrap').style.display   = 'none';
  document.getElementById('ss-answer').value = '';

  // Populate card front
  document.getElementById('ss-wrong-sentence').textContent   = sentence.text;
  document.getElementById('ss-error-type-badge').textContent = sentence.errorType;

  // Update HUD
  document.getElementById('ss-score-2').textContent             = ssScore.toLocaleString();
  document.getElementById('ss-correct-progress-text').textContent =
    `Correcting ${ssCorrectionIdx + 1} of ${total}`;

  ssStartTimer();
}

function ssStartTimer() {
  clearInterval(ssTimerInterval);
  ssTimeLeft = SS_TIME_PER_CORRECTION;
  ssUpdateTimerDisplay();
  ssTimerInterval = setInterval(() => {
    ssTimeLeft--;
    ssUpdateTimerDisplay();
    if (ssTimeLeft <= 0) {
      clearInterval(ssTimerInterval);
      ssTimeOut();
    }
  }, 1000);
}

function ssUpdateTimerDisplay() {
  const pct = (ssTimeLeft / SS_TIME_PER_CORRECTION) * 100;
  document.getElementById('ss-timer').textContent = ssTimeLeft + 's';
  const bar = document.getElementById('ss-timer-bar');
  bar.style.width      = pct + '%';
  bar.style.background = ssTimeLeft <= 15
    ? 'rgba(255,107,107,0.8)'
    : 'rgba(255,255,255,0.6)';
}

function ssTimeOut() {
  ssLives = Math.max(0, ssLives - 1);
  ssUpdateLives();
  ssRevealFlip(false, 0, true);
}

function ssSubmitCorrection() {
  clearInterval(ssTimerInterval);
  const userAnswer = document.getElementById('ss-answer').value.trim().toLowerCase();
  if (!userAnswer) {
    showToast('✏️ Write your correction first!');
    ssStartTimer();
    return;
  }

  const sentence  = ssCorrectQueue[ssCorrectionIdx];
  const isCorrect = sentence.keywords.some(kw => userAnswer.includes(kw.toLowerCase()));
  const pts       = isCorrect ? ssCalcPoints(ssTimeLeft) : 0;

  if (isCorrect) {
    ssScore += pts;
  } else {
    ssLives = Math.max(0, ssLives - 1);
    ssUpdateLives();
  }

  document.getElementById('ss-score-2').textContent = ssScore.toLocaleString();
  ssRevealFlip(isCorrect, pts, false);
}

function ssCalcPoints(timeRemaining) {
  if (timeRemaining >= 45) return 200;
  if (timeRemaining >= 30) return 150;
  if (timeRemaining >= 15) return 100;
  return 60;
}

function ssRevealFlip(isCorrect, pts, timeout) {
  const sentence = ssCorrectQueue[ssCorrectionIdx];
  const backEl   = document.getElementById('ss-flip-back');
  const backTag  = document.getElementById('ss-back-tag');

  if (isCorrect) {
    backEl.classList.remove('wrong-reveal');
    backTag.textContent = '✅ Correct!';
  } else {
    backEl.classList.add('wrong-reveal');
    backTag.textContent = timeout ? '⏰ Time\'s Up!' : '✗ Incorrect';
  }

  document.getElementById('ss-back-answer').textContent      = sentence.correction;
  document.getElementById('ss-back-explanation').textContent = sentence.explanation;
  document.getElementById('ss-back-points').textContent      = isCorrect ? `+${pts} pts` : '+0 pts';

  // Flip!
  document.getElementById('ss-flip-inner').classList.add('flipped');

  // Swap UI
  document.getElementById('ss-answer-wrap').style.display = 'none';
  document.getElementById('ss-next-wrap').style.display   = '';

  // Set next button label
  const isLastCorrection = ssCorrectionIdx >= ssCorrectQueue.length - 1;
  const isLastRound      = ssRoundIndex >= MAX_ROUNDS - 1;
  const btn = document.getElementById('ss-next-btn');
  if (isLastCorrection && isLastRound) {
    btn.textContent = '🏁 Finish Game';
  } else if (isLastCorrection) {
    btn.textContent = '▶ Next Round';
  } else {
    btn.textContent = 'Next Sentence →';
  }

  spawnParticles(isCorrect);
}

function ssNext() {
  if (ssLives <= 0) { ssEndGame(false); return; }

  ssCorrectionIdx++;
  if (ssCorrectionIdx >= ssCorrectQueue.length) {
    ssRoundIndex++;
    if (ssRoundIndex >= MAX_ROUNDS) {
      ssEndGame(true);
    } else {
      showToast(`✅ Round complete! Loading Round ${ssRoundIndex + 1}…`);
      setTimeout(ssLoadRound, 900);
    }
  } else {
    ssLoadCorrectionCard();
  }
}

function ssUpdateLives() {
  const hearts = [0, 1, 2].map(i => i < ssLives ? '❤️' : '🖤').join('');
  document.getElementById('ss-lives').textContent = hearts;
}

function ssUpdateProgress() {
  const pct = (ssRoundIndex / MAX_ROUNDS) * 100;
  document.getElementById('ss-progress-fill').style.width = pct + '%';
}

function ssEndGame(won) {
  clearInterval(ssTimerInterval);
  globalScore += ssScore;
  document.getElementById('dash-score').textContent    = globalScore.toLocaleString();
  document.getElementById('lb-your-score').textContent = globalScore.toLocaleString();

  document.getElementById('r-score').textContent    = ssScore.toLocaleString();
  document.getElementById('r-accuracy').textContent = `${ssLives}/3 lives`;
  document.getElementById('r-streak').textContent   = won ? '🏆 Completed!' : '💀 Game Over';
  document.getElementById('r-time').textContent     = `${Math.min(ssRoundIndex + 1, MAX_ROUNDS)} / ${MAX_ROUNDS} rounds`;

  document.getElementById('r-play-again').onclick = () => startGame('practice');
  showPage('results');
}

// ══════════════════════════════════════
// ══ FOCUS MODE ════════════════════════
// ══════════════════════════════════════

function startFocusMode() {
  fCurrentQ    = 0; fScore = 0; fStreak = 0; fBestStreak = 0;
  fCombo = 0; fCorrectCount = 0; fTotalTime = 0;
  showPage('focus');
  fLoadQuestion();
  fStartTimer();
}

function fStartTimer() {
  clearInterval(fTimerInterval);
  fTimeLeft      = 55;
  fQuestionStart = Date.now();
  fUpdateTimerDisplay();
  fTimerInterval = setInterval(() => {
    fTimeLeft--;
    fUpdateTimerDisplay();
    if (fTimeLeft <= 0) { clearInterval(fTimerInterval); fAutoTimeOut(); }
  }, 1000);
}

function fUpdateTimerDisplay() {
  const min = Math.floor(fTimeLeft / 60);
  const sec = fTimeLeft % 60;
  document.getElementById('f-timer').textContent = `${min}:${sec.toString().padStart(2, '0')}`;
}

function fAutoTimeOut() {
  fStreak = 0; fCombo = 0;
  fShowFeedback(false, null, 0, true);
}

function fLoadQuestion() {
  if (fCurrentQ >= QUESTIONS.length) { fEndGame(); return; }
  const q = QUESTIONS[fCurrentQ];
  document.getElementById('f-counter').textContent  = `Question ${fCurrentQ + 1} of ${QUESTIONS.length}`;
  document.getElementById('f-qtype').textContent    = q.errorType;
  document.getElementById('f-sentence').textContent = q.sentence;
  document.getElementById('f-answer').value         = '';
  document.getElementById('f-score').textContent    = fScore.toLocaleString();
}

function fSubmitAnswer() {
  const userAnswer = document.getElementById('f-answer').value.trim().toLowerCase();
  if (!userAnswer) { showToast('✏️ Please write an answer first!'); return; }
  clearInterval(fTimerInterval);
  const elapsed = Math.round((Date.now() - fQuestionStart) / 1000);
  fTotalTime += elapsed;

  const q = QUESTIONS[fCurrentQ];
  const isCorrect = q.keywords.some(kw => userAnswer.includes(kw.toLowerCase()));
  const pts = isCorrect ? (elapsed <= 10 ? 150 : elapsed <= 20 ? 120 : elapsed <= 35 ? 90 : 60) : 0;

  if (isCorrect) {
    fStreak++; fCombo = Math.min(fCombo + 1, 5); fCorrectCount++;
    if (fStreak > fBestStreak) fBestStreak = fStreak;
    fScore += pts * fCombo;
  } else { fStreak = 0; fCombo = 0; }

  document.getElementById('f-score').textContent = fScore.toLocaleString();
  fShowFeedback(isCorrect, q, pts, false);
}

function fShowFeedback(isCorrect, q, pts, timeout) {
  const overlay = document.getElementById('feedback-overlay');
  const card    = document.getElementById('feedback-card');
  const icon    = document.getElementById('fb-icon');
  const title   = document.getElementById('fb-title');
  const points  = document.getElementById('fb-points');
  const reason  = document.getElementById('fb-reason');

  if (timeout) {
    icon.textContent = '⏰'; title.textContent = "Time's Up!";
    points.textContent = '+0 pts';
    reason.textContent = 'You ran out of time. ' + (q ? q.wrongFeedback : 'Keep practicing!');
    card.className = 'feedback-card wrong';
  } else if (isCorrect) {
    icon.textContent = '✨'; title.textContent = 'Correct!';
    points.textContent = `+${(pts * fCombo).toLocaleString()} pts` + (fCombo > 1 ? ` (×${fCombo})` : '');
    reason.textContent = q.correctFeedback;
    card.className = 'feedback-card correct';
    spawnParticles(true);
  } else {
    icon.textContent = '✗'; title.textContent = 'Not Quite';
    points.textContent = '+0 pts';
    reason.textContent = q.wrongFeedback;
    card.className = 'feedback-card wrong';
  }
  overlay.classList.add('show');
}

function fEndGame() {
  clearInterval(fTimerInterval);
  const accuracy = Math.round((fCorrectCount / QUESTIONS.length) * 100);
  const avgTime  = Math.round(fTotalTime / QUESTIONS.length);
  globalScore += fScore;
  document.getElementById('r-score').textContent       = fScore.toLocaleString();
  document.getElementById('r-accuracy').textContent    = accuracy + '%';
  document.getElementById('r-streak').textContent      = fBestStreak;
  document.getElementById('r-time').textContent        = avgTime + 's';
  document.getElementById('dash-score').textContent    = globalScore.toLocaleString();
  document.getElementById('lb-your-score').textContent = globalScore.toLocaleString();
  document.getElementById('r-play-again').onclick = () => startGame('focus');
  showPage('results');
}

// ══════════════════════════════════════
// PARTICLES
// ══════════════════════════════════════
function spawnParticles(isCorrect) {
  if (!isCorrect) return;
  const colors    = ['#7c5cfc', '#fc5c7d', '#3effa0', '#ffd166', '#4dabf7'];
  const container = document.createElement('div');
  container.className = 'particles';
  document.body.appendChild(container);
  for (let i = 0; i < 16; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const angle = (i / 16) * Math.PI * 2;
    const dist  = 60 + Math.random() * 80;
    p.style.cssText = `
      left:50%;top:40%;
      background:${colors[i % colors.length]};
      --tx:${Math.cos(angle) * dist}px;
      --ty:${Math.sin(angle) * dist}px;
      animation-delay:${Math.random() * 0.1}s;
    `;
    container.appendChild(p);
  }
  setTimeout(() => container.remove(), 1000);
}

// ══════════════════════════════════════
// TOAST
// ══════════════════════════════════════
function showToast(msg) {
  const t = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

// ══════════════════════════════════════
// EVENT LISTENERS
// ══════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {

  // Sentence Survival
  document.getElementById('ss-submit-btn').addEventListener('click', ssSubmitCorrection);
  document.getElementById('ss-clear-btn').addEventListener('click', () => {
    document.getElementById('ss-answer').value = '';
    document.getElementById('ss-answer').focus();
  });
  document.getElementById('ss-next-btn').addEventListener('click', ssNext);
  document.getElementById('ss-answer').addEventListener('keydown', e => {
    if (e.key === 'Enter' && e.ctrlKey) ssSubmitCorrection();
  });

  // Focus Mode
  document.getElementById('f-submit').addEventListener('click', fSubmitAnswer);
  document.getElementById('f-clear').addEventListener('click', () => {
    document.getElementById('f-answer').value = '';
    document.getElementById('f-answer').focus();
  });
  document.getElementById('f-answer').addEventListener('keydown', e => {
    if (e.key === 'Enter' && e.ctrlKey) fSubmitAnswer();
  });

  // Shared feedback overlay Next button (Focus Mode only)
  document.getElementById('fb-next').addEventListener('click', () => {
    document.getElementById('feedback-overlay').classList.remove('show');
    fCurrentQ++;
    if (fCurrentQ >= QUESTIONS.length) { fEndGame(); }
    else { fLoadQuestion(); fStartTimer(); }
  });
});