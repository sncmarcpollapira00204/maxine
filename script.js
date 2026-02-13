// ========================================
// ===== ELEMENT SELECTORS =====
// ========================================

const pages = document.querySelectorAll(".page");
const envelope = document.getElementById("openEnvelope");
const continueBtn = document.getElementById("continueBtn");
const passwordInput = document.getElementById("passwordInput");
const errorMessage = document.getElementById("errorMessage");
const nextBtns = document.querySelectorAll(".nextBtn");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");


// ========================================
// ===== PAGE NAVIGATION FUNCTION =====
// ========================================

function showPage(id) {
  pages.forEach(page => {
    page.classList.remove("active");
  });

  const targetPage = document.getElementById(id);

  if (targetPage) {
    targetPage.classList.add("active");
    window.scrollTo(0, 0);

    // 🔥 ADD THIS PART
    if(id === "page8"){
      setTimeout(() => {
        revealMasonry();
      }, 100);
    }
  }
}

// ========================================
// ===== PAGE 1 → OPEN ENVELOPE =====
// ========================================

if (envelope) {
  envelope.addEventListener("click", () => {
    envelope.classList.add("opening");

    setTimeout(() => {
      showPage("page2");
      envelope.classList.remove("opening");
    }, 600);
  });
}



// ========================================
// ===== PASSWORD SYSTEM =====
// ========================================

const correctPassword = "EMALAYNA";

const errorMessages = [
  "Ngek mali baby 🥺",
  "Nako mali ulit 😭",
  "Jusko baby sa Valentine’s nalang talaga 😩"
];

let attemptIndex = 0;

if (continueBtn) {
  continueBtn.addEventListener("click", () => {

    const enteredPassword = passwordInput.value.trim().toUpperCase();

    // ===== CORRECT PASSWORD =====
    if (enteredPassword === correctPassword) {

      const dearName = document.getElementById("dearName");
      if (dearName) {
        dearName.textContent = "Happy Valentine’s Day, Baby 💖";
      }

      errorMessage.textContent = "";
      attemptIndex = 0;
      showPage("page3");
      startHearts();

    } 
    // ===== WRONG PASSWORD =====
    else {

      errorMessage.textContent = errorMessages[attemptIndex];
      attemptIndex = (attemptIndex + 1) % errorMessages.length;

      passwordInput.classList.add("shake");

      setTimeout(() => {
        passwordInput.classList.remove("shake");
        passwordInput.value = "";
        passwordInput.focus();
        errorMessage.textContent = "";
      }, 1200);
    }

  });
}


// ========================================
// ===== GENERIC NEXT BUTTONS =====
// ========================================

nextBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const nextPageId = btn.dataset.next;
    if (nextPageId) showPage(nextPageId);
  });
});


// ========================================
// ===== YES BUTTON NAVIGATION =====
// ========================================

if (yesBtn) {
  yesBtn.addEventListener("click", () => {
    showPage("page5");
  });
}


// ========================================
// ===== MOVING NO BUTTON (STABLE VERSION)
// ========================================
// Uses transform so YES never shifts

function moveNo() {

  if (!noBtn) return;

  // Adjust these numbers if you want more chaos
  const maxX = 300; 
  const maxY = 150;

  const randomX = (Math.random() - 0.5) * maxX;
  const randomY = (Math.random() - 0.5) * maxY;

  noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

if (noBtn) {
  noBtn.addEventListener("mouseenter", moveNo);
  noBtn.addEventListener("touchstart", moveNo);
}

const heartOverlay = document.getElementById("heartOverlay");

function createFloatingHeart() {
  const heart = document.createElement("div");
  heart.classList.add("floatingHeart");
  heart.innerHTML = "❤️";

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 15 + 15 + "px";

  heartOverlay.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 6000);
}

/* Start hearts only after password correct */
function startHearts() {
  setInterval(createFloatingHeart, 800);
}

// ===== Masonry Animation on Scroll =====

function revealMasonry(){
  const items = document.querySelectorAll(".masonry-item");

  items.forEach(item => {
    const rect = item.getBoundingClientRect();
    if(rect.top < window.innerHeight - 50){
      item.classList.add("show");
    }
  });
}

const page8 = document.getElementById("page8");
if(page8){
  page8.addEventListener("scroll", revealMasonry);
}
