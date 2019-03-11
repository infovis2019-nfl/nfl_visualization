import sys
import argparse
import os
from utils import csv_helper as csvHelper
from utils import data_helper as dataHelper

if __name__ == "__main__":

    parser = argparse.ArgumentParser(description='Scale columns of a CSV file between 0 and 1')
    parser.add_argument('input_file_name', type=str, help="Name of the input CSV file [.csv included]")
    parser.add_argument('output_file_name', type=str, help='Name of the output CSV file [.csv included]')
    args = parser.parse_args()

    inputFilePath = os.getcwd() + '/pro_football_dataset/players/' + args.input_file_name
    outputFilePath = os.getcwd() + '/pro_football_dataset/players/output_scaled/' + args.output_file_name

    csvReader = csvHelper.readCSV(inputFilePath)
    csvWriter = csvHelper.writeCSV(outputFilePath)

    results = []
    yards = []
    tds = []
    qbr = []
    compPercentages = []
    wins = []
    count = 0
    for line in csvReader:
        results.append(line)
        if count > 1:
            compPercentages.append(float(line[11]))
            yards.append(float(line[12]))
            tds.append(float(line[13]))
            qbr.append(float(line[18]))
            wins.append(float(line[25]))
        count += 1


    normalizedCompPercentage = dataHelper.normalize(compPercentages)
    normalizedYards = dataHelper.normalize(yards)
    normalizedTds = dataHelper.normalize(tds)
    normalizedQBR = dataHelper.normalize(qbr)
    normalizedWins = dataHelper.normalize(wins)

    count = 0
    playerCount = 0
    for row in results:
        if count == 0:
            row.append('Passing')
            row.append('Passing')
            row.append('Passing')
            row.append('Passing')
            row.append('Passing')
            count += 1
        elif count == 1:
            row.append(results[1][11] + '-Normalized')
            row.append(results[1][12] + '-Normalized')
            row.append(results[1][13] + '-Normalized')
            row.append(results[1][18] + '-Normalized')
            row.append(results[1][25] + '-Normalized')
            count += 1
        else:
            row.append(normalizedCompPercentage[playerCount])
            row.append(normalizedYards[playerCount])
            row.append(normalizedTds[playerCount])
            row.append(normalizedQBR[playerCount])
            row.append(normalizedWins[playerCount])
            playerCount += 1
        csvWriter.writerow(row)
