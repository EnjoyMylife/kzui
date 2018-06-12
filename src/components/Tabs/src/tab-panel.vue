<template>
  <div
    class="kz-tab-panel"
    v-show="active"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'KzTabPanel',

  props: {
    label: String,
    name: String
  },

  computed: {
    active() {
      return this.$parent.currentName === this.name
    }
  },

  mounted() {
    this.$parent.addPanels(this)
  },

  destroyed() {
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
    this.$parent.removePanels(this)
  }
}
</script>

<style scoped>

</style>
