<template>
  <div>
    <h2 class="text-2xl font-bold mb-4 bg-gradient-to-r from-[#991B1B] to-[#7F1D1D] bg-clip-text text-transparent">Queremos conhecer você</h2>

    <h3 class="text-lg font-semibold mb-6 text-gray-700">Dados do Solicitante</h3>

    <form @submit.prevent="handleNext" class="space-y-4">
      <!-- Responsável pela empresa -->
      <div class="mb-6">
        <p class="text-sm font-medium text-gray-700 mb-3">Você é responsável pela empresa?</p>
        <div class="flex gap-4">
          <label class="flex items-center">
            <input type="radio" v-model="localData.isResponsible" :value="true" class="form-radio text-[#991B1B] focus:ring-[#991B1B]" />
            <span class="ml-2">Sim</span>
          </label>
          <label class="flex items-center">
            <input type="radio" v-model="localData.isResponsible" :value="false" class="form-radio text-[#991B1B] focus:ring-[#991B1B]" />
            <span class="ml-2">Não</span>
          </label>
        </div>
      </div>

      <!-- Campos que aparecem após a seleção -->
      <template v-if="localData.isResponsible !== null">
        <!-- Sócio ou proprietário -->
        <div class="mb-6" v-if="localData.isResponsible">
          <p class="text-sm font-medium text-gray-700 mb-3">Você é sócio ou proprietário da empresa?</p>
          <div class="flex gap-4">
            <label class="flex items-center">
              <input type="radio" v-model="localData.isPartner" :value="true" class="form-radio text-[#991B1B] focus:ring-[#991B1B]" />
              <span class="ml-2">Sim</span>
            </label>
            <label class="flex items-center">
              <input type="radio" v-model="localData.isPartner" :value="false" class="form-radio text-[#991B1B] focus:ring-[#991B1B]" />
              <span class="ml-2">Não</span>
            </label>
          </div>
        </div>

        <!-- Campos básicos -->
        <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
          Nome Completo:
          <input
            type="text"
            v-model="localData.nomeCompleto"
            class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
            required
            placeholder="Digite seu nome completo"
          />
        </label>

        <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
          Telefone:
          <input
            type="tel"
            v-model="localData.telefone"
            v-mask="'(XX) XXXXX-XXXX'"
            class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
            required
            placeholder="(00) 00000-0000"
          />
        </label>

        <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
          E-mail:
          <input
            type="email"
            v-model="localData.email"
            class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
            required
            placeholder="Digite seu e-mail"
          />
        </label>

        <!-- Campos adicionais para responsável -->
        <template v-if="localData.isResponsible === true">
          <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
            RG:
            <input
              type="text"
              v-model="localData.rg"
              class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
              required
              placeholder="Digite seu RG"
            />
          </label>

          <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
            CPF:
            <input
              type="text"
              v-model="localData.cpf"
              v-mask="'XXX.XXX.XXX-XX'"
              class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
              required
              placeholder="000.000.000-00"
            />
          </label>

          <!-- CEP -->
          <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
            CEP:
            <input
              type="text"
              v-model="localData.cep"
              v-mask="'XXX.XXX.XXX-XX'"
              class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
              required
              placeholder="00000-000"
            />
          </label>

          <!-- Endereço -->
          <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
            Endereço:
            <input
              type="text"
              v-model="localData.endereco"
              class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
              required
              placeholder="Digite o endereço"
            />
          </label>

          <!-- Número -->
          <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
            Número:
            <input
              type="text"
              v-model="localData.numero"
              class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
              required
              placeholder="Digite o número"
            />
          </label>

          <!-- Complemento -->
          <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
            Complemento:
            <input
              type="text"
              v-model="localData.complemento"
              class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
              placeholder="Digite o complemento"
            />
          </label>

          <!-- Bairro -->
          <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
            Bairro:
            <input
              type="text"
              v-model="localData.bairro"
              class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
              required
              placeholder="Digite o bairro"
            />
          </label>

          <!-- Cidade -->
          <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
            Cidade:
            <input
              type="text"
              v-model="localData.cidade"
              class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
              required
              placeholder="Digite a cidade"
            />
          </label>

          <!-- UF -->
          <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
            UF:
            <input
              type="text"
              v-model="localData.uf"
              class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
              :placeholder="`Digite a UF`"
            />
          </label>

          <!-- País -->
          <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
            País:
            <input
              type="text"
              v-model="localData.pais"
              class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
              required
              placeholder="Digite o país"
            />
          </label>

          <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
            Data de Nascimento:
            <input
              ref="birthDatePicker"
              type="text"
              v-model="localData.dataNascimento"
              class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
              required
              placeholder="Selecione a data"
              readonly
            />
          </label>

          <!-- Upload Atestado de Antecedentes -->
          <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
            Atestado de Antecedentes Criminais:
            <div class="mt-2">
              <input type="file" accept=".pdf" class="hidden" @change="handleFileUpload($event, 'antecedentesS1')" ref="fileInput" />
              <div
                @click="$refs.fileInput.click()"
                class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 text-gray-700 hover:bg-white hover:border-[#991B1B] hover:text-[#991B1B] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer font-inter group"
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
              </div>
            </div>
          </label>
        </template>
      </template>

      <!-- Botões -->
      <div class="flex justify-between pt-4">
        <button
          type="button"
          class="bg-gray-100 text-gray-700 hover:bg-gray-200 px-8 py-2.5 rounded-xl font-medium transition-all duration-300 font-inter hover:shadow-lg"
          @click="handlePrev"
        >
          Voltar
        </button>
        <button
          type="submit"
          class="bg-gradient-to-r from-[#991B1B] to-[#7F1D1D] text-white px-8 py-2.5 rounded-xl font-medium transition-all duration-300 font-inter hover:shadow-lg hover:scale-105"
          :disabled="localData.isResponsible === null"
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

export default {
  name: "StepDetails",
  props: {
    formData: {
      type: Object,
      required: true,
    },
    tempData: {
      type: Object,
      default: null,
    },
  },
  mounted() {
    if (this.localData.isResponsible === true) {
      flatpickr(this.$refs.birthDatePicker, {
        dateFormat: "Y-m-d",
        locale: Portuguese,
        defaultDate: this.localData.dataNascimento || null,
        onChange: (selectedDates) => {
          if (selectedDates[0]) {
            const date = selectedDates[0];
            this.localData.dataNascimento = date.toISOString().split('T')[0] + 'T10:45:00-0300';
          }
        }
      });
    }
  },
  watch: {
    "localData.isResponsible"(newValue) {
      if (newValue === true) {
        this.$nextTick(() => {
          flatpickr(this.$refs.birthDatePicker, {
            dateFormat: "Y-m-d",
            locale: Portuguese,
            defaultDate: this.localData.dataNascimento || null,
            onChange: (selectedDates) => {
              if (selectedDates[0]) {
                const date = selectedDates[0];
                this.localData.dataNascimento = date.toISOString().split('T')[0] + 'T10:45:00-0300';
              }
            }
          });
        });
      }
    },
  },
  data() {
    return {
      conselhoOptions: {
        ANEPS: "33662000000053199",
        FEBRABAN: "33662000000053201",
        CRECI: "33662000000053203",
        SUSEP: "33662000000053205",
        CORE: "33662000000053207",
      },
      localData: {
        isResponsible: null,
        isPartner: null,
        nomeCompleto: "",
        telefone: "",
        email: "",
        rg: "",
        cpf: "",
        cep: "",
        endereco: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        uf: "",
        pais: "",
        dataNascimento: "",
        antecedentes: null,
      },
    };
  },
  created() {
    // Usa dados temporários se existirem
    if (this.$parent.tempDetailsData) {
      this.localData = { ...this.$parent.tempDetailsData };
    }
  },
  methods: {
    handleNext() {
      const isSocio = this.localData.isResponsible && this.localData.isPartner;
      
      // Formata a data antes de enviar
      const formattedData = {
        ...this.localData,
        dataNascimento: this.localData.dataNascimento ? 
          this.localData.dataNascimento.split('T')[0] + 'T10:45:00-0300' : '',
        isResponsible: this.localData.isResponsible,
        isPartner: this.localData.isPartner,
        isSocio1: isSocio
      };

      console.log('StepDetails - Dados formatados:', formattedData);
      this.$emit('next', formattedData);
    },
    mapFields(data) {
      console.log('StepDetails - Dados recebidos:', data);
      
      // Se for sócio, mapeia direto como sócio 1
      if (data.isResponsible && data.isPartner) {
        const mappedData = {
          isSocio1: true,
          customfield_integer2: "1",
          customfield_shorttext21: data.nomeCompleto || '',
          customfield_shorttext22: data.cpf || '',
          customfield_shorttext14: data.email || '',
          customfield_shorttext13: data.telefone || '',
          customfield_date1: data.dataNascimento ? data.dataNascimento + 'T10:45:00-0300' : '',
          customfield_file4: data.antecedentes || null,
          customfield_shorttext2: data.cep || '',
          customfield_shorttext4: data.endereco || '',
          customfield_shorttext3: data.numero || '',
          customfield_shorttext12: data.complemento || '',
          customfield_shorttext5: data.bairro || '',
          customfield_shorttext8: data.cidade || '',
          customfield_shorttext7: data.uf || '',
          customfield_shorttext10: data.pais || ''
        };
        console.log('StepDetails - Mapeado como sócio 1:', mappedData);
        return mappedData;
      }

      // Se não for sócio, retorna dados temporários
      const tempData = {
        isSocio1: false,
        ...data
      };
      console.log('StepDetails - Dados temporários:', tempData);
      return tempData;
    },
    formatDate(dateString) {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toISOString().split("T")[0] + "T10:45:00-0300";
    },
    handlePrev() {
      this.$emit("prev");
    },
    handleFileUpload(event, type) {
      const file = event.target.files[0];
      if (file) {
        this.localData.antecedentes = file;
      }
    },
  },
};
</script>
