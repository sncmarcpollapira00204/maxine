// JAVASCRIPT FOR VALENTINE'S DAY SURPRISE // - LUPIN

const pages = document.querySelectorAll(".page");
const envelope = document.getElementById("openEnvelope");
const continueBtn = document.getElementById("continueBtn");
const passwordInput = document.getElementById("passwordInput");
const errorMessage = document.getElementById("errorMessage");
const nextBtns = document.querySelectorAll(".nextBtn");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

// PROJECT - MAXINE


function showPage(id) {
  pages.forEach(page => {
    page.classList.remove("active");
  });

  const targetPage = document.getElementById(id);

  if (targetPage) {
    targetPage.classList.add("active");
    window.scrollTo(0, 0); 

    // 
    if (id === "page8") {
      setTimeout(() => {
        revealMasonry();
      }, 100);
    }
  }
}


// PAGE 1 - OPEN ENVELOPE

if (envelope) {
  envelope.addEventListener("click", () => {
    envelope.classList.add("opening");

    setTimeout(() => {
      showPage("page2");
      envelope.classList.remove("opening");
    }, 600);
  });
}


// PASSWORD

const correctPassword = "EMALAYNA";

// ERROR TEXT
const errorMessages = [
  "Ngek mali baby 🥺",
  "Nako mali ulit 😭",
  "Jusko baby sa Valentine’s nalang talaga 😩"
];

let attemptIndex = 0;

if (continueBtn) {
  continueBtn.addEventListener("click", () => {

    // 
    const enteredPassword = passwordInput.value.trim().toUpperCase();

    // = CORRECT PASSWORD = //
    if (enteredPassword === correctPassword) {

      // 
      const dearName = document.getElementById("dearName");
      if (dearName) {
        dearName.textContent = "Happy Valentine’s Day, Baby 💖";
      }

      errorMessage.textContent = "";
      attemptIndex = 0;
      showPage("page3");

      // HEART ANIMATION STARTS ONLY AFTER PASSWORD SUCCESS
      startHearts();

    } 
    // ===== WRONG PASSWORD =====
    else {

      // CYCLE THROUGH ERROR MESSAGES
      errorMessage.textContent = errorMessages[attemptIndex];
      attemptIndex = (attemptIndex + 1) % errorMessages.length;

      // SHAKE EFFECT FOR WRONG PASSWORD
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


// CONTINUE BUTTONS ON PAGES 3 & 4

nextBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const nextPageId = btn.dataset.next;
    if (nextPageId) showPage(nextPageId);
  });
});


// YES BUTTON

if (yesBtn) {
  yesBtn.addEventListener("click", () => {
    showPage("page5");
  });
}




function moveNo() {

  if (!noBtn) return;

// NO BUTTON MOVEMENT LOGIC:
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

// 
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

// HEART ANIMATION STARTS ONLY AFTER PASSWORD SUCCESS
function startHearts() {
  setInterval(createFloatingHeart, 800);
}


// 
function revealMasonry() {
  const items = document.querySelectorAll(".masonry-item");

  items.forEach(item => {
    const rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      item.classList.add("show");
    }
  });
}

//PAGE 8 - Trigger masonry reveal on scroll
const page8 = document.getElementById("page8");
if (page8) {
  page8.addEventListener("scroll", revealMasonry);
}