<template>
  <div id="app">
    <Header/>
    <div class="container">
      <Btn class="btnAdd" text="Добавить" @showModal="modal = !modal"/>
      <div class="cards">
          <Card 
            v-for="company in companies"
            :key="company.id"
            :id="company.id"
            :name="company.name"
            :location="company.location"
            :inn="company.inn"
            :ogrn="company.ogrn"
            :date="company.date"
            @changeAddress="changeLocation($event)"
            @delCard="delCompany($event)"
          />
      </div>
    </div> 
    <Modal v-show="modal" @closeModal="modal = !modal" @postData="pushData"/>
  </div>
</template>

<script>
import Header from './components/header.vue'
import Btn from './components/btn.vue'
import Modal from './components/modal.vue'
import Card from './components/card.vue'

class newCompany{
  constructor(id, name, location, inn, ogrn, date) {
    this.id = id
    this.name = name,
    this.location = location,
    this.inn = inn,
    this.ogrn = ogrn,
    this.date = date
  }
}

export default {
  data() {
    return {
      modal: false,
      companies: [
        {
          "id": 1,
          "name": "Сбербанк",
          "location": "г. Москва",
          "inn": 456789123,
          "ogrn": 7856489468,
          "date": "10.10.2010"
        },
        {
          "id": 2,
          "name": "Скб-банк",
          "location": "г. Москва",
          "inn": 456789123,
          "ogrn": 7856489468,
          "date": "10.10.2010"
        },
        {
          "id": 3,
          "name": "Газпром",
          "location": "г. Москва",
          "inn": 456789123,
          "ogrn": 7856489468,
          "date": "10.10.2010"
        },
        {
          "id": 4,
          "name": "Тинькоф",
          "location": "г. Москва",
          "inn": 456789123,
          "ogrn": 7856489468,
          "date": "10.10.2010"
        }
      ]
    }
  },
  components: {
    Header,
    Btn,
    Modal,
    Card
  },
  methods: {
    changeLocation([value, id]) {
      this.companies[id].location = value
    },
    delCompany(id) {
      this.companies = this.companies.filter(companiy => companiy.id !== id)
    },
    pushData({date, nameCompany, location, inn, ogrn}) {
      let options = { year: 'numeric', month: 'numeric', day: 'numeric' };
      let dateStr = new Date(date).toLocaleString('ru-RU', options)
      this.companies.push(new newCompany(this.companies.length + 1, nameCompany, location, parseInt(inn), parseInt(ogrn), dateStr))
    }
  },
  created() {
    document.addEventListener('keydown', event => {
      if(event.key == 'Escape' && this.modal == true) {
        this.modal = !this.modal
      }
    })
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Kumbh+Sans:wght@400;700&display=swap');

#app {
  font-family: 'Kumbh Sans', sans-serif;
  background-color: #121721;
  min-height: 100vh;
}

.container {
  position: relative;
  margin: 0 auto;
  max-width: 1110px;
}

.btnAdd {
  margin-top: 30px;
}

.cards {
    padding-top: 50px;
    padding-bottom: 104px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 30px;
    grid-row-gap: 30px;

}

</style>
