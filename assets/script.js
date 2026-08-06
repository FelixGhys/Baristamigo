// Mobiel menu
function toggleNav() {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  var isOpen = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

document.addEventListener('click', function (e) {
  var links = document.querySelector('.nav-links');
  var toggle = document.querySelector('.nav-toggle');
  if (!links || !links.classList.contains('open')) return;
  if (links.contains(e.target) || toggle.contains(e.target)) return;
  links.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
});

// Offerte-modal
function openQuoteModal(e) {
  if (e) e.preventDefault();
  document.getElementById('quoteModalBackdrop').classList.add('open');
  goToQuoteStep(1);
}

function closeQuoteModal() {
  document.getElementById('quoteModalBackdrop').classList.remove('open');
}

function goToQuoteStep(step) {
  document.querySelectorAll('.quote-modal__step').forEach(function (el) {
    el.classList.toggle('active', el.dataset.step == step);
  });
}

// Netlify Forms: verstuurt een formulier via AJAX zodat de pagina niet herlaadt
function submitNetlifyForm(form, callback) {
  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(new FormData(form)).toString()
  })
    .then(function () { callback(true); })
    .catch(function () { callback(false); });
}

document.addEventListener('DOMContentLoaded', function () {
  var backdrop = document.getElementById('quoteModalBackdrop');
  if (backdrop) {
    backdrop.addEventListener('click', function (e) {
      if (e.target === this) closeQuoteModal();
    });
  }

  // Offerte-formulier (2-staps modal)
  var quoteForm = document.getElementById('quoteForm');
  if (quoteForm) {
    quoteForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var activeStep = quoteForm.querySelector('.quote-modal__step.active');
      if (activeStep && activeStep.dataset.step === '1') {
        goToQuoteStep(2);
        return;
      }
      submitNetlifyForm(quoteForm, function (ok) {
        if (ok) {
          quoteForm.reset();
          goToQuoteStep('success');
        } else {
          alert('Er ging iets mis bij het verzenden. Probeer het opnieuw of mail naar info@matubu.be.');
        }
      });
    });
  }

  // Contactformulieren (homepage + contactpagina)
  document.querySelectorAll('.contact-form').forEach(function (form) {
    var successEl = form.parentElement.querySelector('.contact-form__success');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      form.classList.add('is-submitting');
      submitNetlifyForm(form, function (ok) {
        if (ok) {
          form.reset();
          // display:none via inline style, want .contact-form heeft elders
          // een class-based `display: flex` die zwaarder weegt dan [hidden]
          form.style.display = 'none';
          if (successEl) {
            successEl.hidden = false;
            requestAnimationFrame(function () {
              successEl.classList.add('is-visible');
            });
          }
        } else {
          form.classList.remove('is-submitting');
          alert('Er ging iets mis bij het verzenden. Probeer het opnieuw of mail naar info@matubu.be.');
        }
      });
    });
  });
});

// Transparante header wordt ondoorzichtig zodra de hero uit beeld scrolt
(function () {
  var hero = document.querySelector('.hero');
  var header = document.querySelector('header');
  if (!hero || !header) return;

  var toggle = function () {
    header.classList.toggle('is-scrolled', window.scrollY > hero.offsetHeight - 80);
  };

  toggle();
  window.addEventListener('scroll', toggle, { passive: true });
})();
