<template>
  <div class="discord-container">
    <h2>jMS Gamers Club (公式Discordサーバ)</h2>
    <dl>
      <div>
        <dt>連携ステータス</dt>
        <dd v-if="loading">
          <vue-loading v-if="loading" type="spiningDubbles" color="#000" />
        </dd>
        <dd
          v-if="!loading"
          :class="{
            connected: mainAccount != null,
            notConnected: mainAccount == null,
          }"
        >
          {{ mainAccount != null ? '連携済み' : '未連携' }}
        </dd>
      </div>
      <div v-if="mainAccount != null">
        <dt>連携先</dt>
        <dd>
          <vue-loading v-if="loading" type="spiningDubbles" color="#000" />
          <img v-if="!loading" :src="mainAccount.imgurl" />
          <a
            v-if="!loading"
            :href="'https://discord.com/users/' + mainAccount.id"
          >
            {{ mainAccount.name }}#{{ mainAccount.discriminator }}
          </a>
        </dd>
      </div>
      <div v-if="subAccount != null">
        <dt>サブアカウント</dt>
        <dd>
          <vue-loading v-if="loading" type="spiningDubbles" color="#000" />
          <img v-if="!loading" :src="subAccount.imgurl" />
          <a
            v-if="!loading"
            :href="'https://discord.com/users/' + subAccount.id"
          >
            {{ subAccount.name }}#{{ subAccount.discriminator }}
          </a>
        </dd>
      </div>
    </dl>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import { VueLoading } from 'vue-loading-template'
import { DataStore } from '@/store'

interface User {
  imgurl: string | null
  name: string | null
  discriminator: string | null
}

interface DataType {
  mainAccount: User
  subAccount: User
  loading: boolean
}

export default Vue.extend({
  name: 'OfficialDiscordTable',
  components: {
    VueLoading,
  },
  data(): DataType {
    return {
      mainAccount: {
        imgurl: null,
        name: null,
        discriminator: null,
      },
      subAccount: {
        imgurl: null,
        name: null,
        discriminator: null,
      },
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
          .get(`https://api.jaoafa.com/v2/users/discord/${DataStore.getUUID}`, {
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
            this.mainAccount = response.data.mainAccount
            this.subAccount = response.data.subAccount
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

.discord-container {
  dl > div {
    height: 30px;
    display: flex;
    flex-wrap: wrap;

    dt {
      width: 10em;
      line-height: 30px;

      &::after {
        content: ':';
      }
    }

    dd {
      flex: auto;
      line-height: 30px;

      img {
        height: 30px;
      }

      &.connected {
        color: green;
      }

      &.notConnected {
        color: red;
      }
    }

    @include smartphone {
      dd {
        margin-left: 0.5em;
      }
    }
  }
}
</style>
