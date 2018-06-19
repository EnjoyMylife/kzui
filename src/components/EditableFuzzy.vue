<template>
        <span :tabindex="tabindex" @focus="handlerFocus" class="kz-fuzzy-fit" @click="handlerEdit"  >
            <span  v-show="!eidt">{{inputValue}}</span>
            <span class="edits" v-show="eidt">
                <kz-fuzzy @end="handlerEnd" ref="input" 
                :set-val="setVal" 
                :match="match"
                :fitcount="fitcount"
                 style="width: 100%;height:100%"
                   @keyup="handlerKeyup"  
                   @change="handlerChange" 
                   @keydown="handlerKeydown" 
                   v-model="inputValue" 
                   :data="data" 
                :options="options">
                    <slot v-if="$slots.default"></slot>
                    <slot v-if="$slots.btn" slot="btn" name="btn"></slot>
                </kz-fuzzy>
            </span>
        </span>
</template>

<script>
import KzFuzzy from "./Fuzzy.vue";
import Clickoutside from "../lib/clickoutside";
export default {
  name: "kz-editable-fuzzy",
  data() {
    return {
      eidt: false
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
    },
    tabindex: {
      type: Number,
      default:0
    }
  },
  components: {
    KzFuzzy
  },
  directives: { Clickoutside },
  mounted() {
  },
  methods: {
    handlerFocus(e){
      this.eidtCell();
    },
    eidtCell() {
      this.handlerEdit();
      this.$refs.input.togleFold();
    },
    handlerEdit() {
      this.eidt = true;
      // setTimeout(() => {
      //   this.$children[0].$refs.sercheInput.focus();
      // }, 1);
    },
    handlerEnd() {
      if(this.eidt){
         this.eidt = false;
        this.$emit("end",this);
      }
     
    },
    handlerKeyup(e){
      this.$emit("keyup", e);
    },
    handlerChange(e) {
      this.$emit("change", { e: e, handlerEnd: this.handlerEnd });
    },
    handlerKeydown(e) {
      this.$emit("keydown", { e: e, handlerEnd: this.handlerEnd });
    }
  }
};
</script>

<style>
.kz-fuzzy-fit {
  display: inline-block;
  width: 100%;
  height: 100%;
}
.kz-fuzzy-fit .edits {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0px;
  top: 0px;
}
</style>
