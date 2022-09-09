// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html


const {ccclass, property} = cc._decorator;

@ccclass
export default class Platform extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;
    @property(cc.Prefab)
    ManyBlock:cc.Prefab=null;
    @property
    text: string = 'hello';
    xOffSetMin:number=60;
    xOffSetMax:number=200;
    yOffSetMin:number=-120;
    yOffSetMax:number=120;
    current: any=null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    randomGenarate(){
        let data={
            datblockCount:0,
            x:0,
            y:0
        }
        let blockCount= 1 + Math.round(Math.random() * (10 - 1));
        let xOffSet = this.xOffSetMin +Math.random() * (this.xOffSetMax - this.xOffSetMin);
        let yOffSet = this.yOffSetMin +Math.random() * (this.yOffSetMax - this.yOffSetMin);
        const manyBlock = cc.instantiate(this.ManyBlock);

        const Platformx = manyBlock.getComponent("Block")

        data.x=Platformx.x+Platformx.width+xOffSet;
        let y = Platformx.y+yOffSet;
        const screenTop=cc.winSize.height/2;
        const screenBot=-cc.winSize.height/2;
        y=Math.min(y,screenTop-Platformx.height*2)
        y=Math.max(y,screenBot+Platformx.height)
        data.y=y
        data.datblockCount=blockCount;
        return data
    }
    createPlatforms(data){
        const manyBlock = cc.instantiate(this.ManyBlock);
        // const Platformx = manyBlock.getComponent("Block")
        this.node.addChild(manyBlock);
        this.current= manyBlock.getComponent("Block")
        this.current.init(data.datblockCount,data.x,data.y)

        cc.log(this.node)

    }
    start () {
        this.createPlatforms(this.randomGenarate());
        this.createPlatforms(this.randomGenarate());
        this.createPlatforms(this.randomGenarate());
        this.createPlatforms(this.randomGenarate());
        this.createPlatforms(this.randomGenarate());
    }

    // update (dt) {}
}
