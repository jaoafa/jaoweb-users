<template>
  <div class="user-infomations-container">
    <div class="icon">
      <vue-loading
        class="user-icon loading"
        :class="{ disabled: isLoadedUserImg }"
        type="spiningDubbles"
        color="#eee"
      />
      <img
        class="user-icon"
        :class="{ disabled: !isLoadedUserImg }"
        :src="userimg"
        @load="loadedUserImg"
      />
    </div>
    <div class="user-data">
      <div class="user-rank" :class="'rank-' + data.rank">
        {{ data.rankText }}
      </div>
      <div class="user-data-names">
        <div class="user-name" :class="{ verified: data.isVerified }">
          <vue-loading
            v-if="data.username == null"
            type="spiningDubbles"
            color="#000"
          />
          {{ data.username }}
        </div>
        <dl>
          <div>
            <dt>UUID</dt>
            <dd v-if="data.uuid == null">
              <vue-loading type="spiningDubbles" color="#000" />
            </dd>
            <dd v-if="data.uuid != null">{{ data.uuid }}</dd>
          </div>
          <div>
            <dt>First login</dt>
            <dd v-if="data.firstLogin == null">
              <vue-loading type="spiningDubbles" color="#000" />
            </dd>
            <dd v-if="data.firstLogin != null">
              {{ data.firstLogin }} ({{ data.firstHowManyAgo }}前)
            </dd>
          </div>
          <div>
            <dt>Last login</dt>
            <dd v-if="data.leastLogin == null">
              <vue-loading type="spiningDubbles" color="#000" />
            </dd>
            <dd v-if="data.leastLogin != null">
              {{ data.leastLogin }} ({{ data.leastHowManyAgo }}前)
            </dd>
          </div>
        </dl>
      </div>
      <div class="user-data-social">
        <a
          class="twitter"
          :class="{ disabled: data.socials.twitterId == null }"
          :href="
            'https://twitter.com/intent/user?user_id=' + data.socials.twitterId
          "
        />
        <a
          class="discord"
          :class="{ disabled: data.socials.discordId == null }"
          :href="'https://discord.com/users/' + data.socials.discordId"
        />
        <a
          class="github"
          :class="{ disabled: data.socials.githubId == null }"
          :href="'https://github.com/' + data.socials.githubId"
        />
        <a
          class="home"
          :class="{ disabled: data.socials.homeUrl == null }"
          :href="data.socials.homeUrl"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import { VueLoading } from 'vue-loading-template'
import { DataStore } from '@/store'

interface Socials {
  twitterId: string | null
  discordId: string | null
  githubId: string | null
  homeUrl: string | null
}

interface UserInfoModel {
  rankText: string | null
  rank: number
  username: string | null
  isVerified: boolean
  uuid: string | null
  firstLogin: string | null
  leastLogin: string | null
  firstHowManyAgo: string
  leastHowManyAgo: string
  socials: Socials
}

interface DataType {
  userimg: string | null
  isLoadedUserImg: boolean
  data: UserInfoModel
}

export default Vue.extend({
  name: 'UserData',
  components: {
    VueLoading,
  },
  data(): DataType {
    return {
      userimg: null,
      isLoadedUserImg: false,
      data: {
        rankText: null,
        rank: 0,
        username: null,
        isVerified: false,
        uuid: null,
        firstLogin: null,
        leastLogin: null,
        firstHowManyAgo: '不明',
        leastHowManyAgo: '不明',
        socials: {
          twitterId: null,
          discordId: null,
          githubId: null,
          homeUrl: null,
        },
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
      if (DataStore.getUUID === null) {
        this.isLoadedUserImg = false
        return
      }
      this.$recaptcha.execute('login').then((token: string) => {
        axios
          .get(`https://api.jaoafa.com/v2/users/data/${DataStore.getUUID}`, {
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
            this.userimg =
              'https://crafatar.com/renders/body/' +
              response.data.uuid +
              '?overlay=true'
          })
          .catch((error) => {
            DataStore.showModal({
              title: `[Error | ${this.$options.name}]`,
              message: `エラーが発生しました。数分後にもう一度お試しいただき、解決しなければ運営にご連絡ください。<br>${error}`,
            })
          })
      })
    },
    loadedUserImg() {
      this.isLoadedUserImg = true
    },
  },
})
</script>

<style lang="scss">
$rank-colors: (
  0: #aaa,
  1: #fff,
  2: #00a,
  3: #55f,
  4: #5ff,
  5: #0aa,
  6: #0a0,
  7: #5f5,
  8: #ff5,
  9: #fa0,
  10: #f55,
  11: #a00,
  12: #a0a,
  13: #f5f,
);

@mixin gen-rank-color($rank-id) {
  .user-rank.rank-#{$rank-id} {
    color: map-get($rank-colors, $rank-id);
  }
}
@mixin pc {
  @media (max-width: 1024px) {
    @content;
  }
}

@mixin smartphone {
  @media (max-width: 480px) {
    @content;
  }
}

.user-infomations-container {
  width: 100%;
  display: flex;
  align-items: flex-start;

  @include smartphone {
    display: block;
  }

  .icon {
    display: block;
    width: 180px;
    height: 180px;
    background: #ffb41d;
    border-radius: 50%;

    @include smartphone {
      margin: auto;
    }
  }

  .user-icon {
    display: block;
    margin-top: 10px;
    width: 170px;
    height: 170px;
    border-radius: 50%;
    object-fit: cover;
    object-position: 100% 0%;

    @include smartphone {
      margin: auto;
      height: 185px;
    }

    &.disabled {
      display: none;
    }

    &.loading {
      margin: auto;
      line-height: 180px;
    }
  }

  .user-data {
    margin: 15px;

    .user-rank {
      font-size: 12px;
      display: block;
      word-wrap: break-word;
      text-overflow: ellipsis;
      max-height: 36px;
      line-height: 12px;
      letter-spacing: 0.4pt;
      overflow-y: hidden;

      @include smartphone {
        display: none;
      }
    }

    &::-webkit-scrollbar {
      display: none;
    }

    @each $rank-id, $color in $rank-colors {
      @include gen-rank-color($rank-id);
    }

    .user-name {
      font-size: 32px;
      margin: 10px 0;

      &.verified::after {
        font-family: 'Material Design Icons';
        content: '\f0791';
        color: #1da1f2;
      }
    }

    dl > div {
      display: flex;
      flex-wrap: wrap;
    }

    dt {
      width: 6em;

      &::after {
        content: ':';
      }
    }

    dd {
      flex: auto;
    }

    @include smartphone {
      dd {
        margin-left: 0.5em;
      }
    }

    .user-data-social {
      margin: 5px;

      @include smartphone {
        text-align: center;
      }

      a {
        font-size: 32px;
        text-decoration: none;

        &::before {
          font-family: 'Material Design Icons';
        }
      }

      .twitter::before {
        content: '\f0544';
        color: #00acee;
      }

      .discord::before {
        content: '\f066f';
        color: #7289da;
      }

      .github::before {
        content: '\f02a4';
        color: #00acee;
      }

      .home::before {
        content: '\f02dc';
        color: #00acee;
      }

      .disabled {
        opacity: 0.2;
        pointer-events: none;
      }
    }
  }
}
</style>
