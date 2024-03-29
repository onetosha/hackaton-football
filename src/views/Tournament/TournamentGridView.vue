<template>
    <div class="bodybox">
      <div class="card">
        <div class="header">Турнирная сетка (ID: {{ tourId }})</div>
        <div class="tournament">
          <div class="round" v-for="(round, index) in rounds" :key="index">
            <div class="stage">{{ getStageLabel(index) }}</div>
            <div class="match" v-for="match in round" :key="match.match_id">
              <div class="team">
                <input
                  type="text"
                  v-model="match.user1_goals"
                  :placeholder="'Команда ' + match.user1_id"
                  :readonly="match.is_end"
                />
              </div>
              <div class="team">
                <input
                  type="text"
                  v-model="match.user2_goals"
                  :placeholder="'Команда ' + match.user2_id"
                  :readonly="match.is_end"
                />
              </div>
              <div class="result">
                <input
                  type="text"
                  v-model="match.user1_goals"
                  :placeholder="match.user1_goals"
                  :readonly="match.is_end"
                />
                <input
                  type="text"
                  v-model="match.user2_goals"
                  :placeholder="match.user2_goals"
                  :readonly="match.is_end"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: ['tourId'],
    data() {
      return {
        rounds: [],
      };
    },
    mounted() {
      this.getMatches();
    },
    methods: {
      getMatches() {
        const url = `/api/tour/get_matches?tourId=${this.tourId}`;
        axios
          .get(url)
          .then((response) => {
            const matches = response.data.matches.sort((a, b) => a.match_id - b.match_id);
            this.generateTournament(matches);
          })
          .catch((error) => {
            console.error(error);
          });
      },
      generateTournament(matches) {
        const numRounds = 3; // Замените на нужное количество раундов
        for (let round = 0; round < numRounds; round++) {
          const roundMatches = matches.filter((match) => match.enum_stage === this.getStageLabel(round));
          this.rounds.push(roundMatches);
        }
      },
      getStageLabel(index) {
        const stages = ['1/4', '1/2', 'Финал'];
        return stages[index] || '';
      },
    },
  };
  </script>
  
  <style>
  .bodybox {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
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
  
  .header {
    font-size: 20px;
    font-weight: 600;
    width: 100%;
    justify-content: center;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .tournament {
    display: flex;
    justify-content: space-between;
  }
  
  .round {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  
  .stage {
    font-size: 16px;
    font-weight: 600;
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
  
  .round:first-child {
    margin-right: 30px;
  }
  
  .round:last-child {
    margin-left: 30px;
  }
  </style>