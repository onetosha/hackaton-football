<template>
  <v-container fluid>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="card">
          <v-card-title class="justify-center">
            <h1 class="title">Вход</h1>
          </v-card-title>

          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field
                v-model="username"
                label="Никнейм"
                required
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
            <router-link to="/register" class="register-link">Регистрация</router-link>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      loading: false
    };
  },
  methods: {
    login() {
      this.loading = true;
      const response = axios
        .post('/api/login', {
          username: this.username,
          password: this.password
        })
        .then(response => {
          // Обработка успешного входа
          console.log('Успешный вход', response.data);
          
        })
        .catch(error => {
          // Обработка ошибки входа
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
  margin-left: auto;
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

.register-link {
  color: #4CAF50;
  font-size: 14px;
}

.register-link:hover {
  text-decoration: underline;
}
</style>