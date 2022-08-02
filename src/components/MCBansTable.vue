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
    <div class="table">
      <table class="mcbans-table">
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
            <td data-type="Global">Global</td>
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
            <td data-type="Local">Local</td>
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
          <tr
            v-if="!loading && global.length === 0 && local.length === 0"
            class="not-exist"
          >
            <td colspan="6">Data does not exist.</td>
          </tr>
          <tr v-if="loading">
            <td colspan="6">
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
import { DataStore } from '@/store'

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
  notFound: boolean
  loading: boolean
}

export default Vue.extend({
  name: 'MCBansTable',
  components: {
    VueLoading,
  },
  data(): DataType {
    return {
      reputation: 10,
      gbanCount: 0,
      lbanCount: 0,
      updateAt: '',
      global: [],
      local: [],
      notFound: false,
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
              this.fetchBanData(true, banId)
            }

            for (const banId of response.data.data.local_ids) {
              this.fetchBanData(false, banId)
            }

            this.loading = false
          })
          .catch((error) => {
            if (error.response.status === 404) {
              this.gbanCount = 0
              this.lbanCount = 0
              this.reputation = 10
              this.updateAt = this.getDateTime(new Date())
              this.loading = false
              return
            }
            DataStore.showModal({
              title: `[Error | ${this.$options.name}]`,
              message: `エラーが発生しました。数分後にもう一度お試しいただき、解決しなければ運営にご連絡ください。<br>${error}`,
            })
          })
      })
    },
    fetchBanData(isGlobal: boolean, banId: number) {
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
            ;(isGlobal ? this.global : this.local).push({
              id: banId,
              server: banResponse.data.data.server,
              bannedBy: banResponse.data.data.banned_by,
              reason: banResponse.data.data.reason,
              date: banResponse.data.data.date,
            })
          })
      })
    },
    getDateTime(date: Date) {
      const year = date.getFullYear()
      const month = ('00' + (date.getMonth() + 1).toString()).slice(-2)
      const day = ('00' + date.getDate().toString()).slice(-2)
      const hour = ('00' + date.getHours().toString()).slice(-2)
      const minute = ('00' + date.getMinutes().toString()).slice(-2)
      const second = ('00' + date.getSeconds().toString()).slice(-2)
      return `${year}-${month}-${day} ${hour}:${minute}:${second}`
    },
  },
})
</script>

<style lang="scss" scoped>
$type-status-colors: (
  Type-Global: #f00,
  Type-Local: #ffa500,
  Status-True: #f08080,
  Status-False: #90ee90,
);

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

    thead {
      border-bottom: solid 2px #ddd;
    }

    th {
      background: #eee;
    }

    td {
      &[data-type='Local'] {
        background: map-get($type-status-colors, 'Type-Local');
      }

      &[data-type='Global'] {
        background: map-get($type-status-colors, 'Type-Global');
      }

      &[data-status='true'] {
        background: map-get($type-status-colors, 'Status-True');
      }

      &[data-status='false'] {
        background: map-get($type-status-colors, 'Status-False');
      }
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
