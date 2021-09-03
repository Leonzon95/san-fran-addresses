class Commands::AddressesSearcher
  attr_accessor :q, :filters, :sort_by, :page, :per_page

  def initialize(opts = {})
    self.q = opts[:q] || ''
    self.filters = opts[:filters] || { beds: [0, 9], square_feet: [0, 8000] }
    self.sort_by = opts[:sort_by] || ''
    self.per_page = opts[:per_page] || 25
    self.page = opts[:page] || 1
  end

  def search

    # debugger
    beds_range = filters[:beds][0]..filters[:beds][1]
    square_feet_range = filters[:square_feet][0]..filters[:square_feet][1]
    all_addresses = Address
                      .joins(:house)
                      .includes(:house)
                      .where('street_address ILIKE ? OR city ILIKE ? OR state ILIKE ? OR zip_code ILIKE ?', "%#{q}%", "%#{q}%", "%#{q}%", "%#{q}%")
                      .where(house: { beds: [beds_range], square_feet: [square_feet_range, nil] })
                      .order(sort_by)

    total_count = all_addresses.length

    paginated_addresses = all_addresses.page(page).per(per_page) 

    if (total_count / (per_page * 1.0) % 1.0) == 0
      pages = total_count / per_page
    else
      pages = total_count / per_page + 1 # bug if exact
    end

    if page > pages && pages > 0
      self.page = 1
      return search
    end

    serialized_addresses = paginated_addresses.as_json(include: [:house])

    {
      addresses: serialized_addresses,
      pages: pages,
      page: page,
      total_count: total_count,
    }
  end
end
