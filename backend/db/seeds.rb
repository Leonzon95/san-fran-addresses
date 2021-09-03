REDFIN_HOMES_CSV_HEADERS_ADAPTER = {
  'PROPERTY TYPE' => 'category',
  'ADDRESS' => 'street_address',
  'CITY' => 'city',
  'STATE OR PROVINCE' => 'state',
  'ZIP OR POSTAL CODE' => 'zip_code',
  'PRICE' => 'price_cents',
  'BEDS' => 'beds',
  'BATHS' => 'baths',
  'LOCATION' => 'location',
  'SQUARE FEET' => 'square_feet',
  'LOT SIZE' => 'lot_size',
  'YEAR BUILT' => 'year_built',
  'DAYS ON MARKET' => 'days_on_market',
  'STATUS' => 'status',
  'NEXT OPEN HOUSE START TIME' => 'next_open_house_start_time',
  'NEXT OPEN HOUSE END TIME' => 'next_open_house_end_time',
  'URL (SEE http://www.redfin.com/buy-a-home/comparative-market-analysis FOR INFO ON PRICING)' => 'market_url',
  'LATITUDE' => 'latitude',
  'LONGITUDE' => 'longitude',
}

file = "#{Rails.root}/db/seeds_raw_data/redfin_san_fransico_homes.csv"

index_row = {}

CSV.open(file, 'r') do |csv|
  csv.each_with_index do |row, row_idx|
    if row_idx == 0
      row.each_with_index do |header, header_idx|
        index_row[REDFIN_HOMES_CSV_HEADERS_ADAPTER[header]] = header_idx
      end
    else
      address = Address.create(
        street_address: row[index_row['street_address']],
        city: row[index_row['city']],
        state: row[index_row['state']],
        zip_code: row[index_row['zip_code']],
      )

      House.create(
        price_cents: row[index_row['price_cents']].to_f * 100,
        category: row[index_row['category']],
        beds: row[index_row['beds']],
        baths: row[index_row['baths']],
        location: row[index_row['location']],
        square_feet: row[index_row['square_feet']],
        lot_size: row[index_row['lot_size']],
        year_built: row[index_row['year_built']],
        days_on_market: row[index_row['days_on_market']],
        status: row[index_row['status']],
        next_open_house_start_time: row[index_row['next_open_house_start_time']],
        next_open_house_end_time: row[index_row['next_open_house_end_time']],
        market_url: row[index_row['market_url']],
        latitude: row[index_row['latitude']],
        longitude: row[index_row['longitude']],
        address: address,
      )
    end
  end
end
