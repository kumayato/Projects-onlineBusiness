/**
 * Created by Administrator on 2017/2/12 0012.
 */

/*遍历小图标*/
function icon() {
    var lifeServiceCon = document.getElementById("lifeServiceCon");
    var icons = lifeServiceCon.getElementsByTagName("i");
    for (var i=0; i<icons.length; i++)
    {
        icons[i].style.backgroundPosition = "0 "+(-25*i)+"px";
        if (i==11){
            icons[i].style.backgroundPosition = "0 "+(-25*i+3)+"px";
        }
    }
    /*送*/
    var s = document.createElement("s");
    s.setAttribute("class","song-icon");
    var song = document.getElementById("song");
    song.insertBefore(s,null);
};
icon();


/*轮播图*/
function slideImg() {
    var sliderBox = document.getElementById("sliderBox")// 获取大盒子
    var dotBox = document.querySelector(".circle").getElementsByTagName("ol")[0]; // 获取圆点盒子
    var imgs = document.querySelectorAll(".sliderImg") // 获取图片

    // 自动生成小圆点
    for(var i=0; i<imgs.length; i++) {
        var li = document.createElement("li");
        dotBox.insertBefore(li,dotBox.children[0]);
        li.innerHTML = imgs.length - i;
        li.setAttribute('class',"slider-dot")
    }
    var lis = dotBox.children;
    lis[0].setAttribute('class','slider-dot current');

    // 除了第一张，其余的都偏移到右边去
    var distance = sliderBox.clientWidth;
    for(var i=1; i<imgs.length; i++) {
        imgs[i].style.left = distance + 'px';
    };

    // 遍历获取点击事件源
    var iNow = 0; // 控制播放图片
    for ( var k in lis ){
        lis[k].onclick = function () {
            if (this.className == "arrow arrow-prev"){
                // 当前图片慢慢走到盒子右边
                // 上一张图片快速走到盒子左边待命
                // 上一张图片慢慢走进盒子里面
                animate(imgs[iNow], {left: distance});
                --iNow < 0? iNow = imgs.length-1: iNow;
                imgs[iNow].style.left = -distance + 'px';
                animate(imgs[iNow],{left : 0});
                setDotClass();
            }
            else if (this.className == 'arrow arrow-next'){
                autoplay();
            } else {
                // 点击底部小圆点事件
                // 第一步 得到小圆点的索引号, -1之后字符串变数值型
                var self = this.innerHTML - 1

                // 第二步 判断点击的小圆点在当前的左侧还是右侧
                // 如果self > iNow 说明我们点击的小圆点实在当前小圆点的右侧，等同于点击了右侧按钮
                // 当前的图片慢慢走到盒子左侧，点击的那一个快速走到盒子右侧然后慢慢走进盒子
                // animate(imgs[iNow],{left : 0}); 提到最下面
                if (self > iNow) {
                    animate(imgs[iNow], {left: -distance});
                    imgs[self].style.left = distance + "px";
                }
                // 如果self < iNow 说明我们点击的小圆点实在当前小圆点的左侧，等同于点击了左侧按钮
                // 当前的图片慢慢走到盒子右侧，点击的那一个快速走到盒子左侧然后慢慢走进盒子
                // animate(imgs[iNow],{left : 0}); 提到最下面
                else if (self < iNow) {
                    animate(imgs[iNow], {left: distance});
                    imgs[self].style.left = -distance + 'px';
                }

                // 我点击的小圆点的索引号即是当前的索引号
                // 当前的要慢慢走进盒子里面
                iNow = self;
                animate(imgs[iNow],{left : 0});
                setDotClass()
            };
        };
    };


    // 自动播放
    var timer = null;
    timer = setInterval(autoplay,2000);
    function autoplay() {
        // 当前图片慢慢走到盒子左边
        // 下一张图片快速走到盒子右边待命
        // 下一张图片慢慢走进盒子里面
        animate(imgs[iNow], {left: -distance});
        ++iNow > imgs.length - 1 ? iNow = 0 : iNow;
        imgs[iNow].style.left = distance + "px";
        animate(imgs[iNow], {left: 0});
        setDotClass();
    }

    sliderBox.onmouseover = function () {
        clearInterval(timer)
    };
    sliderBox.onmouseout = function () {
        // 要执行定时器，先清除定时器再开启定时器
        clearInterval(timer);
        timer = setInterval(autoplay,2000);
    }

    // 控制小圆点的样式
    function setDotClass() {
        for (var i=0; i<lis.length-2; i++){
            lis[i].className = "slider-dot";
        }
        lis[iNow].className = "slider-dot current";
    };
};
slideImg();

// tab栏显示隐藏
function tab() {
    var dorpmenuContentBox = document.querySelector(".dorpmenu-content");
    var innerbox = document.querySelectorAll(".innerBox");
    var dorpmenuOptions = document.getElementById('dorpmenu').children;

    for (var i=0; i<dorpmenuOptions.length; i++) {
        dorpmenuOptions[i].index = i;
        dorpmenuOptions[i].onmouseover = function () {
            dorpmenuContentBox.style.display = "block";
            for (var j=0; j<dorpmenuOptions.length; j++){
                innerbox[j].className = "innerBox";
            }
            innerbox[this.index].className="innerBox current";
        }

        dorpmenuOptions[i].onmouseout = function () {
            dorpmenuContentBox.style.display = "none";
        }
    }

    dorpmenuContentBox.onmouseover = function () {
        dorpmenuContentBox.style.display = "block";
    }

    dorpmenuContentBox.onmouseout =  function () {
        dorpmenuContentBox.style.display = "none"
    }
}
tab();



