<template>
  <div class="index">

    <!-- Header -->
    <div id="header">
      <Header/>
    </div>

    <v-container>

      <!-- About -->
      <v-row id="about" class="my-8" align="center">
        <v-col cols=12 class="col-md-4 text-center">
          <v-avatar size="200">
            <img src="~static/images/lan_sovinc.jpg" :alt="this.$i18n.t('homePage.aboutSection.altText')"/>
          </v-avatar>
          <h5 class="text-h5 mt-2">{{ $t('homePage.aboutSection.myName') }}</h5>
          <p class="text-subtitle-1">{{ $t('homePage.aboutSection.obtainedTitle') }}</p>
        </v-col>
        <v-col cols=12 class="col-md-8 text-center">
          <p class="text-body-1">
            {{ $t('homePage.aboutSection.description') }}
          </p>
        </v-col>
      </v-row>

      <!-- Competences -->
      <v-row id="competences" class="my-8" align="center">
        <v-col cols="12" class="mb-4">
          <h3 class="text-h4 text-md-h3 text-center">{{ $t('homePage.competencesSection.title') }}</h3>
        </v-col>
        <v-col v-for="(competence, index) in $i18n.t('homePage.competencesSection.competences')" :key="index" cols=12 class="col-md-4 text-center">
          <v-avatar color="primary" size="150">
            <v-icon dark size="80">
              {{ $t(competence.icon) }}
            </v-icon>
          </v-avatar>
          <h5 class="text-h5 my-3">{{ $t(competence.title) }}</h5>
          <p class="text-subtitle-1">
            {{ $t(competence.description) }}
          </p>
        </v-col>
      </v-row>

      <!-- Projects -->
      <v-row id="projects">
        <v-col cols="12" class="mb-4">
          <h3 class="text-h4 text-md-h3 text-center">{{ $t('homePage.projectsSection.title') }}</h3>
        </v-col>
        <v-col cols="12" sm="6" lg="4" xl="3" class="mb-4" v-for="project in $i18n.t('homePage.projectsSection.projects')" :key="project.title">
              <ProjectCard class="ma-4" :projectData="project"/>
        </v-col>
      </v-row>
    </v-container>

    <!-- Contact -->
    <div id="contact">
      <ContactBlock/>
    </div>

  </div>

</template>

<script>
export default {
  head () {
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true })
    return {
      title: this.$i18n.t('homePage.tabTitle'),
      htmlAttrs: {
        ...i18nHead.htmlAttrs
      },
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$i18n.t('homePage.metaData')
        },
        ...i18nHead.meta
      ],
      link: [
        ...i18nHead.link
      ]
    }
  }
}
</script>
