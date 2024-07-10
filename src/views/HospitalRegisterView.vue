<script>
import NavBar from "@/components/NavBar.vue";
import {AddressForms} from "@/Util/FormUtils";
import router from "@/router";

export default {
  name: "HospitalRegisterView",
  components: {
    NavBar
  },
  data() {
    return {
      name: "",
      cnpj: "",
      subdomain: "",
      zip: "",
      street: "",
      number: "",
      neighborhood: "",
      city: "",
      state: "",
      primaryPhone: "",
      secondaryPhone: "",
      hospitalEmail: "",
      firstName: "",
      lastName: "",
      gender: "",
      username: "",
      password: "",
      password2: "",
      adminEmail: "",
      adminPhone: "",
      cpf: "",
      birthdate: "",
      userRole: "ADMIN"
    };
  },
  mounted() {
    const subdomainInput = document.getElementById("subdomain");
    let cpfInput = document.getElementById("adminCpf");
    let cnpjInput = document.getElementById("cnpj");
    let cep = document.getElementById("hospitalZip");
    let cellphone = document.getElementById("adminPhone");
    let primaryPhone = document.getElementById("hospitalPrimaryPhone");
    let secondaryPhone = document.getElementById("hospitalSecondaryPhone");

    cpfInput.addEventListener("input", function() {
      let value = this.value.replace(/\D/g, "");
      value = value.replace(/^(\d{3})(\d)/, "$1.$2");
      value = value.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
      value = value.replace(/\.(\d{3})(\d)/, ".$1-$2");
      this.value = value;
    });

    cnpjInput.addEventListener("input", function() {
      let value = this.value.replace(/\D/g, "");
      value = value.replace(/^(\d{2})(\d)/, "$1.$2");
      value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
      value = value.replace(/\.(\d{3})(\d)/, ".$1/$2");
      value = value.replace(/(\d{4})(\d)/, "$1-$2");
      this.value = value;
    });

    cep.addEventListener("input", function() {
      let value = this.value.replace(/\D/g, "");
      value = value.replace(/^(\d{5})(\d)/, "$1-$2");
      this.value = value;
    });

    cellphone.addEventListener("input", function() {
      let value = this.value.replace(/\D/g, "");
      value = value.replace(/^(\d{2})(\d)/, "($1) $2");
      value = value.replace(/(\d{4,5})(\d)/, "$1-$2");
      this.value = value;
    });

    primaryPhone.addEventListener("input", function() {
      let value = this.value.replace(/\D/g, "");
      value = value.replace(/^(\d{2})(\d)/, "($1) $2");
      value = value.replace(/(\d{4})(\d)/, "$1-$2");
      this.value = value;
    });

    secondaryPhone.addEventListener("input", function() {
      let value = this.value.replace(/\D/g, "");
      value = value.replace(/^(\d{2})(\d)/, "($1) $2");
      value = value.replace(/(\d{4})(\d)/, "$1-$2");
      this.value = value;
    });


    subdomainInput.addEventListener("input", function() {
      let value = this.value;

      value = value.replace(/[^\w-]/g, "");

      if (value.length > 70) {
        value = value.slice(0, 70);
      }

      this.value = value;
    });



    const form = document.querySelector("form");


      function clearError(id) {
        const errorId = "error-" + id;
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
          errorElement.style.display = "none";
        }
      }

      function displayError(id, message) {
        const errorElement = document.getElementById(id);
        if (errorElement) {
          errorElement.style.display = "block";
          errorElement.textContent = message;
        }
      }

      function validateGenderSelection() {
        const genderOptions = document.querySelectorAll('input[name="registerEntityDto.gender"]');
        let isSelected = false;

        genderOptions.forEach(option => {
          if (option.checked) {
            isSelected = true;
          }
        });

        if (!isSelected) {
          displayError("error-genderBio", "Selecione um Sexo Biológico.");
          return false;
        }

        clearGenderError();
        return true;
      }

      function validateCNPJ(cnpj) {
        cnpj = cnpj.replace(/[^\d]/g, '');

        if (cnpj.length !== 14 || /^(.)\1+$/.test(cnpj)) {
          return false;
        }

        let sum = 0;
        let weight = 5;
        for (let i = 0; i < 12; i++) {
          sum += parseInt(cnpj.charAt(i)) * weight--;
          if (weight < 2) {
            weight = 9;
          }
        }
        let remainder = sum % 11;
        let digit = (remainder < 2) ? 0 : (11 - remainder);
        if (digit !== parseInt(cnpj.charAt(12))) {
          return false;
        }

        sum = 0;
        weight = 6;
        for (let i = 0; i < 13; i++) {
          sum += parseInt(cnpj.charAt(i)) * weight--;
          if (weight < 2) {
            weight = 9;
          }
        }
        remainder = sum % 11;
        digit = (remainder < 2) ? 0 : (11 - remainder);
        if (digit !== parseInt(cnpj.charAt(13))) {
          return false;
        }

        return true;
      }

      function validateRequired(field, fieldName) {
        const value = field.value.trim();
        const errorId = "error-" + field.id;

        if (value === "") {
          displayError(errorId, `${fieldName} é obrigatório.`);
          return false;
        }
        clearError(field.id);
        return true;
      }

      function validateCPF(cpf) {
        cpf = cpf.replace(/[^\d]/g, '');
        if (cpf.length !== 11 || /^(.)\1+$/.test(cpf)) {
          return false;
        }

        let sum = 0;
        for (let i = 0; i < 9; i++) {
          sum += parseInt(cpf.charAt(i)) * (10 - i);
        }

        let remainder = 11 - (sum % 11);
        if (remainder === 10 || remainder === 11) {
          remainder = 0;
        }

        if (remainder !== parseInt(cpf.charAt(9))) {
          return false;
        }

        sum = 0;
        for (let i = 0; i < 10; i++) {
          sum += parseInt(cpf.charAt(i)) * (11 - i);
        }

        remainder = 11 - (sum % 11);
        if (remainder === 10 || remainder === 11) {
          remainder = 0;
        }

        if (remainder !== parseInt(cpf.charAt(10))) {
          return false;
        }

        return true;
      }

      function validateCEP(cep) {
        return /^\d{5}-?\d{3}$/.test(cep);
      }

      function validatePhoneNumber(phone) {
        return /^\(\d{2}\)\s?\d{4}-\d{4}$/.test(phone) && phone.replace(/\D/g, '').length === 10;
      }

      function validateCellPhoneNumber(phone) {
        return /^\(\d{2}\)\s?9\d{4}-\d{4}$/.test(phone) && phone.replace(/\D/g, '').length === 11;
      }

      function validateStrongPassword(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_+\-={};':"\\|,.<>/?]{8,}$/;
        return regex.test(password);
      }

      function validateNumber(number) {
        return /^\d+$/.test(number);
      }

      function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
      }

      function clearGenderError() {
        const errorElement = document.getElementById("error-genderBio");
        const genderBackError = document.getElementById("gender-back-error");

        if (errorElement) {
          errorElement.textContent = "";
        }

        if (genderBackError){
          genderBackError.remove();
        }
      }

      function deleteNexSibling(e) {
        const nextSibling = e.target.nextElementSibling;
        if (nextSibling && nextSibling.classList.contains("back-error")) {
          nextSibling.remove();
        }
      }

      const inputs = form.querySelectorAll("input, select");

      const subdomainResult = document.getElementById("subdomain-result");

      const subdomain = document.getElementById("subdomain");

      inputs.forEach(input => {
        input.addEventListener("blur", function() {
          switch (input.id) {
            case "hospitalName":
              validateRequired(input, "Nome do Hospital");
              break;
            case "cnpj":
              if (validateRequired(input, "CNPJ") && !validateCNPJ(input.value)) {
                displayError("error-cnpj", "CNPJ inválido.");
              }
              break;
            case "subdomain":
              validateRequired(input, "Nome de Subdomínio");
              subdomainResult.style.display = "none";
              break;
            case "hospitalStreet":
              validateRequired(input, "Rua");
              break;
            case "hospitalNeighborhood":
              validateRequired(input, "Bairro");
              break;
            case "hospitalAddressNumber":
              if (validateRequired(input, "Número") && !validateNumber(input.value)) {
                displayError("error-hospitalAddressNumber", "Número inválido.");
              }
              break;
            case "hospitalCity":
              validateRequired(input, "Cidade");
              break;
            case "hospitalState":
              if (input.value === "") {
                displayError("error-hospitalState", "Selecione um Estado.");
              } else {
                clearError("hospitalState");
              }
              break;
            case "hospitalZip":
              if (validateRequired(input, "CEP") && !validateCEP(input.value)) {
                displayError("error-hospitalZip", "CEP inválido. Formato aceito: 12345-678 ou 12345678.");
              }
              break;
            case "hospitalPrimaryPhone":
              if (validateRequired(input, "Telefone Principal") && !validatePhoneNumber(input.value)) {
                displayError("error-hospitalPrimaryPhone", "Telefone principal inválido.");
              }
              break;
            case "hospitalSecondaryPhone":
              if (validateRequired(input, "Telefone Secundário") && !validatePhoneNumber(input.value)) {
                displayError("error-hospitalSecondaryPhone", "Telefone secundário inválido.");
              }
              break;
            case "hospitalEmail":
              if (validateRequired(input, "Email") && !validateEmail(input.value)) {
                displayError("error-hospitalEmail", "Email inválido.");
              }
              break;
            case "adminFirstName":
              validateRequired(input, "Primeiro Nome");
              break;
            case "adminLastName":
              validateRequired(input, "Sobrenome");
              break;
            case "adminUsername":
              validateRequired(input, "Nome de Usuário");
              break;
            case "adminPassword":
              if (validateRequired(input, "Senha") && !validateStrongPassword(input.value)) {
                displayError("error-adminPassword", "Senha inválida. A senha deve conter pelo menos 8 caracteres, uma letra minúscula, uma letra maiúscula, um número e um símbolo especial.");
              }
              break;
            case "adminPassword2":
              if (validateRequired(input, "Senha") && form.querySelector("#adminPassword").value !== input.value) {
                displayError("error-adminPassword2", "Senhas não podem ser diferentes.");
              }
              break;
            case "adminEmail":
              if (validateRequired(input, "Email") && !validateEmail(input.value)) {
                displayError("error-adminEmail", "Email inválido.");
              }
              break;
            case "adminPhone":
              if (validateRequired(input, "Celular") && !validateCellPhoneNumber(input.value)) {
                displayError("error-adminPhone", "Celular inválido.");
              }
              break;
            case "adminCpf":
              if (validateRequired(input, "CPF") && !validateCPF(input.value)) {
                displayError("error-adminCpf", "CPF inválido.");
              }
              break;
            case "adminbirthdate":
              validateRequired(input, "Data de Nascimento");
              break;
            default:
              break;
          }

          clearGenderError();
        });
      });


      subdomain.addEventListener("focus", (e) =>{
        subdomainResult.style.display = "block";
        if (e.target.value === ""){
          subdomainResult.textContent = "www.[SUBDOMAIN].saude-mais.com.br"
        }
      });

      subdomain.addEventListener("input", (e) => {
        subdomainResult.textContent = subdomainResult.textContent.replace(subdomainResult.textContent, `www.${e.target.value}.saude-mais.com.br`.toLocaleLowerCase());
      })

      const elements = document.querySelectorAll("input, select, div");

      elements.forEach(input => {
        input.addEventListener("blur", function (e) {deleteNexSibling(e)});
        input.addEventListener("change", function(e) {deleteNexSibling(e)});
        input.addEventListener("focus", function(ev) {
          deleteNexSibling(ev);
        });
      });

      const genderOptions = document.querySelectorAll('input[name="registerEntityDto.gender"]');

      genderOptions.forEach(input => {
        input.addEventListener("change", function() {
          clearGenderError();
        })
      });




      form.addEventListener("submit", function (e) {
        let isValid = true;
        const inputs = form.querySelectorAll("input, select");

        inputs.forEach((input) => {
          validateRequired(input, "Este Campo")
        });

        isValid = validateGenderSelection();

        if (!isValid){
          window.scrollTo(0, 0);
          e.preventDefault();
        }
      })
  },
  methods: {
    async updateAddress(){
      const address = await AddressForms.getAddress(this.zip);
      this.street = address.logradouro;
      this.city = address.localidade;
      this.state = AddressForms.STATE_DICTIONARY[address.uf];
      this.neighborhood = address.bairro;
    },
    async sendRequest(event){
      const endpoint = 'http://localhost:8080/api/hospital/register';
      const data = {
        "registerEntityDto": {
          "firstName": "",
          "lastName": "",
          "gender": "",
          "username": "",
          "password": "",
          "password2": "",
          "email": "",
          "phone": "",
          "cpf": "",
          "userRole": "",
          "birthdate": ""
        },
        "hospitalEntityDto": {
          "name": "",
          "cnpj": "",
          "subdomain": "",
          "primaryPhone": "",
          "secondaryPhone": "",
          "email": "",
          "address": {
            "street": "",
            "neighborhood": "",
            "number": "",
            "city": "",
            "state": "",
            "zip": ""
          }
        }
      };

      event.preventDefault();

      const form = document.querySelector("form");
      const formData = new FormData(form);

      data["registerEntityDto"]["firstName"] = formData.get("firstName");
      data["registerEntityDto"]["lastName"] = formData.get("lastName");
      data["registerEntityDto"]["gender"] = formData.get("gender");
      data["registerEntityDto"]["username"] = formData.get("username");
      data["registerEntityDto"]["password"] = formData.get("password");
      data["registerEntityDto"]["password2"] = formData.get("password2");
      data["registerEntityDto"]["email"] = formData.get("email");
      data["registerEntityDto"]["phone"] = formData.get("phone");
      data["registerEntityDto"]["cpf"] = formData.get("cpf");
      data["registerEntityDto"]["userRole"] = "ADMIN";
      data["registerEntityDto"]["birthdate"] = formData.get("birthdate");

      data["hospitalEntityDto"]["name"] = formData.get("name");
      data["hospitalEntityDto"]["cnpj"] = formData.get("cnpj");
      data["hospitalEntityDto"]["subdomain"] = formData.get("subdomain");
      data["hospitalEntityDto"]["primaryPhone"] = formData.get("primaryPhone");
      data["hospitalEntityDto"]["secondaryPhone"] = formData.get("secondaryPhone");
      data["hospitalEntityDto"]["email"] = formData.get("hospitalEmail");
      data["hospitalEntityDto"]["address"]["street"] = formData.get("street");
      data["hospitalEntityDto"]["address"]["neighborhood"] = formData.get("neighborhood");
      data["hospitalEntityDto"]["address"]["number"] = formData.get("number");
      data["hospitalEntityDto"]["address"]["city"] = formData.get("city");
      data["hospitalEntityDto"]["address"]["state"] = formData.get("state");
      data["hospitalEntityDto"]["address"]["zip"] = formData.get("zip");




      try {

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": true
          },
          body: JSON.stringify(data),
        });

        console.log(JSON.stringify(data))

        if (!response.ok) {
          const errorMessage = await response.text();
          console.error('Erro na requisição:', errorMessage);
          return;
        }

        await router.push('/login')
      } catch (error) {
        console.error('Erro:', error);
      }
    }
  }
}
</script>

<template>
  <NavBar></NavBar>
  <main>
    <h1>Bem-vindo ao Registro de Hospital e Usuário Admin</h1>

    <form action="/hospital/register" method="post" @submit="sendRequest($event)">
      <fieldset>
        <legend>Informações do Hospital</legend>

        <label for="hospitalName">Nome do Hospital:</label>
        <input type="text" id="hospitalName" v-model="name" name="name" required>

        <div id="error-hospitalName" class="error-message"></div>

        <label for="cnpj">CNPJ:</label>
        <input type="text" id="cnpj" v-model="cnpj" name="cnpj" maxlength="18" required>

        <div id="error-cnpj" class="error-message"></div>

        <label for="subdomain">Nome de subdomínio:</label>
        <input type="text" id="subdomain" v-model="subdomain" name="subdomain" autocomplete="off" maxlength="70" required>

        <div id="error-subdomain" class="error-message"></div>

        <div id="subdomain-result">www.{{subdomain.toLowerCase()}}.saude-mais.com.br</div>

        <fieldset>
          <label for="hospitalZip" >CEP:</label>
          <input type="text" @change="updateAddress()"  id="hospitalZip" v-model="zip" name="zip" maxlength="9" required>

          <div id="error-hospitalZip" class="error-message"></div>

          <legend>Endereço do Hospital</legend>
          <label for="hospitalStreet">Rua:</label>
          <input type="text" id="hospitalStreet" v-model="street" name="street" required>

          <div id="error-hospitalStreet" class="error-message"></div>

          <label for="hospitalNeighborhood">Bairro:</label>
          <input type="text" id="hospitalNeighborhood" v-model="neighborhood" name="neighborhood" required>

          <div id="error-hospitalNeighborhood" class="error-message"></div>

          <label for="hospitalAddressNumber">Número:</label>
          <input type="text" id="hospitalAddressNumber" v-model="number" name="number" required>

          <div id="error-hospitalAddressNumber" class="error-message"></div>

          <label for="hospitalCity">Cidade:</label>
          <input type="text" id="hospitalCity" v-model="city" name="city" required>

          <div id="error-hospitalCity" class="error-message"></div>

          <label for="hospitalState">Estado:</label>
          <select id="hospitalState" v-model="state" name="state">
            <option value="" selected>-- Selecione --</option>
            <option value="ACRE">Acre</option>
            <option value="ALAGOAS">Alagoas</option>
            <option value="AMAPA">Amapá</option>
            <option value="AMAZONAS">Amazonas</option>
            <option value="BAHIA">Bahia</option>
            <option value="CEARA">Ceará</option>
            <option value="DISTRITO_FEDERAL">Distrito Federal</option>
            <option value="ESPIRITO_SANTO">Espírito Santo</option>
            <option value="GOIAS">Goiás</option>
            <option value="MARANHAO">Maranhão</option>
            <option value="MATO_GROSSO">Mato Grosso</option>
            <option value="MATO_GROSSO_DO_SUL">Mato Grosso do Sul</option>
            <option value="MINAS_GERAIS">Minas Gerais</option>
            <option value="PARA">Pará</option>
            <option value="PARAIBA">Paraíba</option>
            <option value="PARANA">Paraná</option>
            <option value="PERNAMBUCO">Pernambuco</option>
            <option value="PIAUI">Piauí</option>
            <option value="RIO_DE_JANEIRO">Rio de Janeiro</option>
            <option value="RIO_GRANDE_DO_NORTE">Rio Grande do Norte</option>
            <option value="RIO_GRANDE_DO_SUL">Rio Grande do Sul</option>
            <option value="RONDONIA">Rondônia</option>
            <option value="RORAIMA">Roraima</option>
            <option value="SANTA_CATARINA">Santa Catarina</option>
            <option value="SAO_PAULO">São Paulo</option>
            <option value="SERGIPE">Sergipe</option>
            <option value="TOCANTINS">Tocantins</option>
          </select>
          <div id="error-hospitalState" class="error-message"></div>
        </fieldset>

        <fieldset>
          <legend>Contato do Hospital</legend>
          <label for="hospitalPrimaryPhone">Telefone Principal:</label>
          <input type="text" id="hospitalPrimaryPhone" v-model="primaryPhone" name="primaryPhone" maxlength="14" required>

          <div id="error-hospitalPrimaryPhone" class="error-message"></div>

          <label for="hospitalSecondaryPhone">Telefone Secundário:</label>
          <input type="text" id="hospitalSecondaryPhone" v-model="secondaryPhone" name="secondaryPhone" maxlength="14" required>

          <div id="error-hospitalSecondaryPhone" class="error-message"></div>

          <label for="hospitalEmail">Email:</label>
          <input type="email" id="hospitalEmail" v-model="hospitalEmail" name="hospitalEmail" required>

          <div id="error-hospitalEmail" class="error-message"></div>
        </fieldset>

      </fieldset>

      <fieldset>
        <legend>Informações do Usuário Admin</legend>
        <label for="adminFirstName">Primeiro Nome:</label>
        <input type="text" id="adminFirstName" v-model="firstName" name="firstName" required>

        <div id="error-adminFirstName" class="error-message"></div>

        <label for="adminLastName">Sobrenome:</label>
        <input type="text" id="adminLastName" v-model="lastName" name="lastName" required>

        <div id="error-adminLastName" class="error-message"></div>

        <div id="genderBio">
          <label>Sexo Biológico:</label>
          <div class="genderContainer">
            <input type="radio" value="MASCULINO" id="MASCULINO" v-model="gender" name="gender">
            <label for="MASCULINO">Masculino</label>
          </div>
          <div class="genderContainer">
            <input type="radio" value="FEMININO" id="FEMININO" v-model="gender" name="gender">
            <label for="FEMININO">Feminino</label>
          </div>
          <div class="genderContainer">
            <input type="radio" value="INTERSEXO" id="INTERSEXO" v-model="gender" name="gender">
            <label for="INTERSEXO">Intersexo</label>
          </div>
        </div>

        <div id="error-genderBio" class="error-message"></div>

        <label for="adminUsername">Nome de Usuário:</label>
        <input type="text" id="adminUsername" v-model="username" name="username" required>

        <div id="error-adminUsername" class="error-message"></div>

        <label for="adminPassword">Senha:</label>
        <input type="password" id="adminPassword" v-model="password" name="password" required>

        <div id="error-adminPassword" class="error-message"></div>

        <label for="adminPassword2">Confirme a Senha:</label>
        <input type="password" id="adminPassword2" v-model="password2" name="password2" required>

        <div id="error-adminPassword2" class="error-message"></div>

        <label for="adminEmail">Email:</label>
        <input type="email" id="adminEmail" v-model="adminEmail" name="email" required>

        <div id="error-adminEmail" class="error-message"></div>

        <label for="adminPhone">Celular:</label>
        <input type="text" id="adminPhone" v-model="adminPhone" name="phone" maxlength="15" required>

        <div id="error-adminPhone" class="error-message"></div>

        <label for="adminCpf">CPF:</label>
        <input type="text" id="adminCpf" v-model="cpf" name="cpf" maxlength="14" required>

        <div id="error-adminCpf" class="error-message"></div>

        <label for="adminbirthdate">Data de Nascimento:</label>
        <input type="date" id="adminbirthdate" v-model="birthdate" name="birthdate" required>

        <div id="error-adminbirthdate" class="error-message"></div>
      </fieldset>

      <button type="submit">Enviar</button>
    </form>
  </main>
</template>

<style scoped>

body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f9;
  margin: 0;
  padding: 0;
}

main {
  width: 60%;
  margin: 20px auto;
  padding: 20px;
  font-size: 1.6rem;
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  border-radius: 8px;
}

h1 {
  text-align: center;
  color: #4caf50;
  margin-bottom: 20px;
}

fieldset {
  border: 2px solid #4caf50;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
}

legend {
  color: #4caf50;
  font-size: 1.2em;
  padding: 0 10px;
}

label {
  display: block;
  margin-bottom: 10px;
  color: #333333;
}

input[type="text"],
input[type="email"],
input[type="password"],
input[type="date"],
select {
  width: calc(100% - 22px);
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type="radio"] {
  margin-right: 10px;
}

.genderContainer {
  display: flex;
}

.genderContainer{
  margin-bottom: 3px;
}

#genderBio {
  margin-bottom: 15px;
}

.genderContainer > label {
  align-self: center;
}

#MASCULINO, #FEMININO, #INTERSEXO {
  align-self: start;
}

.error-message {
  color: red;
  font-size: 0.9em;
  margin-top: -17px;
  margin-bottom: 30px;
}

.error-message + .error-message {
  margin-bottom: 32px;
}

.error-message[id^="error-"] {
  display: none;
}

button {
  width: 100%;
  padding: 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.2em;
  cursor: pointer;
}

#subdomain-result{
  margin-top: -8px;
  padding-left: 10px;
  color: #595959;
  margin-bottom: 15px;
}


button:hover {
  background-color: #45a049;
}

</style>
