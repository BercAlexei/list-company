<template>
  <div class="card" :id="id">
      <div class="card__close" @click="del">&times;</div>
      <div class="card__name">{{ name }}</div>
      <div class="card__loc">
        <label>Адрес:</label>
        <input type="text" :value="location" @change="changeLocation">
      </div>
      <div class="card__inn">
        ИНН: <span>{{ inn }}</span>
      </div>
      <div class="card__ogrn">
        ОГРН: <span>{{ ogrn }}</span>
      </div>
      <div class="card__date">{{ date }}</div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    inn: {
      type: Number,
      required: true
    },
    ogrn: {
      type: Number,
      required: true
    },
    date: {
      type: String,
      required: true
    }

  },
  methods: {
    changeLocation(event) {
      this.$emit('changeAddress', [event.target.value, this.id - 1])
    },
    del() {
      this.$emit('delCard', this.id)
    }
  }
}
</script>

<style lang='scss' scope>
.card {
  position: relative;
  padding: 28px 14px 28px 17px;
  width: 350px;
  min-height: 195px;
  background: #19202D;
  border-radius: 6px;
  font-weight: normal;
  font-size: 16px;
  line-height: 16px;
  color: #6E8098;
  span {
    font-weight: bold;
    font-size: 16px;
    line-height: 16px;
    color: #5964E0;
    margin-left: 10px;
  }
  div {
    margin-top: 13px;
    &:first-child {
      margin-top: 0;
    }
    &:nth-child(2) {
      margin-top: 0;
    }
  }
  &__close {
    position: absolute;
    margin-top: 0;
    top: 15px;
    right: 25px;
    font-size: 48px;
    line-height: 16px;
    cursor: pointer;
    color: #6E8098;
  }
  &__name {
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 20px;
    color: #FFFFFF;
  }
  &__loc {
    display: flex;
    align-items: center;
    input {
      margin-left: 10px;
      background: inherit;
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      line-height: 16px;
      color: #5964E0;
      border: none;
      border-bottom: 1px solid #6E8098;
      outline: none;
    }
  }
  &__date {
    font-weight: normal;
    font-size: 16px;
    line-height: 16px;
    color: #FFFFFF;
  }
}
</style>