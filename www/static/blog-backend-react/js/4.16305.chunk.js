(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{612:function(e,t,a){"use strict";a.r(t);var n=a(30),i=(a(86),a(24)),l=(a(359),a(82)),r=(a(360),a(173)),o=(a(161),a(93)),s=a(25),c=a(26),u=a(29),p=a(27),h=a(28),f=(a(366),a(80)),d=(a(365),a(111)),m=(a(165),a(56)),g=a(1),v=a.n(g),b=a(78),y=a(376),E=a(79),C=(a(824),a(91)),k=(a(826),a(4)),w=a.n(k),O=a(828),j=a.n(O),x=a(829);x.registerLanguage("css",a(830)),x.registerLanguage("json",a(831)),x.registerLanguage("less",a(832)),x.registerLanguage("scss",a(833)),x.registerLanguage("javascript",a(834)),x.registerLanguage("typescript",a(835));var I=x;j.a.setOptions({renderer:new j.a.Renderer,gfm:!0,tables:!0,breaks:!1,pedantic:!1,sanitize:!1,smartLists:!0,smartypants:!1,highlight:function(e){return I.highlightAuto(e).value}});var S=new j.a.Renderer;S.paragraph=function(e){return"<p>".concat(e,"</p>")},S.link=function(e,t,a){return"<a href=".concat(e,"\n      title=").concat(t||e,"\n      target='_blank'\n      }>").concat(a,"</a>")};var _=function(e){return"string"!=typeof e?"":j()(e,{renderer:S})};function L(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",i=e.value;if(e.selectionStart||0===e.selectionStart){var l=e.selectionStart,r=e.selectionEnd,o=e.scrollTop;l===r?(e.value=i.substring(0,l)+t+a+n+i.substring(r,i.length),e.selectionStart=l+t.length,e.selectionEnd=r+t.length+a.length):(e.value=i.substring(0,l)+t+i.substring(l,r)+n+i.substring(r,i.length),e.selectionStart=l+t.length,e.selectionEnd=r+t.length),e.focus(),o>=0&&(e.scrollTop=o)}}var N={h1:function(e){L(e,"# ","\u4e00\u7ea7\u6807\u9898")},h2:function(e){L(e,"## ","\u4e8c\u7ea7\u6807\u9898")},h3:function(e){L(e,"### ","\u4e09\u7ea7\u6807\u9898")},h4:function(e){L(e,"#### ","\u56db\u7ea7\u6807\u9898")},image:function(e,t){L(e,"![alt](",t||"url",")")},link:function(e){L(e,"[title](","url",")")},code:function(e){L(e,"```","language","\n\n```")},tab:function(e){L(e,"  ")}},A=function(e,t,a){return N[t](e,a)},U=83,T=90,V=89,M=9,R=(a(836),a(838),a(375),a(334)),H=(a(1197),a(1196)),D=(a(355),a(10)),F=a(337),K=(a(48),a(159)),$=a(193),P=a(204),W=function(e){function t(){var e,a;Object(s.a)(this,t);for(var i=arguments.length,l=new Array(i),r=0;r<i;r++)l[r]=arguments[r];return(a=Object(u.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(l)))).state={visibleUpload:!1,imageUrl:"",fileList:a.props.defaultFileList,previewImage:"",previewVisible:!1,uploadImg:{},delModalVisible:!1,deleteTitle:"",deletefile:{}},a.handleChange=function(e){console.log("info",e),a.setState({fileList:Object(F.a)(e.fileList)}),"uploading"!==e.file.status&&"done"===e.file.status&&a.setState({uploadImg:Object(n.a)({},e.file.response.data,{uid:e.file.uid})})},a.handlePreview=function(e){a.setState({previewImage:e.url||e.thumbUrl,previewVisible:!0})},a.onConfirmUpload=function(){(0,a.props.onOk)(a.state.fileList.map(function(e){return Object(n.a)({},e.response.data,{url:$.a.serverHost+e.response.data.url})}))},a.onRemove=function(e){console.log("params",e);var t="\u786e\u5b9a\u8981\u5220\u9664\u56fe\u7247 ".concat(e.response?e.response.data.orgname:"","\u5417"),i=null;if(e.response)i=Object(n.a)({},e.response.data,{uid:e.uid});else{var l=e.url.indexOf("/uploads"),r=e.url.substring(l);i=Object(n.a)({},e,{url:r}),console.log("deletefile",i)}return a.setState({deletefile:i,deleteTitle:t,delModalVisible:!0}),!1},a.onRemoveConfirm=function(){var e=a.state.deletefile.url;Object(K.c)(e).then(function(){a.setState(function(e){var t=0;e.fileList.forEach(function(a,n){console.log("preState.deletefile.uid",e.deletefile.uid),a.uid===e.deletefile.uid&&(t=n)});var a=Object(F.a)(e.fileList);return a.splice(t,1),{fileList:Object(F.a)(a),delModalVisible:!1}}),o.a.success("\u5220\u9664\u6210\u529f\uff01")}).catch(function(e){console.log("UUU"),o.a.error(e)})},a}return Object(h.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){console.log("this.props.defaultFileList",this.props.defaultFileList)}},{key:"upload",value:function(e){console.log("informa",e)}},{key:"render",value:function(){var e=this,t=v.a.createElement("div",null,v.a.createElement(D.a,{type:"plus"}),v.a.createElement("div",{className:"ant-upload-text"},"Upload")),a=this.props,n=a.visible,i=a.onConcel,l=a.maxImgCount;return v.a.createElement(R.a,{title:"\u6587\u4ef6\u4e0a\u4f20",visible:n,onCancel:i,onOk:this.onConfirmUpload},v.a.createElement(H.a,{name:"image",listType:"picture-card",className:"avatar-uploader",fileList:this.state.fileList,action:"".concat($.a.serverHost,"/api/image"),onChange:this.handleChange,onPreview:this.handlePreview,onRemove:this.onRemove},this.state.fileList.length>=l?null:t),v.a.createElement(R.a,{visible:this.state.previewVisible,footer:null,onCancel:function(){return e.setState({previewVisible:!1})}},v.a.createElement("img",{alt:"example",style:{width:"100%"},src:this.state.previewImage})),v.a.createElement(P.a,{handleConfirm:this.onRemoveConfirm,handleCancel:function(){e.setState({delModalVisible:!1})},visible:this.state.delModalVisible,title:"\u5220\u9664",content:this.state.deleteTitle}))}}]),t}(v.a.Component);W.defaultProps={visible:!1,maxImgCount:1,onConcel:function(){},onOk:function(){},defaultFileList:[]};var q=W,z=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(u.a)(this,Object(p.a)(t).call(this,e))).handleChange=function(e){var t=e.target.value;a.saveHistory(t),a.props.onChange(t)},a.insert=function(e){var t=Object(C.a)(a).$vm,n=e.currentTarget?e.currentTarget.getAttribute("data-type"):e;A(t,n),console.log("$vm.value",t.value),a.props.onChange(t.value),a.saveHistory(t.value)},a.handleInsertImg=function(e){console.log("onOk"),a.setState({visibleUpload:!1});var t=Object(C.a)(a).$vm,n=e[0].url;A(t,"image",n),a.props.onChange(t.value),a.saveHistory(t.value)},a.undo=function(){var e=a.state.f_history,t=a.state.f_history_index;if(!((t-=1)<0)){a.setState({f_history_index:t});var n=e[t];a.props.onChange(n),a.handleLineIndex(n)}},a.redo=function(){var e=a.state.f_history,t=a.state.f_history_index;if(!((t+=1)>=e.length)){a.setState({f_history_index:t});var n=e[t];a.props.onChange(n),a.handleLineIndex(n)}},a.preview=function(){a.setState({preview:!a.state.preview})},a.expand=function(){a.setState({expand:!a.state.expand})},a.save=function(){a.props.onSave()},a.focusText=function(){Object(C.a)(a).$vm.focus()},a.getMarkedHtml=function(){var e=a.props.value;return _(e)},a.$vm=null,a.handleEditorRef=function(e){a.$vm=e},a.state={visibleUpload:!1,preview:!1,expand:!1,f_history:[],f_history_index:0,line_index:1},a}return Object(h.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e;(e=this).$vm.addEventListener("keydown",function(t){if(t.ctrlKey||t.metaKey||t.altKey||t.shiftKey){if((t.ctrlKey||t.metaKey)&&!t.altKey&&!t.shiftKey)switch(t.keyCode){case T:t.preventDefault(),e.undo();break;case V:t.preventDefault(),e.redo();break;case U:t.preventDefault(),e.save()}}else switch(t.keyCode){case M:t.preventDefault(),e.insert("tab")}})}},{key:"componentWillUpdate",value:function(e,t){var a=this.state.f_history;e.value&&0===t.f_history.length&&(a.push(e.value),this.setState({f_history:a}),this.handleLineIndex(e.value))}},{key:"componentWillReceiveProps",value:function(e){e.value!==this.props.value&&this.handleLineIndex(e.value)}},{key:"saveHistory",value:function(e){var t=this,a=this.state,n=a.f_history,i=a.f_history_index;window.clearTimeout(this.currentTimeout),this.currentTimeout=setTimeout(function(){i<n.length-1&&n.splice(i+1),n.length>=20&&n.shift(),i=n.length,n.push(e),t.setState({f_history:n,f_history_index:i})},500),this.handleLineIndex(e)}},{key:"handleLineIndex",value:function(e){var t=e?e.split("\n").length:1;this.setState({line_index:t})}},{key:"render",value:function(){var e=this,t=this.state,a=t.preview,n=t.expand,i=t.line_index,l=this.props.value;console.log("markValue",this.props);var r=w()({"for-panel":!0,"for-preview-hidden":!a}),o=w()({"for-panel":!0}),s=w()({"for-active":a}),c=w()({"for-container":!0,"for-fullscreen":n}),u=w()({"for-active":n}),p=w()({"for-line-num":!0,hidden:!this.props.lineNum}),h="";try{a&&(h=_(l))}catch(f){console.log(f)}return v.a.createElement("div",{className:c,style:{height:this.props.height}},v.a.createElement("div",{className:"for-controlbar"},v.a.createElement("ul",null,v.a.createElement("li",{onClick:this.undo,title:"\u4e0a\u4e00\u6b65 (ctrl+z)"},v.a.createElement("i",{className:"foricon for-undo"})),v.a.createElement("li",{onClick:this.redo,title:"\u4e0b\u4e00\u6b65 (ctrl+y)"},v.a.createElement("i",{className:"foricon for-redo"})),v.a.createElement("li",{"data-type":"h1",onClick:this.insert,title:"\u4e00\u7ea7\u6807\u9898"},"H1"),v.a.createElement("li",{"data-type":"h2",onClick:this.insert,title:"\u4e8c\u7ea7\u6807\u9898"},"H2"),v.a.createElement("li",{"data-type":"h3",onClick:this.insert,title:"\u4e09\u7ea7\u6807\u9898"},"H3"),v.a.createElement("li",{"data-type":"h4",onClick:this.insert,title:"\u56db\u7ea7\u6807\u9898"},"H4"),v.a.createElement("li",{"data-type":"image",onClick:function(){e.setState({visibleUpload:!0})},title:"\u56fe\u7247"},v.a.createElement("i",{className:"foricon for-image"})),v.a.createElement("li",{"data-type":"link",onClick:this.insert,title:"\u8d85\u94fe\u63a5"},v.a.createElement("i",{className:"foricon for-link"})),v.a.createElement("li",{"data-type":"code",onClick:this.insert,title:"\u4ee3\u7801\u5757"},v.a.createElement("i",{className:"foricon for-code"}))),v.a.createElement("ul",null,v.a.createElement("li",{className:u,onClick:this.expand},u?v.a.createElement("i",{className:"foricon for-contract"}):v.a.createElement("i",{className:"foricon for-expand"})),v.a.createElement("li",{className:s,onClick:this.preview},s?v.a.createElement("i",{className:"foricon for-eye-off"}):v.a.createElement("i",{className:"foricon for-eye"})))),v.a.createElement("div",{className:"for-editor"},v.a.createElement("div",{className:o,tabIndex:"-1",onFocus:this.focusText},v.a.createElement("div",{className:"for-editor-wrapper"},v.a.createElement("div",{className:"for-editor-block"},function(){for(var e=[],t=0;t<i;t++)e.push(v.a.createElement("li",{key:t+1},t+1));return v.a.createElement("ul",{className:p},e)}(),v.a.createElement("div",{className:"for-editor-content"},v.a.createElement("pre",null,l," "),v.a.createElement("textarea",{ref:this.handleEditorRef,value:l,onChange:this.handleChange,placeholder:this.props.placeholder}))))),v.a.createElement("div",{className:r},v.a.createElement("div",{className:"for-preview for-markdown-preview",dangerouslySetInnerHTML:{__html:h}}))),v.a.createElement(q,{visible:this.state.visibleUpload,onConcel:function(){return e.state.visibleUpload=!1},onOk:this.handleInsertImg}))}}]),t}(v.a.Component);z.defaultProps={placeholder:"\u8bf7\u8f93\u5165\u5185\u5bb9...",lineNum:!0};var G=z,J=a(884),Y=m.a.Option,B=d.a.Group,Q=f.a.Group,X=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(u.a)(this,Object(p.a)(t).call(this,e))).state={visibleUpload:!1,defaultFileList:[]},a.handleSubmit=function(e){e.preventDefault();var t=Object.assign({},a.props.article.singleArticle),n=a.markdownRef.current.getMarkedHtml();t.content=n;var i=new Date,l=y.a.toFormat(i,"yyyy-MM-dd hh:mm:ss");t.date=l,t.type="post",console.log("article",t),t.id?Object(K.a)(t,t.id).then(function(e){e.id&&o.a.success("\u4fee\u6539\u6210\u529f!").then(function(){a.props.history.push("/article/table")})}):Object(K.a)(t).then(function(e){console.log("res",e),console.log("::::\uff01"),e.id&&o.a.success("\u65b0\u589e\u6210\u529f!").then(function(){a.props.history.push("/article/table")})})},a.onChangeStatus=function(e){e.preventDefault()},a.onChangeInput=function(e,t){var n={};n[e]=t.target.value,a.props.changeArticle(n)},a.onChangeRec=function(e){a.props.changeArticle({recommend:e})},a.onChangeTags=function(e){var t=e;console.log("tags",t),a.props.changeArticle({tag:t})},a.onChangeCate=function(e){a.props.changeArticle({category_id:e})},a.onChangeMarkdown=function(e){a.props.changeArticle({markdown:e})},a.confirmUpload=function(e){a.setState({visibleUpload:!1}),e.length>0?a.props.changeArticle({thumb:e[0].url}):a.props.changeArticle({thumb:""})},a.markdownRef=v.a.createRef(),a}return Object(h.a)(t,e),Object(c.a)(t,[{key:"componentWillMount",value:function(){this.props.fetchTags({type:"tag"});var e=J.parse(this.props.location.search).id;e&&this.props.fetchSingleArt({id:e})}},{key:"componentDidMount",value:function(){console.log("props",this.props)}},{key:"render",value:function(){var e=this;console.log("this.props",this.props);var t="\u4e0a\u4f20\u56fe\u7247";this.props.thumb&&(t="\u4fee\u6539\u4e0a\u4f20\u56fe\u7247");var a=this.props.form.getFieldDecorator,n=this.props.tag,o=this.props.tags.map(function(e){return{label:e.name,value:e.id}});return v.a.createElement("div",null,v.a.createElement(l.a,Object.assign({},{labelCol:{xs:{span:24},sm:{span:4}},wrapperCol:{xs:{span:24},sm:{span:20}}},{className:"editForm",onSubmit:this.handleSubmit}),v.a.createElement(l.a.Item,{label:"\u6587\u7ae0\u6807\u9898"},a("title",{initialValue:this.props.title,rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u6807\u9898"}]})(v.a.createElement(r.a,{placeholder:"\u8bf7\u8f93\u5165\u6587\u7ae0\u6807\u9898",autoComplete:"off",onChange:function(t){e.onChangeInput("title",t)}}))),v.a.createElement(l.a.Item,{label:"\u662f\u5426\u8bbe\u4e3a\u7279\u522b\u63a8\u8350"},a("recommend",{initialValue:this.props.recommend})(v.a.createElement(m.a,{onChange:this.onChangeRec},v.a.createElement(Y,{value:"Y"},"\u662f"),v.a.createElement(Y,{value:"N"},"\u5426")))),v.a.createElement(l.a.Item,{label:"\u7f29\u7565\u56fe"},a("thumb",{initialValue:this.props.thumb})(v.a.createElement(i.a,{onClick:function(){e.setState({visibleUpload:!0})}},t))),v.a.createElement(l.a.Item,{label:"\u6587\u7ae0\u5206\u7c7b"},a("category_id",{initialValue:this.props.categoryId})(v.a.createElement(m.a,{onChange:this.onChangeCate},v.a.createElement(Y,{value:1},"tech"),v.a.createElement(Y,{value:2},"life")))),v.a.createElement(l.a.Item,{label:"\u72b6\u6001"},a("status",{initialValue:this.props.status,rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u6587\u7ae0\u72b6\u6001"}]})(v.a.createElement(B,{onChange:function(t){e.onChangeInput("status",t)}},v.a.createElement(d.a,{value:0},"\u8349\u7a3f"),v.a.createElement(d.a,{value:99},"\u53d1\u5e03")))),v.a.createElement(l.a.Item,{label:"\u6807\u7b7e"},a("tag",{initialValue:n})(v.a.createElement(Q,{options:o,onChange:this.onChangeTags}))),v.a.createElement(l.a.Item,{label:"\u6587\u7ae0\u5185\u5bb9"},a("markdown",{initialValue:this.props.markdown})(v.a.createElement(G,{onChange:this.onChangeMarkdown,ref:this.markdownRef}))),v.a.createElement(l.a.Item,{wrapperCol:{xs:{span:24,offset:0},sm:{span:20,offset:4}}},v.a.createElement(i.a,{type:"primary",htmlType:"submit"},"\u786e\u5b9a"))),v.a.createElement(q,{visible:this.state.visibleUpload,onConcel:function(){e.setState({visibleUpload:!1})},onOk:this.confirmUpload,key:this.props.thumb,maxImgCount:1,defaultFileList:this.props.thumb?[{uid:"-1",url:this.props.thumb}]:[]}))}}]),t}(v.a.Component),Z=l.a.create({name:"edit-form"})(X),ee=Object(b.b)(function(e){return{title:e.article.singleArticle.title,sign:e.article.singleArticle.sign,thumb:e.article.singleArticle.thumb,date:e.article.singleArticle.date,status:e.article.singleArticle.status,tag:e.article.singleArticle.tag,article:e.article,tags:e.article.tags,categoryId:e.article.singleArticle.category_id,createTime:e.article.singleArticle.create_time,recommend:e.article.singleArticle.recommend,markdown:e.article.singleArticle.markdown}},function(e){return{changeArticle:function(t){e(Object(E.a)(t))},articleClear:function(t){e(Object(E.b)(t))},fetchTags:function(t){e(Object(E.d)(Object(n.a)({},t)))},fetchSingleArt:function(t){e(Object(E.c)(Object(n.a)({},t)))}}});t.default=ee(Z)},824:function(e,t,a){},826:function(e,t,a){},838:function(e,t,a){}}]);