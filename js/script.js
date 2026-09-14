/* ============================================================
   Marigold & Bean — script.js
   All interactive behaviour for the site lives here. Each
   feature checks for its own elements before running, so this
   one file can be safely included on every page.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ----------------------------------------------------------
     1. Hamburger / responsive nav menu
     The button toggles aria-expanded (for screen readers) and
     an .is-open class on the nav (for CSS to animate open/closed).
     ---------------------------------------------------------- */
  var navToggle = document.querySelector('.nav-toggle');
  var mainNav = document.querySelector('.main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      mainNav.classList.toggle('is-open', !isOpen);
    });

    // Close the mobile menu automatically once a link is tapped,
    // so navigating doesn't leave the panel open on the next page.
    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.setAttribute('aria-expanded', 'false');
        mainNav.classList.remove('is-open');
      });
    });
  }

  /* ----------------------------------------------------------
     2. Highlight the current page in the nav bar
     Compares each link's href against the current file name so
     the visitor always sees which page they're on.
     ---------------------------------------------------------- */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a[href]').forEach(function (link) {
    var href = link.getAttribute('href').split('#')[0];
    if (href === currentPage || (href === '' && currentPage === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ----------------------------------------------------------
     3. Subtle scroll-reveal for card grids
     Uses IntersectionObserver to add .is-visible once an element
     scrolls into view, which CSS then fades/slides in. Skipped
     entirely if the browser doesn't support it, or the user has
     asked for reduced motion.
     ---------------------------------------------------------- */
  var revealEls = document.querySelectorAll('.reveal');
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (revealEls.length && 'IntersectionObserver' in window && !prefersReducedMotion) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    // No observer support or reduced motion requested: just show everything.
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ----------------------------------------------------------
     4. Back-to-top button
     Appears after the visitor scrolls down a bit, scrolls smoothly
     back to the top of the page on click.
     ---------------------------------------------------------- */
  var backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      backToTop.classList.toggle('is-visible', window.scrollY > 500);
    });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ----------------------------------------------------------
     5. Accordion (FAQ) — About / Contact pages
     Only one panel open at a time. Height is animated via
     max-height in CSS; JS just measures scrollHeight and toggles
     the aria-expanded state.
     ---------------------------------------------------------- */
  var accordionTriggers = document.querySelectorAll('.accordion-trigger');
  accordionTriggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var panel = document.getElementById(trigger.getAttribute('aria-controls'));
      var isOpen = trigger.getAttribute('aria-expanded') === 'true';

      // Close every other panel first (accordion behaviour).
      accordionTriggers.forEach(function (other) {
        if (other !== trigger) {
          other.setAttribute('aria-expanded', 'false');
          var otherPanel = document.getElementById(other.getAttribute('aria-controls'));
          if (otherPanel) otherPanel.style.maxHeight = null;
        }
      });

      trigger.setAttribute('aria-expanded', String(!isOpen));
      if (panel) {
        panel.style.maxHeight = isOpen ? null : panel.scrollHeight + 'px';
      }
    });
  });

  /* ----------------------------------------------------------
     6. Menu category filter — Menu page
     Buttons filter the menu grid by data-category without a
     page reload, showing/hiding items via classList.
     ---------------------------------------------------------- */
  var filterButtons = document.querySelectorAll('.menu-filter button');
  var menuItems = document.querySelectorAll('.menu-item');

  if (filterButtons.length && menuItems.length) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterButtons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        var category = btn.getAttribute('data-filter');
        menuItems.forEach(function (item) {
          var matches = category === 'all' || item.getAttribute('data-category') === category;
          item.style.display = matches ? '' : 'none';
        });
      });
    });
  }

  /* ----------------------------------------------------------
     7. Gallery lightbox / slider — Gallery page
     Clicking a thumbnail opens a full-size view with next/prev
     controls and keyboard arrow support; Escape closes it.
     ---------------------------------------------------------- */
  var galleryThumbs = document.querySelectorAll('.gallery-thumb');
  var lightbox = document.querySelector('.lightbox');

  if (galleryThumbs.length && lightbox) {
    var lightboxImg = lightbox.querySelector('img');
    var lightboxCaption = lightbox.querySelector('.lightbox-caption');
    var closeBtn = lightbox.querySelector('.lightbox-close');
    var prevBtn = lightbox.querySelector('.lightbox-prev');
    var nextBtn = lightbox.querySelector('.lightbox-next');
    var thumbList = Array.prototype.slice.call(galleryThumbs);
    var currentIndex = 0;

    function showImage(index) {
      currentIndex = (index + thumbList.length) % thumbList.length;
      var thumb = thumbList[currentIndex];
      var fullSrc = thumb.getAttribute('data-full') || thumb.querySelector('img').src;
      var caption = thumb.getAttribute('data-caption') || '';
      lightboxImg.src = fullSrc;
      lightboxImg.alt = caption;
      lightboxCaption.textContent = caption;
    }

    function openLightbox(index) {
      showImage(index);
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      closeBtn.focus();
    }

    function closeLightbox() {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
    }

    thumbList.forEach(function (thumb, index) {
      thumb.addEventListener('click', function () { openLightbox(index); });
    });

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', function () { showImage(currentIndex - 1); });
    nextBtn.addEventListener('click', function () { showImage(currentIndex + 1); });

    // Click on the dark backdrop (outside the image) also closes it.
    lightbox.addEventListener('click', function (event) {
      if (event.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', function (event) {
      if (!lightbox.classList.contains('is-open')) return;
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowRight') showImage(currentIndex + 1);
      if (event.key === 'ArrowLeft') showImage(currentIndex - 1);
    });
  }

  /* ----------------------------------------------------------
     8. Contact form validation — Contact page
     Prevents submission (there's no backend) until every field
     passes a check, shows inline errors, and displays a success
     message when everything is valid.
     ---------------------------------------------------------- */
  var contactForm = document.getElementById('contact-form');

  if (contactForm) {
    var statusBox = contactForm.querySelector('.form-status');
    var messageField = contactForm.querySelector('#message');
    var charCount = contactForm.querySelector('.char-count');
    var MAX_MESSAGE_LENGTH = 500;

    // Live character counter on the message textarea.
    if (messageField && charCount) {
      var updateCount = function () {
        var remaining = MAX_MESSAGE_LENGTH - messageField.value.length;
        charCount.textContent = Math.max(remaining, 0) + ' characters left';
      };
      messageField.addEventListener('input', updateCount);
      updateCount();
    }

    function setFieldError(field, message) {
      var group = field.closest('.form-group');
      var errorEl = group.querySelector('.form-error');
      group.classList.toggle('has-error', Boolean(message));
      if (errorEl) errorEl.textContent = message || '';
    }

    function validateField(field) {
      var value = field.value.trim();

      if (field.hasAttribute('required') && value === '') {
        setFieldError(field, 'This field is required.');
        return false;
      }

      if (field.type === 'email') {
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
          setFieldError(field, 'Enter a valid email address.');
          return false;
        }
      }

      if (field.type === 'tel' && value !== '') {
        var phonePattern = /^[0-9+\-\s()]{7,}$/;
        if (!phonePattern.test(value)) {
          setFieldError(field, 'Enter a valid phone number.');
          return false;
        }
      }

      if (field === messageField && value.length > MAX_MESSAGE_LENGTH) {
        setFieldError(field, 'Message is too long.');
        return false;
      }

      setFieldError(field, '');
      return true;
    }

    // Validate a field as soon as the visitor leaves it.
    contactForm.querySelectorAll('input, textarea').forEach(function (field) {
      field.addEventListener('blur', function () { validateField(field); });
    });

    contactForm.addEventListener('submit', function (event) {
      event.preventDefault(); // static site: no backend to send this to

      var fields = contactForm.querySelectorAll('input, textarea');
      var allValid = true;
      fields.forEach(function (field) {
        if (!validateField(field)) allValid = false;
      });

      if (allValid) {
        statusBox.textContent = "Thanks! Your message has been noted — we'll get back to you soon.";
        statusBox.className = 'form-status success';
        contactForm.reset();
        if (charCount) updateCount();
      } else {
        statusBox.textContent = 'Please fix the highlighted fields and try again.';
        statusBox.className = 'form-status error';
      }
    });
  }

});
