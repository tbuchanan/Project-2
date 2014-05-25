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
  end

end



