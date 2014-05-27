
task :expire => :environment do 
  # if expires_at date is greater than today, active true
  # else if expires_at date is less than todat, active false
  @popups = Popup.where("expires_at < ?", Time.now)
  puts @popups.to_sql
  @popups.each do |popup|
    popup.active = false
    popup.save!
    puts popup.id
  end
end