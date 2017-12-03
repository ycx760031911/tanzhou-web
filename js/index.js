
    window.onload = function () {

        (function () {
            var oAll = document.getElementById("all"),
                oUl = document.getElementById("list").children[0],
                oBack = document.getElementById("back"),
                aLi = oUl.children,
                num = 5*5*5;

            //初始化布局
            (function () {
                //生成li
                for(var i=0; i<num; i++){
                    var oLi = document.createElement("li");
                    oLi.x = i%5;
                    oLi.index = i;
                    oLi.y = Math.floor(i%25/5);
                    oLi.z = 4-Math.floor(i/25);
                    var aData = perData[i] || perData[perData.length-1];
                    oLi.innerHTML = "<b></b>" +
                        "<p class='title'>"+aData.type+
                        "</p><p class='name'>"+aData.name+
                        "</p><p class='time'>"+aData.time+"</p>";
                    //生成随机数
                    var tX = Math.random()*6000-3000,
                        tY = Math.random()*6000-3000,
                        tZ = Math.random()*6000-2500;
                    oLi.style.transform = "translate3D("+tX+"px,"+tY+"px,"+tZ+"px)";
                    oUl.appendChild(oLi);
                }
                setTimeout( Grid, 200);
            })();

            //弹窗事件
            (function () {

                var oAlert = document.getElementById("alert"),
                    oTitle = oAlert.getElementsByClassName("title")[0].children[0],
                    oImg = oAlert.getElementsByClassName("img")[0].children[0],
                    oAbout = oAlert.getElementsByClassName("about")[0].children[0],
                    oInfo = oAlert.getElementsByClassName("info")[0].children[0],
                    oIframe = document.getElementsByTagName("iframe")[0];
                //事件委托给ul
                oUl.onclick = function (e) {
                    var target = e.target;
                    if (/B/i.test(target.nodeName)){
                        if (target.flag){
                            target.flag = false;
                        }else{
                            if (oAlert.style.display === "block"){
                                hide();
                            }else{
                                var index = target.parentNode.index,
                                    bData = perData[index] || perData[perData.length-1];
                                oAlert.index = index;
                                oTitle.innerHTML = "标题："+bData.title;//弹窗标题
                                oImg.src = "src/"+bData.src+"/index.png";//弹窗
                                oAbout.innerHTML = bData.title;//小标题图
                                oInfo.innerHTML = bData.info;//简介
                                show();
                            }
                        }
                    }
                    e.cancelBubble = true;
                };
                //弹窗再点击的时候
                oAlert.onclick = function (e) {
                    e.cancelBubble = true;
                    var  bData = perData[this.index] || perData[0];
                    console.log(bData);
                    oIframe.src = "src/" + bData.src + "/index.html",//弹窗之后的地址
                    oAll.style.marginLeft = "-100%";

                };
                //document点击的时候关闭
                document.onclick = function (e) {
                    e.cancelBubble = true;
                    hide();
                };

                //show动画
                function show() {
                    if (!oAlert.timmer){
                        oAlert.timmer = true;
                        oAlert.style.display = "block";
                        oAlert.style.opacity = "0";
                        oAlert.style.transform = "rotateY(0deg) scale(2)";
                        var time = 400,
                            setTime = new Date();
                        function m() {
                            var prop = (new Date() - setTime) / time;
                            if (prop >= 1){
                                prop = 1;
                                oAlert.timmer = false;
                            }else{
                                timmer = requestAnimationFrame(m);
                            }
                            oAlert.style.transform = "rotateY(0deg) scale("+((1-2)*prop+2)+")";
                            oAlert.style.opacity = prop;
                        }
                        requestAnimationFrame(m);
                    }
                    return false;
                }

                //隐藏动画
                function hide() {
                    if ( oAlert.style.display === "block" && !oAlert.timmer){
                        oAlert.style.display = "block";
                        oAlert.style.transform = "rotateY(0deg) scale(1)";
                        oAlert.style.opacity = "0";
                        var time = 300,
                            setTime = new Date();
                        function c() {
                            var prop = (new Date() - setTime) / time;
                            if (prop >= 1){
                                prop = 1;
                                oAlert.timmer = false;
                                oAlert.style.display = "none";
                            }else{
                                requestAnimationFrame(c);
                            }
                            oAlert.style.transform = "rotateY("+180*prop+"deg) scale("+(1-prop)+")";
                            oAlert.style.opacity = 1-prop;
                        }
                        requestAnimationFrame(c);
                    }
                }

            })();
            
            //back
            (function () {
                oBack.onclick = function () {
                    oAll.style.marginLeft = "0%";
                }
            })();

            //按钮点击-切换效果
            (function () {
                var arr = [Table,Sphere,Helix,Grid],
                    btnLi = document.getElementById("btn").getElementsByTagName("li");
                for(var i=0,length = btnLi.length; i<length; i++){
                    (function (i) {
                        btnLi[i].onclick = arr[i];
                    })(i);
                }
            })();

            //拖拽+滚轮事件
            (function () {
                var roX = 0,
                    roY =0,
                    trZ = -2300,
                    timmer1 = null;
                //禁止选中
                document.onselectstart = function () {
                    return false;
                }
                document.ondragstart = function () {
                    return false;
                }
                //禁止拖拽事件
                document.ondrag = function () {
                    return false;
                }
                //鼠标按下
                document.onmousedown = function (e) {
                    //清除惯性动画
                    cancelAnimationFrame(timmer1);
                    var sX = e.clientX,
                        sY = e.clientY,
                        lastX = sX,
                        lastY = sY,
                        x_ = 0,
                        y_ = 0,
                        isMove = false,
                        lastTime = new Date(),
                        moveTime = 0;

                    //判断拖动点击
                    if (/B/i.test(e.target.nodeName)){
                        var thisLi = e.target;
                    }

                    //鼠标移动
                    this.onmousemove = function (e) {
                        isMove = true;

                        x_ = e.clientX - lastX;
                        y_ = e.clientY - lastY;

                        roX -=  y_ * 0.15;
                        roY +=  x_ * 0.15;

                        oUl.style.transform = "translateZ("+trZ+"px) rotateX("+roX+"deg) rotateY("+roY+"deg)";

                        lastX = e.clientX;
                        lastY = e.clientY;

                        moveTime = new Date();
                    };//onmousemove结束

                    //鼠标松开
                    this.onmouseup = function (e) {
                        //当我在误操作时候>500就不弹窗
                        if (isMove && (e.target === thisLi) && (new Date() - lastTime)>500){
                            thisLi.flag = true;
                        }
                        //清空鼠标移动
                        this.onmousemove = null;
                        //惯性动画
                        function move() {
                            x_ *= 0.9;
                            y_ *= 0.9;

                            roX -= y_*0.15;
                            roY += x_*0.15;
                            oUl.style.transform = "translateZ("+trZ+"px) rotateX("+roX+"deg) rotateY("+roY+"deg)";
                            if( Math.abs(x_) < 0.2 && Math.abs(y_) < 0.2){
                                return;
                            }
                            timmer1 = requestAnimationFrame(move);
                        }
                        if (new Date() - moveTime < 100){
                            timmer1 = requestAnimationFrame(move);
                        }
                    };//mouseup结束

                };//onmousedown结束

                //鼠标滚轮
                !function (fn) {
                    if (document.addEventListener === undefined){//火狐
                        document.addEventListener("DOMMouseScroll",function (e) {
                            var d = e.detail/3;
                            fn.call(this,d);
                        },false);
                    }else {//非火狐
                        document.onmousewheel = function (e) {
                            var d = e.wheelDelta/120;
                            fn.call(this,d);
                        };
                    }
                }(function (d) {
                    trZ += d*100;
                    oUl.style.transform = "translateZ("+trZ+"px) rotateX("+roX+"deg) rotateY("+roY+"deg)";
                });

            })();//拖拽+滚轮结束

            //元素周期表布局
            function Table() {
                if(Table.arr){
                    for (var i=0; i<num; i++){
                        aLi[i].style.transform = Table.arr[i];
                    }
                }else{
                    Table.arr = [];
                    var n = Math.ceil(num/18)+2,//有多少行
                        midX = 18/2 - 0.5,//x的中心点
                        midY = n/2 - 0.5,//y的中心点
                        disX = 230,//x间距
                        disY = 220;//y间距
                    var arr = [
                        {x : 0, y : 0},
                        {x : 17, y : 0},
                        {x : 0, y : 1},
                        {x : 1, y : 1},
                        {x : 12, y : 1},
                        {x : 13, y : 1},
                        {x : 14, y : 1},
                        {x : 15, y : 1},
                        {x : 16, y : 1},
                        {x : 17, y : 1},
                        {x : 0, y : 2},
                        {x : 1, y : 2},
                        {x : 12, y : 2},
                        {x : 13, y : 2},
                        {x : 14, y : 2},
                        {x : 15, y : 2},
                        {x : 16, y : 2},
                        {x : 17, y : 2}
                    ];

                    for (var i=0; i<num; i++){
                        var x,y;
                        if (i<18){
                            x = arr[i].x;
                            y = arr[i].y;
                        }else{
                            x = i%18;
                            y = Math.floor(i/18)+2;
                        }
                        var val =  "translate3D("+(x-midX)*disX+"px,"+(y-midY)*disY+"px,0px)";
                        Table.arr[i] = val;
                        aLi[i].style.transform = val;
                    }
                }
            };

            //球形布局
            function Sphere() {
                if(Sphere.arr){
                    for (var i=0; i<num; i++){
                        aLi[i].style.transform = Sphere.arr[i];
                    }
                }else{
                    Sphere.arr = [];
                    var arr = [1,3,7,9,11,14,21,16,12,10,9,7,4,1],
                        Xdeg = 180 / (arr.length-1);
                    for (var i =0; i<num; i++){
                        var sunAdd = 0,
                            numC = 0,
                            numG = 0;
                        for (var j=0,length = arr.length; j<length; j++){
                            sunAdd += arr[j];
                            if (sunAdd > i){
                                numC = j;
                                numG = arr[j]-(sunAdd-i);
                                break;
                            }
                        }
                        var Ydeg = 360 / arr[numC];
                       // aLi[i].innerHTML += "<br>第:"+numC+"层，第:"+numG +"个";
                        var val = "rotateY("+(numG+1.3)*Ydeg+"deg) rotateX("+(90-numC*Xdeg)+"deg)  translateZ(1150px)";
                        Sphere.arr[i] = val;
                        aLi[i].style.transform = val;
                    }
                }


            }

            //螺旋布局
            function Helix() {
                if(Helix.arr){
                    for (var i=0; i<num; i++){
                        aLi[i].style.transform = Helix.arr[i];
                    }
                }else{
                    Helix.arr = [];
                    var h = 3.7,
                        numFcen = Math.round(num/h),
                        deg = 360 / numFcen,
                        mid = num/2-0.5,
                        tY = 9;
                    for(var i=0; i<num; i++){
                        var val = "rotateY("+i*deg+"deg) translateY("+(i-mid)*tY+"px) translateZ(1100px)";
                        Helix.arr[i] = val;
                        aLi[i].style.transform = val;
                    }
                }

            }

            //分层布局Grid
            function Grid() {
                if(Grid.arr){
                    for (var i=0; i<num; i++){
                        aLi[i].style.transform = Grid.arr[i];
                    }
                }else{
                    Grid.arr = [];
                    var disX = 220,
                        disY = 230,
                        disZ = 1000;
                    for (var i=0; i<num; i++){
                        var xLi = aLi[i],
                            x = (xLi.x-2)*disX,
                            y = (xLi.y-2)*disY,
                            z = (xLi.z-2)*disZ;
                        var val = "translate3D("+x+"px,"+y+"px,"+z+"px)";
                        Grid.arr[i] = val;
                        xLi.style.transform = val;
                    }
                }

            }

        })();

    }