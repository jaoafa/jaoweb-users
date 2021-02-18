<template>
  <div>
    <UserData />
    <UserInfomation />
    <MCBansTable />
    <LoginHistoryTable />
    <div class="punishments-container">
      <h2>処罰履歴</h2>
      <table class="punishments-table">
        <thead>
          <tr>
            <th>種別</th>
            <th>Minecraft ID</th>
            <th>理由</th>
            <th>遺言 / ステータス</th>
            <th>処罰者</th>
            <th>登録日時</th>
          </tr>
        </thead>
        <tbody>
          <tr data-type="jail">
            <td>Jail</td>
            <td>X4Z</td>
            <td>Ventから出てきた</td>
            <td></td>
            <td>CONSOLE</td>
            <td>2021/01/01 00:00:00</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="discord-container">
      <h2>jMS Gamers Club (公式Discordサーバ)</h2>
      <dl>
        <div>
          <dt>連携ステータス</dt>
          <dd>連携済み</dd>
        </div>
        <div>
          <dt>連携先</dt>
          <dd>
            <img
              src="https://cdn.discordapp.com/avatars/222018383556771840/75b9921bc266b3c75dc25c4d52e2a2a2.png"
            />
            <a href="https://discordapp.com/users/206692134991036416"
              >zakuro#4096</a
            >
          </dd>
        </div>
        <div>
          <dt>サブアカウント</dt>
          <dd>
            <img
              src="https://cdn.discordapp.com/avatars/222018383556771840/75b9921bc266b3c75dc25c4d52e2a2a2.png"
            />
            <a href="https://discordapp.com/users/206692134991036416"
              >nantoka#4096</a
            >
          </dd>
        </div>
      </dl>
    </div>
    <div class="jsa-container">
      <h2>jao Super Achievement2 (独自実績)</h2>
      <p>実績解除数: 10 / 100</p>
      <div class="jsa-items">
        <div class="jsa-item">
          <div class="icon"><i class="mdi mdi-trophy"></i></div>
          <div class="title">はじめてのjao</div>
          <div class="description">jao鯖に初めて入る</div>
          <div class="date">2020-04-05 15:26:23</div>
        </div>
        <div class="jsa-item">
          <div class="icon"><i class="mdi mdi-trophy"></i></div>
          <div class="title">はじめてのjao</div>
          <div class="description">jao鯖に初めて入る</div>
          <div class="date">2020-04-05 15:26:23</div>
        </div>
        <div class="jsa-item">
          <div class="icon"><i class="mdi mdi-trophy"></i></div>
          <div class="title">はじめてのjao</div>
          <div class="description">jao鯖に初めて入る</div>
          <div class="date">2020-04-05 15:26:23</div>
        </div>
        <div class="jsa-item">
          <div class="icon"><i class="mdi mdi-trophy"></i></div>
          <div class="title">はじめてのjao</div>
          <div class="description">jao鯖に初めて入る</div>
          <div class="date">2020-04-05 15:26:23</div>
        </div>
        <div class="jsa-item">
          <div class="icon"><i class="mdi mdi-trophy"></i></div>
          <div class="title">はじめてのjao</div>
          <div class="description">jao鯖に初めて入る</div>
          <div class="date">2020-04-05 15:26:23</div>
        </div>
        <div class="jsa-item">
          <div class="icon"><i class="mdi mdi-trophy"></i></div>
          <div class="title">はじめてのjao</div>
          <div class="description">jao鯖に初めて入る</div>
          <div class="date">2020-04-05 15:26:23</div>
        </div>
        <div class="jsa-item">
          <div class="icon"><i class="mdi mdi-trophy"></i></div>
          <div class="title">はじめてのjao</div>
          <div class="description">jao鯖に初めて入る</div>
          <div class="date">2020-04-05 15:26:23</div>
        </div>
        <div class="jsa-item">
          <div class="icon"><i class="mdi mdi-trophy"></i></div>
          <div class="title">はじめてのjao</div>
          <div class="description">jao鯖に初めて入る</div>
          <div class="date">2020-04-05 15:26:23</div>
        </div>
        <div class="jsa-item">
          <div class="icon"><i class="mdi mdi-trophy"></i></div>
          <div class="title">はじめてのjao</div>
          <div class="description">jao鯖に初めて入る</div>
          <div class="date">2020-04-05 15:26:23</div>
        </div>
        <div class="jsa-item">
          <div class="icon"><i class="mdi mdi-trophy"></i></div>
          <div class="title">はじめてのjao</div>
          <div class="description">jao鯖に初めて入る</div>
          <div class="date">2020-04-05 15:26:23</div>
        </div>
      </div>
    </div>
    <div class="periodmatch-container">
      <h2>ピリオドマッチ情報</h2>
      <table class="periodmatch-table">
        <thead>
          <tr>
            <th>部門順位</th>
            <th>Minecraft ID</th>
            <th>順位</th>
            <th>成功回数</th>
            <th>失敗回数</th>
            <th>登録日時</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0秒</td>
            <td>X4Z</td>
            <td>32位</td>
            <td>1回</td>
            <td>0回</td>
            <td>2021/01/01 00:00:00</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="link-container">
      <h2>外部リンク</h2>

      <ul>
        <li>
          MCBans:
          <a href="http://mcbans.com/player/5799296ad1ec425293bd440bb9caa65c"
            >X4Z</a
          >
        </li>
        <li>
          Japan Minecraft Servers:
          <a href="https://minecraft.jp/5799296ad1ec425293bd440bb9caa65c"
            >X4Z</a
          >
        </li>
        <li>
          NameMC:
          <a
            href="https://ja.namemc.com/profile/5799296a-d1ec-4252-93bd-440bb9caa65c"
            >X4Z</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import { DataStore } from '~/store'

export default Vue.extend({
  name: 'User',
  components: {},
  created() {
    this.$recaptcha.execute('login').then((token: string) => {
      axios
        .get(`https://api.jaoafa.com/v2/users/${this.$route.params.id}`, {
          params: {
            recaptcha: token,
          },
        })
        .then((response) => {
          if ('error' in response.data) {
            if (response.data.error === 'User not found.') {
              DataStore.showModal({
                title: 'User Not Found',
                message:
                  '指定されたユーザーが見つかりませんでした。3秒後にトップページに戻ります。',
              })
              setTimeout(function () {
                location.href = '/'
              }, 3000)
              return
            }
            DataStore.showModal({
              title: '[Error | User]',
              message: `${response.data.error}`,
            })
            return
          }
          DataStore.setUUID(response.data.uuid)
        })
        .catch((error) => {
          if ('error' in error.response.data) {
            DataStore.showModal({
              title: '[Error | User]',
              message: `${error.response.data.error}`,
            })
            return
          }
          DataStore.showModal({
            title: '[Error | User]',
            message: `エラーが発生しました。数分後にもう一度お試しいただき、解決しなければ運営にご連絡ください。\n${error}`,
          })
        })
    })
  },
})
</script>
