package com.example;

import com.example.data_structs.Definition;
import com.example.data_structs.Word;

import static org.junit.Assert.*;

import java.util.ArrayList;
import java.util.List;


import org.junit.Test;


/**
 * unit tests for the Definition Class
 */
public class WordTest {
    /**
     * Tets for getters
     */
    @Test
    public void testGetters(){
        String WORD = "HELLO";
        int LENGTH = 5;
        Definition d1 = new Definition("","def1");
        Definition d2 = new Definition("","def2");
        List<Definition> DEFINITIONS = new ArrayList<Definition>();
        DEFINITIONS.add(d1);
        DEFINITIONS.add(d2);
        List<String> RHYMES= new ArrayList<String>();
        RHYMES.add("jello");
        RHYMES.add("Bellow");
        List<String> SYNONYMS = new ArrayList<String>();
        SYNONYMS.add("HI");
        SYNONYMS.add("HOLA");

        Word test = new Word(WORD,LENGTH,DEFINITIONS,RHYMES,SYNONYMS);

        assertEquals(WORD, test.getWord());
        assertEquals(LENGTH, test.getLength());
        assertEquals(DEFINITIONS, test.getDefinitions());
        assertEquals(RHYMES, test.getRhymes());
        assertEquals(SYNONYMS, test.getSynonyms());
    }
    /**
     * Test for Setters
     */
    @Test
    public void testSetters(){
        Word TEST = new Word("",0,null,null,null);

        String WORD = "HELLO";
        int LENGTH = 5;
        Definition d1 = new Definition("","def1");
        Definition d2 = new Definition("","def2");
        List<Definition> DEFINITIONS = new ArrayList<Definition>();
        DEFINITIONS.add(d1);
        DEFINITIONS.add(d2);
        List<String> RHYMES= new ArrayList<String>();
        RHYMES.add("jello");
        RHYMES.add("Bellow");
        List<String> SYNONYMS = new ArrayList<String>();
        SYNONYMS.add("HI");
        SYNONYMS.add("HOLA");

        TEST.setWord(WORD);
        TEST.setLength(LENGTH);
        TEST.setDefinitions(DEFINITIONS);
        TEST.setRhymes(RHYMES);
        TEST.setSynonyms(SYNONYMS);

        assertEquals(WORD, TEST.getWord());
        assertEquals(LENGTH, TEST.getLength());
        assertEquals(DEFINITIONS, TEST.getDefinitions());
        assertEquals(RHYMES, TEST.getRhymes());
        assertEquals(SYNONYMS, TEST.getSynonyms());
    }
}
