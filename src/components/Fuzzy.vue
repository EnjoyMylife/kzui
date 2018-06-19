<template>
  <div  v-clickoutside="handlerEnd" :class="'kz-fuzzy '+(isSelect?'is-focus':'')">
      <input 
        ref="sercheInput"
        @focus="isSelect = true"
        @keydown="handlerKeydown"
        @keyup="handlerKeyup"
         placeholder="请输入字符查询" 
         v-model="inputValue" 
         class="kz-fuzzy-input" 
      type="text" />
      <span class="kz-fuzzy-type">
        <slot v-if="$slots.btn" name="btn"></slot>
        <span @click="togleFold" class="kz-triangle-down" v-else></span>
      </span>    
      <transition
      name="el-zoom-in-top"
     >
      <div v-show="!fold" class="kz-droplist-wrap" :style="'width:'+warpWidth">
        <div  class="popper__arrow" style="left: 35px;"></div>
        <div ref="droplist" class="kz-droplist" >
          <div class="kz-serche-head" v-if="options.length>1"  >
            <span :key="index"  v-for="(item,index) in options" :style="(!item.width?'flex:1;':'')+'width:'+item.width"  >
                {{item.label}}
            </span> 
          </div>
          <div  v-if="filterList.length>0">
            <div 
              @click='handlerClick(item)' 
              @mouseenter='handlerEnter(index)'
              :key="index" v-for="(item,index) in filterList"
               v-if="index<fitcount"
               :class="'kz-list-item '+(current==index?'on':'')" >
               <p style="display:flex;width:100%;height:100%" v-if="options.length>0" >
                 <span :key="index"
                v-for="(opt,index) in options"
                :style="(!opt.width?'flex:1;':'')+'width:'+opt.width" 
                >
                    {{item[opt.prop]}}
                </span>
               </p>
              <span v-else style="flex:1"  >
                  {{item}}
              </span>
            </div>
          </div>
          <div v-else style="text-align:center"  >
              <span style="flex:1">没有匹配的选项</span>
          </div>
        </div>
        <slot></slot>
      </div>  
      </transition>
  </div>
</template>

<script>
import Clickoutside from "../lib/clickoutside";
import scrollIntoView from "../lib/scroll-into-view";
export default {
  name: "kz-fuzzy",
  data() {
    return {
      fold: true,
      current: 0,
      isSelect: false,
      all: true,

    };
  },
  computed: {
    inputValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    },
    filterList() {
      // `this` points to the vm instance
      var key = this.inputValue;
      var data = this.data;
      if (key == "" || this.all) {
        return data;
      }
      return data.filter((item) => {
        return this.match(item);
      });
    },
    warpWidth() {
      let unm = 0,
        ext = "px";
      if (this.options.length > 0) {
        ext = this.getEXt(this.options[0].width) || "px";
        for (let i = 0; i < this.options.length; i++) {
          if (this.options[i].width) {
            unm += parseFloat(this.options[i].width);
          }
        }
      }
      if (unm == 0) {
        return "100%";
      }
      return unm + ext;
    }
  },
  props: {
    value: {},
    fitcount:{
      type:Number,
      default:20
    },
    data: {
      type: Array,
      default: function() {
        return [];
      }
    },
    options: {
      type: Array,
      default: function() {
        return [];
      }
    },
    setVal: {
      type: Function,
      default: function(item) {
        return item;
      }
    },
    match: {
      type: Function,
      default: function(item) {
        return true;
      }
    }
  },
  methods: {
    handlerKeyup(e) {
      this.$emit("keyup", e);
    },
    handlerKeydown(e) {
      if (e.code == "ArrowDown" && !this.fold) {
        this.current =
          (this.current + this.filterList.length + 1) % this.filterList.length;
      }
      if (e.code == "ArrowUp" && !this.fold) {
        this.current =
          (this.current + this.filterList.length - 1) % this.filterList.length;
      }
      if (e.code == "Enter" && !this.fold) {
        if (this.filterList[this.current]) {
          this.rowSelect(this.filterList[this.current]);
        }
      }

      let menu = this.$refs.droplist;
      if (menu) {
        //console.log(this.$refs)
        try {
          if (menu.children.length > 1) {
            let target = this.$refs.droplist.children[1].children[this.current];
          } else {
            let target = this.$refs.droplist.children[0].children[this.current];
          }
          scrollIntoView(menu, target);
        } catch (error) {}
      }
      if (e.code != "Tab" && e.code != "Enter") {
        this.fold = false;
        this.all = false;
      }
      if (e.code == "Tab") {
        this.handlerEnd(e);
      }
      this.$emit("keydown", e);
    },
    rowSelect(row) {
      this.fold = !this.fold;
      this.inputValue = this.setVal(row);
      this.isSelect = true;
      this.$emit("change", row);
    },
    handlerEnd(e) {
      if (this.isSelect) {
        this.fold = true;
        this.isSelect = false;
        this.$emit("end", e);
      }
    },
    handlerEnter(i) {
      this.current = i;
    },
    handlerClick(row) {
      this.rowSelect(row);
    },
    togleFold(e) {
      if (e) {
        try {
          e.preventDefault();
        } catch (err) {}
      }
      this.fold = false;
      this.isSelect = true;
      this.all = true;
      if (!this.fold) {
        setTimeout((e)=>{
           this.$refs.sercheInput.focus();
        },1)
       
      }
    },
    getEXt(str) {
      if (!str || typeof str != "string") {
        return "";
      }
      return str.replace(str.match(/(-?\d+)(\.\d+)?/)[0], "");
    }
  },
  directives: { Clickoutside },
  mounted() {}
};
</script>

<style>
.kz-fuzzy *::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.kz-fuzzy *::-webkit-scrollbar-track-piece {
  background-color: #cccccc;
  -webkit-border-radius: 6px;
}
.kz-fuzzy *::-webkit-scrollbar-thumb:vertical {
  height: 5px;
  background-color: #999999;
  -webkit-border-radius: 6px;
}
.kz-fuzzy *::-webkit-scrollbar-thumb:horizontal {
  width: 5px;
  background-color: #999999;
  -webkit-border-radius: 6px;
}
.kz-fuzzy {
  position: relative;
  width: 180px;
  height: 40px;
  max-width: 100%;
  max-height: 100%;
}

.kz-fuzzy-input {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 100%;
  line-height: 100%;
  outline: none;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
  text-align: inherit;
}
.kz-fuzzy.is-focus .kz-fuzzy-input {
  border-color: #409eff;
}
.kz-droplist-wrap {
  width: 100%;
  position: absolute;
  left: 0px;
  top: 122%;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
  z-index: 100;
}
.kz-droplist {
  border-radius: 5px;
  max-height: 150px;
  overflow: auto;
  background: #fff;
  padding: 3px;
  list-style: none;
  padding: 0px 0 6px;
  margin: 0;
  box-sizing: border-box;
}

.kz-droplist .kz-serche-head {
  background-color: #f5f7fa;
  color: #323232;
  cursor: pointer;
  display: flex;
  padding: 7px 8px;
}
.kz-droplist .kz-list-item {
  padding: 3px 5px;
  margin: 2px 0px;
  display: flex;
  font-size: 14px;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #606266;
  height: 34px;
  line-height: 34px;
  box-sizing: border-box;
  cursor: pointer;
}
.kz-droplist .kz-list-item span,
.kz-droplist .kz-serche-head span {
  display: inline-block;
}
.kz-list-item:hover,
.kz-list-item.on {
  background-color: #f5f7fa;
}

.kz-fuzzy-type {
  position: absolute;
  right: 5px;
  top: 19px;
  margin-top: -13px;
}
.kz-triangle-down {
  padding: 0 5px;
  cursor: pointer;
  display: block;
  height: 100%;
  min-height: 20px;
}
.kz-triangle-down::after {
  content: " ";
  width: 0;
  height: 0;
  display: block;
  border-left: 3px solid transparent;
  border-right: 3px solid transparent;
  border-top: 6px solid rgb(95, 95, 95);
  position: relative;
  top: 8px;
}
.kz-fuzzy .popper__arrow {
  top: -6px;
  left: 50%;
  margin-right: 3px;
  border-top-width: 0;
  border-bottom-color: #ebeef5;
  border-width: 6px;
  filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03));
}
.kz-fuzzy .popper__arrow::after {
  content: " ";
  border-width: 6px;
}
.kz-fuzzy .popper__arrow,
.kz-fuzzy .popper__arrow::after {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
}
</style>
