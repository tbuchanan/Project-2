# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Popup.create([{name: "James' Jeans", address: "123 main st, san francisco,ca ", description: "get cheap jeans", price: "$", hours: "3:00 pm - 6:00 pm", image: "http://m80.com/wp-content/uploads/2010/08/OldNavyJeans.jpg", expires_at: "June 1, 2014"}])
Popup.create([{name: "Tim's Tacos", address: "456 hunger st, san francisco,ca ", description: "get cheap tacos", price: "$", hours: "3:00 pm - 6:00 pm", image: "http://www.foodpeoplewant.com/wp-content/uploads/2010/03/Tacos-de-Barbacoa.jpg", expires_at: "June 1, 2014"}])
Popup.create([{name: "Miley's Boutique", address: "404 forbidden st, san francisco,ca ", description: "awful designer clothing", price: "$$$", hours: "3:00 pm - 9:00 pm", image: "http://bloximages.newyork1.vip.townnews.com/imarketplace.mn/content/tncms/assets/v3/editorial/3/66/36636b20-37e2-11e2-b9f2-001a4bcf6878/50b3920956387.image.jpg", expires_at: "June 4, 2014"}])
Popup.create([{name: "Breakback Records", address: "200 music st, san francisco,ca ", description: "get free music records", price: "$", hours: "10:00 am - 11:00 am", image: "http://www.dropcards.com/45rpm/images/record.png", expires_at: "June 2, 2014"}])
