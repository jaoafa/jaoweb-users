<template>
  <div class="mcbans-container">
    <h2>MCBans</h2>
    <div class="overview">
      <p>
        Reputation: {{ reputation }} / 10 (GBan: {{ gbanCount }} / LBan:
        {{ lbanCount }})
      </p>
      <p class="when">{{ updateAt }} 現在</p>
    </div>
    <table v-if="global.length != 0 || local.length != 0" class="mcbans-table">
      <thead>
        <tr>
          <th>種別</th>
          <th>ID</th>
          <th>Server</th>
          <th>Banned by</th>
          <th>理由</th>
          <th>登録日時</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in global" :key="item.id">
          <td>Global</td>
          <td>
            <a :href="'https://mcbans.com/ban/' + item.id">{{ item.id }}</a>
          </td>
          <td>
            <a :href="'https://www.mcbans.com/server/' + item.server + '/'">
              {{ item.server }}
            </a>
          </td>
          <td>
            <a :href="'https://www.mcbans.com/player/' + item.bannedBy + '/'">
              {{ item.bannedBy }}
            </a>
          </td>
          <td>{{ item.reason }}</td>
          <td>{{ item.date }}</td>
        </tr>
        <tr v-for="item in local" :key="item.id">
          <td>Local</td>
          <td>
            <a :href="'https://mcbans.com/ban/' + item.id">{{ item.id }}</a>
          </td>
          <td>
            <a :href="'https://www.mcbans.com/server/' + item.server + '/'">
              {{ item.server }}
            </a>
          </td>
          <td>
            <a :href="'https://www.mcbans.com/player/' + item.bannedBy + '/'">
              {{ item.bannedBy }}
            </a>
          </td>
          <td>{{ item.reason }}</td>
          <td>{{ item.date }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import { DataStore } from '~/store'

interface Ban {
  id: number
  server: string
  bannedBy: string
  reason: string
  date: string
}

interface DataType {
  reputation: number
  gbanCount: number
  lbanCount: number
  updateAt: string
  global: Ban[]
  local: Ban[]
}

export default Vue.extend({
  name: 'MCBansTable',
  data(): DataType {
    return {
      reputation: 10,
      gbanCount: 0,
      lbanCount: 0,
      updateAt: '',
      global: [],
      local: [],
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
          .get(`https://api.jaoafa.com/v1/users/mcbans/${DataStore.getUUID}`, {
            params: {
              user_recaptcha: token,
            },
          })
          .then((response) => {
            if (!response.data.status) {
              DataStore.showModal({
                title: `[Error | ${this.$options.name}]`,
                message: `${response.data.message} (${response.data.code})`,
              })
              return
            }
            this.reputation = response.data.data.reputation
            this.gbanCount = response.data.data.global
            this.lbanCount = response.data.data.local
            this.updateAt = response.data.data.updated_at

            for (const banId of response.data.data.global_ids) {
              this.fetchBanData(banId)
            }
          })
          .catch((error) => {
            DataStore.showModal({
              title: '[Error | UserData]',
              message: `エラーが発生しました。数分後にもう一度お試しいただき、解決しなければ運営にご連絡ください。<br>${error}`,
            })
          })
      })
    },
    fetchBanData(banId: number) {
      this.$recaptcha.execute('login').then((token: string) => {
        axios
          .get(`https://api.jaoafa.com/v1/users/mcbans/ban/${banId}`, {
            params: {
              user_recaptcha: token,
            },
          })
          .then((banResponse) => {
            if (!banResponse.data.status) {
              DataStore.showModal({
                title: `[Error | ${this.$options.name}]`,
                message: `${banResponse.data.message} (${banResponse.data.code})`,
              })
              return
            }
            this.global.push({
              id: banId,
              server: banResponse.data.data.server,
              bannedBy: banResponse.data.data.banned_by,
              reason: banResponse.data.data.reason,
              date: banResponse.data.data.date,
            })
          })
      })
    },
  },
})
</script>

<style lang="scss" scoped>
@mixin smartphone {
  @media (max-width: 480px) {
    @content;
  }
}
.mcbans-container {
  .overview {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin: 13px 0;

    p {
      margin: 0;
    }

    @include smartphone {
      display: block;

      .when {
        text-align: right;
      }
    }
  }

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

  @include smartphone {
    table {
      display: inline-block;
    }
  }
}
</style>
