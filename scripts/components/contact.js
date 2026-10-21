const ENDPOINT = "https://formsubmit.co/ajax/evelynrodriguesdev@gmail.com";

export function initContact() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  const status = form.querySelector("[data-contact-status]");
  const submit = form.querySelector("[type='submit']");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    status.classList.remove("is-error");

    if (!form.reportValidity()) return;
    if (form.elements.company.value.trim()) {
      form.reset();
      status.textContent = "Mensagem enviada. A equipe responde pelo e-mail informado.";
      return;
    }

    const payload = {
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim(),
      message: form.elements.message.value.trim(),
      _subject: "Contato pelo site InovaGAB",
      _template: "table",
      _captcha: "false",
    };

    submit.disabled = true;
    status.textContent = "Enviando mensagem…";

    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("request failed");

      form.reset();
      status.textContent = "Mensagem enviada. A equipe responde pelo e-mail informado.";
    } catch {
      status.classList.add("is-error");
      status.textContent = "Não foi possível enviar agora. Tente novamente em instantes.";
    } finally {
      submit.disabled = false;
    }
  });
}
