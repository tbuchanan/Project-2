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
  if params[:id].to_i != 0
    @popup = Popup.find(params[:id])
    @feed_new = Feed.new
    @feeds = @popup.feeds.all
  else
    @popup = Popup.find_by_name(params[:id])
    @feed_new = Feed.new
    @feeds = @popup.feeds.all
  end
end

private 

def popup_params
  params.require(:popup).permit(:id, :name, :address, :hours, :expires_at, :price, :description, :image, :feeds_attributes => [:comment])  
end

end


