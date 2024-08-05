<script >
    import GenderIconCase from "@/components/GenderIconCase.vue";
    import store from "@/store";


    export default {
      name: "HospitalView",
      components: {GenderIconCase},
      computed: {
          getUser(){
            return store.state.user;
          },
          getFullName(){
            return store.state.user.firstName + " " + store.state.user.lastName;
          },
          getHospitals(){
            return store.state.user.hospitals.at(0);
          }
      },
      mounted() {
        let burguerIcon = document.getElementById("burgerIcon");
        let sidebar = document.getElementById("sidebar");
        let navOptions = document.querySelectorAll(".navOption");
        let iconDetails = document.getElementById("iconDetails");


        burguerIcon.addEventListener("click", () =>{
          sidebar.classList.toggle("active");
        })

        navOptions.forEach(function (navOption) {
          if (navOption.id === "mainIcon") return;

          navOption.addEventListener("click", (event) => {

            /**@type HTMLElement*/
            let activeOption = document.querySelector(".navOption.active");
            event.preventDefault();

            if (activeOption && activeOption != navOption){
              activeOption.classList.remove("active");
            }

            navOption.classList.toggle("active");
          })
        })

        iconDetails.addEventListener("click", () => {
          iconDetails.classList.toggle("active");
        })
      },
    }
</script>

<template>
    <header>
    <nav id="sidebar">
      <ul>
        <li id="mainItem">
          <router-link to="/"
                       id="mainIcon"
                       class="navOption icon"
          ></router-link>
        </li>


        <li id="profile">
          <GenderIconCase></GenderIconCase>
          <div id="profileData">
            <p>Welcome,</p>
            <p>{{getFullName}}</p>
          </div>
        </li>



        <li id="navList">
          <div class="navOption">
            <a class="iconGroup" href="#">
              <span id="homeIcon" class="icon">.</span>
              <span class="textIcon">Home</span>
            </a>
          </div>
        </li>
      </ul>
    </nav>
  </header>
    <main>
    <div id="topNav" class="topNav">
      <div id="burgerIcon" class="burgerIcon">
        ☰
      </div>


      <div id="alerts">
        <div id="alertIcon"></div>
        <div id="iconDetails">

          <GenderIconCase></GenderIconCase>
          <div id="profileName">{{getUser?.username}}</div>

          <div id="profileOptions">
            <ul>
              <li><router-link to="/hospital/dashboard/profile">Profile</router-link></li>
              <li><router-link to="/hospital/dashboard/settings">Settings</router-link></li>
              <li><router-link to="/logout" id="logout">Log Out</router-link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div id="mainContent">
      <h1>Dados do Hospital</h1>
      <fieldset>

      </fieldset>
    </div>


  </main>
</template>

<style>


.hospital-dashboard-page  {
  font-family: Arial, sans-serif;
  display: flex;
  width: 100vw;
  font-size: 1.4rem;
}

.hospital-dashboard-page #app {
  width: 100%;
  display: flex;
}

.hospital-dashboard-page #sidebar {
  background-color: #464646;
  height: 100vh;
  width: 6.5rem;
  font-weight: bolder;
}


.hospital-dashboard-page #sidebar.active{
  width: 24rem;
}


.hospital-dashboard-page #sidebar ul {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.hospital-dashboard-page #sidebar.active ul {
  align-items: start;
}

.hospital-dashboard-page li {
  width: 100%;
}

.hospital-dashboard-page .icon {
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  color: transparent;
  display: inline-block;
}

.hospital-dashboard-page #sidebar.active .icon {
  margin-right: 1rem;
}

.hospital-dashboard-page #sidebar.active #navList .icon {
  margin-left: 0.4rem;
}

.hospital-dashboard-page .textIcon {
  color: #FAFAFA;
  font-weight: bold;
}

.hospital-dashboard-page #sidebar.active .textIcon{
  font-weight: normal;
}

.hospital-dashboard-page .icon, .textIcon {
  cursor: pointer;
}

.hospital-dashboard-page #sidebar #mainIcon{
  background-image: url("@/assets/logo.png");
  background-size: cover;
  width: 100%;
  height: 5.6rem;
  margin-bottom: 1.2rem;
}

.hospital-dashboard-page #sidebar.active #mainIcon{
  width: 5.6rem;
  position: relative;
  margin-left: 0.8rem;
}

.hospital-dashboard-page #sidebar.active #mainIcon::after{
  position: absolute;
  top: 50%;
  left: 100%;
  transform: translateY(-50%);

  font-size: 2.6rem;
  font-weight: bolder;
  color: white;
  display: inline-block;
  width: max-content;
  content: "Saude Mais";
  margin-left: 0.6rem;
}

.hospital-dashboard-page #sidebar #profile {
  display: none;
}


.hospital-dashboard-page #sidebar.active #profile{
  display: flex;
}

.hospital-dashboard-page #sidebar.active #profileData{
  margin-left: 1rem;
}

.hospital-dashboard-page #sidebar.active #profile .profileIcon {
  width: 4.4rem;
  height: 4.4rem;
  margin-left: 1.5rem;
  margin-right: 1.8rem;
  margin-bottom: 1.8rem;
}

.hospital-dashboard-page #sidebar.active #profileData p {
    font-size: 1.4rem;
}

.hospital-dashboard-page #sidebar.active #profileData p:first-child {
  line-height: 2.5rem;
  color: lightgray;
}

.hospital-dashboard-page #sidebar.active #profileData p:last-child {
  color: white;
}


.hospital-dashboard-page #sidebar .navOption {
  width: 100%;
  position: relative;
  cursor: pointer;

  justify-content: center;
  align-items: center;

  height: max-content;
  margin-bottom: 0.8rem;
}

.hospital-dashboard-page #sidebar.active .navOption {
  justify-content: normal;
  flex-direction: row;
  align-items: end;
  margin-bottom: 0.4rem;
}

.hospital-dashboard-page #sidebar .iconGroup {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
}

.hospital-dashboard-page #sidebar.active .iconGroup {
  flex-direction: row;
}

.hospital-dashboard-page #sidebar.active #navList .iconGroup::after{
  display: inline-block;
  position: absolute;
  right: 1.5rem;
  width: 1.2rem;
  height: 1.2rem;
  content: ".";
  color: transparent;

  align-self: center;

  background-image: url("@/assets/down-arrow-white.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.hospital-dashboard-page .navOption.active{
  border-top: 0.1rem solid #8888889B;
  border-bottom: 0.1rem solid #00000035;
}

.hospital-dashboard-page #sidebar #homeIcon {
  background-image: url("@/assets/house.png");
  background-size: cover;
  width: 3.6rem;
  height: 3.6rem;
}

.hospital-dashboard-page #sidebar.active #homeIcon {
  width: 2.4rem;
  height: 2.4rem;
}

.hospital-dashboard-page #sidebar .submenu{
  display: none;
  animation: fadeIn 0.5s ease-in-out;
  position: absolute;
  left: 100%;
  top: 0;
  z-index: 1000;
}

.hospital-dashboard-page #sidebar.active .submenu {
  position: static;
  width: 98%;
  padding: 0.2rem;
}

.hospital-dashboard-page #sidebar .navOption.active .submenu {
  display: block;
}

.hospital-dashboard-page #sidebar .submenuOption {
  display: block;
  color: lightgray;
  background-color: #595959;
  padding: 1rem;
  font-size: 1.2rem;
}

.hospital-dashboard-page #sidebar.active .submenuOption{
  text-align: center;
}

.hospital-dashboard-page #sidebar .submenuOption:first-child{
  background-color: #696969;
}

.hospital-dashboard-page #sidebar .submenuOption:hover {
  background-color: #696969;
}

.hospital-dashboard-page main {
  background-color: #F7F7F7;
  flex-grow: 1;
}

.hospital-dashboard-page .burgerIcon {
  font-size: 2.8rem;
  cursor: pointer;
  padding: 1rem;
  color: #312e2e;
}

.hospital-dashboard-page #topNav {
  display: flex;
  justify-content: space-between;
  background-color: #EDEDED;
  border-bottom: 0.1rem solid rgba(0, 0, 0, 0.15);
  margin-bottom: 1rem;
}

.hospital-dashboard-page #topNav #alerts {
  display: flex;
}

.hospital-dashboard-page #topNav #alerts #alertIcon {
  background-image: url("@/assets/email.png");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;

  width: 1.8rem;
  height: 1.8rem;
  margin-right: 2rem;
  align-self: center;
}

.hospital-dashboard-page #topNav #alerts #iconDetails {
  display: flex;
  cursor: pointer;
  margin-right: 2rem;
  position: relative;
}

.hospital-dashboard-page #topNav #alerts #iconDetails #profileOptions{
  display: none;
}

.hospital-dashboard-page #topNav #alerts #iconDetails.active #profileOptions{
  position: absolute;
  background-color: white;
  right: -1rem;
  top: 95%;
  width: 140%;
  padding: 1rem;
  box-shadow: 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.47);

  display: block;
}

.hospital-dashboard-page #topNav #alerts #iconDetails #profileOptions ul li:not(:last-child) {
  margin-bottom: 1rem;
}

.hospital-dashboard-page #topNav #alerts #iconDetails #profileOptions a{
  display: inline-block;
  width: 100%;
  color: #1f1f1f;
  cursor: pointer;
  position: relative;
}

.hospital-dashboard-page #topNav #alerts #iconDetails #profileOptions #logout::after{
  display: inline-block;
  content: ".";
  color: transparent;
  background-image: url("@/assets/logout.png");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  position: absolute;

  right: 0.2rem;
  width: 1.2rem;
  height: 1.2rem;
}

.hospital-dashboard-page #topNav #alerts #iconDetails div:first-child {
  align-self: center;
}

.hospital-dashboard-page #topNav #alerts #iconDetails #profileName{
  margin-left: 0.7rem;
  margin-right: 0.2rem;
  align-self: center;
  color: #595959;
}

.hospital-dashboard-page #topNav #alerts #iconDetails::after {
  display: inline-block;
  content: '.';
  color: transparent;
  background-image: url("@/assets/down-arrow-black.png");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;

  align-self: center;

  margin-left: 0.6rem;
  width: 0.8rem;
  height: 0.8rem;
}


@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-1rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}


.hospital-dashboard-page #mainContent h1 {
  font-weight: 400;
  padding-left: 1.5rem;
  color: #464646;
}

</style>
