/*!CK:1677246087!*//*1392694233,178184021*/

if (self.CavalryLogger) { CavalryLogger.start_js(["C\/0i4"]); }

__d("ComposerXEmptyAttachment",["ComposerXAttachment"],function(a,b,c,d,e,f,g){for(var h in g)if(g.hasOwnProperty(h))j[h]=g[h];var i=g===null?null:g.prototype;j.prototype=Object.create(i);j.prototype.constructor=j;j.__superConstructor__=g;function j(k,l){"use strict";g.call(this);this._root=k;if(l)this.attachmentClassName=l;}j.prototype.getRoot=function(){"use strict";return this._root;};e.exports=j;});
__d("Collection",[],function(a,b,c,d,e,f){function g(h,i){if(!h.__collection__){var j=new Function();for(var k in h.prototype)j.prototype[k]=g._call.bind(null,k);h.__collection__=j;}var l=new h.__collection__();l._elements=i;return l;}g._call=function(h){var i=Array.prototype.slice.call(arguments,1);this._elements.forEach(function(j){j[h].apply(j,i);});return this;};e.exports=g;});
__d("Drag",["Event","Arbiter","DOM","Style","Vector"],function(a,b,c,d,e,f,g,h,i,j,k){var l={};l.currentDraggable=null;l.grab=function(m){if(l.currentDraggable)l._onmouseup();m.lastDragOver=null;l.attachDragEvents();l.currentDraggable=m;};l.attachDragEvents=function(){document.onselectstart=function(){document.onselectstart=null;return false;};if(l.dragEventsAttached)return;l.dragEventsAttached=true;h.subscribe('scroller/scroll',l._onmousemove);g.listen(document,{mousemove:l._onmousemove,mouseup:l._onmouseup});};l.droppables={};l.addDroppable=function(m,n){(l.droppables[m]=l.droppables[m]||[]).push(n);};l.removeDroppable=function(m,n){l.droppables[m]=l.droppables[m].filter(function(o){return o!=n;});};l.getOffsetParent=function(m){if(i.isNodeOfType(m,['body','html']))return document.body;while((m=m.parentNode)&&m!==document.body)if(j.get(m,'position')!=='static')return m;return document.body;};l._onmousemove=function(event,m){if(!l.currentDraggable)return;var n=m||k.getEventPosition(event),o=l.currentDraggable,p=l.droppables[o.namespace];if(o.namespace&&o.active&&p){var q={};p.forEach(function(w){q[w.zIndex]=w.zIndex;});var r=[];for(var s in q)r.push(q[s]);r.sort();var t=o.lastDragOver,u=null;for(var v=r.length-1;v>=0;v--)if(t&&t.dom!=null&&t.zIndex==r[v]&&t.isDraggedOver(n)){u=t;break;}else for(s=0;s<p.length;s++){if(r[v]!=p[s].zIndex)continue;if(t!=p[s]&&o.dom!=p[s].dom&&p[s].isDraggedOver(n)){u=p[s];v=-1;break;}}if(u&&u!=t){u.ondragover(o);l.currentDraggable.adjustCursorPosition();}if(u)u.ondragmove(o,n.sub(k.getElementPosition(u.dom)));o.lastDragOver=u;}l.currentDraggable._onmousemove(n);};l._onmouseup=function(m){document.onselectstart=null;if(l.currentDraggable){l.currentDraggable._ondrop();l.currentDraggable=null;}};e.exports=l;});
__d("Draggable",["Event","Arbiter","Collection","DOM","Drag","Rect","Style","Vector","emptyFunction"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){function p(s){"use strict";this.canvas=s;this.scrollZone=50;this.velocity=100;this.coefficient=1;}p.prototype.activate=function(){"use strict";this.activate=o;this.event=g.listen(document,'mousemove',this._onmousemove.bind(this));this.interval=setInterval(this._intervalHandler.bind(this),50);this.cursor=null;};p.prototype.deactivate=function(){"use strict";delete this.activate;this.event&&this.event.remove();this.event=null;clearInterval(this.interval);};p.prototype._onmousemove=function(event){"use strict";this.cursor=new n.getEventPosition(event);};p.prototype._intervalHandler=function(){"use strict";if(!this.cursor)return;var s=this.canvas==document.body?l.getViewportBounds():new l(this.canvas),t=new l(this.cursor.y-s.t,s.r-this.cursor.x,s.b-this.cursor.y,this.cursor.x-s.l),u=new n(0,0);if(t.t<t.b&&t.t<this.scrollZone){u.y=-this.scrollZone+t.t;}else if(t.b<this.scrollZone)u.y=this.scrollZone-t.b;u.y=this._doMath(u.y);if(t.l<t.r&&t.l<this.scrollZone){u.x=-this.scrollZone+t.l;}else if(t.r<this.scrollZone)u.x=this.scrollZone-t.r;u.x=this._doMath(u.x);if(u.x||u.y){u.scrollElementBy(this.canvas);if(document.body==this.canvas){var v=n.getScrollPosition();u.scrollElementBy(this.canvas);var w=n.getScrollPosition();this.cursor=this.cursor.add(w.sub(v));}else u.scrollElementBy(this.canvas);h.inform('scroller/scroll',this.cursor);}};p.prototype._doMath=function(s){"use strict";s=(s>=0?Math.min(s,this.scrollZone):Math.max(s,-this.scrollZone));return Math.floor(Math.pow(s/this.scrollZone*this.velocity,this.coefficient));};p.findScrollParent=function(s){"use strict";var t;s=s.parentNode;while(s){if(s.scrollHeight!=s.offsetTop){t=m.get(s,'overflowY');if(t=='scroll'||t=='auto')return s;}s=s.parentNode;}return document.body;};function q(s){"use strict";if(!s)throw new Error('Element should be a DOM node');if(!(this instanceof q)){if(s instanceof Array){var t=[];s.forEach(function(u){t.push(new q(u));});return new i(q,t);}else return new q(s);}else{this.data={};this.handles=[];this.dom=s;this.boundingBox=null;this.useScroller=true;this.grabPctX=this.grabPctY=0;this.addHandle(this.dom);}}q.prototype.destroy=function(){"use strict";this.handles.forEach(function(s){this.removeHandle(s.obj);}.bind(this));this.data=this.dom=null;};q.prototype.adjustCursorPosition=function(){"use strict";var s=n.getElementDimensions(this.dom);this.cursorPositionVector=new n(parseInt(this.grabPctX*s.x,10),parseInt(this.grabPctY*s.y,10));};q.prototype._onclick=function(event){"use strict";if(this.active)return g.kill(event);};q.prototype._ongrab=function(s){"use strict";this.ongrab();if(this.useScroller){if(!this.scroller)this.scroller=new p(p.findScrollParent(this.dom));this.scroller.activate();}if(this.active){if(!this.oldPosition)this.oldPosition=this.dom.style.position;this.dom.style.position=this.absolute?'absolute':'relative';s.sub(this.cursorPositionVector).setElementPosition(this.dom);}};q.prototype._onmousedown=function(event){"use strict";if(!((event.which&&event.which===1)||(event.button&&event.button===1)))return;var s=event.getTarget();if(j.isNodeOfType(s,['input','select','textarea','object','embed']))return true;var t=n.getEventPosition(event),u=n.getElementDimensions(this.dom);this.draggableInitialVector=n.getElementPosition(this.dom);this.cursorPositionVector=t.sub(this.draggableInitialVector);this.grabPctX=u.x===0?0:this.cursorPositionVector.x/u.x;this.grabPctY=u.y===0?0:this.cursorPositionVector.y/u.y;k.grab(this,event);if(this.gutter){this.cursorInitialVector=t;}else{this._setActive(true);this._ongrab(t);}return g.kill(event);};q.prototype._onmousemove=function(s){"use strict";if(!this.active)if(s.distanceTo(this.cursorInitialVector)>=this.gutter){this._setActive(true);this._ongrab(s);}if(this.active){var t=s.sub(this.cursorPositionVector),u;if(this.boundingBox){var v=l.newFromVectors(t,n.getElementDimensions(this.dom));v=v.boundWithin(this.boundingBox);t=v.getPositionVector();if(this.boundingBox.w()===0){u=new n(this.draggableInitialVector.x,t.y,'document');}else if(this.boundingBox.h()===0){u=new n(t.x,this.draggableInitialVector.y,'document');}else u=t;}else u=t;var w=k.getOffsetParent(this.dom);if(w!==document.body)u=u.sub(n.getElementPosition(w));u.setElementPosition(this.dom);this.ondrag(s);}};q.prototype._ondrop=function(){"use strict";this.scroller&&this.scroller.deactivate();if(this.active){setTimeout((function(){this._setActive(false);}).bind(this),0);this.ondrop();if(this.lastDragOver)this.lastDragOver.ondrop(this);}};q.prototype.killDrag=function(){"use strict";this._setActive(false);k._onmouseup();};q.prototype.forceDrop=function(){"use strict";k._onmouseup();};q.prototype.setBoundingBox=function(s){"use strict";this.boundingBox=s;return this;};q.prototype.resetPosition=function(){"use strict";this.dom.style.position=this.oldPosition;this.oldPosition=null;this.dom.style.left='';this.dom.style.top='';return this;};q.prototype.setUseAbsolute=function(s){"use strict";this.absolute=s;return this;};q.prototype.setDragHandler=function(s){"use strict";this.ondrag=s;return this;};q.prototype.setGrabHandler=function(s){"use strict";this.ongrab=s;return this;};q.prototype.setDropHandler=function(s){"use strict";this.ondrop=s;return this;};q.prototype.setGutter=function(s){"use strict";this.gutter=s;return this;};q.prototype.setNamespace=function(s){"use strict";this.namespace=s;return this;};q.prototype.setUseScroller=function(s){"use strict";this.useScroller=s;return this;};q.prototype.addHandle=function(s){"use strict";if(this.handles.length==1&&this.handles[0].obj==this.dom)this.removeHandle(this.dom);this.handles.push({obj:s,evt:[g.listen(s,'mousedown',this._onmousedown.bind(this)),g.listen(s,'click',this._onclick.bind(this)),g.listen(s,'drag',r),g.listen(s,'selectstart',r)]});return this;};q.prototype.removeHandle=function(s){"use strict";this.handles=this.handles.filter(function(t){if(t.obj!=s){return true;}else{t.evt.forEach(function(u){u.remove();});return false;}});};q.prototype.getDOM=function(){"use strict";return this.dom;};q.prototype.setKey=function(s,t){"use strict";this.data[s]=t;return this;};q.prototype.getKey=function(s){"use strict";return this.data[s];};q.prototype._setActive=function(s){"use strict";this.dom.activeDrag=this.active=s;for(var t=0;t<this.handles.length;t++)this.handles[t].obj.activeDrag=s;};q.prototype.ondrag=o;q.prototype.ongrab=o;q.prototype.ondrop=o;q.prototype.gutter=0;q.prototype.handles=null;function r(s){if(s.getTarget()!==document.activeElement)return s.kill();}e.exports=q;});
__d("Droppable",["Collection","Drag","Draggable","Vector","emptyFunction"],function(a,b,c,d,e,f,g,h,i,j,k){function l(m){"use strict";if(!m)throw new Error('Element should be a DOM node');if(!(this instanceof l)){if(m instanceof Array){var n=[];m.forEach(function(o){n.push(new l(o));});return new g(l,n);}else return new l(m);}else{this.data={};this.dom=m;this.namespace=null;}}l.prototype.destroy=function(){"use strict";if(this.namespace)h.removeDroppable(this.namespace,this);this.data=this.dom=null;};l.prototype.setNamespace=function(m){"use strict";if(this.namespace)h.removeDroppable(this.namespace,this);this.namespace=m;h.addDroppable(m,this);return this;};l.prototype.setZIndex=function(m){"use strict";this.zIndex=m;return this;};l.prototype.hasPointMovedHorizontally=function(m){"use strict";var n=j.getElementPosition(this.dom);return n.x<=m.x&&this.dom.offsetWidth+n.x>m.x;};l.prototype.hasPointMovedVertically=function(m){"use strict";var n=j.getElementPosition(this.dom);return n.y<=m.y&&this.dom.offsetHeight+n.y>m.y;};l.prototype.hasPointMovedInside=function(m){"use strict";return this.hasPointMovedHorizontally(m)&&this.hasPointMovedVertically(m);};l.prototype.setDragOverHandler=function(m){"use strict";this.ondragover=m;return this;};l.prototype.setDragOverVectically=function(){"use strict";this.isDraggedOver=l.prototype.hasPointMovedVertically;return this;};l.prototype.setDragOverHorizontally=function(){"use strict";this.isDraggedOver=l.prototype.hasPointMovedHorizontally;return this;};l.prototype.setDragMoveHandler=function(m){"use strict";this.ondragmove=m;return this;};l.prototype.setDropHandler=function(m){"use strict";this.ondrop=m;return this;};l.prototype.zIndex=0;l.prototype.isDraggedOver=l.prototype.hasPointMovedInside;l.prototype.ondragover=k;l.prototype.ondragmove=k;l.prototype.ondrop=k;l.prototype.getDOM=i.prototype.getDOM;l.prototype.setKey=i.prototype.setKey;l.prototype.getKey=i.prototype.getKey;e.exports=l;});
__d("SortableGroup",["CSS","DOM","Draggable","Droppable","Style","Vector","copyProperties","emptyFunction","removeFromArray"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){function p(){"use strict";this.namespace='sortable'+(++p.instanceCount);this.draggables={};this.droppables={};this.sortables={};this.linkedGroups=[];this.linkedGroups.onbeforelinkjump=n;this.linkedGroups.onlinkjump=n;this.rootNode=null;this.boundingBox=null;this.neverEmpty=false;this.hasEmptyMessage=false;this.isDroppable=true;this.isDraggable=true;this.useScroller=true;this.dragOverCriteria='inside';this.requireSameParent=true;this.anchor=null;this.disabled=false;this.autoWidth=false;}p.prototype.addEmptyMessage=function(q,r){"use strict";var s='placeholder';if(q.parentNode!=r)h.appendContent(r,q);this.emptyMessage=q;this._initializeAdded(s,q);this.hasEmptyMessage=true;this.sortables[s]=q;this.droppables[s]=(new j(q)).setNamespace(this.namespace).setDragOverHandler(this._dragOverHandlerShim.bind(this,s));return this;};p.prototype.setAutoWidth=function(q){"use strict";this.autoWidth=q;return this;};p.prototype.setUseScroller=function(q){"use strict";this.useScroller=q;return this;};p.prototype.setDragOverHorizontally=function(){"use strict";this.dragOverCriteria='horizontal';return this;};p.prototype.setDragOverVertically=function(){"use strict";this.dragOverCriteria='vertical';return this;};p.prototype.removeEmptyMessage=function(){"use strict";if(this.emptyMessage)o(h,this.emptyMessage);this.hasEmptyMessage=false;this.removeSortable('placeholder');return this;};p.prototype.addSortable=function(q,r,s){"use strict";this._initializeAdded(q,r);this.sortables[q]=r;this.draggables[q]=(new i(r)).setNamespace(this.namespace).setGutter(this.gutter).setUseAbsolute(true).setUseScroller(this.useScroller).setGrabHandler(this.grabHandler.bind(this,q)).setDropHandler(this.dropHandler.bind(this,q)).setKey('key',q).setBoundingBox(this.boundingBox);if(s)this.draggables[q].addHandle(s);this.droppables[q]=(new j(r)).setNamespace(this.namespace).setDragOverHandler(this._dragOverHandlerShim.bind(this,q));if(this.dragOverCriteria==='horizontal'){this.droppables[q].setDragOverHorizontally();}else if(this.dragOverCriteria==='vertical')this.droppables[q].setDragOverVectically();return this;};p.prototype.destroy=function(){"use strict";for(var q in this.droppables)this.droppables[q].destroy();for(var r in this.draggables)this.draggables[r].destroy();this.droppables=this.draggables=this.rootNode=null;o(this.linkedGroups,this);for(var s=0;s<this.linkedGroups.length;s++)this.linkedGroups[s].linkedGroups=this.linkedGroups;};p.prototype.dragOverHandler=function(q,r){"use strict";if(!this.isDroppable&&!this.anchor)return;var s=false;if(!(r in this.draggables)){this.linkedGroups.onbeforelinkjump.call(this,r);if(!this.migrateLinkedSortable(r))throw new Error('Draggable dropped onto a foreign droppable!');s=true;}var t=true,u=this.getSortables(),v=this.sortables[r],w=this.sortables[q];if(!this.anchor){var x=u.length;for(var y=0;y<x;y++)if(u[y]==w){break;}else if(u[y]==v){t=false;break;}}else w=this.anchor;this.onbeforedragover(v,w);var z=this.linkedGroups.placeholder;this.insertPlaceholder(z,w,t||this.anchor);z.parentNode.insertBefore(v,z);this.ondragover(v,w,r,q);if(s)this.linkedGroups.onlinkjump.call(this,r);};p.prototype.dropHandler=function(q){"use strict";if(this._checkLastRemaining()){this.draggables[q].resetPosition();return;}var r=this.linkedGroups.placeholder;g.removeClass(this.sortables[q],'drag');this.draggables[q].resetPosition();r.parentNode.insertBefore(this.sortables[q],r);r.parentNode.removeChild(r);for(var s=0;s<this.linkedGroups.length;s++)if(this.linkedGroups[s].anchor)delete this.linkedGroups[s].anchor;this.ondropcallback(q,this.sortables[q]);this.onorderchange();};p.prototype.getOrder=function(){"use strict";var q=[],r=this.getSortables();for(var s=0;s<r.length;s++)for(var t in this.sortables)if(this.sortables[t]==r[s]){q.push(t);break;}return q;};p.prototype.getSortables=function(){"use strict";return this.rootNode?this.rootNode.childNodes:[];};p.prototype.grabHandler=function(q){"use strict";if(this.disabled||this._checkLastRemaining()||!this.isDraggable){this.draggables[q].killDrag();return;}this.onbeforegrabcallback(this.sortables[q],q);var r=this.linkedGroups.placeholder,s=this.sortables[q];g.setClass(r,s.className);g.addClass(r,'droppable_placeholder');g.addClass(s,'drag');l.getElementDimensions(s).setElementDimensions(r);if(this.autoWidth)k.set(r,'width','auto');s.parentNode.insertBefore(r,s);this.ongrabcallback(this.sortables[q],q);if(!this.isDroppable){this.anchor=s.nextSibling;if(!this.anchor){this.anchor=h.create('div');s.parentNode.appendChild(this.anchor);}}};p.prototype.insertPlaceholder=function(q,r,s){"use strict";if(s){h.insertBefore(r,q);}else h.insertAfter(r,q);};p.prototype.keyExists=function(q){"use strict";return this.sortables[q];};p.prototype.link=function(q){"use strict";q.linkedGroups=this.linkedGroups;if(!this.linkedGroups.length)this.linkedGroups.push(this);this.linkedGroups.push(q);for(var r=0;r<this.linkedGroups.length;r++)if(this.linkedGroups[r].namespace!=this.namespace){this.linkedGroups[r].namespace=this.namespace;for(var s in this.linkedGroups[r].droppables){this.linkedGroups[r].droppables[s].setNamespace(this.namespace);var t=this.linkedGroups[r].draggables[s];t&&t.setNamespace(this.namespace);}}return this;};p.prototype.migrateLinkedSortable=function(q){"use strict";for(var r=0;r<this.linkedGroups.length;r++)if(q in this.linkedGroups[r].draggables){this.sortables[q]=this.linkedGroups[r].sortables[q];this.draggables[q]=this.linkedGroups[r].draggables[q];this.draggables[q].setGrabHandler(this.grabHandler.bind(this,q)).setDropHandler(this.dropHandler.bind(this,q));this.droppables[q]=this.linkedGroups[r].droppables[q];this.droppables[q].setDragOverHandler(this._dragOverHandlerShim.bind(this,q));delete this.linkedGroups[r].sortables[q];delete this.linkedGroups[r].draggables[q];delete this.linkedGroups[r].droppables[q];return true;}return false;};p.prototype.removeSortable=function(q){"use strict";if(q in this.sortables){if(q in this.draggables)this.draggables[q].destroy();if(q in this.droppables)this.droppables[q].destroy();delete this.draggables[q];delete this.droppables[q];delete this.sortables[q];}};p.prototype.removeAllSortables=function(){"use strict";for(var q in this.sortables)this.removeSortable(q);};p.prototype.setDisabled=function(q){"use strict";this.disabled=q;return this;};p.prototype.forceDrop=function(q){"use strict";if(q in this.sortables)this.draggables[q].forceDrop();};p.prototype.killDrag=function(q){"use strict";if(q in this.sortables)this.draggables[q].killDrag();};p.prototype.setBeforeGrabCallback=function(q){"use strict";this.onbeforegrabcallback=q;return this;};p.prototype.setBoundingBox=function(q){"use strict";this.boundingBox=q;for(var r in this.draggables)this.draggables[r].setBoundingBox(this.boundingBox);return this;};p.prototype.setBeforeDragOverCallback=function(q){"use strict";this.onbeforedragover=q;return this;};p.prototype.setDragOverCallback=function(q){"use strict";this.ondragover=q;return this;};p.prototype.setDropCallback=function(q){"use strict";this.ondropcallback=q;return this;};p.prototype.setDroppable=function(q){"use strict";this.isDroppable=q;return this;};p.prototype.setDraggable=function(q){"use strict";this.isDraggable=q;return this;};p.prototype.setGrabCallback=function(q){"use strict";this.ongrabcallback=q;return this;};p.prototype.setBeforeLinkJumpHandler=function(q){"use strict";this.linkedGroups.onbeforelinkjump=q;return this;};p.prototype.setInsertPlaceholderHandler=function(q){"use strict";this.insertPlaceholder=q;};p.prototype.setLinkJumpHandler=function(q){"use strict";this.linkedGroups.onlinkjump=q;return this;};p.prototype.setNeverEmpty=function(q){"use strict";this.neverEmpty=q;};p.prototype.setOrderChangeHandler=function(q){"use strict";this.onorderchange=q;return this;};p.prototype.setRequireSameParent=function(q,r){"use strict";this.requireSameParent=r;};p.prototype.setSortablesGetter=function(q){"use strict";this.getSortables=q;};p.prototype._checkLastRemaining=function(q){"use strict";var r=this.hasEmptyMessage?2:1;return this.neverEmpty&&this.getSortables().length==r;};p.prototype._dragOverHandlerShim=function(q,r){"use strict";this.dragOverHandler(q,r.getKey('key'));};p.prototype._initializeAdded=function(q,r){"use strict";if(this.rootNode===null){this.rootNode=r.parentNode;if(!this.linkedGroups.placeholder)this.linkedGroups.placeholder=h.create(r.tagName,{className:'dragPlaceholder',style:{padding:'0'}});}else if(this.requireSameParent&&this.rootNode!=r.parentNode)throw new Error('All sortables of a collection must share the same parentNode');if(q in this.draggables)throw new Error('All sortables must have a unique key');};p.instanceCount=0;m(p.prototype,{gutter:15,onbeforegrabcallback:n,onbeforedragover:n,ondragover:n,ondropcallback:n,ongrabcallback:n,onorderchange:n});e.exports=a.SortableGroup||p;});
__d("TimelineReorderAboutUnitEditor",["AsyncRequest","DataStore","DOMQuery","Rect","SortableGroup","csx"],function(a,b,c,d,e,f,g,h,i,j,k,l){var m=null;function n(o,p){"use strict";if(!m||p!==m.$TimelineReorderAboutUnitEditor0)m=this;m.$TimelineReorderAboutUnitEditor1=o;m.$TimelineReorderAboutUnitEditor0=p;n.resetItems();return m;}n.prototype.addItems=function(){"use strict";this.sortableGroup=new k().setOrderChangeHandler(this.$TimelineReorderAboutUnitEditor2.bind(this));var o=i.scry(this.$TimelineReorderAboutUnitEditor1,"._5bkm");for(var p=0,q=o.length;p<q;p++)this.sortableGroup.addSortable(h.get((o[p]),'token'),o[p]);var r=new j(this.$TimelineReorderAboutUnitEditor1);this.sortableGroup.setBoundingBox(r);};n.prototype.$TimelineReorderAboutUnitEditor2=function(){"use strict";new g('/ajax/timeline/about_unit/reorder_items/').setData({order:this.sortableGroup.getOrder(),profile_id:this.$TimelineReorderAboutUnitEditor0}).send();};n.resetItems=function(){"use strict";if(!m)return;m.sortableGroup&&m.sortableGroup.destroy();m.addItems();};e.exports=n;});
__d("TimelineStickyHeaderComposerX",["Arbiter","Bootloader","ComposerXController","CSS","DOMQuery","Event","Parent","Run","TimelineComposerUtilities","TimelineContentLoader","TimelineStickyHeader","Vector","csx","cx"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t){function u(w){return w&&w.getContext&&m.byClass(w.getContext(),"_2wp");}function v(w){"use strict";this._composerRoot=w;this._tokens=[o.listenToSetEstimatedDate(this._composerRoot,p.capsuleForCurrentSection),o.listenToPublish(this._composerRoot,this._close.bind(this)),g.subscribe('PhotoSnowlift.OPEN',this._close.bind(this)),g.subscribe('TimelineMLE/mleFlyoutShown',function(x,y){if(u(y)===this._composerRoot)i.reset(this._composerRoot);}.bind(this)),g.subscribe('composer/initializedAttachment',function(x,y){if(y.composerRoot===this._composerRoot){this._registerClickToDismiss();if(!y.isInitial)this._closeMLE();}else this._close();}.bind(this)),g.subscribe(q.ADJUST_WIDTH,this._toggleNarrowMode.bind(this))];this._clickCancelToken=o.listenToCancel(this._composerRoot,this._close.bind(this));n.onLeave(function(){while(this._tokens.length)this._tokens.pop().unsubscribe();this._clearClickDismissToken();if(this._clickCancelToken){this._clickCancelToken.remove();this._clickCancelToken=null;}}.bind(this));}v.prototype._toggleNarrowMode=function(event,w){"use strict";h.loadModules(["Tooltip"],function(x){var y=r.getElementDimensions(w).x>400,z=k.scry(this._composerRoot,"._9lb");j.conditionClass(this._composerRoot,"_2wq",y);for(var aa=0;aa<z.length;aa++){var ba=z[aa],ca=k.getText(ba);if(y){x.set(ba,ca);}else x.remove(ba);}}.bind(this));return false;};v.prototype._registerClickToDismiss=function(){"use strict";var w=j.hasClass(k.find(this._composerRoot,"._yq"),"_519b");if(!w){this._clearClickDismissToken();return;}this._clickDismissToken=l.listen(document.body,'click',function(x){var y=m.byClass(x.getTarget(),"_2wp");if(!y){this._close();this._clearClickDismissToken();}}.bind(this));};v.prototype._clearClickDismissToken=function(){"use strict";if(this._clickDismissToken){this._clickDismissToken.remove();this._clickDismissToken=null;}};v.prototype._close=function(){"use strict";this._clearClickDismissToken();this._closeMLE();i.reset(this._composerRoot);};v.prototype._closeMLE=function(){"use strict";h.loadModules(["TimelineMLE"],function(w){var x=w.getFlyout();if(u(x)===this._composerRoot)w.hideFlyout();}.bind(this));};e.exports=v;});