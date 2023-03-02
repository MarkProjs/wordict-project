package com.example;

import com.example.data_structs.Definition;
import com.example.data_structs.Word;
import com.example.data_structs.WordsDictionary;
import com.example.utils.CSVinterpreter;
import com.example.utils.MongoUtil;
import com.mongodb.*;
import com.mongodb.client.*;
import org.bson.*;
import org.bson.types.*;

import java.io.IOException;
import java.util.*;

import javax.swing.plaf.synth.SynthTextAreaUI;
import javax.swing.text.WrappedPlainView;

import org.bson.codecs.pojo.*;
import org.bson.codecs.configuration.*;        
import io.github.cdimascio.dotenv.Dotenv;




/**
 * Population script
 */
public class App 
{
    
    public static void main( String[] args ) throws IOException
    {
        //get filepath for svg and load into the interpreter
        Dotenv dotenv = Dotenv.load();
        String path = dotenv.get("SVG_PATH");
        CSVinterpreter interpreter;
        interpreter = new CSVinterpreter(path);
        System.out.println("FILES LOADED");

        //get raw data and init dictionary
        String[][] data = interpreter.getData();
        WordsDictionary dict = new WordsDictionary();
        
        System.out.println(data.length);
        //loop over every line of svg
        for(int i = 0; i < data.length; i++){

            //get items and adujst word to lower case
            String word = data[i][0];
            word = word.toLowerCase();
            String type = data[i][1];
            String def = data[i][2];
            
            // System.out.println(word);
            // System.out.println(def);
            
            // check if word is already added
            if(!dict.isWordAdded(word)){
                // if no, prepare aditional items and the first definition
                Definition firstDef = new Definition(type, def);
                List<Definition> defs = new ArrayList<Definition>();
                defs.add(firstDef);
                int length = word.length();

                // TODO: add logic for rhymes and synonms
                List<String> listOfRhymes = new ArrayList<String>();
                List<String> listOfSynonms = new ArrayList<String>();

                // create and save word
                Word newWord = new Word(word,length,defs, listOfRhymes, listOfSynonms);
                dict.addWord(newWord);
            }else{
                // if its already added, create aditional Definition
                // and add it to defintions
                Definition newDef = new Definition(type, def);
                dict.getWord(word).getDefinitions().add(newDef);
            }
            //some logging
            if(i % 1000 == 0){
                System.out.println("Lines proccessed: "+i);
            }
        }
        System.out.println("Total words proccessed: "+dict.getWords().size());
        System.out.println("DATA PROCCESED");  

        //finaly save list to db
        saveToDB(dict.getWords());
        System.out.println("CLEEARED DB AND SAVED");
    }
    /**
     * save a list to db
     * @param words list to be saved
     */
    private static void saveToDB(ArrayList<Word> words){
        //setup
        Dotenv dotenv = Dotenv.load();
        String uri = dotenv.get("ATLAS_URI");
        MongoUtil util = new MongoUtil(uri);

        //connect clinet, db and collection
        util.connectClient();
        util.connectDB("test");
        util.connectCollection("wordsv3", Word.class);
        System.out.println("CONNECTED TO DB");

        //get collection
        MongoCollection<Word> coll = (MongoCollection<Word>) util.getCollection();
        //CLEAR COLLECTION AND SAVE ITEMS
        coll.deleteMany(new Document());
        coll.insertMany(words);
    }
}
