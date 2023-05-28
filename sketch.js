let points =[[1, -3], [5, -4], [4, -3],[9,1],[7,2],[8,5],[5,4],[5,5],[3,4],[4,9],[2,7],[0,10],[-2,7],[-4,8],[-3,3],[-5,6],[-5,4],[-8,5],[-7,2],[-9,1],[-4,-3],[-5,-4],[0,-3],[2,-7],[2,-6],[1,-3]];

var stroke_colors = "8ecae6-219ebc-023047-ffb703-fb8500".split("-").map(a=>"#"+a)
var fill_colors = "8ecae6-219ebc-023047-ffb703-fb8500".split("-").map(a=>"#"+a)
// 類別
class odj{ //odj只是一個名字
  constructor(args){ //設定基本資料或預設值(包含物件顏色、位置、速度、大小...)
   this.p = args.p || {x:random(width),y:random(height)} //物件位置
   this.v = {x:random(-1,1),y:random(-1,1)} //速度，移動速度由亂數產生
   this.size = random(5,10) // 放大倍率，大小從第一個數字到第二個數字由亂數決定
   this.stroke = random(stroke_colors)
   this.color = random(fill_colors)
  }
  draw() //把物件畫出來的函數
  {
    push() //重新設定，設定新的原點與顏色
    translate(this.p.x,this.p.y) //原點設定在物件所在位置
    scale((this.v.x<0?1:-1),-1) //放大縮小的指令。若this.v.x<0成立，則為1，否則為-1。1是不翻轉，-1是翻轉，括號前的是x軸，括號後是y軸
    fill(this.color)
    stroke(this.stroke)
    strokeWeight(3)
    beginShape()
     for(var i = 0;i<points.length;i++){
       //line(points[i][0]*this.size,points[i][1]*this.size,points[i+1][0]*this.size,points[i+1][1]*this.size)
       vertex(points[i][0]*this.size,points[i][1]*this.size)
      }
     endShape(close)
    pop()
  }
  update(){ //移動後設定位置資料為何
    this.p.x = this.p.x + this.v.x //新的X軸的位置=現在的x軸位置+移動的速率
    this.p.y = this.p.y + this.v.y
    //碰到邊框反彈
    if(this.p.x<=0 || this.p.x>=width) //<0碰到左邊，width為碰到右邊
    {
      this.v.x = -this.v.x
    }
    if(this.p.y<=0 || this.p.y>=width) //<0碰到左邊，width為碰到右邊
    {
      this.v.y = -this.v.y
    }
  }
  isBallInRanger(){ //判斷有沒有被滑鼠按到
    let d = dist(mouseX,mouseY,this.p.x,this.p.y) //計算滑鼠按下的點與物件的距離
    if(d<this.size*15){ //數字的由來:座標對大的值
      return true //代表距離有在範圍內
    }else{
      return false //代表距離沒有在範圍內
    }
  }

}


var ball //單一物件
var balls =[] //陣列，放所有物件資料

function setup() { //設定這個倉庫內的資料
  createCanvas(windowWidth,windowHeight);
  for(j=0;j<30;j++) //產生幾個物件
  {
    ball = new odj({}) //產生一個新物件，暫時放到ball變數中
    balls.push(ball) //把ball物件放入balls
  }
}

function draw() { //每秒會執行60次
  background(220);
  // for(k=0;k<balls.length;k=k+1){
  //   ball = balls[k]
  //   ball.draw()
  //   ball.update()
  // }

  for(let ball of balls){
    ball.draw()
    ball.update()
  }
}

// function mousePressed(){
//   //按下產生物件
//   // ball = new odj({
//   //   p:{x:mouseX,y:mouseY}
//   // })
//   // balls.push(ball)
// }

function mousePressed(){
  for(let ball of balls){
    if(ball.isBallInRanger()){
      //把倉庫內物件刪除
      balls.splice(balls.indexOf(ball),1) //把倉庫內第幾個刪除，只刪除一個。indexOf()找出
    }
  }

}