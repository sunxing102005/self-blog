var qiniu = require("qiniu");
const accessKey = think.config("access_key");
const secretKey = think.config("secret_key");
const bucket = think.config("bucket_name");
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
var config = new qiniu.conf.Config();
var bucketManager = new qiniu.rs.BucketManager(mac, config);
const options = {
    scope: bucket
    // expires: 7200
};

var putPolicy = new qiniu.rs.PutPolicy(options);
var uploadToken = putPolicy.uploadToken(mac);
var formUploader = new qiniu.form_up.FormUploader(config);
var putExtra = new qiniu.form_up.PutExtra();
function uploadFile(key, localFile) {
    return new Promise((resolve, reject) => {
        formUploader.putFile(uploadToken, key, localFile, putExtra, function(
            respErr,
            respBody,
            respInfo
        ) {
            if (respErr) {
                throw respErr;
            }
            if (respInfo.statusCode == 200) {
                console.log(respBody);
                resolve(respBody);
            } else {
                console.log(respInfo.statusCode);
                console.log(respBody);
                reject(respBody);
            }
        });
    });
}
function deleteFile(key) {
    return new Promise((resolve, reject) => {
        bucketManager.delete(bucket, key, function(err, respBody, respInfo) {
            if (err) {
                console.log("err", err);
                reject(err);
            } else {
                console.log(respInfo.statusCode);
                console.log("respBody", respBody);
                resolve(respBody);
            }
        });
    });
}
module.exports = { uploadFile, deleteFile };
