package com.example;

import com.example.data_structs.*;
import com.example.utils.*;
import com.mongodb.client.*;
import org.bson.*;
import java.io.IOException;
import java.util.*;
import io.github.cdimascio.dotenv.Dotenv;

/**
 * Population script
 */
public class App {

    public static void main(String[] args) throws IOException {
        // get filepath for csv and init dict and interpreter
        Dotenv dotenv = Dotenv.load();
        String dirPath = dotenv.get("CSV_PATH");
        CSVinterpreter interpreter;
        WordsDictionary dict = new WordsDictionary();

        for(char alphabet = 'A'; alphabet <='Z'; alphabet++ ){

            //get dat for each letter and save to dict
            System.out.println("Processing letter: "+ alphabet);
            interpreter = new CSVinterpreter(dirPath+"\\"+alphabet+".csv", "\", \"");
            String[][] data = interpreter.getData();
            saveDataToDict(data, dict);
        }

        
        System.out.println("Total words processed: " + dict.getWords().size());
        System.out.println("DATA PROCESSED");

        // finally save list to db
        saveToDB(dict.getWords());
        System.out.println("CLEARED DB AND SAVED");
    }
    /**
     * takes the raw data and saves it to the dict
     * @param data the raw data
     * @param dict the dictionary
     */
    private static void saveDataToDict(String[][] data, WordsDictionary dict) {

        // loop over every line of svg
        for (int i = 0; i < data.length; i++) {
            // get items and adujst word to lower case
            String word = data[i][0];
            word = word.toLowerCase();
            String type = data[i][1];
            String def = data[i][2];

            // System.out.println(word);
            // System.out.println(def);

            // check if word is already added
            if (!dict.isWordAdded(word)) {
                // if no, prepare aditional items and the first definition
                Definition firstDef = new Definition(type, def);
                List<Definition> defs = new ArrayList<Definition>();
                defs.add(firstDef);
                int length = word.length();

                // TODO: add logic for rhymes and synonms
                List<String> listOfRhymes = new ArrayList<String>();
                List<String> listOfSynonms = new ArrayList<String>();

                // create and save word
                Word newWord = new Word(word, length, defs, listOfRhymes, listOfSynonms);
                dict.addWord(newWord);
            } else {
                // if its already added, create aditional Definition
                // and add it to defintions
                Definition newDef = new Definition(type, def);
                dict.getWord(word).getDefinitions().add(newDef);
            }
            // some logging
            if (i % 1000 == 0) {
                System.out.println("Lines processed: " + i+"/"+data.length);
            }
        }

        System.out.println("Lines processed: " + data.length +"/"+data.length);
        System.out.println();
    }

    /**
     * save a list to db
     * 
     * @param words list to be saved
     */
    private static void saveToDB(ArrayList<Word> words) {
        // setup
        Dotenv dotenv = Dotenv.load();
        String uri = dotenv.get("ATLAS_URI");
        MongoUtil util = new MongoUtil(uri);

        // connect client, db and collection
        util.connectClient();
        util.connectDB("test");
        util.connectCollection("wordsv3", Word.class);
        System.out.println("CONNECTED TO DB");

        // get collection
        MongoCollection<Word> coll = (MongoCollection<Word>) util.getCollection();
        // CLEAR COLLECTION AND SAVE ITEMS
        coll.deleteMany(new Document());
        coll.insertMany(words);
    }
}
