<template>
  <div>
    <h2 class="text-xl font-bold mb-4">Detalhes do Card</h2>
    <form @submit.prevent="handleNext">
      <!-- Título -->
      <label class="block mb-2">
        Título:
        <input
          type="text"
          v-model="localData.title"
          class="w-full border p-2 rounded"
          required
          placeholder="Digite o título"
        />
      </label>

      <!-- Prioridade -->
      <label class="block mb-2">
        Prioridade:
        <select
          v-model="localData.priority"
          class="w-full border p-2 rounded"
          required
        >
          <option disabled value="">Selecione</option>
          <option value="33662000000000285">Baixa</option>
          <option value="33662000000000287">Média</option>
          <option value="33662000000000289">Alta</option>
        </select>
      </label>

      <!-- Descrição -->
      <label class="block mb-2">
        Descrição:
        <textarea
          v-model="localData.description"
          class="w-full border p-2 rounded"
          placeholder="Digite a descrição"
          required
        ></textarea>
      </label>

      <!-- Quantidade de Sócios -->
      <label class="block mb-2">
        Quantidade de Sócios:
        <select
          v-model="localData.numberOfPartners"
          class="w-full border p-2 rounded"
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
      <div class="flex justify-end mt-4">
        <button
          type="submit"
          class="bg-blue-500 text-white px-4 py-2 rounded"
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
