<template>
  <div>
    <h2 class="text-2xl font-bold mb-10 bg-gradient-to-r from-[#991B1B] to-[#7F1D1D] bg-clip-text text-transparent">
      Sócios Assinantes
    </h2>

    <!-- Pergunta inicial -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        É o único sócio assinante?
        <select
          v-model="localData.tipoAssinatura"
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter"
        >
          <option value="">Selecione uma opção</option>
          <option value="unico">Somente eu</option>
          <option value="multiplos">Outros assinantes</option>
        </select>
      </label>
    </div>

    <!-- Alert para único sócio -->
    <div v-if="localData.tipoAssinatura === 'unico'" class="mb-6">
      <div class="bg-green-50 border-l-4 border-green-400 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-green-700">
              Você pode prosseguir para a próxima etapa, pois já temos seus dados como sócio solicitante.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Quantidade de sócios adicionais -->
    <div v-if="localData.tipoAssinatura === 'multiplos'" class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        Quantos sócios além de você assinam?
        <select
          v-model="localData.quantidadeSocios"
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter"
        >
          <option value="">Selecione uma quantidade</option>
          <option value="1">1 sócio adicional</option>
          <option value="2">2 sócios adicionais</option>
          <option value="3">3 sócios adicionais</option>
        </select>
      </label>
    </div>

    <!-- Formulários dos sócios adicionais -->
    <template v-if="localData.tipoAssinatura === 'multiplos' && localData.quantidadeSocios">
      <div v-for="index in Number(localData.quantidadeSocios)" :key="index" class="mt-8 p-6 bg-gray-50 rounded-xl">
        <h3 class="text-lg font-semibold mb-6 text-gray-700">
          Dados do Sócio {{ index + 1 }}
        </h3>
        
        <!-- Campos do sócio -->
        <div class="space-y-4">
          <!-- Nome Completo -->
          <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
            Nome Completo:
            <input
              type="text"
              v-model="localData[`socio${index + 1}`].nome"
              class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter"
              :placeholder="`Digite o nome do Sócio ${index + 1}`"
            />
          </label>

          <!-- Email -->
          <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
            Email:
            <input
              type="email"
              v-model="localData[`socio${index + 1}`].email"
              class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter"
              :placeholder="`Digite o email do Sócio ${index + 1}`"
            />
          </label>

          <!-- CPF -->
          <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
            CPF:
            <input
              v-mask="'XXX.XXX.XXX-XX'"
              type="text"
              v-model="localData[`socio${index + 1}`].cpf"
              class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter"
              :placeholder="`Digite o CPF do Sócio ${index + 1}`"
            />
          </label>

          <!-- Data de Nascimento -->
          <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
            Data de Nascimento:
            <input
              type="text"
              :ref="`birthDatePicker${index + 1}`"
              v-model="localData[`socio${index + 1}`].dataNascimento"
              class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter"
              placeholder="Selecione a data"
            />
          </label>

          <!-- Telefone -->
          <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
            Telefone:
            <input
              v-mask="'(XX) XXXXXXXXX'"
              type="tel"
              v-model="localData[`socio${index + 1}`].telefone"
              class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter"
              :placeholder="`Digite o telefone do Sócio ${index + 1}`"
            />
          </label>

          <!-- CEP -->
          <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
            CEP:
            <input
              v-mask="'XXXXX-XXX'"
              type="text"
              v-model="localData[`socio${index + 1}`].cep"
              class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter"
              :placeholder="`Digite o CEP do Sócio ${index + 1}`"
            />
          </label>

          <!-- Endereço -->
          <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
            Endereço:
            <input
              type="text"
              v-model="localData[`socio${index + 1}`].endereco"
              class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter"
              :placeholder="`Digite o endereço do Sócio ${index + 1}`"
            />
          </label>

          <!-- Número -->
          <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
            Número:
            <input
              type="text"
              v-model="localData[`socio${index + 1}`].numero"
              class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter"
              :placeholder="`Digite o número do Sócio ${index + 1}`"
            />
          </label>

          <!-- Complemento -->
          <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
            Complemento:
            <input
              type="text"
              v-model="localData[`socio${index + 1}`].complemento"
              class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter"
              :placeholder="`Digite o complemento do Sócio ${index + 1}`"
            />
          </label>

          <!-- Bairro -->
          <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
            Bairro:
            <input
              type="text"
              v-model="localData[`socio${index + 1}`].bairro"
              class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter"
              :placeholder="`Digite o bairro do Sócio ${index + 1}`"
            />
          </label>

          <!-- Cidade -->
          <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
            Cidade:
            <input
              type="text"
              v-model="localData[`socio${index + 1}`].cidade"
              class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter"
              :placeholder="`Digite a cidade do Sócio ${index + 1}`"
            />
          </label>

          <!-- UF -->
          <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
            UF:
            <input
              type="text"
              v-model="localData[`socio${index + 1}`].uf"
              class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter"
              :placeholder="`Digite a UF do Sócio ${index + 1}`"
            />
          </label>

          <!-- País -->
          <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
            País:
            <input
              type="text"
              v-model="localData[`socio${index + 1}`].pais"
              class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter"
              :placeholder="`Digite o país do Sócio ${index + 1}`"
            />
          </label>

          <!-- Atestado de Antecedentes Criminais -->
          <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
            Atestado de Antecedentes Criminais:
            <div class="mt-2">
              <input
                type="file"
                :id="`antecedentes-socio-${index + 1}`"
                :name="getFileFieldName(index)"
                accept=".pdf"
                class="hidden"
                @change="handleFileUpload"
                :ref="`fileInput${index + 1}`"
              />
              <button 
                type="button"
                @click="triggerFileInput(`fileInput${index + 1}`)"
                class="w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 text-gray-700 hover:bg-white hover:border-[#991B1B] hover:text-[#991B1B] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer font-inter group"
              >
                <span v-if="!localData[`socio${index + 1}`].antecedentes?.file">Selecionar arquivo</span>
                <span v-else>{{ localData[`socio${index + 1}`].antecedentes.file.name }}</span>
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
        </div>
      </div>
    </template>

    <!-- Botões de navegação -->
    <div class="flex justify-between mt-8">
      <button
        type="button"
        @click="$emit('prev')"
        class="bg-gray-100 text-gray-700 hover:bg-gray-200 px-8 py-2.5 rounded-xl font-medium transition-all duration-300 font-inter hover:shadow-lg"
      >
        Voltar
      </button>
      <button
        type="button"
        @click="handleNext"
        class="bg-gradient-to-r from-[#991B1B] to-[#7F1D1D] text-white px-8 py-2.5 rounded-xl font-medium transition-all duration-300 font-inter hover:shadow-lg hover:scale-105"
        :disabled="!isFormValid"
      >
        Próximo
      </button>
    </div>
  </div>
</template>

<script>
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Portuguese } from "flatpickr/dist/l10n/pt.js";
import { ref, reactive } from 'vue';

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
      localData: reactive({
        tipoAssinatura: '',
        quantidadeSocios: '',
        cnpj: this.formData.customfield_shorttext20 || '',
        socio2: this.initSocioData(),
        socio3: this.initSocioData(),
        socio4: this.initSocioData()
      }),
      flatpickrInstances: []
    };
  },
  methods: {
    initSocioData() {
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
    initializeFlatpickr() {
      this.flatpickrInstances.forEach(instance => instance.destroy());
      this.flatpickrInstances = [];

      if (this.localData.tipoAssinatura === 'multiplos' && this.localData.quantidadeSocios) {
        const qtdSocios = Number(this.localData.quantidadeSocios);
        
        this.$nextTick(() => {
          for (let i = 1; i <= qtdSocios; i++) {
            const element = this.$refs[`birthDatePicker${i + 1}`];
            if (element) {
              const instance = flatpickr(element, {
                locale: Portuguese,
                dateFormat: "Y-m-d",
                maxDate: new Date(),
                allowInput: true,
                onChange: (selectedDates) => {
                  if (selectedDates[0]) {
                    const date = selectedDates[0];
                    const formattedDate = date.toISOString().split('T')[0] + 'T10:45:00-0300';
                    this.localData[`socio${i + 1}`].dataNascimento = formattedDate;
                  }
                }
              });
              this.flatpickrInstances.push(instance);
            }
          }
        });
      }
    },
    formatDateForZoho(date) {
      if (!date) return '';
      // Se a data já tiver o formato completo, retorna ela mesma
      if (date.includes('T10:45:00-0300')) {
        return date;
      }
      // Se for apenas YYYY-MM-DD, adiciona o restante
      return date + 'T10:45:00-0300';
    },
    getFileFieldName(index) {
      // Mapeamento correto dos api_names para cada sócio
      const fileFieldMap = {
        0: 'customfield_file10', // Sócio 2
        1: 'customfield_file9',  // Sócio 3
        2: 'customfield_file8'   // Sócio 4
      };
      return fileFieldMap[index];
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      const fieldName = event.target.name;
      const socioNumber = parseInt(event.target.id.split('-')[2]);
      
      if (file) {
        // Atualiza o arquivo no localData com o api_name correto
        this.localData[`socio${socioNumber}`].antecedentes = {
          file,
          apiName: fieldName
        };
      }
    },
    triggerFileInput(ref) {
      if (this.$refs[ref] && this.$refs[ref][0]) {
        this.$refs[ref][0].click();
      }
    },
    handleNext() {
      const formData = {
        customfield_shorttext20: this.formData.customfield_shorttext20,
        tipoAssinatura: this.localData.tipoAssinatura,
        quantidadeSocios: this.localData.quantidadeSocios,
      };

      if (this.localData.tipoAssinatura === 'multiplos') {
        // Mapeamento para Sócio 2
        if (this.localData.socio2) {
          formData.customfield_shorttext25 = this.localData.socio2.nome;
          formData.customfield_shorttext26 = this.localData.socio2.email;
          formData.customfield_shorttext27 = this.localData.socio2.cpf;
          formData.customfield_date3 = this.localData.socio2.dataNascimento;
          formData.customfield_shorttext28 = this.localData.socio2.telefone;
          formData.customfield_shorttext29 = this.localData.socio2.cep;
          formData.customfield_shorttext30 = this.localData.socio2.endereco;
          formData.customfield_shorttext31 = this.localData.socio2.numero;
          formData.customfield_shorttext32 = this.localData.socio2.complemento;
          formData.customfield_shorttext33 = this.localData.socio2.bairro;
          formData.customfield_shorttext34 = this.localData.socio2.cidade;
          formData.customfield_shorttext35 = this.localData.socio2.uf;
          formData.customfield_shorttext36 = this.localData.socio2.pais;
          if (this.localData.socio2.antecedentes?.file) {
            formData.customfield_file10 = this.localData.socio2.antecedentes.file;
          }
        }

        // Mapeamento para Sócio 3
        if (this.localData.socio3) {
          formData.customfield_shorttext37 = this.localData.socio3.nome;
          formData.customfield_shorttext38 = this.localData.socio3.email;
          formData.customfield_shorttext39 = this.localData.socio3.cpf;
          formData.customfield_date4 = this.localData.socio3.dataNascimento;
          formData.customfield_shorttext40 = this.localData.socio3.telefone;
          formData.customfield_shorttext41 = this.localData.socio3.cep;
          formData.customfield_shorttext42 = this.localData.socio3.endereco;
          formData.customfield_shorttext43 = this.localData.socio3.numero;
          formData.customfield_shorttext44 = this.localData.socio3.complemento;
          formData.customfield_shorttext45 = this.localData.socio3.bairro;
          formData.customfield_shorttext46 = this.localData.socio3.cidade;
          formData.customfield_shorttext47 = this.localData.socio3.uf;
          formData.customfield_shorttext48 = this.localData.socio3.pais;
          if (this.localData.socio3.antecedentes?.file) {
            formData.customfield_file9 = this.localData.socio3.antecedentes.file;
          }
        }

        // Mapeamento para Sócio 4
        if (this.localData.socio4) {
          formData.customfield_shorttext49 = this.localData.socio4.nome;
          formData.customfield_shorttext50 = this.localData.socio4.email;
          formData.customfield_shorttext51 = this.localData.socio4.cpf;
          formData.customfield_date5 = this.localData.socio4.dataNascimento;
          formData.customfield_shorttext52 = this.localData.socio4.telefone;
          formData.customfield_shorttext53 = this.localData.socio4.cep;
          formData.customfield_shorttext54 = this.localData.socio4.endereco;
          formData.customfield_shorttext55 = this.localData.socio4.numero;
          formData.customfield_shorttext56 = this.localData.socio4.complemento;
          formData.customfield_shorttext57 = this.localData.socio4.bairro;
          formData.customfield_shorttext58 = this.localData.socio4.cidade;
          formData.customfield_shorttext59 = this.localData.socio4.uf;
          formData.customfield_shorttext60 = this.localData.socio4.pais;
          if (this.localData.socio4.antecedentes?.file) {
            formData.customfield_file8 = this.localData.socio4.antecedentes.file;
          }
        }
      }

      this.$emit("next", formData);
    }
  },
  computed: {
    isFormValid() {
      if (this.localData.tipoAssinatura === 'unico') return true;
      if (!this.localData.quantidadeSocios) return false;

      const qtdSocios = Number(this.localData.quantidadeSocios);
      for (let i = 1; i <= qtdSocios; i++) {
        const socio = this.localData[`socio${i + 1}`];
        if (!socio?.nome || !socio?.email || !socio?.cpf || !socio?.dataNascimento) {
          return false;
        }
      }
      return true;
    },
    displayNumber() {
      return this.index + 1;
    }
  },
  watch: {
    'localData.quantidadeSocios'(newValue) {
      this.$nextTick(() => {
        this.initializeFlatpickr();
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initializeFlatpickr();
    });
  },
  beforeUnmount() {
    this.flatpickrInstances.forEach(instance => instance.destroy());
  }
};
</script>
