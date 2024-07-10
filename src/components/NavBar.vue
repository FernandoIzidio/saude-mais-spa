<script >
    export default {
      name: "NavBar"
    }
</script>

<template>
  <header>
    <h1 ><a href="/" class="logo">S a ú d e - M a i s</a></h1>
    <nav class="nav_header">
      <ul>

        <li><router-link to="/hospital/register">Cadastro de Hospital</router-link></li>
        <li><a href="#">Perguntas Frequentes</a></li>
        <li><a href="#">Suporte</a></li>
        <li><a href="#">Contato</a></li>
      </ul>
      <div class="logSignin">
        <router-link to="/login" class="login">Login</router-link>
        <router-link to="#" class="signin">Sign in</router-link>
      </div>
    </nav>
  </header>
</template>

<style scoped>
:root{
  font-size: 10px;
}


header {
  display: flex;
  width: 100%;
  border-bottom: solid 1px rgba(0, 0, 0, 0.13);
  box-sizing: border-box !important;
  max-width: 100% !important;

  justify-content: space-between;
  align-items: center;
  overflow-x: hidden;

  background: rgb(216, 255, 216);
  padding: 1rem;
}

.logo {
  font-size: 4rem;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: 550;
  color: green;
  font-style: italic;
  text-decoration: none;
}

.nav_header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav_header ul {
  list-style: none;
  display: flex;
  gap: 1rem;
}

.nav_header a {
  font-size: 1.8rem;
  color: #1c1c1c;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-decoration: none;
}

.nav_header a:hover {
  text-decoration: underline;
}

.logSignin {
  display: flex;
  gap: 1rem;
  font-size: 1.5rem;
  border-radius: 50px;
  background: rgb(88, 255, 88);
  font-weight: 600;
  padding: 0.5rem 1rem;
}

.login, .signin {
  padding: 0.5rem 1rem;
  border-radius: 50px;
}

.login:hover, .signin:hover {
  text-decoration: underline;
}

.signin {
  background: rgb(33, 202, 33);
}
</style>
