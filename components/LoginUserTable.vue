<template>
  <table class="users-table">
    <thead>
      <tr>
        <th>Minecraft ID</th>
        <th>Date</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in recentLogins" :key="item.id">
        <td>
          <img
            :src="'https://crafatar.com/avatars/' + item.uuid + '?overlay=true'"
          />{{ item.mcid }}
        </td>
        <td>{{ item.date }}</td>
        <td>
          <router-link
            class="user-btn"
            :to="{ path: `/${item.uuid}` }"
          ></router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import axios from 'axios'
import Vue from 'vue'
import { DataStore } from '~/store'

interface LoginUser {
  id: number
  mcid: string
  uuid: string
  date: string
}

export default Vue.extend({
  name: 'LoginUserTable',
  data(): {
    recentLogins: LoginUser[]
  } {
    return {
      recentLogins: [],
    }
  },
  created() {
    this.$recaptcha.execute('login').then((token: string) => {
      axios
        .get('https://api.jaoafa.com/v2/server/recentLogin', {
          params: {
            recaptcha: token,
          },
        })
        .then((response) => {
          if ('error' in response.data) {
            DataStore.showModal('[Error | LoginUserTable]', response.data.error)
            return
          }
          this.recentLogins = response.data
        })
        .catch((error) => {
          DataStore.showModal(
            '[Error | LoginUserTable]',
            `エラーが発生しました。数分後にもう一度お試しいただき、解決しなければ運営にご連絡ください。<br>
            ${error}`
          )
        })
    })
  },
})
</script>

<style lang="scss" scoped>
table {
  width: 100%;

  tbody tr {
    border-bottom: solid 1px #eee;
  }

  tbody tr:hover {
    background-color: #ffeecb;
  }

  th,
  td {
    text-align: left;
    padding: 0 10px;
  }

  td:last-child {
    text-align: center;
  }

  td img {
    width: 36px;
    margin: 10px 10px 0 0;
  }
}

.user-btn {
  display: block;
  text-decoration: none;
  background: #ffb41d;
  height: 2.5em;
  line-height: 2.5em;
  width: 100px;
  cursor: pointer;
}

.user-btn::before {
  font-family: 'Material Design Icons';
  content: '\f0004';
  color: #fff;
  font-size: 1.5em;
}
</style>
