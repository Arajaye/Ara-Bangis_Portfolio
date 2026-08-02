(function () {
  "use strict";

  /* ---------- scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var revealObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            revealObs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) { revealObs.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- back to top ---------- */
  var totop = document.getElementById("totop");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 600) totop.classList.add("show");
    else totop.classList.remove("show");
  });
  totop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- reel cards: lazy-load + autoplay-in-view + tap controls ---------- */
  var cards = document.querySelectorAll(".reel-card");

  function loadVideo(card) {
    var video = card.querySelector("video");
    if (video.dataset.loaded) return video;
    var source = video.querySelector("source");
    source.src = source.dataset.src;
    video.load();
    video.dataset.loaded = "1";
    return video;
  }

  cards.forEach(function (card) {
    var video = card.querySelector("video");
    var playBtn = card.querySelector(".reel-play");
    var muteBtn = card.querySelector(".reel-mute");
    var poster = card.querySelector(".poster");

    function tryAutoplay() {
      loadVideo(card);
      video.muted = true;
      var p = video.play();
      if (p && p.catch) {
        p.then(function () {
          card.classList.add("is-playing");
          poster.style.opacity = "0";
        }).catch(function () {
          /* autoplay blocked — keep poster + play button visible */
        });
      }
    }

    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) {
              tryAutoplay();
            } else {
              video.pause();
            }
          });
        },
        { threshold: 0.55 }
      );
      io.observe(card);
    }

    playBtn.addEventListener("click", function () {
      loadVideo(card);
      video.muted = false;
      video.play();
      card.classList.add("is-playing");
      poster.style.opacity = "0";
    });

    muteBtn.addEventListener("click", function (evt) {
      evt.stopPropagation();
      video.muted = !video.muted;
      muteBtn.style.opacity = video.muted ? "1" : ".55";
    });

    video.addEventListener("playing", function () {
      card.classList.add("is-playing");
      poster.style.opacity = "0";
    });
  });

  /* ---------- smooth in-page nav (fallback for older browsers already handled by CSS scroll-behavior) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (evt) {
      var id = a.getAttribute("href");
      if (id.length > 1) {
        var target = document.querySelector(id);
        if (target) {
          evt.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });
})();
