# E-store front

This project is the front end of an e-store selling milk. It communicates with a backend that handles the orders and merchandise database, which itself is hosted on MongoDB:s Atlas cloud service. 

Currently, it "orders" a product immediately when the button "order" is pressed. This means that it simply updates the database by decreasing the available quantity with what was ordered. Obviously this ought to happen after checkout instead.

This frontend project was made with React & TypeScript. The backend can be found at https://github.com/nHellstrom/milk-backend and was made with ASP Net Core & MongoDB.
