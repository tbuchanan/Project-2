class PopupsController < ApplicationController

def index
  @popups = Popup.all
  @popup = Popup.new
  respond_to do |f|
    f.html { render :index }
    f.json { render json: @popups, :only => [:id, :name, :address, :hours, :expires_at, :price, :description, :image] }
  end
end

def create
  @popup = Popup.new popup_params
  @popups = Popup.all
  if @popup.save
    respond_to do |f|
      f.html { render :index }
      f.json { render json: @popup, status: :created }
    end
  else
    f.json { render json: @popup.errors, status: :unprocessable_entity }
  end
end

def show
  @popup = Popup.find(params[:id])
  @feed_new = Feed.new
  # @feed = @popup.feeds
  @feeds = @popup.feeds.all
  @popups = Popup.all
end

private 

def popup_params
  params.require(:popup).permit(:name, :address, :hours, :expires_at, :price, :description, :image, :feeds_attributes => [:comment])  
end

end


