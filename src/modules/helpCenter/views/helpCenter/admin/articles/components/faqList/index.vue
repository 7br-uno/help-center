<template>
  <div class="pb-3">
    <v-data-table
      :loading="loading"
      :headers="headers"
      :footer-props="footerProps"
      :items="articles.results"
      item-key="id"
      class="row-pointer mx-6"
      @click:row="(item) => $emit('action', actions[0].action, item)"
      :server-items-length="articles.count"
    >
      <!-- Title -->
      <template v-slot:[`item.title`]="{ item }">
        <div class="d-flex align-center">
          <span v-text="item.title" class="mr-4"></span>
          <!-- Privacy -->
          <v-tooltip
            v-for="item in item.types"
            :key="item"
            bottom
          >
            <template v-slot:activator="{ on, attrs }">
              <v-chip
                color="primary"
                dark
                label
                small
                class="mr-2 rounded-xl"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon small v-text="privacyModel(item).icon"></v-icon>
              </v-chip>
            </template>
            <span>Visible to: {{ privacyModel(item).text }}</span>
          </v-tooltip>
        </div>
      </template>
      <!-- Category -->
      <template v-slot:[`item.category.title`]="{item}">
        <div class="d-flex align-center justify-center">
          <v-img
            max-width="15"
            max-height="15"
            contain
            :src="item.category.image"
            class="mr-2"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular size="8" width="2" indeterminate color="primary"/>
              </v-row>
            </template>
          </v-img>
          <span v-text="item.category.title" class="caption"></span>
        </div>
      </template>
      <!-- Actions -->
      <template v-slot:[`item.id`]="{item}">
        <div class="d-flex align-center justify-center">
          <v-tooltip
            v-for="(action, i) in actions"
            :key="i"
            bottom
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                icon
                :loading="action.action === 'removeArticle' && deleting === item.id"
                :disabled="action.action === 'removeArticle' && deleting != null"
                @click.stop="$emit('action', action.action, action.action === 'openDialogWatchVideo' ? item.video_key : item)"
                class="mr-1"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon v-text="action.icon" :color="action.color"></v-icon>
              </v-btn>
            </template>
            <span v-text="action.title"></span>
          </v-tooltip>
        </div>
      </template>
    </v-data-table>
  </div>
</template>
<script>
export default {
  name: 'faqList',
  data(){
    return {
      articles: {
        child_from: null,
        count: 0,
        items_per_page: 10,
        num_pages: 1,
        results: []
      },
      loading: true,
      headers: [
        { text: 'Title', sortable: false, align: 'start', value: 'title', cellClass: 'font-weight-bold' },
        { text: 'Category', sortable: false, align: 'center', value: 'category.title' },
        { text: 'Actions', sortable: false, align: 'center', value: 'id' },
      ],
      footerProps: {
        'items-per-page-options': [5,10,15],
        'disable-pagination': false,
        'disable-items-per-page': false
      },
      actions: [
        { title: "Voir informations", icon: 'mdi-eye', action: 'openDialogSeeArticle'},
        { title: "Voir video", icon: 'mdi-youtube', action: 'openDialogWatchVideo', color: 'red'},
        { title: "Modifier", icon: 'mdi-pencil', action: 'openDialogEditArticle'},
        { title: 'Supprimer', icon: 'mdi-delete-outline', action: 'removeArticle', color: 'red'},
      ],
      pagination: {
        page: 1,
        itemsPerPage: 10
      }
    }
  },
  mounted(){
    if(this.articles.results.length === 0){ this.fetchArticles() }
  },
  methods: {
    fetchArticles(){
      setTimeout( () => {
        this.loading = false
        this.articles = {
          child_from: null,
          count: 5,
          items_per_page: 10,
          num_pages: 1,
          results: [
            {
              id: 13,
              title: "How can I add a user?",
              description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
              image: null,
              video_key: "kV__iZuxDGE",
              types: [5, 4, 6],
              category: {
                id: 19,
                image: require('../../../../../../assets/categoryIcons/accountsettings.svg'),
                title: "Account Settings"
              },
              create_user: {full_name: 'Bruno Neves'},
              create_date: '22/05/2022',
              last_update_user: {full_name: 'Bruno Pereira'},
              last_update_date: '23/05/2022'
            },
            {
              id: 20,
              title: "Data organization",
              description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
              image: null,
              video_key: "pJIKPzZTJXM",
              types: [5, 4, 3],
              category: {
                id: 24,
                image: require('../../../../../../assets/categoryIcons/email.svg'),
                title: "Email"
              },
              create_user: {full_name: 'Bruno Neves'},
              create_date: '22/05/2022',
              last_update_user: {full_name: 'Bruno Pereira'},
              last_update_date: '23/05/2022'
            },
            {
              id: 15,
              title: "Visibility Groups",
              description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
              image: null,
              video_key: "Z6_J8KxIlmI",
              types: [5, 6, 3],
              category: {
                id: 21,
                title: "Features",
                image: require('../../../../../../assets/categoryIcons/features.svg')
              },
              create_user: {full_name: 'Bruno Neves'},
              create_date: '22/05/2022',
              last_update_user: {full_name: 'Bruno Pereira'},
              last_update_date: '23/05/2022'
            },
            {
              id: 16,
              title: "Who to manage Admin User",
              description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
              image: null,
              video_key: "awTP7IUY3uo",
              types: [5, 4, 3],
              category: {
                id: 22,
                title: "Billing",
                image: require('../../../../../../assets/categoryIcons/billing.svg'),
              },
              create_user: {full_name: 'Bruno Neves'},
              create_date: '22/05/2022',
              last_update_user: {full_name: 'Bruno Pereira'},
              last_update_date: '23/05/2022'
            },
            {
              id: 17,
              title: "Permission Sets",
              description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
              image: null,
              video_key: "EvGOlAkLSLw",
              types: [5, 4, 3],
              category: {
                id: 23,
                image: require('../../../../../../assets/categoryIcons/cogwheel.svg'),
                title: "Troubleshooting",
              },
              create_user: {full_name: 'Bruno Neves'},
              create_date: '22/05/2022',
              last_update_user: {full_name: 'Bruno Pereira'},
              last_update_date: '23/05/2022'
            },
          ]
        }
      }, 1000);
    },
    privacyModel(v){
      switch(v) {
        case 4: return { text: 'Group A', icon: 'mdi-mortar-pestle-plus' }
        case 6: return { text: 'Group B', icon: 'mdi-home-modern' }
        case 3: return { text: 'Group C', icon: 'mdi-domain' }
        case 5: return { text: 'Group D', icon: 'mdi-briefcase-account-outline' }
      }
    }
  },
  computed: {
    deleting() { return null }
  }
}
</script>
