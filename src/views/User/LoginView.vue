<template>
  <v-container fluid>
    <v-row align="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="card">
          <v-card-title class="justify-center">
            <h1 class="title">Вход</h1>
          </v-card-title>

          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field
                v-model="email"
                label="Email"
                required
                :rules="emailRules"
              ></v-text-field>

              <v-text-field
                v-model="password"
                label="Пароль"
                type="password"
                required
              ></v-text-field>

              <v-btn
                type="submit"
                color="success"
                :loading="loading"
                :disabled="loading"
              >
                Войти
              </v-btn>
            </v-form>
          </v-card-text>

          <v-card-actions class="justify-center">
            <router-link to="/registration" class="link">Регистрация</router-link>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      loading: false,  
      emailRules: [
        value => !!value || 'Email является обязательным полем',
        value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Неправильный формат email'
      ]
    };
  },
  methods: {
    login() {
      this.loading = true;
      axios
        .post('/api/login', {
          email: this.email,
          password: this.password
        })
        .then(response => {
          const token = response.data.token;
          localStorage.userName = response.data.username;
          localStorage.setItem('token', token);
          console.log('Успешный вход', response.data);
        })
        .catch(error => {
          console.error('Ошибка входа', error);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style scoped>
.card {
  width: 400px;
  margin-right: auto;
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 24px;
  color: #4CAF50;
  margin-bottom: 16px;
}

.v-text-field {
  margin-bottom: 16px;
}

.v-btn {
  margin-top: 16px;
}

.link {
  color: #4CAF50;
  font-size: 14px;
}

.link:hover {
  text-decoration: underline;
}
</style>