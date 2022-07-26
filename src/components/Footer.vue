<template>
  <footer>
    <div class="footer-container">
      <div class="logo">
        <AppLogo />
      </div>
      <div class="socials">
        <a href="https://twitter.com/jaoafa">
          <TwitterIcon />
        </a>
        <a href="https://instagr.am/jaoafa">
          <InstagramIcon />
        </a>
        <a href="https://discord.gg/6k8FK78zUy">
          <DiscordIcon />
        </a>
        <a href="https://www.youtube.com/channel/UC92wyJyhqXEMiEROeFJKNKg">
          <YouTubeIcon />
        </a>
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
            'https://github.com/jaoafa/jaoweb-users/releases/tag/' + getTag()
          "
          v-text="getTag()"
        />
        -
        <a
          :href="
            'https://github.com/jaoafa/jaoweb-users/commit/' + getShortHash()
          "
          v-text="getShortHash()"
        />
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  TwitterIcon,
  InstagramIcon,
  DiscordIcon,
  YouTubeIcon,
} from 'vue-simple-icons/dist/vue-simple-icons.cjs.js'

export default Vue.extend({
  name: 'TheFooter',
  components: {
    TwitterIcon,
    InstagramIcon,
    DiscordIcon,
    YouTubeIcon,
  },
  methods: {
    getTag() {
      return process.env.Tag
    },
    getShortHash() {
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
      width: 42px;
      height: 42px;
      border-radius: 50%;
      padding: 10px;

      &:hover {
        background: #535353;
      }
    }

    svg {
      fill: #fff;
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
