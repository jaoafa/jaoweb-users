<template>
  <div>
    <Header />
    <main>
      <Nuxt />
      <ModalWindow v-if="isOpenModal()" />
    </main>
    <Footer />
  </div>
</template>
<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { DataStore } from '~/store'
export default {
  components: {
    Header,
    Footer,
  },
  methods: {
    isOpenModal() {
      return DataStore.getModalMessage != null
    },
  },
}
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
