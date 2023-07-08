import GameAll from "./gameAll";
function Sleep(ms:number){
    return new Promise(resolve=>setTimeout(resolve,ms))
}

export default class load extends GameAll {
    public load_progress:Laya.ProgressBar
    public load_percent:Laya.Text
    constructor() { super(); }
    
    public onEnable(): void {
      this.load()
      var i=0
    }

    public onDisable(): void {
    }

    public async load(){
      let i=0
      while (i<=100){
        this.refreshProgress(i)
        console.log("进度:"+i)
        await Sleep(1)
        i++
      }
      this.OpenView("main_view.scene",{},false,false,true)
    }

    public refreshProgress(progress:number=0):void{
      if(progress>100){
         progress = 100
      }
      this.load_progress.value = progress/100;
      // console.log(this);
      this.load_percent.text = "加载进度:"+progress+"%";
    }
}