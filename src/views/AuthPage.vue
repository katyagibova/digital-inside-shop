<template>
  <div>
    <div style="margin-top: 30px; min-width: 300px">
      <v-row>
        <p style="margin: 0; font-size: 20px">Логин</p>
      </v-row>
      <v-row>
        <v-text-field
          v-model="userLogin"
          elevation="0"
          label="Login"
          placeholder="Login"
          solo
        ></v-text-field>
      </v-row>
      <v-row>
        <p style="margin: 0; font-size: 20px">Пароль</p>
      </v-row>
      <v-row>
        <v-text-field
          v-model="userPassword"
          label="Password"
          placeholder="Password"
          solo
        ></v-text-field>
      </v-row>
      <v-row>
        <v-btn
          @click="authorization()"
          elevation="0"
          color="#007AFF"
          style="color: #fff"
        >
          Войти
        </v-btn>
      </v-row>
      <v-row>
        <v-col style="paddinr-right: 0">
          <p>Еще нет аккаунта?</p>
        </v-col>
        <v-col style="paddinr-left: 0">
          <p class="register_btn" @click="startRegistration = true"> <u> ЗАРЕГИСТРИРУЙТЕСЬ </u> </p>
        </v-col>
      </v-row>
    </div>
    <v-dialog
      v-model="startRegistration"
      max-width="500"
    >
      <v-card>
        <v-card-title class="text-h5">
          Введите логин и пароль
        </v-card-title>
        <v-card-text style="margin-top: 20px">
          <v-row>
            <p style="margin: 0; font-size: 20px">Логин</p>
          </v-row>
          <v-row>
            <v-text-field
              v-model="regLogin"
              elevation="0"
              label="Login"
              placeholder="Login"
              solo
            ></v-text-field>
          </v-row>
          <v-row>
            <p style="margin: 0; font-size: 20px">Пароль</p>
          </v-row>
          <v-row>
            <v-text-field
              v-model="regPassword"
              label="Password"
              placeholder="Password"
              solo
            ></v-text-field>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="registration()"
          >
            Зарегистрироваться
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Axios from "axios";
import {AUTHORIZE, GET_ROLE, REGISTRATION} from "@/api";
import { mapActions } from "vuex";

export default {
  name: "AuthPage",
  components: {},
  data() {
    return {
      userLogin: "",
      userPassword: "",
      regLogin: "",
      regPassword: "",
      regObj:{
        email: '',
        password: ''
      },
      tok: '',
      text: '',
      startRegistration: false,
    };
  },
  methods: {
    ...mapActions(["CHANGE_USER_ROLE"]),
    async authorization() {
      await Axios.post(`${AUTHORIZE}`, { 'email': this.userLogin, 'password': this.userPassword })
      .then( (res) => {
        this.setLogined(res.data.access)
        this.tok = res.data.access
        this.getRole()
      })
      .catch((error) => {
        console.error(error);
      })
    },

    async registration() {
      this.regObj.email = this.regLogin
      this.regObj.password = this.regPassword
      await Axios.post(`${REGISTRATION}`, this.regObj)
      .then( (res) => {
        if(res.status == 201){
          this.startRegistration = false
        }
      }).catch((error) => {
        console.error(error);
      })
    },

    async getRole() {
      const token = this.tok
      await Axios.get(`${GET_ROLE}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        localStorage.setItem('user_role', res.data.role)
        this.CHANGE_USER_ROLE(res.data.role)
      })
      .catch((error) => {
        console.error(error);
      });
    },

    setLogined(token){
      if (token != "") {
        localStorage.setItem('auth', true)
        localStorage.setItem('access_token', token)
        this.$router.push({ path: "/catalog/phone/" });
      } else {
        localStorage.removeItem('auth')
        localStorage.removeItem('access_token')
        localStorage.removeItem('user_role')
      }
    },
  },
  created() {},
  computed: {},
};
</script>

<style lang="scss" scoped>
.register_btn{
  color: #007AFF;
  cursor: pointer;
}
</style>
