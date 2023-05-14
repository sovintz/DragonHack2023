<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
      <tr>
        <th class="text-left">
          Date
        </th>
        <th class="text-left">
          Time
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
        v-for="entry in schedule"
        :key="entry.name"
      >
        <td>{{ entry.date }}</td>
        <td>{{ entry.time }}</td>
      </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  name: "Table",
  data: () => ({
    schedule: [
      {
        date: "16.5.2023",
        time: "7:15",
      },
      {
        date: "21.5.2023",
        time: "7:10 ",
      }
    ]
  })
}
</script>

<style scoped>

</style>
