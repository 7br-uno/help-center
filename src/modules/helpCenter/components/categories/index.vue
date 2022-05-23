<template>
  <div>
    <v-row v-if="data === null">
      <v-col
        v-for="i in 9"
        :key="i"
        cols="12"
        sm="6"
        md="4"
      >
        <v-skeleton-loader v-bind="attrs"></v-skeleton-loader>
      </v-col>
    </v-row>
    <empty-search v-else-if="!!data && data.length === 0 && searching !== ''" />
    <new-content-soon v-else-if="!!data && data.length === 0 && searching === ''" />
    <v-row v-else>
      <v-col
        v-for="item in data"
        :key="item.id"
        cols="12"
        sm="4"
      >
        <v-hover>
          <template v-slot:default="{ hover }">
            <v-card
              :class="`elevation-${hover ? 8 : 0} ${hover ? 'grey lighten-5' : 0}`"
              class="pa-5 rounded-lg transition-swing pointer"
              @click="$router.push('/support/' + item.id)"
            >
              <category-card :data="item"/>
            </v-card>
          </template>
        </v-hover>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  name: 'categoriesFeed',
  components: {
    'category-card': () => import('./components/category-card'),
    'empty-search': () => import('../emptySearch'),
    'new-content-soon': () => import('../newContentSoon')
  },
  data() {
    return {
      data: null,
      attrs: {
        class: 'mb-6',
        boilerplate: false,
        loading: true,
        elevation: 0,
        type: 'article'
      }
    }
  },
  mounted() {
    if(this.data === null) this.fetchCategories()
  },
  methods: {
    fetchCategories(){
      setTimeout( () => {
        this.data = [
          {
            id: 19,
            title: "Account Settings",
            description: "Set up your personal and company settings.",
            image: require('../../assets/categoryIcons/accountsettings.svg')
          },
          {
            id: 20,
            title: "Data organization",
            description: "Organize and customize your deals, contacts, and activities.",
            image: require('../../assets/categoryIcons/data-management.svg')
          },
          {
            id: 21,
            title: "Features",
            description: "Browse through the features that could make your team more productive.",
            image: require('../../assets/categoryIcons/features.svg')
          },
          {
            id: 22,
            title: "Billing",
            description: "Learn all you need to know about billing, pricing, and subscription management.",
            image: require('../../assets/categoryIcons/billing.svg')
          },
          {
            id: 23,
            title: "Troubleshooting",
            description: "Fix common issues with troubleshooting guides.",
            image: require('../../assets/categoryIcons/cogwheel.svg')
          },
          {
            id: 24,
            title: "Email",
            description: "Stay connected with your customer with our email features.",
            image: require('../../assets/categoryIcons/email.svg')
          },
          {
            id: 25,
            title: "Lead Generation",
            description: "Capture and manage your sales leads with a leads inbox and add-ons.",
            image: require('../../assets/categoryIcons/leads.svg')
          },
          {
            id: 26,
            title: "Mobile Apps",
            description: "Stay productive on the go by using Pipedrive's iOS or Android apps.",
            image: require('../../assets/categoryIcons/mobile_apps_icon.svg')
          },
          {
            id: 27,
            title: "Security",
            description: "Keep your data safe with data security measures and security related features.",
            image: require('../../assets/categoryIcons/privacysecurity.svg')
          },
        ]
      }, 1000);
    }
  },
  computed: {
    searching(){ return '' }
  },
}
</script>
