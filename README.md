# bamazon
Northwestern Coding Bootcamp Spring 2018 Homework Assignment Week12: NodeJS | MySQL | Inquirer & CLI-Table NPM

## Challenge01: bamazoncustomer.js

![capture](https://user-images.githubusercontent.com/35242379/41208257-22f2e62a-6ce7-11e8-8c45-8b981db7dca4.JPG)

![capture](https://user-images.githubusercontent.com/35242379/41208355-2a41544c-6ce8-11e8-8d1a-73afbe1cafe3.JPG)
### Testing Scenario: Attempt to purchase item with insufficient supply on hand.

![image](https://user-images.githubusercontent.com/35242379/41208378-5e33a32c-6ce8-11e8-9762-53915985ff9b.png)
### If the user chooses a quantity <= amount of supply on hand:
1) Allow the transaction to go through.
2) Calculate the cost by multiplying price by quantity.
3) Substract the inventory from the table.
4) Add same calculation to the product_sales column.

![capture](https://user-images.githubusercontent.com/35242379/41208409-bc97ba70-6ce8-11e8-87d2-355dc13dd5be.JPG)
### Sanity check the database GUI to ensure everything worked as scoped.

## Challenge02: bamazonmanager.js
![capture](https://user-images.githubusercontent.com/35242379/41208510-fcec0742-6ce9-11e8-88d5-7eb3713357b3.JPG)
### Menu screen.

![capture](https://user-images.githubusercontent.com/35242379/41208559-79f5a8b0-6cea-11e8-8c6d-3fdbe7de5a91.JPG)
### Display inventory for sale.

![capture](https://user-images.githubusercontent.com/35242379/41208588-d3361540-6cea-11e8-8ae1-454ce0f3ba8d.JPG)
### Inventory < 5

![capture](https://user-images.githubusercontent.com/35242379/41208615-17f3d366-6ceb-11e8-9175-e08900896e76.JPG)
### Replenished inventory of wiper fluid

![capture](https://user-images.githubusercontent.com/35242379/41208637-41940402-6ceb-11e8-88e3-1f177ce25f96.JPG)
### Here we see wiper fluid no longer at 0 but at 10.

![capture](https://user-images.githubusercontent.com/35242379/41208711-c77c2324-6ceb-11e8-9faa-7937b76bf342.JPG)
### Adding new item. The list object from inquirer is not hard coded. Values pull from SQL call to DB.

![image](https://user-images.githubusercontent.com/35242379/41208754-0d1e4c18-6cec-11e8-8064-b06e45b0467d.png)
### Adding the additional required fields. Row committed to the products table.

![image](https://user-images.githubusercontent.com/35242379/41208780-43f1a730-6cec-11e8-9121-a45e1af93361.png)
### Sanity check the DB for accuracy.

## Challenge03: bamazonsupervisor.js

![image](https://user-images.githubusercontent.com/35242379/41208834-8671845e-6cec-11e8-8252-6062bbaea8c0.png)
### Menu view 

![image](https://user-images.githubusercontent.com/35242379/41208851-adedfbfc-6cec-11e8-8d78-2c9f5a8a6bfa.png)
### Using a SQL statement using alias, inner joins, group and order by clauses, and sum and substraction.

![image](https://user-images.githubusercontent.com/35242379/41208906-33a7ebf4-6ced-11e8-858e-00ad5c0f0ee4.png)
### New department Jewelry added to the departments table.

![image](https://user-images.githubusercontent.com/35242379/41208941-66b8386e-6ced-11e8-90f4-6d18d54990f8.png)
### Sanity check the workbench.

Link to GITHUB
#https://github.com/RyanOliverSotto/bamazon



