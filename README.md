# NFL Visualization

Dataset: [NFL Dataset](https://www.kaggle.com/kendallgillies/nflstatistics)

## processor.py

#### Instructions
* Create the two folders: `/dataset` and `/dataset/output`
* Extract the CSV files into `/dataset`
* Output file will then be placed into `/dataset/output/`

```
usage: processor.py [-h]
                    input_file_name output_file_name column_number
                    column_value

Process a CSV file

positional arguments:
  input_file_name   Name of the input CSV file [.csv included]
  output_file_name  Name of the output CSV file [.csv included]
  column_number     CSV Column Number to Match
  column_value      The Value to Match

optional arguments:
  -h, --help        show this help message and exit
  ```

Example:  `python3 processor.py Career_Stats_Passing.csv Tom_Brady.csv 1 "Brady, Tom"`