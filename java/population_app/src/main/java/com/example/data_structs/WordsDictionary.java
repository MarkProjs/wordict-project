package com.example.data_structs;

import java.util.ArrayList;

/**
 * class that represents a list of words
 * to be used to restructure raw data and then 
 * save it into a db
 */
public class WordsDictionary {
    private ArrayList<Word> words;

    /**
     * inits an empty dictonary
     */    
    public WordsDictionary(){
        words = new ArrayList<Word>();
    }
    /**
     * adds a word to the dictonary
     * @param w the word to be added to the dictionary
     * @throws IllegalArgumentException if the word is already in the dictionary this error is thrown
     */
    public void addWord(Word w){
        if(isWordAdded(w.getWord())){
            throw new IllegalArgumentException();
        }
        this.words.add(w);
    }
    /**
     * get all the words in the dictionary in the form of an ArrayList
     * @return ArrayList containing all the Words in the dictionary
     */
    public ArrayList<Word> getWords(){
        return this.words;
    }
    /**
     * try to find and return a word object from the dictionary
     * @param target the word value of the target word object
     * @return the word object if a match if found
     * @throws IllegalArgumentException if a match is not found this error is thrown
     */
    public Word getWord(String target) throws IllegalArgumentException{
        for(Word w: this.words){
            if(w.getWord().equals(target)){
                return w;
            }
        }
        //if the word is not found throw exception
        throw new IllegalArgumentException();
    }
    /**
     * check if a word is already in the dictionary
     * @param target the word who's precence in the dictionary we are checking for
     * @return true if the word is alredy in the dictionary, false if not
     */
    public boolean isWordAdded(String target){
        for(Word w: this.words){
            if(w.getWord().equals(target)){
                return true;
            }
        }
        return false;
    }
}
