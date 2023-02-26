package com.example.utils;

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

public class MongoUtil {
    private MongoClient client;
    private String uri;
    private MongoDatabase db;
    private MongoCollection<?> collection;

    public MongoUtil(String uri){
        this.uri = uri;
    }
    public void connectClient(){
        ConnectionString connectionString = new ConnectionString(this.uri);
        CodecRegistry pojoCodecRegistry = CodecRegistries.fromProviders(PojoCodecProvider.builder().automatic(true).build());
        CodecRegistry codecRegistry = CodecRegistries.fromRegistries(MongoClientSettings.getDefaultCodecRegistry(),pojoCodecRegistry);
        MongoClientSettings clientSettings = MongoClientSettings.builder().applyConnectionString(connectionString).codecRegistry(codecRegistry).build();       
        this.client = MongoClients.create(clientSettings);
    }
    public void connectDB(String dbName){
        this.db = client.getDatabase(dbName);
    }
    public void connectCollection(String collName, Class<?> c){
        this.collection = this.db.getCollection(collName, c);
    }


    public MongoClient getClient(){
        return this.client;
    }
    public MongoDatabase getDB(){
        return this.db;
    }
    public MongoCollection<?> getCollection(){
        return this.collection;
    }
}
