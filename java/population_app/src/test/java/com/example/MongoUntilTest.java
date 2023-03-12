package com.example;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;

import org.junit.Test;

import com.example.data_structs.Word;
import com.example.utils.MongoUtil;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import io.github.cdimascio.dotenv.Dotenv;

/**
 * Tests for Mongo Until Class
 */
public class MongoUntilTest {
    /**
     * test bad client get
     */
    @Test(expected = ExceptionInInitializerError.class)
    public void testClientGet(){
        MongoUtil util = new MongoUtil("");

        util.getClient();
    }
    /**
     * test bad db get
     */
    @Test(expected = ExceptionInInitializerError.class)
    public void testDbGet(){
        MongoUtil util = new MongoUtil("");

        util.getDB();
    }
    /**
     * test bad collection get
     */
    @Test(expected = ExceptionInInitializerError.class)
    public void testCollGet(){
        MongoUtil util = new MongoUtil("");

        util.getCollection();
    }
    /**
     * Connection test
     */
    @Test
    public void testConnect(){
        
        Dotenv dotenv = Dotenv.load();
        String uri = dotenv.get("ATLAS_URI");
        MongoUtil util = new MongoUtil(uri);

        
        util.connectClient();
        MongoClient client= util.getClient();
        assertFalse(client == null);

        String DB_NAME = "test";
        util.connectDB(DB_NAME);
        MongoDatabase db = util.getDB();
        assertEquals(DB_NAME, db.getName());

        util.connectCollection("wordsv3", Word.class);
        MongoCollection<Word> coll = (MongoCollection<Word>) util.getCollection();
        coll.find();
    }
}
