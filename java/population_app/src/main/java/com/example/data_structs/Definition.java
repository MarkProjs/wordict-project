package com.example.data_structs;


/**
 * A data class representing Definitions of words
 * Templated as is to be used to query from MongoDB
 */
public class Definition {
    private String type;
    private String definition;

    /**
     * getter for the type
     * @return the type of the word
     */
    public String getType(){
        return this.type;
    }
    /**
     * getter for the definition
     * @return the definition of the word
     */
    public String getDefinition(){
        return this.definition;
    }
    /**
     * setter for the type property
     * @param type the new type
     */
    public void setType(String type){
        this.type = type;
    }
    /**
     * setter fot the definition property
     * @param definition the new value for the definition
     */
    public void setDefinition(String definition){
        this.definition = definition;
    }
    /**
     * Parameterless constructor only needed 
     * for mongo db when it translates the json
     * DO NOT USE
     */
    public Definition(){}
    /**
     * To be used to make an instance of the class
     * for testing and db inserting perposes
     * Parameterless constructor only needed 
     * for mongo db when it translates the json
     * @param type
     * @param definition
     */
    public Definition(String type,String definition){
        this.type = type;
        this.definition = definition;
    }
    
    /**
     * override equals method for testing
     */
    @Override
    public boolean equals(Object o) {
 
        // If the object is compared with itself then return true 
        if (o == this) {
            return true;
        }
 
        /* Check if o is an instance of Complex or not
          "null instanceof [type]" also returns false */
        if (!(o instanceof Definition)) {
            return false;
        }
         
        // typecast o to Complex so that we can compare data members
        Definition other = (Definition) o;

        return this.definition.equals(other.definition) && this.type.equals(other.type);
    }
}
