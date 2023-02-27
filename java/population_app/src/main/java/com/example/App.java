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
        CSVinterpreter interpreter;
        interpreter = new CSVinterpreter("C:\\Users\\14388\\Documents\\School\\W2023\\wordict\\dictionary.csv");
        System.out.println("FILE LOADED");

        String[][] data = interpreter.getData();
        WordsDictionary dict = new WordsDictionary();
        };

        for(int i = 0; i < data.length; i++){
            if()
        }
        

        //saveToDB();

    }

    private static void saveToDB(ArrayList<Word> words){
        //setup
        Dotenv dotenv = Dotenv.load();
        String uri = dotenv.get("ATLAS_URI");
        MongoUtil util = new MongoUtil(uri);
        util.connectClient();
        util.connectDB("test");
        util.connectCollection("wordsv2", Word.class);
        System.out.println("CONNECTED TO DB");

        //DO STUFF
        MongoCollection<Word> client = (MongoCollection<Word>) util.getCollection();
        client.insertMany(words);
        System.out.println("SAVED");

    }
}
