class PopupsController < ApplicationController

def index
  @popups = Popup.all
  respond_to do |f|
    f.html { render :index }
    f.json { render json: @popups, :only => [:name, :address, :hours, :expires_at, :price, :description, :image] }
  end
end

def create
  @popup = Popup.new popup_params
  if @popup.save
    respond_to do |f|
      f.html { render :index }
      f.json { render json: @popup, status: :created }
    end
  else
    f.json { render json: @popup.errors, status: :unprocessable_entity }
  end
end

private 

def popup_params
  params.require(:popup).permit(:name, :address, :hours, :expires_at, :price, :description, :image)  
end

end


