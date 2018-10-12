var musicList = []
var currentIndex = 0
var clock
var audio = new Audio()     //创建或者获取的audio对象
audio.autoplay = true       //设置为自动播放，下次更换 audioObject.src 后会自动播放音乐

getMusicList(function(list){
    musicList = list
    loadMusic(list[currentIndex])
    generateList(list)
})



getMusicList(function(List){
    loadMusic(list[currentIndex])
})

audio.ontimeupdate = function(){      //当currentTime更新时会触发timeupdate事件,这个事件的触发频率由系统决定，但是会保证每秒触发4-66次（前提是每次事件处理不会超过250ms.
    console.log(this.currentTime)       //设置或者获取播放时间 this指audio
    $('.musicbox .progress-now').style.width = (this.currentTime/this.duration)*100 + '%'
}

audio.onplay = function(){
    clock = setInterval(function(){
    var min = Math.floor(this.currentTime/60)
    var sec = Math.floor(this.currentTime)%60 + ''
    sec = sec.length === 2? sec : '0' + sec
    $('.musicbox .time').innerText = min + ':' + sec
    })
}
audio.onpause = function(){
    clearInterval(clock)
}
audio.onended = function(){
    currentIndex == (++currentIndex)%musicList.length
    loadMusic(musicList[currentIndex])
}

$('.musicbox .play').onclick = function(){
    if(audio.paused){
    audio.play()
    this.querySelector('.fas').classList.remove('fa-play-circle')
    this.querySelector('.fas').classList.add('fa-pause-circle')
    }else{
    audio.pause()
    this.querySelector('.fas').classList.add('fa-play-circle')
    this.querySelector('.fas').classList.remove('fa-pause-circle')
    }
}

$('.musicbox .forward').onclick = function(){
    currentIndex == (++currentIndex)%musicList.length
    loadMusic(musicList[currentIndex])
}

$('.musicbox .back').onclick = function(){
    currentIndex == (musicList.length + --currentIndex)%musicList.length
    loadMusic(musicList[currentIndex])
}

$('.musicbox .bar').onclick = function(e){
    console.log(e)
    var percent = e.offsetX / parseInt(getComputedStyle(this).width)
    console.log(percent)
    audio.currentTime = audio.duration * percent
}

function $(selector){
    return document.querySelector(selector)
}

function getMusicList(callback){
    var xhr = new XMLHttpRequest()
    xhr.open('GET', '/music.json', true)
    xhr.onload = function(){
    if(xhr.status>=200 && xhr.status<300 || xhr.status==304){
        callback(JSON.parse(this.responseText))
    }else {
        console.log('数据获取失败')
    }
    }
    xhr.onerror = function(){
    console.lof('网络异常')
    }
    xhr.send()
}

function loadMusic(musicObj){
    console.log('begin play', musicObj)
    $('.musicbox .title').innerText = musicObj.tltle
    $('.musicbox .auther').innnerText = musicObj.auther
    $('.cover').style.backgroundImage = 'url(' + musicObj.img + ')'
    audio.src = musicObj.src
}

function generate(){
    
}