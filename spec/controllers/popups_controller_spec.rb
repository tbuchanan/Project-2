require 'spec_helper'

describe PopupsController, type: :controller do
  # include Devise::TestHelpers

  # def mock_user(stubs={})
  #   @mock_user ||= mock_model(User, stubs).as_null_object
  # end

  # before (:each) do
  #   @user = User.create({email: "mathur7@gmail.com", password: "123456"})
  #   sign_in @user
  # end

describe "GET #index" do
    it "should render index template" do
      get :index
      expect(response).to render_template("index")
    end

    it "should retrieve #all popups" do
      expect(Popup).to receive(:all)
      get :index
    end
  end

  # describe "GET #new" do
  #   it "should render the new form template" do
  #     get :new
  #     expect(response).to render_template("new")
  #   end
  # end

  # describe "POST #create" do
  #   it "should create a popup" do
  #     expect(Popup).to receive(:create).and_return(Popup)
  #     post :create, :popup => {name: "Wesburger", address: "639A divisadero st, san francisco,ca ", description: "burger popup", price: "$$", hours: "6:00 pm - 10:00 pm", image: "http://s3-media4.ak.yelpcdn.com/bphoto/ziMEewBhOMBLHSvHZw4acQ/ls.jpg", day: "Wednesdays", website: "https://www.facebook.com/thewesburger", category: "Food"}
  #   end

  #   it "should redirect after create" do
  #      post :create, :popup => {name: "Wesburger", address: "639A divisadero st, san francisco,ca ", description: "burger popup", price: "$$", hours: "6:00 pm - 10:00 pm", image: "http://s3-media4.ak.yelpcdn.com/bphoto/ziMEewBhOMBLHSvHZw4acQ/ls.jpg", day: "Wednesdays", website: "https://www.facebook.com/thewesburger", category: "Food"}
  #      expect(response).to redirect_to("/popups/:id")
  #   end
  # end

end
