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

function submitQuoteForm() {
  goToQuoteStep('success');
}

document.addEventListener('DOMContentLoaded', function () {
  var backdrop = document.getElementById('quoteModalBackdrop');
  if (backdrop) {
    backdrop.addEventListener('click', function (e) {
      if (e.target === this) closeQuoteModal();
    });
  }
});
