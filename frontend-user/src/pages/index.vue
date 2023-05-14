<template>
  <div class="index mt-16">

    <!-- Trash -->
    <v-container>
      <v-row id="trash">
        <v-col cols="12">
          <h1 class="text-center">My Bin</h1>
          <Trash percentage="50"/>
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
            :items="['Zeleni odrez', 'Kosovni odpad']"
            label="Select a service"
            v-model="selected"
          ></v-select>
        </v-col>
        <v-col cols="12" class="mb-1">
          <v-btn color="primary">
            Submit
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

  </div>

</template>

<script>
export default {
  data: () => ({
  })
}
</script>
