<script lang="ts">
import {defineComponent} from 'vue'
import GenderIconCase from "@/components/GenderIconCase.vue";
import store from "@/store";
import {mapActions} from "vuex";
import {AddressForms} from "@/util/FormUtils";
import mask from "@/util/InputMask";

export default defineComponent({
  name: "ProfileView",
  components: {GenderIconCase},
  data(){
    return {
      "firstName": store.state.user?.firstName ?? '',
      "lastName": store.state.user?.lastName  ?? '',
      "gender": store.state.user?.gender  ?? '',
      "username": store.state.user?.username  ?? '',
      "phone": store.state.user?.phone  ?? '',
      "cpf": store.state.user?.cpf  ?? '',
      "birthdate": store.state.user?.birthdate  ?? '',
      "addresses": store.state.user?.addresses  ?? [],
      'states': Object.values(AddressForms.STATE_DICTIONARY)
    }
  },
  mounted() {
    const editBtn = document.getElementById('editBtn');
    const saveBtn = document.getElementById('saveBtn');
    const profileForm = document.getElementById('profileForm') as HTMLFormElement | null;
    const formElements = profileForm?.elements as HTMLFormControlsCollection | undefined;
    const addAddressBtn = document.getElementById('addAddressBtn');
    const addressList = document.getElementById('addressList');

    if (editBtn && saveBtn && formElements && addAddressBtn && addressList) {
      editBtn.addEventListener('click', () => {
        if (editBtn.textContent === "Editar") {
          for (let i = 0; i < formElements.length; i++) {
            const element = formElements[i] as HTMLInputElement;
            element.disabled = false;
          }

          editBtn.textContent = "Cancelar";
          addAddressBtn.style.display = "block";
          saveBtn.style.display = 'block';
        } else {
          for (let i = 0; i < formElements.length; i++) {
            const element = formElements[i] as HTMLInputElement;
            element.disabled = true;
          }

          editBtn.textContent = "Editar";
          addAddressBtn.style.display = "none";
          saveBtn.style.display = 'none';
        }
      });

      for (let i = 0; i < formElements.length; i++) {
        const element = formElements[i] as HTMLInputElement;
        element.disabled = true;
      }
    }
  },
  methods: {
    ...mapActions(["setUser"]),
    wordMask(field: string){
      mask.wordMask(this.$data, field);
    },
    userMask(){
      mask.userMask(this.$data, 'username');
    },
    cpfMask(){
      mask.cpfMask(this.$data, 'cpf');
    },
    cellPhoneMask(){
      mask.phoneMask(this.$data, 'phone');
    },
    zipMask(address: any){
      mask.zipMask(address, 'zip');
    },
    houseNumberMask(){
      mask.houseNumberMask(this.$data, 'houseNumber');
    },
    getInputElement(element: Element, i:number){
      return element.children[i].children[1] as HTMLInputElement;
    },
    newAddress(){
      function wordMask(e: any){
        const target = e.target as HTMLInputElement;
        target.value = target.value.replace(/[^a-zA-Z ]/g, '');
      }

      const addressList = document.getElementById('addressList');
      const newAddress = document.createElement('div');
      const count = newAddress.childElementCount + 1;

      addressList?.appendChild(document.createElement("hr"));
      newAddress.classList.add("newAddress");

      newAddress.innerHTML = `
          <div class="formGroup" >
            <label for="zip${count}">CEP:</label>
            <input type="text" id="zip${count}" name="zip"  required>
          </div>

          <div class="formGroup">
            <label for="street${count}">Rua:</label>
            <input type="text" id="street${count}" name="street" required>
          </div>

          <div class="formGroup">
            <label for="number${count}">Número:</label>
            <input type="text" id="number${count}" name="number" required>
          </div>

          <div class="formGroup">
            <label for="neighborhood${count}">Bairro:</label>
            <input type="text" id="neighborhood${count}" name="neighborhood"  required>
          </div>


          <div class="formGroup">
            <label for="city${count}">Cidade:</label>
            <input type="text" id="city${count}" name="city" required>
          </div>

          <div class="formGroup">
            <label for="state${count}" >Estado:</label>
            <select id="state${count}" name="state" required>
                <option selected value="">-- Selecione --</option>
                <option value="ACRE">Acre</option>
                <option value="ALAGOAS">Alagoas</option>
                <option value="AMAPA">Amapa</option>
                <option value="AMAZONAS">Amazonas</option>
                <option value="BAHIA">Bahia</option>
                <option value="CEARA">Ceara</option>
                <option value="DISTRITO_FEDERAL">Distrito Federal</option>
                <option value="ESPIRITO_SANTO">Espirito Santo</option>
                <option value="GOIAS">Goias</option>
                <option value="MARANHAO">Maranhao</option>
                <option value="MATO_GROSSO">Mato Grosso</option>
                <option value="MATO_GROSSO_DO_SUL">Mato Grosso Do Sul</option>
                <option value="MINAS_GERAIS">Minas Gerais</option>
                <option value="PARA">Para</option>
                <option value="PARAIBA">Paraiba</option>
                <option value="PARANA">Parana</option>
                <option value="PERNAMBUCO">Pernambuco</option>
                <option value="PIAUI">Piaui</option>
                <option value="RIO_DE_JANEIRO">Rio De Janeiro</option>
                <option value="RIO_GRANDE_DO_NORTE">Rio Grande Do Norte</option>
                <option value="RIO_GRANDE_DO_SUL">Rio Grande Do Sul</option>
                <option value="RONDONIA">Rondonia</option>
                <option value="RORAIMA">Roraima</option>
                <option value="SANTA_CATARINA">Santa Catarina</option>
                <option value="SAO_PAULO">Sao Paulo</option>
                <option value="SERGIPE">Sergipe</option>
                <option value="TOCANTINS">Tocantins</option>
            </select>
          </div>
        `;
      addressList?.appendChild(newAddress);


      const zipInput = this.getInputElement(newAddress, 0);
      const streetInput = this.getInputElement(newAddress, 1);
      const numberInput = this.getInputElement(newAddress, 2);
      const neighborhoodInput = this.getInputElement(newAddress, 3);
      const cityInput = this.getInputElement(newAddress, 4);


      zipInput?.addEventListener('blur', async (event) => {


        const target = event.target as HTMLInputElement;

        if (!/^\d{5}-\d{3}$/.test(target.value)) {
          return;
        }

        const address = await AddressForms.getAddress(target.value);

        const street = newAddress.children[1].children[1] as HTMLInputElement;
        const neighborhood = newAddress.children[3].children[1] as HTMLInputElement;
        const city = newAddress.children[4].children[1] as HTMLInputElement;
        const state = newAddress.children[5].children[1] as HTMLInputElement;


        street.value = address.logradouro;
        neighborhood.value = address.bairro;
        city.value = address.localidade;
        state.value = AddressForms.STATE_DICTIONARY[address.uf as keyof typeof AddressForms.STATE_DICTIONARY];


      });

      zipInput?.addEventListener('input', (e) => {
        const target = e.target as HTMLInputElement;
        let value = target.value.replace(/\D/g, "");
        value = value.replace(/^(\d{5})(\d)/, "$1-$2");
        target.value = value.slice(0, 9);
      })


      streetInput?.addEventListener('input', wordMask)
      numberInput?.addEventListener('input', (e) => {
        const target = e.target as HTMLInputElement;
        target.value = target.value.replace(/\D/g, "");
      })
      neighborhoodInput?.addEventListener('input', wordMask)
      cityInput?.addEventListener('input', wordMask)

    },

    async cepApi(zip:string, addressObj:any){
      if (!/^\d{5}-\d{3}$/.test(zip)) {
        return;
      }

      const address = await AddressForms.getAddress(zip);

      addressObj.street = address.logradouro;
      addressObj.neighborhood = address.bairro;
      addressObj.city = address.localidade;
      addressObj.state = AddressForms.STATE_DICTIONARY[address.uf as keyof typeof AddressForms.STATE_DICTIONARY];


    },
    async submit(){
      const body = {
        "id": store.state.user?.id,
        "firstName": this.firstName,
        "lastName": this.lastName,
        "gender": this.gender,
        "username": this.username,
        "password": store.state.user?.password,
        "email": store.state.user?.email,
        "phone": this.phone,
        "cpf": this.cpf,
        "userRole": store.state.user?.userRole,
        "birthdate": this.birthdate,
        "addresses": this.addresses,
        "hospitals": store.state.user?.hospitals
      }
      const newAddresses = document.querySelectorAll(".newAddress");
      const pushAddress = {
        id: null,
        zip: "",
        street: "",
        number: "",
        neighborhood: "",
        city: "",
        state: ""
      }

      for (const address of newAddresses){

        pushAddress["zip"] = this.getInputElement(address, 0).value;
        pushAddress["street"] = this.getInputElement(address, 1).value;
        pushAddress["number"] = this.getInputElement(address, 2).value;
        pushAddress["neighborhood"] = this.getInputElement(address, 3).value;
        pushAddress["city"] = this.getInputElement(address, 4).value;
        pushAddress["state"] = this.getInputElement(address, 5).value;

        address.remove();
        body["addresses"].push(pushAddress);
      }

      await this.setUser(body);
      location.reload();
    },

  }
})
</script>

<template>
  <body>
    <div id="profileContainer">
    <div id="navbar">
      <span id="cancelBtn"><router-link to="/hospital/dashboard">Voltar</router-link></span>
      <span id="editBtn">Editar</span>
    </div>

    <GenderIconCase id="iconCase" size="big">
    </GenderIconCase>

    <form method="post" id="profileForm" @submit.prevent="submit">
      <fieldset>
        <legend>Informações Pessoais</legend>

        <div class="formGroup">
          <label for="firstName">Nome:</label>
          <input type="text"
                 id="firstName"
                 name="firstName"
                 v-model="firstName"
                 @input="wordMask('firstName')"
                 required>
        </div>

        <div class="formGroup">
          <label for="lastName">Sobrenome:</label>
          <input type="text"
                 id="lastName"
                 name="lastName"
                 v-model="lastName"
                 @input="wordMask('lastName')"
                 required>
        </div>

        <div class="formGroup">
          <label for="gender">Sexo Biológico:</label>
          <select id="gender" name="gender" v-model="gender" required>
            <option value="MASCULINO">Masculino</option>
            <option value="FEMININO">Feminino</option>
            <option value="INTERSEXO">Intersexo</option>
          </select>
        </div>

        <div class="formGroup">
          <label for="username">Nome de Usuário:</label>
          <input type="text"
                 id="username"
                 name="username"
                 v-model="username"
                 @input="userMask"
                 required
          >
        </div>

        <div class="formGroup">
          <label for="cpf">CPF:</label>
          <input type="text"
                 id="cpf"
                 name="cpf"
                 v-model="cpf"
                 @input="cpfMask"
                 required>
        </div>

        <div class="formGroup">
          <label for="phone">Celular:</label>
          <input type="text"
                 id="phone"
                 name="phone"
                 v-model="phone"
                 @input="cellPhoneMask"
                 required>
        </div>

        <div class="formGroup">
          <label for="birthdate">Data de Nascimento:</label>
          <input type="date"
                 id="birthdate"
                 name="birthdate"
                 v-model="birthdate"
                 required>
        </div>

      </fieldset>

      <fieldset>
        <legend>Endereços</legend>

        <div id="addressList" >
          <div v-for="(address, i) in addresses" :key="i">
            <div class="formGroup">
              <label :for="'zip-' + i">CEP:</label>
              <input type="text"
                     :id="'zip-' + i"
                     name="zip"
                     v-model="address.zip"
                     @input="zipMask(address)"
                     @blur="cepApi(address.zip, address)"
                     required
              >
            </div>

            <div class="formGroup">
              <label :for="'street-' + i">Rua:</label>
              <input type="text"
                     :id="'street-' + i"
                     name="street"
                     v-model="address.street"
                     required>
            </div>

            <div class="formGroup">
              <label :for="'number-' + i">Número:</label>
              <input type="text"
                     :id="'number-' + i"
                     name="number"
                     v-model="address.number"
                     required>
            </div>

            <div class="formGroup">
              <label :for="'neighborhood-' + i">Bairro:</label>
              <input type="text"
                     :id="'neighborhood-' + i"
                     name="neighborhood"
                     v-model="address.neighborhood"

                     required>
            </div>


            <div class="formGroup">
              <label :for="'city-' + i">Cidade:</label>
              <input type="text"
                     :id="'city-' + i"
                     name="city"
                     v-model="address.city"
                     required>
            </div>

            <div class="formGroup">
              <label :for="'state-' + i">Estado:</label>
              <select name="state" :id="'state-' + i" v-model="address.state" required>
                <option value="">-- Selecione --</option>
                <option :value="state" v-for="state in states" :key="state" >
                  {{state.toLowerCase().split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}}
                </option>
              </select>
            </div>

            <hr v-if="addresses.length > 1 && address !== addresses.at(-1)">
          </div>

        </div>
      </fieldset>

      <button type="button" id="addAddressBtn" @click="newAddress">+</button>
      <button type="submit" id="saveBtn">Salvar</button>
    </form>
  </div>
  </body>
</template>

<style >
.hospital-profile-page  {
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  font-size: 1.2rem;
}

.hospital-profile-page label {
  font-size: 1.3rem;
}

.hospital-profile-page #profileContainer {
  width: 60%;
  margin: auto;
  background-color: #fff;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 0 1rem rgba(0,0,0,0.1);
  border: 0.1rem solid rgba(76, 175, 80, 0.38);
}

.hospital-profile-page #navbar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.hospital-profile-page #navbar span {
  cursor: pointer;
  color: #4CAF50;
  font-weight: bold;
}

.hospital-profile-page #iconCase {
  text-align: center;
  margin-bottom: 2rem;
}


.hospital-profile-page .formGroup {
  margin-bottom: 1.5rem;
}

.hospital-profile-page .formGroup label {
  display: block;
  margin-bottom: 0.5rem;
  color: #464646;
}

.hospital-profile-page .formGroup input,
.hospital-profile-page .formGroup select {
  width: 100%;
  padding: 0.8rem;
  box-sizing: border-box;

  border: 0.1rem solid #ccc;
  border-radius: 0.5rem;
}

.hospital-profile-page fieldset {
  border: 0.2rem solid #4CAF50;
  border-radius: 0.4rem;
  padding: 1rem;
}

#profileForm > fieldset:nth-child(1) {
  margin-bottom: 1rem;
}


.hospital-profile-page #profileForm > fieldset:not(fieldset:nth-child(3)){
  border-radius: 0.5rem;
}

.hospital-profile-page legend {
  color: #4CAF50;
  font-weight: bold;
}

.hospital-profile-page #saveBtn, .hospital-profile-page #editBtn, .hospital-profile-page #cancelBtn a {
  display: block;
  margin: 1rem 0;
  padding: 1rem;
  background-color: #4CAF50;
  color: white !important;
  text-align: center;
  text-decoration: none;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
}

.hospital-profile-page #cancelBtn a{
  background-color: #ff5e5e;
}

.hospital-profile-page #addAddressBtn {
  display: none;
  box-sizing: border-box;
  padding: 0.4rem 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  text-align: center;
  margin-left: 0.3rem;
  font-size: 1.8rem;
  cursor: pointer;

  margin-bottom: 2rem;
}

.hospital-profile-page #saveBtn {
  display: none;
  width: 100%;
}

.hospital-profile-page #addressList {
  margin-top: 1rem;
}

.hospital-profile-page #addressList .formGroup {
  display: flex;
  justify-content: space-between;
}

.hospital-profile-page #addressList input {
  width: 90%;
  margin-right: 1%;
  box-sizing: border-box;
}

.hospital-profile-page #addressList label {
  align-self: end;
  box-sizing: border-box;
  width: 6.5rem;
}

.hospital-profile-page #addressList hr {
  border-top: 0.1rem solid #86ef8c;
  margin-bottom: 2.5rem;
}

.hospital-profile-page #addAddressBtn:hover, .hospital-profile-page #saveBtn:hover, .hospital-profile-page #editBtn:hover {
    background-color: #398d3d;
}

.hospital-profile-page #cancelBtn a:hover {
  background-color: #d74646;
}

</style>
