package com.example;

import com.example.data_structs.*;

import static org.junit.Assert.*;


import org.junit.Test;


/**
 * TEST FOR THE wordsDictionary class
 */
public class WordsDictionaryTest {
    /**
     * test added word
     */
    @Test
    public void testCorrectAdd(){
        String WORD = "HELLO";

        WordsDictionary words = new WordsDictionary();
        words.addWord(new Word(WORD,5,null,null,null));

        assertEquals(1, words.getWords().size());
        assertEquals(WORD, words.getWords().get(0).getWord());
    }
    /**
     * test bad add;
     */
    @Test(expected = IllegalArgumentException.class)
    public void testBadAdd(){
        WordsDictionary words = new WordsDictionary();
        Word w = new Word("HELLO",5,null,null,null);
        words.addWord(w);
        words.addWord(w);
    }
    /**
     * Test isWordAdded class
     */
    @Test
    public void testIsWordAdded(){
        WordsDictionary words = new WordsDictionary();
        Word w = new Word("HELLO",5,null,null,null);
        assertFalse(words.isWordAdded(w.getWord()));
        words.addWord(w);
        assertTrue(words.isWordAdded(w.getWord()));
    }
    /**
     * Test good get
     */
    @Test
    public void testGet(){
        WordsDictionary words = new WordsDictionary();
        Word w = new Word("HELLO",5,null,null,null);
        words.addWord(w);

        Word newW = words.getWord(w.getWord());

        assertEquals(w.getWord(), newW.getWord());
    }
    /**
     * TEst bad get
     */
    @Test(expected = IllegalArgumentException.class)
    public void testBadGet(){
        WordsDictionary words = new WordsDictionary();
        Word w = new Word("HELLO",5,null,null,null);

        words.getWord(w.getWord());
    }
}
