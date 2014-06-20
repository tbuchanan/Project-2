class PopupsController < ApplicationController

before_action :authenticate_user!, except: [:index, :show]

  def index
    # @popups = Popup.search_for(params[:q]).where(active: true)
    @popups = Popup.all
    respond_to do |f|
      f.html { render :index }
      f.json { render json: @popups, :only => [:id, :name, :address, :geocode, :longitude, :latitude, :hours, :day, :website, :price, :description, :image, :category]}
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

  def search
    @results = Popup.search_for(params[:q]) || Popup.near(params[:geocode])
    # render json: @results, status: :ok
  end

  def show    
    @popup = Popup.find(params[:id])
    @feed_new = Feed.new
    @feeds = @popup.feeds.all
  end


  def update
    @popup = Popup.find(params[:id])
    @popup.update image_params
    redirect_to :back
  end

private 

  def popup_params
    params.require(:popup).permit(:id, :name, :website, :address, :hours, :day, :category, :price, :description, :image, :longitude, :latitude, :feeds_attributes => [:comment])  
  end

  def image_params
    params.require(:popup).permit(:image)  
  end

end
