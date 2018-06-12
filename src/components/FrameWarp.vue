<template>
<div class="kz-content-warp" >
  <kz-tabs v-model="tabIndex" closable @tab-remove="removeTab">
    <kz-tab-panel
      v-for="item in tabData"
      :key="item.name"
      :label="item.title"
      :name="item.name"
    >
      {{item.content}}
    </kz-tab-panel>
  </kz-tabs>
  <div >
    <el-button
      size="small"
      @click="addTab(tabIndex)"
    >
      add tab
    </el-button>
    <el-button
      size="small"
      @click="handleSwitch(2)"
    >
      switch tab2
    </el-button>
  </div>
	<section class="kz-content-header">
		<h1>
			{{title}}
		</h1>
    <!-- <slot name="header"></slot> -->
	</section>
	<section class="kz-tab1-content">
		<slot></slot>
	</section>
</div>
</template>

<script>
export default {
  name:'kz-frame-warp',
  props: ["title", "tabData", "tabIndex", "currentTab"],
  methods:{
    removeTab: function (targetName) {
      let tabs = this.tabsData;
        let activeName = this.tabIndex;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
      console.log(activeName)
      this.tabIndex = activeName;
      this.tabsData = tabs.filter(tab => tab.name !== targetName);
    },
    addTab(targetName) {
        let newTabName = ++this.currentTab + '';
        this.tabsData.push({
          title: 'New Tab',
          name: newTabName,
          content: 'New Tab content'
        });
        this.tabIndex = newTabName;
      },
      handleClick() {
        alert('this btn has been clicked.')
      },
      handleSwitch(tabindex) {
        console.log(tabindex)
        this.tabIndex = tabindex.toString()
      }
  }
};
</script>
<style >
.kz-content-warp {
  margin-left: 0px;
  min-height: 396px;
  background-color: #ecf0f5;
  padding-bottom: 15px;
}
.kz-content-header > h1 {
  font-size: 16px;
  font-family: "微软雅黑";
}
.kz-content-header {
  position: relative;
  padding: 15px 15px 0 15px;
  background-color: #fff;
}

.kz-tab1-content {
  background: #ffffff;
}
</style>
