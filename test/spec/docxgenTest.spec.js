(function(){var e,t;t="undefined"!=typeof global&&null!==global?global:window,e="undefined"!=typeof global&&null!==global?"node":"browser",t.docX={},t.docXData={},"node"===e&&(t.DocxGen=require(__dirname+"/../../js/docxgen.js")),DocUtils.pathConfig={node:"../../examples/",browser:"../examples/"},DocUtils.loadDoc("imageExample.docx"),DocUtils.loadDoc("tagExample.docx"),DocUtils.loadDoc("tagExampleExpected.docx"),DocUtils.loadDoc("tagLoopExample.docx"),DocUtils.loadDoc("tagLoopExampleImageExpected.docx"),DocUtils.loadDoc("tagProduitLoop.docx"),DocUtils.loadDoc("tagDashLoop.docx"),DocUtils.loadDoc("tagDashLoopList.docx"),DocUtils.loadDoc("tagDashLoopTable.docx"),DocUtils.loadDoc("tagIntelligentLoopTable.docx",{intelligentTagging:!0}),DocUtils.loadDoc("tagIntelligentLoopTableExpected.docx"),DocUtils.loadDoc("tagDashLoop.docx"),DocUtils.loadDoc("qrCodeExample.docx"),DocUtils.loadDoc("qrCodeExampleExpected.docx"),DocUtils.loadDoc("qrCodeTaggingExample.docx"),DocUtils.loadDoc("qrCodeTaggingExampleExpected.docx"),DocUtils.loadDoc("qrCodeTaggingLoopExample.docx"),DocUtils.loadDoc("qrCodeTaggingLoopExampleExpected.docx"),DocUtils.loadDoc("image.png",{docx:!1}),DocUtils.loadDoc("bootstrap_logo.png",{docx:!1}),DocUtils.loadDoc("BMW_logo.png",{docx:!1}),DocUtils.loadDoc("Firefox_logo.png",{docx:!1}),DocUtils.loadDoc("Volkswagen_logo.png",{docx:!1}),DocUtils.loadDoc("qrcodeTest.zip",{docx:!1}),describe("DocxGenBasis",function(){return it("should be defined",function(){return expect(DocxGen).not.toBe(void 0)}),it("should construct",function(){var e;return e=new DocxGen,expect(e).not.toBe(void 0)})}),describe("DocxGenLoading",function(){return describe("ajax done correctly",function(){return it("doc and img Data should have the expected length",function(){return expect(docXData["imageExample.docx"].length).toEqual(729580),expect(docXData["image.png"].length).toEqual(18062)}),it("should have the right number of files (the docx unzipped)",function(){return docX["imageExample.docx"]=new DocxGen(docXData["imageExample.docx"]),expect(DocUtils.sizeOfObject(docX["imageExample.docx"].zip.files)).toEqual(22)})}),describe("basic loading",function(){return it("should load file imageExample.docx",function(){return expect(typeof docX["imageExample.docx"]).toBe("object")})}),describe("content_loading",function(){return it("should load the right content for the footer",function(){var e;return e=docX["imageExample.docx"].getFullText("word/footer1.xml"),expect(e.length).not.toBe(0),expect(e).toBe("{last_name}{first_name}{phone}")}),it("should load the right content for the document",function(){var e;return e=docX["imageExample.docx"].getFullText(),expect(e).toBe("")})}),describe("image loading",function(){return it("should find one image (and not more than 1)",function(){return expect(docX["imageExample.docx"].getImageList().length).toEqual(1)}),it("should find the image named with the good name",function(){return expect(docX["imageExample.docx"].getImageList()[0].path).toEqual("word/media/image1.jpeg")}),it("should change the image with another one",function(){var e,t;return t=docX["imageExample.docx"].zip.files["word/media/image1.jpeg"].asText(),docX["imageExample.docx"].setImage("word/media/image1.jpeg",docXData["image.png"]),e=docX["imageExample.docx"].zip.files["word/media/image1.jpeg"].asText(),expect(t).not.toEqual(e),expect(docXData["image.png"]).toEqual(e)})}),describe("output and input",function(){return it("should be the same",function(){var e,o;return e=new DocxGen(t.docXData["tagExample.docx"]),o=e.output(!1),expect(o.length).toEqual(91348),expect(o.substr(0,50)).toEqual("UEsDBAoAAAAAAAAAIQAMTxYSlgcAAJYHAAATAAAAW0NvbnRlbn")})})}),describe("DocxGenTemplating",function(){return describe("text templating",function(){return it("should change values with template vars",function(){var e;return e={first_name:"Hipp",last_name:"Edgar",phone:"0652455478",description:"New Website"},docX["tagExample.docx"].setTags(e),docX["tagExample.docx"].applyTags(),expect(docX["tagExample.docx"].getFullText()).toEqual("Edgar Hipp"),expect(docX["tagExample.docx"].getFullText("word/header1.xml")).toEqual("Edgar Hipp0652455478New Website"),expect(docX["tagExample.docx"].getFullText("word/footer1.xml")).toEqual("EdgarHipp0652455478")}),it("should export the good file",function(){var e,t;t=[];for(e in docX["tagExample.docx"].zip.files)expect(docX["tagExample.docx"].zip.files[e].options.date).not.toBe(docX["tagExampleExpected.docx"].zip.files[e].options.date),expect(docX["tagExample.docx"].zip.files[e].name).toBe(docX["tagExampleExpected.docx"].zip.files[e].name),expect(docX["tagExample.docx"].zip.files[e].options.dir).toBe(docX["tagExampleExpected.docx"].zip.files[e].options.dir),t.push(expect(docX["tagExample.docx"].zip.files[e].asText()).toBe(docX["tagExampleExpected.docx"].zip.files[e].asText()));return t})})}),describe("DocxGenTemplatingForLoop",function(){return describe("textLoop templating",function(){return it("should replace all the tags",function(){var e;return e={nom:"Hipp",prenom:"Edgar",telephone:"0652455478",description:"New Website",offre:[{titre:"titre1",prix:"1250"},{titre:"titre2",prix:"2000"},{titre:"titre3",prix:"1400"}]},docX["tagLoopExample.docx"].setTags(e),docX["tagLoopExample.docx"].applyTags(),expect(docX["tagLoopExample.docx"].getFullText()).toEqual("Votre proposition commercialePrix: 1250Titre titre1Prix: 2000Titre titre2Prix: 1400Titre titre3HippEdgar")}),it("should work with loops inside loops",function(){var e,t,o;return e={products:[{title:"Microsoft",name:"DOS",reference:"Win7",avantages:[{title:"Everyone uses it",proof:[{reason:"it is quite cheap"},{reason:"it is quit simple"},{reason:"it works on a lot of different Hardware"}]}]},{title:"Linux",name:"Ubuntu",reference:"Ubuntu10",avantages:[{title:"It's very powerful",proof:[{reason:"the terminal is your friend"},{reason:"Hello world"},{reason:"it's free"}]}]},{title:"Apple",name:"Mac",reference:"OSX",avantages:[{title:"It's very easy",proof:[{reason:"you can do a lot just with the mouse"},{reason:"It's nicely designed"}]}]}]},docX["tagProduitLoop.docx"].setTags(e),docX["tagProduitLoop.docx"].applyTags(),o=docX["tagProduitLoop.docx"].getFullText(),t="MicrosoftProduct name : DOSProduct reference : Win7Everyone uses itProof that it works nicely : It works because it is quite cheap It works because it is quit simple It works because it works on a lot of different HardwareLinuxProduct name : UbuntuProduct reference : Ubuntu10It's very powerfulProof that it works nicely : It works because the terminal is your friend It works because Hello world It works because it's freeAppleProduct name : MacProduct reference : OSXIt's very easyProof that it works nicely : It works because you can do a lot just with the mouse It works because It's nicely designed",expect(o.length).toEqual(t.length),expect(o).toEqual(t)})})}),describe("Xml Util",function(){var e;return e=new XmlUtil,it("should compute the scope between 2 <w:t>",function(){var t;return t=e.getListXmlElements('undefined</w:t></w:r></w:p><w:p w:rsidP="008A4B3C" w:rsidR="007929C1" w:rsidRDefault="007929C1" w:rsidRPr="008A4B3C"><w:pPr><w:pStyle w:val="Sous-titre"/></w:pPr><w:r w:rsidRPr="008A4B3C"><w:t xml:space="preserve">Audit réalisé le '),expect(t).toEqual([{tag:"</w:t>",offset:9},{tag:"</w:r>",offset:15},{tag:"</w:p>",offset:21},{tag:"<w:p>",offset:27},{tag:"<w:r>",offset:162},{tag:"<w:t>",offset:188}])}),it("should compute the scope between 2 <w:t> in an Array",function(){var t;return t=e.getListXmlElements('urs</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:type="dxa" w:w="4140"/></w:tcPr><w:p w:rsidP="00CE524B" w:rsidR="00CE524B" w:rsidRDefault="00CE524B"><w:pPr><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/><w:color w:val="auto"/></w:rPr></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/><w:color w:val="auto"/></w:rPr><w:t>Sur exté'),expect(t).toEqual([{tag:"</w:t>",offset:3},{tag:"</w:r>",offset:9},{tag:"</w:p>",offset:15},{tag:"</w:tc>",offset:21},{tag:"<w:tc>",offset:28},{tag:"<w:p>",offset:83},{tag:"<w:r>",offset:268},{tag:"<w:t>",offset:374}])}),it("should compute the scope between a w:t in an array and the other outside",function(){var t;return t=e.getListXmlElements('defined </w:t></w:r></w:p></w:tc></w:tr></w:tbl><w:p w:rsidP="00CA7135" w:rsidR="00BE3585" w:rsidRDefault="00BE3585"/><w:p w:rsidP="00CA7135" w:rsidR="00BE3585" w:rsidRDefault="00BE3585"/><w:p w:rsidP="00CA7135" w:rsidR="00137C91" w:rsidRDefault="00137C91"><w:r w:rsidRPr="00B12C70"><w:rPr><w:bCs/></w:rPr><w:t>Coût ressources '),expect(t).toEqual([{tag:"</w:t>",offset:8},{tag:"</w:r>",offset:14},{tag:"</w:p>",offset:20},{tag:"</w:tc>",offset:26},{tag:"</w:tr>",offset:33},{tag:"</w:tbl>",offset:40},{tag:"<w:p>",offset:188},{tag:"<w:r>",offset:257},{tag:"<w:t>",offset:306}])})}),describe("scope diff calculation",function(){var e;return e=new XmlUtil,it("should compute the scopeDiff between 2 <w:t>",function(){var t;return t=e.getListDifferenceXmlElements('undefined</w:t></w:r></w:p><w:p w:rsidP="008A4B3C" w:rsidR="007929C1" w:rsidRDefault="007929C1" w:rsidRPr="008A4B3C"><w:pPr><w:pStyle w:val="Sous-titre"/></w:pPr><w:r w:rsidRPr="008A4B3C"><w:t xml:space="preserve">Audit réalisé le '),expect(t).toEqual([])}),it("should compute the scopeDiff between 2 <w:t> in an Array",function(){var t;return t=e.getListDifferenceXmlElements('urs</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:type="dxa" w:w="4140"/></w:tcPr><w:p w:rsidP="00CE524B" w:rsidR="00CE524B" w:rsidRDefault="00CE524B"><w:pPr><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/><w:color w:val="auto"/></w:rPr></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/><w:color w:val="auto"/></w:rPr><w:t>Sur exté'),expect(t).toEqual([])}),it("should compute the scopeDiff between a w:t in an array and the other outside",function(){var t;return t=e.getListDifferenceXmlElements('defined </w:t></w:r></w:p></w:tc></w:tr></w:tbl><w:p w:rsidP="00CA7135" w:rsidR="00BE3585" w:rsidRDefault="00BE3585"/><w:p w:rsidP="00CA7135" w:rsidR="00BE3585" w:rsidRDefault="00BE3585"/><w:p w:rsidP="00CA7135" w:rsidR="00137C91" w:rsidRDefault="00137C91"><w:r w:rsidRPr="00B12C70"><w:rPr><w:bCs/></w:rPr><w:t>Coût ressources '),expect(t).toEqual([{tag:"</w:tc>",offset:26},{tag:"</w:tr>",offset:33},{tag:"</w:tbl>",offset:40}])})}),describe("scope inner text",function(){return it("should find the scope",function(){var e,t,o;return o=new DocXTemplater,docX["tagProduitLoop.docx"]=new DocxGen(docXData["tagProduitLoop.docx"]),t=o.calcOuterXml(docX["tagProduitLoop.docx"].zip.files["word/document.xml"].asText(),1195,1245,"w:p"),e={text:'<w:p w:rsidR="00923B77" w:rsidRDefault="00923B77"><w:r><w:t>{#</w:t></w:r><w:r w:rsidR="00713414"><w:t>products</w:t></w:r><w:r><w:t>}</w:t></w:r></w:p>',startTag:1134,endTag:1286},expect(t.endTag).toEqual(e.endTag),expect(t.startTag).toEqual(e.startTag),expect(t.text.length).toEqual(e.text.length),expect(t.text).toEqual(e.text)})}),describe("Dash Loop Testing",function(){return it("dash loop ok on simple table -> w:tr",function(){var e,t,o;return e={os:[{type:"linux",price:"0",reference:"Ubuntu10"},{type:"DOS",price:"500",reference:"Win7"},{type:"apple",price:"1200",reference:"MACOSX"}]},docX["tagDashLoop.docx"].setTags(e),docX["tagDashLoop.docx"].applyTags(),t="linux0Ubuntu10DOS500Win7apple1200MACOSX",o=docX["tagDashLoop.docx"].getFullText(),expect(o).toBe(t)}),it("dash loop ok on simple table -> w:table",function(){var e,t,o;return e={os:[{type:"linux",price:"0",reference:"Ubuntu10"},{type:"DOS",price:"500",reference:"Win7"},{type:"apple",price:"1200",reference:"MACOSX"}]},docX["tagDashLoopTable.docx"].setTags(e),docX["tagDashLoopTable.docx"].applyTags(),t="linux0Ubuntu10DOS500Win7apple1200MACOSX",o=docX["tagDashLoopTable.docx"].getFullText(),expect(o).toBe(t)}),it("dash loop ok on simple list -> w:p",function(){var e,t,o;return e={os:[{type:"linux",price:"0",reference:"Ubuntu10"},{type:"DOS",price:"500",reference:"Win7"},{type:"apple",price:"1200",reference:"MACOSX"}]},docX["tagDashLoopList.docx"].setTags(e),docX["tagDashLoopList.docx"].applyTags(),t="linux 0 Ubuntu10 DOS 500 Win7 apple 1200 MACOSX ",o=docX["tagDashLoopList.docx"].getFullText(),expect(o).toBe(t)})}),describe("Intelligent Loop Tagging",function(){return it("should work with tables",function(){var e,t,o,a,r;e={clients:[{first_name:"John",last_name:"Doe",phone:"+33647874513"},{first_name:"Jane",last_name:"Doe",phone:"+33454540124"},{first_name:"Phil",last_name:"Kiel",phone:"+44578451245"},{first_name:"Dave",last_name:"Sto",phone:"+44548787984"}]},docX["tagIntelligentLoopTable.docx"].setTags(e),docX["tagIntelligentLoopTable.docx"].applyTags(),t="JohnDoe+33647874513JaneDoe+33454540124PhilKiel+44578451245DaveSto+44548787984",a=docX["tagIntelligentLoopTableExpected.docx"].getFullText(),expect(a).toBe(t),r=[];for(o in docX["tagIntelligentLoopTable.docx"].zip.files)expect(docX["tagIntelligentLoopTable.docx"].zip.files[o].asText()).toBe(docX["tagIntelligentLoopTableExpected.docx"].zip.files[o].asText()),expect(docX["tagIntelligentLoopTable.docx"].zip.files[o].name).toBe(docX["tagIntelligentLoopTableExpected.docx"].zip.files[o].name),expect(docX["tagIntelligentLoopTable.docx"].zip.files[o].options.dir).toBe(docX["tagIntelligentLoopTableExpected.docx"].zip.files[o].options.dir),r.push(expect(docX["tagIntelligentLoopTable.docx"].zip.files[o].options.date).not.toBe(docX["tagIntelligentLoopTableExpected.docx"].zip.files[o].options.date));return r})}),describe("getTags",function(){return it("should work with simple document",function(){var e;return docX["tagExample.docx"]=new DocxGen(docXData["tagExample.docx"],{},!1),e=docX["tagExample.docx"].getTags(),expect(e).toEqual([{fileName:"word/document.xml",vars:{last_name:!0,first_name:!0}},{fileName:"word/footer1.xml",vars:{last_name:!0,first_name:!0,phone:!0}},{fileName:"word/header1.xml",vars:{last_name:!0,first_name:!0,phone:!0,description:!0}}])}),it("should work with loop document",function(){var e;return docX["tagLoopExample.docx"]=new DocxGen(docXData["tagLoopExample.docx"],{},!1),e=docX["tagLoopExample.docx"].getTags(),expect(e).toEqual([{fileName:"word/document.xml",vars:{offre:{prix:!0,titre:!0},nom:!0,prenom:!0}},{fileName:"word/footer1.xml",vars:{nom:!0,prenom:!0,telephone:!0}},{fileName:"word/header1.xml",vars:{nom:!0,prenom:!0}}])}),it("should work if there are no Tags",function(){var e;return docX["qrCodeExample.docx"]=new DocxGen(docXData["qrCodeExample.docx"],{},!1),e=docX["qrCodeExample.docx"].getTags(),expect(e).toEqual([])})}),describe("xmlTemplater",function(){return it("should work with simpleContent",function(){var e,t,o;return e="<w:t>Hello {name}</w:t>",t={name:"Edgar"},o=new DocXTemplater(e,{Tags:t}),o.applyTags(),expect(o.getFullText()).toBe("Hello Edgar")}),it("should work with non w:t content",function(){var e,t,o;return e="{image}.png",t={image:"edgar"},o=new DocXTemplater(e,{Tags:t}),o.applyTags(),expect(o.content).toBe("edgar.png")}),it("should work with tag in two elements",function(){var e,t,o;return e="<w:t>Hello {</w:t><w:t>name}</w:t>",t={name:"Edgar"},o=new DocXTemplater(e,{Tags:t}),o.applyTags(),expect(o.getFullText()).toBe("Hello Edgar")}),it("should work with simple Loop",function(){var e,t,o;return e="<w:t>Hello {#names}{name},{/names}</w:t>",t={names:[{name:"Edgar"},{name:"Mary"},{name:"John"}]},o=new DocXTemplater(e,{Tags:t}),o.applyTags(),expect(o.getFullText()).toBe("Hello Edgar,Mary,John,")}),it("should work with dash Loop",function(){var e,t,o;return e="<w:p><w:t>Hello {-w:p names}{name},{/names}</w:t></w:p>",t={names:[{name:"Edgar"},{name:"Mary"},{name:"John"}]},o=new DocXTemplater(e,{Tags:t}),o.applyTags(),expect(o.getFullText()).toBe("Hello Edgar,Hello Mary,Hello John,")}),it("should work with loop and innerContent",function(){var e,t,o;return e='</w:t></w:r></w:p><w:p w:rsidR="00923B77" w:rsidRDefault="00713414" w:rsidP="00923B77"><w:pPr><w:pStyle w:val="Titre1"/></w:pPr><w:r><w:t>{title</w:t></w:r><w:r w:rsidR="00923B77"><w:t>}</w:t></w:r></w:p><w:p w:rsidR="00923B77" w:rsidRPr="00923B77" w:rsidRDefault="00713414" w:rsidP="00923B77"><w:r><w:t>Proof that it works nicely :</w:t></w:r></w:p><w:p w:rsidR="00923B77" w:rsidRDefault="00923B77" w:rsidP="00923B77"><w:pPr><w:numPr><w:ilvl w:val="0"/><w:numId w:val="1"/></w:numPr></w:pPr><w:r><w:t>{#pr</w:t></w:r><w:r w:rsidR="00713414"><w:t>oof</w:t></w:r><w:r><w:t xml:space="preserve">} </w:t></w:r><w:r w:rsidR="00713414"><w:t>It works because</w:t></w:r><w:r><w:t xml:space="preserve"> {</w:t></w:r><w:r w:rsidR="006F26AC"><w:t>reason</w:t></w:r><w:r><w:t>}</w:t></w:r></w:p><w:p w:rsidR="00923B77" w:rsidRDefault="00713414" w:rsidP="00923B77"><w:pPr><w:numPr><w:ilvl w:val="0"/><w:numId w:val="1"/></w:numPr></w:pPr><w:r><w:t>{/proof</w:t></w:r><w:r w:rsidR="00923B77"><w:t>}</w:t></w:r></w:p><w:p w:rsidR="00FD04E9" w:rsidRDefault="00923B77"><w:r><w:t>',t={title:"Everyone uses it",proof:[{reason:"it is quite cheap"},{reason:"it is quit simple"},{reason:"it works on a lot of different Hardware"}]},o=new DocXTemplater(e,{Tags:t}),o.applyTags(),expect(o.getFullText()).toBe("Everyone uses itProof that it works nicely : It works because it is quite cheap It works because it is quit simple It works because it works on a lot of different Hardware")}),it("should work with loop and innerContent (with last)",function(){var e,t,o;return e='</w:t></w:r></w:p><w:p w:rsidR="00923B77" w:rsidRDefault="00713414" w:rsidP="00923B77"><w:pPr><w:pStyle w:val="Titre1"/></w:pPr><w:r><w:t>{title</w:t></w:r><w:r w:rsidR="00923B77"><w:t>}</w:t></w:r></w:p><w:p w:rsidR="00923B77" w:rsidRPr="00923B77" w:rsidRDefault="00713414" w:rsidP="00923B77"><w:r><w:t>Proof that it works nicely :</w:t></w:r></w:p><w:p w:rsidR="00923B77" w:rsidRDefault="00923B77" w:rsidP="00923B77"><w:pPr><w:numPr><w:ilvl w:val="0"/><w:numId w:val="1"/></w:numPr></w:pPr><w:r><w:t>{#pr</w:t></w:r><w:r w:rsidR="00713414"><w:t>oof</w:t></w:r><w:r><w:t xml:space="preserve">} </w:t></w:r><w:r w:rsidR="00713414"><w:t>It works because</w:t></w:r><w:r><w:t xml:space="preserve"> {</w:t></w:r><w:r w:rsidR="006F26AC"><w:t>reason</w:t></w:r><w:r><w:t>}</w:t></w:r></w:p><w:p w:rsidR="00923B77" w:rsidRDefault="00713414" w:rsidP="00923B77"><w:pPr><w:numPr><w:ilvl w:val="0"/><w:numId w:val="1"/></w:numPr></w:pPr><w:r><w:t>{/proof</w:t></w:r><w:r w:rsidR="00923B77"><w:t>}</w:t></w:r></w:p><w:p w:rsidR="00FD04E9" w:rsidRDefault="00923B77"><w:r><w:t> ',t={title:"Everyone uses it",proof:[{reason:"it is quite cheap"},{reason:"it is quit simple"},{reason:"it works on a lot of different Hardware"}]},o=new DocXTemplater(e,{Tags:t}),o.applyTags(),expect(o.getFullText()).toBe("Everyone uses itProof that it works nicely : It works because it is quite cheap It works because it is quit simple It works because it works on a lot of different Hardware")}),it("should work with not w:t tag (if the for loop is like {#forloop} text {/forloop}) ",function(){var e,t,o;return e="Hello {#names}{name},{/names}",t={names:[{name:"Edgar"},{name:"Mary"},{name:"John"}]},o=new DocXTemplater(e,{Tags:t}),o.applyTags(),expect(o.content).toBe("Hello Edgar,Mary,John,")})}),describe("DocxQrCode module",function(){return describe("Calculate simple Docx",function(){var t,o,a,r;return t=null,o=null,r=null,a=null,beforeEach(function(){var e;return r=new JSZip(docXData["qrcodeTest.zip"]),e=new DocxGen,a=new DocXTemplater("",{DocxGen:e,Tags:{Tag:"tagValue"}})}),it("should do it's thing with JSZip.base64",function(){var e,t;return t=r.files["blabla.png"].asText(),e=JSZip.base64.encode(t),expect(e.length).toBe(624),expect(e.substr(0,50)).toBe("kcNChoKAAAADUlIRFIAAAAAIAAABOAAAAAZ0Uk5TAEAA07AAAE"),expect(e).toBe("kcNChoKAAAADUlIRFIAAAAAIAAABOAAAAAZ0Uk5TAEAA07AAAEURBVHdQkUQ/RQDIg7ON9jXTF4flff17B0EYJEDoJQidBDPcfG30PMH+N1VJTkQOglCJ0Icn0rPTxJEDoJQidB0Egj89PenQhBCVg2Rk9c5RA6CUInQhBOPm8gdBCRA6CUInQfN3dBB0EYJEDoJQidheKSkkC0EYJEDoJs9P141dBB0EYJEDoJQidhm2fVzZlnQhBCRuRTcye633fQSkQOglCJ0IXX6KdHB0WEDoJQidB0Ec/dX/teYY/Tyc6CUInQhBCcv/Xic6CUInQhBCm/f+FP0EYJEDoJQidB9Fnvc1hBCRA6CWve0IQSkYWk3HuPcB0EYJEDoJQidBUcez9HP3fPE0EYJEDoJQidhOEc/p53vf6/PcB0EYJEDoJQidBHfhd8VPWfP59dBJEDoJQidBsH31kpVfkQOglCJ0I0fl1axBA6CUInQhBjn/mHdidB0EJwHPOXVPiAhBCRA6Cf3Xc/8n0EJ0IQSlYNkzedHd+Nfx9xHQSkQOglCJ08+H9QSRA6CUInQh+pnQhBCd/fUcMRdCJ0IQSnAfHhBCRA6CUIn0wsvkAAAAASUVORA")}),it("should work with Blablalalabioeajbiojbepbroji",function(){return runs(function(){var i,n,l,c,d,s;return o=!1,t={test:function(){return o=!0}},spyOn(t,"test").andCallThrough(),"browser"===e?(s=new DocxQrCode(r.files["blabla.png"].asBinary(),a,"custom.png",6),s.decode(t.test)):(i=JSZip.base64.encode(r.files["blabla.png"].asBinary()),n=new Buffer(i,"base64"),d=new PNG(n),c=function(e){return d.decoded=e,s=new DocxQrCode(d,a,"custom.png",6),s.decode(t.test)},l=d.decode(c))}),waitsFor(function(){return o}),runs(function(){return expect(t.test).toHaveBeenCalled(),expect(t.test.calls.length).toEqual(1),expect(t.test.mostRecentCall.args[0].result).toEqual("Blablalalabioeajbiojbepbroji"),expect(t.test.mostRecentCall.args[1]).toEqual("custom.png"),expect(t.test.mostRecentCall.args[2]).toEqual(6)})}),it("should work with long texts",function(){return runs(function(){var i,n,l,c,d,s;return o=!1,t={test:function(){return o=!0}},spyOn(t,"test").andCallThrough(),"browser"===e?(s=new DocxQrCode(r.files["custom.png"].asBinary(),a,"custom.png",6),s.decode(t.test)):(i=JSZip.base64.encode(r.files["custom.png"].asBinary()),n=new Buffer(i,"base64"),d=new PNG(n),c=function(e){return d.decoded=e,s=new DocxQrCode(d,a,"custom.png",6),s.decode(t.test)},l=d.decode(c))}),waitsFor(function(){return o}),runs(function(){return expect(t.test).toHaveBeenCalled(),expect(t.test.calls.length).toEqual(1),expect(t.test.mostRecentCall.args[0].result).toEqual("Some custom text"),expect(t.test.mostRecentCall.args[1]).toEqual("custom.png"),expect(t.test.mostRecentCall.args[2]).toEqual(6)})}),it("should work with basic image",function(){return runs(function(){var i,n,l,c,d,s;return o=!1,t={test:function(){return o=!0}},spyOn(t,"test").andCallThrough(),"browser"===e?(s=new DocxQrCode(r.files["qrcodeTest.png"].asBinary(),a,"qrcodeTest.png",4),s.decode(t.test)):(i=JSZip.base64.encode(r.files["qrcodeTest.png"].asBinary()),n=new Buffer(i,"base64"),d=new PNG(n),c=function(e){return d.decoded=e,s=new DocxQrCode(d,a,"qrcodeTest.png",4),s.decode(t.test)},l=d.decode(c))}),waitsFor(function(){return o}),runs(function(){return expect(t.test).toHaveBeenCalled(),expect(t.test.calls.length).toEqual(1),expect(t.test.mostRecentCall.args[0].result).toEqual("test"),expect(t.test.mostRecentCall.args[1]).toEqual("qrcodeTest.png"),expect(t.test.mostRecentCall.args[2]).toEqual(4)})}),it("should work with image with {tags}",function(){return runs(function(){var i,n,l,c,d,s;return o=!1,t={test:function(){return o=!0}},spyOn(t,"test").andCallThrough(),"browser"===e?(s=new DocxQrCode(r.files["qrcodetag.png"].asBinary(),a,"tag.png",2),s.decode(t.test)):(i=JSZip.base64.encode(r.files["qrcodetag.png"].asBinary()),n=new Buffer(i,"base64"),d=new PNG(n),c=function(e){return d.decoded=e,s=new DocxQrCode(d,a,"tag.png",2),s.decode(t.test)},l=d.decode(c))}),waitsFor(function(){return o}),runs(function(){return expect(t.test).toHaveBeenCalled(),expect(t.test.calls.length).toEqual(1),expect(t.test.mostRecentCall.args[0].result).toEqual("tagValue"),expect(t.test.mostRecentCall.args[1]).toEqual("tag.png"),expect(t.test.mostRecentCall.args[2]).toEqual(2)})})})}),describe("image Loop Replacing",function(){return describe("rels",function(){return it("should load",function(){return expect(docX["imageExample.docx"].imgManager.loadImageRels().imageRels).toEqual([]),expect(docX["imageExample.docx"].imgManager.maxRid).toEqual(10)}),it("should add",function(){var e,t,o,a,r,i,n;return a=docX["imageExample.docx"].zip.files["word/_rels/document.xml.rels"].asText(),expect(docX["imageExample.docx"].imgManager.addImageRels("image1.png",docXData["bootstrap_logo.png"])).toBe(11),expect(docX["imageExample.docx"].zip.files["word/_rels/document.xml.rels"].asText()).not.toBe(a),i=docX["imageExample.docx"].zip.files["word/_rels/document.xml.rels"].asText(),e=docX["imageExample.docx"].zip.files["[Content_Types].xml"].asText(),n=DocUtils.Str2xml(i),t=DocUtils.Str2xml(e),r=n.getElementsByTagName("Relationship"),o=t.getElementsByTagName("Default"),expect(r.length).toEqual(11),expect(o.length).toBe(4)})})}),describe("loop forTagging images",function(){return it("should work with a simple loop file",function(){var t,o,a,r,i,n,l,c,d;docX["tagLoopExample.docx"]=new DocxGen(docXData["tagLoopExample.docx"]),c={nom:"Hipp",prenom:"Edgar",telephone:"0652455478",description:"New Website",offre:[{titre:"titre1",prix:"1250",img:[{data:docXData["Volkswagen_logo.png"],name:"vw_logo.png"}]},{titre:"titre2",prix:"2000",img:[{data:docXData["BMW_logo.png"],name:"bmw_logo.png"}]},{titre:"titre3",prix:"1400",img:[{data:docXData["Firefox_logo.png"],name:"firefox_logo.png"}]}]},docX["tagLoopExample.docx"].setTags(c),docX["tagLoopExample.docx"].applyTags();for(r in docX["tagLoopExample.docx"].zip.files)expect(docX["tagLoopExample.docx"].zip.files[r].options.date).not.toBe(docX["tagLoopExampleImageExpected.docx"].zip.files[r].options.date),expect(docX["tagLoopExample.docx"].zip.files[r].name).toBe(docX["tagLoopExampleImageExpected.docx"].zip.files[r].name),expect(docX["tagLoopExample.docx"].zip.files[r].options.dir).toBe(docX["tagLoopExampleImageExpected.docx"].zip.files[r].options.dir),"word/_rels/document.xml.rels"!==r&&"[Content_Types].xml"!==r&&("browser"===e||"word/document.xml"!==r)&&(("function"==typeof(d=docX["tagLoopExample.docx"].zip.files[r].asText())?d(0):void 0)&&expect(docX["tagLoopExample.docx"].zip.files[r].asText().length).toBe(docX["tagLoopExampleImageExpected.docx"].zip.files[r].asText().length),expect(docX["tagLoopExample.docx"].zip.files[r].asText()).toBe(docX["tagLoopExampleImageExpected.docx"].zip.files[r].asText()));return n=docX["tagLoopExample.docx"].zip.files["word/_rels/document.xml.rels"].asText(),t=docX["tagLoopExample.docx"].zip.files["[Content_Types].xml"].asText(),l=DocUtils.Str2xml(n),o=DocUtils.Str2xml(t),i=l.getElementsByTagName("Relationship"),a=o.getElementsByTagName("Default"),expect(i.length).toEqual(16),expect(a.length).toBe(3)})}),describe("qr code testing",function(){return it("should work with local QRCODE without tags",function(){var e;return docX["qrCodeExample.docx"]=new DocxGen(docXData["qrCodeExample.docx"],{},!1,!0),e=function(){return 1},docX["qrCodeExample.docx"].applyTags({},e),waitsFor(function(){return null!=docX["qrCodeExample.docx"].ready}),runs(function(){var e,t;expect(null!=docX["qrCodeExample.docx"].zip.files["word/media/Copie_0.png"]).toBeTruthy(),t=[];for(e in docX["qrCodeExample.docx"].zip.files)expect(docX["qrCodeExample.docx"].zip.files[e].options.date).not.toBe(docX["qrCodeExampleExpected.docx"].zip.files[e].options.date),expect(docX["qrCodeExample.docx"].zip.files[e].name).toBe(docX["qrCodeExampleExpected.docx"].zip.files[e].name),t.push(expect(docX["qrCodeExample.docx"].zip.files[e].options.dir).toBe(docX["qrCodeExampleExpected.docx"].zip.files[e].options.dir));return t})}),it("should work with local QRCODE with {tags}",function(){var e;return docX["qrCodeTaggingExample.docx"]=new DocxGen(docXData["qrCodeTaggingExample.docx"],{image:"Firefox_logo"},!1,!0),e=function(){return 1},docX["qrCodeTaggingExample.docx"].applyTags({image:"Firefox_logo"},e),waitsFor(function(){return null!=docX["qrCodeTaggingExample.docx"].ready}),runs(function(){var e,t;expect(null!=docX["qrCodeTaggingExample.docx"].zip.files["word/media/Copie_0.png"]).toBeTruthy(),t=[];for(e in docX["qrCodeTaggingExample.docx"].zip.files)expect(docX["qrCodeTaggingExample.docx"].zip.files[e].options.date).not.toBe(docX["qrCodeTaggingExampleExpected.docx"].zip.files[e].options.date),expect(docX["qrCodeTaggingExample.docx"].zip.files[e].name).toBe(docX["qrCodeTaggingExampleExpected.docx"].zip.files[e].name),t.push(expect(docX["qrCodeTaggingExample.docx"].zip.files[e].options.dir).toBe(docX["qrCodeTaggingExampleExpected.docx"].zip.files[e].options.dir));return t})}),it("should work with loop QRCODE with {tags}",function(){var e;return docX["qrCodeTaggingLoopExample.docx"]=new DocxGen(docXData["qrCodeTaggingLoopExample.docx"],{},!1,!0),e=function(){return 1},docX["qrCodeTaggingLoopExample.docx"].applyTags({images:[{image:"Firefox_logo"},{image:"image"}]},e),docX["qrCodeTaggingLoopExample.docx"],waitsFor(function(){return null!=docX["qrCodeTaggingLoopExample.docx"].ready}),runs(function(){var e,t;expect(null!=docX["qrCodeTaggingLoopExample.docx"].zip.files["word/media/Copie_0.png"]).toBeTruthy(),expect(null!=docX["qrCodeTaggingLoopExample.docx"].zip.files["word/media/Copie_1.png"]).toBeTruthy(),expect(null!=docX["qrCodeTaggingLoopExample.docx"].zip.files["word/media/Copie_2.png"]).toBeFalsy(),t=[];for(e in docX["qrCodeTaggingLoopExample.docx"].zip.files)expect(docX["qrCodeTaggingLoopExample.docx"].zip.files[e].options.date).not.toBe(docX["qrCodeTaggingLoopExampleExpected.docx"].zip.files[e].options.date),expect(docX["qrCodeTaggingLoopExample.docx"].zip.files[e].name).toBe(docX["qrCodeTaggingLoopExampleExpected.docx"].zip.files[e].name),t.push(expect(docX["qrCodeTaggingLoopExample.docx"].zip.files[e].options.dir).toBe(docX["qrCodeTaggingLoopExampleExpected.docx"].zip.files[e].options.dir));return t})})})}).call(this);