$(function() {
	var oCoin = []; //硬币编号
	var oCoinMounts = 9 //硬币数量
	var oRandomCoin = 0; //问题硬币编号
	var oTimes = 1 //测量次数
	var oLeftArray = [0]; //左盘数组
	var oRightArray = [0]; //右盘数组
	function gameready() {
		for (var i = 0; i < oCoinMounts; i++) {
			oCoin[i] = 1;
			var oCoinstr = i + 1;
			$('.coin').append('<img src="img/' + oCoinstr + '.png"/>');
		}
		for (var i = 0; i < oCoinMounts; i++) {
			var oCoinstr = i + 1;
			$('.overcoin').append('<img src="img/' + oCoinstr + '.png"/>');
		}
		//插入问题硬币
		oRandomCoin = Math.round((Math.random()) * 9);
		var oRandomWeight = Math.round((Math.random()));
		if (oRandomWeight == 0) {
			oCoin[oRandomCoin] = 0.9
		}
		if (oRandomWeight == 1) {
			oCoin[oRandomCoin] = 1.1
		}

	}

	function setcoin() {
		$(".coin img").click(function() {
			var oNum = $(this).index();
			if ($(":radio:checked").attr("id") == "radioleft") {
				if (oTimes == 1) {
					$('#firstleft').append(oNum + 1);
					oLeftArray.push(oCoin[oNum]);
				}
				if (oTimes == 2) {
					$('#secondleft').append(oNum + 1);
					oLeftArray.push(oCoin[oNum]);
				}
				if (oTimes == 3) {
					$('#thirdleft').append(oNum + 1);
					oLeftArray.push(oCoin[oNum]);
				}
				$(this).hide('slow');

			}
			if ($(":radio:checked").attr("id") == "radioright") {
				if (oTimes == 1) {
					$('#firstright').append(oNum + 1);
					oRightArray.push(oCoin[oNum]);
				}
				if (oTimes == 2) {
					$('#secondright').append(oNum + 1);
					oRightArray.push(oCoin[oNum]);
				}
				if (oTimes == 3) {
					$('#thirdright').append(oNum + 1);
					oRightArray.push(oCoin[oNum]);
				}
				$(this).hide('slow');

			}
			else{
				alert('请选择左右盘');
				return false;
			}
			

		})
	}

	function balanceAnimate() {
		this.leftAnimate = function() {
			$('#balanceimgequal').css('display', 'none');
			$('#balanceimgleft').css('display', 'block');
			var strLeft = "$('#balanceimgequal').css('display','block');$('#balanceimgleft').css('display','none');"
			setTimeout(strLeft, 500);
		}
		this.rightAnimate = function() {
			$('#balanceimgequal').css('display', 'none');
			$('#balanceimgright').css('display', 'block');
			var strRight = "$('#balanceimgequal').css('display','block');$('#balanceimgright').css('display','none');"
			setTimeout(strRight, 500);
		}
	}

	function measure() {
		var oLeftValue = 0,
			oRightValue = 0;
		var balance = new balanceAnimate();
		$("#measure").click(function() {
			oLeftValue = eval(oLeftArray.join('+'));
			oRightValue = eval(oRightArray.join('+'));
			if (oLeftArray.length == 1 || oRightArray.length == 1) {
				return false;
			} else {
				if (oTimes == 1) {
					if (oLeftValue < oRightValue) {
						$('#firsticon').append('<');
						balance.rightAnimate();
					}
					if (oLeftValue == oRightValue) {
						$('#firsticon').append('=');
					}
					if (oLeftValue > oRightValue) {
						$('#firsticon').append('>');
						balance.leftAnimate();
					}
				}
				if (oTimes == 2) {
					if (oLeftValue < oRightValue) {
						$('#secondicon').append('<');
						balance.rightAnimate();
					}
					if (oLeftValue == oRightValue) {
						$('#secondicon').append('=');
					}
					if (oLeftValue > oRightValue) {
						$('#secondicon').append('>');
						balance.leftAnimate();
					}
				}
				if (oTimes == 3) {
					if (oLeftValue < oRightValue) {
						$('#thirdicon').append('<');
						balance.rightAnimate();
					}
					if (oLeftValue == oRightValue) {
						$('#thirdicon').append('=');
					}
					if (oLeftValue > oRightValue) {
						$('#thirdicon').append('>');
						balance.leftAnimate();
					}
					$("#select").click();
				}
				oTimes++;
				oLeftArray = [0];
				oRightArray = [0];
				$('.coin img').show();
			}
		})
	}

	function gamereset() {
		window.location.reload();
	}

	function balclear() {
		$('.coin img').show();
		oLeftArray = [0];
		oRightArray = [0];
		if (oTimes == 1) {
			$('#firsticon').empty();
			$('#firstleft').empty();
			$('#firstright').empty();
		}
		if (oTimes == 2) {
			$('#secondicon').empty();
			$('#secondleft').empty();
			$('#secondright').empty();
		}
		if (oTimes == 3) {
			$('#thirdicon').empty();
			$('#thirdleft').empty();
			$('#thirdright').empty();
		}
	}

	function buttongroup() {
		$("#reset").click(function() {
			gamereset();
		})
		$("#select").click(function() {
			$('#overselect').toggle(500, function() {
				$('.coin img').toggle();
			});
		})
		$("#balclear").click(function() {
			balclear()
		})
	}

	function overanimate() {
		this.die = function() {
			var FUNC = [
				function() {
					$('#overselect').css({
						'display': 'none'
					});
					$('.balanceimg').animate({
						'opacity': '0'
					}, 1000, next)
				},
				function() {
					
					$('#overanimate').css({
						'display': 'block'
					});
					$('.coincontainer').animate({
						'height': '32px',
						'top': '63px'
					}, 500, next)
				},
				function() {
					$('.coincontainer').animate({
						'height': '32px'
					}, 500, next)
				},
				function() {
					$('#equal').css({
						'display': 'none'
					});
					$('#left').css({
						'display': 'block'
					});
					$('.treasurecontainer').css({
						'top': '60px'
					});
					$('.coincontainer').css({
						'top': '53px'
					});
					alert('天平倾斜，地面出现了裂缝');
					gamereset();
				},
				
			];
			var next = function() {
				$(document).dequeue("over");
			}
			$(document).queue("over", FUNC);
			next();
		}
		
		this.victory = function() {
			var func = [
				function() {
					$('#overselect').css({
						'display': 'none'
					});
					$('.balanceimg').animate({
						'opacity': '0'
					}, 1000, nextt)
				},
				function() {
					
					$('#overanimate').css({
						'display': 'block'
					});
					$('.coincontainer').animate({
						'height': '32px',
						'top': '63px'
					}, 500, nextt)
				},
				function() {
					$('.coincontainer').animate({
						'height': '32px'
					}, 500);
					alert('天平平衡，你获得了宝藏');
					gamereset();
				}
			];
			var nextt = function() {
				$(document).dequeue("overdie");
			}
			$(document).queue("overdie", func);
			nextt();
		}

	}

	function selectcoin() {
		$(".overcoin img").click(function() {
			var over = new overanimate;
			if ($(this).index() == oRandomCoin) {
				over.victory();
			} 
			else {
				over.die();
			}
		})

	}

	function gamestart() {
		gameready();
		setcoin();
		measure();
		buttongroup();
		selectcoin();

	}

	gamestart();
	
})