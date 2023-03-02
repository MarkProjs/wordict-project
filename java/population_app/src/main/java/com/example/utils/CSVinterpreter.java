package com.example.utils;

import java.nio.file.*;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Paths;
import java.util.Collections;
import java.util.List;


/**
 * util class that saves an svg file into
 * 2d string array for processing
 * 
 */
public class CSVinterpreter {
    private String[][] data;
    private String filePath;

    /**
     * gets the data from the file and loads it
     * @param filePath the path to the file
     * @throws IOException
     */
    public CSVinterpreter(String filePath) throws IOException{
        this.filePath = filePath;
        load();
    }
    //loads data
    private void load() throws IOException{
      //get raw data as lines
      List<String> rawData = Files.readAllLines(Paths.get(this.filePath), StandardCharsets.UTF_8);
      //init row and column count
      int rows = rawData.size();
      int columns = rawData.get(0).split("\",\"").length;
      //init 2d array and save data into it
      data = new String[rows][columns];
      for(int i = 0; i < rawData.size(); i++){
        String[] colms = rawData.get(i).split("\",\"");

        //remove the first and last quotes of each line
        colms[0] = colms[0].substring(1);

        String lastItem = colms[colms.length-1];
        lastItem = lastItem.substring(0, lastItem.length() - 1);
        colms[colms.length-1] = lastItem;

        data[i] = colms;
      }
    }
    /**
     * get the 2d array represending the data
     * @return the svg data as a 2d array
     */
    public String[][] getData(){
        return this.data;
    }
    /**
     * get the number of rows in the svg
     * @return the number of rows
     */
    public int getNumberOfRows(){
        return this.data.length;
    }
    /**
     * get the number of columns in the svg
     * @return the number of columns
     */
    public int getNumberOfColumns(){
        return this.data[0].length;
    }
    /**
     * get an item in the indicated row and colums for the 2d array
     * 0 indexed (the first row is row 0, same for columns)
     * @param row the row of the target item
     * @param column the column of the target item
     * @return the target item
     */
    public String getDataAt(int row, int column){
        return data[row][column];
    }
    
}
