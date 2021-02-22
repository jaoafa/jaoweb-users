/* eslint-disable vue/no-v-html */
<!-- https://cr-vue.mio3io.com/examples/modal.html#%E3%82%BD%E3%83%BC%E3%82%B9%E3%82%B3%E3%83%BC%E3%83%89 -->
<template>
  <transition name="modal" appear>
    <div class="modal modal-overlay" @click.self="$emit('close')">
      <div class="modal-window">
        <div class="modal-content">
          <h3 v-if="getTitle != null">{{ getTitle }}</h3>
          <p v-if="getMessage != null" v-html="getMessage" />
          <slot v-if="getMessage == null" />
        </div>
        <footer class="modal-footer">
          <slot name="footer">
            <button @click="close()">Close</button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue'
import { DataStore } from '@/store'
export default Vue.extend({
  name: 'ModalWindow',
  computed: {
    getTitle() {
      return DataStore.getModalTitle
    },
    getMessage() {
      return DataStore.getModalMessage
    },
  },
  methods: {
    close() {
      DataStore.closeModal()
      this.$emit('close')
    },
  },
})
</script>

<style lang="scss" scoped>
.modal {
  &.modal-overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 30;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }

  &-window {
    background: #fff;
    border-radius: 4px;
    overflow: hidden;
  }

  &-content {
    padding: 10px 20px;
  }

  &-footer {
    background: #ccc;
    padding: 10px;
    text-align: right;
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.4s;

  .modal-window {
    transition: opacity 0.4s, transform 0.4s;
  }
}

.modal-leave-active {
  transition: opacity 0.6s ease 0.4s;
}

.modal-enter,
.modal-leave-to {
  opacity: 0;

  .modal-window {
    opacity: 0;
    transform: translateY(-20px);
  }
}
</style>
