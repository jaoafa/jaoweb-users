<template>
  <div>
    <UserData />
    <UserInfomation />
    <MCBansTable />
    <LoginHistoryTable />
    <PunishmentHistoryTable />
    <OfficialDiscordTable />
    <AchievementsTable />
    <PeriodMatchTable />
    <ExternalLinks />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import { DataStore } from '@/store'
import bufferToDataUrl from 'buffer-to-data-url'
import toIco from 'to-ico'

export default Vue.extend({
  name: 'User',
  components: {},
  data(): {
    mcid: string
  } {
    return {
      mcid: '',
    }
  },
  head() {
    return {
      // @ts-ignore
      title: this.mcid + ' | jMS Users',
    }
  },
  mounted() {
    DataStore.setMinecraftID(null)
    DataStore.setUUID(null)
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
              setTimeout(() => {
                this.$router.push({ path: `/` })
                DataStore.closeModal()
              }, 3000)
              return
            }
            DataStore.showModal({
              title: '[Error | User]',
              message: `${response.data.error}`,
            })
            return
          }
          DataStore.setMinecraftID(response.data.mcid)
          this.mcid = response.data.mcid
          DataStore.setUUID(response.data.uuid)

          axios
            .get(
              'https://crafatar.com/avatars/' +
                response.data.uuid +
                '?overlay=true&size=16',
              { responseType: 'arraybuffer' }
            )
            .then(async (response) => {
              const buf = await toIco([Buffer.from(response.data, 'utf-8')], {
                resize: true,
                sizes: [16],
              })
              console.log(buf)
              if (
                document === null ||
                document!.getElementById('favicon-ico') == null
              ) {
                console.log("document!.getElementById('favicon-ico') == null")
                return
              }
              const element: HTMLAnchorElement = <HTMLAnchorElement>(
                document!.getElementById('favicon-ico')
              )

              element.href = `data:image/vnd.microsoft.icon;base64,${buf.toString(
                'base64'
              )}`
            })
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
