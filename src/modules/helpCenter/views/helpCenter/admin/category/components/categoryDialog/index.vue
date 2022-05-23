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
          <v-img
            v-if="dialogFunction !== 'CREATE' && !!image"
            max-width="25"
            max-height="25"
            contain
            :src="image"
            class="mr-3"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular size="10" width="2" indeterminate color="primary"/>
              </v-row>
            </template>
          </v-img>
          <v-icon v-else color="primary" v-text="setup.icon" class="mr-2"></v-icon>
          <span v-text="dialogFunction !== 'READ' ? setup.title : title"></span>
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

        <v-card-text class="pt-5">
          <v-form
            ref="newCategoryForm"
            v-model="valid"
            lazy-validation
          >
            <v-row>

              <v-col cols="12" md="6" v-if="dialogFunction !== 'READ'" class="py-0">
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

              <v-col cols="12" md="6" v-if="dialogFunction !== 'READ'" class="py-0">
                <v-file-input
                  v-model="icon"
                  :disabled="setup.readOnly || loading"
                  :rules="dialogFunction === 'CREATE' ? iconRules : []"
                  accept="image/png, image/jpeg, image/svg+xml"
                  dense
                  color="primary"
                  label="Icon"
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
                      <span v-text="text"></span>
                    </v-chip>
                  </template>
                </v-file-input>
              </v-col>

              <v-col cols="12" class="py-0">
                <v-textarea
                  v-model="description"
                  :rules="descriptionRules"
                  :readonly="setup.readOnly"
                  :disabled="loading"
                  :hint="!setup.readOnly ? 'Entrez un texte d\'un maximum de 35 caractères.' : ''"
                  :counter="!setup.readOnly"
                  dense
                  outlined
                  rows="2"
                  row-height="15"
                  required
                  label="Description"
                ></v-textarea>
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
                    Catégorie créé par {{ createUser }} le jour {{ createDate }}.
                  </div>
                  <div v-if="!!lastUpdateUser && !!lastUpdateDate">
                    Catégorie modifié pour la dernière fois par {{ lastUpdateUser }} le {{ lastUpdateDate }}.
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
            :disabled="loading"
            @click="close(false)"
            class="mr-1"
          >
            Close
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            v-if="!setup.readOnly"
            color="primary"
            @click="save"
            :loading="loading"
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
  name: 'categoryDialog',
  data () {
    return {
      show: false,
      dialogFunction: null,
      valid: true,
      id: null,
      title: '',
      titleRules: [
        v => !!v || 'Title is required',
        v => (v && v.length <= 150) || 'Title must be less than 150 characters',
      ],
      image: null,
      icon: [],
      iconRules: [
        v => !v || v.size > 1 || 'The icon is required'
      ],
      description: '',
      descriptionRules: [
        v => !!v || 'Description is required',
      ],
      category: null,
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
      createUser: '',
      createDate: '',
      lastUpdateUser: '',
      lastUpdateDate: ''
    }
  },
  methods: {
    fillFields(category){
      this.id = category.id
      this.title = category.title
      this.image = category.image
      this.description = category.description
      this.privacy = category.types
      this.visibleJustForAdminUsers = category.user_is_admin
      this.createUser = category.create_user ? category.create_user.full_name : false
      this.createDate = category.create_date
      this.lastUpdateUser = category.last_update_user ? category.last_update_user.full_name : false
      this.lastUpdateDate = category.last_update_date
    },
    async save(){
      if(this.$refs.newCategoryForm.validate()){
        console.log('save')
      }
    },
    close(refreshArticlesList){
      if (refreshArticlesList) this.$emit('action', 'refreshCategoriesList')
      this.title = ''
      this.$refs.newCategoryForm.reset()
      this.show = false
    }
  },
  computed: {
    setup(){
      switch(this.dialogFunction) {
        case 'CREATE':
          return {
            icon: 'mdi-shape',
            title: 'New category',
            readOnly: false
          }
        case 'READ':
          return {
            icon: 'mdi-shape',
            title: 'Category',
            readOnly: true
          }
        case 'UPDATE':
          return {
            icon: 'mdi-shape',
            title: 'Edit category',
            readOnly: false
          }
        default:
          return {
            icon: 'mdi-shape',
            title: 'Category',
            readOnly: true
          }
      }
    },
    loading(){ return false }
  },
  watch:{
    show(){ if(!this.show) this.dialogFunction = null }
  }
}
</script>
