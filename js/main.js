/*==================== BUTTON CURSOR GLOW ====================*/
document.querySelectorAll('.button').forEach((btn) => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    btn.style.setProperty('--btn-x', (e.clientX - rect.left) + 'px');
    btn.style.setProperty('--btn-y', (e.clientY - rect.top) + 'px');
  });
});

/*==================== MENU SHOW & HIDDEN ====================*/

/*===== MENU SHOW =====*/
const navMenu = document.querySelector('.nav-menu'),
  navToggle = document.querySelector('.nav-toggle'),
  navClose = document.querySelector('.nav-close');

/* Show menu */
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu');
  });
}

/*===== MENU HIDDEN =====*/
if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
  });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
  });
});


const scrollHeader = () => {
  const header = document.getElementById('header');

  if (!header) return;

  window.scrollY >= 20
    ? header.classList.add('scroll-header')
    : header.classList.remove('scroll-header');
};

window.addEventListener('scroll', scrollHeader);

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/

const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 59,
      sectionId = current.getAttribute('id'),
      sectionClass = document.querySelector(
        '.nav-menu a[href*="' + sectionId + '"]'
      );

    if (!sectionClass) return;

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      sectionClass.classList.add('active-link');
    } else {
      sectionClass.classList.remove('active-link');
    }
  });
};

window.addEventListener('scroll', scrollActive);

/*==================== SCROLL ABOUT ANIMATION ====================*/
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('.text-gradient').forEach((span) => {
  gsap.to(span, {
    backgroundSize: '100% 100%',
    scrollTrigger: {
      trigger: span,
      start: 'top bottom',
      end: 'top center',
      scrub: true,
    },
  });
});

/*==================== DARK LIGHT THEME ====================*/

window.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme');

  if (!toggleBtn) return;

  function applyTheme(theme) {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
      toggleBtn.classList.remove('ri-sun-line');
      toggleBtn.classList.add('ri-moon-line');
    } else {
      document.body.classList.remove('light-theme');
      toggleBtn.classList.add('ri-sun-line');
      toggleBtn.classList.remove('ri-moon-line');
    }

    localStorage.setItem('theme', theme);
  }

  applyTheme(savedTheme || 'dark');

  toggleBtn.addEventListener('click', () => {
    const isLight = document.body.classList.contains('light-theme');
    applyTheme(isLight ? 'dark' : 'light');
  });
});


/*==================== SCROLL REVEAL ANIMATION ====================*/

gsap.timeline({ defaults: { duration: 1, ease: 'power2.out' } })
  .from('.home-data', { y: 32, opacity: 0, delay: 0.35 })
  .from('.home-img-wrapper', { y: 32, opacity: 0, duration: 1.05 }, '-=0.72')
  .from('.home-social', { y: 24, opacity: 0, duration: 0.9 }, '-=0.82');

gsap.timeline({
  defaults: { duration: 1.15, ease: 'power2.out' },
  scrollTrigger: {
    trigger: '.contact-container',
    start: 'top 78%',
  },
})
  .from('.contact-group', { x: -56, opacity: 0 })
  .from('.contact-form', { x: 56, opacity: 0 }, '-=0.9');


/*=========================================================================== ABOUT SECTION ======================================================================================*/


/*==================== Hover Video Animation ====================*/
const blob = document.querySelector('.about-experience');
const video = document.querySelector('.blob-video');

if (blob && video) {
  blob.addEventListener('mouseenter', () => {
    video.currentTime = 0;   // start fresh
    video.play().catch(() => { });
  });

  blob.addEventListener('mouseleave', () => {
    video.pause();
    video.currentTime = 0;   // reset
  });
}

/*=========================================================================== SERVICES SECTION ======================================================================================*/


/*==================== SCROLL REVEAL FOR SERVICES SECTION ====================*/

const reveals = document.querySelectorAll('.reveal, .work-card');

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  reveals.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);

/*=========================================================================== SKILLS SECTION ======================================================================================*/


/*==================== SCROLL ANIMATION FOR SKILLS SECTION ====================*/

/* Bar filling animation */
document.addEventListener("DOMContentLoaded", () => {

  const section = document.querySelector('.skills');
  const skills = document.querySelectorAll('.skill-fill');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

      if (entry.isIntersecting) {

        // small delay for smoother feel
        setTimeout(() => {
          skills.forEach((skill) => {
            const level = skill.dataset.level;
            skill.style.width = level + '%';
          });
        }, 200);

        observer.disconnect(); // run only once
      }

    });
  }, {
    threshold: 0.45,
    rootMargin: "0px 0px -100px 0px"
  });

  observer.observe(section);

});

/* 3-D tilt effect */

document.querySelectorAll('.card-wrap').forEach((wrap) => {
  const card = wrap.querySelector('.skill-card');

  wrap.addEventListener('mousemove', (e) => {
    const rect = wrap.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const midX = rect.width / 2;
    const midY = rect.height / 2;

    const rotateY = ((x - midX) / midX) * 6;  // max 6deg
    const rotateX = ((midY - y) / midY) * 6;

    card.style.transform = `
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.02)
    `;
  });

  wrap.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
  });
});

/* Cursor glow reactive */

document.querySelectorAll('.card-wrap').forEach((wrap) => {
  const card = wrap.querySelector('.skill-card');

  wrap.addEventListener('mousemove', (e) => {
    const rect = wrap.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    /* 🔥 TILT */
    const midX = rect.width / 2;
    const midY = rect.height / 2;

    const rotateY = ((x - midX) / midX) * 6;
    const rotateX = ((midY - y) / midY) * 6;

    card.style.transform = `
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.02)
    `;

    /* 🔥 GLOW POSITION (behind card) */
    wrap.style.setProperty('--x', x + 'px');
    wrap.style.setProperty('--y', y + 'px');
  });

  wrap.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    wrap.classList.remove('is-touch-active', 'is-resetting');
    wrap.style.setProperty('--x', '50%');
    wrap.style.setProperty('--y', '50%');
  });

  wrap.addEventListener('touchstart', (e) => {
    const rect = wrap.getBoundingClientRect();
    const touch = e.touches[0];

    wrap.classList.remove('is-resetting');
    wrap.classList.add('is-touch-active');

    if (touch) {
      wrap.style.setProperty('--x', (touch.clientX - rect.left) + 'px');
      wrap.style.setProperty('--y', (touch.clientY - rect.top) + 'px');
    }
  });

  // Reset touch glow with the card so mobile hover does not linger.
  wrap.addEventListener('touchend', () => {
    setTimeout(() => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
      wrap.classList.remove('is-touch-active');
      wrap.classList.add('is-resetting');
      wrap.style.setProperty('--x', '50%');
      wrap.style.setProperty('--y', '50%');

      // Temporarily disable pointer events to clear sticky CSS :hover state
      wrap.style.pointerEvents = 'none';
      setTimeout(() => {
        wrap.style.pointerEvents = '';
        wrap.classList.remove('is-resetting');
      }, 50);
    }, 400);
  });
});

/* Scroll trigger animation */

document.addEventListener("DOMContentLoaded", () => {

  const reveals = document.querySelectorAll(".reveal, .work-card");

  function revealOnScroll() {
    const windowHeight = window.innerHeight;

    reveals.forEach((el) => {
      const elementTop = el.getBoundingClientRect().top;

      if (elementTop < windowHeight - 80) {
        el.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);

  // run once
  revealOnScroll();

});

/*=========================================================================== MY(J/E) SECTION ======================================================================================*/

const options = document.querySelectorAll('.toggle-option');
const slider = document.querySelector('.toggle-slider');

options.forEach((option, index) => {
  option.addEventListener('click', () => {

    // remove active
    options.forEach(o => o.classList.remove('active'));

    // add active
    option.classList.add('active');

    // move slider
    slider.style.transform = `translateX(${index * 100}%)`;

  });
});

/*== SCROLL TRIGGER  ==*/

/* ================= TIMELINE + TOGGLE (FINAL) ================= */

document.addEventListener("DOMContentLoaded", () => {

  const options = document.querySelectorAll(".toggle-option");
  const slider = document.querySelector(".toggle-slider");

  const education = document.querySelector(".education-timeline");
  const journey = document.querySelector(".journey-timeline");

  const timelines = document.querySelectorAll(".timeline");

  /* 🔥 SCROLL ANIMATION (SAFE) */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("active");

        const items = entry.target.querySelectorAll(".reveal");

        items.forEach((el, index) => {
          setTimeout(() => {
            el.classList.add("active");
          }, index * 200);
        });

      } else {

        entry.target.classList.remove("active");

        const items = entry.target.querySelectorAll(".reveal");
        items.forEach(el => el.classList.remove("active"));
      }

    });
  }, { threshold: 0.3 });

  timelines.forEach(tl => observer.observe(tl));

  /* 🔥 TOGGLE SWITCH */
  options.forEach((option, index) => {
    option.addEventListener("click", () => {

      slider.style.transform = `translateX(${index * 100}%)`;

      options.forEach(opt => opt.classList.remove("active"));
      option.classList.add("active");

      if (option.dataset.target === "education") {

        journey.style.display = "none";
        education.style.display = "block";

      } else {

        education.style.display = "none";
        journey.style.display = "block";
      }

    });
  });

  /* 🔥 INITIAL STATE FIX */
  education.style.display = "none";
  journey.style.display = "block";
});

/* ================= HEADER ANIMATION ================= */

document.addEventListener("DOMContentLoaded", () => {

  const header = document.querySelector(".lift-in");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

      if (entry.isIntersecting) {
        header.classList.add("active");
      } else {
        header.classList.remove("active"); // 🔥 reset
      }

    });
  }, { threshold: 0.3 });

  observer.observe(header);

});


/*======================================================================================== EMAIL JS ============================================================================================*/

const contactForm = document.getElementById('contact-form'),
  contactName = document.getElementById('contact-name'),
  contactEmail = document.getElementById('contact-email'),
  contactMessage = document.getElementById('contact-message'),
  message = document.getElementById('message');

const sendEmail = (e) => {
  e.preventDefault();

  if (
    contactName.value === '' ||
    contactEmail.value === '' ||
    contactMessage.value === ''
  ) {
    message.textContent = 'Write all the input fields';

    setTimeout(() => {
      message.textContent = ''
    }, 3000);
  } else {
    emailjs
      .sendForm(
        'service_6wicwdc',
        'template_1euokaz',
        '#contact-form',
        'v3YfN5TKrnIXDbHMn')
      .then(
        () => {
          message.textContent = 'Message sent ✔';

          setTimeout(() => {
            message.textContent = ''
          }, 5000);
        },
        (error) => {
          alert('OOPs! SOMETHING WENT WRONG...', error);
        }
      );

    contactName.value = '';
    contactEmail.value = '';
    contactMessage.value = '';
  }
};

contactForm.addEventListener('submit', sendEmail);

/*==================================================================================== PORTFOLIO SECTION ========================================================================*/

function refreshPortfolioCards() {
  const viewportBottom = window.innerHeight + 80;

  document.querySelectorAll('.mix').forEach((item) => {
    const card = item.querySelector('.work-card');
    if (!card) return;

    const isVisible = window.getComputedStyle(item).display !== 'none';
    const cardTop = card.getBoundingClientRect().top;

    if (isVisible && cardTop < viewportBottom) {
      card.classList.add('active');
    }
  });
}

/*==================== MIXITUP FILTER ====================*/
var mixer = mixitup('.work-container', {
  selectors: {
    target: '.mix'
  },
  animation: {
    enable: true,
    duration: 240,
    effects: 'fade translateY(6px)',
    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
  },
  callbacks: {
    onMixEnd: function() {
      requestAnimationFrame(refreshPortfolioCards);

      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    }
  }
});

/*==================== ACTIVE + SLIDER ====================*/

const workItems = document.querySelectorAll('.work-item');
const filterSlider = document.querySelector('.filter-slider');
const workList = document.querySelector('.work-list');

const updateFilterSlider = (target) => {
  if (!filterSlider || !target || !workList) return;

  const sliderInset = parseFloat(window.getComputedStyle(filterSlider).left) || 4;
  const offset = target.offsetLeft - sliderInset;

  filterSlider.style.width = `${target.offsetWidth}px`;
  filterSlider.style.transform = `translateX(${offset}px)`;
};

workItems.forEach((btn) => {
  btn.addEventListener('click', function () {
    workItems.forEach((el) => el.classList.remove('active-work'));
    this.classList.add('active-work');
    requestAnimationFrame(() => updateFilterSlider(this));
  });
});

/*==================== INITIAL POSITION ====================*/

window.addEventListener("load", () => {
  const active = document.querySelector('.work-item.active-work');

  updateFilterSlider(active);
  refreshPortfolioCards();
});

window.addEventListener("resize", () => {
  const active = document.querySelector('.work-item.active-work');
  updateFilterSlider(active);
});

if (workList) {
  workList.addEventListener('scroll', () => {
    const active = document.querySelector('.work-item.active-work');
    requestAnimationFrame(() => updateFilterSlider(active));
  }, { passive: true });
}

/*==================== PROJECT MEDIA MODAL ====================*/
const videoModal = document.getElementById('video-modal');
const videoModalPlayer = document.getElementById('video-modal-player');
const imageModalPlayer = document.getElementById('image-modal-player');
const videoModalClose = document.getElementById('video-modal-close');
let isVideoModalOpen = false;
let ignorePopstate = false;

const workMediaLinks = document.querySelectorAll('.work-link[data-video], .work-link[data-image]');

function openMediaModal({ videoSource, imageSource }) {
  if (!videoModal || !videoModalPlayer || !imageModalPlayer) return;

  videoModalPlayer.pause();
  videoModalPlayer.removeAttribute('src');
  videoModalPlayer.load();
  imageModalPlayer.removeAttribute('src');
  imageModalPlayer.style.display = 'none';
  videoModalPlayer.style.display = 'none';

  if (videoSource) {
    const onMetadata = () => {
      const isPortrait = videoModalPlayer.videoHeight > videoModalPlayer.videoWidth;

      videoModal.classList.toggle('portrait', isPortrait);
      videoModal.classList.toggle('landscape', !isPortrait);
    };

    videoModal.classList.remove('portrait', 'landscape');
    videoModal.classList.add('landscape');

    videoModalPlayer.style.display = 'block';
    videoModalPlayer.src = videoSource;
    videoModalPlayer.muted = false;
    videoModalPlayer.currentTime = 0;
    videoModalPlayer.addEventListener('loadedmetadata', onMetadata, { once: true });
    videoModalPlayer.load();
    videoModalPlayer.play().catch(() => { });
  } else if (imageSource) {
    videoModal.classList.remove('portrait', 'landscape');
    videoModal.classList.add('landscape');

    imageModalPlayer.style.display = 'block';
    imageModalPlayer.src = imageSource;
    imageModalPlayer.alt = 'Project preview image';
  } else {
    return;
  }

  videoModal.classList.add('active');
  isVideoModalOpen = true;
  history.pushState({ videoModal: true }, '', window.location.href);
}

function closeVideoModal(useHistory = true) {
  if (!videoModal || !videoModalPlayer || !imageModalPlayer || !isVideoModalOpen) return;

  videoModalPlayer.pause();
  videoModalPlayer.removeAttribute('src');
  videoModalPlayer.load();
  imageModalPlayer.removeAttribute('src');
  imageModalPlayer.style.display = 'none';
  videoModalPlayer.style.display = 'none';

  videoModal.classList.remove('active');
  isVideoModalOpen = false;

  if (useHistory && window.history.state && window.history.state.videoModal) {
    ignorePopstate = true;
    history.back();
  }
}

if (videoModalPlayer) {
  videoModalPlayer.addEventListener('ended', () => {
    closeVideoModal();
  });
}

workMediaLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    openMediaModal({
      videoSource: link.dataset.video,
      imageSource: link.dataset.image,
    });
  });
});

if (videoModal) {
  videoModal.addEventListener('click', (event) => {
    if (event.target === videoModal || event.target === videoModalClose) {
      closeVideoModal();
    }
  });
}

document.addEventListener('keydown', (event) => {
  if (!isVideoModalOpen) return;
  if (event.key === 'Escape' || event.key === 'Backspace') {
    closeVideoModal();
  }
});

window.addEventListener('popstate', () => {
  if (ignorePopstate) {
    ignorePopstate = false;
    return;
  }

  if (isVideoModalOpen) {
    closeVideoModal(false);
  }
});

