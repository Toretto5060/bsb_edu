/*******************************************************************************

	CStbMediaPlayer.js
	媒体播放器支持(for iPanel 3.0)

	Copyright (C) 2014-2016, ZensVision™ Information Technology Co., Ltd.

	author	: scumyang@gmail.com
	create	: 2016-06-08
	update	:

*******************************************************************************/

/**

## 用例 ##
通常只需要两步: 1.创建播放器实例 -> 2.打开媒资

1、创建播放器实例:
	$MP = new CStbMediaPlayer(
	{
		// 必须指定平台参数, 茁壮中间件盒子必须为 'iPanel'
		// 非 iPanel 平台请引用 ext.mediaPlayer.js, 支持 PC/EVM/Inspur/Suma
		platform: 'iPanel'
	});


	// 以下是初始化时的可选的附加属性:

	// 默认视频窗口大小, 设置后可在窗口化与全屏间自动切换
	windowPos: { x:60, y:365, w:570, h:360 }

	// 系统播放器事件回调
	// S: 当前播放器实例
	// EV: 系统播放器事件
	onEvent: function( S, EV )
	{
		$G.log( 'EV=' + S.eventCode, '#0F0' );
	}

	// 标准事件回调: 加载完成
	onLoad: function( S, EV )
	{
		S.play();
	}

	// 标准事件回调: 播放结束
	onStop: function( S, EV )
	{
		S.play();
	}

2、打开媒资:
	$MP.open( 'http://192.168.168.201/media/video/都市丽人.flv' );

3、页面细节：
	1) 视频层是绘制在页面层之下的, 所以 body 背景必须是 transparent, 不透明的任何可见元素都将显示在视频层之上;
	2) 离开页面时, 必须关闭视频, 否则可能导致多个流解码混乱;
		如: <body onunload="$MP.close()">

*/


//------------------------------------------------------------------------------
// 工具函数
//------------------------------------------------------------------------------
function isFunction( A )
{
	return typeof A == 'function';
}

function isUndefined( A )
{
	return typeof A == 'undefined';
}

//------------------------------------------------------------------------------
// CStbMediaPlayer 主类
//------------------------------------------------------------------------------

function CStbMediaPlayer( P )
{
	switch( P.platform )
	{
		case 'ipanel': return new CStbMediaPlayer_iPanel( P ); break;
		case 'suma': return new CStbMediaPlayer_suma( P ); break;
		case 'guangxi': return new CStbMediaPlayer_guangxi( P ); break;
		case 'cos': return new CStbMediaPlayer_cos( P ); break;
		default: return new CStbMediaPlayer_Webkit( P ); break;
	}
}

//------------------------------------------------------------------------------
//webkit浏览器(video)
//PC
//------------------------------------------------------------------------------
function CStbMediaPlayer_Webkit( P )
{
	//平台名
	this.platform = 'pc';

	P = P || {};

	//播放器
	this.video = document.createElement('video');
	this.audio = document.createElement('audio');

	this.MP = this.video;

	this.MP.controls = 'controls';

	//视频地址
	this.src = '';

	this.isFullscreen = 0;

	this.winPos = P.windowPos ? P.windowPos : { x:0, y:0, w:1279, h:719 };

	this.init( P );

	this.onStop = function () {};

	this.windowPos( this.winPos );
}

CStbMediaPlayer_Webkit.prototype =
{
	init : function ( P )
	{
		var _this = this;
		this.MP.onended = function(){ alert('end'); _this.onStop();};
	},
	open : function ( MRL )
	{
		if(/mp3/.test(MRL))
		{
			this.MP = this.audio;
		}

		document.body.appendChild(this.MP);

		this.MP.loop = 'loop';

		this.MP.autoplay = 'autoplay';

		this.MP.src = MRL;

		this.lastMRL = MRL;

		//this.play();
	},
	close : function () {
		return;
	},
	reopen : function ()
	{
		//this.play();
		//this.MP.src = '';
		this.MP.src = this.lastMRL;
		this.play();
	},
	play : function ()
	{
		//this.MP.src = this.lastMRL;
		this.MP.play();
	},
	pause : function ( t )
	{
		if(t == 'toggle' || t == 't')
		{
			this.MP.paused ? this.play() : this.MP.pause();
			return this;
		}
		this.MP.pause();
	},
	windowPos : function ( Pos )
	{
		with( this.MP.style )
		{
			zIndex = '-999';
			position = 'absolute';
			width = Pos.w +'px';
			height = Pos.h +'px';
			left = Pos.x +'px';
			top = Pos.y +'px';
		}
	},
	fullscreen: function( A )
	{
		try
		{
			switch( A )
			{
				// 切换
				case 'toggle':
				case 't':
				{
					this.isFullscreen = 1 - this.isFullscreen;
					this.fullscreen( this.isFullscreen );
				} break;

				// 全屏
				case 'fs':
				case 1:
				{
					this.windowPos( { x:0, y:0, w:1280, h:720 } );
					this.isFullscreen;
				} break;

				// 窗口化
				case 'window':
				case 'win':
				case 0:
				{
					this.windowPos( this.winPos );
					this.isFullscreen = 0;
				} break;

				// 返回当前全屏状态
				default: return this.isFullscreen;
			}
		}
		catch( E )
		{
		}

		return this;
	},
}

function CStbMediaPlayer_cos( P )
{
	this.platform = 'cos';

	this.MP = {};

	P = P || {};

	this.lastMRL = '';

	this.winPos = P.windowPos ? P.windowPos : { x:0, y:0, w:1279, h:719 };

	this.isFullscreen = 0;

	this.playState = 0;

    this.volumeStep = 3.3;
    this.volume = 0;

	this.onLoad = isFunction( P.onLoad ) ? P.onLoad : 0;
	this.onStop = isFunction( P.onStop ) ? P.onStop : 0;
	this.onEvent = isFunction( P.onStop ) ? P.onStop : 0;

	this.init( P );

	this.windowPos( this.winPos );
}

CStbMediaPlayer_cos.prototype =
{
	init : function ( P )
	{
		try
		{
			this.MP = new MediaPlayer();
			this.MPID = this.MP.getPlayerInstanceID();
			this.MP.bindPlayerInstance(this.MPID);
			this.MP.enableTrickMode(1);
			isFunction( P.onEvent ) ? onEvent = P.onEvent : 0;

			// 注册系统事件
			var _this = this;
			document.onsystemevent = function( EV )
			{
				_this.eventCode = EV.which;

				// 呼叫自定义事件回调
				isFunction( P.onEvent ) && P.onEvent( _this, EV );

				// 处理主要状态
				switch( _this.eventCode )
				{
					case 10931: // 加载完成, 若未定义回调则默认为开始播放.
						_this.onLoad ? _this.onLoad( _this ) : _this.play();
						break;

                    case 13002://播放不出来
                        document.getElementById('warnning').style.display = "block";
                        document.getElementById('retry').className = "select";
                        document.getElementById('retry').style.backgroundImage = "url('../images/edu/swiper/school/btn_retry_focus.png')";
                        break;
					case 10936: // 播放结束, 若未定义回调则默认为关闭播放器.
						_this.onStop ? _this.onStop( _this ) : _this.close();
						break;
                    case 13051: // 播放结束
                        document.getElementById('over').style.display = "block";
					default: document.getElementById('warnning').style.display = "none";
				}
			}
		}
		catch( E ){}
	},
	open : function ( M )
	{
		try
		{
			//mediaType = getMediaType( __url );
			this.lastMRL = M;
            this.MP.setMediaSource(M);
			this.play();
			return true;
		}
		catch( E ){}
	},
	reopen : function()
	{
		try
		{
			this.MP.pause();
			this.MP.play();
			//this.MP.refresh();
			return true;
		}
		catch( E ){}
	},
	play : function( M )
	{
		try
		{
			this.MP.play();
			this.playState = 1;
			return true;
		}
		catch( E ){}
	},
	pause : function ( t )
	{
		if(t == 'toggle' || t == 't')
		{
			this.playState ?  this.MP.pause() : this.MP.resume();
			this.playState = 1 - this.playState;
			return this;
		}
		this.MP.pause();
	},
	stop : function()
	{
		try
		{
			this.MP.stop();
			return true;
		}
		catch( E ){}
	},
	close : function()
	{
		this.stop();
	},
	windowPos : function ( Pos )
	{
		try
		{
			this.MP.setVideoDisplayMode(0);

			var rect = new Rectangle();
			rect.left = Pos.x;
			rect.top = Pos.y;
			rect.width = Pos.w;
			rect.height = Pos.h;
			this.MP.setVideoDisplayArea(rect);
			this.MP.refresh();
		}
		catch ( e ){}
	},
	fullscreen: function( A )
	{
		try
		{
			switch( A )
			{
				// 切换
				case 'toggle':
				case 't':
				{
					this.isFullscreen = 1 - this.isFullscreen;
					this.fullscreen( this.isFullscreen );
				} break;

				// 全屏
				case 'fs':
				case 1:
				{
					this.windowPos( { x:0, y:0, w:1279, h:719 });
					this.isFullscreen;
				} break;

				// 窗口化
				case 'window':
				case 'win':
				case 0:
				{
					this.windowPos(this.winPos);
					this.isFullscreen = 0;
				} break;

				// 返回当前全屏状态
				default: return this.isFullscreen;
			}
		}
		catch( E )
		{
		}

		return this;
	},
	codeStr : function ( N ) {
		var code =
		{
			'Suma_10522': {c:10931, t:'NPT同步超时',	a:'NPT同步超时'},
			'Suma_10931': {c:10931, t:'开始播放',		a:'开始播放'},
			'Suma_10932': {c:10932, t:'缓冲完成',		a:'缓冲完成'},
			'Suma_10933': {c:10933, t:'加载失败',		a:'加载失败'},
			'Suma_10934': {c:10934, t:'加载时长成功',	a:'加载时长成功'},
			'Suma_10935': {c:10935, t:'播放失败',		a:'播放失败'},
			'Suma_10936': {c:10936, t:'播放结束',		a:'播放结束'},
			'Suma_10604': {c:10604, t:'锁频失败',		a:'锁频失败'},
			'Suma_10605': {c:10605, t:'锁频成功',		a:'锁频成功'},
			'Suma_10502': {c:10606, t:'网络已断开',		a:'网络已断开'},
			'Suma_10501': {c:10607, t:'网络已连接',		a:'网络已连接'},
			'Suma_10608': {c:10608, t:'HDMI已断开',		a:'HDMI已断开'},
			'Suma_10609': {c:10609, t:'HDMI已连接',		a:'HDMI已连接'},
			'Suma_11703': {c:11703, t:'CA卡未插入',		a:'CA卡未插入'},
		}

		return code[ 'Suma'+ N ];

    },

    /***
     * 
     *  针对cos浏览器：在CStbMediaPlayer_cos对象封装上的原型扩展
     * 
     */

    // 快进、快退
    setPace: function (N) {
        this.MP.setPace(N);
    },
    // 获取媒体播放总时长
    getDuration: function() {
        return this.MP.getMediaDuration();
    },
    // 获取媒体播放当前时长
    getCurrentTime: function() {
        return this.MP.getCurrentPlayTime();
    },
    setVol: function( A )
	{
        this.volume = this.MP.getVolume();
        // alert(this.volume);
		try
		{
			switch( A )
			{
                case '+': 
                    this.volume += this.volumeStep;
                    if(this.volume >= 100) {
                        this.volume = 100;
                    }
                    this.MP.setVolume(this.volume);
                    break;
                case '-':
                    this.volume -= this.volumeStep;
                    if(this.volume <= 0) {
                        this.volume = 0;
                    }
                    this.MP.setVolume(this.volume);
                    break;
				default: return this.volume;
            }
            
		}
		catch( E )
		{
		}

		return this;
    }
};

function CStbMediaPlayer_suma( P )
{
	this.platform = 'suma';

	this.MP = {};

	P = P || {};

	this.lastMRL = '';

	this.winPos = P.windowPos ? P.windowPos : { x:0, y:0, w:1280, h:720 };

	this.isFullscreen = 0;

	this.playState = 0;

	this.onLoad = isFunction( P.onLoad ) ? P.onLoad : 0;
	this.onStop = isFunction( P.onStop ) ? P.onStop : 0;
	this.onEvent = isFunction( P.onStop ) ? P.onStop : 0;

	this.init( P );

	this.windowPos( this.winPos );
}

CStbMediaPlayer_suma.prototype =
{
	init : function ( P )
	{
		try
		{
			this.MP = new MediaPlayer();
			this.MP.createPlayerInstance( 'Video', 2 );

			isFunction( P.onEvent ) ? onEvent = P.onEvent : 0;

			// 注册系统事件
			var _this = this;
			document.onsystemevent = function( EV )
			{
				_this.eventCode = EV.which;

				// 呼叫自定义事件回调
				isFunction( P.onEvent ) && P.onEvent( _this, EV );

				// 处理主要状态
				switch( _this.eventCode )
				{
					case 10931: // 加载完成, 若未定义回调则默认为开始播放.
						_this.onLoad ? _this.onLoad( _this ) : _this.play();
						break;

					case 10936: // 播放结束, 若未定义回调则默认为关闭播放器.
						_this.onStop ? _this.onStop( _this ) : _this.close();
						break;

					default: ;
				}
			}
		}
		catch( E ){}
	},
	open : function ( M )
	{
		try
		{
			//mediaType = getMediaType( __url );
			this.MP.source = M;
			this.MP.play();
			return true;
		}
		catch( E ){}
	},
	reopen : function()
	{
		try
		{
			this.MP.pause(0);
			this.MP.play();
			return true;
		}
		catch( E ){}
	},
	play : function( M )
	{
		try
		{
			this.MP.play();
			this.playState = 1;
			return true;
		}
		catch( E ){}
	},
	pause : function ( t )
	{
		if(t == 'toggle' || t == 't')
		{
			this.playState ?  this.MP.pause() : this.play();
			this.playState = 1 - this.playState;
			return this;
		}
		this.MP.pause();
	},
	stop : function()
	{
		try
		{
			this.MP.releasePlayerInstance();
			return true;
		}
		catch( E ){}
	},
	close : function()
	{
		this.stop();
	},
	windowPos : function ( Pos , isfull )
	{
		try
		{
			this.MP.position = '0,' + Pos.x + ',' + Pos.y + ',' + Pos.w + ',' +Pos.h;
			this.MP.refresh();
		}
		catch ( e ){}
	},
	fullscreen: function( A )
	{
		try
		{
			switch( A )
			{
				// 切换
				case 'toggle':
				case 't':
				{
					this.isFullscreen = 1 - this.isFullscreen;
					this.fullscreen( this.isFullscreen );
				} break;

				// 全屏
				case 'fs':
				case 1:
				{
					this.windowPos( { x:0, y:0, w:1280, h:720 });
					this.isFullscreen;
				} break;

				// 窗口化
				case 'window':
				case 'win':
				case 0:
				{
					this.windowPos(this.winPos);
					this.isFullscreen = 0;
				} break;

				// 返回当前全屏状态
				default: return this.isFullscreen;
			}
		}
		catch( E )
		{
		}

		return this;
	},
	codeStr : function ( N ) {
		var code =
		{
			'Suma_10522': {c:10931, t:'NPT同步超时',	a:'NPT同步超时'},
			'Suma_10931': {c:10931, t:'开始播放',		a:'开始播放'},
			'Suma_10932': {c:10932, t:'缓冲完成',		a:'缓冲完成'},
			'Suma_10933': {c:10933, t:'加载失败',		a:'加载失败'},
			'Suma_10934': {c:10934, t:'加载时长成功',	a:'加载时长成功'},
			'Suma_10935': {c:10935, t:'播放失败',		a:'播放失败'},
			'Suma_10936': {c:10936, t:'播放结束',		a:'播放结束'},
			'Suma_10604': {c:10604, t:'锁频失败',		a:'锁频失败'},
			'Suma_10605': {c:10605, t:'锁频成功',		a:'锁频成功'},
			'Suma_10502': {c:10606, t:'网络已断开',		a:'网络已断开'},
			'Suma_10501': {c:10607, t:'网络已连接',		a:'网络已连接'},
			'Suma_10608': {c:10608, t:'HDMI已断开',		a:'HDMI已断开'},
			'Suma_10609': {c:10609, t:'HDMI已连接',		a:'HDMI已连接'},
			'Suma_11703': {c:11703, t:'CA卡未插入',		a:'CA卡未插入'},
		}

		return code[ 'Suma'+ N ];

	}
};


function CStbMediaPlayer_guangxi( P )
{

	this.platform = 'guangxi';

	this.MP = {};

	P = P || {};

	this.lastMRL = '';

	this.winPos = P.windowPos ? P.windowPos : { x:0, y:0, w:1280, h:720 };

	this.isFullscreen = 0;

	this.playState = 0;

	this.onLoad = isFunction( P.onLoad ) ? P.onLoad : 0;
	this.onStop = isFunction( P.onStop ) ? P.onStop : 0;
	this.onEvent = isFunction( P.onStop ) ? P.onStop : 0;

	this.init( P );

	this.windowPos( this.winPos );
}

CStbMediaPlayer_guangxi.prototype =
{
	init : function ( P )
	{
		try
		{
			//iPanel.setGlobalVar("VOD_CTRL_ENABLE_MENU","0");
			//iPanel.setGlobalVar("VOD_CTRL_ENABLE_MENU","1");
		}
		catch( E ){}
	},
	open : function ( M )
	{
		//alert(M)
		try
		{
			this.close();
			this.windowPos( this.winPos );
			iPanel.setGlobalVar("VOD_CTRL_ENABLE_MENU","0");
			iPanel.setGlobalVar("VOD_CTRL_URL", M );
			iPanel.setGlobalVar("VOD_CTRL_PLAY","2");
			return true;
		}
		catch( E ){}
	},
	reopen : function()
	{
		try
		{
			this.MP.pause(0);
			this.MP.play();
			return true;
		}
		catch( E ){}
	},
	play : function( M )
	{
		try
		{
			iPanel.setGlobalVar("VOD_CTRL_PLAY","2");
			this.playState = 1;
			return true;
		}
		catch( E ){}
	},
	pause : function ( t )
	{
		if(t == 'toggle' || t == 't')
		{
			this.playState ? iPanel.setGlobalVar("VOD_CTRL_PAUSE","1") : this.play();
			this.playState = 1 - this.playState;
			return this;
		}
	},
	stop : function()
	{
		try
		{
			//iPanel.setGlobalVar("VOD_CTRL_ENABLE_MENU","1");
			this.pause('t');
			iPanel.setGlobalVar("VOD_CTRL_STOP","1");
			return true;
		}
		catch( E ){}
	},
	close : function()
	{
		this.stop();
	},
	windowPos : function ( Pos )
	{
		try
		{
			var P = 'x=' + Pos.x + '&y=' + Pos.y +'&w=' + Pos.w + '&h=' + Pos.h;
			iPanel.setGlobalVar("VOD_CTRL_LOCATION",P);
		}
		catch ( e ){}
	},
	fullscreen: function( A )
	{
		try
		{
			switch( A )
			{
				// 切换
				case 'toggle':
				case 't':
				{
					this.isFullscreen = 1 - this.isFullscreen;
					this.fullscreen( this.isFullscreen );
				} break;

				// 全屏
				case 'fs':
				case 1:
				{
					this.windowPos( { x:0, y:0, w:1280, h:720 });
					this.isFullscreen;
				} break;

				// 窗口化
				case 'window':
				case 'win':
				case 0:
				{
					this.windowPos(this.winPos);
					this.isFullscreen = 0;
				} break;

				// 返回当前全屏状态
				default: return this.isFullscreen;
			}
		}
		catch( E )
		{
		}

		return this;
	}
}




//------------------------------------------------------------------------------
// CStbMediaPlayer_iPanel 类
// (茁壮中间件 iPanel 3.0)
//------------------------------------------------------------------------------
function CStbMediaPlayer_iPanel( P )
{
	// 平台名
	this.platform = 'iPanel';

	P = P || {};

	// 最后播放的 MRL
	this.lastMRL = '';

	// 事件码
	this.eventCode = 0;

	// 默认窗口大小
	this.winPos = P.windowPos ? P.windowPos : { x:0, y:0, w:1280, h:720 };

	// 是否全屏
	this.isFullscreen = 0;

	// 音量调节步进
	this.volumeStep = 3;

	//状态
	this.playState = 0;

	// 事件回调
	this.onLoad = isFunction( P.onLoad ) ? P.onLoad : 0;
	this.onStop = isFunction( P.onStop ) ? P.onStop : 0;
	this.onEvent = isFunction( P.onStop ) ? P.onStop : 0;

	// 初始化
	this.init( P );

	// 设置默认窗口大小
	this.windowPos( this.winPos );

}

// 原型扩展
CStbMediaPlayer_iPanel.prototype =
{
	// 初始化
	init: function( P )
	{
		try
		{
			var _this = this;

			// iPanel 3.0 以 systemevent 方式实现事件上浮
			document.onsystemevent = function( EV )
			{
				_this.eventCode = EV.which;

				// 呼叫自定义事件回调
				isFunction( P.onEvent ) && P.onEvent( _this, EV );
				// 处理主要状态
				switch( _this.eventCode )
				{
                    case 5202: // 加载完成, 若未定义回调则默认为开始播放.
                        _this.onLoad ? _this.onLoad( _this ) : _this.play();
						break;

                    case 5210: // 播放结束, 若未定义回调则默认为关闭播放器.
                        document.getElementById('over').style.display = "block";
						_this.onStop ? _this.onStop( _this ) : _this.close();
						break;
                    case 5206: //播放异常
                        document.getElementById('warnning').style.display = "block";
                        document.getElementById('retry').className = "select";
                        document.getElementById('retry').style.backgroundImage = "url('../images/edu/swiper/school/btn_retry_focus.png')";
                        break;
					default: ;
				}
			}
		}
		catch( E )
		{
		}
	}

	// 打开 MRL
	// 加载时间视视频类型、网络情况而定.
	,open: function( MRL )
	{
		try
		{
			// 根据协议头决定媒体参数
			var proto = ( MRL.match( /.*:\/\// ) + '' ).replace( '://', '' ).toLowerCase();

			switch( proto )
			{
				case 'https':
				case 'http': mediaType = 'HTTP'; break;
				case 'igmp': mediaType = 'LiveTV'; break;

				default: mediaType = 'VOD';
			}

			// 初始化 STB 播放模块
			VOD.changeServer( 'isma_v2', 'ip_ts' );
			//VOD.serviceStart();
			//VOD.server.mode = "IP";
			// 可选 mediaType: MPEG,MPG,DivX,MP3,AVI,VOD,TSTV,TVOD,LiveTV,UDP,DVB,localfile,PVR
			media.AV.open( MRL, mediaType );
			this.lastMRL = MRL;

			this.playState = 1;
		}
		catch( E )
		{
		}

		return this;
	},

	// 重新打开最后的 MRL
	reopen: function()
	{
		try
		{
			this.lastMRL ? this.open( this.lastMRL ) : 0;
		}
		catch( E )
		{
		}

		return this;
	},

	// 开始播放
	// 必须在暂停或收到 5202 事件后才能成功播放.
	play: function()
	{
		try
		{
			media.AV.play();
			this.playState = 1;
		}
		catch( E )
		{
		}

		return this;
	},

	// 停止播放
	// 将断开连接, 再次播放需重新 open() 或 replay().
	stop: function()
	{
		try
		{
			media.AV.stop();
			this.playState = 0;
		}
		catch( E )
		{
		}

		return this;
	},

	// 暂停播放
	// 将保持连接, 再次调用 play() 可从暂停点续播.
	pause: function( A )
	{
		try
		{
			switch( A )
			{
				// 切换
				case 'toggle':
				case 't':
				{
					this.playState = 1 - this.playState;
					this.pause( this.playState );
				} break;

				//	播放
				case 1:
				{
					this.play();
				} break;
				// 暂停
				case 0:
				{
					media.AV.pause();
					this.playState = 0;
				} break;

				// 返回当前全屏状态
				default: return this.playState;
			}
		}
		catch( E )
		{
		}

		return this;
	},

	// 设置倍速播放
	// A > 0 时为快进, < 0 时为快退.
	setPace: function( A, N )
	{
        // iPanel.Media.videControl('forward', A);
		try
		{
			if( A > 0 ){
                media.AV.forward( A );
            } 
			else{
                media.AV.backward( A );
            }
		}
		catch( E )
		{
		}

		return this;
	},
	// 关闭 MRL, 释放资源
	close: function()
	{
		try
		{
			media.AV.stop();
			media.AV.close();
			DVB.stopAV();
			this.playState = 0;
		}
		catch( E )
		{
		}

		return this;
	},

	// 设置/获取播放窗口大小
	windowPos: function( A )
	{
		try
		{
			if( isUndefined( A )) return this.winPos;
			media.video.setPosition( A.x, A.y, A.w, A.h );
			this.winPos = A;
		}
		catch( E )
		{
		}

		return this;
	},

	// 设置/获取全屏状态
	fullscreen: function( A )
	{
		try
		{
			switch( A )
			{
				// 切换
				case 'toggle':
				case 't':
				{
					this.isFullscreen = 1 - this.isFullscreen;
					this.fullscreen( this.isFullscreen );
				} break;

				// 全屏
				case 'fs':
				case 1:
				{
					media.video.fullScreen();
					this.isFullscreen
				} break;

				// 窗口化
				case 'window':
				case 'win':
				case 0:
				{
					this.windowPos( this.winPos );
					this.isFullscreen = 0;
				} break;

				// 返回当前全屏状态
				default: return this.isFullscreen;
			}
		}
		catch( E )
		{
		}

		return this;
	},

	// 音量调节
	// 可传 '+', '-' 或明确的数值.
	setVol: function( A )
	{
		try
		{
			switch( A )
			{
				case '+': media.sound.value += this.volumeStep; break;
				case '-': media.sound.value -= this.volumeStep; break;
				default: media.sound.value = A;
            }
            
		}
		catch( E )
		{
		}

		return Math.ceil(media.sound.value/3.4);
	},
    
    // 静音
    mute: function() {
        var val = media.sound.value;
        media.sound.value = 0;
        return val;
    },


	// 跳转播放位置
	// 传入数值, 单位为秒.
	seek: function( N )
	{
		try
		{
			media.AV.seek( '' + N );
		}
		catch( E )
		{
		}

		return this;
	},

	// 获取当前播放器状态
	status: function()
	{
		try
		{
			var s = '';
			switch( media.AV.status )
			{
				case 'play': s = '播放中'; break;
				case 'pause': s = '暂停'; break;
				case 'forward': s = '快进'; break;
				case 'backward': s = '快退'; break;
				case 'repeat': s = '重播'; break;
				case 'slow': s = '慢放'; break;
				case 'stop': s = '停止'; break;
			}
		}
		catch( E )
		{
		}
	},

	// 获取可支持的前端类型列表
	serverList: function()
	{
		try
		{
			return VOD.serverList;
		}
		catch( E )
		{
		}

		return null;
	},

	// 获取当前媒体信息
	mediaInfo: function()
	{
		try
		{
			return {
				 duration: media.AV.duration
				,progress: media.AV.progress
				,elapsed: media.AV.elapsed
				,speed: media.AV.speed
			}
		}
		catch( E )
		{
			return {duration:0, progress:0, elapsed:0, speed:0}
		}
	},
    // 获取当前时间
    getCurrentTime: function() {
        return media.AV.elapsed;
    },
    // 获取总时长
    getDuration: function() {
        return media.AV.duration;
    },
	// 获取状态码对应的文字描述
	codeStr: function( N )
	{
		var s = '';
		switch( N )
		{
			case 5974: s = '页面加载完成'; break;
			case 5200: s = '请求时移列表'; break;
			case 5220: s = 'VOD 模块启动成功'; break;
			case 5221: s = 'VOD 切换失败'; break;
			case 5225: s = 'User Exception'; break;
			case 5228: s = '正在连接服务器...'; break;
			case 5202: s = '缓冲完成'; break;
			case 5203: s = '连接服务器失败'; break;
			case 5205: s = '媒体播放成功'; break;
			case 5206: s = '媒体播放失败'; break;
			case 5210: s = '播放结束'; break;
			case 5228: s = '停止播放成功'; break;
			case 5351: s = '解码器关闭'; break;
			case 8002: break;

			default: s = '(未知状态码)';
		}

		return s;
	}
}
