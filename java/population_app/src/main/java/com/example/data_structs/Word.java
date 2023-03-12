package com.example.data_structs;


import java.util.List;

/**
 * Data class representing a word
 * Used ro query documents from mongoDB
 */
public class Word {
    private String word;
    private int length;
    private List<Definition> definitions;
    private List<String> rhymes;
    private List<String> synonyms;
    /**
     * Parameterless constructor only needed 
     * for mongo db when it translates the json
     * DO NOT USE
     */
    public Word(){}
    /**
     * To be used to make an instance of the class
     * for testing and db inserting perposes
     * Parameterless constructor only needed 
     * for mongo db when it translates the json
     * @param word the word
     * @param length length of the word
     * @param defs list of the definitions of the word
     * @param rhymes list of the rhymes of the word
     * @param synonyms list of the synonyms of the word
     */
    public Word(String word, int length, List<Definition> defs, List<String> rhymes, List<String> synonyms){
        this.word = word;
        this.length = length;
        this.definitions = defs;
        this.rhymes = rhymes;
        this.synonyms = synonyms;
    }

    /**
     * getter for the word property
     * @return the word
     */
    public String getWord(){
        return this.word;
    }
    /**
     * getter for the length propery
     * @return length of the word
     */
    public int getLength(){
        return this.length;
    }
    /**
     * setter for the definitions field
     * @return list of the definitions
     */
    public List<Definition> getDefinitions(){
        return this.definitions;
    }
    /**
     * getters for the thymes field
     * @return a list of the rhymes 
     */
    public List<String> getRhymes(){
        return this.rhymes;
    }
    /**
     * getter for the synonyms field
     * @return list of the synonyms
     */
    public List<String> getSynonyms(){
        return this.synonyms;
    }

    /**
     * setter for the word field
     * @param word the new word value
     */
    public void setWord(String word){
        this.word = word ;
    }
    /**
     * setter for the definitions field
     * @param definitions the new value for definitions
     */
    public void setDefinitions(List<Definition> definitions){
        this.definitions = definitions;
    }
    /**
     * setter for the length field
     * @param length new value for length
     */
    public void setLength(int length){
        this.length = length;
    }
    /**
     * setter for the rhymes field
     * @param rhymes the new value for rhymes
     */
    public void setRhymes(List<String> rhymes){
        this.rhymes = rhymes;
    }
    /**
     * setter for sysnonyms field
     * @param synonyms new value for synonyms
     */
    public void setSynonyms(List<String> synonyms){
        this.synonyms = synonyms;
    }
}
