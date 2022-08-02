<template>
  <div>
    <form class="search-form" action="#" @keydown.enter="onSubmit">
      <input
        v-model="mcid"
        class="user-search"
        placeholder="Minecraft ID or UUID"
        title="英数字とアンダーバーのみ使用できます。"
        autocomplete="on"
        pattern="^[0-9A-Za-z_]+$"
        list="suggest-users"
        @input="onSearch"
      />
      <datalist id="suggest-users">
        <option v-for="user in suggestUsers" :key="user">{{ user }}</option>
      </datalist>
      <button
        class="add-btn"
        :class="{ disabled: disableSearchBtn }"
        @click.prevent="onSubmit"
      />
    </form>

    <div v-for="user of users" :key="user.uuid" class="heatmap">
      <h2 :id="user.uuid">{{ user.id }}</h2>
      <button class="delete-btn" @click.prevent="onDelete(user.uuid)" />
      <vue-loading
        v-if="!loaded.includes(user.uuid)"
        type="spiningDubbles"
        color="#000"
      />
      <calendar-heatmap
        v-if="loaded.includes(user.uuid)"
        :values="userHeatmaps[user.uuid]"
        :end-date="today"
        :max="86400"
        :tooltip-unit="'sec'"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { VueLoading } from 'vue-loading-template'
import { CalendarHeatmap } from 'vue-calendar-heatmap/dist/vue-calendar-heatmap.common'
import axios from 'axios'
import { DataStore } from '~/store'

export default Vue.extend({
  name: 'HeatMapPage',
  components: {
    VueLoading,
    CalendarHeatmap,
  },
  data(): {
    users: {
      id: string
      uuid: string
    }[]
    userHeatmaps: {
      [key: string]: {
        heatmaps: {
          date: string
          count: number
        }[]
      }
    }
    today: string
    loaded: string[]
    suggestUsers: string[]
    mcid: string
    disableSearchBtn: boolean
  } {
    return {
      users: [
        {
          id: 'X4Z',
          uuid: '5799296a-d1ec-4252-93bd-440bb9caa65c',
        },
        {
          id: 'Hirotaisou2012',
          uuid: '39cf878b-ef0b-44fc-a2c6-de3d540a4728',
        },
        {
          id: 'mine_book000',
          uuid: '32ff7cdc-a1b4-450a-aa7e-6af75fe8c37c',
        },
        {
          id: 'X9Z',
          uuid: '7008531a-539b-4dfc-8b81-7b267d18dd0a',
        },
        {
          id: 'Ekusas83',
          uuid: '22ab15d6-2e88-4fdd-91c0-e459f0f804f8',
        },
        {
          id: 'X5Z',
          uuid: '0bdc0219-f3c3-4d73-a4df-1d8bd088f419',
        },
        {
          id: 'kohonayoshi',
          uuid: '26728d53-add7-46d1-97c3-0a25bc6607f5',
        },
        {
          id: 'MinHero_exp',
          uuid: '0ad34a33-3ca4-4c86-84f3-a4591920b06a',
        },
        {
          id: 'yuuaHP',
          uuid: '13976d72-1389-4332-818e-9cecad363b12',
        },
      ],
      userHeatmaps: {},
      today: new Date().toISOString().split('T')[0],
      loaded: [],
      suggestUsers: [],
      mcid: '',
      disableSearchBtn: false,
    }
  },
  created() {
    this.users.forEach((v) => {
      this.fetch(v.uuid)
    })
  },
  methods: {
    fetch(uuid: string) {
      this.$recaptcha.execute('login').then((token: string) => {
        axios
          .get(`https://api.jaoafa.com/v2/users/daily-online`, {
            params: {
              uuid,
              recaptcha: token,
            },
          })
          .then((response) => {
            if ('error' in response.data) {
              alert(response.data.error)
              return
            }
            this.userHeatmaps[uuid] = response.data
            this.loaded.push(uuid)
          })
          .catch((error) => {
            alert(error)
          })
      })
    },
    onSearch() {
      if (this.mcid !== '') this.disableSearchBtn = false
      this.$nextTick(() => {
        this.$recaptcha.execute('login').then((token: string) => {
          axios
            .get('https://api.jaoafa.com/v2/users/search/prefix', {
              params: {
                mcid: this.mcid,
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
              this.suggestUsers = response.data
            })
            .catch((error) => {
              DataStore.showModal({
                title: `[Error | ${this.$options.name}]`,
                message: `エラーが発生しました。数分後にもう一度お試しいただき、解決しなければ運営にご連絡ください。<br>
                  ${error}`,
              })
            })
        })
      })
    },
    onDelete(uuid: string) {
      this.users = this.users.filter((v) => v.uuid !== uuid)
    },
    onSubmit(event: { keyCode: number }) {
      if (event.keyCode !== undefined && event.keyCode !== 13) return
      this.disableSearchBtn = true
      this.$recaptcha.execute('login').then((token: string) => {
        axios
          .get(`https://api.jaoafa.com/v2/users/${this.mcid}`, {
            params: {
              recaptcha: token,
            },
          })
          .then((response) => {
            if ('error' in response.data) {
              if (response.data.error === 'User not found.') {
                DataStore.showModal({
                  title: 'User Not Found',
                  message: '指定されたユーザーが見つかりませんでした。',
                })
                this.disableSearchBtn = false
                return
              }
            }
            this.users.push({
              id: response.data.mcid,
              uuid: response.data.uuid,
            })
            this.fetch(response.data.uuid)
            setTimeout(() => {
              document.getElementById(response.data.uuid)!.scrollIntoView()
              this.disableSearchBtn = false
              this.mcid = ''
            }, 500)
          })
          .catch((error) => {
            DataStore.showModal({
              title: `[Error | ${this.$options.name}]`,
              message: `エラーが発生しました。数分後にもう一度お試しいただき、解決しなければ運営にご連絡ください。<br>
                ${error}`,
            })
            this.disableSearchBtn = false
          })
      })
      return false
    },
  },
})
</script>

<style lang="scss" scoped>
.heatmap {
  margin: 16px auto;
  max-width: 1300px;
}

.search-form {
  text-align: center;
  display: flex;
  justify-content: center;
  position: relative;
}

.user-search {
  border: solid 1px #b1b1b1;
  width: 75%;
  height: 50px;
  padding: 10px;
}

.add-btn {
  display: block;
  text-decoration: none;
  background: #ffb41d;
  width: 15%;
  height: 50px;
  cursor: pointer;

  &::before {
    font-family: 'Material Design Icons';
    content: '\f0014';
    color: #fff;
    font-size: 2em;
  }

  &.disabled {
    opacity: 0.5;
    pointer-events: none;
  }
}

h2 {
  display: inline-block;
}

.delete-btn {
  display: inline-block;
  text-decoration: none;
  background: #ffb41d;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;

  &::before {
    font-family: 'Material Design Icons';
    content: '\f0015';
    color: #fff;
    font-size: 1.2em;
  }

  &.disabled {
    opacity: 0.5;
    pointer-events: none;
  }
}
</style>
