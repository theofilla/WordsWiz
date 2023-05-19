import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
import words from 'random-words';

@ccclass('WordGenComponent')
export class WordGenComponent extends Component {

    private _wordList:string[] = [];
    start() {

    }

    genWordList(noOfWords:number)
    {
        this._wordList = words(noOfWords);
        return this._wordList;

    }

    getWordList()
    {
        return this._wordList;

    }

    clearWordList()
    {
        this._wordList = [];
    }

    update(deltaTime: number) {
        
    }
}


