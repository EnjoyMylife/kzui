<script>
export default {
  name: 'KzTabNav',

  props: {
    panels: Array,
    currentName: String,
    onTabClick: Function,
    onTabRemove: Function,
    closable: Boolean
  },

  render(h) {
    const {
      currentName,
      panels,
      onTabClick,
      onTabRemove,
      closable
    } = this

    var tabs = this._l(panels, (panel, index) => {
      const tabName = panel.name || panel.index || index
      const tabLabelContent = this.$slots.label || panel.label
      const btnClose = closable ? <span class="icon-close" on-click={(ev) => { onTabRemove(panel, ev); }}>x</span> : null

      return (
        <div
          class={{
            'kz-tab__item': true,
            'is-active': panel.active
          }}
          on-click={(ev) => { onTabClick(panel, tabName, ev) }}
        >
          {tabLabelContent}
          {btnClose}
        </div>
      )
    })

    return (
      <div class="kz-tab__nav">
        { tabs }
      </div>
    )
  }
}
</script>

<style scoped>
.kz-tab__item {
    display: inline-block;
    box-sizing: border-box;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    background-color: #f0f0f0;
    margin-left: -1px;
    height: 29px;
    line-height: 29px;
    border: 1px solid #dedede;
    color: #898989;
    font-size: 13px;
    padding: 0 20px;
  }
  .kz-tab__item.is-active {
    color: #eaedf1;
    background: #ed5565;
    border: 1px solid #ed5565;
  }
  .kz-tab__item .icon-close {
    position: absolute;
    right: 4px;
  }
</style>
