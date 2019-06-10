var qiniu = require("qiniu");
qiniu.conf.ACCESS_KEY = think.config("access_key");
qiniu.conf.SECRET_KEY = think.config("secret_key");
const bucket_name = think.config("bucket_name");
//构建上传策略函数
function getUptoken(bucket, key) {
    const putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);
    return putPolicy.token();
}
//构造上传函数
function uploadFile(key, localFile) {
    const uptoken = getUptoken(bucket_name, localFile);
    const extra = new qiniu.io.PutExtra();
    qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
        if (!err) {
            // 上传成功， 处理返回值
            console.log(ret.hash, ret.key, ret.persistentId);
        } else {
            // 上传失败， 处理返回代码
            console.log(err);
        }
    });
}
module.exports = { uploadFile };
