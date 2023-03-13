package com.example;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.io.IOException;

import org.junit.Test;

import com.example.utils.CSVinterpreter;

import io.github.cdimascio.dotenv.Dotenv;

/**
 * class to test CSVinterpreter class
 */
public class CSVinterpreterTest {
    /**
     * test using test file
     * @throws IOException
     */
    @Test
    public void test() throws IOException{
        Dotenv dotenv = Dotenv.load();
        String path = dotenv.get("TEST_PATH");

        CSVinterpreter interpreter = new CSVinterpreter(path);

        assertTrue(interpreter.getData() != null);
        assertEquals(2, interpreter.getNumberOfColumns());
        assertEquals(2, interpreter.getNumberOfRows());
        assertEquals("HOLA",interpreter.getDataAt(1, 1));
    }
}
