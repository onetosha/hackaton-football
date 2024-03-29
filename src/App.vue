<template>
  <v-app>
    <div class="page-background"></div>

    <v-app-bar app>
      <v-toolbar-title>Организация турниров по настольному футболу</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text to="/tournaments">Турниры</v-btn>
        <v-btn text to="/">Войти</v-btn>
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
  mounted() {
    window.addEventListener('scroll', this.parallaxBackground);
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
  z-index: -1;
  background-image: url('/src/assets/background2.jpg');
  background-size: cover;
  background-position: center;
}

a 
{
    cursor: pointer;
  }
  
body {
    margin: 20px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* overflow-x: hidden; горизонтальная прокрутка */
  }

.v-main {
    background-color: transparent;
  }


</style>