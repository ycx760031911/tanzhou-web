		$.fn.extend({
			funBanner : function (mjson){
				var type = mjson.type || "fade",//控制渐变
					picE = mjson.picE,
					dotE = mjson.dotE,
					btnE = mjson.btnE,
					time = mjson.time,
					tabType = mjson.tabType || "click",//控制焦点是否点击
					seamless = mjson.seamless || false;//控制是否有缝无缝，默认有缝，true为无缝
				
				var $liList =this.find(picE),
					$aList,
					$Btn,
					length = $liList.length,
					index = 0;
					
				var $picUl,oliWidth,tabTime,
					timmer1,
					timmer2,
					clickTime = 0;
					
				//初始化样式
				this[0].onselectstart = function(){return false;}
				if(type === "fade"){
					$liList.hide().eq(0).show();
				}else if (type === "LRslide") {
						$picUl = $liList.parent();
						oliWidth = $liList.width();
					if (seamless) {//无缝
						$picUl.prepend($liList.last().clone(true,true));
						$picUl.append($liList.first().clone(true,true));
						$picUl.width((length+10)*oliWidth).css("marginLeft",-oliWidth).parent().css("overflow","hidden");
						$liList = $picUl.children();
					} else{//有缝
						$picUl.width((length+10)*oliWidth).parent().css("overflow","hidden");
					}
					$liList.css({
						width : oliWidth,
						position : "static",
						float : "left"
					});
				}
				
				//关于tab
				if(dotE){
					$aList = this.find(dotE);
					tabTime = type === "click"?10:200;
					$aList.eq(0).addClass("active");
					$aList[tabType](function(){
						var x = $(this).index();
						if (x !== index ) {
							clearTimeout(timmer1);
							timmer1 = setTimeout(change,tabTime,x);
						}
					});
				}
				
				//关于btn
				if(btnE){
					$Btn = this.find(btnE);
					$Btn.click(function () {
			            if ( new Date() - clickTime > 510 ){
			                var x = index;
			                $(this).index() ? x ++ : x --;
			                change(x);
			                clickTime = new Date();
			            }
			        });
				}
				
				//关于自动轮播
				if(time){
					this.hover(function(){
						clearInterval(timmer2);
					},moveAuto());
					//自动轮播
					function moveAuto(){
						timmer2 = setInterval(function(){
							var x = index;
								x++;
								x %= length;
							change(x);
						},4000)
						return moveAuto;
					}
				}
				
				//change变化函数
				function change(i){
					var moveIndex = i+1;//针对有缝
					var iFfade = type==="fade";//true为渐变 false为无缝或有缝
					i %= length;//
					if(i<0)i=length-1;
					if ( !seamless )moveIndex = i;//只有有缝的时候才执行这个
					iFfade && $liList.eq(index).stop().fadeOut();//false为无缝或有缝就不执行这个
					$aList.eq(index).removeClass("active");
					index = i;
					if (iFfade) {
						$liList.eq(index).stop().fadeIn();
					} else{
						$picUl.stop().animate({
							marginLeft : -(moveIndex)*oliWidth
						},500,function(){
							if (seamless) {
								if(index === 0 || index === length-1){
									$(this).css("marginLeft",-(index+1)*oliWidth);
								}
							}
						});
					}
					$aList.eq(index).addClass("active");
				}
				
			}
		});