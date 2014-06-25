require 'spec_helper'

describe "PopupManagements" do
 
  describe "popups#index" do
    describe "Get /popups"  do
      it "should be a 302 response" do
        get "/"
        response.status.should be(302)
      end
    end
  end

  

end

