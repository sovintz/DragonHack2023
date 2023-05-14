<template>
  <v-dialog ref="dialog" v-model="dialog" width="290">
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="date"
        label="Pick a date"
        prepend-icon="mdi-calendar"
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="date" @input="dialog = false"></v-date-picker>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    date: null
  }),

  methods: {
    showDatePicker() {
      this.$refs.dialog.open();
    },
  },
};
</script>
