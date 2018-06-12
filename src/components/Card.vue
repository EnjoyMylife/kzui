<template>
  <div :class="'lqb-card lqb-afclear '+curentTheme">
      <div :style="'padding:'+padding+'px'" class="lqb-card-head">
        <slot name="header"></slot>
      </div>
      <div :style="'padding:'+padding+'px'" class="lqb-card-body">
            <slot></slot>
      </div>
</div>
</template>
<script>
export default {
  name:"kz-card",
  computed: {
    padding() {
      return this.space ? this.space : "10";
    },
    curentTheme() {
      return this.theme ? this.theme : "default";
    }
  },
  props: ["space", "theme"]
};
</script>

<style>
.lqb-card-head {
  position: relative;
}
.lqb-card-body {
  position: relative;
}
.lqb-card.default {
  border: 1px solid #efefef;
  margin: 5px;
  box-shadow: 0px 6px 9px rgba(216, 211, 211, 0.5);
  border-radius: 5px;
}
.lqb-card.default .lqb-card-head {
  border-bottom: 1px solid #efefef;
  box-shadow: 0px 2px 5px rgba(240, 240, 240, 0.5);
  font-size: 16px;
  font-weight: bold;
}
</style>
