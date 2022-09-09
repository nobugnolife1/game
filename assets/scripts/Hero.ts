// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;
    @property(cc.v2)
    jumpSpeed=cc.v2({x:0,y:300});
    @property
    maxJumpDistance:number=300;
    isJumping: boolean;
    jumpKeyPressed: boolean;
    touching: boolean;
    starJumpY: number;
    character: cc.RigidBody;
    jumFinished: boolean;
    // jumpSpeed=cc.v2({x:0,y:300});
    // jumpSpeed=cc.v2({x:0,y:300});
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,event=>{
            switch(event.keyCode){
                case cc.macro.KEY.space:
                    this.jumpKeyPressed=true;
                    break;
            }
        })
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,event=>{
            switch(event.keyCode){
                case cc.macro.KEY.space:
                    this.jumpKeyPressed=false;
                    this.isJumping=false;
                    break;
            }
        })
        // this.node.parent.on(cc.Node.EventType.TOUCH_START,()=>{
        //     this.jumpKeyPressed=true;
        //     cc.log("handle")

        // })
        // this.node.parent.on(cc.Node.EventType.TOUCH_END,()=>{
        //     cc.log("handle")

        //     this.jumpKeyPressed=false;
        //     this.isJumping=false;
        // })
    }
    start () {
        this.character=this.getComponent(cc.RigidBody);
        this.isJumping=false;
        this.jumpKeyPressed=false;
        this.touching=false;
        // this.starJumpY=0;
    }
    onBeginContact(){
        cc.log('onBeginContact');
        this.touching=true;
    }
    onEndContact(){
        cc.log('onEndContact');
        this.touching=false;
    }
    update (dt) {
        if(this.jumpKeyPressed){
            this.jump();
        }
    }
    jump() {
        if(this.touching){
            //remembers start posititon
            this.starJumpY=this.node.y;
            //set jump not finish
            this.jumFinished=false;
            // set jump is started
            this.isJumping=true;
            // set hero speed on y axis
            this.character.linearVelocity =this.jumpSpeed;
        }else if(this.isJumping&&!this.jumFinished){
            const jumpDistance=this.node.y-this.starJumpY;
            //if jumpdistance not maximum
            if (jumpDistance<this.maxJumpDistance){
                this.character.linearVelocity=this.jumpSpeed;
            }else{
                //finish jump
                this.jumFinished=true;
            }
        }
    }
}
