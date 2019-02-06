import csv

def readCSV(datasetPath):
    csvFile = open(datasetPath, encoding="utf8", newline="")
    csvReader = csv.reader(csvFile)
    return csvReader

def writeCSV(outputFilePath):
    outputFile = open(outputFilePath, 'w', encoding='utf8')
    csvWriter = csv.writer(outputFile, delimiter=',', quoting=csv.QUOTE_MINIMAL)
    return csvWriter