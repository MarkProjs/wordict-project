package com.example.data_structs;



public class Definition {
    private String type;
    private String definition;

    public String getType(){
        return this.type;
    }
    public String getDefinition(){
        return this.definition;
    }

    public void setType(String type){
        this.type = type;
    }
    public void setDefinition(String definition){
        this.definition = definition;
    }

    public Definition(){}
    public Definition(String type,String definition){
        this.type = type;
        this.definition = definition;
    }
}
