const downloadUrl = url => {
  let iframe = document.createElement('iframe');
  iframe.style.display = 'none'
  iframe.src = url
  iframe.onload = function () {
    document.body.removeChild(iframe)
  }
  document.body.appendChild(iframe)
};
module.exports=downloadUrl;
