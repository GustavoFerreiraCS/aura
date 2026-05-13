(function () {
  "use strict";

  var reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var buildSequenceState = {
    timeline: null,
    video: null,
    vidProxy: null,
    duration: 0,
  };

  function setupHeader() {
    var header = document.querySelector(".site-header");
    var toggle = document.getElementById("nav-toggle");
    var panel = document.getElementById("nav-panel");
    var navLinks = document.querySelectorAll(
      '.nav a[href^="#"], .nav-panel a[href^="#"]'
    );

    function setHeaderScrolled() {
      if (!header) return;
      if (window.scrollY > 24) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }
    }

    setHeaderScrolled();
    window.addEventListener("scroll", setHeaderScrolled, { passive: true });

    function closeMenu() {
      if (!toggle || !panel) return;
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menu");
      panel.classList.remove("is-open");
      panel.setAttribute("hidden", "");
      document.body.style.overflow = "";
    }

    function openMenu() {
      if (!toggle || !panel) return;
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Fechar menu");
      panel.removeAttribute("hidden");
      requestAnimationFrame(function () {
        panel.classList.add("is-open");
      });
      document.body.style.overflow = "hidden";
    }

    if (toggle && panel) {
      toggle.addEventListener("click", function () {
        var open = toggle.getAttribute("aria-expanded") === "true";
        if (open) closeMenu();
        else openMenu();
      });

      panel.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", closeMenu);
      });
    }

    navLinks.forEach(function (link) {
      link.addEventListener("click", function (event) {
        var id = link.getAttribute("href");
        if (!id || id === "#") return;
        closeMenu();
        document.querySelectorAll(".nav a").forEach(function (n) {
          n.removeAttribute("aria-current");
        });
        if (link.closest(".nav")) {
          link.setAttribute("aria-current", "page");
        }

        if (id[0] === "#") {
          var target = document.querySelector(id);
          if (target) {
            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      });
    });
  }

  function setupReveal() {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 }
    );

    document.querySelectorAll(".reveal").forEach(function (el) {
      io.observe(el);
    });
  }

  function buildSequenceTimeFromProgress(p, dur) {
    if (!dur || !isFinite(dur) || dur <= 0) return 0;
    var clamped = Math.min(Math.max(p, 0), 1);
    var t = dur * (1 - clamped);
    var maxT = Math.max(dur - 1 / 120, 0);
    return Math.min(Math.max(t, 0), maxT);
  }

  function syncBuildSequenceVideoFromScroll() {
    var st = buildSequenceState.timeline && buildSequenceState.timeline.scrollTrigger;
    var video = buildSequenceState.video;
    var dur = buildSequenceState.duration;
    var proxy = buildSequenceState.vidProxy;
    if (!st || !video || !dur || !isFinite(dur) || dur <= 0) return;

    var t = buildSequenceTimeFromProgress(st.progress, dur);

    if (proxy) proxy.ct = t;
    try {
      video.pause();
      video.currentTime = t;
    } catch (err) {}
  }

  function killBuildSequenceTimeline() {
    if (buildSequenceState.timeline) {
      buildSequenceState.timeline.kill();
      buildSequenceState.timeline = null;
    }
    buildSequenceState.video = null;
    buildSequenceState.vidProxy = null;
    buildSequenceState.duration = 0;
  }

  function setupBuildSequence() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
      return;
    }

    var section = document.querySelector("[data-build-sequence]");
    var pin = section && section.querySelector(".build-sequence__pin");
    var video = section && section.querySelector(".build-sequence__video");
    var blocks = section ? section.querySelectorAll(".build-sequence__block") : [];

    if (!section || !pin || !video || blocks.length < 3) {
      return;
    }

    if (reduceMotion) {
      killBuildSequenceTimeline();
      try {
        video.pause();
        if (video.duration && isFinite(video.duration)) {
          video.currentTime = Math.min(
            Math.max(video.duration - 1 / 120, 0),
            video.duration
          );
        }
      } catch (e1) {}
      blocks.forEach(function (b) {
        b.style.opacity = "1";
        b.style.transform = "none";
        b.style.visibility = "visible";
      });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    var vidProxy = { ct: 0 };
    var xMag = window.innerWidth < 768 ? 32 : 56;

    function applyVideoFrame() {
      var dur = buildSequenceState.duration;
      if (!video || !dur || !isFinite(dur)) return;
      var ct = vidProxy.ct;
      ct = Math.min(Math.max(ct, 0), Math.max(dur - 1 / 120, 0));
      try {
        video.pause();
        video.currentTime = ct;
      } catch (e2) {}
    }

    function buildTimeline(videoDuration) {
      killBuildSequenceTimeline();

      var d = videoDuration;
      if (!d || !isFinite(d) || d <= 0) {
        d = 0.1;
      }

      gsap.set(blocks, { autoAlpha: 0 });

      vidProxy.ct = buildSequenceTimeFromProgress(0, d);
      buildSequenceState.video = video;
      buildSequenceState.vidProxy = vidProxy;
      buildSequenceState.duration = d;

      try {
        video.pause();
        video.currentTime = Math.min(Math.max(d - 1 / 120, 0), d);
      } catch (e3) {}

      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "center center",
          end: function () {
            return "+=" + Math.round(window.innerHeight * 2.85);
          },
          scrub: 1,
          pin: pin,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onEnter: function (self) {
            var t = buildSequenceTimeFromProgress(self.progress, d);
            vidProxy.ct = t;
            try {
              video.pause();
              video.currentTime = t;
            } catch (e4) {}
          },
          onEnterBack: function (self) {
            var t = buildSequenceTimeFromProgress(self.progress, d);
            vidProxy.ct = t;
            try {
              video.pause();
              video.currentTime = t;
            } catch (e4b) {}
          },
          onLeave: function () {
            vidProxy.ct = 0;
            try {
              video.pause();
              if (isFinite(d)) video.currentTime = 0;
            } catch (e5) {}
          },
          onLeaveBack: function () {
            var endT = Math.min(Math.max(d - 1 / 120, 0), d);
            vidProxy.ct = endT;
            try {
              video.pause();
              if (isFinite(d)) video.currentTime = endT;
            } catch (e6) {}
          },
          onRefresh: function (self) {
            var t = buildSequenceTimeFromProgress(self.progress, d);
            vidProxy.ct = t;
            try {
              video.pause();
              video.currentTime = t;
            } catch (e7) {}
          },
        },
      });

      tl.fromTo(
        vidProxy,
        { ct: d },
        {
          ct: 0,
          ease: "none",
          duration: 1,
          onUpdate: applyVideoFrame,
        },
        0
      );

      var XL = -xMag;
      var XR = xMag;
      var third = 1 / 3;
      var fadeIn = 0.14;
      var fadeOut = 0.12;

      tl.fromTo(
        blocks[0],
        { autoAlpha: 0, x: XL },
        { autoAlpha: 1, x: 0, duration: fadeIn, ease: "power2.out" },
        0
      );
      tl.to(
        blocks[0],
        { autoAlpha: 0, x: XL * -0.45, duration: fadeOut, ease: "power2.in" },
        third * 0.92
      );

      tl.fromTo(
        blocks[1],
        { autoAlpha: 0, x: XR },
        { autoAlpha: 1, x: 0, duration: fadeIn, ease: "power2.out" },
        third
      );
      tl.to(
        blocks[1],
        { autoAlpha: 0, x: XR * -0.45, duration: fadeOut, ease: "power2.in" },
        third * 2 - 0.02
      );

      tl.fromTo(
        blocks[2],
        { autoAlpha: 0, x: XL },
        { autoAlpha: 1, x: 0, duration: fadeIn, ease: "power2.out" },
        third * 2
      );
      tl.to(
        blocks[2],
        { autoAlpha: 0, x: XL * -0.45, duration: fadeOut, ease: "power2.in" },
        0.97
      );

      buildSequenceState.timeline = tl;

      requestAnimationFrame(function () {
        syncBuildSequenceVideoFromScroll();
      });
    }

    function tryGetDuration() {
      var dur = video.duration;
      if (dur && isFinite(dur) && dur > 0) {
        return dur;
      }
      return 0;
    }

    function debounceLocal(fn, ms) {
      var t;
      return function () {
        clearTimeout(t);
        t = setTimeout(fn, ms);
      };
    }

    function ensureBuildSequence() {
      var dur = tryGetDuration();
      if (dur <= 0) return;
      var cur = buildSequenceState.duration;
      var tl = buildSequenceState.timeline;
      if (tl && cur > 0 && Math.abs(cur - dur) < 0.06) return;
      buildTimeline(dur);
      ScrollTrigger.refresh();
      requestAnimationFrame(syncBuildSequenceVideoFromScroll);
    }

    video.addEventListener("loadedmetadata", ensureBuildSequence);
    video.addEventListener("durationchange", ensureBuildSequence);

    var pollCount = 0;
    function pollForDuration() {
      if (tryGetDuration() > 0) {
        ensureBuildSequence();
        return;
      }
      pollCount += 1;
      if (pollCount < 150) {
        requestAnimationFrame(pollForDuration);
      } else {
        if (!buildSequenceState.timeline) {
          buildTimeline(1);
          ScrollTrigger.refresh();
          requestAnimationFrame(syncBuildSequenceVideoFromScroll);
        }
      }
    }

    if (tryGetDuration() > 0) {
      ensureBuildSequence();
    } else {
      requestAnimationFrame(pollForDuration);
    }

    try {
      video.load();
    } catch (e7) {}

    var onResize = debounceLocal(function () {
      ScrollTrigger.refresh();
      requestAnimationFrame(syncBuildSequenceVideoFromScroll);
    }, 200);
    window.addEventListener("resize", onResize);
  }

  function setupContactForm() {
    var form = document.getElementById("contact-form");
    if (!form) return;

    var statusEl = document.getElementById("form-status");

    function setError(id, msg) {
      var span = document.getElementById(id);
      if (span) span.textContent = msg || "";
    }

    function clearErrors() {
      setError("nome-erro", "");
      setError("email-erro", "");
      setError("mensagem-erro", "");
      if (statusEl) {
        statusEl.textContent = "";
        statusEl.classList.remove("is-error", "is-success");
      }
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      clearErrors();

      var nome = document.getElementById("nome");
      var email = document.getElementById("email");
      var mensagem = document.getElementById("mensagem");
      var ok = true;

      if (!nome || nome.value.trim().length < 2) {
        setError("nome-erro", "Informe seu nome completo.");
        ok = false;
      }

      var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRe.test(String(email.value).trim())) {
        setError("email-erro", "Informe um e-mail válido.");
        ok = false;
      }

      if (!mensagem || mensagem.value.trim().length < 12) {
        setError("mensagem-erro", "Escreva pelo menos uma linha sobre o projeto.");
        ok = false;
      }

      if (!ok) {
        if (statusEl) {
          statusEl.textContent = "Revise os campos destacados.";
          statusEl.classList.add("is-error");
        }
        return;
      }

      if (statusEl) {
        statusEl.textContent =
          "Mensagem preparada para envio. Conecte um backend ou serviço de formulário para concluir o disparo.";
        statusEl.classList.add("is-success");
      }
      form.reset();
    });
  }

  function onGlobalRefresh() {
    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.refresh();
    }
    requestAnimationFrame(function () {
      syncBuildSequenceVideoFromScroll();
    });
  }

  function init() {
    setupHeader();
    setupReveal();
    setupBuildSequence();
    setupContactForm();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.addEventListener("load", onGlobalRefresh);
  window.addEventListener("pageshow", function (ev) {
    onGlobalRefresh();
    if (ev.persisted) {
      onGlobalRefresh();
    }
  });
})();
