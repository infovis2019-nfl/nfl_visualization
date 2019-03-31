# NFL Visualization

Live Application: [NFL Visualization](https://nflvis2019.herokuapp.com/)

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

positional arguments:x
  input_file_name   Name of the input CSV file [.csv included]
  output_file_name  Name of the output CSV file [.csv included]
  column_number     CSV Column Number to Match
  column_value      The Value to Match
  ```

Example:  `python3 matcher.py Career_Stats_Passing.csv Tom_Brady.csv 1 "Brady, Tom"`

## cleaner.py - Clean a specific column and output all lines to a file

#### Instructions
* Create the `cleaned` folder: `/pro_football_dataset/players/cleaned/` before running

```
usage: cleaner.py [-h] input_file_name column_number

Cleaning Columns of a CSV file

positional arguments:
  input_file_name  Name of the input CSV file [.csv included]
  column_number    CSV Column Number to Clean
```
Example: `python3 cleaner.py career_passing_stats.csv 1`

## normalize_passing.py - normalize passing stats between 0 and 1
Notes:
* Columns to be normalized have been hard-coded
* Normalized columns are appended to the end of each row

```
usage: normalize_passing.py [-h] input_file_name output_file_name

Scale columns of a CSV file between 0 and 1

positional arguments:
  input_file_name   Name of the input CSV file [.csv included]
  output_file_name  Name of the output CSV file [.csv included]
```

Example: `python3 normalize_passing.py career_passing_stats.csv career_passing_stats_normalized.csv`

## Deploying to Heroku

Heroku expects the node application to be at the root of the project, thus we need to use `git subtree` to make `nfl_server` our root.

Command: `git subtree push --prefix nfl_server heroku master`

## TODO:

### Scatter Plot
1. As we grow the number of players, have an easier way of deselecting them - potentially on double click of dot
