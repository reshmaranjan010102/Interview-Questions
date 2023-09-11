# Interview-Questions
This repository contains some Interview Questions and its Solutions

Question no.1 : Write a code in Javascript/Python to create the following functionality on the Backend: -
1. Sorting Code
There are around 1000 users of the website at any point of time during the day. Every User will place an Order, either Buy or Sell, of a specific Token or security. Let's call it Z. Each order has four variables, i.e. Price, timestamp, Buy or Sell and Quantity. The Users are free to alter their orders every minute (or not), so potentially the set of 1000 orders may be updated each minute. You have to write a code which will sort or order these 100 orders (every minute it must automatically update based on changing input variables by the User), on the basis of Price-Time-Quantity priority.
The way Price-Time-Quantity priority will work is as follows;
a) In the beginning, it segregates Buy and Sell orders. Your code should sort the 1000 orders into two tables, one Buy and one Sell (based on their inputs as entered by the 1000 Users).
b) The orders listed on the Buy side should then be sorted based on the 1st priority, i.e. Price. The Buy order with the highest price input must be on top, with those with decreasing Price inputs sorted one after the other downwards (with the least Price at the bottom).
c) If multiple orders have the same Price input, the code should then look for the 2nd priority (i.e. timestamp) to sort those orders within each other, with the earliest one on top followed by the ones with the later timestamps.
d) If multiple orders have identical inputs of both Price and timestamp, then the 3rd priority (quantity) becomes the deciding factor in sorting, with the order having the largest quantity being at the top and decreasing downwards.
e) It is important to note that the 2nd priority for sorting is triggered only if there are multiple orders with the same Price, and the 3rd priority is triggered only if the Price and Timestamp are both the same. So the code must trigger the sorting criteria in order, over and over again every minute while the 1000 users are free to change the values of the input variables.

2. Matching Code
The next code you write should take as input the sorted orders (output of your earlier code) and do the following;
a) It 'looks' at only the Top rows of Buy and Sell columns (of course, every minute the order nos which makes it to the top can potentially change as the Users keep changing their input variables). The code is supposed to identify if the Price input is the same for the top Buy and Sell orders. If it's not, nothing happens and it simply checks the next minute. If yes, it triggers the Trade Executed condition which is described below.
b) The code alters/changes the quantity variable of the Users' orders. The existing quantity of the Buy order is reduced by the Sell order's quantity if the Buy quantity is more than the Sell quantity, and vice-versa. For example, if the orders were (Buy, Rs. 10.5/-, 1:32 pm, 550) & (Sell, Rs. 10.5/-, 12:06 pm, 180), your code should recognize the match in price (Rs. 10.5/-) and alter the orders to (Buy, Rs. 10.5/-, 1:32 pm, 370) & (Sell, Rs. 10.5/-, 12:06 pm, 0).
c) The Sorting Code, from the next minute onwards, should take the altered orders as inputs, where it will disregard the entry with '0' quantity completely, i.e. not accept it as an input at all while sorting, and it should not show up in the output at any place.

3. Executed Code
Write a code which creates a 'Traded order' every time the Matching Code triggers, i.e. a separate order entry will be generated from the Matching Code output and stored in the database permanently. For the example above, assuming the trigger event happened at 3:14 pm, it will look like (Traded, Rs. 10.5/-, 3:14 pm, 180, Buyer: User 41, Seller: Client 862). Essentially, it creates a separate record (which does not go through sorting anymore, but is simply stored in the database forever), of the quantity that has matched in Price, its timestamp, quantity and the identities of Buyer and Seller.

To Run this project:
Step 1 : Create a new project folder.
step 2 : Open the terminal with project directory.
Step 3 : write "npm install express" in terminal to install node module and package.json files.
Step 4 : write "npm install mysql2" for connecting with database.
Step 5 : Add test.js file in your directory.
Step 6 : Make changes in 'database Connection Settings' part in test.js according to your database configuration.
Step 7 : write "node test.js" to run the project.
