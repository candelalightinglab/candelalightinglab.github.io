/* Candela Lighting Lab — hero carousel + scroll reveal */
(function () {
  "use strict";

  /* ---- private preview gate ---- */
  var gate = document.getElementById("site-gate");
  if (gate) {
    var gform = document.getElementById("gate-form");
    var gpw = document.getElementById("gate-pw");
    var gerr = document.getElementById("gate-err");
    var ghash = gate.getAttribute("data-pwhash");
    var unlock = function () {
      try { localStorage.setItem("cll-unlocked", "1"); } catch (e) {}
      document.documentElement.classList.add("unlocked");
    };
    var fail = function () { gerr.classList.add("show"); gpw.value = ""; gpw.focus(); };
    if (gform) {
      gform.addEventListener("submit", function (e) {
        e.preventDefault();
        var val = gpw.value || "";
        if (window.crypto && crypto.subtle && window.TextEncoder) {
          crypto.subtle.digest("SHA-256", new TextEncoder().encode(val)).then(function (buf) {
            var hex = Array.prototype.map.call(new Uint8Array(buf), function (b) {
              return b.toString(16).padStart(2, "0");
            }).join("");
            hex === ghash ? unlock() : fail();
          });
        } else { fail(); }
      });
    }
    if (!document.documentElement.classList.contains("unlocked") && gpw) {
      try { gpw.focus(); } catch (e) {}
    }
  }

  /* ---- language switch (EN / KO) ---- */
  var langBtns = document.querySelectorAll(".lang-btn");
  function syncLang() {
    var cur = document.documentElement.getAttribute("data-lang") || "en";
    langBtns.forEach(function (b) {
      b.classList.toggle("is-active", b.getAttribute("data-setlang") === cur);
    });
  }
  langBtns.forEach(function (b) {
    b.addEventListener("click", function () {
      var l = b.getAttribute("data-setlang");
      document.documentElement.setAttribute("data-lang", l);
      try { localStorage.setItem("cll-lang", l); } catch (e) {}
      syncLang();
    });
  });
  syncLang();

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
    var caps = Array.prototype.slice.call(g.querySelectorAll(".proc-cap"));
    var curEl = g.querySelector(".pg-cur");
    var prev = g.querySelector(".pg-prev");
    var next = g.querySelector(".pg-next");

    // tag each image portrait/landscape so CSS can size portrait by width
    slides.forEach(function (fig) {
      var img = fig.querySelector("img");
      if (!img) return;
      var mark = function () {
        if (img.naturalHeight > img.naturalWidth * 1.02) img.classList.add("is-portrait");
        else img.classList.add("is-landscape");
      };
      if (img.complete && img.naturalWidth) mark();
      else img.addEventListener("load", mark);
    });

    if (slides.length < 2) return;
    var i = 0;
    function show(n) {
      i = (n + slides.length) % slides.length;
      slides.forEach(function (s, k) { s.classList.toggle("is-on", k === i); });
      thumbs.forEach(function (t, k) {
        var on = k === i; t.classList.toggle("is-on", on);
        if (on && t.scrollIntoView) t.scrollIntoView({ inline: "nearest", block: "nearest" });
      });
      caps.forEach(function (c, k) { c.classList.toggle("is-on", k === i); });
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
