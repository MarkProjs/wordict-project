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

/**
 * Util class to connect to mongo while hiding bollerplate code
 */
public class MongoUtil {
    private MongoClient client;
    private String uri;
    private MongoDatabase db;
    private MongoCollection<?> collection;

    /**
     * save uri to mongo and init
     * @param uri the mongo uri that we want to connect to
     */
    public MongoUtil(String uri){
        this.uri = uri;
    }
    /**
     * connect to the indicated uri and save the lcient obj
     */
    public void connectClient(){
        ConnectionString connectionString = new ConnectionString(this.uri);
        CodecRegistry pojoCodecRegistry = CodecRegistries.fromProviders(PojoCodecProvider.builder().automatic(true).build());
        CodecRegistry codecRegistry = CodecRegistries.fromRegistries(MongoClientSettings.getDefaultCodecRegistry(),pojoCodecRegistry);
        MongoClientSettings clientSettings = MongoClientSettings.builder().applyConnectionString(connectionString).codecRegistry(codecRegistry).build();       
        this.client = MongoClients.create(clientSettings);
    }
    /**
     * connect to the target database
     * and save tge db object
     * @param dbName the name of the target database
     */
    public void connectDB(String dbName){
        this.db = client.getDatabase(dbName);
    }
    /**
     * connect to a collection in the database
     * and provide a class that represent the documents
     * in that collection
     * @param collName name of the target collection
     * @param c type of the class that represent the documents in the collection
     */
    public void connectCollection(String collName, Class<?> c){
        this.collection = this.db.getCollection(collName, c);
    }

    /**
     * getter for the client object
     * @return a client object, null if not initialized
     */
    public MongoClient getClient(){
        return this.client;
    }
    /**
     * getter for the db object
     * @return a databse object, null if not initialized
     */
    public MongoDatabase getDB(){
        return this.db;
    }
    /**
     * getter for the collection object
     * @return a collection object, null if not initialized
     */
    public MongoCollection<?> getCollection(){
        return this.collection;
    }
}
