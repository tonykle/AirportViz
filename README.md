# General Information
This is a simple airport information visualizer application I made while in college. It uses the Federal Aviation Administration (FAA) API (http://services.faa.gov/) to display some information relating to a number of the major US airports. This project was originally done purely in jQuery, but I recently converted it to use React.js on an Express server to display some of my familiarity with more modern web technologies. I did not use a task runner like Grunt because it is quite a small project but I may in the future.

I also recently converted the plain CSS I was using to Sass in order to gain familiary with it.

## To View
1. Make sure git and node are installed on your machine (Mac users: You can check if they are installed by inputting ```node -v``` and ```git --version``` into terminal).
2. Clone this repository by entering the following command ```git clone https://github.com/tonykle/AirportViz.git``` into terminal.
3. Run ```npm install``` in the terminal to install dependencies.
4. Compile the _main.scss file into css.
5. Run ```node server.js``` in the terminal from the root directory in order to run the application on the server.
6. Navigate to the the address displayed in terminal. Should look like ```http://localhost:3000/```
