<template>
  <div class="index mt-16">

    <!-- Trash -->
    <v-container>
      <v-row id="trash">
        <v-col cols="12">
          <h3 class="text-h4 text-md-h3 text-center">My Bin</h3>
          <Trash :percentage="percentage" :closed="closed"/>
        </v-col>
      </v-row>

      <!-- Schedule -->
      <v-row id="schedule" class="my-8" align="center">
        <v-col cols="12" class="mb-4">
          <h3 class="text-h4 text-md-h3 text-center">Schedule</h3>
          <Table/>
        </v-col>
      </v-row>

      <!-- Services -->
      <v-row id="services">
        <v-col cols="12" class="">
          <h3 class="text-h4 text-md-h3 text-center">Services</h3>
        </v-col>
        <v-col cols="12" class="">
          <Calendar/>
        </v-col>
        <v-col cols="12" class="mb-1">
          <v-select
            :items="['Green Waste', 'Bulky Waste']"
            label="Select a service"
            v-model="selected"
          ></v-select>
        </v-col>
        <v-col cols="12" class="mb-1">
          <v-btn color="primary" :disabled="!selected" @click="selected=false; snackbar = true;">
            Submit
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar v-model="snackbar" timeout="2000" color="accent">
      Service Requested
    </v-snackbar>
  </div>

</template>

<script>
export default {
  data: () => ({
    percentage: 0,
    closed: true,
    selected: false,
    snackbar: false
  }),
  created() {
    this.fetchDataLoop();
  },
  beforeDestroy() {
    // Clears the interval when the component is destroyed
    clearInterval(this.interval);
  },
  methods:{
    fetchDataLoop() {
      // Store interval ID to clear it later
      this.interval = setInterval(async () => {
        await this.$axios
          .get('http://192.168.26.64:1880/bins/64601b3dd4ba9a789af1ef53')
          .then(response => {
            this.percentage = response.data.level;
            this.closed = response.data.closed;
          })
          .catch(error => {
            console.error(error);
          });
      }, 1000);
    },
  }
}
</script>
