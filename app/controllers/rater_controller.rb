class RaterController < ApplicationController

  def create
    if user_signed_in?
      #looks for popup with specified id
      obj = params[:klass].classify.constantize.find(params[:id])
      #calling the rate method on the object created with the specified parameters
      obj.rate params[:score].to_i, current_user, params[:dimension]
      render :json => true
    else
      flash[:notice] = "Please sign in to rate"
      render :json => false
    end
  end

end
