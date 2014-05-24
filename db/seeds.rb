# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Popup.create([{name: "James' Jeans", address: "123 main st, san francisco,ca ", description: "get cheap jeans", price: "$", hours: "3:00 pm - 6:00 pm", image: "jeans.jpg", expires_at: "June 1, 2014"}])
Popup.create([{name: "Tim's Tacos", address: "456 hunger st, san francisco,ca ", description: "get cheap tacos", price: "$", hours: "3:00 pm - 6:00 pm", image: "tacos.jpg", expires_at: "June 1, 2014"}])
Popup.create([{name: "Miley's Boutique", address: "404 forbidden st, san francisco,ca ", description: "awful designer clothing", price: "$$$", hours: "3:00 pm - 9:00 pm", image: "miley.jpg", expires_at: "June 4, 2014"}])
Popup.create([{name: "Breakback Records", address: "200 music st, san francisco,ca ", description: "get free music records", price: "$", hours: "10:00 am - 11:00 am", image: "record.jpg", expires_at: "June 2, 2014"}])
