/* Candela Lighting Lab — hero carousel + scroll reveal */
(function () {
  "use strict";

  /* ---- hero carousel ---- */
  var hero = document.querySelector("[data-hero]");
  if (hero) {
    var slides = Array.prototype.slice.call(hero.querySelectorAll(".hero-slide"));
    var dots = Array.prototype.slice.call(hero.querySelectorAll(".hero-dots button"));
    var i = 0, timer = null, DELAY = 6000;
    function show(n) {
      i = (n + slides.length) % slides.length;
      slides.forEach(function (s, k) { s.classList.toggle("is-on", k === i); });
      dots.forEach(function (d, k) { d.setAttribute("aria-current", k === i ? "true" : "false"); });
    }
    function next() { show(i + 1); }
    function play() { stop(); if (slides.length > 1) timer = setInterval(next, DELAY); }
    function stop() { if (timer) clearInterval(timer); }
    dots.forEach(function (d, k) {
      d.addEventListener("click", function () { show(k); play(); });
    });
    show(0); play();
    document.addEventListener("visibilitychange", function () {
      document.hidden ? stop() : play();
    });
  }

  /* ---- project slideshow gallery ---- */
  document.querySelectorAll("[data-gallery]").forEach(function (g) {
    var slides = Array.prototype.slice.call(g.querySelectorAll(".pg-slide"));
    var thumbs = Array.prototype.slice.call(g.querySelectorAll(".pg-thumb"));
    var curEl = g.querySelector(".pg-cur");
    var prev = g.querySelector(".pg-prev");
    var next = g.querySelector(".pg-next");
    if (slides.length < 2) return;
    var i = 0;
    function show(n) {
      i = (n + slides.length) % slides.length;
      slides.forEach(function (s, k) { s.classList.toggle("is-on", k === i); });
      thumbs.forEach(function (t, k) {
        var on = k === i; t.classList.toggle("is-on", on);
        if (on && t.scrollIntoView) t.scrollIntoView({ inline: "nearest", block: "nearest" });
      });
      if (curEl) curEl.textContent = i + 1;
    }
    if (prev) prev.addEventListener("click", function () { show(i - 1); });
    if (next) next.addEventListener("click", function () { show(i + 1); });
    thumbs.forEach(function (t) {
      t.addEventListener("click", function () { show(parseInt(t.getAttribute("data-i"), 10)); });
    });
    // click on the image advances to the next
    g.querySelector(".pg-stage").addEventListener("click", function (e) {
      if (e.target.closest(".pg-arrow")) return;
      show(i + 1);
    });
    // keyboard when gallery is on screen
    document.addEventListener("keydown", function (e) {
      var r = g.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      if (e.key === "ArrowLeft") show(i - 1);
      else if (e.key === "ArrowRight") show(i + 1);
    });
    show(0);
  });

  /* ---- scroll reveal ---- */
  var reveals = document.querySelectorAll(".reveal");
  if (reveals.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }
})();
