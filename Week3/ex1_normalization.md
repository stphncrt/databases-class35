1- food_code , food_description columns violate the 1NF since they have multiple values inside.

2- dinner_id together with venue code should form another table.
venue_code together with venue_description should form another table.
food_code together with food_description should form another table.

3- table members(member_id PK,member_name,member_address,dinner_id FK, food_code FK )

    table dinners(dinner_id PK,dinner_date, venue code FK)

    table venues(venue_code PK,venue_description)

    table foods(food_code PK,food_description)
