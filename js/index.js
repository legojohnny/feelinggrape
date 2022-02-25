$(document).ready(function(){

	var isMobile = false; //initiate as false
	// device detection
	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|playbook|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
	    isMobile = true;
	}

	

	(function imgs_fade(){
		var $imgs_wraps = $(".imgs_change_interval");
		$imgs_wraps.each(function(){
			var imgs = $(this).children('img');
			var _length = imgs.length;
			var cnt = 0;
			function func(){
				imgs.fadeOut(1000);
				imgs.eq(cnt).fadeIn(1000, function(){
					cnt = cnt == _length - 1 ? 0 : cnt + 1;
					setTimeout(func, 5000);
				});
			}
			func();
		});
	})();


	function visual_slides(_targetWrap, _slides, _has_pause, _type){
		var $wrap = _targetWrap;
		var $slides = $($wrap +" "+_slides);
		var $pn_btns = $($wrap +" .pagination > button");
		var $btn_prev = $($wrap +" button.prev");
		var $btn_next = $($wrap +" button.next");
		var has_pause = _has_pause;
		var slide_type = _type;
		var cnt = 0;
		var si_01 = 0;
		
		if(slide_type == "fade"){
			$slides.removeClass('cur prev next').css("transition", "none").css("opacity", "1").fadeOut(0);
			$slides.first().css("opacity", "1").fadeIn(0);
		}

		$btn_prev.on("click", function(){
			count_minus();
		});
		$btn_next.on("click", function(){
			count_plus();
		});

		var startX = 0;
		var endX = 0;
		var sensitive = 60;
		$($wrap).on('touchstart mousedown', function(e){
			if(!isMobile) return;
			// e.preventDefault();
			if (e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel'){
				var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
				startX = touch.pageX;
			}
			else if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mousemove' ||  e.type == 'mouseover' || e.type == 'mouseout' || e.type == 'mouseenter' || e.type == 'mouseleave'){
				startX = e.pageX;
			}
		});
		$($wrap).on('touchend mouseup', function(e){
			if(!isMobile) return;
			// e.preventDefault();
			if (e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel'){
				var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
				endX = touch.pageX;
			}
			else if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mousemove' ||  e.type == 'mouseover' || e.type == 'mouseout' || e.type == 'mouseenter' || e.type == 'mouseleave'){
				endX = e.pageX;
			}

			if(startX + sensitive < endX){
				console.log("swipe(right)");
				count_minus();
			}
			else if(startX > endX + sensitive){
				console.log("swipe(left)");
				count_plus();
			}
		});

		$pn_btns.on("click", function(e){
			e.preventDefault();
			var cur_num = $pn_btns.index(this);
			console.log(cur_num);
			if(has_pause && cur_num == $pn_btns.length - 1){
				console.log('has_pause && cur_num == $pn_btns.length - 1');
				play_pause();
				return false;
			}
			if(cnt == cur_num) return;
			cnt = cur_num;
			(slide_type == "slide") ? slide_img(cnt, "none") : fade_img(cnt);
			pagination_change(cnt);
		});

		

		function play_pause(){
			var target = $pn_btns.last();
			var src = target.css("background-image");
			if(si_01 != 0){
				stop_si();
				src = src.replace("_F.png, ", "_T.png");
				target.css("background-image", src);
			}
			else if(si_01 == 0){
				start_si();
				src = src.replace("_T.png, ", "_F.png");
				target.css("background-image", src);
			}
		};

		function count_minus(){
			cnt = cnt == 0 ? $slides.length - 1 : cnt - 1;
			(slide_type == "slide") ? slide_img(cnt, "all 0.3s") : fade_img(cnt);
			pagination_change(cnt);
		}
		function count_plus(){
			cnt = cnt == $slides.length - 1 ? 0 : cnt + 1;
			(slide_type == "slide") ? slide_img(cnt, "all 0.3s") : fade_img(cnt);
			pagination_change(cnt);
		}

		function fade_img(num){
			stop_si();
			$slides.fadeOut(500);
			$slides.eq(num).fadeIn(500, function(){
				start_si();
			});
		}

		function slide_img(num, transition_val){
			stop_si();
			var next_num = num == $slides.length - 1 ? 0 : num + 1;
			var prev_num = num == 0 ? $slides.length - 1 : num - 1;
			$slides.removeClass('cur prev next').css("transition", "none");
			if($slides.length <= 2){
				$slides.eq(num).addClass("cur").css("transition", "all 0.3s");
				if(num == 0){
					$slides.eq(next_num).addClass("next").css("transition", "all 0.3s");
				}
				else if(num == 1){
					$slides.eq(prev_num).addClass("prev").css("transition", "all 0.3s");
				}
			}
			else if($slides.length >= 3){
				$slides.eq(num).addClass("cur").css("transition", transition_val);
				$slides.eq(prev_num).addClass("prev").css("transition", "all 0.3s");
				$slides.eq(next_num).addClass("next").css("transition", "all 0.3s");
			}
			start_si();
		}

		function pagination_change(num){
			$pn_btns.removeClass("active");
			$pn_btns.eq(num).addClass("active");
		}

		function start_si(){
			if(si_01 != 0){
				clearInterval(si_01)
			}
			si_01 = setInterval(count_plus, 5000);
		}
		start_si();

		function stop_si(){
			if(si_01 != 0){
				clearInterval(si_01)
			}
			si_01 = 0;
		}
		start_si();

	}

	// === rolling_slide_v4 ===
	function rolling_slide_v4(_targetWrap, _view_ea_D, _view_ea_T, _view_ea_M, _add_opacity){
		console.log("done");
		var $wrap = _targetWrap;
		var $inner = $($wrap +" div.view_mask");
		var $inner_ul = $($wrap +" div.view_mask > ul");
		var $inner_ul_li = $($wrap +" div.view_mask > ul > li");
		var $btn_prev = $($wrap +" button.prev");
		var $btn_next = $($wrap +" button.next");
		var $pn_btns = $($wrap +" .pagination > button.pages");
		var view_ea = (function(){
			var result;
			if(!isMobile) result = _view_ea_D;
			else {
				if(screen.width >= 768) result = _view_ea_T;
				else if(screen.width < 768) result = _view_ea_M;
			}
			return result;
		})();
		var li_width = $inner.outerWidth() / view_ea;
		var move_cnt = 1; 
		var duration = 200; 
		var click_Event = true;
		var si_switch = 0;
		var cnt = 0;
		var add_opa = _add_opacity;
		var _li_sort = [];

		(function init(){
			for(var i = 1; i <= move_cnt; i++){
				$inner_ul_li.last().prependTo($inner_ul);
			}
			$inner_ul_li.css("width", li_width +"px");
			if(add_opa){
				$inner_ul_li.css("opacity", "0.5");
				$inner_ul_li.eq(0).css("opacity", "1");
			}
			$inner_ul.css("width", li_width * $inner_ul_li.length +"px").css("margin-left", -li_width * move_cnt +"px").css("position", "relative");
			pagination_change(cnt);
		})();

		$btn_prev.on("click", function(){
			move_ul("prev");
		});
		$btn_next.on("click", function(){
			move_ul("next");
		});

		$pn_btns.on("click", function(e){
			e.preventDefault();
			stop_si();
			var cur_num = $(this).index();
			console.log(cur_num);
			var _length = $($wrap +" div.view_mask > ul > li").length;
			for(var i = 0; i <= $($wrap +" div.view_mask > ul > li").length - 1; i++){
				
				_li_sort[i] = $("li[data-index='"+ cur_num +"']");
				cur_num = cur_num == _length - 1 ? 0 : cur_num + 1;
			}
			console.log(_li_sort);
			$($wrap +" div.view_mask > ul").empty();
			for(var i = 0; i <= _length - 1; i++){
				_li_sort[i].appendTo($wrap +" div.view_mask > ul");
			}
			$($wrap +" div.view_mask > ul > li").last().prependTo($wrap +" div.view_mask > ul");
			cnt = Number(cur_num);
			pagination_change(cnt);
			start_si();
		});

		function pagination_change(num){
			$pn_btns.removeClass("active");
			for(var i = 1; i <= view_ea; i++){
				$pn_btns.eq($($wrap +" div.view_mask > ul > li").eq(i).attr("data-index")).addClass("active");
			}
			
		}

		var pos_X1 = 0;
		var pos_X2 = 0;
		var pos_Y1 = 0;
		var pos_Y2 = 0;
		var pos_Initial;
		var pos_Final;
		var threshold = ($inner.outerWidth() / view_ea) * 0.4;

		$inner_ul.on('touchstart', function(){ dragStart(); });
		$inner_ul.on('touchend', function(){ dragEnd(); });
		$inner_ul.on('touchmove', function(){ dragAction(); });

		function dragStart (e) {
			e = e || window.event;
			e.preventDefault();
			stop_si();
			pos_Initial = parseInt($inner_ul.css("left"));

			if (e.type == 'touchstart') {
				pos_X1 = e.touches[0].clientX;
				pos_Y1 = e.touches[0].clientY;
			} else {
				pos_X1 = e.clientX;
				pos_Y1 = e.clientY;
			}
			//$inner_ul.onmousemove = dragAction;
			console.log("start");
		}

		function dragAction (e) {
			e = e || window.event;
			e.preventDefault();
			if (e.type == 'touchmove') {
				pos_X2 = pos_X1 - e.touches[0].clientX;
				pos_X1 = e.touches[0].clientX;
				pos_Y2 = pos_Y1 - e.touches[0].clientY;
				pos_Y1 = e.touches[0].clientY;
			} else {
				pos_X2 = pos_X1 - e.clientX;
				pos_X1 = e.clientX;
				pos_Y2 = pos_Y1 - e.clientY;
				pos_Y1 = e.clientY;
			}
			if ( Math.abs( pos_X2 ) > Math.abs( pos_Y2 ) ) {
				$inner_ul.css("left", (parseInt($inner_ul.css("left")) - pos_X2) + "px");
				console.log(parseInt($inner_ul.css("left")) - pos_X2);
			} else {
				var st = $(window).scrollTop();
				$(window).scrollTop(st += pos_Y2);
			}
			//$inner_ul.onmouseup = dragEnd;
			
		}

		function dragEnd (e) {
			e = e || window.event;
			e.preventDefault();
			pos_Final = parseInt($inner_ul.css("left"));
			if (pos_Final - pos_Initial < -threshold) {
				console.log("swipe(right)");
				move_ul("next");
			} else if (pos_Final - pos_Initial > threshold) {
				console.log("swipe(left)");
				move_ul("prev");
			} else {
				$inner_ul.animate({ left: (pos_Initial) + "px" }, 200, function(){
					start_si();
				});
			}
			//$inner_ul.onmouseup = null;
			//$inner_ul.onmousemove = null;
			console.log("end");
		}

		function move_ul(_direction){
			var _dir = _direction == "prev" ? 1 : -1;
			if(click_Event){
				stop_si();
				click_Event = false;
				$inner_ul.animate({ left: (li_width * _dir) * move_cnt +"px" }, duration, function(){
					for(var i = 1; i <= move_cnt; i++){
						if(_direction == "prev"){
							$($wrap +" div.view_mask > ul > li").last().prependTo($wrap +" div.view_mask > ul");
							cnt = cnt == 0 ? $pn_btns.length - 1 : cnt - 1;
							pagination_change(cnt);
						}
						else if(_direction == "next"){
							$($wrap +" div.view_mask > ul > li").first().appendTo($wrap +" div.view_mask > ul");
							cnt = cnt == $pn_btns.length - 1 ? 0 : cnt + 1;
							pagination_change(cnt);
						}
					}
					$inner_ul.css("left", "0px"); 
					if(add_opa){
						$($wrap +" div.view_mask > ul > li").css("opacity", "0.5");
						$($wrap +" div.view_mask > ul > li:eq(1)").css("opacity", "1");
					}
					click_Event = true;
					start_si();
				});
			}
			else { return false; }
		}

		function start_si(){
			if(si_switch != 0){
				clearInterval(si_switch);
			}
			si_switch = setInterval(function(){ move_ul("next"); }, 3000);
		}
		function stop_si(){
			if(si_switch != 0){
				clearInterval(si_switch);
			}
			si_switch = 0;
		}
		start_si();

	}


	// === rolling_slide_v4_1 ===

	function rolling_slide_v4_1(_targetWrap){
		console.log("done rolling_slide_v4_1");
		var $wrap = _targetWrap;
		var $inner = $($wrap +" div.view_mask");
		var $inner_ul = $($wrap +" div.view_mask > ul");
		var $inner_ul_li = $($wrap +" div.view_mask > ul > li");
		var $btn_prev = $($wrap +" button.prev");
		var $btn_next = $($wrap +" button.next");
		var $elms_info = $($wrap +" .info_wrap > div.info");
		var $elms_month = $($wrap +" .month_wrap > p.month");
		var view_ea = 1;
		var li_width = $inner.outerWidth() / view_ea;
		var move_cnt = 1;
		var duration = 200; 
		var click_Event = true;
		var si_switch = 0;
		var cnt = 0;
		var _li_sort = [];

		(function init(){
			for(var i = 1; i <= move_cnt; i++){
				$inner_ul_li.last().prependTo($inner_ul);
			}
			$inner_ul_li.css("width", li_width +"px");
			$inner_ul.css("width", li_width * $inner_ul_li.length +"px").css("margin-left", -li_width * move_cnt +"px").css("position", "relative");
			info_change(cnt);
			month_change(cnt);
		})();

		$btn_prev.on("click", function(){
			move_ul("prev");
		});
		$btn_next.on("click", function(){
			move_ul("next");
		});

		function info_change(num){
			$elms_info.fadeOut(500);
			for(var i = 1; i <= view_ea; i++){
				$elms_info.eq(cnt).fadeIn(500);
			}
		}

		function month_change(num){
			$elms_month.removeClass("active");
			for(var i = 1; i <= view_ea; i++){
				$elms_month.eq(cnt).addClass("active");
			}
		}

		var pos_X1 = 0;
		var pos_X2 = 0;
		var pos_Y1 = 0;
		var pos_Y2 = 0;
		var pos_Initial;
		var pos_Final;
		var threshold = $inner.outerWidth() / 3;

		$inner_ul.on('touchstart', function(){ dragStart(); });
		$inner_ul.on('touchend', function(){ dragEnd(); });
		$inner_ul.on('touchmove', function(){ dragAction(); });

		function dragStart (e) {
			e = e || window.event;
			e.preventDefault();
			stop_si();
			pos_Initial = parseInt($inner_ul.css("left"));

			if (e.type == 'touchstart') {
				pos_X1 = e.touches[0].clientX;
				pos_Y1 = e.touches[0].clientY;
			} else {
				pos_X1 = e.clientX;
				pos_Y1 = e.clientY;
				
				$inner_ul.onmousemove = dragAction;
			}
			console.log("start");
		}

		function dragAction (e) {
			e = e || window.event;
			e.preventDefault();
			if (e.type == 'touchmove') {
				pos_X2 = pos_X1 - e.touches[0].clientX;
				pos_X1 = e.touches[0].clientX;
				pos_Y2 = pos_Y1 - e.touches[0].clientY;
				pos_Y1 = e.touches[0].clientY;
			} else {
				pos_X2 = pos_X1 - e.clientX;
				pos_X1 = e.clientX;
				pos_Y2 = pos_Y1 - e.clientY;
				pos_Y1 = e.clientY;
			}
			if ( Math.abs( pos_X2 ) > Math.abs( pos_Y2 ) ) {
				$inner_ul.css("left", (parseInt($inner_ul.css("left")) - pos_X2) + "px");
				console.log(parseInt($inner_ul.css("left")) - pos_X2);
			} else {
				var st = $(window).scrollTop();
				$(window).scrollTop(st += pos_Y2);
			}
			$inner_ul.onmouseup = dragEnd;
			
		}

		function dragEnd (e) {
			e = e || window.event;
			e.preventDefault();
			pos_Final = parseInt($inner_ul.css("left"));
			if (pos_Final - pos_Initial < -threshold) {
				console.log("swipe(right)");
				move_ul("next");
			} else if (pos_Final - pos_Initial > threshold) {
				console.log("swipe(left)");
				move_ul("prev");
			} else {
				$inner_ul.animate({ left: (pos_Initial) + "px" }, 200, function(){
					start_si();
				});
			}
			$inner_ul.onmouseup = null;
			$inner_ul.onmousemove = null;
			console.log("end");
		}

		function move_ul(_direction){
			var _dir = _direction == "prev" ? 1 : -1;
			if(click_Event){
				stop_si();
				click_Event = false;
				if(_direction == "prev"){
					cnt = cnt == 0 ? $inner_ul_li.length - 1 : cnt - 1;
					info_change(cnt);
					month_change(cnt);
				}
				else if(_direction == "next"){
					cnt = cnt == $inner_ul_li.length - 1 ? 0 : cnt + 1;
					info_change(cnt);
					month_change(cnt);
				}
				$inner_ul.animate({ left: (li_width * _dir) * move_cnt +"px" }, duration, function(){
					for(var i = 1; i <= move_cnt; i++){
						if(_direction == "prev"){
							$($wrap +" div.view_mask > ul > li").last().prependTo($wrap +" div.view_mask > ul");
						}
						else if(_direction == "next"){
							$($wrap +" div.view_mask > ul > li").first().appendTo($wrap +" div.view_mask > ul");
						}
					}
					$inner_ul.css("left", "0px"); 
					click_Event = true;
					start_si();
				});
			}
			else { return false; }
		}

		function start_si(){
			if(si_switch != 0){
				clearInterval(si_switch);
			}
			si_switch = setInterval(function(){ move_ul("next"); }, 5000);
		}
		function stop_si(){
			if(si_switch != 0){
				clearInterval(si_switch);
			}
			si_switch = 0;
		}
		start_si();

	}


	function slide_fade(_targetWrap){
		var $wrap = _targetWrap;
		var $change_wraps = $($wrap +" .change_wraps");
		var $pn_btns = $($wrap +" .tabs_wrap button");
		var $move_bar = $($wrap +" .tabs_wrap span.bar");
		var click_Event = true;
		var cnt = 0;
		var si_01 = 0;

		(function init(){
			for(var i = 0; i <= $change_wraps.length; i++){
				$change_wraps.eq(i).children().hide(0);
				$change_wraps.eq(i).children().eq(0).show(0);
			}
		})();
		
		$pn_btns.on("click", function(e){
			e.preventDefault();
			if(!click_Event) return;
			click_Event = false;
			var cur_num = $pn_btns.index(this);
			console.log(cur_num);
			if(cnt == cur_num){
				console.log("same");
				start_si(); 
				click_Event = true;
				return;
			}
			cnt = cur_num;
			fade_img(cnt);
		});

		function count_plus(){
			if(!click_Event) return;
			click_Event = false;
			cnt = cnt == $pn_btns.length - 1 ? 0 : cnt + 1;
			fade_img(cnt);
		}
		function count_minus(){
			if(!click_Event) return;
			click_Event = false;
			cnt = cnt == 0 ? $pn_btns.length - 1 : cnt - 1;
			fade_img(cnt);
		}

		function fade_img(num){
			stop_si();
			click_Event = false;
			for(var i = 0; i <= $change_wraps.length; i++){
				$change_wraps.eq(i).children().fadeOut(500);
				$change_wraps.eq(i).children().eq(num).fadeIn(500, function(){
					start_si();
					click_Event = true;
				});
				pagination_change(num);
			}
		}

		function pagination_change(num){
			click_Event = false;
			$pn_btns.removeClass("active");
			$pn_btns.eq(num).addClass("active");
			var pos_L = $pn_btns.eq(num).position().left;
			$move_bar.animate({ left: pos_L +"px" }, 200, function(){ click_Event = true; });
		}

		function start_si(){
			if(si_01 != 0){
				clearInterval(si_01)
			}
			si_01 = setInterval(count_plus, 5000);
		}
		start_si();

		function stop_si(){
			if(si_01 != 0){
				clearInterval(si_01)
			}
			si_01 = 0;
		}
		start_si();
	}



	if(!isMobile){

		
	}

	else {

		var fade_slide_01 = slide_fade(".collection");

		if(screen.width >= 768){


			
		}
		else {


			
		}
		
	}


	var visual_Slides_01 = visual_slides(".visual", ".slides", false, "slide");
	var rolling_slide_v4_1_01 = rolling_slide_v4_1(".month");
	var rolling_slide_01 = rolling_slide_v4(".tools", 4, 3, 1, false);
	var rolling_slide_02 = rolling_slide_v4(".news", 4, 3, 1, false);


});