<template>
  <nav class="w-full max-w-6xl mx-auto px-4 py-4">
    <ul class="flex flex-wrap justify-center items-center gap-1 md:gap-4">
      <li
        v-for="(step, index) in steps"
        :key="index"
        class="flex items-center group"
      >
        <div class="flex items-center">
          <div
            class="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-lg border-2 transition-all duration-300 font-medium"
            :class="{
              'bg-gradient-to-r from-[#991B1B] to-[#7F1D1D] text-white border-[#991B1B] shadow-lg scale-110': index === currentStep,
              'bg-gray-100 text-gray-400 border-gray-200': index > currentStep,
              'bg-gradient-to-r from-green-600 to-green-700 text-white border-green-600': index < currentStep,
            }"
          >
            {{ index + 1 }}
          </div>

          <!-- Indicadores de subetapas para a etapa de sócios -->
          <div v-if="step === 'Sócios'" class="flex ml-2 gap-1">
            <div
              v-for="dot in 4"
              :key="dot"
              class="w-1.5 h-1.5 rounded-full transition-all duration-300"
              :class="{
                'bg-[#991B1B]': currentStep === index && dot <= (formData?.currentPartnerIndex + 1 || 1),
                'bg-gray-300': currentStep !== index || dot > (formData?.currentPartnerIndex + 1 || 1)
              }"
            ></div>
          </div>
        </div>

        <span
          class="ml-1 text-sm md:text-base font-inter transition-all duration-300 whitespace-nowrap"
          :class="{
            'font-bold bg-gradient-to-r from-[#991B1B] to-[#7F1D1D] bg-clip-text text-transparent': index === currentStep,
            'text-gray-400': index !== currentStep,
          }"
        >
          {{ step }}
        </span>
        
        <div
          v-if="index < steps.length - 1"
          class="hidden md:block w-16 h-0.5 mx-2 rounded-full transition-all duration-300"
          :class="{
            'bg-gradient-to-r from-[#991B1B] to-[#7F1D1D]': index < currentStep,
            'bg-gray-200': index >= currentStep,
          }"
        ></div>
      </li>
    </ul>
  </nav>
</template>
  
  <script>
  export default {
    props: {
      steps: {
        type: Array,
        required: true,
      },
      currentStep: {
        type: Number,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  /* Opcional: Adicione espaçamento entre os elementos */
  nav {
    margin-bottom: 1rem;
  }
  </style>
  