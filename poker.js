$(function(){
	/*$('.animation')
	.delay(2000)
	.animate({width:400},1000)
	.delay(1000)
	.queue(function(){
      $(this).css({'backgroundColor':'green'}).dequeue();
	})
	.delay(1000)
	.animate({height:500},2000)

for (var i = 0; i < 100; i++) {
var b=Math.floor(Math.random()*20+100);
var w=Math.floor(Math.random()*3+5);
var left=Math.floor(Math.random()*$(document).width());
var top=Math.floor(Math.random()*$(document).height());
$('<div>')
.addClass('zidan')
.width(w)
.height(w)
.css({'backgroundColor':'rgba(50,255,'+b+',0.4)'})
.appendTo('body')
.delay(i*20)
.animate({left:left,top:top});	
};*/
var poker=[];
var biao={};
while (poker.length<52) {
	var color=['c','h','d','s'];
	/*var number=['A','2','3','4','5','6','7','8','9','T','J','Q','K'];*/
	var	c=color[Math.floor(Math.random()*4)];
	var n=Math.ceil(Math.random()*13);
	if (!biao[c+'-'+n]) {
	poker.push({color:c,number:n});
	biao[c+'-'+n]=true;
	};
};

console.table(poker);
var dict={
	1:'A',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9',10:'T',11:'J',12:'Q',13:'K'
};
$('.kaishi').on('click',function(){
	for (var i = 0,index=0; i < 7; i++) {
	for (var j = 0; j <i+1 ; j++) {
		index+=1;
	$('<div>')
    .addClass('pai shang')
    .attr('id',i+'-'+j)
    .data('num',poker[index].number)
    .delay(index*100)
    .css({backgroundImage:'url(img/'+dict[poker[index].number]+poker[index].color+'.png)'})
    .animate({
    	top:50*i,
    	left:(6-i)*50+j*100,
    	opacity:1
    })
    .appendTo('.zhuozi')

	};	
};

for (; index < poker.length; index++) {
	$('<div>')
    .addClass('pai zuo')
    .data('num',poker[index].number)
    .delay(index*100)
    .css({backgroundImage:'url(img/'+dict[poker[index].number]+poker[index].color+'.png)'})
    .animate({
    	top:450,
    	left:150,
    	opacity:1
    })
    .appendTo('.zhuozi')

};
$('.kaishi').animate({
			opacity:0
})
$('.anniu-left,.anniu-right').delay(index*100)
.animate({opacity:1});



var covered=function(el){
	var x=Number($(el).attr('id').split('-')[0]);
	var y=Number($(el).attr('id').split('-')[1]);
	return $('#'+(x+1)+'-'+y).length||$('#'+(x+1)+'-'+(y+1)).length;

}
var shangyizhang;
$('.zhuozi .pai').on('click',function(){
	if ($(this).hasClass('shang')&&covered(this)) {
		return;
	};

$(this).toggleClass('chulie');

$(this).animate({top:'-=20'});

//点第一张
if ($(this).data('num')===13) {
        $(this).animate({
			top:0,
			left:0,
			opacity:0
		}).queue(function(){
			$(this).remove();
		});
		shangyizhang=undefined;
		return;
};
if (!shangyizhang) {
	shangyizhang=$(this);
}else{
	if (shangyizhang.data('num')+$(this).data('num')===13) {
		shangyizhang.delay(400).animate({
			top:0,
			left:0,
			opacity:0
		}).queue(function(){
			$(this).remove();
		});
		$(this).animate({
			top:0,
			left:0,
			opacity:0
		}).queue(function(){
			$(this).remove();
		});
		shangyizhang=undefined;
	}else{
	shangyizhang.delay(400).animate({
			top:'+=20'
		}).removeClass('chulie');
		$(this).animate({
			top:'+=20'
		}).removeClass('chulie');
		shangyizhang=undefined;

		
	}
}



});

var zIndex=0;
$('.anniu-left').on('click',function(){
	zIndex+=1;
	$('.zhuozi .zuo')
	.eq(-1)
	.removeClass('zuo')
	.addClass('you')
	.animate({
		top:450,
		left:440
	})
	.css({
		zIndex:zIndex
	})

});
var cishu=0;
$('.anniu-right').on('click',function(){	
	if($('.zuo').length){
		alert('亲，左边还有奥')
		return;
	};
	cishu+=1;
	if(cishu>3){
		alert('亲，GAME OVER')
		return;
	};
	$('.you').each(function(i,el){
		$(this)
		.delay(i*50)
		.animate({
			top:450,
			left:150
		})
		.css({
			zIndex:0
		})
		.removeClass('you')
		.addClass('zuo')
	})
})

})



})