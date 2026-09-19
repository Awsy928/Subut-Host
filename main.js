/* ==========================================================
   Subut Host — السكربت الرئيسي (بدون مكتبات)
   ========================================================== */
(() => {
  const C = window.SUBUT;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';

  /* ---------- قائمة الجوال ---------- */
  const toggle = $(".nav-toggle"), links = $(".nav-links");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open);
    });
  }

  /* ---------- سنة الفوتر ---------- */
  $$("[data-year]").forEach(el => (el.textContent = new Date().getFullYear()));

  /* ---------- رسم الباقات ---------- */
  const fmt = n => (Number.isInteger(n) ? n : n.toFixed(1));

  $$("[data-plans]").forEach(box => {
    const only = box.dataset.plans && box.dataset.plans !== "all" ? box.dataset.plans.split(",") : null;
    const list = C.plans.filter(p => !only || only.includes(p.id));
    box.innerHTML = list.map(p => `
      <article class="plan${p.featured ? " featured" : ""}">
        ${p.featured ? '<span class="tag">الأكثر طلباً</span>' : ""}
        <h3><span class="cube" style="--c:${p.color}"></span>${p.name}</h3>
        <p class="fit">يناسب حتى ${p.players} لاعب تقريباً</p>
        <div class="price"><span class="amount">${C.currency}${fmt(p.price)}</span><span class="per">${C.period}</span></div>
        <ul>
          <li>${CHECK}<span><b class="ltr">${p.ram} GB</b> رام</span></li>
          <li>${CHECK}<span class="ltr">Ryzen 9 9950X3D</span></li>
          <li>${CHECK}<span class="ltr">${p.disk} GB NVMe</span></li>
          <li>${CHECK}<span>دعم عبر الديسكورد</span></li>
        </ul>
        <a class="btn ${p.featured ? "btn-primary" : "btn-ghost"} btn-block" href="${C.discord}" target="_blank" rel="noopener">اشترِ الحين</a>
      </article>`).join("");
  });

  /* ---------- الحاسبة ---------- */
  const calc = $("[data-calc]");
  if (calc) {
    const k = C.custom, range = $("input", calc);
    range.min = k.min; range.max = k.max; range.value = 8;
    const update = () => {
      const ram = +range.value;
      const price = Math.round((k.base + ram * k.perGB) * 2) / 2; // تقريب لأقرب 0.5
      $("[data-ram]", calc).textContent = ram + " GB";
      $("[data-c-ram]", calc).textContent = ram + " GB";
      $("[data-c-disk]", calc).textContent = Math.max(10, ram * k.diskPerGB) + " GB NVMe";
      $("[data-c-players]", calc).textContent = "حتى " + ram * 8 + " لاعب تقريباً";
      $("[data-c-price]", calc).textContent = C.currency + fmt(price) + " " + C.period;
    };
    range.addEventListener("input", update);
    update();
  }

  /* ---------- كونسول الهيرو (عرض توضيحي) ---------- */
  const con = $("[data-console]");
  if (con) {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stamp = () => new Date().toTimeString().slice(0, 8);
    const lines = () => [
      `<span class="t">[${stamp()} INFO]:</span> Starting minecraft server on <span class="pl">Ryzen 9 9950X3D</span>`,
      `<span class="t">[${stamp()} INFO]:</span> Loading world from <span class="pl">NVMe</span> storage`,
      `<span class="t">[${stamp()} INFO]:</span> Preparing spawn area: 100%`,
      `<span class="t">[${stamp()} INFO]:</span> <span class="ok">Done (1.84s)!</span> For help, type "help"`,
      `<span class="t">[${stamp()} INFO]:</span> <span class="pl">Steve</span> joined the game`,
      `<span class="t">[${stamp()} INFO]:</span> <span class="pl">Alex</span> joined the game`
    ];
    const strip = h => h.replace(/<[^>]+>/g, "");

    const render = html => (con.innerHTML = html + '<span class="cur"></span>');
    const run = async () => {
      const out = [];
      for (const l of lines()) {
        if (reduce) { out.push(l); render(out.join("\n")); continue; }
        // كتابة الحرف بالحرف على النص الصافي ثم نثبّت السطر بألوانه
        const plain = strip(l);
        for (let i = 3; i <= plain.length; i += 3) {
          render(out.concat(plain.slice(0, i)).join("\n"));
          await new Promise(r => setTimeout(r, 14));
        }
        out.push(l); render(out.join("\n"));
        await new Promise(r => setTimeout(r, 380));
      }
      if (!reduce) { await new Promise(r => setTimeout(r, 4200)); run(); }
    };
    run();

    // أرقام الحالة (تجميلية)
    const tps = $("[data-tps]"), cpu = $("[data-cpu]"), cpuBar = $("[data-cpu-bar]"), ram = $("[data-ram-bar]");
    if (tps && !reduce) {
      setInterval(() => {
        const c = 8 + Math.random() * 14;
        tps.textContent = (19.9 + Math.random() * 0.1).toFixed(1);
        cpu.textContent = c.toFixed(0) + "%";
        cpuBar.style.width = c + "%";
        ram.style.width = 34 + Math.random() * 8 + "%";
      }, 1600);
    }
  }
})();
