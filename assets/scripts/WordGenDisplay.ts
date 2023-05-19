import { _decorator, Component, Label, Node } from 'cc';
import { LabelValueSet } from './LabelValueSet';
import { WordGenComponent } from './WordGenComponent';
const { ccclass, property } = _decorator;

@ccclass('WordGenDisplay')
export class WordGenDisplay extends Component {

    @property({ type:Label, visible: true })
    wordLabel : Label = null;

    @property({ type:Label, visible: true })
    timer : Label = null;

    @property({ type:LabelValueSet, visible: true })
    noWords:LabelValueSet|null = null ;
    @property({ type:LabelValueSet, visible: true })
    speed:LabelValueSet|null = null  ;
    
    @property({ type:Node, visible: true })
    guessNode : Node = null;

    @property({type:WordGenComponent,visible:true})
    wordGen:WordGenComponent| null = null
   
    private _wordIndex = 0;
    private  wordList = [];
    private _timerCount = 0;
    start() {

    }

    wordLabelUpdate = function()
    {
        this.wordLabel.string = this.wordList[this._wordIndex];
        this._wordIndex = this._wordIndex +1;
    }
    
    timerUpdate = function() {

    
        let interval =  parseInt(this.speed.string);
        let repeat = parseInt(this.noWords.string);
        
        this.timer.string = this._timerCount;
        this._timerCount = this._timerCount +1;
        if(this._wordIndex == repeat && this._timerCount == interval)
        {
            this.reset();
            this.node.active = false;
            this.guessNode.active = true;
        }
        if(this._timerCount == interval)
        this._timerCount = 0;
     }
    protected onEnable(): void {
       
        let interval =  parseInt(this.speed.string);
        let repeat = parseInt(this.noWords.string);
        this.wordList = this.getWords(parseInt(this.noWords.string));
        this.schedule(this.wordLabelUpdate, interval, repeat, 1);
        this._timerCount = 0;
        let timerRepeat = repeat * interval;
       
        this.schedule(this.timerUpdate, 1,timerRepeat, 1);
        
    }

    protected reset(): void {
        this._timerCount = 0;
        this._wordIndex = 0;
        this.wordList = [];
        this.unschedule(this.wordLabelUpdate);
        this.unschedule(this.timerUpdate);
    }
   

    public getWords(noOfWords:number): string[]
    {
       // let wc = 0;
        //let wordlist: string[] = [];
        
        // while(wc<noOfWords)
        // {
        //     wordlist.push("hi");
        //     wc = wc+1;
        // }
       return this.wordGen.genWordList(noOfWords);
    }
    update(deltaTime: number) {

      
        
    }
}


