// 1. 获取元素 canvas
const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

// 全局变量
let clean = false  // 是否擦除
let lineWidth = 4  // 默认线宽

// 2. 设置 canvas 的 size
autoSetCanvasSize()

// 3. 画线/擦除
drawOrClean()

// 4. 给各个按钮绑定监听
listenToActions()

// 5. 设置画笔颜色
setColor()

// 6. 设置线宽
setLineWidth()








// 封装好的工具函数

// 设置 canvas 的 size
function autoSetCanvasSize() {
  setCanvasSize()
  window.onresize = function() {
    setCanvasSize()
  }

  function setCanvasSize() {
    canvas.width = document.documentElement.clientWidth
    canvas.height = document.documentElement.clientHeight - 72
  }
}


// 画线
function drawLine(x1, y1, x2, y2) {
  ctx.beginPath()
  ctx.lineWidth = lineWidth
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.stroke()
}


// 画还是擦函数
function drawOrClean() {

  // 是否按下
  let flag = false

  let lastPoint = { x: 0, y: 0 }


  // 判断是否支持 touch 事件
  if ('ontouchstart' in document.body) {
    canvas.ontouchstart = function(e) {
      // colors.classList.remove('show')
      flag = true
      const x = e.touches[0].clientX
      const y = e.touches[0].clientY - 72
      if (clean) {
        ctx.clearRect(x - 6, y - 6, 12, 12)
      } else {
        lastPoint = { x, y }
      }
    }
    canvas.ontouchmove = function(e) {
      if (flag) {
        const x = e.touches[0].clientX
        const y = e.touches[0].clientY - 72
        if (clean) {
          ctx.clearRect(x - 6, y - 6, 12, 12)
        } else {
          const nowPoint = { x, y }
          drawLine(lastPoint.x, lastPoint.y, nowPoint.x, nowPoint.y)
          // 更新 lastPoint
          lastPoint = nowPoint
        }
      }
    }
    canvas.ontouchend = function(e) {
      flag = false
    }
  } else {
    canvas.onmousedown = function(e) {
      // colors.classList.remove('show')
      flag = true
      const x = e.clientX
      const y = e.clientY - 72
      if (clean) {
        ctx.clearRect(x - 6, y - 6, 12, 12)
      } else {
        lastPoint = { x, y }
      }
    }
    canvas.onmousemove = function(e) {
      if (flag) {
        const x = e.clientX
        const y = e.clientY - 72
        if (clean) {
          ctx.clearRect(x - 6, y - 6, 12, 12)
        } else {
          const nowPoint = { x, y }
          drawLine(lastPoint.x, lastPoint.y, nowPoint.x, nowPoint.y)
          // 更新 lastPoint
          lastPoint = nowPoint
        }
      }
    }
    canvas.onmouseup = function(e) {
      flag = false
    }
  }
}

// 按钮监听
function listenToActions() {
  const pen = document.querySelector('#pen')
  const erase = document.querySelector('#erase')
  const clear = document.querySelector('#clear')
  const save = document.querySelector('#save')
  const colors = document.querySelector('.colors')
  const lineInner = document.querySelector('.line-inner')

  pen.onclick = function(e) {
    clean = false
    this.classList.add('active')
    erase.classList.remove('active')
    clear.classList.remove('active')
    save.classList.remove('active')
    colors.classList.add('show')
    e.stopPropagation()
  }

  erase.onclick = function() {
    clean = true
    this.classList.add('active')
    pen.classList.remove('active')
    clear.classList.remove('active')
    save.classList.remove('active')
  }

  save.onclick = function() {
    clean = true
    this.classList.add('active')
    pen.classList.remove('active')
    clear.classList.remove('active')
    erase.classList.remove('active')

    // 保存为图片
    var url = canvas.toDataURL('image/png')
    var a = document.createElement('a')
    a.href = url
    a.download = 'default'
    a.target = '_blank'
    a.click()
  }

  clear.onclick = function() {
    clean = true
    this.classList.add('active')
    erase.classList.remove('active')
    pen.classList.remove('active')
    save.classList.remove('active')

    // 清除整个画布
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }


  line.onclick = function(e) {
    lineInner.classList.add('show')
    e.stopPropagation()
  }

  document.body.onclick = function() {
    colors.classList.remove('show')
    lineInner.classList.remove('show')
  }
}


// 设置画笔颜色
function setColor() {
  const colorItems = document.querySelectorAll('.colors div')
  for (var i = 0; i < colorItems.length; i++) {
    colorItems[i].onclick = function() {
      ctx.strokeStyle = this.className
    }
  }
}

// 设置线宽
function setLineWidth() {
  const line = document.querySelector('#line')
  const line4 = document.querySelector('.line4')
  const line8 = document.querySelector('.line8')

  line4.onclick = function() {
    lineWidth = 4
  }

  line8.onclick = function() {
    lineWidth = 8
  }
}