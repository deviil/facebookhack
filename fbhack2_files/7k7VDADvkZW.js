/*!CK:823754902!*//*1392728246,178184997*/

if (self.CavalryLogger) { CavalryLogger.start_js(["KgBy7"]); }

__d("OGHovercardLayerHideOnBlur",["Event","DOM","copyProperties"],function(a,b,c,d,e,f,g,h,i){function j(k){this._layer=k;}i(j.prototype,{_subscriptions:null,_clickListener:null,enable:function(){this._subscriptions=[this._layer.subscribe('show',this._attach.bind(this)),this._layer.subscribe('hide',this._detach.bind(this))];if(this._layer.isShown())this._attach();},disable:function(){this._detach();while(this._subscriptions.length)this._subscriptions.pop().unsubscribe();this._subscriptions=null;},_detach:function(){this._clickListener&&this._clickListener.remove();this._clickListener=null;},_attach:function(){setTimeout(function(){this._clickListener=g.listen(document.documentElement,'click',this._maybeHide.bind(this));}.bind(this),0);},_maybeHide:function(event){var k=event.getTarget();if(h.contains(this._layer.getContent(),k))return;if(this._shouldHide(event))this._layer.hide();},_shouldHide:function(event){return true;}});e.exports=j;});
__d("OGAggregationHovercardTarget",["Event","ArbiterMixin","AsyncRequest","ContextualDialog","ContextualDialogArrow","CSS","DOM","LayerHideOnBlur","LayerHideOnEscape","OGHovercardLayerHideOnBlur","copyProperties","cx","emptyFunction","tx"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t){var u=350,v={},w=function(){var y=new j({addedBehaviors:[n,o],arrowBehavior:k},m.create('div',{className:"_4q1"},"Loading...")).setWidth(u);w=s.thatReturns(y);return y;};q(x,{setHovercard:function(y,z){var aa=v[y];aa&&aa.setHovercard(z);}});function x(y,z,aa,ba,ca,da){v[z]=this;this._targetID=z;this._endpoint=aa;this._preventClose=ca||[];this.init(y);for(var ea=0,fa=ba.length;ea<fa;ea++){var ga=ba[ea];this.addTrigger(ga.element,ga.trigger_class,ga.context);}if(da)this.showHovercard(null,null);}q(x.prototype,h,{init:function(y){this._hovercardShown=false;this._hovercardScheduled=false;this._target=y;this._triggers=[];this._hovercard=null;this._fetching=false;this._placeholder=null;this._placeholderListener=null;this._shownClass='hover_shown';this._triggerClass=null;this._currentTrigger=null;this._context=null;return this;},addTrigger:function(y,z,aa){this._triggers.push(y);g.listen(y,'click',this._onTrigger.bind(this,y,z,aa));},_onTrigger:function(y,z,aa){aa=aa||this._target;if((this._hovercardShown&&(this._hovercard.getContext()===aa))||(this._hovercardScheduled&&(this._placeholder.getContext()===aa))||((this._hovercardShown||this._hovercardScheduled)&&(this._currentTrigger===y))){this._currentTrigger=null;this.hideHovercard();return;}this.hideHovercard();this._currentTrigger=y;this.showHovercard(z,aa);},_fetch:function(){if(this._hovercard!=null||this._fetching)return;this._fetching=true;var y=function(){this._fetching=false;},z=function(){this.hideHovercard();};new i(this._endpoint).setData({hover_target:this._targetID}).setMethod('GET').setReadOnly(true).setErrorHandler(z.bind(this)).setTransportErrorHandler(z.bind(this)).setFinallyHandler(y.bind(this)).send();},setHovercard:function(y){var z=this;this._hovercard=y;for(var aa in p)if(p.hasOwnProperty(aa))ca[aa]=p[aa];var ba=p===null?null:p.prototype;ca.prototype=Object.create(ba);ca.prototype.constructor=ca;ca.__superConstructor__=p;function ca(da){"use strict";p.call(this,da);}ca.prototype.$conditionalHideOnBlur0=function(event){"use strict";var da=event.getTarget();for(var ea=0,fa=z.$conditionalHideOnBlur1.length;ea<fa;ea++)if(m.contains(z.$conditionalHideOnBlur1[ea],da))return false;return true;};this._hovercard.setPosition('below').setAlignment('center').enableBehaviors([ca,o]);this._hovercard.subscribe('aftershow',this._onHovercardShow.bind(this));this._hovercard.subscribe('hide',this._onHovercardHide.bind(this));this._hovercard.subscribe('destroy',this._onHovercardDestroy.bind(this));if(this._hovercardScheduled)this.showHovercard(this._triggerClass,this._context);},showHovercard:function(y,z){l.addClass(this._target,this._shownClass);if(this._triggerClass&&this._triggerClass!==y)l.removeClass(this._target,this._triggerClass);this._triggerClass=y;l.addClass(this._target,this._triggerClass);if(this._hovercard){this._hovercard.setContext(z||this._target).show();this._hovercardShown=true;this._hovercardScheduled=false;this._hidePlaceholder();}else{this._context=z;this._hovercardScheduled=true;this._fetch();this._showPlaceholder();}this.inform('showhovercard');},hideHovercard:function(){this._hovercardScheduled=false;this._hidePlaceholder();if(this._hovercard){this._hovercard.hide();}else this._onHovercardHide();},_showPlaceholder:function(){if(!this._placeholder){this._placeholder=w();this._placeholder.setContext(this._context||this._target).setPosition('below').setAlignment('center').show();this._placeholderListener=this._placeholder.subscribe('hide',this._onPlaceholderHide.bind(this));}},_hidePlaceholder:function(){this._placeholder&&this._placeholder.hide();},_onPlaceholderHide:function(){if(this._placeholder){this._hovercardScheduled=false;this._placeholderListener&&this._placeholder.unsubscribe(this._placeholderListener);this._placeholder=null;!this._hovercardShown&&this._removeTriggerClasses();}},_onHovercardShow:function(){var y=this._hovercard.getContent(),z=m.scry(y,'textarea.mentionsTextarea')[0];z&&z.focus();},_onHovercardHide:function(){this._hovercardShown=false;this._removeTriggerClasses();this.inform('hidehovercard');},_onHovercardDestroy:function(){this._hovercard=null;},_removeTriggerClasses:function(){l.removeClass(this._target,this._shownClass);l.removeClass(this._target,this._triggerClass);}});e.exports=x;});
__d("PhotoMultiPhotosThumb",["Event","Style"],function(a,b,c,d,e,f,g,h){var i=1200,j={init:function(k,l){var m=null,n=0;function o(q){n=q;l.forEach(function(r,s){h.set(r,'opacity',s===q?1:0);});}function p(){o((n+1)%l.length);m=setTimeout(p,i);}g.listen(k,'mouseenter',function(){if(m)return;n=0;p();});g.listen(k,'mouseleave',function(){o(0);window.clearTimeout(m);m=null;});}};e.exports=j;});
__d("PhotoCurationControl",["Event","Parent","Toggler"],function(a,b,c,d,e,f,g,h,i){var j={init:function(k){var l=h.byClass(k,'fbPhotoStarGridElement');g.listen(l,'mouseleave',function(){i.hide();});}};e.exports=j;});
__d("PhotoInlineActions",["Event","Arbiter","AsyncRequest","CSS","Nectar","Parent","copyProperties","cx"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n){var o={init:function(p,q,r,s){h.subscribe(['UFI/CommentAddedActive','UFI/CommentDeletedActive','UFI/LikeActive'],function(t,u){if(parseInt(p.getAttribute('data-fbid'),10)!==u)return;if(t==='UFI/LikeActive')j.toggleClass(p,"_53a");new i().setURI('/ajax/photos/photo/refresh.php').setData({fbid:p.getAttribute('data-fbid')}).setRelativeTo(p).send();});g.listen(p,'click',function(event){var t=event.getTarget();if(!l.byClass(t,"_53b"))return;event.prevent();j.toggleClass(p,"_53a");var u={};k.addModuleData(u,p);new i().setURI('/ajax/photos/photo/like.php').setData(m({fbid:p.getAttribute('data-fbid'),relatedid:q,hovercardendpoint:r,includecommentlink:s},u)).setRelativeTo(p).setErrorHandler(function(){j.toggleClass(p,"_53a");}).send();});}};e.exports=o;});
__d("StarGridLayout",["Vector","copyProperties","removeFromArray"],function(a,b,c,d,e,f,g,h,i){function j(k){"use strict";h(this,k);}j.prototype.getShortestColumn=function(k){"use strict";return k[0]<=k[1]?0:1;};j.prototype.getDangling=function(k){"use strict";var l=k.filter(function(m){return !this.isStarred(m);}.bind(this));if(l.length%2===1)return l[l.length-1];return null;};j.prototype.mangleOrder=function(k){"use strict";if(k.length<3||!(this.isFixed(k[0])&&this.isStarred(k[1])))return k;var l=this.nextNonStarred(k,2);if(!l)return k;var m=k.concat();i(m,l);m.splice(1,0,l);return m;};j.prototype.layout=function(k){"use strict";var l=[0,0],m=0,n=this.getDangling(k),o=[];k=this.mangleOrder(k);for(var p=0;p<k.length;++p){var q=this.getShortestColumn(l),r=k[p];if(this.isStarred(r)){this.renderStarred(this._grid,l,q,r);l[q]+=2;m=Math.max(m,(q*2)+2);}else{o.push(r);if(o.length===2||r===n){this.renderNonStarred(this._grid,l,q,o);m=Math.max(m,(q*2)+o.length);o=[];l[q]+=1;}}}return new g(m,Math.max.apply(null,l));};j.prototype.inNonStarredBlock=function(k,l,m,n){"use strict";return l===m[n]&&Math.floor(k/2)===n;};j.prototype.inStarredBlock=function(k,l,m,n){"use strict";return (l===m[n]||l===m[n]+1)&&Math.floor(k/2)===n;};j.prototype.nextNonStarred=function(k,l){"use strict";for(;l<k.length;++l)if(!this.isStarred(k[l]))return k[l];return null;};j.prototype.layoutReorder=function(k,l,m,n){"use strict";k=k.concat();m=Math.max(0,Math.min(3,m));n=Math.max(0,n);i(k,l);k.push(l);var o=[0,0],p=this.getDangling(k),q=false,r=[];for(var s=0;s<k.length;++s){var t=this.getShortestColumn(o),u=k[s];if(this.isStarred(u)){if(u===l)q=true;if(!q&&this.isStarred(l)&&this.inStarredBlock(m,n,o,t)&&this.inNonStarredBlock(m,n,o,t)){i(k,l);this.renderStarred(this._grid,o,t,l);o[t]+=2;t=this.getShortestColumn(o);q=true;}if(!q&&!this.isStarred(l)&&this.inStarredBlock(m,n,o,t)&&this.inNonStarredBlock(m,n,o,t)){i(k,l);if(r.length===1){r.splice(m%2,0,l);}else{var v=this.nextNonStarred(k,s);if(v){i(k,v);r.push(v);r.splice(m%2,0,l);}else r.push(l);}this.renderNonStarred(this._grid,o,t,r);r=[];o[t]+=1;p=this.getDangling(k.slice(s+1));t=this.getShortestColumn(o);q=true;}if(!q&&this.inStarredBlock(m,n,o,t)&&!this.inNonStarredBlock(m,n,o,t)){i(k,l);var v=this.nextNonStarred(k,s);k.push(l);if(v){i(k,v);k.splice(s,0,v);s--;continue;}n-=1;s--;continue;}this.renderStarred(this._grid,o,t,u);o[t]+=2;}else{r.push(u);if(r.length===2||u===p){if(!q&&!this.isStarred(l)&&this.inNonStarredBlock(m,n,o,t)){i(r,l);i(k,l);r.splice(m%2,0,l);if(r.length===3){i(k,r[2]);k.splice(s,0,r[2]);s=k.indexOf(r[2])-1;r.pop();}p=this.getDangling(k.slice(s+1));q=true;}if(!q&&this.isStarred(l)&&this.inNonStarredBlock(m,n,o,t)){i(k,l);this.renderStarred(this._grid,o,t,l);o[t]+=2;t=this.getShortestColumn(o);q=true;}this.renderNonStarred(this._grid,o,t,r);r=[];o[t]+=1;}}}};j.prototype.getStoringLayout=function(k){"use strict";return new j({grid:this._grid,isStarred:this.isStarred,isFixed:this.isFixed,renderStarred:function(l,m,n,o){k.push(o);},renderNonStarred:function(l,m,n,o){k.push(o[0]);if(o.length>1)k.push(o[1]);}});};j.prototype.reorder=function(k,l,m,n){"use strict";var o=[];this.getStoringLayout(o).layoutReorder(k,l,m,n);return o;};j.prototype.canonicalize=function(k){"use strict";var l=[];this.getStoringLayout(l).layout(k);return l;};e.exports=j;});
__d("StarGrid",["Arbiter","CSS","DataStore","DOM","Locale","Parent","Style","StarGridLayout","copyProperties","removeFromArray"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var q={MARGIN:5,isStarred:function(r){return h.hasClass(r,'fbPhotoStarGridStarred');},isFixed:function(r){return h.hasClass(r,'fbPhotoStarGridFixed');},setPosition:function(r,s,t){var u=k.isRTL()?'margin-right':'margin-left';m.set(r,'position','absolute');m.set(r,'margin-top',s+'px');m.set(r,u,t+'px');},renderNonStarred:function(r,s,t,u){for(var v=0;v<u.length;++v){var w=s[t]*q.getSize(r),x=(t*2+v)*q.getSize(r);q.setPosition(u[v],w,x);}},renderStarred:function(r,s,t,u){var v=s[t]*q.getSize(r),w=t*2*q.getSize(r);q.setPosition(u,v,w);},mergeWithPreviousGrid:function(r){var s=r.previousSibling;if(s&&h.hasClass(s,'fbStarGrid')){h.addClass(s,'fbStarGridAppendedTo');while(r.firstChild)s.appendChild(r.firstChild);j.remove(r);r=s;}return r;},addPhotos:function(r){var s=j.scry(document.body,'.fbStarGrid')[0];if(!s)return;j.prependContent(s,r);var t=this.getSize(s);this.mergeAndLayoutGrid(s,t);},removePhoto:function(r){var s=j.scry(document.body,'.fbPhotoStarGridElement[data-fbid="'+r+'"]')[0],t=l.byClass(s,'fbStarGrid'),u=q.getElements(t);p(u,s);j.remove(s);q.layoutGrid(t,u);g.inform('StarGrid/UPDATE',t);},removePhotos:function(r){var s,t;for(var u=0;u<r.length;u++){var v=r[u],w=j.scry(document.body,'.fbPhotoStarGridElement[data-fbid="'+v+'"]')[0];s=l.byClass(w,'fbStarGrid');t=q.getElements(s);p(t,w);j.remove(w);}q.layoutGrid(s,t);g.inform('StarGrid/UPDATE',s);},layoutGrid:function(r,s){var t=new n({_grid:r,isStarred:q.isStarred,isFixed:q.isFixed,renderNonStarred:q.renderNonStarred,renderStarred:q.renderStarred});q.setElements(r,s);var u=t.layout(s);m.set(r,'width',(u.x*q.getSize(r))+'px');m.set(r,'height',(u.y*q.getSize(r))+'px');},mergeAndLayoutGrid:function(r,s){var t=j.scry(r,'.fbPhotoStarGridElement'),u=q.mergeWithPreviousGrid(r),v=t;if(r!==u)v=q.getElements(u).concat(t);q.setElements(r,v);i.set(r,'size',s);q.layoutGrid(u,v);g.inform('StarGrid/UPDATE',r);},getSize:function(r){return i.get(r,'size');}};o(q,{getElements:function(r){var s=i.get(r,'elements');if(!s){s=j.scry(r,'div.fbPhotoStarGridElement');q.setElements(r,s);}return s;},setElements:function(r,s){i.set(r,'elements',s);}});e.exports=q;});
__d("TagSuggestionsDrawer",["AsyncRequest","PhotosAppSection"],function(a,b,c,d,e,f,g,h){var i=false,j={init:function(){if(i)return;i=true;h.subscribe('toggle_drawer',j._onToggle);},_onToggle:function(k,l){if(l.button_clicked=='show'){j._notify(false);}else j._notify(true);},_notify:function(k){new g('/ajax/medley/tag_suggestions_drawer.php').setData({is_closed:k}).send();}};e.exports=j;});