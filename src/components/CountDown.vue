<template>
  <span >
      {{content}}
  </span>
</template>
<script>
export default {
  name: "kz-countdown",
  data() {
    return {
      timer: null,
      content: ""
    };
  },
  props: {
    endTime: {
      type: Number,
      default: 0
    },
    endText: {
      type: String,
      default: "00:00:00"
    },
    callback: {
      type: Function,
      default: function(e) {}
    }
  },
  watch: {
    endTime: function(val, old) {
      if (val != old) {
        try {
          clearInterval(this.timer);
        } catch (e) {
        }
        this.countdowm(val);
      }
    }
  },
  mounted() {
    this.countdowm(this.endTime);
  },
  methods: {
    countdowm(timestamp) {
      let self = this;
      //console.log(timestamp)
      self.timer = setInterval(function() {
        let nowTime = new Date();
        let endTime = new Date(timestamp * 1000);
        let t = endTime.getTime() - nowTime.getTime();
        if (t > 0) {
          let day = Math.floor(t / 86400000),
            hour = Math.floor((t / 3600000) % 24),
            min = Math.floor((t / 60000) % 60),
            sec = Math.floor((t / 1000) % 60);
          hour = hour < 10 ? "0" + hour : hour;
          min = min < 10 ? "0" + min : min;
          sec = sec < 10 ? "0" + sec : sec;
          let format = "";
          if (day > 0) {
            format = `${day}天${hour}:${min}:${sec}`;
          } else {
            format = `${hour}:${min}:${sec}`;
          }
          self.content = format;
        } else {
          try {
            clearInterval(self.timer);
          } catch (e) {}
          self.content = self.endText;
          self._callback();
        }
      }, 1000);
    },
    _callback() {
      if (this.callback && this.callback instanceof Function) {
        this.callback(...this);
      }
    }
  }
};
</script>