# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_09_01_025402) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "addresses", force: :cascade do |t|
    t.string "street_address"
    t.string "city"
    t.string "state"
    t.string "zip_code"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "houses", force: :cascade do |t|
    t.string "category"
    t.string "location"
    t.integer "price_cents"
    t.integer "beds"
    t.decimal "baths", precision: 2, scale: 1
    t.integer "square_feet"
    t.integer "lot_size"
    t.integer "year_built"
    t.integer "days_on_market"
    t.string "status"
    t.datetime "next_open_house_start_time"
    t.datetime "next_open_house_end_time"
    t.string "market_url"
    t.decimal "latitude", precision: 10, scale: 6
    t.decimal "longitude", precision: 10, scale: 6
    t.bigint "address_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["address_id"], name: "index_houses_on_address_id"
  end

end
