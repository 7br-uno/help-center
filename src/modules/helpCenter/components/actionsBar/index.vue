<template>
  <v-row class="pa-3">
    <v-col cols="12" sm="6" md="4">
      <v-btn
        :loading="false"
        :disabled="false"
        block
        color="primary"
        class="white--text text-transform-none"
        @click="$emit('action', pageSetup.openDialog)"
      >
        <v-icon
          left
          dark
        >
          mdi-plus
        </v-icon>
        <span class="text-decoration-none">New {{ pageSetup.item }}</span>
      </v-btn>
    </v-col>
    <v-col cols="12" sm="6" md="4">
      <v-btn
        :loading="false"
        :disabled="false"
        outlined
        block
        color="primary"
        class="white--text text-transform-none"
        :to="pageSetup.to"
      >
        <v-icon
          left
          dark
        >
          mdi-wrench-outline
        </v-icon>
        <span class="text-decoration-none">Manage {{ pageSetup.oposit }}</span>
      </v-btn>
    </v-col>
    <v-col v-if="pageSetup.item === 'article'" cols="12" :sm="pageSetup.item === 'article' ? 6 : 4" md="4">
      <v-select
        v-model="category"
        :items="categoryItems"
        prepend-inner-icon="mdi-filter-outline"
        clearable
        hide-details
        :disabled="loading || loadingCategoriesGet"
        :loading="loadingCategoriesGet"
        dense
        outlined
        label="Filter by category"
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
    <v-col cols="12" :sm="pageSetup.item === 'article' ? 6 : 12" :md="pageSetup.item === 'article' ? 12 : 4">
      <v-text-field
        v-model="search"
        clearable
        :loading="loading"
        :disabled="false"
        hide-details
        dense
        outlined
        :label="`Find an ${pageSetup.item}`"
        type="text"
      >
        <template v-slot:append>
          <v-fade-transition leave-absolute>
            <v-progress-circular
              v-if="false"
              size="24"
              width="3"
              color="primary"
              indeterminate
            ></v-progress-circular>
            <v-icon
              v-else
              v-text="'mdi-magnify'"
            ></v-icon>
          </v-fade-transition>
        </template>
      </v-text-field>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'actionsBar',
  data(){
    return {
      loadingCategoriesGet: false,
      categories: null,
      loading: true,
      search: '',
      category: null,
      categoryItems: [],
      pageSetup: {
        item: 'article',
        itemPlural: 'articles',
        openDialog: 'openDialogNewArticle',
        to: '/admin/support/categories',
        loading: 'loadingArticlesGet'
      }
    }
  },
  mounted() {
    if(!this.categories){
      setTimeout( () => {
        this.loadingCategoriesGet = false
        this.loading = false
        let categoryItems = [
          {
            id: 19,
            title: "Account Settings",
            description: "Set up your personal and company settings.",
            types: [3, 4, 6],
            image: require('../../assets/categoryIcons/accountsettings.svg'),
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
            image: require('../../assets/categoryIcons/data-management.svg'),
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
            image: require('../../assets/categoryIcons/features.svg'),
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
            image: require('../../assets/categoryIcons/billing.svg'),
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
            image: require('../../assets/categoryIcons/cogwheel.svg'),
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
            image: require('../../assets/categoryIcons/email.svg'),
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
            image: require('../../assets/categoryIcons/leads.svg'),
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
            image: require('../../assets/categoryIcons/mobile_apps_icon.svg'),
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
            image: require('../../assets/categoryIcons/privacysecurity.svg'),
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
    switch(this.$route.name) {
      case 'helpCenterAdminArticles':
        this.pageSetup = {
          item: 'article',
          itemPlural: 'articles',
          oposit: 'categories',
          openDialog: 'openDialogNewArticle',
          to: '/admin/support/categories',
          loading: 'loadingArticlesGet'
        }
        break;
      case 'helpCenterAdminCategories':
        this.pageSetup = {
          item: 'category',
          itemPlural: 'categories',
          oposit: 'articles',
          openDialog: 'openDialogNewCategory',
          to: '/admin/support/articles',
          loading: 'loadingCategoriesGet'
        }
        break;
    }
  },
  watch: {
    category(){
      this.$emit('action', 'filterByCategory', this.category)
    }
  }
}
</script>
<style scoped>
.text-decoration-none{
  text-transform: none !important;
}
</style>
