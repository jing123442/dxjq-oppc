import R from '@/utils/request'

export async function $importFactoryFile (data) {
  return await R({ url: 'information/lng_liquid_factory_price/imports', method: 'POST', data: data.file })
}

export async function $importListingFile (data) {
  return await R({ url: 'information/lng_revice_station_price/imports', method: 'POST', data: data.file })
}

export async function $importHaiqiFile (data) {
  return await R({ url: 'information/lng_sea_air_price/imports', method: 'POST', data: data.file })
}

export async function $importReceivFile (data) {
  return await R({ url: 'information/lng_pick_up_price/imports', method: 'POST', data: data.file })
}

export async function $importDieselFile (data) {
  return await R({ url: 'information/diesel_oil/imports', method: 'POST', data: data.file })
}

export async function $informationFindItem (data) {
  return await R({ url: 'information/lng_item_info/find', method: 'POST', data })
}

export async function $informationSaveItem (data) {
  return await R({ url: 'information/lng_item_info/save_batch', method: 'POST', data })
}
