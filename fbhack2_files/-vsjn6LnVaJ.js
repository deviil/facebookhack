/*!CK:1338496466!*//*1395624515,178141991*/

if (self.CavalryLogger) { CavalryLogger.start_js(["wXFvu"]); }

__d("ControlledReferer",["Event","URI","UserAgent"],function(a,b,c,d,e,f,g,h,i){var j={useFacebookReferer:function(k,l,m){var n=false;function o(){if(n)return;var q=k.contentWindow.location.pathname;if(q!=='/intern/common/referer_frame.php'&&q!=='/common/referer_frame.php')return;n=true;k.contentWindow.document.body.style.margin=0;l();}var p;if(document.domain!=='facebook.com'){p='/intern/common/referer_frame.php';}else if(i.opera()){p='/common/referer_frame.php';}else if(h().isSecure()){p='https://s-static.ak.facebook.com/common/referer_frame.php';}else p='http://static.ak.facebook.com/common/referer_frame.php';if(m)p+='?fb_source='+m;g.listen(k,'load',o);k.src=p;},useFacebookRefererHtml:function(k,l,m){j.useFacebookReferer(k,function(){k.contentWindow.document.body.innerHTML=l;},m);}};e.exports=j;});
__d("TrackingPixel",["Arbiter","ControlledReferer"],function(a,b,c,d,e,f,g,h){var i={_iframe:undefined,loadWithNoReferrer:function(j){if(!i._iframe){var k=document.createElement('iframe');k.frameborder=0;k.width=k.height=1;k.style.position='absolute';k.style.top='-10px';h.useFacebookReferer(k,function(){g.inform('TrackingPixel/iframeIsLoaded',null,g.BEHAVIOR_PERSISTENT);},null);document.body.appendChild(k);i._iframe=k;}g.subscribe('TrackingPixel/iframeIsLoaded',function(){var l=i._iframe.contentWindow.document,m=l.createElement('img');m.src=j;});}};e.exports=i;});
__d("ExternalTrackingTag",["AsyncSignal","TrackingPixel","Event"],function(a,b,c,d,e,f,g,h,i){var j={listenForElementClick:function(k,l,m,n,o){i.listen(k,'click',function(){j.sendRequest(l,m,n,o);});},sendRequest:function(k,l,m,n){if(!k)return;new g('/ads/external_tracking_tag/',{href:k,tracking_tag_id:l,adgroup_id:m,ad_id:n}).send();h.loadWithNoReferrer(k);}};e.exports=j;});
__d("FeedAdsClickLogger",["Arbiter","AsyncRequest","Banzai","collectDataAttributes","DOM","ge","LitestandMessages","LitestandStream","Parent","TrackingNodes","ExternalTrackingTag","URI"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r){var s='ssinfeed',t={},u=false,v=[];function w(){"use strict";}w.prototype.init=function(x){"use strict";g.subscribe("ClickRefAction/new",this.onNewUserAction.bind(this));if(x.append_tracking_data_to_links){this.appendTrackingDataToLinks();g.subscribe(m.STORIES_INSERTED,this.appendTrackingDataToLinks.bind(this));g.subscribe('FeedAdsClickLogger/refreshTrackingData',this.appendTrackingDataToLinks.bind(this),g.SUBSCRIBE_NEW);}};w.prototype.getStories=function(){"use strict";var x=n.getStreamRoot();if(x){return k.scry(x,n.getStoriesSelector());}else{var y=l('home_stream');if(y)return k.scry(y,'.uiStreamStory');}return [];};w.prototype.appendTrackingDataToLinks=function(){"use strict";var x=this.getStories();for(var y=0;y<x.length;y++){var z=x[y];if(z in v)continue;var aa=z.getAttribute('data-ft');if(!aa||(aa.indexOf('ei')===-1)&&(aa.indexOf('mei')===-1))continue;var ba=k.scry(z,'a');for(var ca=0;ca<ba.length;ca++){var da=ba[ca];if(da.getAttribute('ajaxify')!=null)continue;if(da.getAttribute('rel')!=null)continue;var ea=da.getAttribute('href');if(!ea||ea.charAt(0)==='#')continue;var fa=r(da);if(fa.isFacebookURI()===false)continue;if(fa.isLinkshimURI()===true)continue;var ga=j(da,['ft']).ft,ha=fa.getQueryData();ha.ft=ga;ha.__md__=0;fa.setQueryData(ha);da.setAttribute('href',fa.toString());da.setAttribute('onmousedown',"this.href = this.href.replace('__md__=0', '__md__=1');");}v.push(z);}};w.prototype.getHref=function(x){"use strict";return (x.getAttribute&&(x.getAttribute('ajaxify')||x.getAttribute('data-endpoint'))||x.action||x.href||x.name);};w.prototype.sendLogRequest=function(x){"use strict";var y=x.ei||x.ai;if(!y&&x.mei)y=x.mf_story_key;if(x!==null&&typeof(y)==="string"){var z=false;if(x.tn){var aa=p.parseTrackingNodeString(x.tn);for(var ba=0;ba<aa.length;ba++){var ca=aa[ba][0];switch(ca){case p.types.LIKE_LINK:case p.types.UNLIKE_LINK:case p.types.COMMENT:case p.types.ADD_COMMENT_BOX:return;case p.types.XBUTTON:case p.types.HIDE_LINK:case p.types.REPORT_SPAM_LINK:case p.types.HIDE_ALL_LINK:case p.types.DROPDOWN_BUTTON:case p.types.UNHIDE_LINK:return;case p.types.RELATED_SHARE_ARTICLE:case p.types.RELATED_SHARE_VIDEO:return;case p.types.ATTACHMENT:case p.types.USER_MESSAGE:z=true;break;}}}var da=Date.now(),ea=500;x.duplicate_click=!!t[y]&&(da-t[y]<ea);t[y]=da;if(i.isEnabled('ssinfeed')){i.post(s,x,{delay:0,retry:i.isEnabled('ssinfeed_retry')});}else{var fa=new h('/ajax/ssinfeed/end/').setData(x).setAllowCrossPageTransition(true).setMethod('POST');fa.send();}var ga=x.href;if(r(ga).isLinkshimURI()&&r(ga).getQueryData())ga=r(ga).getQueryData().u;if(z&&x.external_tracking_tag&&!x.duplicate_click&&ga&&r(ga).isFacebookURI()===false)q.sendRequest(x.external_tracking_tag.url,x.external_tracking_tag.tag_id,x.external_tracking_tag.adgroup_id);}};w.prototype.onNewUserAction=function(x,y){"use strict";if(!y.node)return;var z=this.getHref(y.node),aa=o.byTag(y.node,'input')||o.byTag(y.node,'button');if(!z&&aa&&aa.type=="submit"&&aa.getAttribute&&aa.getAttribute('data-ft'))z="#";var ba;if(z&&y.event&&(y.event.type==='click'||y.event.type==='contextmenu')){ba=j(y.node,['ft']);ba.ft.href=z;ba.ft.mouse_type=y.event.type;this.sendLogRequest(ba.ft);}};e.exports.init=function(x){if(u===false){(new w()).init(x);u=true;}};});
__d("SwapButton",["DOM","Event","Focus","copyProperties"],function(a,b,c,d,e,f,g,h,i,j){function k(m,n,o){g.insertAfter(n,m);g.remove(n);o&&i.setWithoutOutline(m);}function l(m,n,o){"use strict";this._swapperButton=m;this._swappeeButton=n;h.listen(m,'click',k.bind(null,n,m,true));if(o)h.listen(n,'click',k.bind(null,m,n,true));}l.prototype.swap=function(m){"use strict";if(this._swapperButton.parentNode)k(this._swappeeButton,this._swapperButton,m);};l.prototype.unswap=function(m){"use strict";if(!this._swapperButton.parentNode)k(this._swapperButton,this._swappeeButton,m);};l.prototype.toggle=function(m){"use strict";if(this._swapperButton.parentNode){this.swap(m);}else this.unswap(m);};l.prototype.getCurrentButton=function(){"use strict";return this._swapperButton.parentNode?this._swapperButton:this._swappeeButton;};j(l.prototype,{_swapperButton:null,_swappeeButton:null});e.exports=l;});
__d("HoverButton",["AsyncRequest","CSS","DOM","URI","copyProperties","cx"],function(a,b,c,d,e,f,g,h,i,j,k,l){function m(n,o,p,q){"use strict";this._button=n;this._flyout=o;this._flyoutAjaxify=q;this._flyoutContent=p;o.subscribe('show',this._onShow.bind(this));o.subscribe('hide',this._onHide.bind(this));}m.prototype.showFlyoutBriefly=function(){"use strict";this.showFlyout();this._flyout.hideFlyoutDelayed(5000);};m.prototype.showFlyout=function(){"use strict";this._flyout.showFlyout(this._button,true);this._flyout.inform('show',this._button);};m.prototype.hideFlyout=function(){"use strict";this._flyout.hideFlyout(true);this._flyout.inform('hide',this._button);};m.prototype.enableButton=function(){"use strict";this._flyout.initNode(this._button);};m.prototype.disableButton=function(){"use strict";this.hideFlyout();this._flyout.deactivateNode(this._button);};m.prototype._onShow=function(n,o){"use strict";h.addClass(o,"_52nd");if(h.hasClass(o,'uiButton')||h.hasClass(o,"_42fu"))h.addClass(o,'selected');if(this._flyoutAjaxify){h.addClass(this._flyoutContent,'async_saving');new g().setURI(new j(this._flyoutAjaxify)).setHandler(function(p){h.removeClass(this._flyoutContent,'async_saving');i.setContent(this._flyoutContent,p.payload);}.bind(this)).send();this._flyoutAjaxify=null;}};m.prototype._onHide=function(n,o){"use strict";h.removeClass(o,"_52nd");if(h.hasClass(o,'uiButton')||h.hasClass(o,"_42fu"))h.removeClass(o,'selected');};m.prototype.destroy=function(){"use strict";this.hideFlyout();this._flyout.destroy();};m.prototype.suppressNextMouseEnter=function(){"use strict";this._flyout.setActiveNode(this._button);};k(m.prototype,{_button:null,_flyout:null,_flyoutAjaxify:null,_flyoutContent:null});e.exports=m;});
__d("HoverFlyout",["Arbiter","ArbiterMixin","DataStore","Event","Keys","arrayContains","mixin","removeFromArray","shield"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){var p=m(h);for(var q in p)if(p.hasOwnProperty(q))s[q]=p[q];var r=p===null?null:p.prototype;s.prototype=Object.create(r);s.prototype.constructor=s;s.__superConstructor__=p;function s(t,u,v,w){"use strict";if(t){this._showDelay=v;this._hideDelay=w;this.init(t);if(u)this.initNode(u);}g.subscribe('SwapButtonDEPRECATED/focusOnJoinButton',o(this.hideFlyout,this),g.SUBSCRIBE_ALL);}s.prototype.init=function(t){"use strict";this._flyout=t;this._showDelay=this._showDelay||0;this._hideDelay=this._hideDelay||100;this._showTimeout=null;this._hideTimeout=null;this._flyoutSubscriptions=[this._flyout.subscribe('mouseenter',this._onFlyoutMouseEnter.bind(this)),this._flyout.subscribe('mouseleave',o(this.hideFlyout,this))];this._nodes=[];this._dataStoreUnique='HoverFlyout_'+Date.now()+'_listeners';return this;};s.prototype.initNode=function(t){"use strict";if(l(this._nodes,t))return this;this._nodes.push(t);i.set(t,this._dataStoreUnique,[j.listen(t,'mouseenter',this._onNodeMouseEnter.bind(this,t)),j.listen(t,'mouseleave',o(this.hideFlyout,this)),j.listen(t,'click',this._onNodeMouseEnter.bind(this,t)),j.listen(t,'keydown',this._onNodeKeyEscape.bind(this))]);return this;};s.prototype.deactivateNode=function(t){"use strict";var u=i.get(t,this._dataStoreUnique);if(u)while(u.length)u.pop().remove();n(this._nodes,t);};s.prototype.setShowDelay=function(t){"use strict";this._showDelay=t;return this;};s.prototype.setHideDelay=function(t){"use strict";this._hideDelay=t;return this;};s.prototype.showFlyout=function(t,u){"use strict";this.setActiveNode(t);if(u){this._flyout.setContext(t).show();this.inform('show',t);}else this._showTimeout=setTimeout(this.showFlyout.bind(this,t,true),this._showDelay);return this;};s.prototype.hideFlyout=function(t){"use strict";clearTimeout(this._showTimeout);if(t){this._flyout.hide();this._activeNode&&this.inform('hide',this._activeNode);this._activeNode=null;}else this._hideTimeout=setTimeout(this.hideFlyout.bind(this,true),this._hideDelay);};s.prototype.hideFlyoutDelayed=function(t){"use strict";clearTimeout(this._showTimeout);clearTimeout(this._hideTimeout);this._hideTimeout=setTimeout(this.hideFlyout.bind(this,true),t);};s.prototype.getActiveNode=function(){"use strict";return this._activeNode;};s.prototype.setActiveNode=function(t){"use strict";clearTimeout(this._hideTimeout);if(this._activeNode&&this._activeNode!==t)this.hideFlyout(true);this._activeNode=t;return this;};s.prototype.clearNodes=function(){"use strict";for(var t=this._nodes.length;t>0;t--)this.deactivateNode(this._nodes[t-1]);};s.prototype.destroy=function(){"use strict";while(this._flyoutSubscriptions.length)this._flyout.unsubscribe(this._flyoutSubscriptions.pop());this.clearNodes();};s.prototype._onNodeMouseEnter=function(t){"use strict";if(this._activeNode===t){clearTimeout(this._hideTimeout);}else this.showFlyout(t);};s.prototype._onFlyoutMouseEnter=function(){"use strict";clearTimeout(this._hideTimeout);};s.prototype._onNodeKeyEscape=function(event){"use strict";if(j.getKeyCode(event)===k.ESC){this._activeNode&&this.inform('hide',this._activeNode);this._activeNode=null;}};e.exports=a.HoverFlyout||s;});