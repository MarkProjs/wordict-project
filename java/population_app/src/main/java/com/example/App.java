package com.example;

import com.example.data_structs.Definition;
import com.example.data_structs.Word;
import com.mongodb.*;
import com.mongodb.client.*;
import org.bson.*;
import org.bson.types.*;
import java.util.*;
import org.bson.codecs.pojo.*;
import org.bson.codecs.configuration.*;        
import io.github.cdimascio.dotenv.Dotenv;




/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args )
    {

        Dotenv dotenv = Dotenv.load();
        String url = dotenv.get("ATLAS_URI");
        System.out.println(url);
        ConnectionString connectionString = new ConnectionString(url);
        CodecRegistry pojoCodecRegistry = CodecRegistries.fromProviders(PojoCodecProvider.builder().automatic(true).build());
        CodecRegistry codecRegistry = CodecRegistries.fromRegistries(MongoClientSettings.getDefaultCodecRegistry(),pojoCodecRegistry);
        MongoClientSettings clientSettings = MongoClientSettings.builder().applyConnectionString(connectionString).codecRegistry(codecRegistry).build();       
        MongoClient client = MongoClients.create(clientSettings);
        

        MongoDatabase database = client.getDatabase("test");
        MongoCollection<Word> words = database.getCollection("wordsv3", Word.class);

        Definition d = new Definition("n.","Something");
        List<Definition> def = new ArrayList<Definition>();
        def.add(d);
        List<String> r = new ArrayList<String>();
        List<String> s = new ArrayList<String>();
        Word w1 = new Word("Hello", 5, def, r, s);

        words.insertOne(w1);

        Word w = words.find().first();
        System.out.println(w.getWord());

    }
}
