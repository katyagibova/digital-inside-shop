<template>
  <div style="margin-top: 15px">
      <div style="display: flex; justify-content: space-between;">
        <router-link :to="`/catalog/${enName}`" style="text-decoration: none">
        <div style="display: inline-flex">
          <v-icon size="36px" class="arrow_back" color="#007aff">mdi-arrow-left</v-icon>
          <p class="back" style="color: #007aff; margin: 0">Назад</p>
        </div>
        </router-link>
        <div v-if="userRole == 'Admin' || USER_ROLE == 'Admin'" style="margin-top: auto; margin-bottom: auto">
          <v-btn
          @click="openProdToUpdate(enName)"
          outlined
          rounded
          color="#007aff">Редактировать</v-btn>
        </div>
      </div>
      <v-row>
        <v-col class="characteristics" style="margin-left: 8px">
          <p class="device_name">{{title}} <span class="date">{{date}}</span> </p>
          <p class="specifications"> <u> Харкатеристики </u> </p>
          <div v-if="enName == 'phone'">
            <p> <b>Бренд:</b> {{phoneCharacteristics.brand}}</p>
            <p> <b>Цвет:</b> {{phoneCharacteristics.color}}</p>
            <p> <b>Размер:</b> {{phoneCharacteristics.dimensions}} мм</p>
            <p> <b>Операционная система:</b> {{phoneCharacteristics.os}}</p>
            <p> <b>Процессор:</b> {{phoneCharacteristics.processor}}</p>
            <p> <b>Вес:</b> {{phoneCharacteristics.weight}} грамм</p>
            <p style="margin: 0"> <b>Дисплэй:</b> {{phoneCharacteristics.display.title}}</p>
            <ul style="margin-bottom: 16px">
              <li> <b>Размер:</b> {{phoneCharacteristics.display.size}} мм</li>
              <li> <b>Разрешение:</b> {{phoneCharacteristics.display.resolution}}</li>
            </ul>
            <p style="margin: 0"> <b>Оперативная память:</b> {{phoneCharacteristics.ram.title}}</p>
            <ul style="margin-bottom: 16px">
              <li> <b>Объем:</b> {{phoneCharacteristics.ram.volume}} Мб</li>
            </ul>
            <p style="margin: 0"> <b>Постаянная память:</b> {{phoneCharacteristics.rom.title}}</p>
            <ul style="margin-bottom: 16px">
              <li> <b>Объем:</b> {{phoneCharacteristics.rom.volume}} Мб</li>
            </ul>
            <p style="margin: 0"> <b>Графический процессор:</b> {{phoneCharacteristics.gpu.title}}</p>
            <ul style="margin-bottom: 16px">
              <li> <b>Объем:</b> {{phoneCharacteristics.gpu.volume}} Гб</li>
            </ul>
          </div>
          <div v-if="enName == 'pc'">
            <p> <b>Бренд:</b> {{pcCharacteristics.brand}}</p>
            <p> <b>Цвет:</b> {{pcCharacteristics.color}}</p>
            <p> <b>Размер:</b> {{pcCharacteristics.dimensions}} мм</p>
            <p> <b>Операционная система</b>: {{pcCharacteristics.os}}</p>
            <p> <b>Процессор:</b> {{pcCharacteristics.processor}}</p>
            <p> <b>Тип:</b> {{pcCharacteristics.type}}</p>
            <p style="margin: 0"> <b>Дисплэй:</b> {{pcCharacteristics.display.title}}</p>
            <ul style="margin-bottom: 16px">
              <li> <b>Размер:</b> {{pcCharacteristics.display.size}} мм</li>
              <li> <b>Разрешение:</b> {{pcCharacteristics.display.resolution}}</li>
            </ul>
            <p style="margin: 0"> <b>Оперативная память:</b> {{pcCharacteristics.ram.title}}</p>
            <ul style="margin-bottom: 16px">
              <li> <b>Объем:</b> {{pcCharacteristics.ram.volume}} Мб</li>
            </ul>
            <p style="margin: 0"> <b>Постаянная память:</b> {{pcCharacteristics.rom.title}}</p>
            <ul style="margin-bottom: 16px">
              <li> <b>Объем:</b> {{pcCharacteristics.rom.volume}} Мб</li>
            </ul>
            <p style="margin: 0"> <b>Графический процессор:</b> {{pcCharacteristics.gpu.title}}</p>
            <ul style="margin-bottom: 16px">
              <li> <b>Объем:</b> {{pcCharacteristics.gpu.volume}} Гб</li>
            </ul>
          </div>
          <div v-if="enName == 'tv'">
            <p> <b>Бренд:</b> {{tvCharacteristics.brand}}</p>
            <p> <b>Цвет:</b> {{tvCharacteristics.color}}</p>
            <p> <b>Размер:</b> {{tvCharacteristics.dimensions}} мм</p>
            <p> <b>Тип подключения:</b> {{tvCharacteristics.connection_type}}</p>
            <p style="margin: 0"> <b>Дисплэй:</b> {{tvCharacteristics.display.title}}</p>
            <ul style="margin-bottom: 16px">
              <li> <b>Размер:</b> {{tvCharacteristics.display.size}} мм</li>
              <li> <b>Разрешение:</b> {{tvCharacteristics.display.resolution}}</li>
            </ul>
          </div>
          <div v-if="enName == 'camera'">
            <p> <b>Бренд:</b> {{cameraCharacteristics.brand}}</p>
            <p> <b>Цвет:</b> {{cameraCharacteristics.color}}</p>
            <p> <b>Размер:</b> {{cameraCharacteristics.dimensions}} мм</p>
            <p> <b>Матрица:</b> {{cameraCharacteristics.matrix}}</p>
          </div>
          <div v-if="enName == 'accessories'">
            <p> <b>Бренд:</b> {{accessoriesCharacteristics.brand}}</p>
            <p> <b>Цвет:</b> {{accessoriesCharacteristics.color}}</p>
            <p> <b>Размер:</b> {{accessoriesCharacteristics.dimensions}} мм</p>
            <p> <b>Тип:</b> {{accessoriesCharacteristics.type}}</p>
          </div>
          
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="4">
          <p class="specifications">{{price}} Руб</p>
          <p class="quantity">Количество</p>
          <div class="quantity_field">
            <span class="plus_minus" @click="decrement">-</span>
            <input v-model="num" class="input_field" type="text">
              <!-- <v-text-field
              v-model="num"
              solo
              flat
              height="10px"
              full-width="20px"
              ></v-text-field> -->
            <span class="plus_minus" @click="increment">+</span>
          </div>
          <div style="margin-top: 15px">
            <v-btn
            @click="buyProduct()"
            color="#007AFF"
            style="color: #fff; font-family: Roboto; font-style: normal; font-weight: normal; font-size: 28px;"
            rounded
            elevation="0"
            width="230px"
            height="45px">
              Купить
            </v-btn>
          </div>
        </v-col>
      </v-row>
    <v-dialog
      v-model="updateProduct"
      persistent
      max-width="850"
    >
      <v-card>
        <v-card-title class="text-h5">
          Редактирование товара "{{title}}"
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
          <v-btn
            color="#007aff"
            text
            @click="updateProductClose"
          >
            Отмена
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="red"
            text
            @click="removeProduct()"
          >
            Удалить
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="saveChanges()"
          >
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="purchaseCompleted"
      max-width="500"
    >
      <v-card>
        <v-card-title class="text-h5">
          Вы купили {{title}}
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="closePurchase()"
          >
            ГОТОВО
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Axios from "axios";
import {GET_PRODUCT, GET_DISPLAY, DELETE_PRODUCT, UPDATE_PRODUCT, BUY_PRODUCT, GET_PC_OS, GET_PC_PROCESSOR, GET_PC_TYPE, GET_PC_BRAND, GET_PC_RAM, GET_PC_ROM, GET_PC_GPU, GET_PHONE_GPU, GET_PHONE_RAM, GET_PHONE_ROM, GET_PHONE_OS, GET_PHONE_PROCESSOR, GET_PHONE_BRAND, GET_ACCESSORIES_BRAND, GET_ACCESSORIES_TYPE, GET_CAMERA_BRAND, GET_CAMERA_MATRIX, GET_TV_BRAND, GET_TV_CONNECTION} from "@/api";
import { mapGetters } from "vuex";

export default {
  name: "Card",
  components: {},
  data() {
    return {
      userRole: '',
      updateProduct: false,
      purchaseCompleted: false,
      num: 0,
      title: '',
      date: '',
      dimensions: '',
      weight: 0,
      color: '',
      price: 0,
      selectedParameters: [],
      newProdObj: {},
      phoneCharacteristics:{
        brand: '',
        color: '',
        dimensions: '',
        display: {
          title: '',
          resolution: '',
          size: ''
        },
        gpu:{
          title: '',
          volume: 0
        },
        ram:{
          title: '',
          volume: 0
        },
        rom:{
          title: '',
          volume: 0
        },
        os: '',
        processor: '',
        weight: 0
      },
      pcCharacteristics:{
        brand: '',
        color: '',
        dimensions: '',
        display: {
          title: '',
          resolution: '',
          size: ''
        },
        gpu:{
          title: '',
          volume: 0
        },
        ram:{
          title: '',
          volume: 0
        },
        rom:{
          title: '',
          volume: 0
        },
        os: '',
        processor: '',
        type: ''
      },
      tvCharacteristics:{
        brand: '',
        color: '',
        dimensions: '',
        display: {
          title: '',
          resolution: '',
          size: ''
        },
        connection_type: '',
      },
      cameraCharacteristics:{
        brand: '',
        color: '',
        dimensions: '',
        matrix: '',
      },
      accessoriesCharacteristics:{
        brand: '',
        color: '',
        dimensions: '',
        type: '',
      },
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
    };
  },
  methods: {
    getRole(){
      this.userRole = localStorage.getItem('user_role')
    },

    async getProductCard() {
      const number = this.ID
      let model = this.enName
      const token = localStorage.getItem('access_token')
      await Axios.get(`${GET_PRODUCT}${model}/${number}/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        console.log(res)
        this.title = res.data.title
        this.date = res.data.date
        this.price = res.data.price
        if(this.enName == 'phone'){
          this.phoneCharacteristics.brand = res.data.brand.title
          this.phoneCharacteristics.color = res.data.color
          this.phoneCharacteristics.dimensions = res.data.dimensions
          this.phoneCharacteristics.display.title = res.data.display.title
          this.phoneCharacteristics.display.resolution = res.data.display.resolution
          this.phoneCharacteristics.display.size = res.data.display.size
          this.phoneCharacteristics.gpu.title = res.data.gpu.title
          this.phoneCharacteristics.gpu.volume = res.data.gpu.volume
          this.phoneCharacteristics.ram.title = res.data.ram.title
          this.phoneCharacteristics.ram.volume = res.data.ram.volume
          this.phoneCharacteristics.rom.title = res.data.rom.title
          this.phoneCharacteristics.rom.volume = res.data.rom.volume
          this.phoneCharacteristics.os = res.data.os.title
          this.phoneCharacteristics.processor = res.data.processor.title
          this.phoneCharacteristics.weight = res.data.weight
        } else if (this.enName == "pc"){
          this.pcCharacteristics.brand = res.data.brand.title
          this.pcCharacteristics.color = res.data.color
          this.pcCharacteristics.dimensions = res.data.dimensions
          this.pcCharacteristics.display.title = res.data.display.title
          this.pcCharacteristics.display.resolution = res.data.display.resolution
          this.pcCharacteristics.display.size = res.data.display.size
          this.pcCharacteristics.gpu.title = res.data.gpu.title
          this.pcCharacteristics.gpu.volume = res.data.gpu.volume
          this.pcCharacteristics.ram.title = res.data.ram.title
          this.pcCharacteristics.ram.volume = res.data.ram.volume
          this.pcCharacteristics.rom.title = res.data.rom.title
          this.pcCharacteristics.rom.volume = res.data.rom.volume
          this.pcCharacteristics.os = res.data.os.title
          this.pcCharacteristics.processor = res.data.processor.title
          this.pcCharacteristics.type = res.data.type.title
        } else if (this.enName == "tv"){
          this.tvCharacteristics.brand = res.data.brand.title
          this.tvCharacteristics.color = res.data.color
          this.tvCharacteristics.dimensions = res.data.dimensions
          this.tvCharacteristics.display.title = res.data.display.title
          this.tvCharacteristics.display.resolution = res.data.display.resolution
          this.tvCharacteristics.display.size = res.data.display.size
          this.tvCharacteristics.connection_type = res.data.connection_type.title
        } else if (this.enName == "camera"){
          this.cameraCharacteristics.brand = res.data.brand.title
          this.cameraCharacteristics.color = res.data.color
          this.cameraCharacteristics.dimensions = res.data.dimensions
          this.cameraCharacteristics.matrix = res.data.matrix.title
        } else if (this.enName == "accessories"){
          this.accessoriesCharacteristics.brand = res.data.brand.title
          this.accessoriesCharacteristics.color = res.data.color
          this.accessoriesCharacteristics.dimensions = res.data.dimensions
          this.accessoriesCharacteristics.type = res.data.type.title
        } else {
          console.log('Ошибка категории')
        }
      })
      .catch((error) => {
        console.error(error);
      });
    },

    async removeProduct() {
      const number = this.ID
      let model = this.enName
      const token = localStorage.getItem("access_token");
      await Axios.delete(`${DELETE_PRODUCT}${model}/${number}/delete/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }, []).then((res) => {
        if(res.data){
          this.$router.push({ path: `/catalog/${this.enName}/` });
          console.log('Успех')
        }
      }).catch((error) => {
        if(error.response.status == 401){
          this.CHANGE_UNAUTHTORISE()
          this.$router.push({name: 'authorizationForm'})
        }
        console.error(error);
      });
    },

    async updProduct() {
      const number = this.ID
      let model = this.enName
      const token = localStorage.getItem('access_token')
      await Axios.put(`${UPDATE_PRODUCT}${model}/${number}/update/`, this.newProdObj ,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then( (res) => {
        if(res.data){
          this.getProductCard()
          this.updateProduct = false
        }
      }).catch((error) => {
        if(error.response.status == 401){
          this.CHANGE_UNAUTHTORISE()
          this.$router.push({name: 'authorizationForm'})
        }
        if(error.response.status == 500){
          console.log("500")
        }
        console.error(error);
      })
    },

    async buyProduct() {
      const token = localStorage.getItem('access_token')
      const number = this.ID
      let model = this.enName
      await Axios.post(`${BUY_PRODUCT}${model}/${number}/buy/`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then( (res) => {
        if(res.status == 200){
          this.purchaseCompleted = true
        }
        console.log(res)
      }).catch((error) => {
        console.error(error);
      })
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
        this.allAccessoriesBrands.model = this.accessoriesCharacteristics.brand
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
        this.allAccessoriesTypes.model = this.accessoriesCharacteristics.type
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
        this.allCameraBrands.model = this.cameraCharacteristics.brand     
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
        this.allCameraMatrix.model = this.cameraCharacteristics.matrix
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
        this.allTVBrands.model = this.tvCharacteristics.brand
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
        this.allTVConnections.model = this.tvCharacteristics.connection_type
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
        this.allPhoneGPU.model = this.phoneCharacteristics.gpu.title
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
        this.allPhoneRAM.model = this.phoneCharacteristics.ram.title
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
        this.allPhoneROM.model = this.phoneCharacteristics.rom.title   
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
        this.allPhoneOS.model = this.phoneCharacteristics.os
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
        this.allPhoneProcessors.model = this.phoneCharacteristics.processor
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
        this.allPhoneBrands.model = this.phoneCharacteristics.brand
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
        this.allPCBrands.model = this.pcCharacteristics.brand
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
        this.allPCGPU.model = this.pcCharacteristics.gpu.title
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
        this.allPCRAM.model = this.pcCharacteristics.ram.title
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
        this.allPCROM.model = this.pcCharacteristics.rom.title     
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
        this.allPCOS.model = this.pcCharacteristics.os  
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
        this.allPCProcessors.model = this.pcCharacteristics.processor
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
        this.allPCTypes.model = this.pcCharacteristics.type
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
        if(this.enName == 'phone'){
          this.allDisplaies.model = this.phoneCharacteristics.display.title
        } else if(this.enName == 'pc'){
          this.allDisplaies.model = this.pcCharacteristics.display.title
        } else if(this.enName == 'tv'){
          this.allDisplaies.model = this.tvCharacteristics.display.title
        } else {
          console.log('Ошибка категории')
        }
      })
      .catch((error) => {
        console.error(error);
      });
    },

    decrement(){
      this.num--
    },

    increment(){
      this.num++
    },

    openProdToUpdate(categories){
      this.updateProduct = true
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
        this.dimensions = this.phoneCharacteristics.dimensions
        this.color = this.phoneCharacteristics.color
        this.weight = this.phoneCharacteristics.weight
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
        this.dimensions = this.pcCharacteristics.dimensions
        this.color = this.pcCharacteristics.color
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
        this.dimensions = this.tvCharacteristics.dimensions
        this.color = this.tvCharacteristics.color
        console.log(this.selectedParameters)
      } else if (categories == 'camera') {
        this.selectedCategory = "Камеры"
        this.selectedParameters = []
        this.getCameraMatrix()
        this.getCameraBrand()
        this.selectedParameters.push(this.allCameraMatrix)
        this.selectedParameters.push(this.allCameraBrands)
        this.dimensions = this.cameraCharacteristics.dimensions
        this.color = this.cameraCharacteristics.color
        console.log(this.selectedParameters)
      } else if (categories == 'accessories') {
        this.selectedCategory = "Аксессуары"
        this.selectedParameters = []
        this.getAccessoriesType()
        this.getAccessoriesBrand()
        this.selectedParameters.push(this.allAccessoriesTypes)
        this.selectedParameters.push(this.allAccessoriesBrands)
        this.dimensions = this.accessoriesCharacteristics.dimensions
        this.color = this.accessoriesCharacteristics.color
        console.log(this.selectedParameters)
      } else {
        console.log('Ошибка категории')
        this.selectedParameters = []
      }
    },

    saveChanges(){
      if(this.enName == 'phone'){
        this.selectedParameters.forEach(item => {
          if(item.name == 'Операционная система'){
            item.info.forEach(elem => {
              if(elem.title == item.model){
                this.newPhone.os = Number(elem.id)
              }
            })
          }
          if(item.name == 'Дисплэй'){
            item.info.forEach(elem => {
              if(elem.title == item.model){
                this.newPhone.display = Number(elem.id)
              }
            })
          }
          if(item.name == 'Бренд'){
            item.info.forEach(elem => {
              if(elem.title == item.model){
                this.newPhone.brand = Number(elem.id)
              }
            })
          }
          if(item.name == 'Процессор'){
            item.info.forEach(elem => {
              if(elem.title == item.model){
                this.newPhone.processor = Number(elem.id)
              }
            })
          }
          if(item.name == 'ROM'){
            item.info.forEach(elem => {
              if(elem.title == item.model){
                this.newPhone.rom = Number(elem.id)
              }
            })
          }
          if(item.name == 'RAM'){
            item.info.forEach(elem => {
              if(elem.title == item.model){
                this.newPhone.ram = Number(elem.id)
              }
            })
          }
          if(item.name == 'Графический процессор'){
            item.info.forEach(elem => {
              if(elem.title == item.model){
                this.newPhone.gpu = Number(elem.id)
              }
            })
          }
        })
        this.newPhone.weight = Number(this.weight)
        this.newPhone.color = this.color
        this.newPhone.dimensions = this.dimensions
        this.newPhone.title = this.title
        this.newPhone.price = Number(this.price)
        let date = new Date
        let year = String(date.getFullYear())
        let month = String(date.getMonth()+1)
        let day = String(date.getDate())
        this.newPhone.date = (year + '-' + month + '-' + day)
        this.newProdObj = this.newPhone
      } else if (this.enName == 'pc'){
        this.selectedParameters.forEach(item => {
          if(item.name == 'Операционная система'){
            item.info.forEach(elem => {
              if(elem.title == item.model){
                this.newPC.os = Number(elem.id)
              }
            })
          }
          if(item.name == 'Дисплэй'){
            item.info.forEach(elem => {
              if(elem.title == item.model){
                this.newPC.display = Number(elem.id)
              }
            })
          }
          if(item.name == 'Бренд'){
            item.info.forEach(elem => {
              if(elem.title == item.model){
                this.newPC.brand = Number(elem.id)
              }
            })
          }
          if(item.name == 'Процессор'){
            item.info.forEach(elem => {
              if(elem.title == item.model){
                this.newPC.processor = Number(elem.id)
              }
            })
          }
          if(item.name == 'ROM'){
            item.info.forEach(elem => {
              if(elem.title == item.model){
                this.newPC.rom = Number(elem.id)
              }
            })
          }
          if(item.name == 'RAM'){
            item.info.forEach(elem => {
              if(elem.title == item.model){
                this.newPC.ram = Number(elem.id)
              }
            })
          }
          if(item.name == 'Графический процессор'){
            item.info.forEach(elem => {
              if(elem.title == item.model){
                this.newPC.gpu = Number(elem.id)
              }
            })
          }
          if(item.name == 'Тип'){
            item.info.forEach(elem => {
              if(elem.title == item.model){
                this.newPC.type = Number(elem.id)
              }
            })
          }
        })
        this.newPC.color = this.color
        this.newPC.dimensions = this.dimensions
        this.newPC.title = this.title
        this.newPC.price = Number(this.price)
        let date = new Date
        let year = String(date.getFullYear())
        let month = String(date.getMonth()+1)
        let day = String(date.getDate())
        this.newPC.date = (year + '-' + month + '-' + day)
        this.newProdObj = this.newPC
      } else if (this.enName == 'tv') {
        this.selectedParameters.forEach(item => {
          if(item.name == 'Тип соединения'){
            item.info.forEach(elem => {
              if(elem.title == item.model){
                this.newTV.connection_type = Number(elem.id)
              }
            })
          }
          if(item.name == 'Дисплэй'){
            item.info.forEach(elem => {
              if(elem.title == item.model){
                this.newTV.display = Number(elem.id)
              }
            })
          }
          if(item.name == 'Бренд'){
            item.info.forEach(elem => {
              if(elem.title == item.model){
                this.newTV.brand = Number(elem.id)
              }
            })
          }
        })
        this.newTV.color = this.color
        this.newTV.dimensions = this.dimensions
        this.newTV.title = this.title
        this.newTV.price = Number(this.price)
        let date = new Date
        let year = String(date.getFullYear())
        let month = String(date.getMonth()+1)
        let day = String(date.getDate())
        this.newTV.date = (year + '-' + month + '-' + day)
        this.newProdObj = this.newTV
      } else if (this.enName == 'camera') {
        this.selectedParameters.forEach(item => {
          if(item.name == 'Матрица'){
            item.info.forEach(elem => {
              if(elem.title == item.model){
                this.newCamera.matrix = Number(elem.id)
              }
            })
          }
          if(item.name == 'Бренд'){
            item.info.forEach(elem => {
              if(elem.title == item.model){
                this.newCamera.brand = Number(elem.id)
              }
            })
          }
        })
        this.newCamera.color = this.color
        this.newCamera.dimensions = this.dimensions
        this.newCamera.title = this.title
        this.newCamera.price = Number(this.price)
        let date = new Date
        let year = String(date.getFullYear())
        let month = String(date.getMonth()+1)
        let day = String(date.getDate())
        this.newCamera.date = (year + '-' + month + '-' + day)
        this.newProdObj = this.newCamera
      } else if (this.enName == 'accessories') {
        this.selectedParameters.forEach(item => {
          if(item.name == 'Тип'){
            item.info.forEach(elem => {
              if(elem.title == item.model){
                this.newAccessoies.type = Number(elem.id)
              }
            })
          }
          if(item.name == 'Бренд'){
            item.info.forEach(elem => {
              if(elem.title == item.model){
                this.newAccessoies.brand = Number(elem.id)
              }
            })
          }
        })
        this.newAccessoies.color = this.color
        this.newAccessoies.dimensions = this.dimensions
        this.newAccessoies.title = this.title
        this.newAccessoies.price = Number(this.price)
        let date = new Date
        let year = String(date.getFullYear())
        let month = String(date.getMonth()+1)
        let day = String(date.getDate())
        this.newAccessoies.date = (year + '-' + month + '-' + day)
        this.newProdObj = this.newAccessoies
      } else {
        console.log('Ошибка категории')
      }
      this.updProduct()
    },

    closePurchase(){
      this.$router.push({ path: `/catalog/${this.enName}/` });
    },

    updateProductClose(){
      this.updateProduct = false
      this.getProductCard()
    }
    
  },
  created() {
    this.getProductCard()
    this.getRole()
  },
  computed: {
    enName() {
      return this.$route.params.enName;
    },
    ID() {
      return this.$route.params.ID;
    },
    ...mapGetters(["USER_ROLE"]),
  },
};
</script>

<style>
.back{
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 36px;
  color: #007AFF;
  margin: 0;
}

.arrow_back{
  margin-right: 5px;
}

.device_name{
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  color: #000;
}

.quantity{
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  color: #7E7E7E;
}

.quantity_field{
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 41px;  
  width: 160px;
  display: inline-flex;
  justify-content: center;
}

.plus_minus{
  color: #007AFF;
  font-size: 36px;
  cursor: pointer;
}

.input_field{
  width: 80px;
  height: 58px;
  outline: none;
  text-align: center;
}

.v-text-field.v-text-field--enclosed .v-text-field__details{
  display: none;
}

.specifications{
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 30px;
}

.teh{
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  color: #000;
}

.characteristics{
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  color: #000;
}

.date{
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  color: #000;
  margin-left: 15px;
}
</style>
