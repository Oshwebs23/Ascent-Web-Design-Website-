/* Ascent Web Design: small enhancements.
   The site works fully without this file. It adds:
   1. A glowing custom scrollbar.
   2. A fade-in for the project cards as they scroll into view. */

(function () {
  "use strict";

  var root = document.documentElement;
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. Glowing scrollbar ---------- */

  function initScrollbar() {
    var track = document.createElement("div");
    var thumb = document.createElement("div");
    track.className = "scrollbar";
    thumb.className = "scrollbar-thumb";
    track.setAttribute("aria-hidden", "true");
    track.appendChild(thumb);
    document.body.appendChild(track);

    // Only hide the native scrollbar now that the custom one exists
    root.classList.add("has-custom-scrollbar");

    var MIN_THUMB = 48;
    var scrollTimer = null;
    var dragOffset = 0;
    var dragging = false;

    function metrics() {
      var viewport = window.innerHeight;
      var total = root.scrollHeight;
      var trackHeight = track.clientHeight;
      var thumbHeight = Math.max(MIN_THUMB, (viewport / total) * trackHeight);
      var maxScroll = total - viewport;
      var maxThumb = trackHeight - thumbHeight;
      return { viewport: viewport, total: total, thumbHeight: thumbHeight, maxScroll: maxScroll, maxThumb: maxThumb };
    }

    function update() {
      var m = metrics();
      if (m.maxScroll <= 0) {
        track.classList.add("is-hidden");
        return;
      }
      track.classList.remove("is-hidden");
      var progress = window.scrollY / m.maxScroll;
      thumb.style.height = m.thumbHeight + "px";
      thumb.style.transform = "translateY(" + progress * m.maxThumb + "px)";
    }

    function markScrolling() {
      track.classList.add("is-scrolling");
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(function () {
        if (!dragging) {
          track.classList.remove("is-scrolling");
        }
      }, 700);
    }

    window.addEventListener("scroll", function () {
      update();
      markScrolling();
    }, { passive: true });
    window.addEventListener("resize", update);
    window.addEventListener("load", update);

    // Drag the thumb
    thumb.addEventListener("pointerdown", function (event) {
      dragging = true;
      dragOffset = event.clientY - thumb.getBoundingClientRect().top;
      thumb.setPointerCapture(event.pointerId);
      track.classList.add("is-scrolling", "is-dragging");
      event.preventDefault();
    });

    thumb.addEventListener("pointermove", function (event) {
      if (!dragging) {
        return;
      }
      var m = metrics();
      var trackTop = track.getBoundingClientRect().top;
      var position = event.clientY - trackTop - dragOffset;
      var ratio = Math.min(1, Math.max(0, position / m.maxThumb));
      window.scrollTo(0, ratio * m.maxScroll);
    });

    function stopDragging() {
      dragging = false;
      track.classList.remove("is-dragging");
      markScrolling();
    }
    thumb.addEventListener("pointerup", stopDragging);
    thumb.addEventListener("pointercancel", stopDragging);

    // Click the track to jump a page up or down
    track.addEventListener("pointerdown", function (event) {
      if (event.target !== track) {
        return;
      }
      var thumbTop = thumb.getBoundingClientRect().top;
      var direction = event.clientY < thumbTop ? -1 : 1;
      window.scrollBy({ top: direction * window.innerHeight * 0.85, behavior: prefersReducedMotion ? "auto" : "smooth" });
    });

    update();
  }

  /* ---------- 2. Fade in project cards on scroll ---------- */

  function initReveal() {
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      return;
    }

    var cards = document.querySelectorAll(".project");
    if (!cards.length) {
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    cards.forEach(function (card) {
      card.classList.add("reveal");
      observer.observe(card);
    });
  }

  initScrollbar();
  initReveal();
})();