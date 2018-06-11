<template>
<div class="kz-content-warp" >
	<section class="kz-content-header">
		<h1>
			{{title}}
		</h1>
        <slot name="header"></slot>
	</section>
	<section class="kz-content">
		<slot></slot>
	</section>
</div>
</template>

<script>
export default {
  name:'kz-frame-warp',
  props: ["title"]
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
}

.kz-content {
  position: relative;
  border-radius: 3px;
  background: #ffffff;
  border-top: 3px solid #d2d6de;
  margin-bottom: 20px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  margin: 15px;
  padding: 15px;
}
</style>
