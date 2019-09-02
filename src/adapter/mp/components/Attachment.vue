<template>
  <div @click="_downFile()" class="attachment">
    <div class="attachment-progress" :style="{width: progress + '%'}"></div>
    <div class="attachment-name">{{fileName}}</div>
    <!-- <div>{{fileType}}</div> -->
    <div>
      <i class="iconfont icon-xiazai"></i>
    </div>
  </div>
</template>

<script>
import DownFileMixin from '@/mixins/downFile'
/**
 * @description 附件查看组件
 */
export default {
  name: 'attchment',
  mixins: [DownFileMixin],
  props: {
    // 附件名称
    fileName: {
      type: String,
      required: true
    },
    // 附件id
    fileId: {
      type: [String, Number],
      required: true
    },
    fileType: {
      type: String,
      required: true,
      validate: (type) => 'doc,xls,ppt,pdf,docx,xlsx,pptx'.split(',').some(v => v === type)
    },
    fileSize: {
      type: Number
    }
  },
  watch: {
    fileId () {
      this.progress = 0
    }
  }
}
</script>

<style lang="less" scoped>
.attachment {
  width: 100%;
  height: 68px;
  border-radius: 4px;
  border: 1px solid #d81e06;
  background-color: #ffffff;
  color: #d81e06;
  font-family: "Ping Fang - SC";
  font-size: 24px;
  line-height: 68px;
  padding: 0 14px;
  box-sizing: border-box;
  margin: 27px 0;
  display: flex;
  position: relative;
  &-progress {
    background-color: rgba(31,164,234,.25);
    position: absolute;
    height: 100%;
    left: 0;
    top: 0;
    bottom: 0;
  }
  &-name {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    display:-webkit-box;  
    -webkit-line-clamp:1;  
    -webkit-box-orient:vertical;  
  }
  .iconfont {
    font-size: 40px;
    margin-left: 10px;
    margin-top:20px;
  }
}
</style>
