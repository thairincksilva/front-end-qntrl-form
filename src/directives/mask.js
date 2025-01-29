export const applyMask = (value, mask) => {
  const v = value.replace(/\D/g, ""); // Remove tudo que não for dígito
  let maskedValue = "";
  let maskIndex = 0;
  let valueIndex = 0;

  while (maskIndex < mask.length && valueIndex < v.length) {
    if (mask[maskIndex] === "X") {
      maskedValue += v[valueIndex];
      valueIndex++;
    } else {
      maskedValue += mask[maskIndex];
    }
    maskIndex++;
  }

  return maskedValue;
};

export const maskDirective = {
  beforeMount(el, binding) {
    const mask = binding.value;

    el.addEventListener("input", (e) => {
      const input = e.target;

      // Evita loops verificando se o valor já está formatado
      const previousValue = input.dataset.previousValue || "";
      if (input.value === previousValue) {
        return; // Se o valor não mudou, não reaplica a máscara
      }

      // Aplica a máscara e salva o valor formatado
      const maskedValue = applyMask(input.value, mask);
      input.value = maskedValue;
      input.dataset.previousValue = maskedValue;

      // Dispara o evento "input" para o v-model
      input.dispatchEvent(new Event("input"));
    });
  },
};
