(function () {
  var STORAGE_KEY = "tower_rush_geo_cc";

  var SUPPORTED = [
    "en", "ru", "es", "fr", "de", "pt", "uk", "tr", "pl", "it", "ar", "ja", "ko", "zh"
  ];

  var SPANISH = {
    ES: 1, MX: 1, AR: 1, CO: 1, CL: 1, PE: 1, VE: 1, EC: 1, GT: 1, BO: 1, CR: 1, PA: 1, PY: 1,
    UY: 1, SV: 1, HN: 1, NI: 1, CU: 1, DO: 1, PR: 1, GQ: 1
  };
  var RUSSIAN = { RU: 1, BY: 1, KZ: 1, KG: 1, TJ: 1, TM: 1, MD: 1, UZ: 1 };
  var UKRAINIAN = { UA: 1 };
  var FRENCH = {
    FR: 1, LU: 1, MC: 1, SN: 1, CI: 1, CM: 1, BF: 1, ML: 1, NE: 1, TG: 1, BJ: 1, GA: 1, CD: 1,
    CG: 1, MG: 1, TD: 1, CF: 1, DJ: 1, KM: 1, RE: 1, NC: 1, PF: 1, GF: 1, MQ: 1, GP: 1, HT: 1,
    BI: 1, RW: 1, SC: 1, BE: 1
  };
  var GERMAN = { DE: 1, AT: 1, LI: 1, CH: 1 };
  var PORTUGUESE = { BR: 1, PT: 1, AO: 1, MZ: 1, CV: 1, GW: 1, ST: 1, TL: 1 };
  var TURKISH = { TR: 1, CY: 1 };
  var POLISH = { PL: 1 };
  var ITALIAN = { IT: 1, SM: 1, VA: 1 };
  var ARABIC = {
    SA: 1, AE: 1, EG: 1, IQ: 1, JO: 1, LB: 1, SY: 1, YE: 1, KW: 1, BH: 1, QA: 1, OM: 1, DZ: 1,
    MA: 1, TN: 1, LY: 1, SD: 1, PS: 1, MR: 1, SO: 1
  };
  var JAPANESE = { JP: 1 };
  var KOREAN = { KR: 1 };
  var CHINESE = { CN: 1, TW: 1, HK: 1, MO: 1 };

  function mapCountryToLang(code) {
    if (!code) return null;
    var c = String(code).toUpperCase();
    if (UKRAINIAN[c]) return "uk";
    if (RUSSIAN[c]) return "ru";
    if (SPANISH[c]) return "es";
    if (FRENCH[c]) return "fr";
    if (GERMAN[c]) return "de";
    if (PORTUGUESE[c]) return "pt";
    if (TURKISH[c]) return "tr";
    if (POLISH[c]) return "pl";
    if (ITALIAN[c]) return "it";
    if (ARABIC[c]) return "ar";
    if (JAPANESE[c]) return "ja";
    if (KOREAN[c]) return "ko";
    if (CHINESE[c]) return "zh";
    return "en";
  }

  function resolveLocale(countryLang) {
    var lang = countryLang && SUPPORTED.indexOf(countryLang) >= 0 ? countryLang : null;
    if (lang) return lang;
    var nav = (navigator.language || "en").toLowerCase();
    var primary = nav.split("-")[0];
    if (SUPPORTED.indexOf(primary) >= 0) return primary;
    return "en";
  }

  function fetchCountryCode() {
    return fetch("https://ipwho.is/", { cache: "no-store" })
      .then(function (r) {
        return r.json();
      })
      .then(function (d) {
        if (d && d.success && d.country_code) return String(d.country_code).toUpperCase();
        throw new Error("ipwho");
      })
      .catch(function () {
        return fetch("https://get.geojs.io/v1/ip/geo.json", { cache: "no-store" })
          .then(function (r) {
            return r.json();
          })
          .then(function (d) {
            if (d && d.country_code) return String(d.country_code).toUpperCase();
            throw new Error("geojs");
          });
      });
  }

  var STRINGS = {
    en: {
      title: "Tower Rush — Play",
      hero_aria: "Tower Rush",
      subtitle: "Register and play",
      promo_vpn: "If you are from the USA or the UK, enable vpn before going to the site",
      promo_code:
        "🎁 <strong>PROMO CODE: luckypari</strong> 🎁",
      promo_bonus:
        "Use this promo code when registering to get +500% bonus and 500FS on your first deposit",
      play_tower: "Play \"Tower Rush\"",
      play_rush: "PLAY \"RUSH HOUR\"",
      play_playme: "PLAY \"PLAY ME\"",
      play_aviamasters: "PLAY \"AVIAMASTERS\"",
      modal_title: "Country",
      close_aria: "Close",
      share_aria: "Share page",
      share_copied: "Link copied",
      promo_region_aria: "Promo information",
      games_section_aria: "More games",
      games_block_title: "Games",
      games_block_desc:
        "Tap a game to start, then pick your country. Use the orange button below for registration steps.",
      register_hint_lead:
        "Screenshots in order: Registration → form → payment method → find the game in Casino search."
    },
    ru: {
      title: "Tower Rush — Играть",
      hero_aria: "Tower Rush",
      subtitle: "Регистрируйся и играй",
      promo_vpn: "Если вы из США или Великобритании, включите VPN перед переходом на сайт",
      promo_code: "🎁 <strong>ПРОМОКОД: luckypari</strong> 🎁",
      promo_bonus:
        "Используйте этот промокод при регистрации, чтобы получить +500% к бонусу и 500 FS на первый депозит",
      play_tower: "Играть «Tower Rush»",
      play_rush: "Играть «Rush Hour»",
      play_playme: "Играть «Play Me»",
      play_aviamasters: "Играть «Aviamasters»",
      modal_title: "Страна",
      close_aria: "Закрыть",
      share_aria: "Поделиться",
      share_copied: "Ссылка скопирована",
      promo_region_aria: "Информация о промо",
      games_section_aria: "Другие игры",
      games_block_title: "Игры",
      games_block_desc:
        "Нажмите на игру, затем выберите страну. Оранжевая кнопка внизу — шаги регистрации.",
      register_hint_lead:
        "По шагам: кнопка «Регистрация» → заполнение формы → способ оплаты → поиск игры в разделе Казино."
    },
    es: {
      title: "Tower Rush — Jugar",
      hero_aria: "Tower Rush",
      subtitle: "Regístrate y juega",
      promo_vpn: "Si eres de EE. UU. o del Reino Unido, activa una VPN antes de entrar al sitio",
      promo_code: "🎁 <strong>CÓDIGO PROMO: luckypari</strong> 🎁",
      promo_bonus:
        "Usa este código al registrarte para obtener +500% de bono y 500 FS en tu primer depósito",
      play_tower: "Jugar \"Tower Rush\"",
      play_rush: "Jugar \"Rush Hour\"",
      play_playme: "Jugar \"Play Me\"",
      play_aviamasters: "Jugar \"Aviamasters\"",
      modal_title: "País",
      close_aria: "Cerrar",
      share_aria: "Compartir",
      share_copied: "Enlace copiado",
      promo_region_aria: "Información promocional",
      games_section_aria: "Más juegos",
      games_block_title: "Juegos",
      games_block_desc:
        "Toca un juego, elige tu país. El botón naranja abajo muestra cómo registrarse.",
      register_hint_lead:
        "Pasos: Registro → formulario → método de pago → buscar el juego en Casino."
    },
    fr: {
      title: "Tower Rush — Jouer",
      hero_aria: "Tower Rush",
      subtitle: "Inscris-toi et joue",
      promo_vpn: "Si vous êtes aux États-Unis ou au Royaume-Uni, activez un VPN avant d’ouvrir le site",
      promo_code: "🎁 <strong>CODE PROMO : luckypari</strong> 🎁",
      promo_bonus:
        "Utilisez ce code à l’inscription pour obtenir +500% de bonus et 500 FS sur votre premier dépôt",
      play_tower: "Jouer à « Tower Rush »",
      play_rush: "Jouer à « Rush Hour »",
      play_playme: "Jouer à « Play Me »",
      play_aviamasters: "Jouer à « Aviamasters »",
      modal_title: "Pays",
      close_aria: "Fermer",
      share_aria: "Partager",
      share_copied: "Lien copié",
      promo_region_aria: "Informations promotionnelles",
      games_section_aria: "Autres jeux",
      games_block_title: "Jeux",
      games_block_desc:
        "Appuie sur un jeu, puis choisis ton pays. Le bouton orange en bas : étapes d’inscription.",
      register_hint_lead:
        "Étapes : Inscription → formulaire → paiement → retrouver le jeu via la recherche Casino."
    },
    de: {
      title: "Tower Rush — Spielen",
      hero_aria: "Tower Rush",
      subtitle: "Registrieren und spielen",
      promo_vpn: "Wenn du aus den USA oder dem UK kommst, aktiviere VPN vor dem Besuch der Seite",
      promo_code: "🎁 <strong>PROMO-CODE: luckypari</strong> 🎁",
      promo_bonus:
        "Nutze diesen Code bei der Registrierung für +500% Bonus und 500 FS auf die erste Einzahlung",
      play_tower: "„Tower Rush“ spielen",
      play_rush: "„Rush Hour“ spielen",
      play_playme: "„Play Me“ spielen",
      play_aviamasters: "„Aviamasters“ spielen",
      modal_title: "Land",
      close_aria: "Schließen",
      share_aria: "Teilen",
      share_copied: "Link kopiert",
      promo_region_aria: "Promo-Informationen",
      games_section_aria: "Weitere Spiele",
      games_block_title: "Spiele",
      games_block_desc:
        "Tippe auf ein Spiel, wähle dann dein Land. Der orangefarbene Button unten: Registrierung.",
      register_hint_lead:
        "Schritte: Registrierung → Formular → Zahlung → Spiel über Casino-Suche finden."
    },
    pt: {
      title: "Tower Rush — Jogar",
      hero_aria: "Tower Rush",
      subtitle: "Registre-se e jogue",
      promo_vpn: "Se você é dos EUA ou do Reino Unido, ative VPN antes de acessar o site",
      promo_code: "🎁 <strong>CÓDIGO PROMO: luckypari</strong> 🎁",
      promo_bonus:
        "Use este código ao registrar-se para ganhar +500% de bônus e 500 FS no primeiro depósito",
      play_tower: "Jogar \"Tower Rush\"",
      play_rush: "Jogar \"Rush Hour\"",
      play_playme: "Jogar \"Play Me\"",
      play_aviamasters: "Jogar \"Aviamasters\"",
      modal_title: "País",
      close_aria: "Fechar",
      share_aria: "Compartilhar",
      share_copied: "Link copiado",
      promo_region_aria: "Informações da promoção",
      games_section_aria: "Mais jogos",
      games_block_title: "Jogos",
      games_block_desc:
        "Toque num jogo e escolha o país. O botão laranja abaixo mostra o registro passo a passo.",
      register_hint_lead:
        "Passos: Registro → formulário → pagamento → encontrar o jogo na busca do Cassino."
    },
    uk: {
      title: "Tower Rush — Грати",
      hero_aria: "Tower Rush",
      subtitle: "Реєструйся та грай",
      promo_vpn: "Якщо ви з США або Великої Британії, увімкніть VPN перед переходом на сайт",
      promo_code: "🎁 <strong>ПРОМОКОД: luckypari</strong> 🎁",
      promo_bonus:
        "Використайте цей промокод при реєстрації, щоб отримати +500% бонусу та 500 FS на перший депозит",
      play_tower: "Грати «Tower Rush»",
      play_rush: "Грати «Rush Hour»",
      play_playme: "Грати «Play Me»",
      play_aviamasters: "Грати «Aviamasters»",
      modal_title: "Країна",
      close_aria: "Закрити",
      share_aria: "Поділитися",
      share_copied: "Посилання скопійовано",
      promo_region_aria: "Промоінформація",
      games_section_aria: "Інші ігри",
      games_block_title: "Ігри",
      games_block_desc:
        "Натисніть гру, потім оберіть країну. Помаранчева кнопка внизу — кроки реєстрації.",
      register_hint_lead:
        "Кроки: Реєстрація → форма → оплата → знайти гру через пошук у Казино."
    },
    tr: {
      title: "Tower Rush — Oyna",
      hero_aria: "Tower Rush",
      subtitle: "Kayıt ol ve oyna",
      promo_vpn: "ABD veya Birleşik Krallık’taysanız, siteye girmeden önce VPN açın",
      promo_code: "🎁 <strong>PROMO KODU: luckypari</strong> 🎁",
      promo_bonus:
        "Kayıtta bu kodu kullanın: +500% bonus ve ilk yatırımda 500 FS",
      play_tower: "\"Tower Rush\" oyna",
      play_rush: "\"Rush Hour\" oyna",
      play_playme: "\"Play Me\" oyna",
      play_aviamasters: "\"Aviamasters\" oyna",
      modal_title: "Ülke",
      close_aria: "Kapat",
      share_aria: "Paylaş",
      share_copied: "Bağlantı kopyalandı",
      promo_region_aria: "Promosyon bilgisi",
      games_section_aria: "Diğer oyunlar",
      games_block_title: "Oyunlar",
      games_block_desc:
        "Bir oyuna dokun, ülkeni seç. Alttaki turuncu düğme kayıt adımları için.",
      register_hint_lead:
        "Adımlar: Kayıt → form → ödeme → oyunu Casino aramasında bul."
    },
    pl: {
      title: "Tower Rush — Graj",
      hero_aria: "Tower Rush",
      subtitle: "Zarejestruj się i graj",
      promo_vpn: "Jeśli jesteś z USA lub Wielkiej Brytanii, włącz VPN przed wejściem na stronę",
      promo_code: "🎁 <strong>KOD PROMO: luckypari</strong> 🎁",
      promo_bonus:
        "Użyj tego kodu przy rejestracji, aby dostać +500% bonusu i 500 FS przy pierwszej wpłacie",
      play_tower: "Graj w „Tower Rush”",
      play_rush: "Graj w „Rush Hour”",
      play_playme: "Graj w „Play Me”",
      play_aviamasters: "Graj w „Aviamasters”",
      modal_title: "Kraj",
      close_aria: "Zamknij",
      share_aria: "Udostępnij",
      share_copied: "Skopiowano link",
      promo_region_aria: "Informacje promocyjne",
      games_section_aria: "Więcej gier",
      games_block_title: "Gry",
      games_block_desc:
        "Kliknij grę, wybierz kraj. Pomarańczowy przycisk poniżej — kroki rejestracji.",
      register_hint_lead:
        "Kroki: Rejestracja → formularz → płatność → znajdź grę w wyszukiwarce Kasyna."
    },
    it: {
      title: "Tower Rush — Gioca",
      hero_aria: "Tower Rush",
      subtitle: "Registrati e gioca",
      promo_vpn: "Se sei dagli USA o dal Regno Unito, attiva la VPN prima di entrare nel sito",
      promo_code: "🎁 <strong>CODICE PROMO: luckypari</strong> 🎁",
      promo_bonus:
        "Usa questo codice in registrazione per +500% di bonus e 500 FS sul primo deposito",
      play_tower: "Gioca a \"Tower Rush\"",
      play_rush: "Gioca a \"Rush Hour\"",
      play_playme: "Gioca a \"Play Me\"",
      play_aviamasters: "Gioca a \"Aviamasters\"",
      modal_title: "Paese",
      close_aria: "Chiudi",
      share_aria: "Condividi",
      share_copied: "Link copiato",
      promo_region_aria: "Informazioni promo",
      games_section_aria: "Altri giochi",
      games_block_title: "Giochi",
      games_block_desc:
        "Tocca un gioco, scegli il paese. Il pulsante arancione sotto: passi di registrazione.",
      register_hint_lead:
        "Passi: Registrazione → modulo → pagamento → trova il gioco con la ricerca Casino."
    },
    ar: {
      title: "Tower Rush — العب",
      hero_aria: "Tower Rush",
      subtitle: "سجّل والعب",
      promo_vpn: "إذا كنت من الولايات المتحدة أو المملكة المتحدة، فعّل VPN قبل الدخول للموقع",
      promo_code: "🎁 <strong>رمز ترويجي: luckypari</strong> 🎁",
      promo_bonus:
        "استخدم هذا الرمز عند التسجيل للحصول على +500٪ مكافأة و500 FS على أول إيداع",
      play_tower: "العب \"Tower Rush\"",
      play_rush: "العب \"Rush Hour\"",
      play_playme: "العب \"Play Me\"",
      play_aviamasters: "العب \"Aviamasters\"",
      modal_title: "الدولة",
      close_aria: "إغلاق",
      share_aria: "مشاركة",
      share_copied: "تم نسخ الرابط",
      promo_region_aria: "معلومات العرض",
      games_section_aria: "المزيد من الألعاب",
      games_block_title: "الألعاب",
      games_block_desc:
        "اضغط لعبة ثم اختر الدولة. الزر البرتقالي بالأسفل لخطوات التسجيل.",
      register_hint_lead:
        "الخطوات: التسجيل → النموذج → طريقة الدفع → العثور على اللعبة عبر بحث الكازينو."
    },
    ja: {
      title: "Tower Rush — プレイ",
      hero_aria: "Tower Rush",
      subtitle: "登録してプレイ",
      promo_vpn: "アメリカまたはイギリスからのアクセスの場合は、サイトに入る前にVPNを有効にしてください",
      promo_code: "🎁 <strong>プロモコード: luckypari</strong> 🎁",
      promo_bonus:
        "登録時にこのコードを使うと、初回入金で+500%ボーナスと500FSがもらえます",
      play_tower: "「Tower Rush」をプレイ",
      play_rush: "「Rush Hour」をプレイ",
      play_playme: "「Play Me」をプレイ",
      play_aviamasters: "「Aviamasters」をプレイ",
      modal_title: "国",
      close_aria: "閉じる",
      share_aria: "共有",
      share_copied: "リンクをコピーしました",
      promo_region_aria: "プロモ情報",
      games_section_aria: "その他のゲーム",
      games_block_title: "ゲーム",
      games_block_desc:
        "ゲームをタップして国を選びます。下のオレンジのボタンで登録の手順が開きます。",
      register_hint_lead:
        "手順：登録 → フォーム → 支払い方法 → カジノ検索でゲームを見つける。"
    },
    ko: {
      title: "Tower Rush — 플레이",
      hero_aria: "Tower Rush",
      subtitle: "가입하고 플레이하세요",
      promo_vpn: "미국 또는 영국에서 접속하는 경우 사이트 이용 전 VPN을 켜 주세요",
      promo_code: "🎁 <strong>프로모 코드: luckypari</strong> 🎁",
      promo_bonus:
        "가입 시 이 코드를 사용하면 첫 입금 시 +500% 보너스와 500FS를 받을 수 있습니다",
      play_tower: "\"Tower Rush\" 플레이",
      play_rush: "\"Rush Hour\" 플레이",
      play_playme: "\"Play Me\" 플레이",
      play_aviamasters: "\"Aviamasters\" 플레이",
      modal_title: "국가",
      close_aria: "닫기",
      share_aria: "공유",
      share_copied: "링크가 복사되었습니다",
      promo_region_aria: "프로모 정보",
      games_section_aria: "더 많은 게임",
      games_block_title: "게임",
      games_block_desc:
        "게임을 누른 뒤 국가를 고르세요. 아래 주황색 버튼에서 가입 단계를 확인하세요.",
      register_hint_lead:
        "순서: 회원가입 → 양식 → 결제 수단 → 카지노 검색에서 게임 찾기."
    },
    zh: {
      title: "Tower Rush — 开始游戏",
      hero_aria: "Tower Rush",
      subtitle: "注册并游玩",
      promo_vpn: "若您在美国或英国，请在访问网站前开启 VPN",
      promo_code: "🎁 <strong>优惠码：luckypari</strong> 🎁",
      promo_bonus: "注册时使用此优惠码，首存可获得 +500% 奖金与 500 次免费旋转",
      play_tower: "玩「Tower Rush」",
      play_rush: "玩「Rush Hour」",
      play_playme: "玩「Play Me」",
      play_aviamasters: "玩「Aviamasters」",

      modal_title: "国家/地区",
      close_aria: "关闭",
      share_aria: "分享",
      share_copied: "链接已复制",
      promo_region_aria: "优惠说明",
      games_section_aria: "更多游戏",
      games_block_title: "游戏",
      games_block_desc: "点击游戏后选择国家。下方橙色按钮可查看注册步骤。",
      register_hint_lead: "步骤：注册 → 填写表单 → 选择支付方式 → 在娱乐场搜索中找到游戏。"
    }
  };

  function apply(locale) {
    var t = STRINGS[locale] || STRINGS.en;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (t[key] != null) el.textContent = t[key];
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-html");
      if (t[key] != null) el.innerHTML = t[key];
    });
    document.querySelectorAll("[data-i18n-aria-label]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-aria-label");
      if (t[key] != null) el.setAttribute("aria-label", t[key]);
    });
    if (t.title) document.title = t.title;
    document.documentElement.lang = locale === "zh" ? "zh-Hans" : locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";

    try {
      window.SITE_LOCALE = locale;
      window.dispatchEvent(new CustomEvent("site-locale", { detail: { locale: locale } }));
    } catch (e) {}
  }

  function init() {
    var cached = null;
    try {
      cached = localStorage.getItem(STORAGE_KEY);
    } catch (e) {}

    if (cached && cached.length === 2) {
      apply(resolveLocale(mapCountryToLang(cached)));
    } else {
      apply(resolveLocale(null));
    }

    fetchCountryCode()
      .then(function (code) {
        try {
          localStorage.setItem(STORAGE_KEY, code);
        } catch (e) {}
        apply(resolveLocale(mapCountryToLang(code)));
      })
      .catch(function () {});
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
