import { _decorator, Button, Component, EditBox, Node } from 'cc';
import { LabelValueSet } from './LabelValueSet';
import { WordGenComponent } from './WordGenComponent';
const { ccclass, property } = _decorator;

@ccclass('GameStartButton')
export class GameStartButton extends Button {
    @property({ type:LabelValueSet, visible: true })
     noWords:LabelValueSet|null = null ;
     @property({ type:LabelValueSet, visible: true })
     speed:LabelValueSet|null = null  ;
    //  @property({ type:LabelValueSet, visible: true })
    // memoryTimer:LabelValueSet|null = null ;

  
    @property({ type:Node, visible: true })
    disableNodes : Node = null;

    
    @property({ type:Node, visible: true })
    enableNode : Node = null;

    onClicked()
    {
        if(this.checkLabelValue(this.noWords)&&
        this.checkLabelValue(this.speed))//&&
      //  this.checkLabelValue(this.memoryTimer))
        {
            console.log('Game started');
            this.node.emit('startGame');
        }
        else
        {
            console.log('Wrong input values');
        }
        
    }

    protected start(): void {
        this.node.on('startGame', function ( event ) {
            console.log("Enabling game")
            this.enableNode.active = true;
            this.disableNodes.active = false;
           
          }.bind(this));
    }
   
    private checkLabelValue(ebox:LabelValueSet):boolean
    {
        if(ebox.string.trim() == "")
        return false;
        if(parseInt(ebox.string)<= ebox.max_val && parseInt(ebox.string) >= ebox.min_val  )
        {
            return true;
            
        }
        else
        
            ebox.setDefaultString();
            return false;
        }

    }
    



