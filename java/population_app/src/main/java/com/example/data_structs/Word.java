package com.example.data_structs;


import java.util.List;

public class Word {
    private String word;
    private int length;
    private List<Definition> definitions;
    private List<String> rhymes;
    private List<String> synonyms;

    public Word(){}
    public Word(String word, int length,List<Definition> defs, List<String> rhymes, List<String> synonyms){
        this.word = word;
        this.length = length;
        this.definitions = defs;
        this.rhymes = rhymes;
        this.synonyms = synonyms;
    }

    public String getWord(){
        return this.word;
    }
    public int getLength(){
        return this.length;
    }
    public List<Definition> getDefinitions(){
        return this.definitions;
    }
    public List<String> getRhymes(){
        return this.rhymes;
    }
    public List<String> getSynonyms(){
        return this.synonyms;
    }

    public void setWord(String word){
        this.word = word ;
    }
    public void setDefinitions(List<Definition> definitions){
        this.definitions = definitions;
    }
    public void setLength(int length){
        this.length = length;
    }
    public void setRhymes(List<String> rhymes){
        this.rhymes = rhymes;
    }
    public void setSynonyms(List<String> synonyms){
        this.synonyms = synonyms;
    }
}
