<template>
  <div class="link-container">
    <h2>外部リンク</h2>

    <ul>
      <li v-for="item in items" :key="item.text">
        {{ item.text }}:
        <a :href="item.url">{{ getMinecraftID }}</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { DataStore } from '@/store'

interface ExternalLink {
  text: string
  url: string
}

interface DataType {
  items: ExternalLink[]
}

export default Vue.extend({
  name: 'ExternalLinks',
  data(): DataType {
    return {
      items: [
        {
          text: 'MCBans',
          url: `http://mcbans.com/player/${DataStore.getUUID}/`,
        },
        {
          text: 'Japan Minecraft Servers',
          url: `https://minecraft.jp/${DataStore.getUUID}`,
        },
        {
          text: 'NameMC',
          url: `https://ja.namemc.com/profile/${DataStore.getUUID}`,
        },
      ],
    }
  },
  computed: {
    getMinecraftID() {
      return DataStore.getMinecraftID
    },
  },
})
</script>

<style lang="scss">
.link-container {
  ul {
    padding-left: 20px;

    li {
      padding: 4px;
    }
  }
}
</style>
