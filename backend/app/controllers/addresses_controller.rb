class AddressesController < ApplicationController

  def index
    opts = {
      q: params[:q],
      filters: params[:filters],
      sort_by: params[:sort_by],
      per_page: params[:per_page].to_i,
      page: params[:page].to_i,
    }

    result = Commands::AddressesSearcher.new(opts).search
    render json: result, status: :ok
  end
end