<template>
  <div class="jsa-container">
    <h2>jao Super Achievement2 (独自実績)</h2>
    <p>実績解除数: {{ items.length }} / 100</p>
    <vue-loading v-if="loading" type="spiningDubbles" color="#000" />
    <div v-if="!loading" class="jsa-items">
      <div v-for="item in items" :key="item.id" class="jsa-item">
        <div class="icon" :style="{ color: randomColor() }">
          <i class="mdi mdi-trophy reflection"></i>
        </div>
        <div class="title">{{ item.title }}</div>
        <div class="description">{{ item.description }}</div>
        <div class="date">{{ item.date }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import { VueLoading } from 'vue-loading-template'
import { DataStore } from '~/store'

interface Achievement {
  id: number
  title: string
  description: string
  date: string
}

interface DataType {
  items: Achievement[]
  loading: boolean
}

export default Vue.extend({
  name: 'AchievementsTable',
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
          .get(`https://api.jaoafa.com/v1/users/jsa/${DataStore.getUUID}`, {
            params: {
              user_recaptcha: token,
            },
          })
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
    rangeRndm(min: number, max: number) {
      if (max) {
        return (Math.random() * (max - min + 1) + min) | 0
      } else {
        return (Math.random() * min) | 0
      }
    },
    randomColor() {
      return (
        'hsl(' +
        this.rangeRndm(0, 360) +
        ', 70%, ' +
        this.rangeRndm(25, 75) +
        '%)'
      )
    },
  },
})
</script>

<style lang="scss">
.jsa-container .jsa-items {
  max-height: 300px;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;

  .jsa-item {
    width: 110px;
    border: solid 1px #ddd;
    border-radius: 10px;
    margin: 3px;
    padding: 3px;
    text-align: center;

    .icon {
      line-height: 70px;
      font-size: 400%;
    }

    .title {
      font-size: 15px;
      margin: 5px 0;
    }

    .description {
      font-size: 12px;
      margin: 3px 0;
      word-break: break-all;
    }

    .date {
      font-size: 12px;
    }
  }
}

.reflection {
  animation: reflection 2s ease-in-out infinite;
  -webkit-animation: reflection 2s ease-in-out infinite;
  -moz-animation: reflection 2s ease-in-out infinite;
  -ms-animation: reflection 2s ease-in-out infinite;
  -o-animation: reflection 2s ease-in-out infinite;
}

@keyframes reflection {
  0% {
    filter: brightness(100%);
  }
  30% {
    filter: brightness(120%);
  }
  50% {
    filter: brightness(150%);
  }
  80% {
    filter: brightness(120%);
  }
  100% {
    filter: brightness(100%);
  }
}
@-webkit-keyframes reflection {
  0% {
    filter: brightness(100%);
  }
  30% {
    filter: brightness(120%);
  }
  50% {
    filter: brightness(150%);
  }
  80% {
    filter: brightness(120%);
  }
  100% {
    filter: brightness(100%);
  }
}
@-moz-keyframes reflection {
  0% {
    filter: brightness(100%);
  }
  30% {
    filter: brightness(120%);
  }
  50% {
    filter: brightness(150%);
  }
  80% {
    filter: brightness(120%);
  }
  100% {
    filter: brightness(100%);
  }
}
@-ms-keyframes reflection {
  0% {
    filter: brightness(100%);
  }
  30% {
    filter: brightness(120%);
  }
  50% {
    filter: brightness(150%);
  }
  80% {
    filter: brightness(120%);
  }
  100% {
    filter: brightness(100%);
  }
}
@-o-keyframes reflection {
  0% {
    filter: brightness(100%);
  }
  30% {
    filter: brightness(120%);
  }
  50% {
    filter: brightness(150%);
  }
  80% {
    filter: brightness(120%);
  }
  100% {
    filter: brightness(100%);
  }
}
</style>
