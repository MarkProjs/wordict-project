package com.example;

import com.example.data_structs.Definition;

import static org.junit.Assert.*;

import org.junit.Test;

/**
 * unit tests for the Definition Class
 */
public class DefinitionTest {
    /**
     * Test for Getters
     */
    @Test
    public void testGetters(){
        String DEFINITION = "Sample definition";
        String TYPE = "Sample type";

        Definition test = new Definition(TYPE,DEFINITION);

        assertEquals(TYPE, test.getType() );
        assertEquals(DEFINITION, test.getDefinition() );
    }
    /**
     * Test for Setters
     */
    @Test
    public void testSetters(){
        Definition test = new Definition("","");

        String NEW_DEFINITION = "New definition";
        String NEW_TYPE = "New type";
        test.setType(NEW_TYPE);
        test.setDefinition(NEW_DEFINITION);

        assertEquals(NEW_TYPE, test.getType() );
        assertEquals(NEW_DEFINITION, test.getDefinition() );
    }
}
