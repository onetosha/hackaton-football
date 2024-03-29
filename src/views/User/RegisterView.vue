<template>
  <v-container fluid>
    <v-row align="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="card">
          <v-card-title class="justify-center">
            <h1 class="title">Регистрация</h1>
          </v-card-title>

          <v-card-text>
            <v-form @submit.prevent="register">
              <v-text-field
                v-model="username"
                label="Никнейм"
                required
              ></v-text-field>

              <v-text-field
                v-model="firstName"
                label="Имя"
                required
              ></v-text-field>

              <v-text-field
                v-model="lastName"
                label="Фамилия"
                required
              ></v-text-field>

              <v-text-field
                v-model="email"
                label="Email"
                type="email"
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
                Зарегистрироваться
              </v-btn>
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-center">
            <router-link to="/" class="link">Уже есть аккаунт?</router-link>
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
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      loading: false
    };
  },
  methods: {
    register() {
      this.loading = true;
      axios
        .post('/api/registration', {
          email: this.email,
          username: this.username,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName
        })
        .then(response => {
          console.log('Успешная регистрация', response.data);
          this.$router.push('/login');
        })
        .catch(error => {
          console.error('Ошибка регистрации', error);
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
.link {
  color: #4CAF50;
  font-size: 14px;
}

.link:hover {
  text-decoration: underline;
}
</style>