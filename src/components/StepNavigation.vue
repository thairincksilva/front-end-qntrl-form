<template>
    <nav class="flex items-center justify-center p-4">
      <ul class="flex space-x-4">
        <li
          v-for="(step, index) in steps"
          :key="index"
          class="flex items-center"
        >
          <div
            class="flex items-center justify-center w-8 h-8 rounded-full border-2"
            :class="{
              'bg-blue-500 text-white border-blue-500': index === currentStep,
              'bg-gray-300 text-gray-700': index > currentStep,
              'bg-green-500 text-white border-green-500': index < currentStep,
            }"
          >
            {{ index + 1 }}
          </div>
          <span
            class="ml-2"
            :class="{
              'font-bold text-blue-500': index === currentStep,
              'text-gray-500': index !== currentStep,
            }"
          >
            {{ step }}
          </span>
          <!-- Linha conectando os passos -->
          <div
            v-if="index < steps.length - 1"
            class="w-8 h-1 bg-gray-300"
            :class="{
              'bg-blue-500': index < currentStep,
              'bg-gray-300': index >= currentStep,
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
  