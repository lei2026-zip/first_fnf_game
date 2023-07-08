import GameConfig from "../../GameConfig";

//主场景父类
export default class GameAll extends Laya.Scene {
    private CloseFiter:Laya.Scene = null
    constructor() {
        super();
        // this.GameFIG = GameFIG_WX.Get();
        // this.GameFIG_Config = GameFIG_Config;
        // this.windowUser = windowUse.Get();
    }
    public Closed() { }

    public onClosed() {
        this.destroy();
        this.Closed();
    }

    /**
     * 打开其他场景
     * @param Url 场景地址
     * @param Params 目标Scene onOpen回调参数 
     * @param IsOpenFilter 是否开启遮罩
     * @param IsHide 是否隐藏当前场景
     * @param IsClose  是否关闭当前场景
     * @param LoadComplete 加载完成回调 
     * @param LoadProgress  加载进度回调
     */
    public OpenView(Url: string, Params: any, IsOpenFilter: boolean = true, IsHide: boolean, IsClose: boolean, LoadComplete?: Handler, LoadProgress?: Handler) {
        //开启整体背景虚化
        if (IsOpenFilter) {
            this.OpenFilter();
        }
        if (IsHide) {
            this.visible = false;
        }
        //--打开场景 但不关闭当前场景
        Laya.Scene.open(Url, IsClose, Params, LoadComplete, LoadProgress);

    }

    public Show() {
        this.visible = true;
    }

    /**打开背景遮罩 */
    public OpenFilter(target: Laya.Scene = this) {
        var blurFilter = new Laya.BlurFilter();
        blurFilter.strength = 10;
        target.filters = [blurFilter];
        this.CloseFiter = target;
    }

    public HideFilter() {
        if (this.CloseFiter != this) {
            this.visible = true;
            this.CloseFiter.destroy();
        } else {
            this.filters = null;
        }
    }

    /**显示此场景并执行上个场景的回调----防止直接打开页面未及时更新 仅限在不关闭当前场景的情况下 */
    public OpenOver() {
      
    }
}