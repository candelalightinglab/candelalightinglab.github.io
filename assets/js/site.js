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
