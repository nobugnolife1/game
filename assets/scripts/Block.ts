// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Block extends cc.Component {
    

    @property(cc.Label)
    label: cc.Label = null;
    @property(cc.Prefab)
    block:cc.Prefab=null;
    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    init(blockCount,x,y){
        this.node.setPosition(cc.v2(0,-200));
        for(let i=0;i<blockCount;i++){
            const block=cc.instantiate(this.block);
            block.setPosition(block.width*i*0.3,0,0)
            this.node.addChild(block);

        }
        const block=cc.instantiate(this.block);
        const blockSize=block.width*0.3;
        this.node.width=blockSize*blockCount;
        this.node.height=blockSize;
        let collider=this.node.getComponent(cc.PhysicsBoxCollider);
        collider.size.width=this.node.width;
        collider.size.height=this.node.height;
        collider.offset.x=this.node.width*0.4;
        collider.apply();
        cc.log(this.node)
    }
    test(){
        cc.log("work")
    }
    start () {
        // this.init(5,0,-200);
    }

    update (dt) {
        this.node.x-=60*dt;
        
    }
}
