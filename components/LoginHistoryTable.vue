<template>
  <div class="user-login-container">
    <h2>ログイン履歴</h2>
    <div class="table">
      <table class="user-login-table">
        <thead>
          <tr>
            <th>日時</th>
            <th>Minecraft ID</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.date }}</td>
            <td>{{ item.mcid }}</td>
          </tr>
          <tr v-if="!loading && items.length === 0" class="not-exist">
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import { VueLoading } from 'vue-loading-template'
import { DataStore } from '~/store'

interface Login {
  id: number
  mcid: string
  date: string
}

interface DataType {
  items: Login[]
  loading: boolean
}

export default Vue.extend({
  name: 'LoginHistoryTable',
  components: {
    VueLoading,
  },
  data(): DataType {
    return {
      items: [],
      loading: true,
    }
  },
  computed: {
    changeUUID() {
      return DataStore.getUUID
    },
  },
  watch: {
    changeUUID() {
      this.$nextTick(() => {
        this.fetchData()
      })
    },
  },
  created() {
    this.$nextTick(() => {
      this.fetchData()
    })
  },
  methods: {
    fetchData() {
      // eslint-disable-next-line no-console
      console.log(
        `[${this.$options.name}] Detects UUID changes. Start fetch data`,
        DataStore.getUUID
      )
      if (DataStore.getUUID === null) {
        return
      }
      this.$recaptcha.execute('login').then((token: string) => {
        axios
          .get(`https://api.jaoafa.com/v2/users/recentLogin`, {
            params: {
              uuid: DataStore.getUUID,
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
            this.items = response.data
            this.loading = false
          })
          .catch((error) => {
            DataStore.showModal({
              title: `[Error | ${this.$options.name}]`,
              message: `エラーが発生しました。数分後にもう一度お試しいただき、解決しなければ運営にご連絡ください。<br>${error}`,
            })
          })
      })
    },
  },
})
</script>

<style lang="scss">
.user-login-container {
  table {
    width: 100%;
    overflow-x: auto;
    white-space: nowrap;
    border-collapse: collapse;
    text-align: center;

    thead {
      border-bottom: solid 2px #ddd;
    }

    th {
      background: #eee;
    }

    th,
    td {
      padding: 4px 16px;
      border: solid 1px #ddd;
    }
  }
}
</style>
