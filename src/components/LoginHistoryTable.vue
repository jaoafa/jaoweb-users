<template>
  <div class="user-login-container">
    <h2>ログイン履歴</h2>

    <div class="heatmap">
      <vue-loading v-if="loadingHeatmap" type="spiningDubbles" color="#000" />
      <calendar-heatmap
        v-if="!loadingHeatmap"
        :values="heatmaps"
        :end-date="today"
        :max="10"
        :tooltip-unit="'login'"
      />
    </div>

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
import { CalendarHeatmap } from 'vue-calendar-heatmap/dist/vue-calendar-heatmap.common'
import { DataStore } from '@/store'
import 'vue-calendar-heatmap/dist/vue-calendar-heatmap.css'

interface Login {
  id: number
  mcid: string
  date: string
}

interface HeatMapItem {
  date: string
  count: number
}

interface DataType {
  items: Login[]
  heatmaps: HeatMapItem[]
  loading: boolean
  loadingHeatmap: boolean
  today: string
}

export default Vue.extend({
  name: 'LoginHistoryTable',
  components: {
    VueLoading,
    CalendarHeatmap,
  },
  data(): DataType {
    return {
      items: [],
      heatmaps: [],
      loading: true,
      loadingHeatmap: true,
      today: new Date().toISOString().split('T')[0],
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
      this.loading = true
      this.loadingHeatmap = true
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
      this.$recaptcha.execute('login').then((token: string) => {
        axios
          .get(`https://api.jaoafa.com/v2/users/login`, {
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
            this.heatmaps = response.data
            this.loadingHeatmap = false
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
  .heatmap {
    margin: 16px;
  }
}
</style>
