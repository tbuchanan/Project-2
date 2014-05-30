# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Popup.create([{name: "Wesburger", address: "639A divisadero st, san francisco,ca ", description: "burger popup", price: "$$", hours: "Wednesdays: 6:00 pm - 10:00 pm", image: "http://s3-media4.ak.yelpcdn.com/bphoto/ziMEewBhOMBLHSvHZw4acQ/ls.jpg", expires_at: "June 4, 2020", website: "https://www.facebook.com/thewesburger" }])
Popup.create([{name: "Bespoke Doughnuts", address: "2344 market st, san francisco,ca ", description: "doughnut popup", price: "$", hours: "8:30 am - 6:00 pm(closed sundays)", image: "http://assets3.thrillist.com/v1/image/1189652/size/tl-horizontal_main", expires_at: "March 2, 2015", website: "https://www.facebook.com/bespokedoughnuts" }])
Popup.create([{name: "Trilogi SF", address: "3066 24th st, san francisco,ca ", description: "thai tapas", price: "$$", hours: "Tuesdays: 6pm - 10pm", image: "http://brandoracollective.com/wp-content/uploads/2014/04/TrilogiSF-4001.jpg", expires_at: "June 2, 2014", website: "https://www.trilogisf.com" }])
Popup.create([{name: "Hapa Ramen", address: "422 haight st, san francisco,ca ", description: "quirky ramen & tacos", price: "$", hours: "Mondays: 6:00pm - 10:00 pm", image: "http://haparamensf.com/images/pic_4bowls.jpg", expires_at: "weekly", website: "https://www.haparamensf.com" }])
Popup.create([{name: "Bolete", address: "198 gough st, san francisco,ca ", description: "5 course meals for $75", price: "$$$", hours: "Mondays: 5:00 pm - 10:00 pm", image: "http://insidescoopsf.sfgate.com/files/2014/04/Big_Boletes_Two-502x600.jpg", expires_at: "December 26, 2015", website: "" }])
