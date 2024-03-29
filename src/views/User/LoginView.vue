<template>
  <v-container fluid>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="card">
          <v-card-title class="justify-center">
            <h1 class="title">Турнирная сетка</h1>
          </v-card-title>

          <v-card-text>
            <div class="tournament">
              <div class="round" v-for="(round, index) in rounds" :key="index">
                <div class="match" v-for="match in round" :key="match.id">
                  <div class="team">
                    <input type="text" v-model="match.team1" :placeholder="'Команда ' + (match.id * 2 - 1)" />
                  </div>
                  <div class="team">
                    <input type="text" v-model="match.team2" :placeholder="'Команда ' + (match.id * 2)" />
                  </div>
                  <div class="result">
                    <input type="text" v-model="match.result1" placeholder="Счет команды 1" />
                    <input type="text" v-model="match.result2" placeholder="Счет команды 2" />
                  </div>
                </div>
              </div>
            </div>
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
export default {
  data() {
    return {
      rounds: [],
    };
  },
  mounted() {
    this.generateTournament();
  },
  methods: {
    generateTournament() {
      const teams = ['Team A', 'Team B', 'Team C', 'Team D', 'Team E', 'Team F', 'Team G', 'Team H'];
      const numRounds = Math.ceil(Math.log2(teams.length));

      for (let round = 0; round < numRounds; round++) {
        const matches = [];

        for (let i = 0; i < teams.length / Math.pow(2, round + 1); i++) {
          const match = {
            id: i + 1,
            team1: teams[i * 2] || '',
            team2: teams[i * 2 + 1] || '',
            result1: '',
            result2: '',
          };

          matches.push(match);
        }

        this.rounds.push(matches);
      }
    },
  },
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

.tournament {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.round {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.match {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  border: 1px solid gray;
  padding: 10px;
}

.team {
  font-size: 16px;
  font-weight: 600;
}

.result {
  font-size: 14px;
}

.register-link {
  color: #4CAF50;
  font-size: 14px;
}

.register-link:hover {
  text-decoration: underline;
}
</style>