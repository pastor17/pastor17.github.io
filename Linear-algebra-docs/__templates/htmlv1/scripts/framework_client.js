if(jQuery){(function(){$.extend($.fn,{rightMouseUp:function(handler){$(this).each(function(){$(this).mouseup(function(e){if(e.button==2){handler.call($(this),e);return false;}else{return true;}});$(this)[0].oncontextmenu=function(){return false;};});return $(this);}});})(jQuery);}var __HX_RTE=null;var __HX_FW=null;var __HX_CC=null;function __HX_GetCourseRTE(win){if(__HX_RTE!=null){return __HX_RTE;}if(!win){return null;}var rte=null;try{rte=win.HX_C_RTE;}catch(e){}if(rte){__HX_RTE=rte.RTE;return __HX_RTE;}else{if(win.top&&win.top!=win){__HX_RTE=__HX_GetCourseRTE(win.top);}if(__HX_RTE){return __HX_RTE;}if(win.parent&&win.parent!=win){__HX_RTE=__HX_GetCourseRTE(win.parent);return __HX_RTE;}}}var _hx_question_message={show_answer:"显示答案",hide_answer:"隐藏答案"};function __HX_GetCourseCfgs(win){if(__HX_CC!=null){return __HX_CC;}if(!win){return null;}var tmp=null;try{tmp=win.HX_C_RTE;}catch(e){}if(tmp){__HX_CC=tmp.configs;return __HX_CC;}else{if(win.top&&win.top!=win){__HX_CC=__HX_GetCourseCfgs(win.top);
}if(__HX_CC){return __HX_CC;}if(win.parent&&win.parent!=win){__HX_CC=__HX_GetCourseCfgs(win.parent);return __HX_CC;}}}function __HX_GetCourseFW(win){if(__HX_FW!=null){return __HX_FW;}if(!win){return null;}var tmp=null;try{tmp=win.HX_C_FW;}catch(e){}if(tmp){__HX_FW=tmp;return __HX_FW;}else{if(win.top&&win.top!=win){__HX_FW=__HX_GetCourseFW(win.top);}if(__HX_FW){return __HX_FW;}if(win.parent&&win.parent!=win){__HX_FW=__HX_GetCourseFW(win.parent);return __HX_FW;}}}function __HX_GetPlayer(win){var fw=__HX_GetCourseFW(win);if(fw!=null){return fw.player;}return null;}function __HX_QuestionParse(){$(".popup-questions").each(function(){var t=$(this);t.hide();$(".question",t).each(function(){var tt=$(this);tt.attr("popup","true");});});var fw=__HX_GetCourseFW(window);var configs=__HX_GetCourseCfgs(window);$(".question").each(function(){var t=$(this);if(t.attr("popup")!="true"){var answer=$(".answer",t);answer.hide();var html="<div class='question-action-bar'>";if(t.attr("canViewAnswer")!="false"){html=html+"<button code='"+t.attr("code")+"' cuePoints='"+answer.attr("cuePoints")+"' hasVideo='"+answer.attr("hasVideo")+"' class='view_answer_btn' onclick='__HX_ShowQuestionAnswer(this);' title='点击可以"+_hx_question_message.show_answer+"'>"+_hx_question_message.show_answer+"</button>";
}if(fw!=null&&configs!=null&&configs.canQuestion&&t.attr("question")=="true"){html=html+"<button code='"+t.attr("code")+"' class='question_btn' title='针对本题提问' onclick='_HX_Question(this);'>提问</button>";}html=html+"</div>";var elem=$(html);elem.insertBefore(answer);}});}function __HX_ShowQuestionAnswer(t){var t=$(t);var code=t.attr("code");var hasVideo=t.attr("hasVideo");var tmp=$(".question[code='"+code+"']");if(t.text()==_hx_question_message.show_answer){t.attr("title","点击可以"+_hx_question_message.hide_answer);t.text(_hx_question_message.hide_answer);if(hasVideo=="true"){var player=__HX_GetPlayer();if(player!=null){player.Play(t.attr("cuePoints"));}}}else{t.attr("title","点击可以"+_hx_question_message.show_answer);t.text(_hx_question_message.show_answer);if(hasVideo=="true"){var player=__HX_GetPlayer();if(player!=null){player.Clear();}}}$(".answer",tmp).toggle();}function _HX_Question(t){var t=$(t);var code=t.attr("code");var tmp=$(".question[code='"+code+"']");var fw=__HX_GetCourseFW(window);
if(fw!=null){var cl=tmp.clone();$(".question-action-bar",cl).each(function(){$(this).remove();});$(".hand-write",cl).each(function(){$(this).remove();});$(".flash-obj",cl).each(function(){$(this).remove();});$("object",cl).each(function(){$(this).remove();});$("embed",cl).each(function(){$(this).remove();});$("img",cl).each(function(){var t=$(this);var src=t.attr("src");if($.browser.msie){t.attr("src",src);}else{t.attr("src",__HX_CurrentBaseUrl+src);}});$(".question-answer-region",cl).each(function(){$(this).remove();});$(".question-id",cl).each(function(){$(this).remove();});$(".answer",cl).show();var html=cl.html();fw.Question(code,html);}}function __HX_FindFlashObj(objId){if($.browser.msie){return window[objId];}else{return document[objId];}}var __HX_DocReady=false;function __HX_DocIsReady(){if(__HX_DocReady){return"true";}else{return"false";}}var __HX_ContentIndex=null;var __HX_ContentAPI={GenerateOutline:function(){var html="";if(__HX_ContentIndex==null){__HX_ContentIndex=$("h2");}var i=0;
__HX_ContentIndex.each(function(){var t=$(this);html=html+'<li onclick="HX_C_FW.GotoOutlineItem(this)" idx="'+i+'">'+t.html()+"</li>";i++;});if(i==0){html=html+'<li onclick="HX_C_FW.GotoOutlineItem(this)" idx="-1">无索引内容</li>';}html=html+'<li onclick="HX_C_FW.GotoOutlineItem(this)" idx="-1"><span>关闭</span></li>';return html;},GotoOutlineItem:function(idxstr){var idx=parseInt(idxstr);if(idx>=0&&__HX_ContentIndex!=null){var t=$(__HX_ContentIndex[idx]);var offset=t.offset();var doc=$(document);doc.scrollTop(offset.top);}},SyncPart:function(partId){$(".part-selected").each(function(){var t=$(this);t.removeClass("part-selected");var cl=$(".current-part-label",t);cl.remove();});var part=$("#"+partId);part.addClass("part-selected");part.prepend("<label class='current-part-label'>当前讲授</label>");},SyncQuestion:function(queId){},SyncFlash:function(objIdAndAction){try{var splits=objIdAndAction.split("|",3);if(splits.length>1){var objId=splits[0];var objDiv=$("#"+objId+"_div");var asver=objDiv.attr("asver");
var fObj=__HX_FindFlashObj(objId);if(fObj!=null){if(splits[1]=="Play"){if(asver==3){fObj.HX_Play();}else{fObj.Play();}}else{if(splits[1]=="GotoAndPlay"){if(asver==3){fObj.HX_GotoAndPlay(splits[2]);}else{fObj.GotoFrame(splits[2]);fObj.Play();}}else{if(splits[1]=="GotoAndStop"){if(asver==3){fObj.HX_GotoAndStop(splits[2]);}else{fObj.GotoFrame(splits[2]);fObj.Stop();}}}}}}}catch(e){}},RollToPart:function(pid){var t=$("#"+pid);if(t){var offset=t.offset();var doc=$(document);doc.scrollTop(offset.top);}},UpdateKnowStatus:function(knowid,status){var k=$("#"+knowid);if(k.length>0){if(!k.hasClass("complete-status-completed")){try{k.removeClass("complete-status-uncomplete");}catch(e){}k.addClass("complete-status-"+status);}}},PrintContent:function(){window.focus();window.print();}};var isIE=(navigator.appVersion.indexOf("MSIE")!=-1)?true:false;var isWin=(navigator.appVersion.toLowerCase().indexOf("win")!=-1)?true:false;var isOpera=(navigator.userAgent.indexOf("Opera")!=-1)?true:false;function AC_AddExtension(src,ext){if(src.indexOf("?")!=-1){return src.replace(/\?/,ext+"?");
}else{return src+ext;}}function AC_Generateobj(objAttrs,params,embedAttrs){var str="";if(isIE&&isWin&&!isOpera){str+="<object ";for(var i in objAttrs){str+=i+'="'+objAttrs[i]+'" ';}str+=">";for(var i in params){str+='<param name="'+i+'" value="'+params[i]+'" /> ';}str+="</object>";}else{str+="<embed ";for(var i in embedAttrs){str+=i+'="'+embedAttrs[i]+'" ';}str+="> </embed>";}return str;}function AC_FL_RunContent(){var ret=AC_GetArgs(arguments,".swf","movie","clsid:d27cdb6e-ae6d-11cf-96b8-444553540000","application/x-shockwave-flash");return AC_Generateobj(ret.objAttrs,ret.params,ret.embedAttrs);}function AC_GetArgs(args,ext,srcParamName,classid,mimeType){var ret=new Object();ret.embedAttrs=new Object();ret.params=new Object();ret.objAttrs=new Object();for(var i=0;i<args.length;i=i+2){var currArg=args[i].toLowerCase();switch(currArg){case"classid":break;case"pluginspage":ret.embedAttrs[args[i]]=args[i+1];break;case"src":case"movie":args[i+1]=AC_AddExtension(args[i+1],ext);ret.embedAttrs.src=args[i+1];
ret.params[srcParamName]=args[i+1];break;case"onafterupdate":case"onbeforeupdate":case"onblur":case"oncellchange":case"onclick":case"ondblclick":case"ondrag":case"ondragend":case"ondragenter":case"ondragleave":case"ondragover":case"ondrop":case"onfinish":case"onfocus":case"onhelp":case"onmousedown":case"onmouseup":case"onmouseover":case"onmousemove":case"onmouseout":case"onkeypress":case"onkeydown":case"onkeyup":case"onload":case"onlosecapture":case"onpropertychange":case"onreadystatechange":case"onrowsdelete":case"onrowenter":case"onrowexit":case"onrowsinserted":case"onstart":case"onscroll":case"onbeforeeditfocus":case"onactivate":case"onbeforedeactivate":case"ondeactivate":case"type":case"codebase":case"id":ret.objAttrs[args[i]]=args[i+1];break;case"width":case"height":case"align":case"vspace":case"hspace":case"class":case"title":case"accesskey":case"name":case"tabindex":ret.embedAttrs[args[i]]=ret.objAttrs[args[i]]=args[i+1];break;default:ret.embedAttrs[args[i]]=ret.params[args[i]]=args[i+1];
}}ret.objAttrs.classid=classid;if(mimeType){ret.embedAttrs.type=mimeType;}return ret;}function __HX_WriteFlashObj(n,s,w,h,asver){if(asver!=2&&asver!=1){asver=3;}var p="true";var l="true";if(asver==1){p="false";l="false";}document.write("<div title='动画演示板' class='flash-obj' id='"+n+"_div' asver='"+asver+"' style='width:"+w+"px;height:"+h+"px'>"+AC_FL_RunContent("codebase","http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0","width",w,"height",h,"src",s,"quality","high","pluginspage","http://www.macromedia.com/go/getflashplayer","align","middle","play",p,"loop",l,"scale","showall","wmode","transparent","devicefont","false","id",n,"bgcolor","#ffffff","name",n,"menu","false","allowFullScreen","false","allowScriptAccess","sameDomain","movie",s,"salign","")+"</div>");}var __HX_CurrentBaseUrl="";$(document).ready(function(){var fw=__HX_GetCourseFW(window);if(fw!=null){$(".page-part").each(function(){var t=$(this);t.attr("title","双击播放本段");t.dblclick(function(){var part=$(this);
var player=__HX_GetPlayer(window);if(player!=null){player.SeekByPart(part.attr("id"));}});if($.browser.msie&&$.browser.version<7){t.mouseover(function(){$(this).addClass("part-mouseover");});t.mouseleave(function(){$(this).removeClass("part-mouseover");});}});}__HX_QuestionParse();$("#container").css("visibility","visible");__HX_CurrentBaseUrl=document.URL+"";__HX_CurrentBaseUrl=__HX_CurrentBaseUrl.substring(0,__HX_CurrentBaseUrl.lastIndexOf("/"));var rte=__HX_GetCourseRTE(window);if(rte!=null&&rte.IsEnabled()){var tracks=rte.ListHashTracks();var passScore=rte.GetPassScore();$(".know-item").each(function(){var t=$(this);var id="sco_"+t.attr("id");if((tracks!=null)&&(tracks[id]!=undefined)){var track=tracks[id];var status="complete-status-uncomplete";if(track.score>=passScore){status="complete-status-completed";}t.addClass(status);}});$(document).mousemove(__HX_UpdateActive);$(document).keydown(__HX_UpdateActive);}if(fw!=null){fw.OnContentReady(__HX_ContentAPI);}$(document).rightMouseUp(function(e){if(fw!=null){var t=$(this);
fw.ShowContextMenu(e.pageX-t.scrollLeft(),e.pageY-t.scrollTop(),false);}});$(document).click(function(e){if(fw!=null&&e.button!=2){fw.HideContextMenu();}});if($.browser.msie){document.onselectstart=function(){return false;};}__HX_DocReady=true;$(".embeded_video").each(function(){var t=$(this);t.text("观看操作视频");t.click(function(){var tmp=__HX_GetPlayer(window);if(tmp){tmp.SeekByTime(parseInt($(this).attr("time"))/1000);}});});$(".part_hide").each(function(){var t=$(this);var h=$(".header",t);h.attr("title",h.text());h.text("显示"+h.attr("title"));h.addClass("show");h.click(function(){var tt=$(this);var p=tt.parent();var b=$(".body",p);b.toggle();if(b.is(":visible")){tt.removeClass("show");tt.addClass("hide");tt.text("隐藏"+tt.attr("title"));}else{tt.removeClass("hide");tt.addClass("show");tt.text("显示"+tt.attr("title"));}});});});function __HX_UpdateActive(){var fw=__HX_GetCourseFW(window);if(fw!=null){fw.UpdateActive();}}__HX_ContentAPI.SyncQuestion=function(queId){var fw=__HX_GetCourseFW(window);
if(fw){var ques=$("#"+queId);$("img",ques).each(function(){var t=$(this);t.attr("alt",t.attr("src"));});fw.ShowAlertQuestion("<div id='"+queId+"' class='popup-questions' knowid='"+ques.attr("knowid")+"' syncpart='"+ques.attr("syncpart")+"'>"+ques.clone().html()+"</div>",__HX_CurrentBaseUrl);}};