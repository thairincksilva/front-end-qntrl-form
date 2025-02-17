<template>
  <div>
    <h2 class="text-2xl font-bold mb-10 bg-gradient-to-r from-[#991B1B] to-[#7F1D1D] bg-clip-text text-transparent">Documentos</h2>
    <form @submit.prevent class="space-y-4">
      <!-- Contrato Social -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
          Contrato Social:
          <div class="mt-2">
            <input type="file" @change="(e) => handleFileUpload('contratoSocial', e)" class="hidden" ref="fileInput1" accept=".pdf" />
            <button
              type="button"
              @click="triggerFileInput('fileInput1')"
              class="w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 text-gray-700 hover:bg-white hover:border-[#991B1B] hover:text-[#991B1B] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer font-inter group"
            >
              <span v-if="!localData.customfield_file1">Selecionar arquivo</span>
              <span v-else>{{ localData.customfield_file1.name }}</span>
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

      <!-- Dados Bancários -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
          Dados Bancários:
          <div class="mt-2">
            <input type="file" @change="(e) => handleFileUpload('dadosBancarios', e)" class="hidden" ref="fileInput2" accept=".pdf" />
            <button
              type="button"
              @click="triggerFileInput('fileInput2')"
              class="w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 text-gray-700 hover:bg-white hover:border-[#991B1B] hover:text-[#991B1B] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer font-inter group"
            >
              <span v-if="!localData.customfield_file2">Selecionar arquivo</span>
              <span v-else>{{ localData.customfield_file2.name }}</span>
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

      <!-- Certificado do Conselho de Classe -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
          Certificado do Conselho de Classe:
          <div class="mt-2">
            <input type="file" @change="(e) => handleFileUpload('certificadoConselhoClasse', e)" class="hidden" ref="fileInput3" accept=".pdf" />
            <button
              type="button"
              @click="triggerFileInput('fileInput3')"
              class="w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 text-gray-700 hover:bg-white hover:border-[#991B1B] hover:text-[#991B1B] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer font-inter group"
            >
              <span v-if="!localData.customfield_file3">Selecionar arquivo</span>
              <span v-else>{{ localData.customfield_file3.name }}</span>
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

      <!-- Inscrição Municipal -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
          Inscrição Municipal:
          <div class="mt-2">
            <input type="file" @change="(e) => handleFileUpload('inscricaoMunicipal', e)" class="hidden" ref="fileInput4" accept=".pdf" />
            <button
              type="button"
              @click="triggerFileInput('fileInput4')"
              class="w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 text-gray-700 hover:bg-white hover:border-[#991B1B] hover:text-[#991B1B] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer font-inter group"
            >
              <span v-if="!localData.customfield_file5">Selecionar arquivo</span>
              <span v-else>{{ localData.customfield_file5.name }}</span>
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

      <!-- CND -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
          CND:
          <div class="mt-2">
            <input type="file" @change="(e) => handleFileUpload('cnd', e)" class="hidden" ref="fileInput5" accept=".pdf" />
            <button
              type="button"
              @click="triggerFileInput('fileInput5')"
              class="w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 text-gray-700 hover:bg-white hover:border-[#991B1B] hover:text-[#991B1B] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer font-inter group"
            >
              <span v-if="!localData.customfield_file6">Selecionar arquivo</span>
              <span v-else>{{ localData.customfield_file6.name }}</span>
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

      <!-- Tipo de Conselho -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        Tipo de Conselho:
        <select
          v-model="localData.tipoConselho"
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter"
        >
          <option value="">Selecione um conselho</option>
          <option v-for="(value, key) in conselhoOptions" :key="value" :value="value">
            {{ key }}
          </option>
        </select>
      </label>

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
          type="button"
          :disabled="isSubmitting"
          class="bg-gradient-to-r from-[#991B1B] to-[#7F1D1D] text-white px-8 py-2.5 rounded-xl font-medium transition-all duration-300 font-inter hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          @click="handleFinalSubmit"
        >
          {{ isSubmitting ? "Enviando..." : "Enviar Solicitação" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { FILE_MAPPINGS } from "../../utils/fileUploadManager";
import { fileUploadManager } from "../../utils/fileUploadManager";
import Swal from "sweetalert2";

export default {
  name: "StepDocuments",
  props: {
    formData: {
      type: Object,
      required: true,
      default: () => ({}),
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
        tipoConselho: "",
        inscricaoMunicipal: null,
        cnd: null,
      },
      isTriggering: false,
      isSubmitting: false,
    };
  },
  methods: {
    handleFileUpload(field, event) {
      const file = event.target.files[0];
      if (!file) return;

      const fieldMappings = {
        contratoSocial: "customfield_file1",
        dadosBancarios: "customfield_file2",
        certificadoConselhoClasse: "customfield_file3",
        antecedentesS1: "customfield_file4",
        inscricaoMunicipal: "customfield_file5",
        cnd: "customfield_file6",
        cartaoCnpj: "customfield_file7",
        antecedentesS4: "customfield_file8",
        antecedentesS3: "customfield_file9",
        antecedentesS2: "customfield_file10",
      };

      const customFieldName = fieldMappings[field];
      if (customFieldName) {
        fileUploadManager.addFile(customFieldName, file);
        this.localData[customFieldName] = file;

        console.log(`Arquivo ${field} selecionado:`, {
          nome: file.name,
          tamanho: file.size,
          tipo: file.type,
          campo: customFieldName,
        });
      }
    },
    mapFields(data) {
      return {
        customfield_dropdown1: data.tipoConselho || "",
        customfield_file1: data.customfield_file1 || null, // Contrato Social
        customfield_file2: data.customfield_file2 || null, // Dados Bancários
        customfield_file3: data.customfield_file3 || null, // Certificado Conselho
        customfield_file4: data.customfield_file4 || null, // Antecedentes Sócio 1
        customfield_file5: data.customfield_file5 || null, // Inscrição Municipal
        customfield_file6: data.customfield_file6 || null, // CND
        customfield_file7: data.customfield_file7 || null, // Cartão CNPJ
        customfield_file8: data.customfield_file8 || null, // Antecedentes Sócio 4
        customfield_file9: data.customfield_file9 || null, // Antecedentes Sócio 3
        customfield_file10: data.customfield_file10 || null, // Antecedentes Sócio 2
      };
    },
    handleNext() {
      const mappedData = this.mapFields(this.localData);
      this.$emit("next", mappedData);
    },
    triggerFileInput(refName) {
      if (this.isTriggering) return;

      this.isTriggering = true;
      this.$refs[refName].click();

      setTimeout(() => {
        this.isTriggering = false;
      }, 100);
    },
    async handleFinalSubmit() {
      if (this.isSubmitting) return;

      this.isSubmitting = true;

      try {
        await this.$parent.handleSubmit();

        await Swal.fire({
          title: "Sucesso!",
          text: "Sua solicitação foi enviada com sucesso!",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#991B1B",
        });

        this.$parent.resetForm();
      } catch (error) {
        await Swal.fire({
          title: "Erro!",
          text: error.message || "Ocorreu um erro ao enviar sua solicitação.",
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#991B1B",
        });
      } finally {
        this.isSubmitting = false;
      }
    },
    handlePrev() {
      this.$emit('prev', { fromComponent: 'StepCompany' });
    },
  },
  created() {
    if (this.formData) {
      this.localData = {
        customfield_file1: this.formData.customfield_file1 || null, // Contrato Social
        customfield_file2: this.formData.customfield_file2 || null, // Dados Bancários
        customfield_file3: this.formData.customfield_file3 || null, // Certificado Conselho
        customfield_file4: this.formData.customfield_file4 || null, // Antecedentes Sócio 1
        customfield_file5: this.formData.customfield_file5 || null, // Inscrição Municipal
        customfield_file6: this.formData.customfield_file6 || null, // CND
        customfield_file7: this.formData.customfield_file7 || null, // Cartão CNPJ
        customfield_file8: this.formData.customfield_file8 || null, // Antecedentes Sócio 4
        customfield_file9: this.formData.customfield_file9 || null, // Antecedentes Sócio 3
        customfield_file10: this.formData.customfield_file10 || null, // Antecedentes Sócio 2
        tipoConselho: this.formData.customfield_dropdown1 || "",
      };
    }
  },
};
</script>
