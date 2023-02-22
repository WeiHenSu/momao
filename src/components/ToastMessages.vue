<template>
    <div class="toastPosition toast-container">
      <Toast v-for="(msg, key) in messages" :key="key"
        :msg="msg"
      />
    </div>
</template>

<script>
import Toast from '@/components/ToastComponent.vue'
export default {
  components: { Toast },
  data () {
    return {
      messages: []
    }
  },
  inject: ['emitter'],
  mounted () {
    this.emitter.on('push-message', (message) => {
      const { style = 'success', title, content } = message
      this.messages.push({ style, title, content })
    })
  }
}
</script>

<style>
  .toastPosition {
    position: absolute;
    right: 0;
    top: 0;
    transform: translateX(50%);
  }
</style>
