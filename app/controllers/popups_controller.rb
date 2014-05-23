class PopupsController < ApplicationController

def index
  @popups = Popup.all
end


end
