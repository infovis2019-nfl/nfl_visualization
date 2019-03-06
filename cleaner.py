import sys
import argparse
import os
from utils import csv_helper as csvHelper

def cleanColumn(line, columnNum):
    value = line[columnNum]
    endIndex = value.find('\\')
    if(endIndex >= 0):
        value = value[0:endIndex]
        line[columnNum] = value
    return line

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Cleaning Columns of a CSV file')
    parser.add_argument('input_file_name', type=str, help='Name of the input CSV file [.csv included]')
    parser.add_argument('column_number', type=int, help='CSV Column Number to Clean')
    args = parser.parse_args()

    inputFilePath = os.getcwd() + '/pro_football_dataset/players/' + args.input_file_name
    outputFilePath = os.getcwd() + '/pro_football_dataset/players/cleaned/' + args.input_file_name

    csvReader = csvHelper.readCSV(inputFilePath)
    csvWriter = csvHelper.writeCSV(outputFilePath)

    for line in csvReader:
        csvWriter.writerow(cleanColumn(line, args.column_number))