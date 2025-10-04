const HISTORY_LINK = 'https://api.spacexdata.com/v4/history'
const LAUNCHES_LINK = 'https://api.spacexdata.com/v5/launches'

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