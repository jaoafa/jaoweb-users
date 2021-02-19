<template>
  <div class="periodmatch-container">
    <h2>ピリオドマッチ情報</h2>
    <p>列タイトルをクリックするとソートできます。</p>
    <VTable :columns="columns" :items="items" :default-sort-key="'rank'" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import VTable, { Column } from '@/components/VTable.vue'
import { DataStore } from '~/store'

interface MatchData {
  id: number
  mcid: string
  success: number
  failure: number
  // eslint-disable-next-line camelcase
  match_time: number
  // eslint-disable-next-line camelcase
  real_match_time: number
  // eslint-disable-next-line camelcase
  calc_match_time: number
  status: boolean
  rank: number
  // eslint-disable-next-line camelcase
  start_time: string
  // eslint-disable-next-line camelcase
  end_time: string
  // eslint-disable-next-line camelcase
  created_at: string
}

interface DataType {
  items: MatchData[]
  columns: Column[]
  loading: boolean
}

export default Vue.extend({
  name: 'PeriodMatchTable',
  components: {
    VTable,
  },
  data(): DataType {
    return {
      items: [],
      columns: [
        {
          key: 'match_time',
          value: '部門',
          unit: '秒部門',
        },
        {
          key: 'mcid',
          value: 'Minecraft ID',
          unit: '',
        },
        {
          key: 'rank',
          value: '順位',
          unit: '位',
        },
        {
          key: 'success',
          value: '成功回数',
          unit: '回',
        },
        {
          key: 'failure',
          value: '失敗回数',
          unit: '回',
        },
        {
          key: 'created_at',
          value: '登録日時',
          unit: '',
        },
      ],
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
            `https://api.jaoafa.com/users/pm_recently/${DataStore.getUUID}`,
            {
              params: {
                user_recaptcha: token,
              },
            }
          )
          .then((response) => {
            if (!response.data.status) {
              DataStore.showModal({
                title: `[Error | ${this.$options.name}]`,
                message: response.data.error,
              })
              return
            }
            this.items = response.data.data
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
@mixin smartphone {
  @media (max-width: 480px) {
    @content;
  }
}
</style>
