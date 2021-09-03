class CreateHouses < ActiveRecord::Migration[6.1]
  def change
    create_table :houses do |t|
      t.string :category
      t.string :location
      t.integer :price_cents
      t.integer :beds
      t.decimal :baths, precision: 2, scale: 1
      t.integer :square_feet
      t.integer :lot_size
      t.integer :year_built
      t.integer :days_on_market
      t.string :status
      t.datetime :next_open_house_start_time
      t.datetime :next_open_house_end_time
      t.string :market_url
      t.decimal :latitude, precision: 10, scale: 6
      t.decimal :longitude, precision: 10, scale: 6
      t.references :address

      t.timestamps
    end
  end
end
