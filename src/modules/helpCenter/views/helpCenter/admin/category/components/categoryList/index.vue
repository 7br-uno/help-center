<template>
  <div class="pb-3">
    <v-data-table
      :loading="loading"
      :headers="headers"
      :footer-props="footerProps"
      :items="categories"
      item-key="id"
      class="row-pointer mx-6"
      @click:row="(item) => $emit('action', actions[0].action, item)"
      :page="pagination.page"
      :options.sync="pagination"
      :server-items-length="categoriesData.count"
    >
      <!-- Title -->
      <template v-slot:[`item.title`]="{item}">
        <div class="d-flex align-center">
          <v-img
            max-width="20"
            max-height="20"
            contain
            :src="item.image"
            class="mr-3"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular size="10" width="2" indeterminate color="primary"/>
              </v-row>
            </template>
          </v-img>
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
      <!-- Actions -->
      <template v-slot:[`item.id`]="{item}">
        <div class="d-flex align-center justify-end">
          <v-tooltip
              v-for="(action, i) in actions"
              :key="i"
              bottom
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                icon
                @click.stop="$emit('action', action.action, item)"
                :loading="action.action === 'removeCategory' && deleting === item.id"
                :disabled="action.action === 'removeCategory' && deleting != null"
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
  name: 'categoryList',
  data(){
    return {
      headers: [
        { text: 'Category', sortable: false, align: 'start', value: 'title', cellClass: 'font-weight-bold' },
        { text: 'Actions', sortable: false, align: 'end', value: 'id' },
      ],
      footerProps: {
        'items-per-page-options': [5,10,15],
        'disable-pagination': false,
        'disable-items-per-page': false
      },
      actions: [
        { title: "Voir informations", icon: 'mdi-eye', action: 'openDialogSeeCategory'},
        { title: "Modifier", icon: 'mdi-pencil', action: 'openDialogEditCategory'},
        { title: 'Supprimer', icon: 'mdi-delete-outline', action: 'removeCategory', color: 'red'},
      ],
      pagination: {
        page: 1,
        itemsPerPage: 10
      },
      categories: [],
      categoriesData: {

      },
      loading: true,
      deleting: null
    }
  },
  mounted(){
    if(!this.categoriesData.results || this.categoriesData.results.length === 0){ this.fetchCategories() }
  },
  methods: {
    fetchCategories(){
      setTimeout( () => {
        this.categoriesData = {

        }
        this.categories = [
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
        this.loading = false
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
  watch: {
    'pagination.page'() {
      this.fetchCategories()
    },
    'pagination.itemsPerPage'() {
      this.fetchCategories()
    }
  }
}
</script>
