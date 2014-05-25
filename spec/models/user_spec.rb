require 'spec_helper'

describe User do
  describe "attributes" do
    before :each do
      @user = User.new
    end
    
    it "should have an email" do
      expect(@user).to respond_to(:email)
    end

    it "should have an encrypted password" do
      expect(@user).to respond_to(:encrypted_password)
    end

  end

end
