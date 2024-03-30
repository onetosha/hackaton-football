<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <h1 class="title">Список турниров</h1>
          </v-card-title>

          <v-card-text>
            <v-form @submit.prevent="createTournament">
              <v-text-field v-model="tournamentName" label="Название турнира"></v-text-field>
              <v-btn color="success" type="submit">Создать турнир</v-btn>
            </v-form>
            <v-data-table
              :headers="headers"
              :items="tournaments"
              :search="search"
              :loading="loading"
              :no-results-text="noResultsText"
              item-key="tour_id"
            >
              <template v-slot:item="{ item }">
                <tr>
                  <td>{{ item.tour_id}}</td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.count_users }}</td>
                  <td>{{ item.is_end ? 'Закончен' : 'В процессе' }}</td>
                  <td>
                    <v-btn
                      color="success"
                      @click="goToTournament(item.tour_id)"
                    >
                      Перейти к турниру
                    </v-btn>
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-card-text>
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
      headers: [
        { title: 'Код турнира', value: 'tour_id' },
        { title: 'Название', value: 'name' },
        { title: 'Пользователи', value: 'count_users' },
        { title: 'Статус', value: 'is_end' },
        { title: '', value: '' }, // Пустой заголовок для кнопки
      ],
      tournaments: [],
      loading: false,
      search: '',
      noResultsText: 'Нет доступных турниров.',
      tournamentName: '',
    };
  },
  mounted() {
    this.getTournaments();
  },
  methods: {
    getTournaments() {
      console.log(localStorage.token);
      this.loading = true;
      axios
        .post('/api/tour/get/', null,
        { 
          headers: { 'Authorization': `Bearer ${localStorage.token}`} })
        .then(response => {
          console.log(response.data);
          this.tournaments = response.data;
          console.log(this.tournaments);
        })
        .catch(error => {
          console.error('Ошибка при получении турниров', error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    createTournament() {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      const data = { token, name: this.tournamentName };
      
      axios
        .post('/api/tour/register/', data, { headers })
        .then(response => {
          // Обработка успешного создания турнира
          console.log('Турнир успешно создан', response.data);
          this.tournamentName = '';
          this.getTournaments(); // Обновление списка турниров
        })
        .catch(error => {
          console.error('Ошибка при создании турнира', error);
        });
    },
    goToTournament(tour_id) {
      localStorage.tourId = tour_id;
      console.log('Tour id', tour_id);
      this.$router.push('/grid');
    },
  },
};
</script>

<style scoped>
.title {
  font-size: 36px;
  color: #4CAF50;
  margin-bottom: 16px;
}
.card {
  width: 1000px;
  height: 80%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #f5f5f5;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid gray;
  padding: 20px;
}

.v-data-table {
  margin-top: 20px;
}
</style>