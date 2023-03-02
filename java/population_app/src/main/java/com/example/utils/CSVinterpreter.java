package com.example.utils;

import java.nio.file.*;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Paths;
import java.util.Collections;
import java.util.List;


/**
 * util class that saves an svg file into
 */
public class CSVinterpreter {
    private String[][] data;
    private String filePath;

    public CSVinterpreter(String filePath) throws IOException{
        this.filePath = filePath;
        load();
    }
    private void load() throws IOException{
      List<String> rawData = Files.readAllLines(Paths.get(this.filePath), StandardCharsets.UTF_8);
      int rows = rawData.size();
      int columns = rawData.get(0).split("\",\"").length;
      data = new String[rows][columns];
      for(int i = 0; i < rawData.size(); i++){
        String[] colms = rawData.get(i).split("\",\"");
        data[i] = colms;
      }
    }
    public String[][] getData(){
        return this.data;
    }
    public int getNumberOfRows(){
        return this.data.length;
    }
    public int getNumberOfColumns(){
        return this.data[0].length;
    }
    public String getAt(int row, int column){
        return data[row][column];
    }
    
}
