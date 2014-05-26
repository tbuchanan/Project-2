class FeedsController < ApplicationController

def create
  @feed = Feed.create(feed_params)
  redirect_to popup_path(feed_params[:popup_id])
end

def destroy 
  feed = Feed.find(params[:id])
  popup = feed.popup
  feed.destroy
  redirect_to popup
end

private
def feed_params
  params.require(:feed).permit(:comment, :popup_id, :user_id)
end

end
