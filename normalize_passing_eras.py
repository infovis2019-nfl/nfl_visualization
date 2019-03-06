'''
Find out over their careers how much better each quarterback was against the league average

YPG Ratio = Career YPG / Average YPG(of all the seasons they played)

Adjusted Career Yards = YPG Ratio * Games Started * Max YPG Season
'''
import sys
import os
from utils import csv_helper as csvHelper

def findMax(seasonsData, stat):
    stats = [ float(season[stat]) for season in seasonsData]
    return max(stats)
    # return sum(stats) / float(len(stats)) - alternatively we could return the average across all seasons

if __name__ == "__main__":
    seasonsFilePath = os.getcwd() + '/pro_football_dataset/seasons/passing_per_game.csv'
    playersFilePath = os.getcwd() + '/pro_football_dataset/players/cleaned/career_passing_stats.csv'
    outputFilePath = os.getcwd() + '/pro_football_dataset/players/cleaned/adjusted/career_passing_stats.csv'


    csvReaderSeasons = csvHelper.readCSV(seasonsFilePath)
    csvReaderPlayers = csvHelper.readCSV(playersFilePath)
    csvWriter = csvHelper.writeCSV(outputFilePath)

    seasons = []
    for line in csvReaderSeasons:
        seasons.append(line)

    keys = seasons[0]
    seasonsData = [dict(zip(keys, values)) for values in seasons[1:]]

    maxSeason = findMax(seasonsData, 'Y/G')

    players = []
    for line in csvReaderPlayers:
        players.append(line)

    playerCount = 0
    for player in players:
        if playerCount == 0:
            player.append('Passing')
            player.append('Passing')
        elif playerCount == 1:
            player.append('ypgRatio')
            player.append('AdjustedYPG')
        else:
            careerYPG = float(player[24])
            start = int(player[2])
            end = int(player[3]) + 1
            gamesStarted = int(player[8])
            seasonAverage = 0


            for i in range(start, end):
                seasonYPG = next(season for season in seasonsData if season['Year'] == str(i))['Y/G']
                seasonAverage += float(seasonYPG)
            seasonAverage = round(seasonAverage / (end-start), 1)

            # Over their career, how much better were they than the league average
            YPGRatio = round(careerYPG / seasonAverage, 3)
            player.append(YPGRatio)

            # How many yards would they have had if they all played in the same era (accounting for # games played)
            adjustedCareerYPG = round(YPGRatio * maxSeason * gamesStarted, 1)
            player.append(adjustedCareerYPG)
        
        csvWriter.writerow(player)
        playerCount += 1
