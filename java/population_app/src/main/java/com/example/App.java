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
 * Hello world!
 *
 */
public class App 
{
    
    public static void main( String[] args ) throws IOException
    {
        Dotenv dotenv = Dotenv.load();
        String path = dotenv.get("SVG_PATH");
        CSVinterpreter interpreter;
        interpreter = new CSVinterpreter(path);
        System.out.println("FILES LOADED");

        String[][] data = interpreter.getData();
        WordsDictionary dict = new WordsDictionary();
        
        System.out.println(data.length);
        for(int i = 0; i < data.length; i++){
            String word = data[i][0];
            word = word.toLowerCase();
            String type = data[i][1];
            String def = data[i][2];
            
            // System.out.println(word);
            // System.out.println(def);
            

            if(!dict.isWordAdded(word)){
                Definition firstDef = new Definition(type, def);
                List<Definition> defs = new ArrayList<Definition>();
                defs.add(firstDef);
                int length = word.length();

                // TODO: add logic for rhymes and synonms
                List<String> listOfRhymes = new ArrayList<String>();
                List<String> listOfSynonms = new ArrayList<String>();

                Word newWord = new Word(word,length,defs, listOfRhymes, listOfSynonms);

                dict.addWord(newWord);
            }else{
                Definition newDef = new Definition(type, def);
                dict.getWord(word).getDefinitions().add(newDef);
            }
            if(i % 1000 == 0){
                System.out.println("Lines proccessed: "+i);
            }
        }
        System.out.println("Total words proccessed: "+dict.getWords().size());
        System.out.println("DATA PROCCESED");  
        //saveToDB(dict.getWords());
        System.out.println("CLEEARED DB AND SAVED");
    }

    private static void saveToDB(ArrayList<Word> words){
        //setup
        Dotenv dotenv = Dotenv.load();
        String uri = dotenv.get("ATLAS_URI");
        MongoUtil util = new MongoUtil(uri);
        util.connectClient();
        util.connectDB("test");
        util.connectCollection("wordsv3", Word.class);
        System.out.println("CONNECTED TO DB");

        //DO STUFF
        MongoCollection<Word> client = (MongoCollection<Word>) util.getCollection();
        client.deleteMany(new Document());
        client.insertMany(words);
    }
}
