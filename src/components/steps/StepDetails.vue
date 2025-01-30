<template>
  <div>
    <h2 class="text-2xl font-bold mb-10 bg-gradient-to-r from-[#991B1B] to-[#7F1D1D] bg-clip-text text-transparent">
      Detalhes do Card
    </h2>
    <form @submit.prevent="handleNext" class="space-y-4">
      <!-- Título -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        Título:
        <input
          type="text"
          v-model="localData.title"
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
          required
          placeholder="Digite o título"
        />
      </label>

      <!-- Descrição -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        Descrição:
        <textarea
          v-model="localData.description"
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
          placeholder="Digite a descrição"
          required
        ></textarea>
      </label>

      <!-- Quantidade de Sócios -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        Quantidade de Sócios:
        <select
          v-model="localData.numberOfPartners"
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
          required
        >
          <option disabled value="">Selecione</option>
          <option value="1">1 Sócio</option>
          <option value="2">2 Sócios</option>
          <option value="3">3 Sócios</option>
          <option value="4">4 Sócios</option>
        </select>
      </label>

      <!-- Botões -->
      <div class="flex justify-end pt-4">
        <button
          type="submit"
          class="bg-gradient-to-r from-[#991B1B] to-[#7F1D1D] text-white px-8 py-2.5 rounded-xl font-medium transition-all duration-300 font-inter hover:shadow-lg hover:scale-105"
        >
          Próximo
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    formData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      localData: {
        title: this.formData.title || '',
        priority: this.formData.priority || '',
        description: this.formData.description || '',
        record_owner: this.formData.record_owner || '',
        duedate: this.formData.duedate || '',
        numberOfPartners: this.formData.customfield_integer2 || '1'
      }
    }
  },
  watch: {
    formData: {
      immediate: true,
      deep: true,
      handler(newValue) {
        this.localData = {
          title: newValue.title || '',
          priority: newValue.priority || '',
          description: newValue.description || '',
          record_owner: newValue.record_owner || '',
          duedate: newValue.duedate || '',
          numberOfPartners: newValue.customfield_integer2 || '1'
        }
      }
    }
  },
  methods: {
    handleNext() {
      this.$emit('next', this.localData);
    }
  }
}
</script>
