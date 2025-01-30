<template>
  <div>
    <h2 class="text-2xl font-bold mb-10 bg-gradient-to-r from-[#991B1B] to-[#7F1D1D] bg-clip-text text-transparent">
      Documentos
    </h2>
    <form @submit.prevent="handleNext" class="space-y-4">
      <!-- Contrato Social -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
          Contrato Social:
          <div class="mt-2">
            <input
              type="file"
              @change="(e) => handleFileUpload('contratoSocial', e)"
              class="hidden"
              ref="fileInput1"
              accept=".pdf"
            />
            <button 
              type="button"
              @click="$refs.fileInput1.click()"
              class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 text-gray-700 hover:bg-white hover:border-[#991B1B] hover:text-[#991B1B] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer font-inter group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <span>Escolher arquivo PDF</span>
            </button>
          </div>
        </label>
      </div>

      <!-- Dados Bancários -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
          Dados Bancários:
          <div class="mt-2">
            <input
              type="file"
              @change="(e) => handleFileUpload('dadosBancarios', e)"
              class="hidden"
              ref="fileInput2"
              accept=".pdf"
            />
            <button 
              type="button"
              @click="$refs.fileInput2.click()"
              class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 text-gray-700 hover:bg-white hover:border-[#991B1B] hover:text-[#991B1B] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer font-inter group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <span>Escolher arquivo PDF</span>
            </button>
          </div>
        </label>
      </div>

      <!-- Certificado do Conselho de Classe -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
          Certificado do Conselho de Classe:
          <div class="mt-2">
            <input
              type="file"
              @change="(e) => handleFileUpload('certificadoConselhoClasse', e)"
              class="hidden"
              ref="fileInput3"
              accept=".pdf"
            />
            <button 
              type="button"
              @click="$refs.fileInput3.click()"
              class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 text-gray-700 hover:bg-white hover:border-[#991B1B] hover:text-[#991B1B] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer font-inter group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <span>Escolher arquivo PDF</span>
            </button>
          </div>
        </label>
      </div>

      <!-- Inscrição Municipal -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
          Inscrição Municipal:
          <div class="mt-2">
            <input
              type="file"
              @change="(e) => handleFileUpload('inscricaoMunicipal', e)"
              class="hidden"
              ref="fileInput4"
              accept=".pdf"
            />
            <button 
              type="button"
              @click="$refs.fileInput4.click()"
              class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 text-gray-700 hover:bg-white hover:border-[#991B1B] hover:text-[#991B1B] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer font-inter group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <span>Escolher arquivo PDF</span>
            </button>
          </div>
        </label>
      </div>

      <!-- CND -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
          CND:
          <div class="mt-2">
            <input
              type="file"
              @change="(e) => handleFileUpload('cnd', e)"
              class="hidden"
              ref="fileInput5"
              accept=".pdf"
            />
            <button 
              type="button"
              @click="$refs.fileInput5.click()"
              class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 text-gray-700 hover:bg-white hover:border-[#991B1B] hover:text-[#991B1B] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer font-inter group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <span>Escolher arquivo PDF</span>
            </button>
          </div>
        </label>
      </div>

      <!-- Tipo de Conselho -->
      <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
        Tipo de Conselho:
        <select 
          v-model="localData.tipoConselho"
          class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
        >
          <option value="">Selecione um conselho</option>
          <option value="ANEPS">ANEPS</option>
          <option value="FEBRABAN">FEBRABAN</option>
          <option value="CRECI">CRECI</option>
          <option value="SUSEP">SUSEP</option>
          <option value="CORE">CORE</option>
        </select>
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
import { FILE_MAPPINGS } from '../../utils/fileUploadManager';
import { fileUploadManager } from '../../utils/fileUploadManager';

export default {
  name: 'StepDocuments',
  props: {
    formData: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  data() {
    return {
      localData: {
        customfield_file1: null,  // Contrato Social
        customfield_file2: null,  // Dados Bancarios
        customfield_file3: null,  // Certificado Conselho de Classe
        customfield_file4: null,  // Atestado de Antecedentes Criminais Socio 1
        customfield_file5: null,  // Inscricao Municipal
        customfield_file6: null,  // CND
        customfield_file7: null,  // Cartao CNPJ
        customfield_file8: null,  // Atestado de Antecedentes Criminais Socio 4
        customfield_file9: null,  // Atestado de Antecedentes Criminais Socio 3
        customfield_file10: null  // Atestado de Antecedentes Criminais Socio 2
      }
    }
  },
  methods: {
    handleFileUpload(field, event) {
      const file = event.target.files[0];
      if (file) {
        const customFieldName = FILE_MAPPINGS[field];
        if (customFieldName) {
          fileUploadManager.addFile(customFieldName, file);
          this.localData[customFieldName] = file;
          
          console.log(`Arquivo ${field} selecionado:`, {
            nome: file.name,
            tamanho: file.size,
            tipo: file.type,
            campo: customFieldName
          });
        }
      }
    },
    handleNext() {
      console.log('Dados dos documentos antes do envio:', 
        Object.entries(this.localData)
          .filter(([_, value]) => value instanceof File)
          .map(([key, file]) => ({
            campo: key,
            arquivo: file.name
          }))
      );
      this.$emit('next', this.localData);
    }
  },
  created() {
    // Inicializa com os valores do formData se existirem
    if (this.formData) {
      this.localData = {
        customfield_file1: this.formData.customfield_file1 || null,
        customfield_file2: this.formData.customfield_file2 || null,
        customfield_file3: this.formData.customfield_file3 || null,
        customfield_file4: this.formData.customfield_file4 || null,
        customfield_file5: this.formData.customfield_file5 || null,
        customfield_file6: this.formData.customfield_file6 || null,
        customfield_file7: this.formData.customfield_file7 || null,
        customfield_file8: this.formData.customfield_file8 || null,
        customfield_file9: this.formData.customfield_file9 || null,
        customfield_file10: this.formData.customfield_file10 || null
      };
    }
  }
}
</script>
