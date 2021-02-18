/* eslint-disable no-undef */
<template>
  <form class="search-form" action="#" @keydown.enter="onSubmit">
    <input
      v-model="mcid"
      class="user-search"
      placeholder="Minecraft ID or UUID"
      title="英数字とアンダーバーのみ使用できます。"
      autocomplete="on"
      pattern="^[0-9A-Za-z_]+$"
      list="suggest-users"
      @input="onSearch"
    />
    <datalist id="suggest-users">
      <option v-for="user in suggestUsers" :key="user">{{ user }}</option>
    </datalist>
    <button
      class="search-btn"
      :class="{ disabled: disableSearchBtn }"
      @click="onSubmit"
    ></button>
  </form>
</template>

<script lang="ts">
import axios from 'axios'
import Vue from 'vue'
import { DataStore } from '~/store'

export type DataType = {
  suggestUsers: string[]
  mcid: string
  disableSearchBtn: boolean
}

export default Vue.extend({
  name: 'SearchForm',
  data(): DataType {
    return {
      suggestUsers: [],
      mcid: '',
      disableSearchBtn: true,
    }
  },
  created() {
    this.onSearch()
  },
  methods: {
    onSearch() {
      if (this.mcid !== '') this.disableSearchBtn = false
      this.$nextTick(() => {
        this.$recaptcha.execute('login').then((token: string) => {
          axios
            .get('https://api.jaoafa.com/v2/users/search/prefix', {
              params: {
                mcid: this.mcid,
                recaptcha: token,
              },
            })
            .then((response) => {
              if ('error' in response.data) {
                DataStore.showModal({
                  title: `[Error | ${this.$options.name}]`,
                  message: response.data.error,
                })
                return
              }
              this.suggestUsers = response.data
            })
            .catch((error) => {
              DataStore.showModal({
                title: `[Error | ${this.$options.name}]`,
                message: `エラーが発生しました。数分後にもう一度お試しいただき、解決しなければ運営にご連絡ください。<br>
                  ${error}`,
              })
            })
        })
      })
    },
    onSubmit(event: { keyCode: number }) {
      if (event.keyCode !== undefined && event.keyCode !== 13) return
      this.$router.push({ path: `/${this.mcid}` })
      return false
    },
  },
})
</script>

<style lang="scss" scoped>
.search-form {
  text-align: center;
  display: flex;
  justify-content: center;
  position: relative;
}

.user-search {
  border: solid 1px #b1b1b1;
  width: 75%;
  height: 50px;
  padding: 10px;
}

.search-btn {
  display: block;
  text-decoration: none;
  background: #ffb41d;
  width: 15%;
  height: 50px;
  cursor: pointer;

  &::before {
    font-family: 'Material Design Icons';
    content: '\f0016';
    color: #fff;
    font-size: 2em;
  }
  &.disabled {
    opacity: 0.5;
    pointer-events: none;
  }
}
</style>
