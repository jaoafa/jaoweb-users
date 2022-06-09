<template>
  <div class="punishments-container">
    <h2>最近の処罰履歴</h2>
    <p>
      Jail: {{ count.jail }} / ChatJail: {{ count.chatjail }} / EBan:
      {{ count.eban }} / VBan: {{ count.vban }}
    </p>
    <div class="table">
      <table class="punishments-table">
        <thead>
          <tr>
            <th>種別</th>
            <th>Minecraft ID</th>
            <th>理由</th>
            <th>遺言</th>
            <th>ステータス</th>
            <th>処罰者</th>
            <th>登録日時</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.type + '-' + item.id">
            <td :data-type="item.type">{{ item.type }}</td>
            <td>{{ item.mcid }}</td>
            <td>{{ item.reason }}</td>
            <td>{{ item.testment }}</td>
            <td :data-status="item.status.toString()">
              {{ item.status ? '処罰中' : '処罰終了済' }}
            </td>
            <td>
              <nuxt-link
                v-if="!isLinkIgnoreUser(item.bannedBy)"
                :to="{ path: `/${item.bannedBy}` }"
              >
                {{ item.bannedBy }}
              </nuxt-link>
              <span v-if="isLinkIgnoreUser(item.bannedBy)">{{
                item.bannedBy
              }}</span>
            </td>
            <td>{{ item.date }}</td>
          </tr>
          <tr v-if="!loading && items.length === 0" class="not-exist">
            <td colspan="7">Data does not exist.</td>
          </tr>
          <tr v-if="loading">
            <td colspan="7">
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

interface PunishmentCounts {
  jail: number
  chatjail: number
  eban: number
  vban: number
}

interface Punishment {
  type: string
  mcid: string
  reason: string
  testment: string | null
  status: boolean
  bannedBy: string
  date: string
}

interface DataType {
  count: PunishmentCounts
  items: Punishment[]
  loading: boolean
}

export default Vue.extend({
  name: 'PunishmentHistoryTable',
  components: {
    VueLoading,
  },
  data(): DataType {
    return {
      count: {
        jail: 0,
        chatjail: 0,
        eban: 0,
        vban: 0,
      },
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
          .get(
            `https://api.jaoafa.com/v2/users/punishment/${DataStore.getUUID}`,
            {
              params: {
                recaptcha: token,
              },
            }
          )
          .then((response) => {
            if ('error' in response.data) {
              DataStore.showModal({
                title: `[Error | ${this.$options.name}]`,
                message: response.data.error,
              })
              return
            }
            this.count = response.data.count
            this.items = response.data.items
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
    isLinkIgnoreUser(user: string) {
      return user === 'jaotan' || user === 'CONSOLE'
    },
  },
})
</script>

<style lang="scss">
$type-status-colors: (
  Type-Jail: #87ceeb,
  Type-ChatJail: #0f0,
  Type-EBan: #ff0,
  Type-VBan: #f0f,
  Status-True: #f08080,
  Status-False: #90ee90,
);

@mixin smartphone {
  @media (max-width: 480px) {
    @content;
  }
}

.punishments-container {
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

    thead {
      border-bottom: solid 2px #ddd;
    }

    th {
      background: #eee;
    }

    td {
      &[data-type='Jail'] {
        background: map-get($type-status-colors, 'Type-Jail');
      }

      &[data-type='ChatJail'] {
        background: map-get($type-status-colors, 'Type-ChatJail');
      }

      &[data-type='EBan'] {
        background: map-get($type-status-colors, 'Type-EBan');
      }

      &[data-type='VBan'] {
        background: map-get($type-status-colors, 'Type-VBan');
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

    td:nth-child(3),
    td:nth-child(4) {
      white-space: normal;
      word-break: break-word;
    }

    td:nth-child(3) {
      min-width: 20em;
    }

    td:nth-child(4) {
      min-width: 10em;
    }
  }

  @include smartphone {
    table {
      display: inline-block;
    }
  }
}
</style>
