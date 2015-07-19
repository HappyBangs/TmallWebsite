$(document).ready(function(){
	$("img").lazyload({placeholder:'../../images/icon_wait.gif'});
	changePic("#banner-women-clothes-div");//大幻灯片默认展示
	$(document).scroll(function(){
		/*固定的搜索栏*/
		if($(window).scrollTop()>=716){//还可以指定滚动条滚动到哪里
			$("#J_AttachedSearchContainer form").show();
			$("#J_AttachedSearchContainer").slideDown("fast");
		}else{
			$("#J_AttachedSearchContainer form").hide();
			$("#J_AttachedSearchContainer").slideUp("fast");
		}
	});

	$(".drop-down-list").hover(function(){
		$(this).children(".toggle-div").toggle();
	});
	$(".menu-nav-container-ul li").mouseenter(function(){
		$(this).children(".prosmore").stop();
		$(this).children(".prosmore").fadeIn();
		$(this).addClass("bg-red");
		$(this).css("padding-left","55px");

		var li_id=$(this).attr("id");
		if(li_id){
			/*图片从大变小的动画效果*/
			var div_id="#"+li_id+"-div";
			changePic(div_id);
		}
	});
	$(".menu-nav-container-ul li").mouseleave(function(){
		$(this).children(".prosmore").stop();
		$(this).children(".prosmore").fadeOut();
		$(this).removeClass("bg-red");
		$(this).css("padding-left","50px");

	});
	$(".floor-show-third ul li").mouseenter(function(){
		$(this).children("img").clearQueue();
		$(this).children("img").animate({padding:'0px'},300);
	});
	$(".floor-show-third ul li").mouseleave(function(){
		$(this).children("img").clearQueue();
		$(this).children("img").animate({padding:'0px 0px 0px 4px'},300);
	});

	$(".brand-rec-nav li").hover(function(){
		$(this).toggleClass("selected");
	});
	/*小的滑动的幻灯片begin*/
	$(".arrow-left").click(function(){
		var p_length=100;//p元素的宽度
		var father_div=$(this).parent();//class 为floor-show-middle的div
		var slide_div=father_div.children(".brand-slide-content").children(".brand-slide-bg");//class为brand-slide-bg的div
		var pic_index=slide_div.attr("index");//当前图片的索引
		var p_quantities=slide_div.children("p").length;
		if (pic_index==1) {
			pic_index=p_quantities;
			var last_p=slide_div.children("p").last();
			slide_div.css("left","-100px");
			slide_div.children("p").first().before(last_p.clone());
			slide_div.animate({
					left:0
				},700,
				function(){
					//回调函数，删除添加的p
					slide_div.children("p").first().remove();//删除为了滑动而添加的元素
					var left=getLeft(p_length,pic_index);
					slide_div.css("left",left);
			});
		}else{
			pic_index--;
			var left=getLeft(p_length,pic_index);//相对于父容器向左移动的值
			slide_div.animate({
				left:left
			},700);
		}
		slide_div.attr("index",pic_index);
	});
	$(".arrow-right").click(function(){
		var slide_div=$(".brand-slide-bg");//滑动幻灯片的父div
		var index=slide_div.attr("index");//当前图片的索引，默认为1
		index++;
		
		//else if(index==0){index=3;}
		var position=index*(-100)+"px";
		//slide_div.css("transition","-webkit-transform 1s");
		slide_div.css("-webkit-transition-duration","0.5s");
		slide_div.css("-webkit-transform","translate3d("+position+",0,0)");
		// slide_div.stop();
		// slide_div.animate({
		// 	left:position
		// },400,function(){
		// 	slide_div.css("left",index*(-100)+"px");
		// 	console.info("回调");
		// });
		setTimeout(2000,function(){
			if(index==4){
			index=1;
			position=index*(-100)+"px";
			slide_div.css("-webkit-transition-duration","0s");
			slide_div.css("-webkit-transform","translate3d("+position+",0,0)");
			
			}
		});
		
		
		console.info("回调");
		slide_div.attr("index",index);
		/*var p_length=100;
		var father_div=$(this).parent();//class 为floor-show-middle的div
		var slide_div=father_div.children(".brand-slide-content").children(".brand-slide-bg");//class为brand-slide-bg的div
		if(slide_div.children("p[name='remove']").length>0){
			slide_div.children("p[name='remove']").remove();
		}
			
		var pic_index=slide_div.attr("index");//当前图片的索引
		var p_quantities=slide_div.children("p").length;
		if (pic_index==p_quantities) {
			pic_index=1;
			var first_p=slide_div.children("p").first();
			var clone_p=first_p;
			clone_p.attr("name","remove");
			slide_div.children("p").last().after(clone_p);
			//slide_div.children("p").last().attr("name","remove");
			var temp_left=getLeft(p_length,p_quantities+1);;
			//slide_div.clearQueue();
			slide_div.animate({
					left:temp_left
				},700,
				function(){
					//回调函数，删除添加的p
					slide_div.children("p").last().remove();//删除为了滑动而添加的元素
					var left=0;
					slide_div.css("left",left);
			});
		}else{
			pic_index++;
			var left=getLeft(100,pic_index);//相对于父容器向左移动的值
			slide_div.animate({
				left:left
			},700);
		}
		slide_div.attr("index",pic_index);*/
	});
	/*小的滑动的幻灯片end*/

	autoMove();
	
});
	/*自定义函数*/

function changePic(div_id){
/*切换首页大幻灯片*/
	$("div .banner-father").hide();
	var BC=$(div_id).children("div.banner-container");//只是图片部分
	var BCImg=BC.find("img");
	var BCEm=BC.find("em");
	if (BCImg.length==0) {//容错
		console.warn(div_id+" .banner-container.img not exsits");
		return;
	};
	/*展示前样式准备*/
	var father_bgColor = $(div_id).attr("bgColor");
	$("#fp-category-menu").css("background-color",father_bgColor);
	//BCImg.css("display","none");
	BCImg.css("width","840px");/*为了有缩小效果，设置为超宽超长的值*/
	BCImg.css("height","510px");

	/*展示div*/
	$(div_id).show();//small-banner先展示
	/*图片从打变小*/
	BCImg.stop();//jquery的动画容易造成排列现象，导致图片切换不流畅或者出bug，记得清除队列.stop和animate的区别。animate还是会执行回调函数，stop连回调函数都不执行了
	BCImg.animate({
		width:'810px',//这里如果换成-=30px,那么我乱晃的时候就会有bug，why
		height:'480px'
	},2500,function(){console.info(div_id)});
	/*右边小图片进入*/
	if(BCEm.length>0){
		BCEm.stop();
		BCEm.hide();
		BCEm.fadeIn(800);
	}
}
function getLeft(p_width,index){
	/*楼层幻灯片，根据p元素的索引1-3确定左边和父元素的距离*/
	return (index-1) * p_width *(-1)+"px";
}
function autoMove(){
	var slide_div=$(".brand-slide-bg");//滑动幻灯片的父div
	var index=slide_div.attr("index");//当前图片的索引，默认为1
	index++;
	var right_position=index*(-100)+"px";
	slide_div.animate({
		right:right_position
	},700);
	autoTask=setTimeout("autoMove()",2000);
	/*var p_length=100;//p元素的宽度
	var slide_div=$(".brand-slide-bg");//class为brand-slide-bg的div
	var pic_index=slide_div.attr("index");//当前图片的索引
	var p_quantities=slide_div.children("p").length;
	slide_div.clearQueue();
	if (pic_index==1) {
		pic_index=p_quantities;
		var last_p=slide_div.children("p").last();
		slide_div.css("left","-100px");
		slide_div.children("p").first().before(last_p.clone());

		slide_div.animate({
				left:0
			},700,
			function(){
				//回调函数，删除添加的p
				slide_div.children("p").first().remove();//删除为了滑动而添加的元素
				var left=getLeft(p_length,pic_index);
				slide_div.css("left",left);
		});
	}else{
		pic_index--;
		var left=getLeft(p_length,pic_index);//相对于父容器向左移动的值
		slide_div.animate({
			left:left
		},800);
	}
	slide_div.attr("index",pic_index);
	autoTask=setTimeout("autoMove()",2000);*/
}