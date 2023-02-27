package com.example.data_structs;

import java.util.ArrayList;

public class WordsDictionary {
    private ArrayList<Word> words;

    public WordsDictionary(){
        words = new ArrayList<Word>();
    }

    public void addWord(Word w){
        this.words.add(w);
    }
    public ArrayList<Word> getWords(){
        return this.words;
    }
    public Word getWord(String target) throws IllegalArgumentException{
        for(Word w: this.words){
            if(w.getWord().equals(target)){
                return w;
            }
        }
        throw new IllegalArgumentException();
    }
    public boolean isWordAdded(String target){
        for(Word w: this.words){
            if(w.getWord().equals(target)){
                return true;
            }
        }
        return false;
    }
}
