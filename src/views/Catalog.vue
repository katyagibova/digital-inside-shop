<template>
  <div>
    <div style="width: 1170px" flat v-if="userRole == 'Admin' || USER_ROLE == 'Admin'">
      <v-tabs
      left
      background-color="#fff"
      >
        <v-tabs-slider style="color: #007AFF"></v-tabs-slider>
        <v-tab
        v-for="(item, i) in adminTabs"
        :key="i"
        style="color: #000"
        :to="`${item.to}`">
          {{item.name}}
        </v-tab>
        <div style="display: inline-flex; margin-left: auto; margin-top: 3px">
          <p 
          class="create_product" 
          style="margin-top: auto; margin-bottom: auto; cursor: pointer;" 
          @click="exit()">Выйти</p>
          <v-btn
          icon
          @click="exit()">
            <v-icon size="30px" color="#007aff">
              mdi-account-cancel-outline
            </v-icon>
          </v-btn>
        </div>
      </v-tabs>
      <router-view/>
    </div>
    <div style="width: 1170px" flat v-else>
      <v-tabs
      left
      background-color="#fff"
      >
        <v-tabs-slider style="color: #007AFF"></v-tabs-slider>
        <v-tab
        v-for="(item, i) in tabs"
        :key="i"
        style="color: #000"
        :to="`${item.to}`">
          {{item.name}}
        </v-tab>
        <div style="display: inline-flex; margin-left: auto; margin-top: 3px">
          <p 
          class="create_product" 
          style="margin-top: auto; margin-bottom: auto; cursor: pointer;" 
          @click="exit()">Выйти</p>
          <v-btn
          icon
          @click="exit()">
            <v-icon size="30px" color="#007aff">
              mdi-account-cancel-outline
            </v-icon>
          </v-btn>
        </div>
      </v-tabs>
      <router-view/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Catalog",
  components: {},
  data() {
    return {
      userRole: '',
      tabs: [
        {
          name: "Телефоны",
          to: `/catalog/phone/`,
          en_name: "phone"
        },
        {
          name: "Компьютеры",
          to: `/catalog/pc/`,
          en_name: "pc"
        },
        {
          name: "Телевизоры",
          to: `/catalog/tv/`,
          en_name: "tv"
        },
        {
          name: "Камеры",
          to: `/catalog/camera/`,
          en_name: "camera"
        },
        {
          name: "Аксессуары",
          to: `/catalog/accessories/`,
          en_name: "accessories"
        },
      ],
      adminTabs: [
        {
          name: "Телефоны",
          to: `/catalog/phone/`,
          en_name: "phone"
        },
        {
          name: "Компьютеры",
          to: `/catalog/pc/`,
          en_name: "pc"
        },
        {
          name: "Телевизоры",
          to: `/catalog/tv/`,
          en_name: "tv"
        },
        {
          name: "Камеры",
          to: `/catalog/camera/`,
          en_name: "camera"
        },
        {
          name: "Аксессуары",
          to: `/catalog/accessories/`,
          en_name: "accessories"
        },
        {
          name: "Все заказы",
          to: `/catalog/bought_products/`,
          en_name: "bought_products"
        },
      ],
    };
  },
  methods: {
    getRole(){
      this.userRole = localStorage.getItem('user_role')
    },

    exit(){
      localStorage.removeItem('auth')
      localStorage.removeItem('access_token')
      localStorage.removeItem('user_role')
      this.$router.push({ path: "/" });
    }
  },
  created() {
    this.getRole();
  },
  computed: {
    ...mapGetters(["USER_ROLE"]),
  },
};
</script>

<style lang="scss">
.card_title{
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 56px;
  padding: 0;
  justify-content: space-between;
}

.price{
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  margin: 0;
}
</style>
