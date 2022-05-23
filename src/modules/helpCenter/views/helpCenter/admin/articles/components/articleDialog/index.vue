<template>
  <div class="text-center">
    <v-dialog
      v-model="show"
      width="700"
      :persistent="loading"
      @click:outside="close(false)"
    >
      <v-card>
        <v-card-title class="text-h6 primary--text">
          <v-icon :color="dialogFunction === 'WATCH_VIDEO' ? 'red' : 'primary'" class="mr-2" v-text="setup.icon"></v-icon>
          <span v-text="dialogFunction === 'READ' ? title : setup.title"></span>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="close(false)"
            :disabled="loading"
            icon
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text v-if="dialogFunction === 'WATCH_VIDEO'">
          <div class="video-container">
            <iframe :src="`https://www.youtube.com/embed/${videoId}`" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
        </v-card-text>

        <v-card-text v-else class="pt-5">
          <v-form
            ref="newArticleForm"
            v-model="valid"
            lazy-validation
          >
            <v-row>

              <v-col cols="12" v-if="dialogFunction !== 'READ'" class="py-0">
                <v-text-field
                  v-model="title"
                  :rules="titleRules"
                  :readonly="setup.readOnly"
                  :disabled="loading"
                  label="Title"
                  dense
                  outlined
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4" v-if="dialogFunction === 'READ' && !!image" class="py-0 mb-5">
                <v-img :src="image" max-height="120" class="mx-auto">
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular size="40" width="4" indeterminate color="primary"/>
                    </v-row>
                  </template>
                </v-img>
              </v-col>

              <v-col cols="12" :md="dialogFunction === 'READ' && !!image ? 8 : 12" class="py-0">
                <v-textarea
                  v-model="description"
                  :rules="descriptionRules"
                  :readonly="setup.readOnly"
                  :disabled="loading"
                  :counter="dialogFunction !== 'READ'"
                  :hint="dialogFunction !== 'READ' ? 'Saisissez un texte d\'environ 85 caractères.': ''"
                  dense
                  outlined
                  :rows="dialogFunction === 'READ' && !!image ? 4 : 3"
                  row-height="15"
                  required
                  label="Description"
                ></v-textarea>
              </v-col>

              <v-col cols="12" :md="dialogFunction !== 'READ' ? 4 : 6" class="py-0">
                <v-text-field
                  v-model="videoId"
                  :rules="videoIdRules"
                  :readonly="setup.readOnly"
                  :disabled="loading"
                  label="YouTube video ID"
                  hint="https://www.youtube.com/watch?v=###########"
                  dense
                  outlined
                  required
                >
                  <template v-if="setup.readOnly" v-slot:append>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                          v-bind="attrs"
                          v-on="on"
                          @click.stop="$emit('action', 'openDialogWatchVideo', videoId)"
                        >
                          mdi-play-circle-outline
                        </v-icon>
                      </template>
                      <span>Play Video</span>
                    </v-tooltip>
                  </template>
                </v-text-field>
              </v-col>

              <v-col cols="12" md="4" v-if="dialogFunction !== 'READ'" class="py-0">
                <div v-if="dialogFunction === 'UPDATE' && !!image" class="d-flex align-center">
                  <v-img :src="image" max-height="40" max-width="60" class="mr-auto">
                    <template v-slot:placeholder>
                      <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular size="20" width="3" indeterminate color="primary"/>
                      </v-row>
                    </template>
                  </v-img>
                  <v-btn
                    x-small
                    color="red"
                    dark
                    @click="image = ''"
                  >
                    <v-icon left>mdi-delete</v-icon>
                    Remove thumb
                  </v-btn>
                </div>
                <v-file-input
                  v-if="dialogFunction === 'CREATE' || (dialogFunction === 'UPDATE' && !image)"
                  v-model="thumbnail"
                  :disabled="setup.readOnly || loading"
                  accept="image/png, image/jpeg"
                  dense
                  color="primary"
                  label="Alternative thumbnail"
                  placeholder="Select an image"
                  prepend-icon=""
                  prepend-inner-icon="mdi-paperclip"
                  outlined
                >
                  <template v-slot:selection="{ text }">
                    <v-chip
                      color="primary"
                      dark
                      label
                      small
                      class="px-1"
                    >
                      <v-icon small class="mr-1">mdi-image</v-icon>
                      <span v-text="$vuetify.breakpoint.mdAndUp && !!text && text.length > 10 ? text.substring(0, 10) + '...' : text"></span>
                    </v-chip>
                  </template>
                </v-file-input>
              </v-col>

              <v-col cols="12" :md="dialogFunction !== 'READ' ? 4 : 6" class="py-0">
                <v-select
                  v-model="category"
                  :items="categoryItems"
                  :rules="[v => !!v || 'Required']"
                  :disabled="loading || loadingCategoriesGet"
                  :readonly="setup.readOnly"
                  :loading="loadingCategoriesGet"
                  dense
                  outlined
                  label="Category"
                  required
                >
                  <template slot="item" slot-scope="data">
                    <v-img
                      max-width="20"
                      max-height="20"
                      contain
                      :src="data.item.icon"
                      class="mr-3"
                    >
                      <template v-slot:placeholder>
                        <v-row class="fill-height ma-0" align="center" justify="center">
                          <v-progress-circular size="10" width="2" indeterminate color="primary"/>
                        </v-row>
                      </template>
                    </v-img>
                    <span v-text="data.item.text"></span>
                  </template>
                </v-select>
              </v-col>

              <v-col cols="12" md="8" class="py-0">
                <v-select
                  v-model="privacy"
                  :items="privacyItems"
                  :rules="privacyRules"
                  :readonly="setup.readOnly"
                  :disabled="loading"
                  chips
                  label="Visible for"
                  dense
                  multiple
                  outlined
                >
                  <template v-slot:selection="{ item }">
                    <v-chip
                      color="primary"
                      dark
                      label
                      small
                    >
                      <v-icon small class="mr-1" v-text="item.icon"></v-icon>
                      {{ item.text }}
                    </v-chip>
                  </template>
                </v-select>
              </v-col>

              <v-col cols="12" md="4" class="py-0">
                <v-checkbox
                  class="mt-1"
                  v-model="visibleJustForAdminUsers"
                  :disabled="loading"
                  :readonly="setup.readOnly"
                  color="primary"
                >
                  <template v-slot:label>
                    Just for&nbsp;<b>admin</b>&nbsp;users
                  </template>
                </v-checkbox>
              </v-col>

              <v-col v-if="dialogFunction !== 'CREATE'" cols="12" class="py-0">
                <v-alert
                  v-if="(!!createUser && !!createDate) || (!!lastUpdateUser && !!lastUpdateDate)"
                  dense
                  color="primary"
                  outlined
                  type="info"
                  elevation="2"
                  class="caption elevation-0"
                >
                  <div v-if="!!createUser && !!createDate">
                    Article created by {{ createUser }} - {{ createDate }}.
                  </div>
                  <div v-if="!!lastUpdateUser && !!lastUpdateDate">
                    Article last modified by {{ lastUpdateUser }} - {{ lastUpdateDate }}.
                  </div>
                </v-alert>
              </v-col>

            </v-row>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
            color="primary"
            text
            @click="close(false)"
            :disabled="loading"
            class="mr-1"
          >
            Close
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            v-if="!setup.readOnly"
            color="primary"
            :loading="loading"
            @click="save"
          >
            <v-icon left>mdi-content-save-outline</v-icon>
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: 'articleDialog',
  data () {
    return {
      show: null,
      dialogFunction: null,
      valid: true,
      id: null,
      title: '',
      titleRules: [
        v => !!v || 'Title is required',
        v => (v && v.length <= 150) || 'Title must be less than 150 characters',
      ],
      videoId: '',
      videoIdRules: [
        v => !!v || 'YouTube Video ID is required',
      ],
      image: null,
      thumbnail: [],
      description: '',
      descriptionRules: [
        v => !!v || 'Description is required',
      ],
      category: null,
      categoryItems: [],
      visibleJustForAdminUsers: false,
      privacy: [],
      privacyRules: [
        v => v.length > 0 || 'Select at least one entity',
      ],
      privacyItems: [
        { text: 'Group A', icon: 'mdi-mortar-pestle-plus', value: 4 },
        { text: 'Group B', icon: 'mdi-home-modern', value: 6 },
        { text: 'Group C', icon: 'mdi-domain', value: 3 },
        { text: 'Group D', icon: 'mdi-briefcase-account-outline', value: 5 }
      ],
      createUser: false,
      createDate: '',
      lastUpdateUser: false,
      lastUpdateDate: '',
      categories: null,
      loadingCategoriesGet: true
    }
  },
  methods: {
    fillFields(article){
      this.id = article.id
      this.title = article.title
      this.image = article.image
      this.videoId = article.video_key
      this.category = article.category.id
      this.description = article.description
      this.privacy = article.types
      this.visibleJustForAdminUsers = article.user_is_admin
      this.createUser = article.create_user ? article.create_user.full_name : false
      this.createDate = article.create_date
      this.lastUpdateUser = article.last_update_user ? article.last_update_user.full_name : false
      this.lastUpdateDate = article.last_update_date
    },
    save(){
      if(this.$refs.newArticleForm.validate()) {
        console.log('save')
      }
    },
    close(refreshArticlesList){
      if (refreshArticlesList) this.$emit('action', 'refreshArticlesList')
      if (this.dialogFunction !== 'WATCH_VIDEO') this.$refs.newArticleForm.reset()
      this.title = ''
      this.id = ''
      this.show = null
    }
  },
  computed: {
    setup(){
      switch(this.dialogFunction) {
        case 'CREATE':
          return {
            icon: 'mdi-help-circle',
            title: 'New FAQ article',
            readOnly: false
          }
        case 'READ':
          return {
            icon: 'mdi-help-circle',
            title: 'FAQ article',
            readOnly: true
          }
        case 'WATCH_VIDEO':
          return {
            icon: 'mdi-youtube',
            title: 'FAQ Video',
            readOnly: true
          }
        case 'UPDATE':
          return {
            icon: 'mdi-help-circle',
            title: 'Edit FAQ article',
            readOnly: false
          }
        default:
          return {
            icon: 'mdi-help-circle',
            title: 'FAQ article',
            readOnly: true
          }
      }
    },
    loading(){ return false }
  },
  watch:{
    show(){
      if(!this.show) this.dialogFunction = null
      else {
        if(!this.categories){
          setTimeout( () => {
            this.loadingCategoriesGet = false
            let categoryItems = [
              {
                id: 19,
                title: "Account Settings",
                description: "Set up your personal and company settings.",
                types: [3, 4, 6],
                image: require('../../../../../../assets/categoryIcons/accountsettings.svg'),
                create_user: {full_name: 'Bruno Neves'},
                create_date: '22/05/2022',
                last_update_user: {full_name: 'Bruno Pereira'},
                last_update_date: '23/05/2022'
              },
              {
                id: 20,
                title: "Data organization",
                description: "Organize and customize your deals, contacts, and activities.",
                types: [5, 4, 3],
                image: require('../../../../../../assets/categoryIcons/data-management.svg'),
                create_user: {full_name: 'Bruno Neves'},
                create_date: '22/05/2022',
                last_update_user: {full_name: 'Bruno Pereira'},
                last_update_date: '23/05/2022'
              },
              {
                id: 21,
                title: "Features",
                description: "Browse through the features that could make your team more productive.",
                types: [5, 3, 6],
                image: require('../../../../../../assets/categoryIcons/features.svg'),
                create_user: {full_name: 'Bruno Neves'},
                create_date: '22/05/2022',
                last_update_user: {full_name: 'Bruno Pereira'},
                last_update_date: '23/05/2022'
              },
              {
                id: 22,
                title: "Billing",
                description: "Learn all you need to know about billing, pricing, and subscription management.",
                types: [5, 4, 3],
                image: require('../../../../../../assets/categoryIcons/billing.svg'),
                create_user: {full_name: 'Bruno Neves'},
                create_date: '22/05/2022',
                last_update_user: {full_name: 'Bruno Pereira'},
                last_update_date: '23/05/2022'
              },
              {
                id: 23,
                title: "Troubleshooting",
                description: "Fix common issues with troubleshooting guides.",
                types: [3, 4, 6],
                image: require('../../../../../../assets/categoryIcons/cogwheel.svg'),
                create_user: {full_name: 'Bruno Neves'},
                create_date: '22/05/2022',
                last_update_user: {full_name: 'Bruno Pereira'},
                last_update_date: '23/05/2022'
              },
              {
                id: 24,
                title: "Email",
                description: "Stay connected with your customer with our email features.",
                types: [5, 4, 3, 6],
                image: require('../../../../../../assets/categoryIcons/email.svg'),
                create_user: {full_name: 'Bruno Neves'},
                create_date: '22/05/2022',
                last_update_user: {full_name: 'Bruno Pereira'},
                last_update_date: '23/05/2022'
              },
              {
                id: 25,
                title: "Lead Generation",
                description: "Capture and manage your sales leads with a leads inbox and add-ons.",
                types: [3, 4, 6],
                image: require('../../../../../../assets/categoryIcons/leads.svg'),
                create_user: {full_name: 'Bruno Neves'},
                create_date: '22/05/2022',
                last_update_user: {full_name: 'Bruno Pereira'},
                last_update_date: '23/05/2022'
              },
              {
                id: 26,
                title: "Mobile Apps",
                description: "Stay productive on the go by using Pipedrive's iOS or Android apps.",
                types: [5, 3, 6],
                image: require('../../../../../../assets/categoryIcons/mobile_apps_icon.svg'),
                create_user: {full_name: 'Bruno Neves'},
                create_date: '22/05/2022',
                last_update_user: {full_name: 'Bruno Pereira'},
                last_update_date: '23/05/2022'
              },
              {
                id: 27,
                title: "Security",
                description: "Keep your data safe with data security measures and security related features.",
                types: [5, 4, 6],
                image: require('../../../../../../assets/categoryIcons/privacysecurity.svg'),
                create_user: {full_name: 'Bruno Neves'},
                create_date: '22/05/2022',
                last_update_user: {full_name: 'Bruno Pereira'},
                last_update_date: '23/05/2022'
              },
            ]
            categoryItems.forEach(categoryItem => {
              this.categoryItems.push({
                text: categoryItem.title,
                icon: categoryItem.image,
                value: categoryItem.id
              })
            })
          }, 1000);
        }
      }
    }
  }
}
</script>
<style scoped>
.video-container {
  overflow: hidden;
  position: relative;
  width:100%;
}

.video-container::after {
  padding-top: 56.25%;
  display: block;
  content: '';
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
