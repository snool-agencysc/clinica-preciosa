    (function () {
      var toggle = document.querySelector("[data-menu-toggle]");
      var closeBtn = document.querySelector("[data-menu-close]");
      var panel = document.querySelector("[data-mobile-nav]");
      if (toggle && panel) {
        var open = function () {
          panel.classList.add("is-open");
          toggle.setAttribute("aria-expanded", "true");
          document.body.style.overflow = "hidden";
        };
        var close = function () {
          panel.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
          document.body.style.overflow = "";
        };
        toggle.addEventListener("click", function () {
          panel.classList.contains("is-open") ? close() : open();
        });
        closeBtn && closeBtn.addEventListener("click", close);
        panel.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", close); });
        window.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
      }

      var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      var items = document.querySelectorAll("[data-reveal]");
      if (reduced || !("IntersectionObserver" in window)) {
        items.forEach(function (el) { el.classList.add("is-visible"); });
      } else {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        }, { threshold: 0.15 });
        items.forEach(function (el) { io.observe(el); });
      }
    })();
  
