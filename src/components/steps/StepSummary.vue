<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-10 bg-gradient-to-r from-[#991B1B] to-[#7F1D1D] bg-clip-text text-transparent">
      Resumo dos Dados
    </h2>

    <!-- Dados da Empresa -->
    <div class="mb-8">
      <h3 class="text-lg font-semibold mb-4 text-gray-700">Dados da Empresa</h3>
      <div class="grid grid-cols-2 gap-4">
        <div v-for="(value, key) in empresaData" :key="key" class="border-b pb-2">
          <span class="font-medium text-gray-600">{{ formatLabel(key) }}:</span>
          <span class="ml-2 text-gray-800">{{ value }}</span>
        </div>
      </div>
    </div>

    <!-- Dados dos Sócios -->
    <div v-for="(socio, index) in sociosData" :key="index" class="mb-8">
      <h3 class="text-lg font-semibold mb-4 text-gray-700">Dados do Sócio {{ index + 1 }}</h3>
      <div class="grid grid-cols-2 gap-4">
        <div v-for="(value, key) in socio" :key="key" class="border-b pb-2">
          <span class="font-medium text-gray-600">{{ formatLabel(key) }}:</span>
          <span class="ml-2 text-gray-800">{{ value }}</span>
        </div>
      </div>
    </div>

    <!-- Documentos -->
    <div class="mb-8">
      <h3 class="text-lg font-semibold mb-4 text-gray-700">Documentos</h3>
      <div class="grid grid-cols-2 gap-4">
        <div v-for="(value, key) in documentosData" :key="key" class="border-b pb-2">
          <span class="font-medium text-gray-600">{{ formatLabel(key) }}:</span>
          <span class="ml-2 text-gray-800">{{ value?.name || 'Não enviado' }}</span>
        </div>
      </div>
    </div>

    <!-- Botões -->
    <div class="flex justify-between pt-4">
      <button 
        type="button" 
        class="bg-gray-100 text-gray-700 hover:bg-gray-200 px-8 py-2.5 rounded-xl font-medium transition-all duration-300 font-inter hover:shadow-lg"
        @click="$emit('prev')"
      >
        Voltar
      </button>
      <button 
        type="button" 
        class="bg-gradient-to-r from-[#991B1B] to-[#7F1D1D] text-white px-8 py-2.5 rounded-xl font-medium transition-all duration-300 font-inter hover:shadow-lg hover:scale-105"
        @click="handleSubmit"
      >
        Enviar
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StepSummary',
  props: {
    formData: {
      type: Object,
      required: true
    }
  },
  computed: {
    empresaData() {
      return {
        'CNPJ': this.formData.customfield_shorttext20,
        'Razão Social': this.formData.customfield_shorttext17,
        'Nome Fantasia': this.formData.customfield_shorttext1,
        'Email': this.formData.customfield_shorttext19,
        'Telefone': this.formData.customfield_shorttext16,
        'CEP': this.formData.customfield_shorttext18,
        'Endereço': this.formData.customfield_shorttext23,
        'Número': this.formData.customfield_integer1,
        'Complemento': this.formData.customfield_shorttext15,
        'Bairro': this.formData.customfield_shorttext11,
        'Cidade': this.formData.customfield_shorttext24,
        'UF': this.formData.customfield_shorttext6,
        'País': this.formData.customfield_shorttext9
      }
    },
    sociosData() {
      const socios = []
      
      // Sócio 1
      if (this.formData.customfield_shorttext21) {
        socios.push({
          'Nome': this.formData.customfield_shorttext21,
          'CPF': this.formData.customfield_shorttext22,
          'Email': this.formData.customfield_shorttext14,
          'Telefone': this.formData.customfield_shorttext13,
          'Data Nascimento': this.formData.customfield_date1,
          'CEP': this.formData.customfield_shorttext2,
          'Endereço': this.formData.customfield_shorttext4,
          'Número': this.formData.customfield_shorttext3,
          'Complemento': this.formData.customfield_shorttext12,
          'Bairro': this.formData.customfield_shorttext5,
          'Cidade': this.formData.customfield_shorttext8,
          'UF': this.formData.customfield_shorttext7,
          'País': this.formData.customfield_shorttext10
        })
      }

      // Sócio 2
      if (this.formData.customfield_shorttext48) {
        socios.push({
          'Nome': this.formData.customfield_shorttext48,
          'CPF': this.formData.customfield_shorttext60,
          'Email': this.formData.customfield_shorttext52,
          'Telefone': this.formData.customfield_shorttext40,
          'Data Nascimento': this.formData.customfield_date5,
          'CEP': this.formData.customfield_shorttext55,
          'Endereço': this.formData.customfield_shorttext42,
          'Número': this.formData.customfield_shorttext57,
          'Complemento': this.formData.customfield_shorttext49,
          'Bairro': this.formData.customfield_shorttext58,
          'Cidade': this.formData.customfield_shorttext46,
          'UF': this.formData.customfield_shorttext59,
          'País': this.formData.customfield_shorttext53
        })
      }

      // Adicione lógica similar para sócios 3 e 4 se necessário

      return socios
    },
    documentosData() {
      return {
        'Cartão CNPJ': this.formData.customfield_file7,
        'Contrato Social': this.formData.customfield_file1,
        'Dados Bancários': this.formData.customfield_file2,
        'Certificado Conselho': this.formData.customfield_file3,
        'Inscrição Municipal': this.formData.customfield_file5,
        'CND': this.formData.customfield_file6,
        'Antecedentes Sócio 1': this.formData.customfield_file4,
        'Antecedentes Sócio 2': this.formData.customfield_file10,
        'Antecedentes Sócio 3': this.formData.customfield_file9,
        'Antecedentes Sócio 4': this.formData.customfield_file8
      }
    }
  },
  methods: {
    formatLabel(key) {
      return key
    },
    handleSubmit() {
      console.log('Dados completos do formulário:', this.formData)
      this.$emit('submit')
    }
  }
}
</script> 