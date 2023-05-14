<template>
  <v-footer padless class="mt-md-8">
    <v-card flat tile width="100%" color="#111111" class="lighten-1 text-center">
      <v-card-text>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4"
          icon
          @click="contact(icon)"
        >
          <v-icon size="24px" class="grey--text darken-2" >
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-text>
      <v-divider style="width: 50%" class="ma-auto grey darken-3"/>
      <v-card-text class="grey--text darken-2">
        {{ $t('footer.copyright') }}
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: [
      'mdi-email',
      'mdi-linkedin',
      'mdi-github'
    ]
  }),
  methods: {
    contact(contact) {
      contact = contact.split('-')[1]
      if (contact === "email") {
        window.open("mailto:lan@sovinc.com", "_blank");
      } else if (contact === "linkedin") {
        window.open("https://www.linkedin.com/in/lan-sovinc/", "_blank");
      } else if (contact === "github") {
        window.open("https://github.com/sovintz", "_blank");
      }
    }
  }
}
</script>

<style scoped>

</style>
