<template>
  <el-dialog :visible="show" ref="dialog" :before-close="cancel">
    <div slot="footer">
      <el-button type="primary" @click="onConfirm" size="mini"> 确定</el-button>
      <el-button type="primary" size="mini" @click="cancel"> 取消</el-button>
    </div>
    <el-upload
      class="upload-demo"
      action="http://localhost:9010/table/uploadFile"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      multiple
      :limit="1"
      :on-exceed="handleExceed"
      :file-list="fileList" ref="elupload">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </el-dialog>
</template>

<script>
  import {deleteFile,uploadFile} from '@/api/table'
  // import store from '@/store'
  export default {
    name: "upload",
    props: ['showdia'],
    data() {
      return {
        fileList: []
      };
    },
    computed: {
      show() {
        if(this.$refs.elupload&&!this.showdia)
        {
          this.$refs.elupload.uploadFiles.length=0;
        }
        return this.showdia;
      }
    },
    // created(){
    //   // this.$refs.elupload.uploadFiles.length=0;
    // },
    methods: {

      cancel() {
        this.$refs.dialog.close();
        this.$emit('upload');
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
        var newfilename = file.response.file.newfilename;
        deleteFile({filename: newfilename}).then(() => {
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 1000
          })
        })
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      onConfirm() {
        let file={};
        if(this.$refs.elupload.uploadFiles.length>0){
          var uploadFile = this.$refs.elupload.uploadFiles[0].response.file;
          file = {
            newFileName: uploadFile.newfilename,
            oldFileName: uploadFile.originalname
          };
          this.$store.dispatch('ConfirmUpload',file).then((res)=>{
            this.$message({
              message: '添加成功',
              type: 'success',
              duration: 1000
            });
            file['attId'] = res.num;
            this.$emit('confirm', file);
            this.cancel();
          }).catch((err)=>{
            this.$message({
              message: err,
              type: 'success',
              duration: 1000
            })
          })
        }


      },
      uploadFile(file) {
        let form = new FormData();
        form.append('file',file);
        uploadFile(form);
      }
    }
  }
</script>

<style scoped>

</style>
