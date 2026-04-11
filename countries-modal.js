(function () {
  var COUNTRIES = [
    { code: "az", native: "Azərbaycan", en: "Azerbaijan" },
    { code: "ar", native: "Argentina", en: "Argentina" },
    { code: "am", native: "Հայաստան", en: "Armenia" },
    { code: "bd", native: "বাংলাদেশ", en: "Bangladesh" },
    { code: "by", native: "Беларусь", en: "Belarus" },
    { code: "bj", native: "Bénin", en: "Benin" },
    { code: "bo", native: "Bolivia", en: "Bolivia" },
    { code: "br", native: "Brasil", en: "Brazil" },
    { code: "bf", native: "Burkina Faso", en: "Burkina Faso" },
    { code: "ve", native: "Venezuela", en: "Venezuela" },
    { code: "vn", native: "Việt Nam", en: "Vietnam" },
    { code: "gh", native: "Ghana", en: "Ghana" },
    { code: "gt", native: "Guatemala", en: "Guatemala" },
    { code: "gl", native: "Kalaallit Nunaat", en: "Greenland" },
    { code: "cd", native: "République démocratique du Congo", en: "Democratic Republic of the Congo" },
    { code: "eg", native: "مصر", en: "Egypt" },
    { code: "zm", native: "Zambia", en: "Zambia" },
    { code: "in", native: "भारत", en: "India" },
    { code: "id", native: "Indonesia", en: "Indonesia" },
    { code: "kh", native: "កម្ពុជា", en: "Cambodia" },
    { code: "cm", native: "Cameroun", en: "Cameroon" },
    { code: "qa", native: "قطر", en: "Qatar" },
    { code: "ke", native: "Kenya", en: "Kenya" },
    { code: "co", native: "Colombia", en: "Colombia" },
    { code: "cr", native: "Costa Rica", en: "Costa Rica" },
    { code: "ci", native: "Côte d'Ivoire", en: "Ivory Coast" },
    { code: "kg", native: "Кыргызстан", en: "Kyrgyzstan" },
    { code: "mo", native: "澳門", en: "Macau" },
    { code: "my", native: "Malaysia", en: "Malaysia" },
    { code: "ml", native: "Mali", en: "Mali" },
    { code: "mx", native: "México", en: "Mexico" },
    { code: "md", native: "Republica Moldova", en: "Moldova" },
    { code: "ne", native: "Niger", en: "Niger" },
    { code: "ng", native: "Nigeria", en: "Nigeria" },
    { code: "ae", native: "الإمارات العربية المتحدة", en: "United Arab Emirates" },
    { code: "pk", native: "پاکستان", en: "Pakistan" },
    { code: "pe", native: "Perú", en: "Peru" },
    { code: "ru", native: "Россия", en: "Russia" },
    { code: "rw", native: "Rwanda", en: "Rwanda" },
    { code: "sn", native: "Sénégal", en: "Senegal" },
    { code: "tj", native: "Тоҷикистон", en: "Tajikistan" },
    { code: "tz", native: "Tanzania", en: "Tanzania" },
    { code: "th", native: "ประเทศไทย", en: "Thailand" },
    { code: "tg", native: "Togo", en: "Togo" },
    { code: "tm", native: "Türkmenistan", en: "Turkmenistan" },
    { code: "tr", native: "Türkiye", en: "Turkey" },
    { code: "ug", native: "Uganda", en: "Uganda" },
    { code: "uz", native: "Oʻzbekiston", en: "Uzbekistan" },
    { code: "ua", native: "Україна", en: "Ukraine" },
    { code: "ph", native: "Pilipinas", en: "Philippines" },
    { code: "cl", native: "Chile", en: "Chile" },
    { code: "lk", native: "ශ්‍රී ලංකා", en: "Sri Lanka" },
    { code: "ec", native: "Ecuador", en: "Ecuador" },
    { code: "za", native: "Suid-Afrika", en: "South Africa" },
    { code: "kr", native: "대한민국", en: "South Korea" },
    { code: "jp", native: "日本", en: "Japan" }
  ];

  var COUNTRY_LINKS = {
    ar: "https://1wlgxm.com/?open=register&p=1vun",
    am: "https://1win.com/?open=register&p=xla7",
    az: "https://one-vv194.com/?open=register&p=iszy",
    bd: "https://1wezue.com/?open=register&p=1tqy",
    by: "https://1wkffo.com/?open=register&p=vr0a",
    bj: "https://1win.com/?open=register&p=teca",
    bo: "https://1win.com/?open=register&p=g5am",
    br: "https://1whqyu.com/?open=register&p=erkl",
    bf: "https://1wiqju.life/?open=register&p=e9nq",
    kh: "https://1wycxb.com/?open=register&p=u9ms",
    cm: "https://1win.com/?open=register&p=1q6l",
    cl: "https://1wqkor.com/?open=register&p=mufv",
    co: "https://1whjbe.com/?open=register&p=t9ca",
    cd: "https://1wweml.life/?open=register&p=3l4s",
    cr: "https://1wumaa.life/?open=register&p=vcp6",
    ci: "https://1win.com/?open=register&p=302w",
    ec: "https://1win.com/?open=register&p=ld5m",
    eg: "https://1wined.life/?open=register&p=rwap",
    gh: "https://1win.com/?open=register&p=n5jb",
    gl: "https://1wviwn.life/?open=register&p=x38o",
    gt: "https://1wovnh.com/?open=register&p=b699",
    in: "https://1weqdt.life/?open=register&p=m03e",
    id: "https://1wfgiw.life/?open=register&p=234l",
    jp: "https://1wekcy.com/?p=rsch",
    ke: "https://1win.com/?open=register&p=cbo5",
    kg: "https://1wsvyz.com/?open=register&p=6j4w",
    mo: "https://1wumbs.com/?open=register&p=v5xk",
    my: "https://1wgasa.life/?open=register&p=6rl7",
    ml: "https://1wpgsj.life/?p=58cd",
    mx: "https://1wycnz.life/?open=register&p=7vgc",
    md: "https://1wwoeg.com/?open=register&p=erm1",
    ne: "https://1wvvfm.life/?open=register&p=uwal",
    ng: "https://1win.ng/?open=register&p=5g5m",
    pk: "https://1wssrq.life/?open=register&p=bdx6",
    pe: "https://1win.com/?open=register&p=2rqd",
    ph: "https://1wpgpt.life/?open=register&p=fqbg",
    qa: "https://1wlzkg.com/?open=register&p=7lkc",
    ru: "https://one-vv809.com/?open=register&p=vvbx",
    rw: "https://1wxsih.life/?open=register&p=dwxl",
    sn: "https://1win.com/?open=register&p=r1jl",
    za: "https://1win.com/?open=register&p=a8vs",
    kr: "https://1webvf.life/?open=register&p=gu5n",
    lk: "https://1wpcka.life/?open=register&p=qgns",
    tj: "https://1win.com/?open=register&p=jtyq",
    tz: "https://1win.com/?open=register&p=pazm",
    th: "https://1wgqbi.life/?open=register&p=f15k",
    tg: "https://1win.com/?open=register&p=rfba",
    tr: "https://1wfzhe.life/?open=register&p=4jkj",
    tm: "https://1wtgzl.com/?open=register&p=iy4t",
    ug: "https://1wuest.life/?open=register&p=fafp",
    ua: "https://1wfcac.com/?open=register&p=2z2x",
    ae: "https://1wukwc.life/?open=register&p=h1mz",
    uz: "https://one-vv944.com/?open=register&p=a5cr",
    ve: "https://1wwvle.life/?open=register&p=bj2m",
    vn: "https://1wzfaq.com/?open=register&p=dsym",
    zm: "https://1wskbe.life/?open=register&p=3ud5"
  };

  var modal = document.getElementById("country-modal");
  var listEl = document.getElementById("country-list");
  var closeBtn = modal && modal.querySelector("[data-modal-close]");
  var backdrop = modal && modal.querySelector(".country-modal__backdrop");

  function buildList() {
    if (!listEl) return;
    var frag = document.createDocumentFragment();
    COUNTRIES.forEach(function (c) {
      var li = document.createElement("li");
      li.className = "country-list__item-wrap";
      var url = COUNTRY_LINKS[c.code];
      var row = document.createElement("a");
      row.className = "country-list__item";
      row.href = url || "#";
      if (url) {
        row.target = "_blank";
        row.rel = "noopener noreferrer";
      }
      var img = document.createElement("img");
      img.className = "country-list__flag";
      img.src = "https://flagcdn.com/w80/" + c.code + ".png";
      img.srcset =
        "https://flagcdn.com/w160/" + c.code + ".png 2x";
      img.alt = "";
      img.width = 40;
      img.height = 30;
      img.loading = "lazy";
      var span = document.createElement("span");
      span.className = "country-list__text";
      span.innerHTML =
        "<span class=\"country-list__native\">" +
        escapeHtml(c.native) +
        "</span> <span class=\"country-list__en\">(" +
        escapeHtml(c.en) +
        ")</span>";
      row.appendChild(img);
      row.appendChild(span);
      row.addEventListener("click", function (e) {
        if (!url) e.preventDefault();
        closeModal();
      });
      li.appendChild(row);
      frag.appendChild(li);
    });
    listEl.appendChild(frag);
  }

  function escapeHtml(s) {
    var d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  function openModal() {
    if (!modal) return;
    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("country-modal-open");
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("country-modal-open");
  }

  document.querySelectorAll(".js-game-open").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      openModal();
    });
  });

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (backdrop) backdrop.addEventListener("click", closeModal);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal && !modal.hidden) closeModal();
  });

  buildList();
})();
