<template>
  <v-app>
    <div class="page-background"></div>

    <v-app-bar app>
      <v-toolbar-title style="font-size: 28px;">
        <v-icon>
          <img src="@/assets/logo.svg" alt="Icon"/>
        </v-icon>
        ФутBIG Настольный Футбол
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text to="/tournaments" style="color: #4CAF50;">Турниры</v-btn>
        <v-menu v-if="userName">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" style="color: #4CAF50;">{{ userName }}</v-btn>
            </template>
            <v-list>
              <v-list-item  @click="logout" link>Выйти</v-list-item>
            </v-list>
          </v-menu>
        <template v-else>
          <v-btn text to="/" style="color: #4CAF50;">Войти</v-btn>
        </template>
      </v-toolbar-items>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      userName: ''
    };
  },
  mounted() {
    window.addEventListener('mousemove', this.parallaxBackground);
    this.checkUser();
  },
  beforeDestroy() {
    window.removeEventListener('mousemove', this.parallaxBackground);
  },
  methods: {
    parallaxBackground(event) {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const offsetX = 0.008;
      const backgroundElement = document.querySelector('.page-background');
      const offsetXValue = (event.clientX - windowWidth / 2) * offsetX;
      const offsetYValue = (event.clientY - windowHeight / 2) * offsetX;

      const maxOffset = 50;
      const limitedOffsetXValue = Math.max(-maxOffset, Math.min(maxOffset, offsetXValue));
      const limitedOffsetYValue = Math.max(-maxOffset, Math.min(maxOffset, offsetYValue));

      backgroundElement.style.transform = `translate(${limitedOffsetXValue}px, ${limitedOffsetYValue}px)`;
    },
    checkUser() {
      const storedUserName = localStorage.getItem('userName');
      if (storedUserName) {
        this.userName = storedUserName;
      }
    },
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      this.userName = '';
      this.$router.push('/');
    },
  },
};
</script>

<style>
.page-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 110%;
  height: 110%;
  background-image: url('/src/assets/background2.jpg');
  background-size: cover;
  background-position: center center;
  overflow: hidden;
}

body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  font-family: 'Handjet', sans-serif;
}

</style>