<script >
  import NavBar from "@/components/NavBar.vue";
  import router from "@/router";


  export default {
    name: "LoginView",
    components: {
      NavBar
    },
    methods: {
      async sendRequest(e){
        e.preventDefault();

        const login = new Object();
        const form = document.querySelector('form');
        const formData = new FormData(form);
        login["user"] = formData.get("username");
        login["password"] = formData.get("password");

        const response = await fetch('http://localhost:8080/api/auth', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(login)
        });

        if (!response.ok) {
          alert(response);
          return;
        }

        let responseFinal = await response.text();
        responseFinal = JSON.parse(responseFinal);
        const user = responseFinal["user"];
        const token =  responseFinal["token"]
        localStorage.setItem('authToken',token);
        localStorage.setItem('user', user);

        if (user.userRole === "ADMIN"){
          await router.push("/admin/dashboard");
        }

        if (user.userRole === "CUSTOMER"){
          await router.push("/customer/dashboard");
        }

        if (user.userRole === "WORKER"){
          await router.push("/doctor/dashboard");
        }
      }
    }
  }
</script>

<template>
  <NavBar></NavBar>
  <main>
    <h1>Login</h1>

    <form action="/login" method="post" @submit="sendRequest($event)">
      <p>
        <label>Usuário:</label>
        <input type="text" name="username" />
      </p>
      <p>
        <label>Senha:</label>
        <input type="password" name="password" />
      </p>

      <div>
        <button type="submit">Login</button>
      </div>
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
  width: 30%;
  margin: 100px auto;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  border-radius: 8px;
  position: relative;
}

h1 {
  text-align: center;
  color: #4caf50;
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 10px;
  color: #333333;
}

input[type="text"],
input[type="password"] {
  width: calc(100% - 22px);
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
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

button:hover {
  background-color: #45a049;
}

.floating-message {
  position: fixed;
  top: 10px;
  right: 10px;
  background-color: #4caf50;
  color: white;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  z-index: 1000;
  font-size: 1em;
}

.floating-message.success-message {
  background-color: #4cacaf;
}

.floating-message.error-message {
  background-color: rgb(241, 93, 11);
}


.fade-out {
  animation: fadeOut 1s forwards;
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
