require 'spec_helper'

describe Popup do
  
  describe "attributes" do
      before :each do
        @popup = Popup.new
      end
    
    it "should have a name" do
      expect(@popup).to respond_to(:name)
    end

    it "should have a description" do
      expect(@popup).to respond_to(:description)
    end

    it "should have a day" do
      expect(@popup).to respond_to(:day)
    end

    it "should have hours" do
      expect(@popup).to respond_to(:hours)
    end

    it "should have a price" do
      expect(@popup).to respond_to(:price)
    end

    it "should have an address" do
      expect(@popup).to respond_to(:address)
    end

    it "should have a category" do
      expect(@popup).to respond_to(:category)
    end

    it "should have a website" do
      expect(@popup).to respond_to(:website)
    end


  end

end



