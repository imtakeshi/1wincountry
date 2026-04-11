(function () {
  var FORMSUBMIT_EMAIL = "kitinsss@yandex.ru";
  var AJAX_URL = "https://formsubmit.co/ajax/" + FORMSUBMIT_EMAIL;

  var modal = document.getElementById("subscribe-modal");
  var sheet = document.getElementById("subscribe-modal-dialog");
  var openBtns = document.querySelectorAll(".js-subscribe-open");
  var closeEls = modal ? modal.querySelectorAll("[data-subscribe-close]") : [];
  var backdrop = modal && modal.querySelector(".subscribe-modal__backdrop");
  var form = document.getElementById("subscribe-form");
  var errEl = document.getElementById("subscribe-form-error");
  var thanksEl = document.getElementById("subscribe-form-thanks");
  var submitBtn = document.getElementById("subscribe-submit");

  function openModal() {
    if (!modal) return;
    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("subscribe-modal-open");
    var nameInput = document.getElementById("subscribe-name");
    if (nameInput) nameInput.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("subscribe-modal-open");
    resetFormUI();
  }

  function resetFormUI() {
    if (form) form.reset();
    if (errEl) {
      errEl.hidden = true;
      errEl.textContent = "";
    }
    if (thanksEl) thanksEl.hidden = true;
    if (form) form.hidden = false;
    if (submitBtn) submitBtn.disabled = false;
  }

  openBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      openModal();
    });
  });

  if (backdrop) backdrop.addEventListener("click", closeModal);
  closeEls.forEach(function (el) {
    el.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal && !modal.hidden) closeModal();
  });

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!submitBtn) return;

      var fd = new FormData(form);
      var name = String(fd.get("name") || "").trim();
      var email = String(fd.get("email") || "").trim();
      if (!name || !email) return;

      submitBtn.disabled = true;
      if (errEl) {
        errEl.hidden = true;
        errEl.textContent = "";
      }

      fetch(AJAX_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          email: email,
          _subject: "Tower Rush — new subscriber",
          _template: "table",
          _replyto: email
        })
      })
        .then(function (r) {
          return r.json().then(function (data) {
            if (!r.ok || (data && data.success === false)) {
              throw new Error((data && data.message) || "Send failed");
            }
            return data;
          });
        })
        .then(function () {
          form.hidden = true;
          if (thanksEl) thanksEl.hidden = false;
        })
        .catch(function () {
          if (errEl) {
            errEl.textContent =
              "Could not send right now. Please try again in a moment. If this is your first time, confirm FormSubmit’s activation email for " +
              FORMSUBMIT_EMAIL +
              ".";
            errEl.hidden = false;
          }
          submitBtn.disabled = false;
        });
    });
  }
})();
