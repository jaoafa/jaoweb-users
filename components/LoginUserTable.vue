<template>
  <div class="table">
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
              :src="
                'https://crafatar.com/avatars/' + item.uuid + '?overlay=true'
              "
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
        <tr v-if="!loading && recentLogins.length === 0" class="not-exist">
          <td colspan="2">Data does not exist.</td>
        </tr>
        <tr v-if="loading">
          <td colspan="2">
            <vue-loading type="spiningDubbles" color="#000" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import Vue from 'vue'
import { VueLoading } from 'vue-loading-template'
import { DataStore } from '~/store'

interface LoginUser {
  id: number
  mcid: string
  uuid: string
  date: string
}

interface DataType {
  recentLogins: LoginUser[]
  loading: boolean
}

export default Vue.extend({
  name: 'LoginUserTable',
  components: {
    VueLoading,
  },
  data(): DataType {
    return {
      recentLogins: [],
      loading: true,
    }
  },
  created() {
    this.$recaptcha.execute('login').then((token: string) => {
      axios
        .get('https://api.jaoafa.com/v2/users/recentLogin', {
          params: {
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
          this.recentLogins = response.data
          this.loading = false
        })
        .catch((error) => {
          DataStore.showModal({
            title: `[Error | ${this.$options.name}]`,
            message: `エラーが発生しました。数分後にもう一度お試しいただき、解決しなければ運営にご連絡ください。<br>
            ${error}`,
          })
        })
    })
  },
})
</script>

<style lang="scss" scoped>
@mixin smartphone {
  @media (max-width: 480px) {
    @content;
  }
}

.table {
  display: block;
  overflow-x: auto;
}

table {
  width: 100%;
  min-width: 100%;
  white-space: nowrap;
  border-collapse: collapse;
  text-align: center;

  @include smartphone {
    display: block;
  }

  thead,
  tbody {
    width: 100%;
  }

  tbody tr {
    border-top: solid 1px #eee;
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
  display: inline-block;
  text-decoration: none;
  background: #ffb41d;
  height: 2.5em;
  line-height: 2.5em;
  width: 100px;
  cursor: pointer;

  &:hover {
    transition: 0.5s;
    opacity: 0.5;
  }

  &::before {
    font-family: 'Material Design Icons';
    content: '\f0004';
    color: #fff;
    font-size: 1.5em;
  }
}
</style>
