# NFL Visualization

Live Application: [NFL Visualization](https://nflvis2019.herokuapp.com/)

Dataset:
1. [Kaggle NFL Dataset](https://www.kaggle.com/kendallgillies/nflstatistics)
2. [Pro Football Reference](https://www.pro-football-reference.com/)

## Deploying to Heroku

Heroku expects the node application to be at the root of the project, thus we need to use `git subtree` to make `nfl_server` our root.

Command: `git subtree push --prefix nfl_server heroku master`
