 	
 	var utils = (function(){
 		
		var flag = "getComputedStyle" in window;//false为IE浏览器 true为非IE浏览器
		
	//类数组转数组-1
		
 		function toArry(likeArry){
 			
 			try{
 				return [].slice.call(likeArry);
 			}catch(e){			
 				throw new Error("抱歉，你的浏览器异常，请稍后再试！");
		 		console.log(sorry);
 				var ary = [];
 				for (var i = 0; i < likeArry.length; i++) {					
 					ary.push(parseFloat(likeArry[i]));
 				}
 				return ary;
 			}
 		}
 		
 		
 	//类数组转数组-2
 	/*
 		function toArry(likeArry){
 			
 			if (flag) {//非IE下
 				return [].slice().call(likeArry,0);
 			}else{//IE下
 				var ary=[];
 				for(var i=0,len=likeArry.length; i<len; i++){
 					ary.push(likeArry[i]);
 				}
 				return ary;
 			}
 			
 		};
 	*/
 		
 	//数组取最大值,最小值-假设法
 		function maxNum(Array){
 			var big = Array[0];			
 			var small = Array[0];			
 			for (var i=1; i<Array.length; i++) {				
				if(Array[i] > big){					
 					big = Array[i];				
 				}else if(Array[i] < big){			
 					small = Array[i]; 					
 				}				
 			}
 			
 			return {
 				"max":big,
 				"min":small
 			}
 			
 		};
 		
 		
 	//数组取最大值,最小值-eval法	
		function maxNume(Array){		
			var max = eval("Math.max(" + Array.toString() + ");");		
			var min = eval("Math.min(" + Array.toString() + ");");
			
		/*	
		 	使用join方法
			var max = eval("Math.max(" + Array.join(",") + ");");		
			var min = eval("Math.min(" + Array.join(",") + ");");
		*/
			
			return {
				"max":max,
				"min":min
			}
			
		};
		
		
	//求当前元素外边框到body的距离
		function offset(curEle){
			
			var par = curEle.offsetParent,
				disLfet = curEle.offsetLeft,//左偏移量
				disTop = curEle.offsetTop;//上偏移量
			
			while(par !== document.body){
				//在IE8下，clientLeft/Top包含在offsetLeft/Top当中，所以就不需要加上他们
				if (navigator.userAgent.indexOf("MSIE 8") === -1) {
					disLfet += par.clientLeft;
					disTop += par.clientTop;
				}
				
				disLfet += par.offsetLeft;
				disTop += par.offsetTop;
				par = par.offsetParent;
			}
			return{
				left:disLfet,
				top:disTop
			}
			
		};
		
		
	//win 操作浏览器盒子模型中属性的属性值
		function win(attr,value){
			//attr是要获取属性名    value是添加（原来没有的话就是添加）或修改（原来有的话就是修改）属性值
			if(attr && (typeof value === "undefined")){
				return document.documentElement[attr] || document.body[attr];
			}else if(attr && value){
				document.documentElement[attr] = value;
				document.body[attr] = value;
			}
			
		};
	
	
	//获取元素的样式值
		function getCss(curEle,attr){
			//curEle是当前元素    attr是当前元素的某个属性，比如curEle{attr:10px;}
			var val = null,
				reg = null;
			
			if(flag){//非IE下
				val = window.getComputedStyle(curEle)[attr];
			}else{//IE下
				if(attr === "opacity"){
					val = curEle.currentStyle.filter;
					reg = /^alpha\(opacity=(\d+)\)$/;
					val = reg.exec(val)?reg.exec(val)[1]/100:1;
				}else{
					val = curEle.currentStyle[attr];
				}
			}
			
			reg = /^\d+(\.\d+)?(px|pt|em|rem)$/;
			return val = reg.exec(val)?parseFloat(val):val;
			
		};
	
	//获取指定元素的元素子节点(childer) 以及某一个指定的元素
		function getChildren(curEle,TagName){
			//curEle 当前元素          TagName 当前元素下的某个子元素 (比如："p" "span"),以字符串的形式
			var ary = [];
			if (flag) {//非IE下
				ary =  this.toArry(curEle.children);
			}else{//IE下
				var curNodes = curEle.childNodes;
				for(var i=0; i<curNodes.length; i++){
					curNodes[i].nodeType === 1?ary.push(curNodes[i]):null;
				}
				curNodes = null;
			}
			
			//获取某一个指定的子元素
			if(typeof TagName === "string"){
				for(var j=0; i<ary.length; i++){
					if(ary[j].nodeName.toUpperCase() !== TagName.toUpperCase()){
						ary.splice(ary[j],1);
						j--;
					}
				}
			}
			
			return ary;
			
		};
		
		
	//获取上一个 哥哥 元素节点
		function getbrochi(curEle){
			
			if(flag){//非IE下
				return curEle.previousElementSibling;
			}else{//IE下
				var preSib = curEle.previousSibling;
				while(preSib && preSib.nodeType !== 1){
					preSib = preSib.previousSibling;
				}
				return preSib;
			}
			
		}
	
	
	//获取下一个 弟弟 元素节点
		function getNextchi(curEle){
			
			if(flag){//非IE下
				return curEle.nextElementSibling;
			}else{//IE下
				var nxetSib = curEle.nextSibling;
				while(nxetSib && nxetSib.nodeType !== 1){
					nxetSib = nxetSib.nextSibling;
				}
				return nxetSib;
			}
			
		}
	
	
	//获取所有 哥哥 元素节点
		function getbrochiAll(curEle){
			
			var curPre = this.getbrochi(curEle);//调用上面获取哥哥元素的方法
			var ary = [];
			while(curPre){
				ary.unshift(curPre);
				curPre = this.getbrochi(curEle);
			}
			
			return ary;
		
		}
	
	
	//获取所有  弟弟  元素节点
		function getnextchiAll(curEle){
			
			var curNext = this.getNextchi(curEle);//调用上面获取哥哥元素的方法
			var ary = [];
			while(curNext){
				ary.push(curNext);
				curNext = this.getNextchi(curEle);
			}
			
			return ary;
		
		}
	
	
	//获取   相邻的两个兄弟     元素节点（哥哥-curEle-弟弟） sibiling
		function sibiling(curEle){
			
			var pre = this.getbrochi(curEle),
				next = this.getNextchi(curEle);
			var ary = [];
			pre?ary.push(pre):null;
			next?ary.push(next):null;
			
			return ary;
			
		}
		
		
	//获取   所有的兄弟    元素节点（所有的哥哥和所有的弟弟）
		function allSiblings(curEle){
			
			var allSib = this.getbrochiAll(curEle).concat(this.getnextchiAll(curEle));
			
			return allSib;
			
		}
		
		
	//获取元素的索引  index
		function atIndex(curEle){
			
			return this.getbrochiAll(curEle).length;//他有多少个哥哥，那么他的索引值就是几，比如有4个哥哥，他的索引值就是4
		}
		
		
	//获取当前元素的第一个   '元素子节点'  fristChild
		function fristChild(curEle){
			
			return this.getChildren(curEle).length > 0?this.getChildren(curEle)[0]:null;
			
		}
	
	
	//获取当前元素的最后一个   '元素子节点'  lastChild
		function lastChild(curEle){
			
			return this.getChildren(curEle).length > 0?this.getChildren(curEle)[this.getChildren(curEle).length-1]:null;
			
		}
		
	
	//将一个元素放到指定元素的后面  insertAfter 
		function insertAfter(newEle,oldEle){
			//newEle 一个元素     oldELe 指定的元素
			var oldNext = this.getnextchiAll(oldEle);//获取当前元素的弟弟元素
			if(oldNext){
				oldEle.parentNode.insertBefore(newEle,oldEle);
			}else{
				oldEle.parentNode.appendChild(newEle);
			}
			
		}
		
	
	//验证当前元素是否有指定的className类名
		function hasClass(cueEle,clasName){
			
			var reg = new RegExp("(^| +)"+clasName+"( +|$)");
			
			return reg.test(curEle.clasName);
			
		}
		
	
	//JSON parse兼容IE678 json字符串转json数组
		function toJson(str){
			
			try{
				return JSON.parse(str);
			}catch(e){
				return eval("(" + str + ")");
			}
			
		}
		
	//获取className(); 解决IE678不兼容的问题
		function getClass(curEle){
			if(flag){
				return document.getElementsByClassName(curEle);
			}else{ //IE678下
				var allEle = document.getElementsByTagName("*"),
					curArr = [];
				for(var i=0; i<allEle.length; i++){
					var className = allEle[i].className,
						arrName = className.split(/\s+/);
					for (var j=0; j<arrName.length; j++) {
						if(arrName[j] === curEle){
							curArr.push(allEle[i]);
						}
					}
				}
				return curArr;//返回的是一个类数组
			}
		}
		
	//addClassName(); 给当前元素添加类名，如果存在相同的类名就不添加了
		function addClass(curEle,clasName){ //curEle是当前元素 ，  className 是需要添加的类名
			var curArr = curEle.className.split(/\s+/),
				arrName = clasName.split(/\s+/),
				allName = curArr.concat(arrName);
			for (var i=0; i<allName.length; i++) {
				for (var j=i+1; j<allName.length; j++) {
					if(allName[i] == allName[j]){
						allName.splice(j,1);
						j--;
					}
				}
			}
			curEle.className = allName.join(" ");
		}
	
	//removeClass(); 删除当前元素的某个class名
		function removeClass(curEle,className){ //curEle是当前元素 ，  className 是需要删除的类名
			 var curArr = curEle.className.split(/\s+/),
			 	 arrName = className.split(/\s+/);
			 for(var i=0; i<arrName.length; i++) {
			 	for (var j=0; j<curArr.length; j++) {
			 		if(arrName[i] == curArr[j]){
			 			curArr.splice(j,1);
			 		}
			 	}
			 }
			 curEle.className = curArr.join(" ");
		}
	
	//addEventListener给某个元素绑定事件
		function addEventList(curEle,eName,eFn){
			if(document.addEventListener){
				curEle.addEventListener(eName,eFn,false);
			}else{
				curEle.attachEvent("on" + eName,eFn);
			}
		}
	
	//clearEventList清除绑定事件
		function clearEventList(curEle,eName,eFn){
			if(document.addEventListener){
				curEle.removeEventListener(eName, eFn, false);
			}else{
				curEle.detachEvent("on"+eName, eFn);
			}
		}
	
	//onmousewHeel鼠标滚轮事件-该函数无法调用，要放到当前需要的页面
        function mousewheel(obj , Fn) {
            function eFn(e) {
                e = e||window.event;
                if ( Fn.call(this,e,e.wheelDelta/120||-e.detail/3) === false )
                    e.preventDefault();
            }
            var eName = document.onmousewheel===null?"mousewheel":"DOMMouseScroll";
            document.addEventListener?obj.addEventListener(eName,eFn,false):obj.attachEvent("onmousewheel",eFn);
        }
	
	
 		return{
 			
 			//最后一个不要写逗号 
 			toArry:toArry,
 			
 			maxNum:maxNum,
 			
 			maxNume:maxNume,
 			
 			offset:offset,
 			
 			win:win,
 			
 			getCss:getCss,
 			
 			getChildren:getChildren,
 			
 			getbrochi:getbrochi,
 			
 			getNextchi:getNextchi,
 			
 			getbrochiAll:getbrochiAll,
 			
 			getnextchiAll:getnextchiAll,
 			
 			sibiling:sibiling,
 			
 			allSiblings:allSiblings,
 			
 			atIndex:atIndex,
 			
 			fristChild:fristChild,
 			
 			lastChild:lastChild,
 			
 			insertAfter:insertAfter,
 			
 			hasClass:hasClass,
 			
 			toJson:toJson,
 			
 			getClass:getClass,
 			
   			addClass:addClass,
   			
   			removeClass:removeClass,
   			
   			addEventList:addEventList,
   			
   			clearEventList:clearEventList,
   			
   			mousewheel:mousewheel
 			
 		}
 		
	})();
