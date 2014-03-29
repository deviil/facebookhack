/*!CK:1499906946!*//*1395624646,178183207*/

if (self.CavalryLogger) { CavalryLogger.start_js(["Ov7Ql"]); }

__d("intlList",["React","fbt","invariant","keyMirror"],function(a,b,c,d,e,f,g,h,i,j){'use strict';var k=function(m,n){n=n||k.CONJUNCTIONS.AND;var o=m.length;if(o===0){return '';}else if(o===1)return m[0];var p=m.shift(),q=m.pop(),r=p;m.forEach(function(s){r=h._("{previous items}, {following items}",[h.param("previous items",r),h.param("following items",s)]);});return l(r,q,n);};function l(m,n,o){switch(o){case k.CONJUNCTIONS.AND:return (h._("{list of items} and {last item}",[h.param("list of items",m),h.param("last item",n)]));case k.CONJUNCTIONS.OR:return (h._("{list of items} or {last item}",[h.param("list of items",m),h.param("last item",n)]));case k.CONJUNCTIONS.NONE:return (h._("{list of items}, {last item}",[h.param("list of items",m),h.param("last item",n)]));default:i(false);}}k.CONJUNCTIONS=j({AND:null,NONE:null,OR:null});e.exports=k;});
__d("BookmarkFeedSorter",["Run"],function(a,b,c,d,e,f,g){var h,i={init:function(j){h=j;g.onLeave(function(){h=null;});},setChecked:function(j){if(h)h.setValue(j);}};e.exports=i;});
__d("AudienceSelectorTags",[],function(a,b,c,d,e,f){var g={},h={hasTags:function(i){return g.hasOwnProperty(i);},setHasTags:function(i){if(i)g[i]=true;}};e.exports=h;});
__d("PrivacySelectorOption",["Arbiter","AudienceSelectorTags","CSS","CurrentUser","DOM","DynamicIconSelector","Parent","PrivacyConst","SelectorDeprecated","copyProperties","csx","fbt","intlList","tx"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t){function u(v,w){if(!v)throw new Error("there's no DOM option. Config data: ",w);this._elem=v;this._selector=m.byClass(this._elem,'audienceSelector');if(!this._selector)return;this._priv_base_val=w.priv_base_val;this._audienceCount=w.audience_count||"";this._hasRestricted=w.has_restricted||false;this._isCustom=w.is_custom||false;this._includedAudience=w.included||"";this._excludedAudience=w.excluded||{};this._excludedTaggees={};this._tagExpansionBehavior=w.tag_expansion_behavior||n.TagExpansion.NONE;this._plusLabel=k.scry(v,'.plusLabel')[0];this._audienceCountLabel=k.scry(v,'.audienceCountLabel')[0];this._taggedIDs=[];this._tags=[];this._recalculateTooltipAndLabel();this._updateOptionCountLabel();this._updateSelector();g.subscribe('Composer/changedtags',function(x,y){var z=i.hasClass(this._selector,'composerAudienceSelector');if(!this._getChangedData()||!z)return;this._tags=[];this._taggedIDs=[];for(var aa=0;aa<y.withTags.length;aa++){var ba=y.withTags[aa].info;if(ba.uid!=j.getID()){this._tags.push(ba.text);this._taggedIDs.push(ba.uid);}}for(aa in y.mention)if(y.mention[aa].type=='user'&&y.mention[aa].uid!=j.getID()){this._tags.push(y.mention[aa].text);this._taggedIDs.push(y.mention[aa].uid);}var ca=k.scry(document.body,"._5l7q")[0];ca&&!!this._taggedIDs.length&&i.hide(ca);this._updateOptionCountLabel();var da=this._recalculateTooltipAndLabel();if(da&&o.isOptionSelected(this._elem)){this._updateSelector();g.inform('SelectedPrivacyOption/changed',this._getChangedData());}}.bind(this));o.listen(this._selector,'change',this._updateSelector.bind(this));}p(u.prototype,{updateOption:function(v,w,x,y,z){this._priv_base_val=v;this._includedAudience=w;this._excludedAudience=x;this._tagExpansionBehavior=y;this._audienceCount=z;this._recalculateTooltipAndLabel();this._updateOptionCountLabel();return {label:this._label,tooltip:this._tooltip};},_recalculateTooltipAndLabel:function(){var v=this._label;this._label=this._getNewSelectorLabel();var w=this._tooltip;this._tooltip=this._getNewTooltip();return (w!=this._tooltip)||(v!=this._label);},_getNewTooltip:function(){if(this._isCustom)return this._recalcCustomTooltip();switch(this._priv_base_val){case n.FriendsValue.ALL_FRIENDS:return this._recalcFriendsTooltip();case n.FriendsValue.FRIENDS_MINUS_ACQUAINTANCES:return this._recalcFriendsMinusTooltip();case n.FriendsValue.SELF:var v=this._getTagExpansionText();return v?v:this._getIncludedAudience();default:return this._recalcCustomTooltip();}},_getNewSelectorLabel:function(){var v=this._elem.getAttribute('data-label').replace(/\(.*\)/,"");if(this._showAudienceCount()){var w=' ('+this._audienceCount+')';v+=w;}if(this._isTagExpanded())v+=' (+)';return v;},_updateOptionCountLabel:function(){if(this._audienceCountLabel){if(this._showAudienceCount()){var v=' ('+this._audienceCount+')';k.setContent(this._audienceCountLabel,v);}i.conditionShow(this._audienceCountLabel,this._showAudienceCount());}this._plusLabel&&i.conditionShow(this._plusLabel,this._isTagExpanded());},_getChangedData:function(){return {tags:this._taggedIDs,privacy:this._priv_base_val};},_showAudienceCount:function(){return (this._audienceCountLabel&&this._audienceCount&&this._audienceCount.length>0);},_isTagExpanded:function(){var v=this._getTagExpansionBehavior(),w=!!this._taggedIDs.length||this._alreadyHasTags();return (w&&v!=n.TagExpansion.NONE);},_alreadyHasTags:function(){var v=k.scry(this._selector,'*[data-oid]')[0];v=v&&v.getAttribute('data-oid');return v&&h.hasTags(v);},_updateSelector:function(){if(o.isOptionSelected(this._elem)){var v=i.hasClass(this._selector,'composerAudienceSelector');v&&o.setButtonLabel(this._selector,this._label);o.setButtonTooltip(this._selector,this._tooltip);l.swapIcon(this._selector);return false;}return true;},_isSharedAlbum:function(){var v=k.scry(this._selector,'*[data-shared-album]')[0];return v&&v.getAttribute('data-shared-album');},_getTagExpansionBehavior:function(){if(this._tagExpansionBehavior)return this._tagExpansionBehavior;var v=this._priv_base_val===n.FriendsValue.SELF,w=this._priv_base_val===n.FriendsValue.EVERYONE;if((v&&this._isSharedAlbum())||w){return n.TagExpansion.NONE;}else if(this._priv_base_val<n.FriendsValue.ALL_FRIENDS)return n.TagExpansion.TAGGEES;return n.TagExpansion.FRIENDS_OF_TAGGEES;},_getTagExpansionText:function(){var v=this._getTagExpansionBehavior();if(!!this._taggedIDs.length||this._alreadyHasTags()){if(v==n.TagExpansion.FRIENDS_OF_TAGGEES){return "friends of anyone tagged";}else if(v==n.TagExpansion.TAGGEES)return "Anyone tagged";return '';}return '';},_getIncludedAudience:function(){if(this._includedAudience)return this._includedAudience;var v=this._priv_base_val===n.FriendsValue.SELF;if(v&&!this._isSharedAlbum())return "Only Me";return this._elem.getAttribute('data-label');},_getCombinedSentence:function(v,w){if(!w)return v;return r._("{list of people who can see this}; Except: {list of people who cannot see this}",[r.param("list of people who can see this",v),r.param("list of people who cannot see this",w)]);},_recalcFriendsTooltip:function(){var v=this._tags.length;if(v>2){return this._hasRestricted?"Your friends and friends of anyone tagged; Except: Restricted":"Your friends and friends of anyone tagged";}else if(v==2){if(this._hasRestricted){return t._("Your friends, {user}'s friends and {user2}'s friends; Except: Restricted ",{user:this._tags[0],user2:this._tags[1]});}else return t._("Your friends, {user}'s friends and {user2}'s friends",{user:this._tags[0],user2:this._tags[1]});}else if(v==1){if(this._hasRestricted){return t._("Your friends and {user}'s friends; Except: Restricted",{user:this._tags[0]});}else return t._("Your friends and {user}'s friends",{user:this._tags[0]});}else return this._hasRestricted?"Your friends; Except: Restricted":"Your friends";},_recalcFriendsMinusTooltip:function(){var v=this._tags.length;if(v>0||this._alreadyHasTags()){var w="friends of anyone tagged",x=r._("{people who can see this}, {list of more people who can see this}",[r.param("people who can see this","Your friends"),r.param("list of more people who can see this",w)]),y="Acquaintances";if(this._hasRestricted)y=r._("{Name of Acquaintances friend list}, {restricted}",[r.param("Name of Acquaintances friend list",y),r.param("restricted","Restricted")]);return this._getCombinedSentence(x,y);}else{if(this._hasRestricted)return "Friends; Except: Acquaintances, Restricted";return "Friends except Acquaintances";}},_recalcCustomTooltip:function(){var v=this._getIncludedAudience(),w=this._getTagExpansionText();if(w)v=r._("{list of people who can see this}, {list of additional people who can see this}",[r.param("list of people who can see this",v),r.param("list of additional people who can see this",w)]);for(var x=0;x<this._taggedIDs.length;x++){y=this._taggedIDs[x];if(y in this._excludedAudience){delete this._excludedAudience[y];this._excludedTaggees[y]=this._tags[x];break;}}for(var y in this._excludedTaggees)if(this._excludedTaggees.hasOwnProperty(y))if(this._taggedIDs.indexOf(y)===-1){this._excludedAudience[y]=this._excludedTaggees[y];delete this._excludedTaggees[y];break;}var z=[];for(x in this._excludedAudience)if(this._excludedAudience.hasOwnProperty(x))z.push(this._excludedAudience[x]);return this._getCombinedSentence(v,s(z));}});e.exports=u;});
__d("CustomPrivacyOptionController",["Arbiter","AsyncDialog","AsyncRequest","DOM","Event","Form","Parent","PrivacyConst","PrivacySelectorOption","SelectorDeprecated","copyProperties"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q){function r(s,t){if(!s)return;setTimeout((function(){this._selector=m.byClass(s,'audienceSelector');if(!this._selector)return;this.initCustomState(s,t.option_id,t.id);var u={priv_base_val:t.base_audience_value,audience_count:t.audience_count,is_custom:true,included:t.included_audience,excluded:t.excluded_audience,tag_expansion_behavior:t.tag_expansion_behavior};this._optionJSInstance=new o(s,u);k.listen(s,'click',function(event){this.openCustomDialog(event,t.option_id,t.explain_tags,t.autosave,t.limit_to_friends,t.source,t.gk_adama_custom_dialog);}.bind(this));p.listen(this._selector,'select',function(v){if(v.option._id!=this._id)this.clearCustomState();}.bind(this));}).bind(this),0);}q(r,{_instances:{},update:function(s,t,u,v,w,x,y,z,aa){var ba=r._instances[s];ba._update(t,u)._updateOption(u,w,x,y,z,aa);g.inform('Form/change',{node:ba._container});},getData:function(s){return r._instances[s]._privacyData;},setPrivacyData:function(s,t,u){r._instances[s]._update(t,u);}});q(r.prototype,{_updateOption:function(s,t,u,v,w,x){var y=p.getOption(this._selector,s)||p.getOption(this._selector,n.BaseValue.CUSTOM+''),z=this._optionJSInstance.updateOption(t,u,v,w,x);g.inform('CustomPrivacyOptionController/update',{selector:this._selector,option:y,tooltip:z.tooltip,label:z.label});return this;},_update:function(s,t){var u=t==n.BaseValue.CUSTOM||!p.getOption(this._selector,t),v=this._selector.getAttribute('data-name');this.updateCustomState(s,u,v);return this;},initCustomState:function(s,t,u){r._instances[t]=this;this._container=j.find(s,'.customPrivacyInputs');this._id=u;this._privacyData={};var v=l.serialize(this._container);if(v.audience)this._privacyData=v.audience[u];return s;},openCustomDialog:function(event,s,t,u,v,w,x){var y=new i('/ajax/privacy/custom_dialog/').setData({option_id:s,id:this._id,privacy_data:this._privacyData,explain_tags:t,autosave:u,limit_to_friends:v,gk_adama_custom_dialog:x,is_new_privacy_selector:false,source:w});y.setRelativeTo(event.getTarget());h.send(y);},updateCustomState:function(s,t,u){this.clearCustomState();this._privacyData=q({},s);if(t)if(u){u=u.slice(0,-'[value]'.length);var v={};v[u]=s;l.createHiddenInputs(v,this._container,null,true);}},clearCustomState:function(){this._privacyData={};j.empty(this._container);}});e.exports=r;});
__d("AudienceSelector",["Arbiter","AudienceSelectorTags","CSS","CustomPrivacyOptionController","DOM","DynamicIconSelector","PrivacyConst","SelectorDeprecated"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n){var o={};n.subscribe('select',function(q,r){if(!i.hasClass(r.selector,'audienceSelector'))return;var s=n.getOptionValue(r.option);r.value=s;g.inform('AudienceSelector/changed',r);if(s==m.BaseValue.CUSTOM&&!i.hasClass(r.option,'noDialog')){n.toggle(r.selector);return false;}if(i.hasClass(r.selector,'dataTooltip')){var t=k.find(r.option,'.itemAnchor').getAttribute('data-tooltip');n.setButtonTooltip(r.selector,t||null);}if(!i.hasClass(r.option,'specialOption'))return;var u=k.find(r.option,'a').getAttribute('data-type');if(i.hasClass(r.option,'moreOption')){i.addClass(r.selector,u);i.addClass(r.selector,'showSecondaryOptions');return false;}else if(i.hasClass(r.option,'returnOption')){i.removeClass(r.selector,'showSecondaryOptions');i.removeClass(r.selector,'friendList');return false;}});var p={keepSynchronized:function(q,r){o[q]||(o[q]={});o[q][r.id]=r;},setHasTags:function(q){h.setHasTags(q);},forceAndKeepSynchronized:function(q,r){p.keepSynchronized(q,r);g.inform('AudienceSelector/update',{option:n.getSelectedOptions(r)[0],selector:r});}};g.subscribe('CustomPrivacyOptionController/update',function(q,r){if(!i.hasClass(r.selector,'audienceSelector'))return;n.setSelected(r.selector,n.getOptionValue(r.option));l.swapIcon(r.selector);var s=i.hasClass(r.selector,'composerAudienceSelector'),t=i.hasClass(r.selector,'inlineAudienceWidget');if(s||t)n.setButtonLabel(r.selector,r.label);n.setButtonTooltip(r.selector,r.tooltip);g.inform('AudienceSelector/update',r);});g.subscribe(['AudienceSelector/changed','AudienceSelector/update'],function(event,q){var r=n.getOptionValue(q.option),s={};if(r==m.BaseValue.CUSTOM){if(event=='AudienceSelector/changed')return;s=j.getData(q.option.id);}else if(i.hasClass(q.selector,'inlineAudienceWidget'))n.setButtonLabel(q.selector,q.option.innerText);for(var t in o){var u=o[t];if(u[q.selector.id]){g.inform('AudienceSelector/syncNonSelectorIcon',{category:t});for(var v in u){var w=u[v];if(!w||q.selector===w)continue;if(n.getValue(w)!==r){n.setSelected(w,r);l.swapIcon(w);}if(r==m.BaseValue.CUSTOM){var x=n.getOption(w,m.BaseValue.CUSTOM+'');if(x){j.setPrivacyData(x.id,s,r);n.setButtonTooltip(w,q.tooltip);}}}}}});e.exports=p;});
__d("legacy:AudienceSelector",["AudienceSelector"],function(a,b,c,d){b('AudienceSelector');},3);
__d("FriendListPrivacyOptions",["Arbiter","AsyncDialog","AsyncRequest","Dialog","DOMQuery","PageTransitions","Parent","SelectorDeprecated","$","ge"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var q=false,r=false,s=null,t={},u=function(w){if(!Object.keys(t).length)l.registerHandler(function(){t={};q=false;r=false;});var x=w.getAttribute('data-name');t[x]=w;n.listen(w,'select',function(y){var z=y.option,aa=k.find(z,'a.itemAnchor'),ba=aa.getAttribute('data-flid');if(!ba)return;var ca=aa.getAttribute('data-dynamic');if(ca&&q){v.showSmartListNux(z,ba);}else if(!ca&&r)v.showDumbListNux([ba]);});},v={listen:function(w,x,y){var z=p(w);if(!z)return;var aa=m.byClass(z,'audienceSelector');if(aa){u(aa);q=x;r=y;}},showSmartListNux:function(w,x){w=o(w);new i('/ajax/friends/lists/smart_list_publish_nux.php').setData({option_id:w.id,flid:x}).send();q=false;},setContextualDialog:function(w,x){x=o(x);var y=m.byClass(x,'audienceSelector');if(y){w.setContext(y);w.show();var z=g.subscribe('composer/publish',function(){w.hide();});w.subscribe('hide',function(){z.unsubscribe();});}},showDumbListNux:function(w){h.send(new i('/ajax/friends/lists/dumb_list_publish_nux.php').setData({flids:w}));r=false;},showBothListsNux:function(w,x){s=o(w);v.showDumbListNux(x);},setDialogX:function(w){if(!s)return;w.subscribe('hide',function(){v.showSmartListNux(s);s=null;});},setDialog:function(){if(!s)return;var w=j.getCurrent();if(w)w.setCloseHandler(function(){v.showSmartListNux(s);s=null;});}};e.exports=v;});
__d("MetaComposerEdDialog",["Animation","Arbiter","ARIA","AsyncRequest","copyProperties","DOM","Ease","Parent","SelectorDeprecated","Vector"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var q=null;function r(s){this._dialog=s.dialog;this.config=s;this._init();}r.init=function(s){if(q){q.config.show_audience=s.show_audience;s.dialog.destroy();return;}q=new r(s);};k(r.prototype,{_init:function(){h.subscribe('ComposerXStatusAttachment/ready',function(){if(this.config.show_audience){this._sendEducationRequest({},'/ajax/composer/audience/education',this._handlerCustomDuration.bind(this,6000));this.config.show_audience=false;}}.bind(this));if(this.config.show_sticky)h.subscribe('composer/mutate',function(s,t){this._sendEducationRequest({sticky_num:this.config.n_sticky_shown},'/ajax/composer/audience/sticky_education');}.bind(this));if(this.config.show_tags)h.subscribe('SelectedPrivacyOption/changed',function(s,t){this._sendEducationRequest({ids:t.tags,from:'WithTagger',hasEvent:t.hasEvent,type:t.privacy,tag_num:this.config.n_tag_shown},'/ajax/composer/audience/tag_education',this._handler.bind(this));}.bind(this));o.subscribe('open',this._killAnim.bind(this));},_sendEducationRequest:function(s,t,u){if(!this._updateDialogContext())return;this._async&&this._async.abort();this._async=new j(t);this._async.setData(s).setHandler(u).send();},_updateDialogContext:function(){var s=l.scry(document.body,'div.composerAudienceWrapper'),t,u;for(var v=0;v<s.length;v++){t=s[v];u=p.getElementPosition(t);if(t&&u.x>0&&u.y>0){this._dialog.setContext(t);return true;}}return false;},_handler:function(s){this._handlerCustomDuration(1500,s);},_handlerCustomDuration:function(s,t){var u=t.payload;if(!u||!this._updateDialogContext())return;var v=this._dialog.getContent().firstChild;l.setContent(v,u);i.announce(l.getText(v));this._dialog.show();var w=n.byClass(v,'metaComposerUserEd');if(this._anim){this._anim.stop();this._anim=new g(w);}else this._anim=new g(w).from('opacity',0);this._anim.to('opacity',1).ease(m.sineOut).checkpoint().duration(s).checkpoint().to('opacity',0).ease(m.sineOut).checkpoint().ondone(this._killAnim.bind(this)).go();},_killAnim:function(s,t){if(this._anim){this._dialog.hide();this._anim.stop();this._anim=null;}}});e.exports=r;});
__d("PubcontentLitestandClassicChainingController",["ContextualThing","DOM","PubcontentFeedChainingController","csx"],function(a,b,c,d,e,f,g,h,i,j){for(var k in i)if(i.hasOwnProperty(k))m[k]=i[k];var l=i===null?null:i.prototype;m.prototype=Object.create(l);m.prototype.constructor=m;m.__superConstructor__=i;function m(){"use strict";if(i!==null)i.apply(this,arguments);}m.prototype.findStory=function(n){"use strict";var o="^div._4-u2",p=h.scry(n,o);return p.length===1?p[0]:null;};m.prototype.isSponsoredStory=function(n){"use strict";var o="._5paw";return h.scry(n,o).length>0;};m.prototype.findAttachment=function(n){"use strict";var o="div._6m2",p=h.scry(n,o);return p.length>0?p[0]:null;};m.prototype.findContainer=function(n){"use strict";var o=h.create('div'),p=h.insertAfter(n,o);g.register(o,n);return p.length>=1?p[0]:null;};m.prototype.findStreamRoot=function(n){"use strict";var o="^div._4ikz";return h.scry(n,o)[0];};m.prototype.findAdClientToken=function(n){"use strict";var o=this.findStory(n);if(!o)return null;var p=o.getAttribute('data-ft');if(!p)return null;var q=JSON.parse(p);return q[i.getAdClientTokenIndex()];};e.exports=m;new m();});
__d("legacy:DynamicIconSelector",["DynamicIconSelector"],function(a,b,c,d){a.DynamicIconSelector=b('DynamicIconSelector');},3);