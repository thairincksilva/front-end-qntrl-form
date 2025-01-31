<template>
  <div class="flex justify-center items-center w-full">
    <div class="relative">
      <!-- Círculo base -->
      <svg class="w-24 h-24 transform -rotate-90">
        <!-- Círculo de fundo -->
        <circle
          cx="48"
          cy="48"
          r="36"
          stroke="#E5E7EB"
          stroke-width="8"
          fill="none"
        />
        
        <!-- Círculo de progresso -->
        <circle
          cx="48"
          cy="48"
          r="36"
          stroke="url(#progressGradient)"
          stroke-width="8"
          fill="none"
          :stroke-dasharray="strokeDasharray"
          :stroke-dashoffset="strokeDashoffset"
          class="transition-all duration-500 ease-in-out"
        />

        <!-- Gradiente para o círculo de progresso -->
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color: #991B1B" />
            <stop offset="100%" style="stop-color: #7F1D1D" />
          </linearGradient>
        </defs>
      </svg>

      <!-- Número da etapa atual -->
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-bold text-gray-700">
        {{ currentStep + 1 }}/{{ steps.length }}
      </div>
    </div>
  </div>
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
  computed: {
    strokeDasharray() {
      return 2 * Math.PI * 36;
    },
    strokeDashoffset() {
      const progress = (this.currentStep + 1) / this.steps.length;
      return this.strokeDasharray * (1 - progress);
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
  