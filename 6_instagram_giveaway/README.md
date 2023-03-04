# Username Counter 

This is a Node.js program that reads from 20 text files containing a total of 2 million word combinations, and counts the unique usernames and their occurrences. It then provides the following information:
* The total number of unique usernames found in all files
* The number of usernames that exist in all 20 files
* The number of usernames that exist in at least 10 files

## Prerequisites
Before running this program, you should have the following:
* Node.js installed on your system
* 20 text files containing the word combinations (named out0.txt to out19.txt), located in a words/ directory in the same directory as the program

## How to run
1. Open a terminal in the directory where the program is located.
2. Run the following command:
>> npm start
3. The program will output the total number of unique usernames found, the number of usernames that exist in all files, and the number of usernames that exist in at least 10 files.