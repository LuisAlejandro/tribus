if(!Function.prototype.bind){Function.prototype.bind=function(a){if(typeof this!=="function"){throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable")}var e=Array.prototype.slice.call(arguments,1),d=this,b=function(){},c=function(){return d.apply(this instanceof b&&a?this:a,e.concat(Array.prototype.slice.call(arguments)))};b.prototype=this.prototype;c.prototype=new b();return c}};
var Tumblr=window.Tumblr||{};Tumblr.flashVersion=function(){if(navigator.plugins&&navigator.plugins.length>0){var a=navigator.mimeTypes;if(a&&a["application/x-shockwave-flash"]&&a["application/x-shockwave-flash"].enabledPlugin&&a["application/x-shockwave-flash"].enabledPlugin.description){return parseInt(a["application/x-shockwave-flash"].enabledPlugin.description.split(" ")[2].split(".")[0],10)}}else{if(navigator.appVersion.indexOf("Mac")==-1&&window.execScript){try{var c=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");var b=c.GetVariable("$version");return b.split(",")[0].split(" ")[1]}catch(d){}return 0}}};Tumblr.replaceIfFlash=function(b,a,c){if(Tumblr.flashVersion()>=b){document.getElementById(a).innerHTML=c}};Tumblr.renderVideo=function(c,g,e,a,b){var d=navigator.userAgent.toLowerCase();var f=(d.indexOf("iphone")!=-1);if(f){document.getElementById(c).innerHTML='<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" width="'+e+'" height="'+a+'" codebase="http://www.apple.com/qtactivex/qtplugin.cab"><param name="src" value="'+g+'"><param name="qtsrc" value="'+g+'"><param name="autoplay" value="false"><embed src="'+g+'" qtsrc="'+g+'" width="'+e+'" height="'+a+'" pluginspage="http://www.apple.com/quicktime/"></embed></object>'}else{replaceIfFlash(10,c,'<embed type="application/x-shockwave-flash" src="http://assets.tumblr.com/swf/video_player.swf?22" bgcolor="#000000" quality="high" class="video_player" wmode="transparent" allowfullscreen="true" height="'+a+'" width="'+e+'" flashvars="file='+encodeURIComponent(g)+(b?"&amp;"+b:"")+'"></embed>')}};Tumblr.windowDimensions=function(){if(window.innerWidth!==undefined){return{width:window.innerWidth,height:window.innerHeight}}else{if(document.documentElement){return{width:document.documentElement.clientWidth,height:document.documentElement.clientHeight}}else{return{width:document.body.clientWidth,height:document.body.clientHeight}}}};Tumblr.Lightbox=(function(){var f=false;var h=false;var n=false;var d=[];var i=false;var g=false;var o=false;var e=false;var c={left:false,center:false,right:false};function m(r,u){if(document.getElementById("tumblr_lightbox")){return}if(!u){u=1}d=r;if(navigator&&navigator.userAgent.indexOf("Firefox")!=-1){var y=document.createElement("input");y.setAttribute("id","Tumblr_Lightbox_focus_input");y.setAttribute("type","text");y.style.position="fixed";y.style.top=0;y.style.left=0;document.body.appendChild(y);y.focus();document.body.removeChild(y)}else{window.focus()}if(!f){if(window.onkeydown){h=window.onkeydown}window.onkeydown=function(B){if(document.getElementById("tumblr_lightbox")){if(!B){B=window.event}var A=B.charCode?B.charCode:B.keyCode;if(!B.shiftKey&&!B.ctrlKey&&!B.altKey&&!B.metaKey){if(A==37){if(g>1){k(g-1)}}else{if(A==39){if(g<d.length){k(g+1)}}else{if(A==27||A==32||A==74||A==75){l()}}}}else{if((B.ctrlKey||B.metaKey)&&A==87){l();return false}}}if(h){h()}};if(window.onresize){n=window.onresize}window.onresize=function(){if(document.getElementById("vignette")){document.getElementById("vignette").style.display="none";if(e){clearTimeout(e)}e=setTimeout(function(){document.getElementById("vignette").style.display="inline-block"},100)}j();if(n){n()}};if(navigator&&navigator.userAgent.search("iPad")!=-1){document.addEventListener("touchmove",function(){l()},false)}f=true}document.body.style.overflow="hidden";var p=document.createElement("div");p.setAttribute("id","tumblr_lightbox");if(navigator&&navigator.userAgent.search("iPad")!=-1){p.style.position="absolute";p.style.top=document.body.scrollTop+"px";p.style.height=window.innerHeight+"px"}else{p.style.position="fixed";p.style.top="0px";p.style.bottom="0px"}p.style.left="0px";p.style.right="0px";p.style.zIndex=4294967294;p.style.overflow="hidden";p.style.backgroundColor=(navigator&&navigator.userAgent.indexOf("MSIE")!=-1)?"#222":"rgba(17,17,17,0.92)";p.onclick=function(){if(i){i=false}else{l()}};if(!(navigator&&navigator.userAgent.search("iPad")!=-1)&&!(navigator&&navigator.userAgent.search("MSIE")!=-1)){var x=document.createElement("img");x.setAttribute("id","vignette");x.setAttribute("src","http://assets.tumblr.com/images/full_page_vignette.png");x.style.position="absolute";x.style.width="100%";x.style.height="100%";x.style.left="0px";x.style.top="0px";p.appendChild(x);var w=document.createElement("div");w.style.position="absolute";w.style.width="100%";w.style.height="100%";w.style.left="0px";w.style.top="0px";p.appendChild(w)}var s=document.createElement("div");s.style.position="absolute";s.style.left="50%";s.style.top="50%";if(!document.getElementById("tumblr_form_key")){s.style.width="100%"}p.appendChild(s);var q=["left","center","right"];while(stage_name=q.pop()){var v=document.createElement("a");v.setAttribute("id","tumblr_lightbox_"+stage_name+"_link");v.setAttribute("href","#");if(d.length<2){v.style.cursor="default"}s.appendChild(v);var t=document.createElement("img");t.setAttribute("id","tumblr_lightbox_"+stage_name+"_image");t.setAttribute("src","http://assets.tumblr.com/images/x.gif");t.style.mozBorderRadius="3px";t.style.webkitBorderRadius="3px";t.style.borderRadius="3px";if(navigator&&navigator.userAgent.indexOf("Chrome")!=-1){t.style.moxBoxShadow="0 4px 30px rgba(0,0,0,1)";t.style.webkitBoxShadow="0 4px 30px rgba(0,0,0,1)";t.style.boxShadow="0 4px 30px rgba(0,0,0,1)"}t.style.borderWidth="0px";t.style.position="absolute";if(stage_name=="center"){t.style.zIndex=4294967295}v.appendChild(t)}var z=document.createElement("div");z.setAttribute("id","tumblr_lightbox_caption");z.style.position="absolute";z.style.textAlign="center";z.style.font="bold 17px 'HelveticaNeue','Helvetica','Arial',sans-serif";z.style.color="#fff";z.style.paddingTop="20px";z.style.textShadow="0 4px 30px rgba(0,0,0,1)";z.style.display="inline-block";z.style.textRendering="optimizeLegibility";s.appendChild(z);document.body.appendChild(p);k(u);j()}function l(){document.body.style.overflow="";document.getElementById("tumblr_lightbox").style.display="none";document.body.removeChild(document.getElementById("tumblr_lightbox"))}function k(q){g=q;o=Math.round(Math.random()*1000000000000);document.getElementById("tumblr_lightbox_left_link").onclick=function(){i=true;k(q-1);return false};if(d.length==1){document.getElementById("tumblr_lightbox_center_link").onclick=function(){return false}}else{if(q<d.length){document.getElementById("tumblr_lightbox_center_link").onclick=function(){i=true;k(q+1);return false}}else{document.getElementById("tumblr_lightbox_center_link").onclick=function(){i=true;k(1);return false}}}document.getElementById("tumblr_lightbox_right_link").onclick=document.getElementById("tumblr_lightbox_center_link").onclick;c.left=false;c.center=false;c.right=false;b("center",q-1);if(q>1){b("left",q-2)}if(q<d.length){b("right",q)}if(q+1<d.length){var p=new Image();p.src=d[q+1].low_res}}function b(q,s){var p=new Image();var r=false;p.className=o;p.onload=function(){if(this.className==o){this.className="high-res";c[q]=this;j()}};p.src=d[s].high_res;if(!p.complete){r=new Image();r.className=o;r.onload=function(){if(this.className==o&&(!c[q]||c[q].className=="placeholder")){this.className="low-res";c[q]=this;j()}};r.src=d[s].low_res;if(d[s].width&&d[s].height){if(r){r.style.maxWidth=d[s].width+"px";r.style.maxHeight=d[s].height+"px"}p.style.maxWidth=d[s].width+"px";p.style.maxHeight=d[s].height+"px"}if(!r.complete&&(d[s].width&&d[s].height)){c[q]=new Image(d[s].width,d[s].height);c[q].style.maxWidth=d[s].width+"px";c[q].style.maxHeight=d[s].height+"px";c[q].src="http://assets.tumblr.com/images/x.gif";c[q].className="placeholder"}}}function j(){var u=["right","left","center"];while(stage_name=u.pop()){var r=document.getElementById("tumblr_lightbox_"+stage_name+"_image");if(!r){continue}var s=c[stage_name];if(!s){r.style.display="none";continue}else{r.style.display="inline-block"}var q=s.style.maxWidth?parseInt(s.style.maxWidth,10):s.width;var p=s.style.maxHeight?parseInt(s.style.maxHeight,10):s.height;if(Tumblr.windowDimensions().width/Tumblr.windowDimensions().height<q/p){var t=(d.length==1)?0.85:0.75;if(Tumblr.windowDimensions().width*t>q&&(s.className=="high-res"||s.style.maxWidth)){r.style.width=q+"px";r.style.height=p+"px"}else{r.style.height=(p*((Tumblr.windowDimensions().width*t)/q))+"px";r.style.width=(Tumblr.windowDimensions().width*t)+"px"}}else{if(Tumblr.windowDimensions().height*0.85>p&&(s.className=="high-res"||s.style.maxHeight)){r.style.width=q+"px";r.style.height=p+"px"}else{r.style.width=(q*((Tumblr.windowDimensions().height*0.85)/p))+"px";r.style.height=(Tumblr.windowDimensions().height*0.85)+"px"}}if(stage_name=="center"){r.style.left=(0-parseInt(r.style.width,10)/2)+"px";r.style.top=(0-parseInt(r.style.height,10)/2)+"px"}else{r.style[stage_name]=(0-(parseInt(r.style.width,10)+Tumblr.windowDimensions().width*0.42))+"px";r.style.top=(0-parseInt(r.style.height,10)/2)+"px"}r.src=s.src;r.style.backgroundColor=(s.className=="placeholder")?((navigator&&navigator.userAgent.indexOf("MSIE")!=-1)?"#444":"rgba(255,255,255,0.05)"):"transparent";if(stage_name=="center"&&d[g-1].caption){document.getElementById("tumblr_lightbox_caption").innerHTML=d[g-1].caption;document.getElementById("tumblr_lightbox_caption").style.width=(Tumblr.windowDimensions().width*0.7)+"px";document.getElementById("tumblr_lightbox_caption").style.top=(parseInt(r.style.height,10)*0.5)+"px";document.getElementById("tumblr_lightbox_caption").style.left=(0-Tumblr.windowDimensions().width*0.35)+"px";document.getElementById("tumblr_lightbox_caption").style.display="block"}else{if(stage_name=="center"){document.getElementById("tumblr_lightbox_caption").style.display="none"}}}}function a(){return !!document.getElementById("tumblr_lightbox")}return{init:m,isOpen:a}})();Tumblr.IframePreloader=function(a){for(var b in a){if(typeof b=="object"){for(var c in b){this.options[b][c]=b[c]}}else{this.options[b]=a[b]}}this.__create()};Tumblr.IframePreloader.prototype={options:{iframe_src:"",iframe_before_onload:function(){},iframe_after_onload:function(){},iframe_class:"",iframe_styles:{zIndex:8675309,position:"fixed",top:"0px",left:"0px",right:"0px",bottom:"0px",width:"100%",height:"100%",background:"transparent",border:"0px",overflow:"hidden"},preloader_class:"",preloader_innerHTML:'<div style="position:absolute; top:0; left:0; right:0; bottom:0; background:transparent center no-repeat url(\'/images/loading_big_fff_on_2e3133.gif?709\')"><img style="position:absolute; left:0; top:0; width:100%; height:100%; opacity:0.3;" src="http://assets.tumblr.com/images/full_page_vignette.png?709"/></div>',preloader_styles:{zIndex:8675310,position:"fixed",top:"0px",left:"0px",right:"0px",bottom:"0px",width:"100%",height:"100%",overflow:"hidden",background:"rgba(17,17,17,0.92)"},close_class:"",close_innerHTML:"&times;",close_styles:{zIndex:8675311,position:"fixed",top:"10px",right:"15px",cursor:"pointer",font:"bold 20px Helvetica, sans-serif"}},iframe_loaded:false,__create:function(){this.id=Math.random().toString().split(".")[1];this.$container=document.createElement("div");this.$preloader=document.createElement("div");this.$preloader.id="iframe_preloader-preloader-"+this.id;this.$preloader.className=this.options.preloader_class;for(var d in this.options.preloader_styles){this.$preloader.style[d]=this.options.preloader_styles[d]}this.$preloader.innerHTML=this.options.preloader_innerHTML;this.$iframe=document.createElement("iframe");this.$iframe.id="iframe_preloader-iframe-"+this.id;this.$iframe.className=this.options.iframe_class;for(var c in this.options.iframe_styles){this.$iframe.style[c]=this.options.iframe_styles[c]}this.$iframe.src=this.options.iframe_src;this.$iframe.scrolling="no";this.$iframe.frameborder="0";this.$close=document.createElement("div");this.$close.id="iframe_preloader-close-"+this.id;this.$close.className=this.options.close_class;for(var b in this.options.close_styles){this.$close.style[b]=this.options.close_styles[b]}this.$close.innerHTML=this.options.close_innerHTML;var a=this;this.$close.onclick=function(){if(typeof pano_iframe_preloader!="undefined"&&pano_iframe_preloader){pano_iframe_preloader.remove()}};this.$iframe.onload=function(){a.options.iframe_before_onload();a.iframe_loaded=true;a.show();a.$close.style.display="none";a.options.iframe_after_onload()};this.hide_iframe();this.lock_body();this.$container.appendChild(this.$preloader);this.$container.appendChild(this.$iframe);this.$container.appendChild(this.$close);document.body.appendChild(this.$container)},hide:function(){this.hide_iframe();this.hide_preloader();this.unlock_body()},show:function(){if(this.iframe_loaded){this.show_iframe();this.hide_preloader()}else{this.hide_iframe();this.show_preloader()}this.lock_body()},remove:function(){this.hide();document.body.removeChild(this.$container);delete this.$container;delete this.$preloader;delete this.$iframe},lock_body:function(){document.body.style.overflow="hidden"},unlock_body:function(){document.body.style.overflow=""},show_preloader:function(){this.window.focus();this.$preloader.style.display="block"},hide_preloader:function(){this.$preloader.style.display="none"},show_iframe:function(){this.$iframe.contentWindow.focus();this.$iframe.style.opacity=1},hide_iframe:function(){this.$iframe.style.opacity=0}};var pano_iframe_preloader=false;Tumblr.PanoLightboxInit=function(b,a){if((!b&&window.event&&(window.event.metaKey||window.event.altKey))||(b&&(b.metaKey||b.altKey))){return true}pano_iframe_preloader=new Tumblr.IframePreloader({iframe_src:a});return false};Tumblr.hasClass=function(b,a){return new RegExp("(\\s|^)"+a+"(\\s|$)").test(b.className)};Tumblr.addClass=function(b,a){if(!Tumblr.hasClass(b,a)){b.className+=" "+a}};Tumblr.removeClass=function(c,a){if(Tumblr.hasClass(c,a)){var b=new RegExp("(\\s|^)"+a+"(\\s|$)");c.className=c.className.replace(b," ")}};Tumblr.toggleClass=function(b,a){if(Tumblr.hasClass(b,a)){Tumblr.removeClass(b,a)}else{Tumblr.addClass(b,a)}};Tumblr.IframeContent=function(){var e,g,h,b;function i(){e=document.createElement("iframe");e.width=b.width;e.height=b.height;e.src="about:blank";for(var j in b.attr){e.setAttribute(j,b.attr[j])}e.setAttribute("frameborder","0");e.setAttribute("scrolling","no");e.setAttribute("webkitAllowFullScreen","");e.setAttribute("mozallowfullscreen","");e.setAttribute("allowFullScreen","");e.setAttribute("seamless","");e.setAttribute("style","display:block;background-color:transparent;overflow:hidden;");g.appendChild(e)}function d(){h="<!DOCTYPE html><html><head><title>Tumblr Video</title></head>";h+='<body class="'+b.body_class+'">';h+=b.content;h+="</body></html>"}function a(){e.onload=f;e.contentWindow.document.open("text/html","replace");e.contentWindow.document.write(h);e.contentWindow.document.close()}function c(){var j=e.contentWindow.document.body.offsetHeight;if(!j){return}e.height=j}function f(){c();if(typeof(b.onload)==="function"){b.onload()}}return{initialize:function(j){b=j;b.width=b.width||500;b.height=b.height||Math.floor(b.width*0.75);g=document.getElementById(b.container);if(!g){return false}i();d();a()}}};Tumblr.Asset=(function(){return{load:function(e,d){d=d||{};var b,f=d.callback||function(){},a=e.split("?")[0],c=a.split(".");c=c[c.length-1];if(c==="js"){b=document.createElement("script");b.setAttribute("type","text/javascript");b.setAttribute("src",e)}if(c==="css"){b=document.createElement("link");b.setAttribute("type","text/css");b.setAttribute("rel","stylesheet");b.setAttribute("href",e)}if(typeof(b)!="undefined"){b.onload=f;document.getElementsByTagName("head")[0].appendChild(b)}}}})();Tumblr.PostMessageListener=(function(){return{initialize:function(d){d=d||function(){};var c=window.addEventListener?"addEventListener":"attachEvent";var b=window[c];var a=c=="attachEvent"?"onmessage":"message";b(a,function(g){var f=g.data.split(";");d(f,g.origin)},false)}}})();Tumblr.PostMessageListener.initialize(function(b,a){Tumblr.VideoFeatureSupport.post_message_event(b,a);Tumblr.AudioFeatureSupport.post_message_event(b,a);Tumblr.IframeFeatureSupport.post_message_event(b,a);Tumblr.AnalyticsFeatureSupport.post_message_event(b,a);Tumblr.SubmissionFormResize.post_message_event(b,a);Tumblr.PhotosetResize.post_message_event(b,a);Tumblr.LikeButtonUpdate.post_message_event(b,a);Tumblr.LikeButton.logged_in_iframe_loaded(b,a);Tumblr.LikeButton.post_message_event(b,a);Tumblr.LikeButton.like_iframe_loaded(b,a)});Tumblr.LikeButtonUpdate=(function(){return{post_message_event:function(c,a){if(c[0]==="tumblelog_like"){if(c[1]&&document.getElementById("like_button_"+c[1])){var b=document.getElementById("like_button_"+c[1]);if(c[2]==="liked"){Tumblr.addClass(b,"liked")}else{Tumblr.removeClass(b,"liked")}}}}}})();Tumblr.LikeButton={loaded_iframes:{},like_statuses:{},get_status_by_page:function(c){var a=document.getElementById("tumblr_controls");var b="get_like_states;"+JSON.stringify({page:c});a.contentWindow.postMessage(b,"*")},get_status_by_post_ids:function(b){var a=document.getElementById("tumblr_controls");var c="get_like_states;"+JSON.stringify({ids:b});a.contentWindow.postMessage(c,"*")},post_message_event:function(d,b){if(d[0]==="like_state_update"){var e=JSON.parse(d[1]);if(e.length){for(var c=0,a=e.length;c<a;c++){Tumblr.LikeButton.queue_like_status(e[c]);Tumblr.LikeButton.update_like_state(e[c])}}else{Tumblr.LikeButton.queue_like_status(e);Tumblr.LikeButton.update_like_state(e)}}},logged_in_iframe_loaded:function(m,h){if(m[0]==="logged_in_iframe_loaded"){var g="";var k="";var l=window.location.pathname;if(l.indexOf("page")!==-1||l.indexOf("post")!==-1){var e=l.split("/");for(var c=0;c<e.length;c++){if(e[c]==="page"&&e[c++]){g=e[c++];break}if(e[c]==="post"&&e[c++]){k=e[c++];break}}}if(k){Tumblr.LikeButton.get_status_by_post_ids([k])}else{if(g){Tumblr.LikeButton.get_status_by_page(g)}else{var f=[];var b=document.querySelectorAll(".like_button");for(var a=0;a<b.length;a++){var d=b[a];if(d.attributes["data-post-id"]){f.push(d.attributes["data-post-id"].value)}}if(f.length>0){Tumblr.LikeButton.get_status_by_post_ids(f)}}}}},like_iframe_loaded:function(b,a){if(b[0]==="like_iframe_load"){var c=JSON.parse(b[1]);if(c.post_id){Tumblr.LikeButton.loaded_iframes[c.post_id]=1;Tumblr.LikeButton.check_like_status(c.post_id,true)}}},check_like_status:function(b,a){var d=Tumblr.LikeButton.like_statuses[b];if(d){var c={post_id:b,state:(d==="liked")?true:false};Tumblr.LikeButton.update_like_state(c)}},queue_like_status:function(a){if(a.post_id){Tumblr.LikeButton.like_statuses[a.post_id]=(a.state)?"liked":"unliked"}},update_like_state:function(b){if(b.post_id){var a=document.getElementById("like_iframe_"+b.post_id);if(a){a.contentWindow.postMessage("state_update;"+JSON.stringify(b),"http://assets.tumblr.com")}}}};Tumblr.SubmissionFormResize=(function(){return{post_message_event:function(b,a){if(b[0]==="resize_submission_iframe"){var c=document.getElementById("submit_form");if(c){c.height=parseInt(b[2],10)+80}}}}})();Tumblr.PhotosetResize=(function(){return{post_message_event:function(c,b){if(c[0]==="resize_photoset_iframe"){var d=c[1],a=parseInt(c[2],10);document.getElementById("photoset_iframe_"+d).height=a}}}})();Tumblr.AnalyticsFeatureSupport=(function(){return{post_message_event:function(c,a){if(c[0]==="openInMobileAppSuccess"){if(typeof(open_in_mobile_app)==="function"){if(c[1]&&c[1].length){var b=parseInt(c[1],10);open_in_mobile_app(b)}}}}}})();Tumblr.IframeFeatureSupport=(function(){var h,d,b;function g(k,i){var j;if(typeof k.currentStyle!="undefined"){j=k.currentStyle}else{j=document.defaultView.getComputedStyle(k,null)}return j[i]||false}function e(){var j,k,i=document.querySelector('meta[name="color:Tumblr Controls"]');if(i){j=i.getAttribute("content")}if(!j){j="default"}h.contentWindow.postMessage("color_match;"+j,d)}function f(i,j){if(!(typeof i==="string"&&i.match(/\d+%/))){i=parseInt(i,10)||0}if(!(typeof j==="string"&&j.match(/\d+%/))){j=parseInt(j,10)||0}if(i){h.width=i}if(j){h.height=j}}function a(){notes_iframe.parentNode.removeChild(notes_iframe)}function c(j){if(!j){j=200}var i=false;window.addEventListener("scroll",function(){if(i){return}var k=window.pageYOffset||document.body.scrollTop||document.documentElement.scrollTop||0;var l=window.pageXOffset||document.body.scrollLeft||document.documentElement.scrollLeft||0;h.contentWindow.postMessage("parent_scroll;"+k+";"+l,d);i=true;setTimeout(function(){i=false},j)})}return{post_message_event:function(m,j){b=document.getElementById("mobile_iframe");h=document.getElementById("tumblr_controls");notes_iframe=document.getElementById("notes_iframe");d=m[m.length-1];if(b){if(m[0]==="show_mobile_banner"){if(m[1]==="1"){Tumblr.MobileBanner.showBanner();Tumblr.MobileBanner.mobile_origin=d}else{Tumblr.MobileBanner.showHeaderBanner()}}}else{if(h&&d){if(m[0]==="color_match"){e()}if(m[0]==="location_change"){if(!document.getElementById("iframe_flash_fix")){var o=document.createElement("div");o.id="iframe_flash_fix";o.innerHTML="&shy;<style> #tumblr_controls { visibility: hidden; } </style>";document.body.appendChild(o);document.getElementById("tumblr_controls").onload=function(){document.body.removeChild(o)}}}if(m[0]==="request_keywords"){if(typeof tumblr_meta_keyboards!="undefined"){h.contentWindow.postMessage("keywords;"+tumblr_meta_keyboards,d)}}if(m[0]==="resize_iframe"){f(m[1],m[2]);if(m.length>2){switch(m[3]){case"body_class":if(m.length>3&&m[4]){Tumblr.addClass(document.body,m[4])}break;default:break}}}if(m[0]==="mobile_resize_iframe"){f(m[1],m[2]);var l=h.width;var i=h.height;var k=0;var n=3;while(n<m.length){switch(m[n]){case"add_iframe_class":if(n+1<m.length){Tumblr.addClass(h,m[++n])}break;case"remove_iframe_class":if(n+1<m.length){Tumblr.removeClass(h,m[++n])}break;case"margin_bottom":if(n+1<m.length){k=parseInt(m[++n],10);if(!k){k=0}}break;default:break}n++}h.style.position="absolute";h.style.top=(k-i)+"px";document.body.parentNode.style.position="relative";document.body.parentNode.style.top=(i-k)+"px"}if(m[0]==="remove_notes_iframe"){a()}if(m[0]==="scroll_listen"){c((m.length>2)?m[1]:false)}}}}}})();Tumblr.VideoFeatureSupport=(function(){var b={setup_controls:{}};function f(){if(document.getElementById("tumblr_video_iframe_fullscreen")){return true}var j=document.createElement("style");j.id="tumblr_video_iframe_fullscreen";j.innerHTML=".tumblr_video_iframe.fullwindow { top: 0; bottom: 0; right: 0; left: 0; position: fixed; z-index: 8675309; height: 100%; width: 100%; }";document.body.appendChild(j)}function e(j){f();if(j){b.iframe.className="tumblr_video_iframe fullwindow"}else{b.iframe.className="tumblr_video_iframe"}}function i(j){var k=document.getElementById("tumblr_controls");if(!j){if(b.parent_post){b.parent_post.className=b.parent_post.className.replace(/\s+is_lightbox/g,"")}document.body.className=document.body.className.replace(/\s+is_lightbox/g,"");document.body.style.overflow="visible";b.iframe.style.position="static";b.iframe.style.height="100%";b.iframe.style.width="100%";b.iframe.style.zIndex=0;if(k){k.style.display="block"}return}a();if(b.parent_post){b.parent_post.className+=" is_lightbox"}document.body.className+=" is_lightbox";document.body.style.overflow="hidden";b.iframe.style.position="fixed";b.iframe.style.height="100%";b.iframe.style.width="100%";b.iframe.style.top=0;b.iframe.style.right=0;b.iframe.style.left=0;b.iframe.style.bottom=0;b.iframe.style.zIndex=90210;if(k){k.style.display="none"}}function g(j){if(!j){if(b.parent_post){b.parent_post.className=b.parent_post.className.replace(/\s+is_fullscreen/g,"")}document.body.className=document.body.className.replace(/\s+is_fullscreen/g,"");return}if(b.parent_post){b.parent_post.className+=" is_fullscreen"}document.body.className+=" is_fullscreen"}function a(){if(b.setup_controls[b.id]){return}var j=document.querySelector("#post_"+b.id+" .tumblr_lightbox_controls .close_button");if(j){j.addEventListener("click",function(k){b.iframe.contentWindow.postMessage("exit_lightbox",b.origin_url);return false})}b.setup_controls[b.id]=true}function h(){if(typeof(get_cookie)==="function"){var j=get_cookie("supress_lightbox"),k=parseInt(j.value,10)||0;if(j&&k>3){return"supress_lightbox"}if(!j){return"enable_lightbox"}}return false}function d(k){if(typeof(set_cookie)==="function"){var j=get_cookie("supress_lightbox"),l=parseInt(j.value,10)||0;if(k>0&&k<5){}if(k===-1){if(l>1){}else{}}c(h())}}function c(l){if(!l){return}var k=document.querySelectorAll(".tumblr_video_iframe.has_lightbox");for(var j=0;j<k.length;j++){k[j].contentWindow.postMessage(l,"http://"+k[j].getAttribute("data-origin"))}}return{post_message_event:function(l,j){var k=l[2];b.iframe=document.getElementById("tumblr_video_iframe_"+k);if(!b.iframe){return}b.id=k;b.origin_url="http://"+b.iframe.getAttribute("data-origin");b.parent_post=document.getElementById("post_"+k);if(l[0]==="lightbox"){i((l[1]==="true")?true:false)}if(l[0]==="full_window"){e((l[1]==="true")?true:false)}if(l[0]==="full_screen"){g((l[1]==="true")?true:false)}}}})();Tumblr.AudioFeatureSupport=(function(){return{post_message_event:function(d,a){var c,b;if(d[0]==="audioPlayerReady"){c=document.getElementsByClassName("tumblr_audio_player");for(b=0;b<c.length;b++){if(c[b].className.indexOf(" tumblr_audio_player_"+d[1])>=0){try{if(!c[b].style.webkitTransform){c[b].style.webkitTransform="translate3d(0px, 0px, 0px)"}}catch(f){}}}}else{if(d[0]==="audioPlayerPlaying"){c=document.getElementsByClassName("tumblr_audio_player");for(b=0;b<c.length;b++){if(c[b].className.indexOf(" tumblr_audio_player_"+d[1])<0){c[b].contentWindow.postMessage("pause","*")}}c=document.getElementsByClassName("tumblr_video_iframe");for(b=0;b<c.length;b++){c[b].contentWindow.postMessage("pause","*")}}}}}})();Tumblr.mobileFullscreenIframe={og_store:function(){this.og_body_position=document.body.style.position;this.og_body_overflow=document.body.style.overflow;this.og_html_bg=this.html_el.style.backgroundColor;this.win_height=window.innerHeight+"px"},set_frame_height:function(){this.win_height=window.innerHeight+"px";this.win_width=window.innerWidth+"px";this.frame.style.height=this.win_height;this.frame.style.minWidth=this.win_width},enable:function(a){this.frame=document.getElementById(a);if(!this.frame){return}this.html_el=document.getElementsByTagName("html")[0];this.og_store();this.orientation_height_change=this.set_frame_height.bind(this);window.addEventListener("orientationchange",this.orientation_height_change,false);window.addEventListener("resize",this.orientation_height_change,false);this.frame.className+=" is_lightbox";document.body.className+=" is_lightbox";document.body.style.position="relative";document.body.style.left="-99999px";document.body.style.overflow="hidden";this.html_el.style.backgroundColor="#000000";this.frame.style.cssText="position:fixed; overflow:hidden; width: 100%; top:0; left:0; right:0; bottom:0; z-index: 90210;";this.frame.style.height=this.win_height;if(document.getElementById("tumblr_controls")){document.getElementById("tumblr_controls").style.display="none"}},disable:function(a){this.frame=this.frame||document.getElementById(a);if(!this.frame){return}this.frame.className=this.frame.className.replace(/\s+is_lightbox/,"");document.body.className=document.body.className.replace(/\s+is_lightbox/,"");document.body.style.overflow=this.og_body_overflow;document.body.style.position=this.og_body_position;this.html_el.style.backgroundColor=this.og_html_bg;this.frame.style.cssText="";if(document.getElementById("tumblr_controls")){document.getElementById("tumblr_controls").style.display="block"}window.removeEventListener("orientationchange",this.orientation_height_change,false);window.removeEventListener("resize",this.orientation_height_change,false)}};function flashVersion(){return Tumblr.flashVersion()}function renderVideo(c,e,d,a,b){Tumblr.renderVideo(c,e,d,a,b)}function replaceIfFlash(b,a,c){Tumblr.replaceIfFlash(b,a,c)}(function(){function a(){var g=document.getElementById("tumblr_controls");if(!g){return}var l=window.innerHeight||document.documentElement.clientHeight||document.getElementsByTagName("body")[0].clientHeight;var i=g.offsetTop;var e=l-(g.offsetTop+g.offsetHeight);if(i===0||e===0){g.style.position="fixed";return}if(!g.classList){return}var k=g.clientHeight;var h="        html body iframe#tumblr_controls {            -webkit-transition-property: opacity;               -moz-transition-property: opacity;                -ms-transition-property: opacity;                 -o-transition-property: opacity;                    transition-property: opacity;            -webkit-transition-duration: .3s;               -moz-transition-duration: .3s;                -ms-transition-duration: .3s;                 -o-transition-duration: .3s;                    transition-duration: .3s;            -webkit-transition-timing-function: ease;               -moz-transition-timing-function: ease;                -ms-transition-timing-function: ease;                 -o-transition-timing-function: ease;                    transition-timing-function: ease;        }        html body iframe#tumblr_controls.tumblr_sticky_iframe {            position: fixed !important;            top: 0 !important;        }        ";var b;var d="tumblr_sticky_iframe_style";var j=document;if(j.createStyleSheet){b=j.createStyleSheet();b.cssText=h;if(d){b.owningElement.id=d}}else{b=j.createElementNS?j.createElementNS("http://www.w3.org/1999/xhtml","style"):j.createElement("style");b.appendChild(j.createTextNode(h));if(d){b.id=d}j.getElementsByTagName("head")[0].appendChild(b)}function f(){g.style.visibility="visible";g.style.opacity=1}function c(){var m=window.pageYOffset||(document.documentElement&&document.documentElement.scrollTop)||document.body.scrollTop;if(m>=(i+k)){if(g.classList.contains("tumblr_sticky_iframe")){return}g.style.visibility="hidden";g.style.opacity=0;g.classList.add("tumblr_sticky_iframe");setTimeout(f,400)}else{g.classList.remove("tumblr_sticky_iframe")}}window.setInterval(c,500)}if(window.addEventListener){window.addEventListener("DOMContentLoaded",a,false)}else{window.attachEvent("onload",a)}})();