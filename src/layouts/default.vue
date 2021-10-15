<template>
  <div>
    <Header />
    <main>
      <VAlert
        :text="'このサイトではサーババージョン 1.8.8 以前にログインしたユーザーの情報は閲覧できません。'"
        :type="'info'"
      />
      <Nuxt />
      <ModalWindow v-if="isOpen" />
    </main>
    <Footer />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { DataStore } from '@/store'

interface DataType {
  isOpen: boolean
}

export default Vue.extend({
  components: {
    Header,
    Footer,
  },
  data(): DataType {
    return {
      isOpen: false,
    }
  },
  computed: {
    changeModalMessage() {
      return DataStore.getModalMessage
    },
  },
  watch: {
    changeModalMessage() {
      this.$nextTick(() => {
        this.isOpen = DataStore.getModalMessage != null
      })
    },
  },
  created() {
    this.$nextTick(() => {
      this.isOpen = DataStore.getModalMessage != null
    })
  },
})
</script>

<style lang="scss">
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

html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  font-family: 'Roboto', sans-serif;
}

* {
  box-sizing: border-box;
}

@mixin pc {
  main {
    margin: 30px;
  }
}

main {
  margin: 10px;
  line-height: 1.5em;

  h2 {
    border-bottom: 1px solid #21262d;
    margin: 20px 0 10px 0;
  }

  h3 {
    border-bottom: 1px solid #21262d;
  }

  p {
    margin: 15px 0;
  }
}
</style>
