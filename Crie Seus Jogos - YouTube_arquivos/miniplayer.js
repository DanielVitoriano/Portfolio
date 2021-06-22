(function(g){var window=this;'use strict';var p6=function(a){g.V.call(this,{D:"div",L:"ytp-miniplayer-ui"});this.cg=!1;this.player=a;this.N(a,"minimized",this.jg);this.N(a,"onStateChange",this.pD)},q6=function(a){g.FN.call(this,a);
this.i=new p6(this.player);this.i.hide();g.tN(this.player,this.i.element,4);a.Be()&&(this.load(),g.N(a.getRootNode(),"ytp-player-minimized",!0))};
g.v(p6,g.V);g.k=p6.prototype;
g.k.IB=function(){this.tooltip=new g.eR(this.player,this);g.F(this,this.tooltip);g.tN(this.player,this.tooltip.element,4);this.tooltip.scale=.6;this.jc=new g.AO(this.player);g.F(this,this.jc);this.yg=new g.V({D:"div",L:"ytp-miniplayer-scrim"});g.F(this,this.yg);this.yg.ya(this.element);this.N(this.yg.element,"click",this.Fx);var a=new g.V({D:"button",Ca:["ytp-miniplayer-close-button","ytp-button"],V:{"aria-label":"Fechar"},S:[g.IL()]});g.F(this,a);a.ya(this.yg.element);this.N(a.element,"click",this.Xh);
a=new g.T1(this.player,this);g.F(this,a);a.ya(this.yg.element);this.uo=new g.V({D:"div",L:"ytp-miniplayer-controls"});g.F(this,this.uo);this.uo.ya(this.yg.element);this.N(this.uo.element,"click",this.Fx);var b=new g.V({D:"div",L:"ytp-miniplayer-button-container"});g.F(this,b);b.ya(this.uo.element);a=new g.V({D:"div",L:"ytp-miniplayer-play-button-container"});g.F(this,a);a.ya(this.uo.element);var c=new g.V({D:"div",L:"ytp-miniplayer-button-container"});g.F(this,c);c.ya(this.uo.element);this.HJ=new g.bQ(this.player,
this,!1);g.F(this,this.HJ);this.HJ.ya(b.element);b=new g.TP(this.player,this);g.F(this,b);b.ya(a.element);this.nextButton=new g.bQ(this.player,this,!0);g.F(this,this.nextButton);this.nextButton.ya(c.element);this.Ag=new g.SQ(this.player,this);g.F(this,this.Ag);this.Ag.ya(this.yg.element);this.Ec=new g.gQ(this.player,this);g.F(this,this.Ec);g.tN(this.player,this.Ec.element,4);this.qx=new g.V({D:"div",L:"ytp-miniplayer-buttons"});g.F(this,this.qx);g.tN(this.player,this.qx.element,4);a=new g.V({D:"button",
Ca:["ytp-miniplayer-close-button","ytp-button"],V:{"aria-label":"Fechar"},S:[g.IL()]});g.F(this,a);a.ya(this.qx.element);this.N(a.element,"click",this.Xh);a=new g.V({D:"button",Ca:["ytp-miniplayer-replay-button","ytp-button"],V:{"aria-label":"Fechar"},S:[g.NL()]});g.F(this,a);a.ya(this.qx.element);this.N(a.element,"click",this.wS);this.N(this.player,"presentingplayerstatechange",this.Dc);this.N(this.player,"appresize",this.tb);this.N(this.player,"fullscreentoggled",this.tb);this.tb()};
g.k.show=function(){this.td=new g.Dq(this.gp,null,this);this.td.start();this.cg||(this.IB(),this.cg=!0);0!==this.player.getPlayerState()&&g.V.prototype.show.call(this);this.Ec.show();this.player.unloadModule("annotations_module")};
g.k.hide=function(){this.td&&(this.td.dispose(),this.td=void 0);g.V.prototype.hide.call(this);this.player.Be()||(this.cg&&this.Ec.hide(),this.player.loadModule("annotations_module"))};
g.k.ra=function(){this.td&&(this.td.dispose(),this.td=void 0);g.V.prototype.ra.call(this)};
g.k.Xh=function(){this.player.stopVideo();this.player.Na("onCloseMiniplayer")};
g.k.wS=function(){this.player.playVideo()};
g.k.Fx=function(a){if(a.target===this.yg.element||a.target===this.uo.element)g.S(this.player.T().experiments,"kevlar_miniplayer_play_pause_on_scrim")?g.MK(this.player.sb())?this.player.pauseVideo():this.player.playVideo():this.player.Na("onExpandMiniplayer")};
g.k.jg=function(){g.N(this.player.getRootNode(),"ytp-player-minimized",this.player.Be())};
g.k.Yc=function(){this.Ec.Rb();this.Ag.Rb()};
g.k.gp=function(){this.Yc();this.td&&this.td.start()};
g.k.Dc=function(a){g.U(a.state,32)&&this.tooltip.hide()};
g.k.tb=function(){g.rQ(this.Ec,0,this.player.Za().getPlayerSize().width,!1);g.iQ(this.Ec)};
g.k.pD=function(a){this.player.Be()&&(0===a?this.hide():this.show())};
g.k.ac=function(){return this.tooltip};
g.k.ze=function(){return!1};
g.k.Xe=function(){return!1};
g.k.Sh=function(){return!1};
g.k.ey=function(){};
g.k.nm=function(){};
g.k.wq=function(){};
g.k.Em=function(){return null};
g.k.Ni=function(){return new g.rl(0,0,0,0)};
g.k.handleGlobalKeyDown=function(){return!1};
g.k.handleGlobalKeyUp=function(){return!1};
g.k.pp=function(a,b,c,d,e){var f=0,h=d=0,l=g.Ql(a);if(b){c=g.Pq(b,"ytp-prev-button")||g.Pq(b,"ytp-next-button");var m=g.Pq(b,"ytp-play-button"),n=g.Pq(b,"ytp-miniplayer-expand-watch-page-button");c?f=h=12:m?(b=g.Ol(b,this.element),h=b.x,f=b.y-12):n&&(h=g.Pq(b,"ytp-miniplayer-button-top-left"),f=g.Ol(b,this.element),b=g.Ql(b),h?(h=8,f=f.y+40):(h=f.x-l.width+b.width,f=f.y-20))}else h=c-l.width/2,d=25+(e||0);b=this.player.Za().getPlayerSize().width;e=f+(e||0);l=g.Lf(h,0,b-l.width);e?(a.style.top=e+"px",
a.style.bottom=""):(a.style.top="",a.style.bottom=d+"px");a.style.left=l+"px"};
g.k.showControls=function(){};
g.k.yk=function(){};
g.k.Qj=function(){return!1};g.v(q6,g.FN);q6.prototype.create=function(){};
q6.prototype.oi=function(){return!1};
q6.prototype.load=function(){this.player.hideControls();this.i.show()};
q6.prototype.unload=function(){this.player.showControls();this.i.hide()};g.QN.miniplayer=q6;})(_yt_player);
