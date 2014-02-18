(function(){var t,l;l="undefined"!=typeof global&&null!==global?global:window,t="undefined"!=typeof global&&null!==global?"node":"browser",l.XmlUtil(l.XmlUtil=function(){function t(){}return t.prototype.getListXmlElements=function(t,l,e){var n,o,s,f,g,r,u,i,a,h;for(null==l&&(l=0),null==e&&(e=t.length-1),i=DocUtils.preg_match_all("<(/?[^/> ]+)([^>]*)>",t.substr(l,e)),r=[],n=a=0,h=i.length;h>a;n=++a)u=i[n],"/"===u[1][0]?(f=!1,r.length>0&&(g=r[r.length-1],s=g.tag.substr(1,g.tag.length-2),o=u[1].substr(1),s===o&&(f=!0)),f?r.pop():r.push({tag:"<"+u[1]+">",offset:u.offset})):"/"===u[2][u[2].length-1]||r.push({tag:"<"+u[1]+">",offset:u.offset});return r},t.prototype.getListDifferenceXmlElements=function(t,l,e){var n;for(null==l&&(l=0),null==e&&(e=t.length-1),n=this.getListXmlElements(t,l,e);;){if(n.length<=1)break;if(n[0].tag.substr(2)!==n[n.length-1].tag.substr(1))break;n.pop(),n.shift()}return n},t}())}).call(this);
(function(){var t,e,a;a="undefined"!=typeof global&&null!==global?global:window,e="undefined"!=typeof global&&null!==global?"node":"browser",a.TemplaterState=t=function(){function t(){}return t.prototype.calcStartTag=function(t){return this.matches[t.start.numXmlTag].offset+this.matches[t.start.numXmlTag][1].length+this.charactersAdded[t.start.numXmlTag]+t.start.numCharacter},t.prototype.calcEndTag=function(t){return this.matches[t.end.numXmlTag].offset+this.matches[t.end.numXmlTag][1].length+this.charactersAdded[t.end.numXmlTag]+t.end.numCharacter+1},t.prototype.initialize=function(){return this.inForLoop=!1,this.inTag=!1,this.inDashLoop=!1,this.textInsideTag=""},t.prototype.startTag=function(){if(this.inTag===!0)throw"Tag already open with text: "+this.textInsideTag;return this.inTag=!0,this.textInsideTag="",this.tagStart=this.currentStep},t.prototype.loopType=function(){return this.inDashLoop?"dash":this.inForLoop?"for":"simple"},t.prototype.endTag=function(){var t;if(this.inTag===!1)throw"Tag already closed";return this.inTag=!1,this.tagEnd=this.currentStep,"#"===this.textInsideTag[0]&&"simple"===this.loopType()&&(this.inForLoop=!0,this.loopOpen={start:this.tagStart,end:this.tagEnd,tag:this.textInsideTag.substr(1)}),"-"===this.textInsideTag[0]&&"simple"===this.loopType()&&(this.inDashLoop=!0,t=/^-([a-zA-Z_:]+) ([a-zA-Z_:]+)$/,this.loopOpen={start:this.tagStart,end:this.tagEnd,tag:this.textInsideTag.replace(t,"$2"),element:this.textInsideTag.replace(t,"$1")}),"/"===this.textInsideTag[0]?this.loopClose={start:this.tagStart,end:this.tagEnd}:void 0},t}()}).call(this);
(function(){var t,e,i,s=[].indexOf||function(t){for(var e=0,i=this.length;i>e;e++)if(e in this&&this[e]===t)return e;return-1};i="undefined"!=typeof global&&null!==global?global:window,e="undefined"!=typeof global&&null!==global?"node":"browser",t=t=function(){function t(t){this.zip=t}var e;return e=["gif","jpeg","jpg","emf","png"],t.prototype.getImageList=function(){var t,i,n,l;l=/[^.]+\.([^.]+)/,i=[];for(n in this.zip.files)t=n.replace(l,"$1"),s.call(e,t)>=0&&i.push({path:n,files:this.zip.files[n]});return i},t.prototype.setImage=function(t,e,i){return null==i&&(i={}),this.zip.remove(t),this.zip.file(t,e,i)},t.prototype.loadImageRels=function(){var t,e,i;return e=DocUtils.decode_utf8(this.zip.files["word/_rels/document.xml.rels"].asText()),this.xmlDoc=DocUtils.Str2xml(e),t=function(){var t,e,s,n;for(s=this.xmlDoc.getElementsByTagName("Relationship"),n=[],t=0,e=s.length;e>t;t++)i=s[t],n.push(parseInt(i.getAttribute("Id").substr(3)));return n}.call(this),this.maxRid=t.max(),this.imageRels=[],this},t.prototype.addExtensionRels=function(t,e){var i,s,n,l,o,a,r,m,p;for(s=DocUtils.decode_utf8(this.zip.files["[Content_Types].xml"].asText()),r=DocUtils.Str2xml(s),i=!0,n=r.getElementsByTagName("Default"),m=0,p=n.length;p>m;m++)o=n[m],o.getAttribute("Extension")===e&&(i=!1);return i?(a=r.getElementsByTagName("Types")[0],l=r.createElement("Default"),l.namespaceURI=null,l.setAttribute("ContentType",t),l.setAttribute("Extension",e),a.appendChild(l),this.setImage("[Content_Types].xml",DocUtils.encode_utf8(DocUtils.xml2Str(r)))):void 0},t.prototype.addImageRels=function(t,e){var i,s,n,l;if(null!=this.zip.files["word/media/"+t])throw"file already exists";return this.maxRid++,s={name:"word/media/"+t,data:e,options:{base64:!1,binary:!0,compression:null,date:new Date,dir:!1}},this.zip.file(s.name,s.data,s.options),i=t.replace(/[^.]+\.([^.]+)/,"$1"),this.addExtensionRels("image/"+i,i),l=this.xmlDoc.getElementsByTagName("Relationships")[0],n=this.xmlDoc.createElement("Relationship"),n.namespaceURI=null,n.setAttribute("Id","rId"+this.maxRid),n.setAttribute("Type","http://schemas.openxmlformats.org/officeDocument/2006/relationships/image"),n.setAttribute("Target","media/"+t),l.appendChild(n),this.setImage("word/_rels/document.xml.rels",DocUtils.encode_utf8(DocUtils.xml2Str(this.xmlDoc))),this.maxRid},t.prototype.getImageByRid=function(t){var e,i,s,n,l,o;for(n=this.xmlDoc.getElementsByTagName("Relationship"),l=0,o=n.length;o>l;l++)if(s=n[l],e=s.getAttribute("Id"),t===e&&(i=s.getAttribute("Target"),"media/"===i.substr(0,6)))return this.zip.files["word/"+i];return null},t}(),i.ImgManager=t}).call(this);
(function(){var e,t,i;i="undefined"!=typeof global&&null!==global?global:window,t="undefined"!=typeof global&&null!==global?"node":"browser","node"===t&&(global.http=require("http"),global.https=require("https"),global.fs=require("fs"),global.vm=require("vm"),global.DOMParser=require("xmldom").DOMParser,global.XMLSerializer=require("xmldom").XMLSerializer,global.PNG=require("../libs/pngjs/png-node"),global.url=require("url"),["grid.js","version.js","detector.js","formatinf.js","errorlevel.js","bitmat.js","datablock.js","bmparser.js","datamask.js","rsdecoder.js","gf256poly.js","gf256.js","decoder.js","qrcode.js","findpat.js","alignpat.js","databr.js"].forEach(function(e){return vm.runInThisContext(global.fs.readFileSync(__dirname+"/../libs/jsqrcode/"+e),e)}),["jszip.js"].forEach(function(e){return vm.runInThisContext(global.fs.readFileSync(__dirname+"/../libs/jszip2.0/dist/"+e),e)})),i.DocxGen=e=function(){function e(e,t,i,n){this.Tags=null!=t?t:{},this.intelligentTagging=null!=i?i:!0,this.qrCode=null!=n?n:!1,this.finishedCallback=function(){},this.localImageCreator=function(e,t){var i;return i=JSZipBase64.decode("iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAIAAABvSEP3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACXSURBVDhPtY7BDYAwDAMZhCf7b8YMxeCoatOQJhWc/KGxT2zlCyaWcz8Y+X7Bs1TFVJSwIHIYyFkQufWIRVX9cNJyW1QpEo4rixaEe7JuQagAUctb7ZFYFh5MVJPBe84CVBnB42//YsZRgKjFDBVg3cI9WbRwXLktQJX8cNIiFhM1ZuTWk7PIYSBhkVcLzwIiCjCxhCjlAkBqYnqFoQQ2AAAAAElFTkSuQmCC"),t(i)},this.filesProcessed=0,this.qrCodeNumCallBack=0,this.qrCodeWaitingFor=[],null!=e&&this.load(e)}var i;return i=["word/document.xml","word/footer1.xml","word/footer2.xml","word/footer3.xml","word/header1.xml","word/header2.xml","word/header3.xml"],e.prototype.qrCodeCallBack=function(e,t){var i;return null==t&&(t=!0),t===!0?this.qrCodeWaitingFor.push(e):t===!1&&(i=this.qrCodeWaitingFor.indexOf(e),this.qrCodeWaitingFor.splice(i,1)),this.testReady()},e.prototype.testReady=function(){return 0===this.qrCodeWaitingFor.length&&this.filesProcessed===i.length?(this.ready=!0,this.finishedCallback()):void 0},e.prototype.logUndefined=function(){},e.prototype.getImageList=function(){return this.imgManager.getImageList()},e.prototype.setImage=function(e,t,i){return this.imgManager.setImage(e,t,i)},e.prototype.load=function(e){return this.zip=new JSZip(e),this.imgManager=new ImgManager(this.zip).loadImageRels()},e.prototype.applyTags=function(e,t){var n,o,l,r,s,a;for(this.Tags=null!=e?e:this.Tags,null==t&&(t=null),l=0,s=i.length;s>l;l++)o=i[l],null==this.zip.files[o]&&this.filesProcessed++;for(r=0,a=i.length;a>r;r++)o=i[r],null!=this.zip.files[o]&&(n=new DocXTemplater(this.zip.files[o].asText(),{DocxGen:this,Tags:this.Tags,intelligentTagging:this.intelligentTagging,qrCodeCallback:t,localImageCreator:this.localImageCreator},this,this.Tags,this.intelligentTagging,[],{},0,t,this.localImageCreator),this.setData(o,n.applyTags().content),this.filesProcessed++);return this.testReady()},e.prototype.setData=function(e,t,i){return null==i&&(i={}),this.zip.remove(e),this.zip.file(e,t,i)},e.prototype.getTags=function(){var e,t,n,o,l,r;for(n=[],l=0,r=i.length;r>l;l++)t=i[l],null!=this.zip.files[t]&&(e=new DocXTemplater(this.zip.files[t].asText(),{DocxGen:this,Tags:this.Tags,intelligentTagging:this.intelligentTagging}),o=e.applyTags().usedTags,DocUtils.sizeOfObject(o)&&n.push({fileName:t,vars:o}));return n},e.prototype.setTags=function(e){return this.Tags=e,this},e.prototype.output=function(e,i){var n;return null==e&&(e=!0),null==i&&(i="output.docx"),n=this.zip.generate(),e&&("node"===t?fs.writeFile(process.cwd()+"/"+i,n,"base64",function(e){if(e)throw e}):document.location.href="data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,"+n),n},e.prototype.getFullText=function(e,t){var i;return null==e&&(e="word/document.xml"),null==t&&(t=""),""===t?(i=this.zip.files[e].asText(),this.getFullText(e,i)):new DocXTemplater(t,{DocxGen:this,Tags:this.Tags,intelligentTagging:this.intelligentTagging}).getFullText()},e.prototype.download=function(e,t,i){var n;return null==i&&(i="default.docx"),n=this.zip.generate(),Downloadify.create("downloadify",{filename:function(){return i},data:function(){return n},onCancel:function(){return alert("You have cancelled the saving of this file.")},onError:function(){return alert("You must put something in the File Contents or there will be nothing to save!")},swf:e,downloadImage:t,width:100,height:30,transparent:!0,append:!1,dataType:"base64"})},e}(),"node"===t&&(module.exports=i.DocxGen)}).call(this);
(function(){var e,n,t=[].slice;n="undefined"!=typeof global&&null!==global?global:window,e="undefined"!=typeof global&&null!==global?"node":"browser",n.DocUtils={},n.docX=[],n.docXData=[],DocUtils.nl2br=function(e){return(e+"").replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,"$1<br>$2")},DocUtils.loadDoc=function(t,r){var o,l,i,a,c,u,s,f,d,p,g,h,m,b,y,D;if(null==r&&(r={}),g=null!=r.docx?!r.docx:!1,o=null!=r.async?r.async:!1,d=null!=r.intelligentTagging?r.intelligentTagging:!1,i=null!=r.callback?r.callback:null,l="",null==t)throw"path not defined";if(-1!==t.indexOf("/")?(b=t,s=b):(s=t,""===l&&null!=DocUtils.pathConfig&&(l="browser"===e?DocUtils.pathConfig.browser:DocUtils.pathConfig.node),b=l+t),p=function(e){return n.docXData[s]=e,g===!1&&(n.docX[s]=new DocxGen(e,{},d)),null!=i&&i(!1),o===!1?n.docXData[s]:void 0},"browser"===e)D=new XMLHttpRequest,D.open("GET",b,o),D.overrideMimeType&&D.overrideMimeType("text/plain; charset=x-user-defined"),D.onreadystatechange=function(){if(4===this.readyState){if(200===this.status)return p(this.response);if(null!=i)return i(!0)}},D.send();else if(f=new RegExp("(https?)","i"),f.test(t)){switch(y=url.parse(t),r={hostname:y.hostname,path:y.path,method:"GET",rejectUnauthorized:!1},u=function(){},m=function(e){var n;return e.setEncoding("binary"),n="",e.on("data",function(e){return n+=e}),e.on("end",function(){return p(n)}),e.on("error",function(){})},y.protocol){case"https:":h=https.request(r,m).on("error",u);break;case"http:":h=http.request(r,m).on("error",u)}h.end()}else if(o===!0)fs.readFile(b,"binary",function(e,n){if(e){if(null!=i)return i(!0)}else if(p(n),null!=i)return i(!1)});else try{a=fs.readFileSync(b,"binary"),p(a),null!=i&&i(!1)}catch(w){c=w,null!=i&&i(!0)}return s},DocUtils.clone=function(e){var n,t,r;if(null==e||"object"!=typeof e)return e;if(e instanceof Date)return new Date(e.getTime());if(e instanceof RegExp)return n="",null!=e.global&&(n+="g"),null!=e.ignoreCase&&(n+="i"),null!=e.multiline&&(n+="m"),null!=e.sticky&&(n+="y"),new RegExp(e.source,n);r=new e.constructor;for(t in e)r[t]=DocUtils.clone(e[t]);return r},DocUtils.xml2Str=function(e){var n,t,r;if(void 0===e)throw"xmlNode undefined!";try{"undefined"!=typeof global&&null!==global?(n=new XMLSerializer,t=n.serializeToString(e)):t=(new XMLSerializer).serializeToString(e)}catch(o){r=o,t=e.xml}return t=t.replace(/\x20xmlns=""/g,"")},DocUtils.Str2xml=function(e){var t,r;return n.DOMParser?(t=new DOMParser,r=t.parseFromString(e,"text/xml")):(r=new ActiveXObject("Microsoft.XMLDOM"),r.async=!1,r.loadXML(e)),r},DocUtils.replaceFirstFrom=function(e,n,t,r){return e.substr(0,r)+e.substr(r).replace(n,t)},DocUtils.encode_utf8=function(e){return unescape(encodeURIComponent(e))},DocUtils.decode_utf8=function(e){var n;try{return void 0===e?void 0:decodeURIComponent(escape(e.replace(new RegExp(String.fromCharCode(160),"g")," ")))}catch(t){throw n=t,console.log("could not decode"),"end"}},DocUtils.base64encode=function(e){return btoa(unescape(encodeURIComponent(e)))},DocUtils.preg_match_all=function(e,n){var r,o;return"object"!=typeof e&&(e=new RegExp(e,"g")),r=[],o=function(){var e,n,o,l,i;return e=arguments[0],o=4<=arguments.length?t.call(arguments,1,i=arguments.length-2):(i=1,[]),n=arguments[i++],l=arguments[i++],o.unshift(e),o.offset=n,r.push(o)},n.replace(e,o),r},DocUtils.sizeOfObject=function(e){var n,t,r;r=0,t=0;for(n in e)r++;return r},Array.prototype.max=function(){return Math.max.apply(null,this)},Array.prototype.min=function(){return Math.min.apply(null,this)}}).call(this);
(function(){var e,t,m;m="undefined"!=typeof global&&null!==global?global:window,t="undefined"!=typeof global&&null!==global?"node":"browser",e=e=function(){function e(e){this.xmlTemplater=e,this.imgMatches=[]}return e.prototype.findImages=function(){return this.imgMatches=DocUtils.preg_match_all(/<w:drawing[^>]*>.*?<\/w:drawing>/g,this.xmlTemplater.content),this},e.prototype.replaceImages=function(){var e,m,o,r,l,a,s,n,i,c,p,d,g,h,x,u,f,w;for(n=[],e=function(e){return e.xmlTemplater.numQrCode--,e.xmlTemplater.DocxGen.setImage("word/media/"+e.imgName,e.data),e.xmlTemplater.DocxGen.qrCodeCallBack(e.num,!1)},f=this.imgMatches,w=[],g=x=0,u=f.length;u>x;g=++x)if(l=f[g],h=DocUtils.Str2xml('<?xml version="1.0" ?><w:document mc:Ignorable="w14 wp14" xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:w10="urn:schemas-microsoft-com:office:word" xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" xmlns:wne="http://schemas.microsoft.com/office/word/2006/wordml" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:wp14="http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing" xmlns:wpc="http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas" xmlns:wpg="http://schemas.microsoft.com/office/word/2010/wordprocessingGroup" xmlns:wpi="http://schemas.microsoft.com/office/word/2010/wordprocessingInk" xmlns:wps="http://schemas.microsoft.com/office/word/2010/wordprocessingShape">'+l[0]+"</w:document>"),this.xmlTemplater.DocxGen.qrCode)d=h.getElementsByTagNameNS("*","blip")[0],void 0===d&&(d=h.getElementsByTagName("a:blip")[0]),void 0!==d?(i=d.getAttribute("r:embed"),s=this.xmlTemplater.DocxGen.imgManager.getImageByRid(i),null!==s?(p=h.getElementsByTagNameNS("*","docPr")[0],void 0===p&&(p=h.getElementsByTagName("wp:docPr")[0]),void 0!==p?"Copie_"!==p.getAttribute("name").substr(0,6)?(r=("Copie_"+this.xmlTemplater.imageId+".png").replace(/\x20/,""),this.xmlTemplater.DocxGen.qrCodeNumCallBack++,this.xmlTemplater.DocxGen.qrCodeCallBack(this.xmlTemplater.DocxGen.qrCodeNumCallBack,!0),a=this.xmlTemplater.DocxGen.imgManager.addImageRels(r,""),this.xmlTemplater.imageId++,this.xmlTemplater.DocxGen.setImage("word/media/"+r,s.data),"browser"===t&&(n[g]=new DocxQrCode(s.asBinary(),this.xmlTemplater,r,this.xmlTemplater.DocxGen.qrCodeNumCallBack)),p.setAttribute("name",""+r),d.setAttribute("r:embed","rId"+a),m=h.getElementsByTagNameNS("*","drawing")[0],void 0===m&&(m=h.getElementsByTagName("w:drawing")[0]),c=DocUtils.xml2Str(m),this.xmlTemplater.content=this.xmlTemplater.content.replace(l[0],c),this.xmlTemplater.numQrCode++,w.push("browser"===t?n[g].decode(e):/\.png$/.test(s.name)?function(t){return function(m){var o,r,l,a,i;return o=JSZip.base64.encode(s.asBinary()),r=new Buffer(o,"base64"),i=new PNG(r),a=function(o){var r;try{return i.decoded=o,n[g]=new DocxQrCode(i,t.xmlTemplater,m,t.xmlTemplater.DocxGen.qrCodeNumCallBack),n[g].decode(e)}catch(l){return r=l,console.log(r),t.xmlTemplater.DocxGen.qrCodeCallBack(t.xmlTemplater.DocxGen.qrCodeNumCallBack,!1)}},l=i.decode(a)}}(this)(r):this.xmlTemplater.DocxGen.qrCodeCallBack(this.xmlTemplater.DocxGen.qrCodeNumCallBack,!1))):w.push(void 0):w.push(void 0)):w.push(void 0)):w.push(void 0);else if(null!=this.xmlTemplater.currentScope.img)if(null!=this.xmlTemplater.currentScope.img[g]){if(r=this.xmlTemplater.currentScope.img[g].name,o=this.xmlTemplater.currentScope.img[g].data,null==this.xmlTemplater.DocxGen)throw"DocxGen not defined";a=this.xmlTemplater.DocxGen.imgManager.addImageRels(r,o),p=h.getElementsByTagNameNS("*","docPr")[0],void 0===p&&(p=h.getElementsByTagName("wp:docPr")[0]),void 0!==p?(this.xmlTemplater.imageId++,p.setAttribute("id",this.xmlTemplater.imageId),p.setAttribute("name",""+r),d=h.getElementsByTagNameNS("*","blip")[0],void 0===d&&(d=h.getElementsByTagName("a:blip")[0]),void 0!==d?(d.setAttribute("r:embed","rId"+a),m=h.getElementsByTagNameNS("*","drawing")[0],void 0===m&&(m=h.getElementsByTagName("w:drawing")[0]),w.push(this.xmlTemplater.content=this.xmlTemplater.content.replace(l[0],DocUtils.xml2Str(m)))):w.push(void 0)):w.push(void 0)}else w.push(void 0);else w.push(void 0);return w},e}(),m.ImgReplacer=e}).call(this);
(function(){var t,e,a;a="undefined"!=typeof global&&null!==global?global:window,e="undefined"!=typeof global&&null!==global?"node":"browser",t=t=function(){function t(t,e,a,r,l){if(this.xmlTemplater=e,this.imgName=null!=a?a:"",this.num=r,this.callback=l,this.data=t,void 0===this.data)throw"data of qrcode can't be undefined";this.base64Data=JSZip.base64.encode(this.data),this.ready=!1,this.result=null}return t.prototype.decode=function(t){var a;return this.callback=t,a=this,this.qr=new QrCode,this.qr.callback=function(){var t;return a.ready=!0,a.result=this.result,t=new a.xmlTemplater.currentClass(this.result,a.xmlTemplater.toJson()),t.applyTags(),a.result=t.content,a.searchImage()},"browser"===e?this.qr.decode("data:image/png;base64,"+this.base64Data):this.qr.decode(this.data,this.data.decoded)},t.prototype.searchImage=function(){var t,e,a;if("gen:"===this.result.substr(0,4))return t=function(e){return function(a){return e.data=a,e.callback(e,e.imgName,e.num),e.xmlTemplater.DocxGen.localImageCreator(e.result,t)}}(this);if(null===this.result||void 0===this.result||"error decoding QR Code"===this.result.substr(0,22))return this.callback(this,this.imgName,this.num);a=function(t){return function(e){return null==e&&(e=!1),e?t.callback(t,t.imgName,t.num):(t.data=docXData[t.result],t.callback(t,t.imgName,t.num))}}(this);try{return DocUtils.loadDoc(this.result,{docx:!1,callback:a,async:!1})}catch(r){return e=r,console.log(e)}},t}(),a.DocxQrCode=t}).call(this);
(function(){var t,e,a,l=[].slice;a="undefined"!=typeof global&&null!==global?global:window,e="undefined"!=typeof global&&null!==global?"node":"browser",t=t=function(){function t(e,a){null==e&&(e=""),null==a&&(a={}),this.tagXml="",this.currentClass=t,this.fromJson(a),this.currentScope=this.Tags,this.templaterState=new TemplaterState}return t.prototype.load=function(t){var e;return this.content=t,this.templaterState.matches=this._getFullTextMatchesFromData(),this.templaterState.charactersAdded=function(){var t,a,l;for(l=[],e=t=0,a=this.templaterState.matches.length;a>=0?a>t:t>a;e=a>=0?++t:--t)l.push(0);return l}.call(this),this.handleRecursiveCase()},t.prototype.getValueFromScope=function(t,e){var a;if(null==t&&(t=this.templaterState.loopOpen.tag),null==e&&(e=this.currentScope),null!=e[t])if("string"==typeof e[t]){if(this.useTag(t),a=DocUtils.encode_utf8(e[t]),-1!==a.indexOf("{")||-1!==a.indexOf("}"))throw"You can't enter { or  } inside the content of a variable"}else a=e[t];else this.useTag(t),a="undefined",this.DocxGen.logUndefined(t,e);return a},t.prototype.getFullText=function(){var t,e;return this.templaterState.matches=this._getFullTextMatchesFromData(),e=function(){var e,a,l,n;for(l=this.templaterState.matches,n=[],e=0,a=l.length;a>e;e++)t=l[e],n.push(t[2]);return n}.call(this),DocUtils.decode_utf8(e.join(""))},t.prototype._getFullTextMatchesFromData=function(){return this.templaterState.matches=DocUtils.preg_match_all("(<"+this.tagXml+"[^>]*>)([^<>]*)</"+this.tagXml+">",this.content)},t.prototype.calcOuterXml=function(t,e,a,l){var n,r;if(n=t.indexOf("</"+l+">",a),-1===n)throw"can't find endTag "+n;if(n+=("</"+l+">").length,r=Math.max(t.lastIndexOf("<"+l+">",e),t.lastIndexOf("<"+l+" ",e)),-1===r)throw"can't find startTag";return{text:t.substr(r,n-r),startTag:r,endTag:n}},t.prototype.findOuterTagsContent=function(){var t,e;return e=this.templaterState.calcStartTag(this.templaterState.loopOpen),t=this.templaterState.calcEndTag(this.templaterState.loopClose),{content:this.content.substr(e,t-e),start:e,end:t}},t.prototype.findInnerTagsContent=function(){var t,e;return e=this.templaterState.calcEndTag(this.templaterState.loopOpen),t=this.templaterState.calcStartTag(this.templaterState.loopClose),{content:this.content.substr(e,t-e),start:e,end:t}},t.prototype.fromJson=function(t){return this.Tags=null!=t.Tags?t.Tags:{},this.DocxGen=null!=t.DocxGen?t.DocxGen:null,this.intelligentTagging=null!=t.intelligentTagging?t.intelligentTagging:!1,this.scopePath=null!=t.scopePath?t.scopePath:[],this.usedTags=null!=t.usedTags?t.usedTags:{},this.imageId=null!=t.imageId?t.imageId:0},t.prototype.toJson=function(){return{Tags:DocUtils.clone(this.Tags),DocxGen:this.DocxGen,intelligentTagging:DocUtils.clone(this.intelligentTagging),scopePath:DocUtils.clone(this.scopePath),usedTags:this.usedTags,localImageCreator:this.localImageCreator,imageId:this.imageId}},t.prototype.forLoop=function(t,e){var a,l,n,r,s,i,h,m;if(null==t&&(t=this.findInnerTagsContent().content),null==e&&(e=this.findOuterTagsContent().content),i=this.currentScope[this.templaterState.loopOpen.tag],l="",null!=i){if("object"==typeof i)for(a=h=0,m=i.length;m>h;a=++h)r=i[a],s=this.calcSubXmlTemplater(t,r),l+=s.content;i===!0&&(s=this.calcSubXmlTemplater(t,this.currentScope),l+=s.content)}else s=this.calcSubXmlTemplater(t,{});if(this.content=this.content.replace(e,l),n=this.calcSubXmlTemplater(this.content),-1!==n.getFullText().indexOf("{"))throw"they shouln't be a { in replaced file: "+n.getFullText()+" (3)";return n},t.prototype.dashLoop=function(t,e){var a,l,n,r,s,i,h,m,o,p,g;for(null==e&&(e=!1),p=this.findOuterTagsContent(),a=p.content,h=p.start,n=p.end,s=this.calcOuterXml(this.content,h,n,t),m=o=0,g=this.templaterState.matches.length;g>=0?g>=o:o>=g;m=g>=0?++o:--o)this.templaterState.charactersAdded[m]-=s.startTag;if(i=s.text,-1===this.content.indexOf(i))throw"couln't find outerXmlText in @content";if(r=i,l=r,this.templaterState.tagEnd={numXmlTag:this.templaterState.loopOpen.end.numXmlTag,numCharacter:this.templaterState.loopOpen.end.numCharacter},this.templaterState.tagStart={numXmlTag:this.templaterState.loopOpen.start.numXmlTag,numCharacter:this.templaterState.loopOpen.start.numCharacter},e===!1&&(this.templaterState.textInsideTag="-"+this.templaterState.loopOpen.element+" "+this.templaterState.loopOpen.tag),e===!0&&(this.templaterState.textInsideTag="#"+this.templaterState.loopOpen.tag),r=this.replaceTagByValue("",r),l===r)throw"innerXmlText should have changed after deleting the opening tag";if(l=r,this.templaterState.textInsideTag="/"+this.templaterState.loopOpen.tag,this.templaterState.tagEnd={numXmlTag:this.templaterState.loopClose.end.numXmlTag,numCharacter:this.templaterState.loopClose.end.numCharacter},this.templaterState.tagStart={numXmlTag:this.templaterState.loopClose.start.numXmlTag,numCharacter:this.templaterState.loopClose.start.numCharacter},r=this.replaceTagByValue("",r),l===r)throw"innerXmlText should have changed after deleting the opening tag";return this.forLoop(r,i)},t.prototype.xmlToBeReplaced=function(t,e,a,l){return t===!0?a:e===!0?"<"+this.tagXml+' xml:space="preserve">'+a+"</"+this.tagXml+">":this.templaterState.matches[l][1]+a+("</"+this.tagXml+">")},t.prototype.replaceXmlTag=function(t,e){var a,l,n,r,s,i,h;if(h=e.xmlTagNumber,l=e.insideValue,s=null!=e.spacePreserve?e.spacePreserve:!0,n=null!=e.noStartTag?e.noStartTag:!1,r=this.xmlToBeReplaced(n,s,l,h),this.templaterState.matches[h][2]=l,i=this.templaterState.matches[h].offset+this.templaterState.charactersAdded[h],this.templaterState.charactersAdded[h+1]+=r.length-this.templaterState.matches[h][0].length,-1===t.indexOf(this.templaterState.matches[h][0]))throw"content "+this.templaterState.matches[h][0]+" not found in content";if(a=t,t=DocUtils.replaceFirstFrom(t,this.templaterState.matches[h][0],r,i),this.templaterState.matches[h][0]=r,a===t)throw"offset problem0: didnt changed the value (should have changed from "+this.templaterState.matches[this.templaterState.tagStart.numXmlTag][0]+" to "+r;return t},t.prototype.replaceTagByValue=function(t,e){var a,l,n,r,s,i,h,m,o,p,g,c,u,S;if(null==e&&(e=this.content),-1===this.templaterState.matches[this.templaterState.tagEnd.numXmlTag][2].indexOf("}"))throw"no closing tag at @templaterState.tagEnd.numXmlTag "+this.templaterState.matches[this.templaterState.tagEnd.numXmlTag][2];if(-1===this.templaterState.matches[this.templaterState.tagStart.numXmlTag][2].indexOf("{"))throw"no opening tag at @templaterState.tagStart.numXmlTag "+this.templaterState.matches[this.templaterState.tagStart.numXmlTag][2];if(a=e,this.templaterState.tagEnd.numXmlTag===this.templaterState.tagStart.numXmlTag)l=this.templaterState.matches[this.templaterState.tagStart.numXmlTag][2].replace("{"+this.templaterState.textInsideTag+"}",t),e=this.replaceXmlTag(e,{xmlTagNumber:this.templaterState.tagStart.numXmlTag,insideValue:l,noStartTag:null!=this.templaterState.matches[this.templaterState.tagStart.numXmlTag].first||null!=this.templaterState.matches[this.templaterState.tagStart.numXmlTag].last});else if(this.templaterState.tagEnd.numXmlTag>this.templaterState.tagStart.numXmlTag){for(h=/^([^{]*){.*$/,m=this.templaterState.matches[this.templaterState.tagStart.numXmlTag][2].match(h),e=null!=this.templaterState.matches[this.templaterState.tagStart.numXmlTag].first||null!=this.templaterState.matches[this.templaterState.tagStart.numXmlTag].last?this.replaceXmlTag(e,{xmlTagNumber:this.templaterState.tagStart.numXmlTag,insideValue:t,noStartTag:null!=this.templaterState.matches[this.templaterState.tagStart.numXmlTag].last}):this.replaceXmlTag(e,{xmlTagNumber:this.templaterState.tagStart.numXmlTag,insideValue:m[1]+t}),r=o=c=this.templaterState.tagStart.numXmlTag+1,u=this.templaterState.tagEnd.numXmlTag;u>=c?u>o:o>u;r=u>=c?++o:--o)this.templaterState.charactersAdded[r+1]=this.templaterState.charactersAdded[r],e=this.replaceXmlTag(e,{xmlTagNumber:r,insideValue:"",spacePreserve:!1});i=/^[^}]*}(.*)$/,l=this.templaterState.matches[this.templaterState.tagEnd.numXmlTag][2].replace(i,"$1"),this.templaterState.charactersAdded[this.templaterState.tagEnd.numXmlTag+1]=this.templaterState.charactersAdded[this.templaterState.tagEnd.numXmlTag],e=this.replaceXmlTag(e,{xmlTagNumber:r,insideValue:l})}for(S=this.templaterState.matches,n=p=0,g=S.length;g>p;n=++p)s=S[n],n>this.templaterState.tagEnd.numXmlTag&&(this.templaterState.charactersAdded[n+1]=this.templaterState.charactersAdded[n]);if(a===e)throw"copycontent=content !!";return e},t.prototype.applyTags=function(){var t,e,a,l,n,r,s,i,h,m,o,p,g,c,u;for(this.templaterState.initialize(),c=this.templaterState.matches,r=i=0,o=c.length;o>i;r=++i)for(l=c[r],e=l[2],n=h=0,p=e.length;p>h;n=++h){for(t=e[n],this.templaterState.currentStep={numXmlTag:r,numCharacter:n},u=this.templaterState.matches,s=m=0,g=u.length;g>m;s=++m)if(a=u[s],r>=s&&this.content[a.offset+this.templaterState.charactersAdded[s]]!==a[0][0])throw"no < at the beginning of "+a[0][0]+" (2)";if("{"===t)this.templaterState.startTag();else if("}"===t){if(this.templaterState.endTag(),"simple"===this.templaterState.loopType()&&this.replaceSimpleTag(),"/"===this.templaterState.textInsideTag[0]&&"/"+this.templaterState.loopOpen.tag===this.templaterState.textInsideTag)return this.replaceLoopTag()}else this.templaterState.inTag===!0&&(this.templaterState.textInsideTag+=t)}return new ImgReplacer(this).findImages().replaceImages(),this},t.prototype.handleRecursiveCase=function(){var t,e,a;return a=function(t){return function(){var e,a,n,r,s;return e=arguments[0],n=4<=arguments.length?l.call(arguments,1,s=arguments.length-2):(s=1,[]),a=arguments[s++],r=arguments[s++],n.unshift(e),n.offset=a,n.first=!0,t.templaterState.matches.unshift(n),t.templaterState.charactersAdded.unshift(0)}}(this),this.content.replace(/^()([^<]+)/,a),e=function(t){return function(){var e,a,n,r,s;return e=arguments[0],n=4<=arguments.length?l.call(arguments,1,s=arguments.length-2):(s=1,[]),a=arguments[s++],r=arguments[s++],n.unshift(e),n.offset=a,n.last=!0,t.templaterState.matches.push(n),t.templaterState.charactersAdded.push(0)}}(this),t="(<"+this.tagXml+"[^>]*>)([^>]+)$",this.content.replace(new RegExp(t),e)},t.prototype.useTag=function(t){var e,a,l,n,r,s;for(l=this.usedTags,s=this.scopePath,e=n=0,r=s.length;r>n;e=++n)a=s[e],null==l[a]&&(l[a]={}),l=l[a];return""!==t?l[t]=!0:void 0},t.prototype.calcIntellegentlyDashElement=function(){return!1},t.prototype.replaceSimpleTag=function(){return this.content=this.replaceTagByValue(this.getValueFromScope(this.templaterState.textInsideTag))},t.prototype.replaceLoopTag=function(){var t;return"dash"===this.templaterState.loopType()?this.dashLoop(this.templaterState.loopOpen.element):this.intelligentTagging===!0&&(t=this.calcIntellegentlyDashElement(),t!==!1)?this.dashLoop(t,!0):this.forLoop()},t.prototype.calcSubXmlTemplater=function(t,e){var a,l;if(a=this.toJson(),null!=e&&(a.Tags=e,a.scopePath=a.scopePath.concat(this.templaterState.loopOpen.tag)),l=new this.currentClass(t,a),l.applyTags(),-1!==l.getFullText().indexOf("{"))throw"they shouln't be a { in replaced file: "+l.getFullText()+" (1)";return this.imageId=l.imageId,l},t}(),a.XmlTemplater=t}).call(this);
(function(){var t,n,e,l={}.hasOwnProperty,o=function(t,n){function e(){this.constructor=t}for(var o in n)l.call(n,o)&&(t[o]=n[o]);return e.prototype=n.prototype,t.prototype=new e,t.__super__=n.prototype,t};e="undefined"!=typeof global&&null!==global?global:window,n="undefined"!=typeof global&&null!==global?"node":"browser",t=t=function(t){function n(t,e){if(null==t&&(t=""),null==e&&(e={}),n.__super__.constructor.call(this,"",e),this.currentClass=n,this.tagXml="w:t","string"!=typeof t)throw"content must be string!";this.load(t)}var e;return o(n,t),e=new XmlUtil,n.prototype.calcIntellegentlyDashElement=function(){var t,l,o,r,s,a,i,c;for(c=this.findOuterTagsContent(),t=c.content,r=c.start,l=c.end,o=e.getListXmlElements(this.content,r,l-r),a=0,i=o.length;i>a;a++)if(s=o[a],"<w:tc>"===s.tag)return"w:tr";return n.__super__.calcIntellegentlyDashElement.call(this)},n}(XmlTemplater),e.DocXTemplater=t}).call(this);