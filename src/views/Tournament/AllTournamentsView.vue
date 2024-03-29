<template>
    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="serverItems"
      :items-length="totalItems"
      :loading="loading"
      :search="search"
      item-value="tournamentName"
      @update:options="loadItems"
    ></v-data-table-server>
  </template>
  
  <script>
  const tournaments = [
    {
      tournamentName: "Tournament A",
      location: "City A",
      numofParticipants: 8,
      isAvailiable: true,
    },
    {
      tournamentName: "Tournament B",
      location: "City B",
      numofParticipants: 12,
      isAvailiable: false,
    },
    // Add more tournament objects as needed
  ];
  
  const FakeAPI = {
    async fetch({ page, itemsPerPage, sortBy }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const start = (page - 1) * itemsPerPage;
          const end = start + itemsPerPage;
          let items = tournaments.slice();
  
          if (sortBy.length) {
            const sortKey = sortBy[0].key;
            const sortOrder = sortBy[0].order;
            items.sort((a, b) => {
              const aValue = a[sortKey];
              const bValue = b[sortKey];
              if (typeof aValue === "string") {
                return sortOrder === "desc" ? bValue.localeCompare(aValue) : aValue.localeCompare(bValue);
              } else {
                return sortOrder === "desc" ? bValue - aValue : aValue - bValue;
              }
            });
          }
  
          const paginated = items.slice(start, end);
  
          resolve({ items: paginated, total: items.length });
        }, 500);
      });
    },
  };
  
  export default {
    data: () => ({
      itemsPerPage: 5,
      headers: [
        { title: "Tournament Name", key: "tournamentName", align: "start" },
        { title: "Location", key: "location", align: "end" },
        { title: "Participants", key: "numofParticipants", align: "end" },
        { title: "Available", key: "isAvailiable", align: "end" },
      ],
      search: "",
      serverItems: [],
      loading: true,
      totalItems: 0,
    }),
    methods: {
      loadItems({ page, itemsPerPage, sortBy }) {
        this.loading = true;
        FakeAPI.fetch({ page, itemsPerPage, sortBy }).then(({ items, total }) => {
          this.serverItems = items;
          this.totalItems = total;
          this.loading = false;
        });
      },
    },
  };
  </script>
  