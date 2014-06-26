require 'spec_helper'

describe "PopupManagements", type: :request do
 
 describe "popups#index" do
  describe "GET /"  do
    it "should be a 200 response" do
      get "/"
      response.status.should be(200)
    end
  end
end

  describe 'GET search' do
    it 'should render search results' do
      get "/popups/search", :q => "W" 
      expect(response.status).to eq(302)
    end
  end

  describe 'GET search' do
    it 'should render search results' do
      get "/popups/search", :geocode => "94110" 
      expect(response.status).to eq(302)
    end
  end

  describe 'GET new' do
    it 'should display page with form for adding new popup' do
      get "/popups/new"
      expect(response.status).to eq(302)
    end
  end

  describe "creating a new popup" do
    it 'renders form and creates a new popup' do
      post "/popups", :popup => {name: "Wesburger", address: "639A divisadero st, san francisco,ca ", description: "burger popup", price: "$$", hours: "6:00 pm - 10:00 pm", image: "http://s3-media4.ak.yelpcdn.com/bphoto/ziMEewBhOMBLHSvHZw4acQ/ls.jpg", day: "Wednesdays", website: "https://www.facebook.com/thewesburger", category: "Food"}
      expect(response.status).to eq(302)
    end
  end

  describe "GET show" do
    it "displays the show page for selected popup" do
      get "/popups/", id: @popup
      expect(response.status).to eq(200)
    end
  end

# describe "popups#index" do
#     describe "Get /popups"  do
#       it "should be a 302 response" do
#         get "/"
#         response.status.should be(302)
#       end
#     end
#   end


end

