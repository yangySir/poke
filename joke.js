$(function () {
    let joke=[]; //对象数组
    let colorArr=['s','h','d','c'];
    //由于joke是对象数组，判断是否存在，借助flag
    let flag={}; //let flag={'color_number':s_7}
    let first=null;
    for(let i=0;i<52;i++){
        let index=Math.floor(Math.random()*colorArr.length);
        let color=colorArr[index];
        //注意考虑floor和
        let number=Math.round(Math.random()*12+1);
        //??????访问对象的属性值[]???
        while(flag[color+'_'+number]){
             index=Math.floor(Math.random()*colorArr.length);
             color=colorArr[index];
            //注意考虑floor和
             number=Math.round(Math.random()*12+1);
        }
        joke.push({color,number}); //对象推入
        flag[color+'_'+number]=true;
    }
    console.log(joke);

    // left:350-i*50+j*100  top:80*i
    let index=-1;
    let row=6;
    for(let i=0;i<row;i++){
        for(let j=0;j<=i;j++){
            index++; //记录第几张
            let obj=joke[index];
            let lefts=350-i*50+j*100,tops=70*i;
            $('<div>').addClass('joke')
            //模板字符串
            .css({backgroundImage:`url(./imgs/${obj.number}${obj.color}.jpg)`})
            .appendTo('.box')
            .data('number',obj.number)
            .attr('id',i+'_'+j)  //标识
            .delay(i*100)
            .animate({left:lefts,top:tops,opacity:1})
        }
    }
    for(;index<52;index++){
        let obj=joke[index];
        $('<div>').addClass('joke')
        //模板字符串
            .addClass('club')
            .attr('id','-2_-2')  //标识
            .css({backgroundImage:`url(./imgs/${obj.number}${obj.color}.jpg)`})
            .appendTo('.box')
            .data('number',obj.number)
            .delay(index*50)
            .animate({left:0,top:480,opacity:1})
    }
    $('.box').on('click','.joke',function () {
        let _this=$(this);
        //判断是否被压住（i，j）=>(i+1,j) (i+1,j+1)  做标记（加属性）
        let [i,j]=$(this).attr('id').split('_');
        //字符串型(1.在i和j的使用上*1；2.parseInt强制转换)
        let id1=i*1+1+'_'+j*1,id2=i*1+1+'_'+(j*1+1);
        //$('#'+id1)获取对应元素
       // console.log($('#' + id1));
         if($('#'+id1).length||$('#'+id2).length) { //最上面一排长度为0，其余为1
           return;
         }
       //用active标记是否被抬起
        if($(this).hasClass('active')){
            //！！！！注意添加类时没有点直接写类名！！！！
            $(this).removeClass('active').animate({top:'+=20px'})
        }else{
            $(this).addClass('active').animate({top:'-=20px'})
        }
        //判断
        if(!first){
            first=_this;
        }else {
            if (first.data('number')+_this.data('number')=== 14) {
                $('.active').animate({top: 0, left: 710, opacity: 0}, function () {
                    $(this).remove()
                })
            } else{
                    $('.active').animate({top: '+=30'}, function () {
                        $(this).removeClass('active')
                    })
                }
            first = null;
            }
    });
    //切换
    let n=0;
    $('.right').on('click',function () {
        $('.club').last().css('zIndex',n++).animate({left:710},function () {
            //动画结束后进行操作
            $(this).removeClass('club').addClass('rightt')
        })
    })
    $('.left').on('click',function () {
        $('.rightt').first().css('zIndex',n++).animate({left:0},function () {
            //动画结束后进行操作
            $(this).removeClass('rightt').addClass('club').css('zIndex',0)
        })
    })

})