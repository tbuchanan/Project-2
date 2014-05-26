class PopupsController < ApplicationController

def index
  @popups = Popup.search_for(params[:q])
  @popup = Popup.new
  
  respond_to do |f|
    f.html { render :index }
    f.json { render json: @popups, :only => [:id, :name, :address, :hours, :expires_at, :price, :description, :image]}


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

def show
  @popup = Popup.find(params[:id])
  @feed_new = Feed.new
  # @feed = @popup.feeds
  @feeds = @popup.feeds.all
end

private 

def popup_params
  params.require(:popup).permit(:id, :name, :address, :hours, :expires_at, :price, :description, :image, :feeds_attributes => [:comment])  
end

end


