<template>
  <div>
    <div v-if="enName == 'bought_products'">
        <v-row style="margin-top: 10px">
        <v-col cols="6" 
        v-for="(item) in bought_products" 
        :key="item.id">
          <v-card elevation="4" style="border-radius: 21px; padding: 23px 40px">
            <v-card-title class="card_title">
              {{item.title}}
            </v-card-title>
            <v-card-text
              style="
                padding: 0;
                display: flex;
                justify-content: space-between;
                margin-top: 15px;
              "
            >
              <div>
                <p class="price"> Покупатель: {{item.user.role}}</p>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div v-else>
    <v-row style="margin-top: 10px; margin-left: 5px; display: flex; justify-content: space-between;">
      <div v-if="userRole == 'Admin' || USER_ROLE == 'Admin'" style="display: inline-flex">
        <v-btn
        icon
        @click="createProductFunc(enName)">
          <v-icon size="30px" color="#007aff">
            mdi-plus-circle-outline
          </v-icon>
        </v-btn>
        <p class="create_product" style="margin-top: auto; margin-bottom: auto">Создать товар</p>
      </div>
    </v-row>
      <v-row style="margin-top: 10px">
        <v-col cols="6" 
        v-for="(item) in products" 
        :key="item.id">
          <v-card elevation="4" style="border-radius: 21px; padding: 23px 40px">
            <v-card-title class="card_title">
              {{item.title}}
            </v-card-title>
            <v-card-text
              style="
                padding: 0;
                display: flex;
                justify-content: space-between;
                margin-top: 15px;
              "
            >
              <div>
                <p class="price">{{item.price}} руб.</p>
              </div>
              <div>
                <router-link :to="`/catalog/${enName}/${item.id}`" style="text-decoration: none">
                  <p class="price" style="color: #007aff">Подробнее</p>
                </router-link>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <v-dialog
      v-model="createProduct"
      persistent
      max-width="850"
    >
      <v-card>
        <v-card-title class="text-h5">
          Создание товара
        </v-card-title>
        <v-card-text>
          <v-row style="margin-top: 15px; margin-bottom: 10px">
            <v-col
            style="padding-bottom: 0; padding-top: 0"
            cols="8">
              <v-text-field
              v-model="title"
              label="Название"
              placeholder="Название"
              solo
              ></v-text-field>
            </v-col>
            <v-col
            style="padding-bottom: 0; padding-top: 0"
            cols="3">
              <v-text-field
              v-model="price"
              label="Цена"
              placeholder="Цена"
              solo
              ></v-text-field>
            </v-col>
            
          </v-row>
          <v-row>
            <v-col style="padding-bottom: 0; padding-top: 0">
              <p class="teh">Технические характеристики</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col
            style="padding-bottom: 0; padding-top: 0"
            v-for="(item, i) in selectedParameters"
            :key="i"
            cols="4">
              <v-select
              :items="item.values"
              :label="item.name"
              v-model="item.model"
              solo
              clearable
              @change="addParametr(item.name, item.model)"
              ></v-select>
            </v-col>
            <v-col
            style="padding-bottom: 0; padding-top: 0"
            cols="4">
              <v-text-field
              v-model="dimensions"
              label="Размер"
              placeholder="Размер"
              solo
              ></v-text-field>
            </v-col>
            <v-col
            style="padding-bottom: 0; padding-top: 0"
            cols="4">
              <v-text-field
              v-model="color"
              label="Цвет"
              placeholder="Цвет"
              solo
              ></v-text-field>
            </v-col>
          </v-row>
          <div v-if="selectedCategory == 'Телефоны'">
            <v-row style="margin-top: 20px">
              <v-col
              style="padding-bottom: 0; padding-top: 0"
              cols="4">
                <v-text-field
                v-model="weight"
                label="Вес"
                placeholder="Вес"
                solo
                ></v-text-field>
              </v-col>
            </v-row>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="createNewProduct()"
          >
            Создать
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Axios from "axios";
import {GET_ALL_CARDS, GET_BOUGHT_PRODUCTS, CREATE_PRODUCT, GET_DISPLAY, GET_PC_OS, GET_PC_PROCESSOR, GET_PC_TYPE, GET_PC_BRAND, GET_PC_RAM, GET_PC_ROM, GET_PC_GPU, GET_PHONE_GPU, GET_PHONE_RAM, GET_PHONE_ROM, GET_PHONE_OS, GET_PHONE_PROCESSOR, GET_PHONE_BRAND, GET_ACCESSORIES_BRAND, GET_ACCESSORIES_TYPE, GET_CAMERA_BRAND, GET_CAMERA_MATRIX, GET_TV_BRAND, GET_TV_CONNECTION} from "@/api";
import { mapGetters } from "vuex";

export default {
  name: "cardsInCategory",
  components: {},
  data() {
    return {
      userRole: '',
      createProduct: false,
      products: [],
      bought_products: [],
      selectedCategory: '',
      selectedParameters: [],
      title: '',
      color: '',
      dimensions: '',
      price: null,
      weight: null,
      newProdObj: {},
      newAccessoies: {
        title: '',
        price: 0,
        dimensions: '',
        color: '',
        date: '',
        brand: 0,
        type: 0
      },
      newCamera: {
        title: '',
        price: 0,
        dimensions: '',
        color: '',
        date: '',
        brand: 0,
        matrix: 0
      },
      newPC: {
        title: '',
        price: 0,
        dimensions: '',
        color: '',
        date: '',
        brand: 0,
        processor: 0,
        gpu: 0,
        ram: 0,
        rom: 0,
        os: 0,
        type: 0,
        display: 0
      },
      newPhone: {
        title: '',
        price: 0,
        dimensions: '',
        color: '',
        date: '',
        brand: 0,
        processor: 0,
        gpu: 0,
        ram: 0,
        rom: 0,
        os: 0,
        weight: 0,
        display: 0
      },
      newTV: {
        title: '',
        price: 0,
        dimensions: '',
        color: '',
        date: '',
        brand: 0,
        connection_type: 0,
        display: 0
      },
      newProduct: {},
      allDisplaies: {
        name: "Дисплэй",
        values: [],
        info: [],
        model: ""
      },
      allPCOS: {
        name: "Операционная система",
        values: [],
        info: [],
        model: ""
      },
      allPCProcessors: {
        name: "Процессор",
        values: [],
        info: [],
        model: ""
      },
      allPCTypes: {
        name: "Тип",
        values: [],
        info: [],
        model: ""
      },
      allPCBrands: {
        name: "Бренд",
        values: [],
        info: [],
        model: ""
      },
      allPCRAM: {
        name: "RAM",
        values: [],
        info: [],
        model: ""
      },
      allPCROM: {
        name: "ROM",
        values: [],
        info: [],
        model: ""
      },
      allPCGPU: {
        name: "Графический процессор",
        values: [],
        info: [],
        model: ""
      },
      allPhoneGPU: {
        name: "Графический процессор",
        values: [],
        info: [],
        model: ""
      },
      allPhoneRAM: {
        name: "RAM",
        values: [],
        info: [],
        model: ""
      },
      allPhoneROM: {
        name: "ROM",
        values: [],
        info: [],
        model: ""
      },
      allPhoneOS: {
        name: "Операционная система",
        values: [],
        info: [],
        model: ""
      },
      allPhoneBrands: {
        name: "Бренд",
        values: [],
        info: [],
        model: ""
      },
      allPhoneProcessors: {
        name: "Процессор",
        values: [],
        info: [],
        model: ""
      },
      allAccessoriesBrands: {
        name: "Бренд",
        values: [],
        info: [],
        model: ""
      },
      allAccessoriesTypes: {
        name: "Тип",
        values: [],
        info: [],
        model: ""
      },
      allCameraBrands: {
        name: "Бренд",
        values: [],
        info: [],
        model: ""
      },
      allCameraMatrix: {
        name: "Матрица",
        values: [],
        info: [],
        model: ""
      },
      allTVBrands: {
        name: "Бренд",
        values: [],
        info: [],
        model: ""
      },
      allTVConnections: {
        name: "Тип соединения",
        values: [],
        info: [],
        model: ""
      },
    };
  },
  methods: {
    getRole(){
      this.userRole = localStorage.getItem('user_role')
    },

    async createProd() {
      const token = localStorage.getItem('access_token')
      let model = this.enName
      await Axios.post(`${CREATE_PRODUCT}${model}/create/`, this.newProdObj, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then( (res) => {
        this.getAllCards()
        console.log(res)
      }).catch((error) => {
        console.error(error);
      })
    },

    async getAllCards() {
      const token = localStorage.getItem('access_token')
      let model = this.enName
      if(model == 'bought_products'){
        this.getBoughtProducts()
        return true
      }
      await Axios.get(`${GET_ALL_CARDS}${model}/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        this.products = res.data
        console.log(this.products)        
      })
      .catch((error) => {
        console.error(error);
      });
    },

    async getBoughtProducts() {
      const token = localStorage.getItem('access_token')
      await Axios.get(`${GET_BOUGHT_PRODUCTS}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        this.bought_products = res.data
        console.log(res.data)        
      })
      .catch((error) => {
        console.error(error);
      });
    },

    async getAccessoriesBrand() {
      const token = localStorage.getItem('access_token')
      await Axios.get(`${GET_ACCESSORIES_BRAND}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        res.data.forEach(elem => {
          this.allAccessoriesBrands.values.push(elem.title)
        })               
        res.data.forEach(elem => {
          this.allAccessoriesBrands.info.push(elem)
        })               
      })
      .catch((error) => {
        console.error(error);
      });
    },

    async getAccessoriesType() {
      const token = localStorage.getItem('access_token')
      await Axios.get(`${GET_ACCESSORIES_TYPE}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        res.data.forEach(elem => {
          this.allAccessoriesTypes.values.push(elem.title)
        })         
        res.data.forEach(elem => {
          this.allAccessoriesTypes.info.push(elem)
        })         
      })
      .catch((error) => {
        console.error(error);
      });
    },

    async getCameraBrand() {
      const token = localStorage.getItem('access_token')
      await Axios.get(`${GET_CAMERA_BRAND}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        res.data.forEach(elem => {
          this.allCameraBrands.values.push(elem.title)
        })        
        res.data.forEach(elem => {
          this.allCameraBrands.info.push(elem)
        })        
      })
      .catch((error) => {
        console.error(error);
      });
    },

    async getCameraMatrix() {
      const token = localStorage.getItem('access_token')
      await Axios.get(`${GET_CAMERA_MATRIX}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        res.data.forEach(elem => {
          this.allCameraMatrix.values.push(elem.title)
        })        
        res.data.forEach(elem => {
          this.allCameraMatrix.info.push(elem)
        })        
      })
      .catch((error) => {
        console.error(error);
      });
    },

    async getTVBrand() {
      const token = localStorage.getItem('access_token')
      await Axios.get(`${GET_TV_BRAND}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        res.data.forEach(elem => {
          this.allTVBrands.values.push(elem.title)
        })        
        res.data.forEach(elem => {
          this.allTVBrands.info.push(elem)
        })        
      })
      .catch((error) => {
        console.error(error);
      });
    },

    async getTVConnection() {
      const token = localStorage.getItem('access_token')
      await Axios.get(`${GET_TV_CONNECTION}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        res.data.forEach(elem => {
          this.allTVConnections.values.push(elem.title)
        })        
        res.data.forEach(elem => {
          this.allTVConnections.info.push(elem)
        })        
      })
      .catch((error) => {
        console.error(error);
      });
    },

    async getPhoneGPU() {
      const token = localStorage.getItem('access_token')
      await Axios.get(`${GET_PHONE_GPU}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        res.data.forEach(elem => {
          this.allPhoneGPU.values.push(elem.title)
        })         
        res.data.forEach(elem => {
          this.allPhoneGPU.info.push(elem)
        })         
      })
      .catch((error) => {
        console.error(error);
      });
    },

    async getPhoneRAM() {
      const token = localStorage.getItem('access_token')
      await Axios.get(`${GET_PHONE_RAM}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        res.data.forEach(elem => {
          this.allPhoneRAM.values.push(elem.title)
        })        
        res.data.forEach(elem => {
          this.allPhoneRAM.info.push(elem)
        })        
      })
      .catch((error) => {
        console.error(error);
      });
    },

    async getPhoneROM() {
      const token = localStorage.getItem('access_token')
      await Axios.get(`${GET_PHONE_ROM}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        res.data.forEach(elem => {
          this.allPhoneROM.values.push(elem.title)
        })        
        res.data.forEach(elem => {
          this.allPhoneROM.info.push(elem)
        })        
      })
      .catch((error) => {
        console.error(error);
      });
    },

    async getPhoneOS() {
      const token = localStorage.getItem('access_token')
      await Axios.get(`${GET_PHONE_OS}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        res.data.forEach(elem => {
          this.allPhoneOS.values.push(elem.title)
        })         
        res.data.forEach(elem => {
          this.allPhoneOS.info.push(elem)
        })         
      })
      .catch((error) => {
        console.error(error);
      });
    },

    async getPhoneProcessor() {
      const token = localStorage.getItem('access_token')
      await Axios.get(`${GET_PHONE_PROCESSOR}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        res.data.forEach(elem => {
          this.allPhoneProcessors.values.push(elem.title)
        })         
        res.data.forEach(elem => {
          this.allPhoneProcessors.info.push(elem)
        })         
      })
      .catch((error) => {
        console.error(error);
      });
    },

    async getPhoneBrand() {
      const token = localStorage.getItem('access_token')
      await Axios.get(`${GET_PHONE_BRAND}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        res.data.forEach(elem => {
          this.allPhoneBrands.values.push(elem.title)
        })         
        res.data.forEach(elem => {
          this.allPhoneBrands.info.push(elem)
        })         
      })
      .catch((error) => {
        console.error(error);
      });
    },

    async getPCBrand() {
      const token = localStorage.getItem('access_token')
      await Axios.get(`${GET_PC_BRAND}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        res.data.forEach(elem => {
          this.allPCBrands.values.push(elem.title)
        })         
        res.data.forEach(elem => {
          this.allPCBrands.info.push(elem)
        })         
      })
      .catch((error) => {
        console.error(error);
      });
    },

    async getPCGPU() {
      const token = localStorage.getItem('access_token')
      await Axios.get(`${GET_PC_GPU}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        res.data.forEach(elem => {
          this.allPCGPU.values.push(elem.title)
        })          
        res.data.forEach(elem => {
          this.allPCGPU.info.push(elem)
        })          
      })
      .catch((error) => {
        console.error(error);
      });
    },

    async getPCRAM() {
      const token = localStorage.getItem('access_token')
      await Axios.get(`${GET_PC_RAM}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        res.data.forEach(elem => {
          this.allPCRAM.values.push(elem.title)
        })        
        res.data.forEach(elem => {
          this.allPCRAM.info.push(elem)
        })        
      })
      .catch((error) => {
        console.error(error);
      });
    },

    async getPCROM() {
      const token = localStorage.getItem('access_token')
      await Axios.get(`${GET_PC_ROM}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        res.data.forEach(elem => {
          this.allPCROM.values.push(elem.title)
        })       
        res.data.forEach(elem => {
          this.allPCROM.info.push(elem)
        })       
      })
      .catch((error) => {
        console.error(error);
      });
    },

    async getPCOS() {
      const token = localStorage.getItem('access_token')
      await Axios.get(`${GET_PC_OS}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        res.data.forEach(elem => {
          this.allPCOS.values.push(elem.title)
        })        
        res.data.forEach(elem => {
          this.allPCOS.info.push(elem)
        })        
      })
      .catch((error) => {
        console.error(error);
      });
    },

    async getPCProcessor() {
      const token = localStorage.getItem('access_token')
      await Axios.get(`${GET_PC_PROCESSOR}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        res.data.forEach(elem => {
          this.allPCProcessors.values.push(elem.title)
        })        
        res.data.forEach(elem => {
          this.allPCProcessors.info.push(elem)
        })        
      })
      .catch((error) => {
        console.error(error);
      });
    },

    async getPCType() {
      const token = localStorage.getItem('access_token')
      await Axios.get(`${GET_PC_TYPE}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        res.data.forEach(elem => {
          this.allPCTypes.values.push(elem.title)
        })        
        res.data.forEach(elem => {
          this.allPCTypes.info.push(elem)
        })        
      })
      .catch((error) => {
        console.error(error);
      });
    },

    async getDisplay() {
      const token = localStorage.getItem('access_token')
      await Axios.get(`${GET_DISPLAY}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        res.data.forEach(elem => {
          this.allDisplaies.values.push(elem.title)
        })       
        res.data.forEach(elem => {
          this.allDisplaies.info.push(elem)
        })       
      })
      .catch((error) => {
        console.error(error);
      });
    },

    createProductFunc(categories){
      this.createProduct = true
      if(categories == 'phone') {
        this.selectedCategory = "Телефоны"
        this.selectedParameters = []
        this.getDisplay()
        this.getPhoneBrand()
        this.getPhoneProcessor()
        this.getPhoneOS()
        this.getPhoneROM()
        this.getPhoneRAM()
        this.getPhoneGPU()
        this.selectedParameters.push(this.allDisplaies)
        this.selectedParameters.push(this.allPhoneBrands)
        this.selectedParameters.push(this.allPhoneProcessors)
        this.selectedParameters.push(this.allPhoneOS)
        this.selectedParameters.push(this.allPhoneROM)
        this.selectedParameters.push(this.allPhoneRAM)
        this.selectedParameters.push(this.allPhoneGPU)
        console.log(this.selectedParameters)
      } else if (categories == 'pc') {
        this.selectedCategory = "Компьютеры"
        this.selectedParameters = []
        this.getDisplay()
        this.getPCType()
        this.getPCProcessor()
        this.getPCOS()
        this.getPCROM()
        this.getPCRAM()
        this.getPCGPU()
        this.getPCBrand()
        this.selectedParameters.push(this.allDisplaies)
        this.selectedParameters.push(this.allPCTypes)
        this.selectedParameters.push(this.allPCProcessors)
        this.selectedParameters.push(this.allPCOS)
        this.selectedParameters.push(this.allPCROM)
        this.selectedParameters.push(this.allPCRAM)
        this.selectedParameters.push(this.allPCGPU)
        this.selectedParameters.push(this.allPCBrands)
        console.log(this.selectedParameters)
      } else if (categories == 'tv') {
        this.selectedCategory = "Телевизоры"
        this.selectedParameters = []
        this.getTVConnection()
        this.getTVBrand()
        this.getDisplay()
        this.selectedParameters.push(this.allTVConnections)
        this.selectedParameters.push(this.allTVBrands)
        this.selectedParameters.push(this.allDisplaies)
        console.log(this.selectedParameters)
      } else if (categories == 'camera') {
        this.selectedCategory = "Камеры"
        this.selectedParameters = []
        this.getCameraMatrix()
        this.getCameraBrand()
        this.selectedParameters.push(this.allCameraMatrix)
        this.selectedParameters.push(this.allCameraBrands)
        console.log(this.selectedParameters)
      } else if (categories == 'accessories') {
        this.selectedCategory = "Аксессуары"
        this.selectedParameters = []
        this.getAccessoriesType()
        this.getAccessoriesBrand()
        this.selectedParameters.push(this.allAccessoriesTypes)
        this.selectedParameters.push(this.allAccessoriesBrands)
        console.log(this.selectedParameters)
      } else {
        console.log('Ошибка категории')
        this.selectedParameters = []
      }
      console.log(categories)
    },

    addParametr(name, value){
      if(this.enName == 'phone') {
        this.selectedParameters.forEach(item => {
          if(item.name == name){
            if(name == 'Операционная система'){
              item.info.forEach(elem => {
                if(elem.title == value){
                  this.newPhone.os = Number(elem.id)
                }
              })
            }
            if(name == 'Дисплэй'){
              item.info.forEach(elem => {
                if(elem.title == value){
                  this.newPhone.display = Number(elem.id)
                }
              })
            }
            if(name == 'Бренд'){
              item.info.forEach(elem => {
                if(elem.title == value){
                  this.newPhone.brand = Number(elem.id)
                }
              })
            }
            if(name == 'Процессор'){
              item.info.forEach(elem => {
                if(elem.title == value){
                  this.newPhone.processor = Number(elem.id)
                }
              })
            }
            if(name == 'ROM'){
              item.info.forEach(elem => {
                if(elem.title == value){
                  this.newPhone.rom = Number(elem.id)
                }
              })
            }
            if(name == 'RAM'){
              item.info.forEach(elem => {
                if(elem.title == value){
                  this.newPhone.ram = Number(elem.id)
                }
              })
            }
            if(name == 'Графический процессор'){
              item.info.forEach(elem => {
                if(elem.title == value){
                  this.newPhone.gpu = Number(elem.id)
                }
              })
            }
          }
        })
      } else if (this.enName == 'pc') {
        this.selectedParameters.forEach(item => {
          if(item.name == name){
            if(name == 'Операционная система'){
              console.log(item.info)
              item.info.forEach(elem => {
                if(elem.title == value){
                  console.log(elem.title + " " + elem.id)
                  this.newPC.os = Number(elem.id)
                }
              })
            }
            if(name == 'Дисплэй'){
              item.info.forEach(elem => {
                if(elem.title == value){
                  this.newPC.display = Number(elem.id)
                }
              })
            }
            if(name == 'Бренд'){
              item.info.forEach(elem => {
                if(elem.title == value){
                  this.newPC.brand = Number(elem.id)
                }
              })
            }
            if(name == 'Процессор'){
              item.info.forEach(elem => {
                if(elem.title == value){
                  this.newPC.processor = Number(elem.id)
                }
              })
            }
            if(name == 'ROM'){
              item.info.forEach(elem => {
                if(elem.title == value){
                  this.newPC.rom = Number(elem.id)
                }
              })
            }
            if(name == 'RAM'){
              item.info.forEach(elem => {
                if(elem.title == value){
                  this.newPC.ram = Number(elem.id)
                }
              })
            }
            if(name == 'Графический процессор'){
              item.info.forEach(elem => {
                if(elem.title == value){
                  this.newPC.gpu = Number(elem.id)
                }
              })
            }
            if(name == 'Тип'){
              item.info.forEach(elem => {
                if(elem.title == value){
                  this.newPC.type = Number(elem.id)
                }
              })
            }
          }
        })
      } else if (this.enName == 'tv') {
        this.selectedParameters.forEach(item => {
          if(item.name == name){
            if(name == 'Тип соединения'){
              item.info.forEach(elem => {
                if(elem.title == value){
                  this.newTV.connection_type = Number(elem.id)
                }
              })
            }
            if(name == 'Дисплэй'){
              item.info.forEach(elem => {
                if(elem.title == value){
                  this.newTV.display = Number(elem.id)
                }
              })
            }
            if(name == 'Бренд'){
              item.info.forEach(elem => {
                if(elem.title == value){
                  this.newTV.brand = Number(elem.id)
                }
              })
            }
          }
        })
      } else if (this.enName == 'camera') {
        this.selectedParameters.forEach(item => {
          if(item.name == name){
            if(name == 'Матрица'){
              item.info.forEach(elem => {
                if(elem.title == value){
                  this.newCamera.matrix = Number(elem.id)
                }
              })
            }
            if(name == 'Бренд'){
              item.info.forEach(elem => {
                if(elem.title == value){
                  this.newCamera.brand = Number(elem.id)
                }
              })
            }
          }
        })
      } else if (this.enName == 'accessories') {
        this.selectedParameters.forEach(item => {
          if(item.name == name){
            if(name == 'Тип'){
              item.info.forEach(elem => {
                if(elem.title == value){
                  this.newAccessoies.type = Number(elem.id)
                }
              })
            }
            if(name == 'Бренд'){
              item.info.forEach(elem => {
                if(elem.title == value){
                  this.newAccessoies.brand = Number(elem.id)
                }
              })
            }
          }
        })
      } else {
        console.log('Ошибка категории')
      }
    },

    createNewProduct(){
      if(this.enName == 'phone') {
        this.newPhone.title = this.title
        this.newPhone.price = Number(this.price)
        this.newPhone.color = this.color
        this.newPhone.dimensions = this.dimensions
        let date = new Date
        let year = String(date.getFullYear())
        let month = String(date.getMonth()+1)
        let day = String(date.getDate())
        this.newPhone.date = (year + '-' + month + '-' + day)
        this.newPhone.weight = Number(this.weight)
        this.newProdObj = this.newPhone
      } else if (this.enName == 'pc') {
        this.newPC.title = this.title
        this.newPC.price = Number(this.price)
        this.newPC.color = this.color
        this.newPC.dimensions = this.dimensions
        let date = new Date
        let year = String(date.getFullYear())
        let month = String(date.getMonth()+1)
        let day = String(date.getDate())
        this.newPC.date = (year + '-' + month + '-' + day)
        this.newProdObj = this.newPC
      } else if (this.enName == 'tv') {
        this.newTV.title = this.title
        this.newTV.price = Number(this.price)
        this.newTV.color = this.color
        this.newTV.dimensions = this.dimensions
        let date = new Date
        let year = String(date.getFullYear())
        let month = String(date.getMonth()+1)
        let day = String(date.getDate())
        this.newTV.date = (year + '-' + month + '-' + day)
        this.newProdObj = this.newTV
      } else if (this.enName == 'camera') {
        this.newCamera.title = this.title
        this.newCamera.price = Number(this.price)
        this.newCamera.color = this.color
        this.newCamera.dimensions = this.dimensions
        let date = new Date
        let year = String(date.getFullYear())
        let month = String(date.getMonth()+1)
        let day = String(date.getDate())
        this.newCamera.date = (year + '-' + month + '-' + day)
        this.newProdObj = this.newCamera
      } else if (this.enName == 'accessories') {
        this.newAccessoies.title = this.title
        this.newAccessoies.price = Number(this.price)
        this.newAccessoies.color = this.color
        this.newAccessoies.dimensions = this.dimensions
        let date = new Date
        let year = String(date.getFullYear())
        let month = String(date.getMonth()+1)
        let day = String(date.getDate())
        this.newAccessoies.date = (year + '-' + month + '-' + day)
        this.newProdObj = this.newAccessoies
      } else {
        console.log('Ошибка категории')
      }
      this.createProduct = false
      this.createProd()
    }
  },
  created() {
    this.getAllCards();
    this.getRole();
  },
  watch:{
    '$route.params.enName'() {
      this.getAllCards()
    }
  },
  computed: {
    enName() {
      return this.$route.params.enName;
    },
    ...mapGetters(["USER_ROLE"]),
  },
};
</script>

<style lang="scss" scoped>
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

.create_product{
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  color: #007aff;
}

.teh{
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  color: #000;
}
</style>
