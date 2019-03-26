import sys
import argparse
import os
from utils import csv_helper as csvHelper
from utils import data_helper as dataHelper

NAME = 1
TARGETS = 9
RECEPTIONS = 10
YARDS = 11
TDS = 13
CATCH = 15
YARDS_PER_TARGET = 16
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
    receptions = []
    yards = []
    tds = []
    catch_per = []
    yards_per_target = []
    count = 0
    for line in csvReader:
        
        results.append(line)
        if count > 1:
            reception = float(line[RECEPTIONS]) if line[RECEPTIONS] else 0
            yard = float(line[YARDS]) if line[YARDS] else 0
            td = float(line[TDS]) if line[TDS] else 0
            target = float(line[TARGETS]) if line[TARGETS] else 1
            catch = float(line[CATCH].strip("%")) if line[CATCH] else 0
            yard_per_target = float(line[YARDS_PER_TARGET]) if line[YARDS_PER_TARGET] else 0
            
            receptions.append(reception)
            yards.append(yard)
            tds.append(td)
            catch_per.append(catch if catch else reception/target)
            yards_per_target.append(yard_per_target if yard_per_target else yard/target)
            print("{} {} {} {} {} {} {} {}".format(count, line[NAME], reception, yard, td, reception/target, yard/target, target))
        count += 1


    normalizedReceptions = dataHelper.normalize(receptions)
    normalizedYards = dataHelper.normalize(yards)
    normalizedTds = dataHelper.normalize(tds)
    normalizedCatch = dataHelper.normalize(catch_per)
    normalizedYPT = dataHelper.normalize(yards_per_target)

    count = 0
    playerCount = 0
    for row in results:
        if count == 0:
            row.append('Receiving')
            row.append('Receiving')
            row.append('Receiving')
            row.append('Receiving')
            row.append('Receiving')
            count += 1
        elif count == 1:
            row.append(results[1][RECEPTIONS] + '-Normalized')
            row.append(results[1][YARDS] + '-Normalized')
            row.append(results[1][TDS] + '-Normalized')
            row.append(results[1][CATCH] + '-Normalized')
            row.append(results[1][YARDS_PER_TARGET] + '-Normalized')
            count += 1
        else:
            row.append(normalizedReceptions[playerCount])
            row.append(normalizedYards[playerCount])
            row.append(normalizedTds[playerCount])
            row.append(normalizedCatch[playerCount])
            row.append(normalizedYPT[playerCount])
            playerCount += 1
        csvWriter.writerow(row)
