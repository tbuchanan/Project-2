class FeedsController < ApplicationController

before_filter :load_popup

  def index
    @feeds = @popup.feeds.all
    @user = current_user
  end

  def new
    @feed = @popup.feeds.new
    @feed = User.find(params[:user_id]).feeds.new(params[:feed])
  end

  def create
    @feed = @popup.feeds.new(feed_params)
    @feed.user_id = current_user.id
    if @feed.save
      redirect_to popup_feeds_path(@popup)
    else
      render 'new'
    end 
  end

  def show
    @feed = @popup.feeds.find(params[:id])
  end

  private
  def feed_params
    params.require(:feed).permit(:comment)
  end
    
  def load_popup
    @popup = Popup.find(params[:popup_id])
  end

end
