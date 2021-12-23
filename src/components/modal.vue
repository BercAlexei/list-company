<template>
  <div class="modal" @click="closeModal">
    <div class="modal__window">
      <div class="modal__close" data-close>&times;</div>
      <h2 class="modal__title">Заполните форму</h2>
      <form class="form" @submit.prevent="postCompany">
        <div class="form__name">
          <label for="name">Название:</label>
          <input v-model="company.nameCompany" type="text" id="name" required>
        </div>
        <div class="form__location">
          <label for="form-location">Адрес:</label>
          <input v-model="company.location" type="text" id="form-location" required>
        </div>
        <div class="form__inn">
          <label for="inn">ИНН:</label>
          <a @click="getInput">Загрузить</a>
          <input v-model="company.inn" type="number" id="inn" required>
        </div>
        <div class="form__ogrn">
          <label for="ogrn">ОГРН:</label>
          <input v-model="company.ogrn" type="number" id="ogrn" required>
        </div><div class="form__date">
          <label for="date">Дата регстрации:</label>
          <input v-model="company.date" type="text" id="date" placeholder="дд.мм.гггг" required>
        </div>
          <Btn class="form__btn" text="Добавить"/>
      </form>
    </div>
  </div>
</template>

<script>
import Btn from './btn.vue'
export default {
  data() {
    return {
      company: {
        nameCompany: '',
        location: '',
        inn: null,
        ogrn: null,
        date: null
      }
    }
  },
  components: {
    Btn
  },
  methods: {
    closeModal(event) {
      if (event.target.getAttribute('data-close') == '' || event.target.querySelector('.modal__window')) {
        this.company.nameCompany = '',
        this.company.location = '',
        this.company.inn = null,
        this.company.ogrn = null,
        this.company.date = '',
        document.querySelector('.form__inn input').style.borderBottom = '1px solid #6E8098';
        this.$emit('closeModal')
      }
    },
    postCompany() {
      document.querySelector('.form__inn input').style.borderBottom = '1px solid #6E8098';
      this.$emit('postData', this.company)
      this.$emit('closeModal')
      this.company.nameCompany = '',
      this.company.location = '',
      this.company.inn = null,
      this.company.ogrn = null,
      this.company.date = ''
    },
    async getInput() {
      if (this.company.inn !== null) {
        let url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party";
        let token = "07c3e33c68a792d1d82de0c996c43f1580bcc36e";
        let query = "7707083893";

        let options = {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Token " + token
            },
            body: JSON.stringify({query: query})
        }
        let dataGet
         

        await fetch(url, options)
          .then(response => response.json())
          .then(result =>  dataGet  = result.suggestions[0])
          .catch(error => console.log("error", error));
        console.log(dataGet)

        this.company.nameCompany = dataGet.value
        this.company.location = dataGet.data.address.value
        this.company.ogrn = dataGet.data.ogrn
        let getDate = new Date(dataGet.data.state.registration_date).toLocaleString('ru-RU', { year: 'numeric', month: 'numeric', day: 'numeric' })
        this.company.date = getDate
      } else {
        document.querySelector('.form__inn input').style.borderBottom = '1px solid red';
      }
    }
  }
}
</script>

<style lang="scss">
  .modal {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba($color: #000000, $alpha: .5);
    &__window {
      position: absolute;
      display: flex;
      flex-direction: column;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 400px;
      min-height: 300px;
      background-color: #19202D;
      padding: 0 0 24px 0;
      border-radius: 6px;
      padding: 30px 15px;
    }
    &__close {
      position: absolute;
      top: 15px;
      right: 15px;
      font-size: 42px;
      line-height: 18px;
      cursor: pointer;
      color: #6E8098;
    }
    &__title {
      text-align: center;
      color: #fff;
    }
  }
  .form {
    margin-top: 25px;
    width: 100%;
    &__btn {
      position: relative;
      margin-top: 40px;
      left: 50%;
      transform: translateX(-50%);
    }
    a {
      margin-left: 15px;
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      line-height: 16px;
      color: #5964E0;
      outline: none;
      cursor: pointer;
      border-bottom: 1px solid #5964E0;
    }
    div {
      margin-top: 30px;
      &:first-child {
        margin-top: 0;
      }
    }
    label {
      display: inline-block;
      font-weight: normal;
      font-size: 20px;
      line-height: 20px;
      color: #6E8098;
    }
    input {
      width: 100%;
      background: inherit;
      border: none;
      border-bottom: 1px solid #6E8098;
      font-style: normal;
      font-weight: bold;
      font-size: 20px;
      line-height: 20px;
      color: #5964E0;
      outline: none;
      &[type="number"] {
            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
                -webkit-appearance: none;
            }
        }
        &[type='number'] {
            appearance: none;
            -moz-appearance: textfield;
        }
        &[type="number"] {
            &:hover,
            &:focus {
                appearance: none;
                -moz-appearance: textfield;
            }
        }
      
    }
  }
</style>