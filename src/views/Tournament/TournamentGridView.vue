<template>
    <div class="bodybox">
      <div class="card">
        <div class="header">
          Турнирная сетка
        </div>
        <div class="tournament">
          <div class="round" v-for="(round, index) in rounds" :key="index">
            <div class="stage">
              {{ getStageLabel(index) }}
            </div>
            <div class="match" v-for="match in round" :key="match.id">
              <div class="user">
                <input type="text" v-model="match.user1" :placeholder="'Команда ' + (match.id * 2 - 1)" />
              </div>
              <div class="user">
                <input type="text" v-model="match.user2" :placeholder="'Команда ' + (match.id * 2)" />
              </div>
              <div class="result">
                <input type="text" v-model="match.result1" placeholder="Счет команды 1" />
                <input type="text" v-model="match.result2" placeholder="Счет команды 2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
        const users = ['User A', 'User B', 'User C', 'User D', 'User E', 'User F', 'User G', 'User H'];
        const numRounds = Math.ceil(Math.log2(users.length));
  
        for (let round = 0; round < numRounds; round++) {
          const matches = [];
  
          for (let i = 0; i < users.length / Math.pow(2, round + 1); i++) {
            const match = {
              id: i + 1,
              user1: users[i * 2] || '',
              user2: users[i * 2 + 1] || '',
              result1: '',
              result2: '',
            };
  
            matches.push(match);
          }
  
          this.rounds.push(matches);
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
    margin-top: 3%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    border: 1px solid gray;
    padding: 20px;
    z-index: 1;
    background-color: #f5f5f5;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
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
    background-color: aqua;
  }
  
  .user {
    font-size: 24px;
    font-weight: 600;
  }
  
  .result {
    font-size: 20px;
  }
  
  .round:first-child {
    margin-right: 30px;
  }
  
  .round:last-child {
    margin-left: 30px;
  }
  </style>