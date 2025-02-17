<template>
  <div>
    <h2 class="text-2xl font-bold mb-4 bg-gradient-to-r from-[#991B1B] to-[#7F1D1D] bg-clip-text text-transparent">Queremos conhecer você</h2>

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

      <!-- Campos condicionais baseados na resposta -->
      <template v-if="localData.isResponsible !== null">
        <!-- Se for responsável -->
        <template v-if="localData.isResponsible">
          <div class="mb-6">
            <p class="text-sm font-medium text-gray-700 mb-3">Você é sócio administrador?</p>
            <div class="flex gap-4">
              <label class="flex items-center">
                <input type="radio" v-model="localData.isSocioAdmin" :value="true" class="form-radio text-[#991B1B] focus:ring-[#991B1B]" />
                <span class="ml-2">Sim</span>
              </label>
              <label class="flex items-center">
                <input type="radio" v-model="localData.isSocioAdmin" :value="false" class="form-radio text-[#991B1B] focus:ring-[#991B1B]" />
                <span class="ml-2">Não</span>
              </label>
            </div>
          </div>

          <!-- Campo de cargo quando não é sócio administrador -->
          <div v-if="localData.isSocioAdmin === false" class="mb-6">
            <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <div class="flex">
                <div class="flex-shrink-0">
                  <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-3">
                  <p class="text-sm text-yellow-700">
                    Por favor, preencha os dados do sócio administrador que assina pela empresa.
                  </p>
                </div>
              </div>
            </div>


            <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
              Qual seu cargo na empresa?
              <input
                type="text"
                v-model="localData.cargo"
                class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
                placeholder="Ex: Diretor, Gerente, etc"
              />
            </label>


          </div>

          <!-- Dados do Sócio 1 (apenas quando todas as perguntas foram respondidas) -->
          <div v-if="mostrarCamposSocio1" class="mt-8">
            <h3 class="text-lg font-semibold mb-6 text-gray-700">
              {{ getTituloCamposSocio }}
            </h3>

            <!-- CNPJ -->
            <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
              CNPJ:
              <input
                type="text"
                v-model="localData.socio1.cnpj"
                v-imask="'00.000.000/0000-00'"
                :disabled="cnpjBloqueado"
                class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400 disabled:bg-gray-100 disabled:text-gray-600 disabled:cursor-not-allowed"
                placeholder="00.000.000/0000-00"
                @blur="buscarDadosCNPJ"
              />
            </label>

            <!-- Nome Completo - customfield_shorttext21 -->
            <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
              Nome Completo:
              <input
                type="text"
                v-model="localData.socio1.nomeCompleto"
                class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
                placeholder="Digite o nome completo"
              />
            </label>

            <!-- CPF - customfield_shorttext22 -->
            <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
              CPF:
              <input
                type="text"
                v-model="localData.socio1.cpf"
                v-imask="'000.000.000-00'"
                class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
                placeholder="000.000.000-00"
              />
            </label>

            <!-- Email - customfield_shorttext14 -->
            <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
              Email:
              <input
                type="email"
                v-model="localData.socio1.email"
                class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
                placeholder="Digite o email"
              />
            </label>

            <!-- Telefone - customfield_shorttext13 -->
            <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
              Telefone:
              <input
                type="text"
                v-model="localData.socio1.telefone"
                v-imask="'(00) 00000-0000'"
                class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
                placeholder="(00) 00000-0000"
              />
            </label>

            <!-- Data de Nascimento - customfield_date1 -->
            <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
              Data de Nascimento:
              <input
                type="text"
                ref="birthDatePicker"
                v-model="localData.socio1.dataNascimento"
                class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
                placeholder="Selecione a data"
              />
            </label>

            <!-- CEP - customfield_shorttext2 -->
            <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
              CEP:
              <input
                type="text"
                v-model="localData.socio1.cep"
                v-imask="'00000-000'"
                class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
                placeholder="00000-000"
              />
            </label>

            <!-- Endereço - customfield_shorttext4 -->
            <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
              Endereço:
              <input
                type="text"
                v-model="localData.socio1.endereco"
                class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
                placeholder="Digite o endereço"
              />
            </label>

            <!-- Número - customfield_shorttext3 -->
            <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
              Número:
              <input
                type="text"
                v-model="localData.socio1.numero"
                class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
                placeholder="Digite o número"
              />
            </label>

            <!-- Complemento - customfield_shorttext12 -->
            <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
              Complemento:
              <input
                type="text"
                v-model="localData.socio1.complemento"
                class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
                placeholder="Digite o complemento"
              />
            </label>

            <!-- Bairro - customfield_shorttext5 -->
            <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
              Bairro:
              <input
                type="text"
                v-model="localData.socio1.bairro"
                class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
                placeholder="Digite o bairro"
              />
            </label>

            <!-- Cidade - customfield_shorttext8 -->
            <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
              Cidade:
              <input
                type="text"
                v-model="localData.socio1.cidade"
                class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
                placeholder="Digite a cidade"
              />
            </label>

            <!-- UF - customfield_shorttext7 -->
            <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
              UF:
              <input
                type="text"
                v-model="localData.socio1.uf"
                class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
                placeholder="Digite a UF"
                maxlength="2"
              />
            </label>

            <!-- País - customfield_shorttext10 -->
            <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
              País:
              <input
                type="text"
                v-model="localData.socio1.pais"
                class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
                placeholder="Digite o país"
              />
            </label>

            <!-- Antecedentes - customfield_file4 -->
            <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
              Atestado de Antecedentes Criminais:
              <div class="mt-2">
                <input
                  type="file"
                  id="antecedentes-socio-1"
                  name="customfield_file4"
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
                  <span v-if="!localData.socio1.antecedentes">Selecionar arquivo</span>
                  <span v-else>{{ localData.socio1.antecedentes.name }}</span>
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
        </template>

        <!-- Se não for responsável -->
        <template v-else>
          <div class="mb-6">
            <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <div class="flex">
                <div class="flex-shrink-0">
                  <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-3">
                  <p class="text-sm text-yellow-700">
                    Por favor, preencha os dados do sócio administrador que assina pela empresa.
                  </p>
                </div>
              </div>
            </div>
            <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
              Qual sua relação com a empresa?
              <input
                type="text"
                v-model="localData.relacaoEmpresa"
                class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
                placeholder="Ex: Secretária, Contador, etc"
              />
            </label>
          </div>

          <!-- Adicionando os campos do sócio aqui também -->
          <div class="mt-8">
            <!-- <h3 class="text-lg font-semibold mb-6 text-gray-700">
              Dados do Sócio Administrador
            </h3> -->
            <div v-if="mostrarCamposSocio1" class="mt-8">
            <h3 class="text-lg font-semibold mb-6 text-gray-700">
              {{ getTituloCamposSocio }}
            </h3>

            <!-- CNPJ -->
            <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
              CNPJ:
              <input
                type="text"
                v-model="localData.socio1.cnpj"
                v-imask="'00.000.000/0000-00'"
                :disabled="cnpjBloqueado"
                class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400 disabled:bg-gray-100 disabled:text-gray-600 disabled:cursor-not-allowed"
                placeholder="00.000.000/0000-00"
                @blur="buscarDadosCNPJ"
              />
            </label>

            <!-- Nome Completo - customfield_shorttext21 -->
            <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
              Nome Completo:
              <input
                type="text"
                v-model="localData.socio1.nomeCompleto"
                class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
                placeholder="Digite o nome completo"
              />
            </label>

            <!-- CPF - customfield_shorttext22 -->
            <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
              CPF:
              <input
                type="text"
                v-model="localData.socio1.cpf"
                v-imask="'000.000.000-00'"
                class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
                placeholder="000.000.000-00"
              />
            </label>

            <!-- Email - customfield_shorttext14 -->
            <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
              Email:
              <input
                type="email"
                v-model="localData.socio1.email"
                class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
                placeholder="Digite o email"
              />
            </label>

            <!-- Telefone - customfield_shorttext13 -->
            <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
              Telefone:
              <input
                type="text"
                v-model="localData.socio1.telefone"
                v-imask="'(00) 00000-0000'"
                class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
                placeholder="(00) 00000-0000"
              />
            </label>

            <!-- Data de Nascimento - customfield_date1 -->
            <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
              Data de Nascimento:
              <input
                type="text"
                ref="birthDatePicker"
                v-model="localData.socio1.dataNascimento"
                class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
                placeholder="Selecione a data"
              />
            </label>

            <!-- CEP - customfield_shorttext2 -->
            <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
              CEP:
              <input
                type="text"
                v-model="localData.socio1.cep"
                v-imask="'00000-000'"
                class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
                placeholder="00000-000"
              />
            </label>

            <!-- Endereço - customfield_shorttext4 -->
            <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
              Endereço:
              <input
                type="text"
                v-model="localData.socio1.endereco"
                class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
                placeholder="Digite o endereço"
              />
            </label>

            <!-- Número - customfield_shorttext3 -->
            <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
              Número:
              <input
                type="text"
                v-model="localData.socio1.numero"
                class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
                placeholder="Digite o número"
              />
            </label>

            <!-- Complemento - customfield_shorttext12 -->
            <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
              Complemento:
              <input
                type="text"
                v-model="localData.socio1.complemento"
                class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
                placeholder="Digite o complemento"
              />
            </label>

            <!-- Bairro - customfield_shorttext5 -->
            <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
              Bairro:
              <input
                type="text"
                v-model="localData.socio1.bairro"
                class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
                placeholder="Digite o bairro"
              />
            </label>

            <!-- Cidade - customfield_shorttext8 -->
            <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
              Cidade:
              <input
                type="text"
                v-model="localData.socio1.cidade"
                class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
                placeholder="Digite a cidade"
              />
            </label>

            <!-- UF - customfield_shorttext7 -->
            <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
              UF:
              <input
                type="text"
                v-model="localData.socio1.uf"
                class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
                placeholder="Digite a UF"
                maxlength="2"
              />
            </label>

            <!-- País - customfield_shorttext10 -->
            <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
              País:
              <input
                type="text"
                v-model="localData.socio1.pais"
                class="mt-1 w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/30 shadow-sm hover:bg-white focus:bg-white focus:border-[#991B1B] focus:ring-[#991B1B] focus:ring-2 transition-all duration-300 font-inter placeholder-gray-400"
                placeholder="Digite o país"
              />
            </label>

            <!-- Antecedentes - customfield_file4 -->
            <label class="block text-sm font-medium text-gray-700 mb-2 font-inter">
              Atestado de Antecedentes Criminais:
              <div class="mt-2">
                <input
                  type="file"
                  id="antecedentes-socio-1"
                  name="customfield_file4"
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
                  <span v-if="!localData.socio1.antecedentes">Selecionar arquivo</span>
                  <span v-else>{{ localData.socio1.antecedentes.name }}</span>
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
          :disabled="!isFormValid"
        >
          Próximo
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { IMaskDirective } from 'vue-imask'
import flatpickr from 'flatpickr'
import { Portuguese } from 'flatpickr/dist/l10n/pt'
import 'flatpickr/dist/flatpickr.css'
import { fileUploadManager } from '../../utils/fileUploadManager'
import Swal from 'sweetalert2'

export default {
  name: "StepDetails",
  directives: {
    imask: IMaskDirective
  },
  props: {
    formData: {
      type: Object,
      required: true,
    },
    cnpjData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      localData: {
        tipoAssinatura: '',
        quantidadeSocios: '',
        isResponsible: null,
        isSocioAdmin: null,
        cargo: "",
        relacaoEmpresa: "",
        socio1: {
          cnpj: "",
          nomeCompleto: "",
          cpf: "",
          email: "",
          telefone: "",
          dataNascimento: "",
          cep: "",
          endereco: "",
          numero: "",
          complemento: "",
          bairro: "",
          cidade: "",
          uf: "",
          pais: "",
          antecedentes: null
        }
      },
      cnpjBloqueado: false,
      isTriggering: false,
      flatpickrInstance: null
    };
  },
  watch: {
    cnpjData: {
      immediate: true,
      deep: true,
      handler(newData) {
        if (newData?.qsa?.[0]) {
          const socio = newData.qsa[0];
          // Atualiza os dados do sócio com as informações da API
          this.localData.socio1 = {
            ...this.localData.socio1,
            nomeCompleto: socio.nome || '',
            cpf: socio.cpf_cnpj || '',
            // Adicione outros campos conforme disponibilidade na API
          };
        }
      }
    }
  },
  methods: {
    initializeFlatpickr() {
      if (this.$refs.birthDatePicker && !this.flatpickrInstance) {
        this.flatpickrInstance = flatpickr(this.$refs.birthDatePicker, {
          dateFormat: "Y-m-d",
          locale: Portuguese,
          defaultDate: this.localData.socio1.dataNascimento || null,
          onChange: (selectedDates) => {
            if (selectedDates[0]) {
              const date = selectedDates[0];
              this.localData.socio1.dataNascimento = date.toISOString().split('T')[0] + 'T10:45:00-0300';
            }
          }
        });
      }
    },
    handleNext() {
      const formData = {
        // Dados do solicitante diretamente na raiz
        customfield_shorttext20: this.localData.socio1.cnpj,
        customfield_shorttext21: this.localData.socio1.nomeCompleto,
        customfield_shorttext14: this.localData.socio1.email,
        customfield_shorttext22: this.localData.socio1.cpf,
        customfield_shorttext13: this.localData.socio1.telefone,
        customfield_date1: this.localData.socio1.dataNascimento + 'T10:45:00-0300',
        customfield_shorttext2: this.localData.socio1.cep,
        customfield_shorttext4: this.localData.socio1.endereco,
        customfield_shorttext3: this.localData.socio1.numero,
        customfield_shorttext12: this.localData.socio1.complemento,
        customfield_shorttext5: this.localData.socio1.bairro,
        customfield_shorttext8: this.localData.socio1.cidade,
        customfield_shorttext7: this.localData.socio1.uf,
        customfield_shorttext10: this.localData.socio1.pais,
        customfield_file4: this.localData.socio1.antecedentes,
        
        // Outros dados do formulário
        tipoAssinatura: this.localData.tipoAssinatura,
        quantidadeSocios: this.localData.quantidadeSocios,
        isResponsible: this.localData.isResponsible,
        isSocioAdmin: this.localData.isSocioAdmin,
        cargo: this.localData.cargo,
        relacaoEmpresa: this.localData.relacaoEmpresa
      };
      
      console.log('Dados sendo enviados:', formData);
      this.$emit('next', formData);
    },
    handlePrev() {
      this.$emit("prev");
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        fileUploadManager.addFile('customfield_file4', file);
        this.localData.socio1.antecedentes = file;
        
        console.log('Antecedentes do Sócio 1 selecionado:', {
          nome: file.name,
          tamanho: file.size,
          tipo: file.type,
          campo: 'customfield_file4'
        });
      }
    },
    triggerFileInput(refName) {
      if (this.isTriggering) return;
      
      this.isTriggering = true;
      this.$refs[refName].click();
      
      setTimeout(() => {
        this.isTriggering = false;
      }, 100);
    },
    async buscarDadosCNPJ() {
      if (!this.localData.socio1.cnpj) return;
      
      try {
        const cnpjLimpo = this.localData.socio1.cnpj.replace(/\D/g, '');
        
        if (cnpjLimpo.length !== 14) {
          await Swal.fire({
            title: 'CNPJ Inválido',
            text: 'Por favor, digite um CNPJ válido com 14 dígitos.',
            icon: 'error',
            confirmButtonColor: '#991B1B'
          });
          return;
        }

        const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpjLimpo}`);
        const data = await response.json();
        
        if (response.ok) {
          const socioAdmin = data.qsa?.find(socio => 
            socio.qualificacao_socio?.toLowerCase().includes('administrador')
          );

          // Preenche apenas os dados do sócio, sem endereço
          this.localData.socio1 = {
            ...this.localData.socio1,
            nomeCompleto: socioAdmin?.nome_socio || '',
            cpf: socioAdmin?.cnpj_cpf_do_socio?.replace(/[^0-9]/g, '') || ''
          };

          await Swal.fire({
            title: 'CNPJ Encontrado',
            html: `CNPJ encontrado com sucesso!<br><br>Sócio Administrador: <span class="font-bold">${socioAdmin?.nome_socio || 'Não encontrado'}</span>`,
            icon: 'success',
            confirmButtonColor: '#991B1B'
          });

          // Bloqueia o campo após o preenchimento bem-sucedido
          this.cnpjBloqueado = true;
        } else {
          await Swal.fire({
            title: 'CNPJ não encontrado',
            text: 'Não foi possível encontrar os dados deste CNPJ. Por favor, verifique o número e tente novamente.',
            icon: 'error',
            confirmButtonColor: '#991B1B'
          });
        }
      } catch (error) {
        console.error('Erro ao buscar CNPJ:', error);
        await Swal.fire({
          title: 'Erro',
          text: 'Ocorreu um erro ao buscar os dados do CNPJ. Por favor, tente novamente.',
          icon: 'error',
          confirmButtonColor: '#991B1B'
        });
      }
    }
  },
  computed: {
    mostrarCamposSocio1() {
      return true;
    },
    mostrarCamposCNPJ() {
      return this.localData.tipoAssinatura === 'unico' || 
             (this.localData.tipoAssinatura === 'multiplos' && this.localData.quantidadeSocios);
    },
    getTituloCamposSocio() {
      return "Dados do Sócio";
    },
    isFormValid() {
      if (this.localData.isResponsible === null) return false;
      
      if (this.localData.isResponsible) {
        if (this.localData.isSocioAdmin === null) return false;
        if (this.localData.isSocioAdmin === false && !this.localData.cargo) return false;
      } else {
        if (!this.localData.relacaoEmpresa) return false;
      }
      
      return true;
    },
    totalSocios() {
      if (this.localData.tipoAssinatura === 'unico') return 1;
      if (this.localData.tipoAssinatura === 'multiplos') {
        return Number(this.localData.quantidadeSocios) + 1; // +1 para incluir o sócio principal
      }
      return 0;
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initializeFlatpickr();
    });
  },
  updated() {
    this.$nextTick(() => {
      this.initializeFlatpickr();
    });
  },
  beforeUnmount() {
    if (this.flatpickrInstance) {
      this.flatpickrInstance.destroy();
    }
  }
};
</script>
