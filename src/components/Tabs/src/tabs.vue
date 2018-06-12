<script>
export default {
  name: 'KzTabs',

  props: {
    activeName: String,
    closable: Boolean,
    value: {}
  },

  data () {
    return {
      currentName: this.value || this.activeName,
      panels: []
    }
  },

  watch: {
    value(value) {
      this.setCurrentName(value)
    },
    activeName(value) {
      this.setCurrentName(value)
    }
  },

  methods: {
    addPanels: function(item) {
      var index = this.$slots.default.filter(item => {
        return item.elm.nodeType === 1 && /\bkz-tab-panel\b/.test(item.elm.className)
      }).indexOf(item.$vnode)
      this.panels.splice(index, 0, item)
    },
    removePanels: function(item) {
      const panels = this.panels
      const index = panels.indexOf(item)
      if (index > -1) {
        panels.splice(index, 1)
      }
    },
    handleTabClick: function (tab, tabName, ev) {
      this.setCurrentName(tabName)
      this.$emit('tab-click', tab, ev)
    },
    handleTabRemove: function(tab, ev) {
      ev.stopPropagation()
      this.$emit('tab-remove', tab.name)
    },
    setCurrentName: function (value) {
      this.currentName = value
      this.$emit('input', value)
    }
  },

  render(h) {
    var {
      panels,
      handleTabClick,
      datas,
      handleTabRemove,
      currentName,
      closable
    } = this

    const navData = {
      props: {
        onTabClick: handleTabClick,
        onTabRemove: handleTabRemove,
        panels,
        currentName,
        closable
      },
      ref: 'nav'
    }

    const header = (
      <div class="kz-tabs__header">
        <kz-tab-nav {...navData}></kz-tab-nav>
      </div>
    )

    return (
      <div class='kz-tabs'>
        { header }
        <div class='kz-tabs__content'>{this.$slots.default}</div>
      </div>
    )
  },

  // created() {
  //   if (!this.currentName) {
  //     this.setCurrentName('0')
  //   }
  // }
}
</script>

<style scoped>

</style>
