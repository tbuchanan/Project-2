class PopupsController < ApplicationController

  def index
    @popups = Popup.search_for(params[:q]).where(active: true)
    @popup = Popup.new
    
    respond_to do |f|
      f.html { render :index }
      f.json { render json: @popups, :only => [:id, :name, :address, :hours, :expires_at, :active, :price, :description, :image]}
    end
  end
  
  def create
    @popup = Popup.new popup_params
    binding.pry
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
    # @popup = Popup.find(params[:id])
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
    params.require(:popup).permit(:id, :name, :address, :hours, :expires_at, :active, :price, :description, :image, :longitude, :latitude, :feeds_attributes => [:comment])  
  end

end



