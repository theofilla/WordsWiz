import { _decorator, Button, Component, EditBox, Label, Node } from 'cc';
import { WordGenComponent } from './WordGenComponent';
const { ccclass, property } = _decorator;

@ccclass('GameCheckResultButton')
export class GameCheckResultButton extends Button {
    
    //  @property({ type:EditBox, visible: true })
    // memoryTimer:EditBox|null = null ;

    @property({type:EditBox, visible:true})
    ebox:EditBox|null = null

    @property({ type:Node, visible: true })
    disableNodes : Node = null;

    @property({ type:Label, visible: true })
    scoreLabel : Label = null;

    @property({ type:Node, visible: true })
    enableNode : Node = null;
    score: number;

    @property({type:WordGenComponent,visible:true})
    wordGen:WordGenComponent| null = null

    wordList:string[] = [];

    onClicked()
    {
       if(this.calculateScore())
       {
        this.node.emit('showResults');

       }
       else
       this.ebox.string = "Error in processing, Please retry. \nEnter words seperated by comma";
               
        
    }

    protected start(): void {
        this.node.on('showResults', function ( event ) {
            console.log("Enabling results screen")
            this.enableNode.active = true;
            this.disableNodes.active = false;
           
          }.bind(this));
    }
   
    private calculateScore():boolean
    {
        if(this.ebox.string.trim() == "")
        {
            this.score = 0;
            return true;
        }
        try{
            let answerlist = this.ebox.string.split(',');
            answerlist = answerlist.map(name => name.toLowerCase());
            answerlist =  Array.from(new Set(answerlist))
            let score = this.compareAnswers(answerlist).length;
            this.scoreLabel.string = 'Score : ' +score.toString()+ '/' + this.wordGen.getWordList().length;
            return true;

            
        }
        catch
        {
            return false;
        }

    }

    compareAnswers(answers:string[]): string[] {
            return answers.filter((val1) => {
              return this.wordGen.getWordList().find((val2) => val1 === val2);
            });
          }
    }
    



