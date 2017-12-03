	
	/*
	 * 作者：yuechuanqiang@vip.qq.com
     * 时间：2017-09-08
     * 描述：plane game
	 */
	
	//灰机大战
	(function(){
		//获取元素
		var oBox = document.getElementById("wrap").children[0];
		
		//初始界面
		initl();
		function initl(){
			oBox.innerHTML = ""//先清空再添加
			oBox.style.backgroundPositionY = 100+"%";//复原背景图片
			//动态添加元素
			var oH1 = document.createElement("h1"),
				oP,
				oText = ["简单难度","中等难度","困难难度","变态附体"];
				
			oH1.innerHTML = "灰机大战v1.0";
			oBox.appendChild(oH1);
			
			for(var i=0,length = oText.length; i<length; i++){
				oP = document.createElement("p");
				oP.className = i===3?"diffc bt":"diffc";
				oP.innerHTML = oText[i];
				oP.i = i;
				//选项点击
				oP.onclick = function(e){
					strat(this.i,e);
				}
				oBox.appendChild(oP);
			}
			
		}
		
		//游戏开始
		function strat(index,e){
			oBox.innerHTML = "";//清空oP的内容-注意定时器
		
			//myPlane(e,index);//我方生成战机和子弹
			
			enemyPlane(index,myPlane(e,index));//敌军战机生成,同时也生成我军灰机，函数执行，会先执行口号中的
			
			//背景滚动
			bgMove();
			
			//添加计数器
			score();
		}
		
		function score(){
			oBox.score = 0;//自定义属性-先清空再添加
			var oSpan = document.createElement("span");
				oSpan.className = "score";
			oSpan.innerHTML = oBox.score;
			oBox.appendChild(oSpan);
		}
		
		//生成我方灰机-子弹
		function myPlane(e,index){
			e = e || window.event;
			//创建灰机
			var oPlane = new Image();
				oPlane.src = "images/plane.png";
				oPlane.width = 60;
				oPlane.height = 36;
				oPlane.className = "myPlane";
			
			//box位置
			var boxOffset = curgetOffset(oBox),
				offLeft = boxOffset.left;
				offTop = boxOffset.top;
				
			//初始出现-设置位置
			var pageY = e.pageY||document.documentElement.scrollTop||document.body.scrollTop + e.clientY;
				pageX = e.pageX||document.documentElement.scrollLeft||document.body.scrollLeft + e.clientX;
			oPlane.style.left = pageX -  offLeft - oPlane.width/2 + "px";
			oPlane.style.top = pageY -  offTop - oPlane.height/2 + "px";
			oBox.appendChild(oPlane);
			
			//判断边界
			var minLeft,maxLeft,minTop,maxTop;
				minLeft = -oPlane.width/2;
				maxLeft = oBox.offsetWidth - oPlane.width/2;
				minTop = 0;
				maxTop = oBox.offsetHeight - oPlane.height;
			
			//跟随鼠标移动
			document.onmousemove = function(e){
				e = e || window.event;
				var pageY = e.pageY||document.documentElement.scrollTop||document.body.scrollTop + e.clientY;
					pageX = e.pageX||document.documentElement.scrollLeft||document.body.scrollLeft + e.clientX;
				var left = e.pageX - offLeft - oPlane.width/2,
					top = e.pageY - offTop - oPlane.height/2;
				
				//用最大值限制最小值，最小值限制最大值
				left = Math.max(left,minLeft);
				left = Math.min(left,maxLeft);
				top = Math.max(top,minTop);
				top = Math.min(top,maxTop);
				
				oPlane.style.left = left + "px";
				oPlane.style.top = top + "px";
				
			};
			
			//生成我方子弹
			var createTime = [250,210,170,13];//我方子弹发射速度
			//将定时器挂在每一个子弹上
			oPlane.createTime = setInterval(function(){
				//兼容IE  requestAnimationFrame-API
				window.requestAnimationFrame = window.requestAnimationFrame || function(fn){return setTimeout(fn,1000/60);};
				window.cancelAnimationFrame = window.cancelAnimationFrame || clearTimeout; 
				
				//生成子弹
				var bullet = new Image();
					bullet.src = "images/bullet.png";
					bullet.width = 6;
					bullet.height = 22;
					bullet.className = "bullet";
					oBox.appendChild(bullet);
				//子弹位置
					bullet.style.left = oPlane.offsetLeft + oPlane.width/2 - bullet.width/2 + "px";
					bullet.style.top = oPlane.offsetTop - bullet.height + 17 + "px";
				
				//发射-消失
					function biu(){
						bullet.style.top = bullet.offsetTop - 10 + "px";
						//判断超出消失
						if(bullet.offsetTop <= -bullet.height/2){
							oBox.removeChild(bullet);
						}else{
							bullet.parentNode && (bullet.timmer = requestAnimationFrame(biu));
						}
					}
					bullet.timmer = requestAnimationFrame(biu);
					
			},createTime[index]);
			
			return oPlane;//return 出我方灰机
			
		}
		
		//生成敌机-动画
		function enemyPlane(index,oPlane){//这里的oPlane是承接上面return的我方灰机
			
			/*1:位置随机 2：下落速度随机 3：生成速度随机*/
			var cerTime = [500,300,200,80],//生成的间隔
				oBwidth = oBox.offsetWidth,
				oBheight = oBox.offsetHeight;
			//将定时器挂在每一个敌机上
			oBox.timmer2 = setInterval(function(){
				var enePlane = new Image();
				
					enePlane.src = "images/enemy.png";
					enePlane.width = 23;
					enePlane.height = 30;
					enePlane.className = "enePlane";
					//随机位置
					enePlane.style.top = -enePlane.height + "px";
					enePlane.style.left = Math.random()*oBwidth - enePlane.width/2 + "px";
					oBox.appendChild(enePlane);
					//随机速度、战机下落速度
					enePlane.ranSteep = Math.random()*6+3;
				
					//降落动画+碰撞
					function down(){
						enePlane.style.top = enePlane.offsetTop + enePlane.ranSteep +"px"; 
						if (enePlane.offsetTop >= oBheight) {
							oBox.removeChild(enePlane);
						} else{
							//检测碰撞
							var allbullet = utils.getClass("bullet");
//							var allbullet = document.getElementsByClassName("bullet");
							for (var i=0,length=allbullet.length; i<length; i++) {
								if(collide(enePlane,allbullet[i])){//撞上了
									cancelAnimationFrame(allbullet[i].timmer);//清空爆炸的子弹的定时器
									oBox.removeChild(allbullet[i]);//删除爆炸的子弹
									
									//清除以后，出现爆炸的图片
									cerBommImg(enePlane,"")
									
									oBox.removeChild(enePlane);//删除爆炸的敌机
									
									//积分器
									utils.getClass("score")[0].innerHTML = ++oBox.score;
									
									return;
								}
							}
							//检测我方碰撞敌机
							if( oPlane.parentNode && collide(enePlane,oPlane)){
								//1.被碰撞的敌机，以及自己的爆炸图片  2,停止生成敌军 -停止生成子弹
								
								//停止生成敌军-停止生成子弹
								clearInterval(oBox.timmer2);
								clearInterval(oPlane.createTime);
								
								//被碰撞的敌机，以及自己的爆炸图片
								cerBommImg(enePlane,"");
								cerBommImg(oPlane,"2");
								
								oBox.removeChild(oPlane);//删除我军的灰机
								oBox.removeChild(enePlane);//删除敌军的灰机
								
								document.onmousemove = null;//清除onmousemove
								
								return;
							}
							enePlane.parentNode && requestAnimationFrame(down);
						}
					}
					requestAnimationFrame(down);
			},cerTime[index]);
			
		}
		
		//生成爆炸boom图片
		function cerBommImg(curEle,i){
			//清除以后，出现爆炸的图片
			var boomImg = new Image();
				boomImg.src = "images/boom"+i+".png";
				boomImg.width = curEle.width;
				boomImg.height = curEle.height;
				boomImg.className = "PlaneBoom";
				boomImg.style.left = curEle.offsetLeft + "px";
				boomImg.style.top = curEle.offsetTop + "px";
				oBox.appendChild(boomImg);
				setTimeout(function(){
					boomImg.parentNode && oBox.removeChild(boomImg);
					i && over();//over界面
				},i?1000:500)
		}
		
		//over结束后
		function over(){
			oBox.innerHTML = "";
			clearInterval(oBox.timmer3);//停止背景移动
			//创建结束后的界面
			var over = document.createElement("div");
			
				over.className = "overBg";
				
				over.innerHTML = "<h1 class='title'>"+"Game over"+"</h1>"+"<p class='totalScroe'>"+"您的总得分为："+"</p>"+"<p class='totalScroe'>"+"<span class='sCore'>"+oBox.score+"</span>"+"分</p>";

				var reStrat = document.createElement("div");
					reStrat.className = "restrat";
					reStrat.innerHTML = "重新开始";
					
				over.appendChild(reStrat);

				oBox.appendChild(over);
				
				reStrat.onclick = initl;
		}
		
		//碰撞动画
		function collide(curEle1,curELe2){
			var Lobj1 = curEle1.offsetLeft,
				Robj1 = Lobj1+curEle1.offsetWidth,
				Tobj1 = curEle1.offsetTop,
				Bobj1 = Tobj1+curEle1.offsetHeight;
			
			var Lobj2 = curELe2.offsetLeft,
				Robj2 = Lobj2+curELe2.offsetWidth,
				Tobj2 = curELe2.offsetTop,
				Bobj2 = Tobj2+curELe2.offsetHeight;
			
			if(Robj1<Lobj2 || Bobj1<Tobj2 || Lobj1>Robj2 || Tobj1>Bobj2){
				return false;
			}else{//说明撞上了,撞上了我们让他返回true
				return true;
			}
			
		}
		
		//背景滚动
		function bgMove(){
			var speet = 100;
			oBox.timmer3 = setInterval(function(){
				speet -= 0.07;
				oBox.style.backgroundPositionY = speet+"%";
			},1000/60)
		}
		
		//获取元素到body的距离
		function curgetOffset(curEle){
			var json = {
				"left":null,
				"top":null
			};
			while (curEle !== document.body){
				json["left"] += curEle.offsetLeft;
				json["top"] += curEle.offsetTop;
				curEle = curEle.offsetParent;
			}
			return json;
		}
		
	})();