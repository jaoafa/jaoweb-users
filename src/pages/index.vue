<template>
  <main>
    <div class="search-container">
      <h2>検索</h2>
      <p>
        ユーザーを検索するには、Minecraft ID または UUID を入力してください。
      </p>
      <SearchForm />
    </div>
    <div class="login-users-container">
      <h2>最近のログインから探す</h2>
      <p>最近、サーバにログインした人はどんな人でしょうか？見てみましょう！</p>
      <LoginUserTable />
    </div>
    <div class="adminstrators-users-container">
      <h2>運営メンバーから探す</h2>
      <p>
        jao Minecraft Serverの運営メンバーはどんな人でしょう？見てみましょう！
      </p>
      <AdminstratorsUsersTable />
    </div>
    <div>
      <h2>その他</h2>

      <ul>
        <li>
          複数ユーザーのヒートマップ: <nuxt-link to="/heatmaps">見る</nuxt-link>
        </li>
      </ul>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import SearchForm from '@/components/SearchForm.vue'
import LoginUserTable from '@/components/LoginUserTable.vue'
import AdminstratorsUsersTable from '@/components/AdminstratorsUsersTable.vue'

export default Vue.extend({
  name: 'IndexPage',
  components: {
    SearchForm,
    LoginUserTable,
    AdminstratorsUsersTable,
  },
  mounted() {
    try {
      this.$recaptcha.init()
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('reCAPTCHA Error', e)
    }
  },
})
</script>
