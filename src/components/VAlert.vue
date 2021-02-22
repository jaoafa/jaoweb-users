<template>
  <div class="alert" :class="type" v-html="text" />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'VAlert',
  props: {
    text: {
      type: String,
      default: '',
      required: true,
    },
    type: {
      type: String,
      default: 'info',
      required: true,
    },
  },
})
</script>

<style lang="scss" scoped>
.alert {
  border: 1px solid transparent;
  padding: 10px;
  margin-bottom: 1em;
  border-radius: 10px;
  line-height: 1.5em;
  vertical-align: bottom;

  &::before {
    font-family: 'Material Design Icons';
    font-size: 1.7em;
    margin: 5px;
  }

  &.info {
    background: #d1ecf1;
    border-color: #bee5eb;
    color: #0c5460;

    &::before {
      content: '\f02fd';
    }
  }

  &.warn {
    color: #856404;
    background-color: #fff3cd;
    border-color: #ffeeba;

    &::before {
      content: '\f002a';
    }
  }

  &.success {
    color: #155724;
    background-color: #d4edda;
    border-color: #c3e6cb;

    &::before {
      content: '\f0134';
    }
  }

  &.error {
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;

    &::before {
      content: '\f06bd';
    }
  }
}
</style>
