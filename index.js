window.onload = function () {
    /*let arr = [
        {id:1,name:'大哈哈',tell:'123456789',pinyin:'dahaha'},
        {id:2,name:'二哈哈',tell:'123456789',pinyin:'erhaha'},
        {id:3,name:'三哈哈',tell:'123456789',pinyin:'sanhaha'},
        {id:4,name:'四哈哈',tell:'123456789',pinyin:'sihaha'},
        {id:5,name:'五哈哈',tell:'123456789',pinyin:'wuhaha'},
        {id:6,name:'六哈哈',tell:'123456789',pinyin:'liuhaha'},
        {id:7,name:'七哈哈',tell:'123456789',pinyin:'qihaha'},
        {id:7,name:'八哈哈',tell:'123456789',pinyin:'bahaha'},
        {id:7,name:'九哈哈',tell:'123456789',pinyin:'jiuhaha'},
        {id:7,name:'十哈哈',tell:'123456789',pinyin:'shihaha'},
        {id:1,name:'阿哈哈',tell:'123456789',pinyin:'ahaha'},
        {id:2,name:'我哈哈',tell:'123456789',pinyin:'wohaha'},
        {id:3,name:'就哈哈',tell:'123456789',pinyin:'jiuhaha'},
        {id:4,name:'个哈哈',tell:'123456789',pinyin:'gehaha'},
        {id:5,name:'哦哈哈',tell:'123456789',pinyin:'ohaha'},
        {id:6,name:'怕哈哈',tell:'123456789',pinyin:'pahaha'},
        {id:7,name:'不哈哈',tell:'123456789',pinyin:'buhaha'},
        {id:7,name:'下哈哈',tell:'123456789',pinyin:'xiahaha'},
        {id:7,name:'在哈哈',tell:'123456789',pinyin:'zaihaha'},
        {id:7,name:'人哈哈',tell:'123456789',pinyin:'renhaha'}

    ]
    localStorage.setItem('contact',JSON.stringify(arr));*/
    let dl = document.querySelector('dl');
    dl.innerHTML = '';
    let ul = document.querySelector('ul');
    ul.innerHTML = '';
    let data = JSON.parse(localStorage.getItem('contact'));     //获取到本地通讯录
    render(data);       //调用render函数
    function render(data){      //声明render函数
        let obj = {};       //声明一个空的对象，为了存放每一个首字母对应的内容
        let object = [];
        data.forEach(element => {       //遍历本地的通讯录
            let firstChar = element.pinyin.trim().charAt().toUpperCase();       //获取element的pinyin这个属性，去空、第一个字母、转大写
            if(!obj[firstChar]){        //判断如果element有没有这个属性了,firstChar---下标
                obj[firstChar] = [];        //没有就把值赋值给一个空数组
                //console.log(obj[firstChar]);
                object.push(firstChar);
            }
            obj[firstChar].push(element);       //有就末尾添加、推送element

        })
        //console.log(obj,data);
        let keys =object.sort();        //object,上面声明object把首字母保存了下来，进行排序sort
        keys.forEach(element => {       //遍历首字母
            dl.innerHTML += `<dd>${element}</dd>`;      //给dl添加内容，首字母
            ul.innerHTML += `<li>${element}</li>`;      //给右侧固定定位的字母添加内容
            obj[element].forEach(i => {         //遍历首字母对应的内容
                dl.innerHTML += `<dt>
                    <a href="tel:${i.tell}">
                        ${i.name}
                    </a>
                </dt>`;         //给dl添加对应首字母的内容
            })
        })
    }

    let tips = document.querySelector('.tips');     //获取固定的开头字母
    let kuang = document.querySelector('.kuang');       //获取顶部搜索框
    let arr1 = [];      //声明一个数组，接收
    let height = kuang.offsetHeight + tips.offsetHeight;        //开头字母+顶部搜索框高度总和
    let dds = document.querySelectorAll('dd');      //获取所有的dd(大写字母)，为了赋给固定字母
    Array.prototype.forEach.call(dds, function (element) {      //prototype数组的属性继承给dds
        arr1.push(element.offsetTop);       //把获取到的每个块距离顶部的高度保存在数组里面
    });
    window.addEventListener('scroll', function () {     //添加鼠标滚轮事件
        let st = document.body.scrollTop || document.documentElement.scrollTop;     //解决兼容问题，滚动后距离顶部的高度保存在st变量身上
        arr1.forEach((element,index) => {       //遍历获取到的每个块距离顶部高度
            if(st + height >= element){     //如果两个距离相加大于等于
                tips.innerText = dds[index].innerText;
            }
        })
    });

    let search = document.querySelector('input');
    search.addEventListener('input', function () {
        let c = this.value.trim();
        let obj = data.filter(element => element.pinyin.includes(c) || element.name.includes(c) || element.tell.includes(c));
        dl.innerHTML = '';
        ul.innerHTML = '';
        render(obj);
    })
}