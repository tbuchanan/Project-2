class FeedsController < ApplicationController
before_action :authenticate_user!, except: [:index]
before_filter :load_popup

  def index
    @feeds = @popup.feeds.all
    @user = current_user
  end

  def create
    @feed = @popup.feeds.new(feed_params)
    @feed.user_id = current_user.id
    if @feed.save
      redirect_to popup_path(@popup)
    else
      flash[:notice] = "Not Authorized!"
    end 
  end

  def destroy
    @feed = @popup.feeds.find(params[:id])
    if current_user && current_user.id == @feed.user_id
      @feed.destroy
    else
      flash[:notice] = "Not Authorized!"
    end
    redirect_to popup_path(@popup)
  end

  private
  def feed_params
    params.require(:feed).permit(:comment)
  end
    
  def load_popup
    @popup = Popup.find(params[:popup_id])
  end

end
