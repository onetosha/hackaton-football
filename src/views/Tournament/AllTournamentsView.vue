<template>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>
              <h1 class="title">Список турниров</h1>
            </v-card-title>
  
            <v-card-text>
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
                    <td>{{ item.name }}</td>
                    <td>{{ item.count_users }}</td>
                    <td>{{ item.owner_id }}</td>
                    <td>{{ item.is_end ? 'Закончен' : 'В процессе' }}</td>
                    <td>
                      <v-btn
                        color="primary"
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
          { title: 'Название', value: 'name' },
          { title: 'Пользователи', value: 'count_users' },
          { title: 'Код создателя', value: 'owner_id' },
          { title: 'Статус', value: 'is_end' },
          { title: '', value: '' }, // Пустой заголовок для кнопки
        ],
        tournaments: [],
        loading: false,
        search: '',
        noResultsText: 'Нет доступных турниров.',
      };
    },
    mounted() {
      this.getTournaments();
    },
    methods: {
      getTournaments() {
        this.loading = true;
        axios
          .get('/api/tour/get')
          .then(response => {
            this.tournaments = response.data;
          })
          .catch(error => {
            console.error('Ошибка при получении турниров', error);
          })
          .finally(() => {
            this.loading = false;
          });
      },
      goToTournament(tourId) {
        this.$router.push({ name: 'grid', query: { tourId } });
        console.log('Переход к турниру с ID:', tourId);
      },
    },
  };
  </script>
  
  <style scoped>
  .title {
    font-size: 24px;
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
  </style>