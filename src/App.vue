<template>
  <v-app>
    <div class="page-background"></div>

    <v-app-bar app>
      <v-toolbar-title>Организация турниров по настольному футболу</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text to="/tournaments">Турниры</v-btn>
        <template v-if="userName">
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" text>{{ userName }}</v-btn>
            </template>
            <v-list>
              <v-list-item @click="logout">Выйти</v-list-item>
            </v-list>
          </v-menu>
        </template>
        <template v-else>
          <v-btn text to="/">Войти</v-btn>
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
    window.addEventListener('scroll', this.parallaxBackground);
    this.checkUser();
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.parallaxBackground);
  },
  methods: {
    parallaxBackground() {
      const scrollPosition = window.pageYOffset;
      const backgroundElement = document.querySelector('.page-background');
      backgroundElement.style.transform = `translateY(-${scrollPosition * 0.4}px)`;
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
  width: 100%;
  height: 100%;
  background-image: url('/src/assets/background2.jpg');
  background-size: cover;
  background-position: center;
}

body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
}

</style>