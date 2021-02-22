<template>
  <div class="user-info-container">
    <h2>ユーザー情報</h2>
    <p>このユーザーの情報は以下の通りです。</p>
    <div class="table">
      <table class="info-table">
        <tr>
          <th>権限グループ</th>
          <td v-if="data.group == null">
            <vue-loading type="spiningDubbles" color="#000" />
          </td>
          <td v-if="data.group != null">
            {{ data.group }} ({{ data.groupWhen }}現在)
          </td>
        </tr>
        <tr>
          <th>累計ログイン時間</th>
          <td v-if="data.totalTime.jaototal == null">
            <vue-loading type="spiningDubbles" color="#000" />
          </td>
          <td v-if="data.totalTime.jaototal != null">
            {{ data.totalTime.jaototal }}
            <button @click="openOnlineTimeModal">詳細を開く</button>
          </td>
        </tr>
        <tr>
          <th>minecraft.jp 投票回数</th>
          <td v-if="data.mcjpVoteCount == -1">
            <vue-loading type="spiningDubbles" color="#000" />
          </td>
          <td v-if="data.mcjpVoteCount != -1">
            {{ data.mcjpVoteCount }}回 ({{ data.mcjpVoteRank }}位)
          </td>
        </tr>
        <tr>
          <th>monocraft.net 投票回数</th>
          <td v-if="data.monoVoteCount == -1">
            <vue-loading type="spiningDubbles" color="#000" />
          </td>
          <td v-if="data.monoVoteCount != -1">
            {{ data.monoVoteCount }}回 ({{ data.monoVoteRank }}位)
          </td>
        </tr>
      </table>
    </div>

    <ModalWindow
      v-if="onlineTimeModel"
      class="modal-window"
      @close="onlineTimeModel = false"
    >
      <dl>
        <div>
          <dt>kassi-hp.tk Minecraft Server</dt>
          <dd>{{ data.totalTime.kassi }}</dd>
        </div>
        <div>
          <dt>jao Minecraft Server 第1世代</dt>
          <dd>{{ data.totalTime.jao1 }}</dd>
        </div>
        <div>
          <dt>jao Minecraft Server 第2世代</dt>
          <dd>{{ data.totalTime.jao2 }}</dd>
        </div>
        <div>
          <dt>jao Minecraft Server 第3世代</dt>
          <dd>{{ data.totalTime.jao3 }}</dd>
        </div>
      </dl>
    </ModalWindow>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import Vue from 'vue'
import ModalWindow from '@/components/ModalWindow.vue'
import { VueLoading } from 'vue-loading-template'
import { DataStore } from '@/store'

interface TotalLoginTimeModel {
  kassi: string | null
  jaototal: string | null
  jao1: string | null
  jao2: string | null
  jao3: string | null
}

interface UserInfoModel {
  group: string | null
  groupWhen: string | null
  totalTime: TotalLoginTimeModel
  mcjpVoteCount: number
  mcjpVoteRank: number
  monoVoteCount: number
  monoVoteRank: number
}

interface DataType {
  onlineTimeModel: boolean
  data: UserInfoModel
}

export default Vue.extend({
  name: 'UserInfomation',
  components: {
    ModalWindow,
    VueLoading,
  },
  data(): DataType {
    return {
      onlineTimeModel: false,
      data: {
        group: null,
        groupWhen: null,
        totalTime: {
          kassi: null,
          jaototal: null,
          jao1: null,
          jao2: null,
          jao3: null,
        },
        mcjpVoteCount: -1,
        mcjpVoteRank: -1,
        monoVoteCount: -1,
        monoVoteRank: -1,
      },
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
      if (DataStore.getUUID == null) return
      this.$recaptcha.execute('login').then((token: string) => {
        axios
          .get(`https://api.jaoafa.com/v2/users/info/${DataStore.getUUID}`, {
            params: {
              recaptcha: token,
            },
          })
          .then((response) => {
            if ('error' in response.data) {
              DataStore.showModal({
                title: `[Error | ${this.$options.name}]`,
                message: `${response.data.error}`,
              })
              return
            }
            this.data = response.data
          })
          .catch((error) => {
            DataStore.showModal({
              title: `[Error | ${this.$options.name}]`,
              message: `エラーが発生しました。数分後にもう一度お試しいただき、解決しなければ運営にご連絡ください。<br>${error}`,
            })
          })
      })
    },
    openOnlineTimeModal() {
      DataStore.setModalTitle('ログイン時間詳細')
      this.onlineTimeModel = true
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

.user-info-container {
  table {
    width: 100%;
    border-collapse: collapse;
    word-break: keep-all;
    line-height: 1.7;

    th {
      background: #eee;
      text-align: left;
      border-right: solid 2px #ddd;
    }

    th,
    td {
      padding: 4px 16px;
      border: solid 1px #ddd;
    }
  }

  button {
    background: #ffb41d;
    color: #fff;
    margin: 2px;
    padding: 2px 10px;
    border-radius: 5px;
    transition: background-color 0.25s;
  }

  dl {
    border: 1px solid #ccc;
  }

  dl > div {
    display: flex;
    flex-wrap: wrap;

    @include smartphone {
      display: block;
    }
  }

  dt {
    background: #ddd;
    border-top: 1px solid #ccc;
    width: 15em;
    padding: 7px;
  }

  dd {
    padding: 7px;
    border: 1px solid #ccc;
    flex: auto;

    @include smartphone {
      border: none;
    }
  }
}
</style>
