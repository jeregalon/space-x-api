const HISTORY_LINK = 'https://api.spacexdata.com/v4/history'
const LAUNCHES_LINK = 'https://api.spacexdata.com/v5/launches'
const DRAGONS_LINK = 'https://api.spacexdata.com/v4/dragons'
const ROCKETS_LINK = 'https://api.spacexdata.com/v4/rockets'

export const formatCustomDate = (dateString) => {
  const date = new Date(dateString);

  return date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

export async function getChronology() {
  try {
    const res = await fetch(HISTORY_LINK)
    const data = await res.json()
    return data?.map(m => ({
      id: m.id,
      title: m.title,
      article: m.links.article,
      date: m.event_date_utc,
      details: m.details
    }))
  } catch (e) {
    throw new Error(e)
  }
}

export async function getLaunches() {
  try {
    const res = await fetch(LAUNCHES_LINK)
    const data = await res.json()
    return data?.map(m => ({
      id: m.id,
      name: m.name,
      rocket: m.rocket,
      article: m.links.article,
      date: m.date_utc,
      details: m.details,
      patch: m.links.patch.small,
      success: m.success,
      webcast: m.links.webcast
    }))
  } catch (e) {
    throw new Error(e)
  }
}

export async function getDragons() {
  try {
    const res = await fetch(DRAGONS_LINK)
    const data = await res.json()
    return data?.map(m => ({
      id: m.id,
      name: m.name,
      active: m.active,
      description: m.description,
      diameterInMeters: m.diameter.meters,
      diameterInFeet: m.diameter.feet,
      crewCapacity: m.crew_capacity,
      dryMassInKg: m.dry_mass_kg,
      dryMassInLb: m.dry_mass_lb,
      firstFlight: m.first_flight,
      image: m.flickr_images[0]
    }))
  } catch (e) {
    throw new Error(e)
  }
}

export async function getRockets() {
  try {
    const res = await fetch(ROCKETS_LINK)
    const data = await res.json()
    return data?.map(m => ({
      id: m.id,
      name: m.name,
      firstFlight: m.first_flight,
      active: m.active,
      stages: m.stages,
      heightInMeters: m.height.meters,
      heightInFeet: m.height.feet,
      diameterInMeters: m.diameter.meters,
      diameterInFeet: m.diameter.feet,
      massInKg: m.mass.kg,
      massInLb: m.mass.lb,
      image: m.flickr_images[0],
      wikipedia: m.wikipedia,
      description: m.description
    }))
  } catch (e) {
    throw new Error(e)
  }
}

export async function getRocketById(id) {
  try {
    const rockets = await getRockets()
    const identifiedRocket = rockets.find(r => r.id === id)
    return identifiedRocket
  } catch (e) {
    throw new Error(e)
  }
  
}