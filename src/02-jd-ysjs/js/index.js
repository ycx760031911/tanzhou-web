
	DD_roundies.addRule('.btn', '50%', true);

	(function(){
		var oWrap = document.getElementById("wrap"),
			oBanner = utils.getClass("banner")[0],
			oDot = utils.getClass("dot")[0],
			oBtn = utils.getClass("btn"),
			dliList = null,
			daList = null,
			length = null,//8
			oldindex = 0,//序列号
			timmer = null,//定时器
			timmer2 = null,//定时器
			clickTime = 0;//限制点击间隔
		
		//运动框架
		(function(){
			//运动曲线引入
			var Tween = {
				    linear: function (t, b, c, d){  //匀速
				        return c*t/d + b;
				    },
				    easeIn: function(t, b, c, d){  //加速曲线
				        return c*(t/=d)*t + b;
				    },
				    easeOut: function(t, b, c, d){  //减速曲线
				        return -c *(t/=d)*(t-2) + b;
				    },
				    easeBoth: function(t, b, c, d){  //加速减速曲线
				        if ((t/=d/2) < 1) {
				            return c/2*t*t + b;
				        }
				        return -c/2 * ((--t)*(t-2) - 1) + b;
				    },
				    easeInStrong: function(t, b, c, d){  //加加速曲线
				        return c*(t/=d)*t*t*t + b;
				    },
				    easeOutStrong: function(t, b, c, d){  //减减速曲线
				        return -c * ((t=t/d-1)*t*t*t - 1) + b;
				    },
				    easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
				        if ((t/=d/2) < 1) {
				            return c/2*t*t*t*t + b;
				        }
				        return -c/2 * ((t-=2)*t*t*t - 2) + b;
				    },
				    elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
				        if (t === 0) {
				            return b;
				        }
				        if ( (t /= d) == 1 ) {
				            return b+c;
				        }
				        if (!p) {
				            p=d*0.3;
				        }
				        if (!a || a < Math.abs(c)) {
				            a = c;
				            var s = p/4;
				        } else {
				            var s = p/(2*Math.PI) * Math.asin (c/a);
				        }
				        return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
				    },
				    elasticOut: function(t, b, c, d, a, p){    //正弦增强曲线（弹动渐出）
				        if (t === 0) {
				            return b;
				        }
				        if ( (t /= d) == 1 ) {
				            return b+c;
				        }
				        if (!p) {
				            p=d*0.3;
				        }
				        if (!a || a < Math.abs(c)) {
				            a = c;
				            var s = p / 4;
				        } else {
				            var s = p/(2*Math.PI) * Math.asin (c/a);
				        }
				        return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
				    },
				    elasticBoth: function(t, b, c, d, a, p){
				        if (t === 0) {
				            return b;
				        }
				        if ( (t /= d/2) == 2 ) {
				            return b+c;
				        }
				        if (!p) {
				            p = d*(0.3*1.5);
				        }
				        if ( !a || a < Math.abs(c) ) {
				            a = c;
				            var s = p/4;
				        }
				        else {
				            var s = p/(2*Math.PI) * Math.asin (c/a);
				        }
				        if (t < 1) {
				            return - 0.5*(a*Math.pow(2,10*(t-=1)) *
				                Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
				        }
				        return a*Math.pow(2,-10*(t-=1)) *
				            Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
				    },
				    backIn: function(t, b, c, d, s){     //回退加速（回退渐入）
				        if (typeof s == 'undefined') {
				            s = 1.70158;
				        }
				        return c*(t/=d)*t*((s+1)*t - s) + b;
				    },
				    backOut: function(t, b, c, d, s){
				        if (typeof s == 'undefined') {
				            s = 3.70158;
				        }
				        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
				    },
				    backBoth: function(t, b, c, d, s){
				        if (typeof s == 'undefined') {
				            s = 1.70158;
				        }
				        if ((t /= d/2 ) < 1) {
				            return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
				        }
				        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
				    },
				    bounceIn: function(t, b, c, d){    //弹球减振（弹球渐出）
				        return c - Tween['bounceOut'](d-t, 0, c, d) + b;
				    },
				    bounceOut: function(t, b, c, d){
				        if ((t/=d) < (1/2.75)) {
				            return c*(7.5625*t*t) + b;
				        } else if (t < (2/2.75)) {
				            return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
				        } else if (t < (2.5/2.75)) {
				            return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
				        }
				        return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
				    },
				    bounceBoth: function(t, b, c, d){
				        if (t < d/2) {
				            return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
				        }
				        return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
				    }
				};
				
				/*
				 * 时间版运动框架-占据一个全局  animatedTimeMove 变量;
				 * animatedTimeMove函数本身返回一个json,拥有一个timer属性，可以用来清除定时器;  
				 * 如果animatedTimeMove变量名被占用，可以打开最下方的return animatedTimeMove;在外面用一个变量承接
						 * curELe  --  object-执行动画的对象
						 * jsonDate  --  json-执行对象要改变的属性及目标值
						 * tarTime  --  number-整个动画需要的时间
						 * type  --  string-运动曲线(可以不传,默认匀速运动)
						 * callBack  --  function-回调函数(可以不传)
				 */
			function animatedTimeMove(curELe,jsonDate,tarTime,type,callBack){
					//requestAnimationFrame兼容
					window.requestAnimationFrame = window.requestAnimationFrame || function(fn){ return setTimeout(fn,1000/60) };
					window.cancelAnimationFrame = window.cancelAnimationFrame || clearTimeout;
					
					var TimeT1 = {};//用来挂载定时器，以便在外面清除
					
					//判断传进来的参数是否合法
					if(typeof type === "function"){
						callBack = type;
						type = "linear";
					}else{
						type = type || "linear";
					}
					//获取样式属性
					var curElejson = curELe.currentStyle || getComputedStyle(curELe),
						stratJson = {},//初始值的集合
						toS = {};//总路程的集合
						//删除一些初始值和目标值一样的属性
						for(var key in jsonDate){
							stratJson[key] = parseFloat(curElejson[key]);//要变化的初始值
							toS[key] = jsonDate[key] - stratJson[key];//要变化的总路程
							if(!toS[key]){
								delete stratJson[key];
								delete toS[key];
							}
						}
					
					var sTime = new Date();//初始时间
					//动画执行
					(function move(){
	
						var time = new Date() - sTime;
							time > tarTime?time=tarTime:TimeT1.timer = requestAnimationFrame(move);//递归调用
					
							for(var key in stratJson){
								// t:当前时间     b:初始值     c:总路程    d:持续的总时间
								var result = Tween[type](time,stratJson[key],toS[key],tarTime);	
								//兼容不用带单位的属性值,并兼容IE876
								if(key === "opacity"){
									curELe.style[key] = result;
									curELe.style.filter = "alpha(opacity = " + result*100 + ")";
								}else{
									curELe.style[key] = result + "px";  //走过的距离 = 总路程*时间占比+初始值
								}
							}
							
							if (time=tarTime) {callBack && callBack.call(curELe);}
							
					})();//move结束
					
					return TimeT1;//返回timer = requestAnimationFrame(move);
					
				}//animationTime结束
				
			window.animatedTimeMove = animatedTimeMove; //让animatedTimeMove成为全局变量，
				//return animatedTimeMove;//如果animatedTimeMove变量被占用，可以在自定义属性外面加一个变量来执行：var aaa = (function(){})();   aaa(a,s,d);
				
		})();
		
		//数据绑定
		(function bindDate(){
			var str = "",oUl = "",oA = "";
			for(var key in banImgJson){
				
				key == 0?str += "<li style='display:block;'><a href='javascript:;'><img src='"+banImgJson[key].src+"'></a></li>":str += "<li><a href='javascript:;'><img src='"+banImgJson[key].src+"'></a></li>";
				key == 0?oA += "<a href='javascript:;' class='active'></a>":oA += "<a href='javascript:;'></a>";
					
			}
			oUl = "<ul class='banList'>"+str+"</ul>";
			//将遍历好字符串放入盒子中
			oBanner.innerHTML = oUl;
			oDot.innerHTML = oA;
			//清空一些无用的值
			oUl = null;str = null;oA = null;
			//给一些变量赋值
			dliList = utils.getClass("banList")[0].children;//获取所有的图片li
			daList = utils.getClass("dot")[0].children;//获取所有的dot
			length = dliList.length;//获取length
		})();
	
		//轮播图焦点
		for (var i=0; i<length; i++) {

			daList[i].index = i;
			daList[i].onmouseenter = function(){
				//如果点击的元素就是本身，那么就不做任何执行
				if(oldindex === this.index){
					return;//return代表函数结束，后面的内容不会执行
				}
				
				clearTimeout(timmer);//上来就清除定时器
				var x = this.index;//因为下面的函数产生了闭包，this指向不明，所以用变量x代指当前的序列号
				timmer = setTimeout(function(){//150毫秒后执行move这个函数
					move(function(){//move执行，传入一个函数
						oldindex = x;//更新序列号
					});
				},150);

			}
		};
		
		//轮播图左右按钮点击
		for (i=0; i<oBtn.length; i++) {
			
			(function(i){//i形参
				//闭包
				oBtn[i].onclick = function(){//当我点击左右按钮的时候，触发move函数，并传了一个参数，接收他的形参就是cha（）
					if(new Date() - clickTime >= 500){//限制点击过快，导致轮播图更好过快
						clickTime = new Date();
						move(function(){
							if(i){//这里的i<2; 所以在 0和1之间        1是true(右点击)
								oldindex++;//点击下一张，
								oldindex %= length;
							}else{ //0是false(左点击)
								oldindex--;
								if(oldindex<0){oldindex=length-1;};
							}
						});
					}
				}
			})(i);//i实参，代表的就是for里面的i
		};
		
		//鼠标进入停止轮播
		oWrap.onmouseenter = function(){
			clearInterval(timmer2);
		}
		
		oWrap.onmouseleave = function(){
			auto();
		}
		
		//自动轮播
		function auto(){
			timmer2 = setInterval(function(){
				move(function(){
					oldindex++;
					oldindex %= length;
				})
			},5000)
		}
		
		auto();
		
		//轮播图move动画效果-不管是焦点，还是左右按钮，都会触发这个函数，都改变序列号
		function move(cha){//这里的cha是形参，代表的是上面的move，传进来的function

			//影藏上一个
			dliList[oldindex].stop && cancelAnimationFrame(dliList[oldindex].stop.timer);
			dliList[oldindex].stop = animatedTimeMove(dliList[oldindex],{opacity:0},400,"linear",function(){
				this.style.display = "none";
			});
			utils.removeClass(daList[oldindex],"active");//删除上一个焦点class名
			
			//更改当前序号
			//x = this.index;//因为闭包，所以当前的序号出现问题，所以在外面获取了当前的序号，用_this存起来
			cha();//这个
			
			//显示下一个
			dliList[oldindex].style.opacity = 0;
			dliList[oldindex].style.filter = "alpha(opacity=0)";
			dliList[oldindex].style.display = "block";
			dliList[oldindex].stop && cancelAnimationFrame(dliList[oldindex].stop.timer);
			dliList[oldindex].stop = animatedTimeMove(dliList[oldindex],{opacity:1},500,"easeIn");
			utils.addClass(daList[oldindex],"active");//显示当前一个焦点class名
		};
		
		
	})();
