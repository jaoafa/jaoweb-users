<template>
  <footer>
    <div class="footer-container">
      <div class="logo">
        <AppLogo />
      </div>
      <div class="socials">
        <a class="mdi mdi-twitter" href="https://twitter.com/jaoafa" />
        <a class="mdi mdi-instagram" href="https://instagr.am/jaoafa" />
        <a class="mdi mdi-discord" href="https://discord.com/invite/YjwYEBk" />
        <a
          class="mdi mdi-youtube"
          href="https://www.youtube.com/channel/UC92wyJyhqXEMiEROeFJKNKg"
        />
      </div>
    </div>
    <div class="copyright-version">
      <div class="copyright">
        &copy; 2016-{{ new Date().getFullYear() }} jao Minecraft Server.
      </div>
      <div class="version">
        Version:
        <a
          :href="
            'https://github.com/jaoafa/jaoweb-users/commit/' + getVersion()
          "
        >
          {{ getVersion() }}
        </a>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  methods: {
    getVersion() {
      return process.env.ShortHash
    },
  },
})
</script>

<style lang="scss" scoped>
footer {
  background: #222831;
  width: 100%;
  height: 130px;
  padding: 20px;

  .footer-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  div.logo {
    max-width: 200px;
    width: 50%;
    color: #eee;
  }

  .socials {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    max-width: 250px;
    width: 40%;

    a {
      text-decoration: none;
      font-size: 21px;
      border-radius: 50%;
      padding: 10px;

      &:hover {
        background: #535353;
      }
    }

    .mdi {
      color: #fff;
    }
  }

  .copyright-version {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .copyright {
      color: #fff;
      margin: 10px 0;
    }

    .version {
      color: #fff;
      margin: 10px 0;

      a {
        color: #fff;
      }
    }
  }
}
</style>
