import sys
import argparse
import os
from utils import csv_helper as csvHelper

def matchValue(line, columnNum, value):
    if(line[columnNum] == value):
        return line

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Match rows in a CSV file')
    parser.add_argument('input_file_name', type=str, help='Name of the input CSV file [.csv included]')
    parser.add_argument('output_file_name', type=str, help='Name of the output CSV file [.csv included]')
    parser.add_argument('column_number', type=int, help='CSV Column Number to Match')
    parser.add_argument('column_value', type=str, help='The Value to Match')
    args = parser.parse_args()

    inputFilePath = os.getcwd() + '/dataset/' + args.input_file_name
    outputFilePath = os.getcwd() + '/dataset/output/' + args.output_file_name

    csvReader = csvHelper.readCSV(inputFilePath)
    csvWriter = csvHelper.writeCSV(outputFilePath)

    lineCount = 0
    for line in csvReader:
        if matchValue(line, args.column_number, args.column_value):
            lineCount += 1
            csvWriter.writerow(line)
    print('{lineCount} rows added to {fileName}'.format(lineCount=lineCount, fileName=args.output_file_name))