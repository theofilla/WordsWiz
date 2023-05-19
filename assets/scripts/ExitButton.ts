import { _decorator, Button, Component, EditBox, Node } from 'cc';
import { LabelValueSet } from './LabelValueSet';
import { WordGenDisplay } from './WordGenDisplay';
import { WordGenComponent } from './WordGenComponent';
const { ccclass, property } = _decorator;

@ccclass('ExitButton')
export class ExitButton extends Button {
   
    @property({ type:LabelValueSet, visible: true })
    noWords:LabelValueSet|null = null ;
    @property({ type:LabelValueSet, visible: true })
    speed:LabelValueSet|null = null  ;
    @property({ type:LabelValueSet, visible: true })
   memoryTimer:LabelValueSet|null = null ;

   @property({ type:Node, visible: true })
   WordDisplayNode : Node = null;

    
    @property({ type:Node, visible: true })
    enableNode : Node = null;

    @property({type:WordGenComponent,visible:true})
    wordGen:WordGenComponent| null = null


    onClicked()
    {
      
        this.node.emit('EndGame');
              
    }

    protected start(): void {
        this.node.on('EndGame', function ( event ) {
            console.log("Restarting game");
            this.noWords.setDefaultString();
            this.speed.setDefaultString();
            this.memoryTimer.setDefaultString();
            this.WordDisplayNode.getComponent("WordGenDisplay").reset();
            //reset all value
            this.enableNode.active = true;
            this.node.parent.active = false;
            this.wordGen.clearWordList();
           
          }.bind(this));
    }
   
    }
    



