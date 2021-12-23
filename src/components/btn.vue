<template>
  <button class="btn" @click="modal()">{{text}}</button>
</template>

<script>
export default {
    props: {
        text:  {
          type: String,
          required: true
        }
    },
    methods: {
      modal() {
        this.$emit('showModal')
      }
    }
}
</script>

<style lang='scss' scope>
  .btn {
    width: 123px;
    height: 48px;
    background: #5964E0;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    font-size: 16px;
    line-height: 16px;
    text-align: center;
    color: #FFFFFF;
    cursor: pointer;
  }
</style>