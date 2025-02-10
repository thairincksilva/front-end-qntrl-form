<template>
  <div>
    <h2 class="text-2xl font-bold mb-4 bg-gradient-to-r from-[#991B1B] to-[#7F1D1D] bg-clip-text text-transparent">Processo Embracon</h2>

    <p class="mb-8 text-gray-600">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris.
    </p>

    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-semibold mb-3 text-gray-700">Quem é seu Coordenador ou Responsável?</h3>

        <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
          Código Referência:
          <input
            type="text"
            v-model="localData.codigoReferencia"
            class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
            placeholder="Digite o código de referência"
          />
        </label>
      </div>

      <!-- Botões -->
      <div class="flex justify-end pt-4">
        <button
          type="button"
          @click="handleNext"
          class="bg-gradient-to-r from-[#991B1B] to-[#7F1D1D] text-white px-8 py-2.5 rounded-xl font-medium transition-all duration-300 font-inter hover:shadow-lg hover:scale-105"
        >
          Iniciar Processo
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StepTriagem",
  props: {
    formData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      localData: {
        codigoReferencia: this.formData?.customfield_shorttext61 || "",
      },
    };
  },
  methods: {
    handleNext() {
      const mappedData = this.mapFields(this.localData);
      this.$emit("next", mappedData);
    },
    mapFields(data) {
      return {
        customfield_shorttext61: data.codigoReferencia || "",
      };
    },
  },
};
</script>
