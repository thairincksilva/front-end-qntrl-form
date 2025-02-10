<template>
  <div>
    <h2 class="text-2xl font-bold mb-10 bg-gradient-to-r from-[#991B1B] to-[#7F1D1D] bg-clip-text text-transparent">
      Dados do Sócio {{ displayNumber }}
    </h2>
    <form @submit.prevent="handleNext" class="space-y-4">
      <!-- Nome Completo -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        Nome Completo - Sócio {{ displayNumber }}:
        <input
          type="text"
          v-model="localData.nome"
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
          :placeholder="`Digite o nome do Sócio ${displayNumber}`"
        />
      </label>

      <!-- Email -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        Email - Sócio {{ displayNumber }}:
        <input
          type="email"
          v-model="localData.email"
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
          :placeholder="`Digite o email do Sócio ${displayNumber}`"
        />
      </label>

      <!-- CPF -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        CPF - Sócio {{ displayNumber }}:
        <input
          v-mask="'XXX.XXX.XXX-XX'"
          type="text"
          v-model="localData.cpf"
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
          :placeholder="`Digite o CPF do Sócio ${displayNumber}`"
        />
      </label>

      <!-- Data de Nascimento -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        Data de Nascimento - Sócio {{ displayNumber }}:
        <input
          type="text"
          ref="birthDatePicker"
          v-model="localData.dataNascimento"
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
          placeholder="Selecione a data"
        />
      </label>

      <!-- Telefone -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        Telefone - Sócio {{ displayNumber }}:
        <input
          v-mask="'(XX) XXXXXXXXX'"
          type="tel"
          v-model="localData.telefone"
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
          :placeholder="`Digite o telefone do Sócio ${displayNumber}`"
        />
      </label>

      <!-- CEP -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        CEP - Sócio {{ displayNumber }}:
        <input
          v-mask="'XXXXX-XXX'"
          type="text"
          v-model="localData.cep"
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
          :placeholder="`Digite o CEP do Sócio ${displayNumber}`"
        />
      </label>

      <!-- Endereço -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        Endereço - Sócio {{ displayNumber }}:
        <input
          type="text"
          v-model="localData.endereco"
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
          :placeholder="`Digite o endereço do Sócio ${displayNumber}`"
        />
      </label>

      <!-- Número -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        Número - Sócio {{ displayNumber }}:
        <input
          type="text"
          v-model="localData.numero"
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
          :placeholder="`Digite o número do Sócio ${displayNumber}`"
        />
      </label>

      <!-- Complemento -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        Complemento - Sócio {{ displayNumber }}:
        <input
          type="text"
          v-model="localData.complemento"
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
          :placeholder="`Digite o complemento do Sócio ${displayNumber}`"
        />
      </label>

      <!-- Bairro -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        Bairro - Sócio {{ displayNumber }}:
        <input
          type="text"
          v-model="localData.bairro"
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
          :placeholder="`Digite o bairro do Sócio ${displayNumber}`"
        />
      </label>

      <!-- Cidade -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        Cidade - Sócio {{ displayNumber }}:
        <input
          type="text"
          v-model="localData.cidade"
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
          :placeholder="`Digite a cidade do Sócio ${displayNumber}`"
        />
      </label>

      <!-- UF -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        UF - Sócio {{ displayNumber }}:
        <input
          type="text"
          v-model="localData.uf"
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
          :placeholder="`Digite a UF do Sócio ${displayNumber}`"
        />
      </label>

      <!-- País -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        País - Sócio {{ displayNumber }}:
        <input
          type="text"
          v-model="localData.pais"
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
          :placeholder="`Digite o país do Sócio ${displayNumber}`"
        />
      </label>

      <!-- Atestado de Antecedentes Criminais -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        Atestado de Antecedentes Criminais:
        <div class="mt-2">
          <input
            type="file"
            :id="`antecedentes-socio-${displayNumber}`"
            :name="`customfield_file${displayNumber === 1 ? '4' : displayNumber === 2 ? '9' : displayNumber === 3 ? '10' : '8'}`"
            accept=".pdf"
            class="hidden"
            @change="handleFileUpload"
            ref="fileInput"
          />
          <button 
            type="button"
            @click.stop="triggerFileInput('fileInput')"
            class="w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 text-gray-700 hover:bg-white hover:border-[#991B1B] hover:text-[#991B1B] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer font-inter group"
          >
            <span v-if="!localData.antecedentes">Selecionar arquivo</span>
            <span v-else>{{ localData.antecedentes.name }}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
          </button>
        </div>
      </label>

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
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Portuguese } from "flatpickr/dist/l10n/pt.js";
import { FILE_MAPPINGS } from "../../utils/fileUploadManager";
import { fileUploadManager } from "../../utils/fileUploadManager";

export default {
  name: 'StepAdmin',
  props: {
    formData: {
      type: Object,
      required: true
    },
    hasFirstPartner: {
      type: Boolean,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    cachedData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      localData: this.initializeData(),
      isTriggering: false
    }
  },
  computed: {
    displayNumber() {
      // Se tem sócio solicitante, começa do 1
      return this.hasFirstPartner ? this.index + 1 : this.index + 1;
    }
  },
  created() {
    console.log('StepAdmin - Created:', {
      hasFirstPartner: this.hasFirstPartner,
      index: this.index,
      displayNumber: this.displayNumber
    });
    
    // Garante que os dados começam vazios
    this.localData = this.getEmptyData();
  },
  methods: {
    initializeData() {
      // Usa dados em cache se existirem, senão retorna objeto vazio
      return this.cachedData || {
        nome: '',
        email: '',
        cpf: '',
        dataNascimento: '',
        telefone: '',
        cep: '',
        endereco: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        uf: '',
        pais: '',
        antecedentes: null
      };
    },
    getEmptyData() {
      return {
        nome: '',
        email: '',
        cpf: '',
        dataNascimento: '',
        telefone: '',
        cep: '',
        endereco: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        uf: '',
        pais: '',
        antecedentes: null
      };
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const fieldMapping = {
          0: 'antecedentesS1',
          1: 'antecedentesS2',
          2: 'antecedentesS3',
          3: 'antecedentesS4'
        };
        
        const mappingKey = fieldMapping[this.index];
        const customFieldName = FILE_MAPPINGS[mappingKey];
        
        if (customFieldName) {
          fileUploadManager.addFile(customFieldName, file);
          this.localData.antecedentes = file;
          
          console.log(`Antecedentes do Sócio ${this.displayNumber} selecionado:`, {
            nome: file.name,
            tamanho: file.size,
            tipo: file.type,
            campo: customFieldName
          });
        }
      }
    },
    async handleNext() {
      if (this.validateForm()) {
        const formattedData = {
          ...this.localData,
          dataNascimento: this.localData.dataNascimento ? 
            this.localData.dataNascimento.split('T')[0] + 'T10:45:00-0300' : ''
        };
        
        const mappedData = this.mapFields(formattedData);
        console.log('Dados sendo enviados do StepAdmin:', mappedData);
        
        this.$emit('next', mappedData);
        
        this.$emit('cache-socio', {
          index: this.index,
          data: this.localData
        });
      }
    },
    handlePrev() {
      this.$emit('prev');
    },
    mapFields(data) {
      console.log('StepAdmin - Index:', this.index);
      console.log('StepAdmin - É sócio 1?', this.formData.isSocio1);
      
      const mappingIndex = this.hasFirstPartner ? this.index : this.index;
      console.log('StepAdmin - Índice para mapping:', mappingIndex);

      const mappings = [
        {
          // Sócio 1
          nome: 'customfield_shorttext21',
          cpf: 'customfield_shorttext22',
          email: 'customfield_shorttext14',
          telefone: 'customfield_shorttext13',
          dataNascimento: 'customfield_date1',
          antecedentes: 'customfield_file4',
          cep: 'customfield_shorttext2',
          endereco: 'customfield_shorttext4',
          numero: 'customfield_shorttext3',
          complemento: 'customfield_shorttext12',
          bairro: 'customfield_shorttext5',
          cidade: 'customfield_shorttext8',
          uf: 'customfield_shorttext7',
          pais: 'customfield_shorttext10'
        },
        {
          // Sócio 2
          nome: 'customfield_shorttext48',
          cpf: 'customfield_shorttext60',
          email: 'customfield_shorttext52',
          telefone: 'customfield_shorttext40',
          dataNascimento: 'customfield_date5',
          antecedentes: 'customfield_file10',
          cep: 'customfield_shorttext55',
          endereco: 'customfield_shorttext42',
          numero: 'customfield_shorttext57',
          complemento: 'customfield_shorttext49',
          bairro: 'customfield_shorttext58',
          cidade: 'customfield_shorttext46',
          uf: 'customfield_shorttext59',
          pais: 'customfield_shorttext53'
        },
        {
          // Sócio 3
          nome: 'customfield_shorttext51',
          cpf: 'customfield_shorttext31',
          email: 'customfield_shorttext56',
          telefone: 'customfield_shorttext35',
          dataNascimento: 'customfield_date3',
          antecedentes: 'customfield_file9',
          cep: 'customfield_shorttext25',
          endereco: 'customfield_shorttext38',
          numero: 'customfield_shorttext30',
          complemento: 'customfield_shorttext37',
          bairro: 'customfield_shorttext28',
          cidade: 'customfield_shorttext39',
          uf: 'customfield_shorttext33',
          pais: 'customfield_shorttext41'
        },
        {
          // Sócio 4
          nome: 'customfield_shorttext44',
          cpf: 'customfield_shorttext27',
          email: 'customfield_shorttext43',
          telefone: 'customfield_shorttext26',
          dataNascimento: 'customfield_date4',
          antecedentes: 'customfield_file8',
          cep: 'customfield_shorttext45',
          endereco: 'customfield_shorttext29',
          numero: 'customfield_shorttext50',
          complemento: 'customfield_shorttext34',
          bairro: 'customfield_shorttext47',
          cidade: 'customfield_shorttext32',
          uf: 'customfield_shorttext54',
          pais: 'customfield_shorttext36'
        }
      ];

      const mapping = mappings[mappingIndex];
      if (!mapping) {
        console.error('Mapping não encontrado para índice:', mappingIndex);
        return data;
      }

      const result = {};
      Object.entries(data).forEach(([key, value]) => {
        if (mapping[key]) {
          result[mapping[key]] = value;
        }
      });

      console.log('Dados mapeados para sócio:', result);
      return result;
    },
    triggerFileInput(refName) {
      if (this.isTriggering) return;
      
      this.isTriggering = true;
      this.$refs[refName].click();
      
      setTimeout(() => {
        this.isTriggering = false;
      }, 100);
    },
    validateForm() {
      // Implemente a lógica para validar o formulário
      return true; // Placeholder, você deve implementar a lógica real
    }
  },
  watch: {
    formData: {
      immediate: true,
      deep: true,
      handler() {
        this.localData = this.initializeData();
      }
    }
  },
  mounted() {
    flatpickr(this.$refs.birthDatePicker, {
      dateFormat: "Y-m-d", // Alterado formato da data
      locale: Portuguese,
      defaultDate: this.localData.dataNascimento || null,
      onChange: (selectedDates) => {
        // Formata a data para o padrão ISO com timezone
        if (selectedDates[0]) {
          const date = selectedDates[0];
          this.localData.dataNascimento = date.toISOString().split('T')[0] + 'T10:45:00-0300';
        }
      }
    });
  }
};
</script>
