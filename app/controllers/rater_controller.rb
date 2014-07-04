class RaterController < ApplicationController

  def create
    if user_signed_in?
      obj = params[:klass].classify.constantize.find(params[:id])
      obj.rate params[:score].to_i, current_user, params[:dimension]

      render :json => true
    else
      flash[:notice] = "Please sign in to rate"
      render :json => false
    end
  end

end
