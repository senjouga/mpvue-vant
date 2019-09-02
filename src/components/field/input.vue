<template>
  <div
    class="c-input fs-13" :class="{'labelSty': label,'vux-1px-b': vb, 'input_focus': vb&&isFocus}">
    <slot name="left-icon">
      <div class="icon" v-if="ltype">
        <Icon :type="ltype" :size="size" :fontColor="fontColor" :font="font"></Icon>
      </div>
    </slot>
    <slot name="label">
      <span :style="{width: width + 'vw'}" v-if="label" class="left fs-14"><span v-if="required" class="required-icon">*</span>{{label}}</span>
    </slot>
    <div class="value fs-14" :class="{'rightIcon': rsrc || clearable, 'leftIcon': ltype, 'border': border}">
      <input @focus="focusAction" @blur="blurAction" :style="{textAlign: align}" v-if="!isPwd" :placeholder="placeholder" v-model="currentValue"/>
      <input @focus="focusAction" @blur="blurAction" :style="{textAlign: align}" v-else-if="isPwd" type="password" :placeholder="placeholder" v-model="currentValue"/>
      <input @focus="focusAction" @blur="blurAction" :style="{textAlign: align}" v-else-if="isEmail" type="password" :placeholder="placeholder" v-model="currentValue"/>
      <slot name="righticon">
        <div class="icon" v-if="rsrc">
          <img :src="rsrc" alt="">
        </div>
      </slot>
      <div class="rightlabel" v-if="rightlabel" @click="$emit('rightFun')">
        <slot name="rightlabel">
        </slot>
      </div>
      <div class="c-icon" @click="clear" v-if="showClear && currentValue">
        <!--{{showClear}}-->
        <span class="iconfont iconshanchu1"></span>
      </div>
    </div>
  </div>
</template>
<script>
import Icon from '@/components/Icon'
import throttle from '@/utils/throttle'
export default {
  name: 'input',
  components: {
    Icon
  },
  props: {
    type: {
      type: String,
      default: 'text'
    },
    placeholder: String,
    value: String | Number,
    label: String,
    clearable: {
      type: Boolean,
      default: false
    },
    vb: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    ltype: String,
    rtype: String,
    size: String | Number,
    font: String,
    fontColor: {
      type: String,
      default: '#0099CC'
    },
    isPwd: Boolean,
    isEmail: Boolean,
    width: {
      type: String,
      default: '20'
    },
    align: {
      type: String,
      default: 'left'
    },
    required: Boolean,
    rightlabel: Boolean
  },
  data () {
    return {
      currentValue: this.value,
      rsrc: '',
      showClear: this.clearable,
      isFocus: false
    }
  },
  // onUnload () {
  //   this.currentValue = ''
  // },
  computed: {
    currentSize () {
      let size = this.size
      return size ? `${size / 375 * 100}vw` : 'auto'
    }
  },
  methods: {
    clear () {
      this.currentValue = ''
      this.showClear = false
      this.$emit('update:value', '')
    },
    focusAction () {
      this.isFocus = true
    },
    blurAction () {
      this.isFocus = false
    }
  },
  watch: {
    currentValue: throttle(async function (v) {
      if (v && this.clearable) this.showClear = true
      this.$emit('update:value', v)
    }, 300),
    value (v) {
      this.currentValue = v
    }
  }
}
</script>

<style lang="less">
.c-input {
  flex-shrink: 0;
  display: flex;
  background: #fff;
  padding: 5px;
  box-sizing: border-box;
  line-height: 24px;
  width: 100%;
  align-items: center;
  border-bottom: 1rpx solid #E4E4E4;
  transition: border .3s ease-in-out;
  .value{
    display: flex;
    position: relative;
    align-items: center;
    width: 100%;
    input{
      display: block;
      box-sizing: border-box;
      width: 100%;
      margin: 0;
      padding: 0 5px;
      color: @default-p;
      background-color: transparent;
      border: 0;
      resize: none;
      min-height: 27px;
      height: 27px;
    }
    .rightIcon{
      flex-shrink: 0;
    }
  }
  .leftIcon{
    input{
      padding: 0 @gap;
    }
  }
  .border{
    padding:0 5px;
    box-sizing: border-box;
    background: #fff;
    border: 0.5px solid #E4E4E4;
    border-radius: 2px;
  }
  .c-icon{
    width: 7.2vw;
    height: 7.2vw;
  }
  .required-icon {
    color: #d0021b;
  }
  &.input_focus {
    border-color: @button-color;
  }
  .c-icon .iconshanchu1 {
  }
}
.labelSty .left{
  color: @list-title;
  width:20vw;
  margin-right: @gap;
  box-sizing: border-box;
}
</style>
