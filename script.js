// ===================================================
// ARA BANGIS PORTFOLIO — interactions
// ===================================================
(function(){
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting){
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add("in"); });
  }

  /* ---------- Scrubber / timecode ---------- */
  var fill = document.getElementById("scrubberFill");
  var playhead = document.getElementById("scrubberPlayhead");
  var timeEl = document.getElementById("scrubberTime");
  var chapterEl = document.getElementById("scrubberChapter");
  var chapters = Array.prototype.slice.call(document.querySelectorAll("[data-chapter]"));
  var totalSeconds = 252; // nominal runtime for the fictional timecode readout (04:12)

  function formatTC(pct){
    var totalFrames = Math.floor(pct * totalSeconds * 30);
    var seconds = Math.floor(totalFrames / 30);
    var frames = totalFrames % 30;
    var mm = Math.floor(seconds / 60);
    var ss = seconds % 60;
    function pad(n){ return (n < 10 ? "0" : "") + n; }
    return pad(mm) + ":" + pad(ss) + ":" + pad(frames);
  }

  var ticking = false;
  function updateScrubber(){
    ticking = false;
    var doc = document.documentElement;
    var scrollTop = window.pageYOffset || doc.scrollTop;
    var max = doc.scrollHeight - doc.clientHeight;
    var pct = max > 0 ? Math.min(1, Math.max(0, scrollTop / max)) : 0;

    if (fill) fill.style.width = (pct * 100) + "%";
    if (playhead) playhead.style.left = (pct * 100) + "%";
    if (timeEl) timeEl.textContent = formatTC(pct);

    // current chapter = last chapter whose top has passed viewport-center-ish
    var current = chapters[0];
    var refLine = window.innerHeight * 0.35;
    chapters.forEach(function(sec){
      var rect = sec.getBoundingClientRect();
      if (rect.top <= refLine) current = sec;
    });
    if (current && chapterEl) chapterEl.textContent = current.getAttribute("data-chapter");
  }

  window.addEventListener("scroll", function(){
    if (!ticking){
      window.requestAnimationFrame(updateScrubber);
      ticking = true;
    }
  }, { passive: true });
  window.addEventListener("resize", updateScrubber);
  updateScrubber();

  /* ---------- Mobile menu ---------- */
  var burger = document.getElementById("navBurger");
  var mobileMenu = document.getElementById("mobileMenu");
  if (burger && mobileMenu){
    burger.addEventListener("click", function(){
      var isOpen = mobileMenu.classList.toggle("open");
      burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    mobileMenu.querySelectorAll("a").forEach(function(a){
      a.addEventListener("click", function(){ mobileMenu.classList.remove("open"); });
    });
  }

  /* ---------- Video cards: hover preview + lightbox ---------- */
  var lightbox = document.getElementById("lightbox");
  var lightboxVideo = document.getElementById("lightboxVideo");
  var lightboxClose = document.getElementById("lightboxClose");
  var lightboxBackdrop = document.getElementById("lightboxBackdrop");

  function openLightbox(src, poster){
    lightboxVideo.setAttribute("poster", poster || "");
    lightboxVideo.src = src;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    lightboxVideo.currentTime = 0;
    var p = lightboxVideo.play();
    if (p && p.catch) p.catch(function(){});
    document.body.style.overflow = "hidden";
  }
  function closeLightbox(){
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxVideo.pause();
    lightboxVideo.removeAttribute("src");
    lightboxVideo.load();
    document.body.style.overflow = "";
  }
  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener("click", closeLightbox);
  document.addEventListener("keydown", function(e){
    if (e.key === "Escape") closeLightbox();
  });

  var cards = document.querySelectorAll(".video-card");
  cards.forEach(function(card){
    var video = card.querySelector("video");
    var src = card.getAttribute("data-video");
    var poster = card.getAttribute("data-poster");

    if (video && !reduceMotion){
      card.addEventListener("mouseenter", function(){
        var p = video.play();
        if (p && p.catch) p.catch(function(){});
      });
      card.addEventListener("mouseleave", function(){
        video.pause();
        video.currentTime = 0;
      });
    }

    card.addEventListener("click", function(){
      openLightbox(src, poster);
    });
  });

})();
