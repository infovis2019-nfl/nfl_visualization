# NFL Visualization

Dataset: [NFL Dataset](https://www.kaggle.com/kendallgillies/nflstatistics)

## matcher.py - Match rows containing a value and output them to a file

#### Instructions
* Create the two folders: `/dataset` and `/dataset/output`
* Extract the CSV files into `/dataset`
* Output file will then be placed into `/dataset/output/`

```
usage: matcher.py [-h]
                  input_file_name output_file_name column_number column_value

Match rows in a CSV file

positional arguments:
  input_file_name   Name of the input CSV file [.csv included]
  output_file_name  Name of the output CSV file [.csv included]
  column_number     CSV Column Number to Match
  column_value      The Value to Match

optional arguments:
  -h, --help        show this help message and exit
  ```

Example:  `python3 matcher.py Career_Stats_Passing.csv Tom_Brady.csv 1 "Brady, Tom"`

## cleaner.py - Clean a specific column and output all lines to a file

```
usage: cleaner.py [-h] input_file_name column_number

Cleaning Columns of a CSV file

positional arguments:
  input_file_name  Name of the input CSV file [.csv included]
  column_number    CSV Column Number to Clean

optional arguments:
  -h, --help       show this help message and exit
```
Example: `python3 cleaner.py career_passing_stats.csv 1`

## TODO:

1. Career stats need to be combined, current career stats are broken up by year
2. Some players are missing, at the very least we should have all of the Hall of Fame Players by position: [HOF Players by Position](https://www.profootballhof.com/heroes-of-the-game/positions/)
    * If necessary season and career stats can be retrieved from: [pro-football-reference](https://www.pro-football-reference.com/)

