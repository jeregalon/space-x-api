import HistoryCard from './HistoryCard'
import LaunchesCard from './LaunchesCard'
import DragonsCard from './DragonsCard'
import RocketsCard from './RocketsCard'

export function History({ data }) {
    if (!data) return
    return (
        data.map(m => (
            <HistoryCard 
                key={m.id}
                title={m.title}
                article={m.article}
                date={m.date}
                details={m.details}
            />
        ))
    )
}

export function Launches({ data }) {
    if (!data) return
    return (
        data.map(m => (
            <LaunchesCard 
                key={m.id}
                rocketID={m.rocket}
                article={m.article}
                date={m.date}
                details={m.details}
                patch={m.patch}
                success={m.success}
                webcast={m.webcast}
            />
        ))
    )
}

export function Dragons({ data }) {
  if (!data) return null

  return (
    data.map(d => (
        <DragonsCard
        key={d.id}
        name={d.name}
        active={d.active}
        description={d.description}
        diameterInMeters={d.diameterInMeters}
        diameterInFeet={d.diameterInFeet}
        crewCapacity={d.crewCapacity}
        dryMassInKg={d.dryMassInKg}
        dryMassInLb={d.dryMassInLb}
        firstFlight={d.firstFlight}
        image={d.image}
        />
        )
    )
  )
}

export function Rockets({ data }) {
    if (!data) return
    return (
        data.map(m => (
            <RocketsCard 
                key={m.id}
                name={m.name}
                firstFlight={m.firstFlight}
                active={m.active}
                stages={m.stages}
                heightInMeters={m.heightInMeters}
                heightInFeet={m.heightInFeet}
                diameterInMeters={m.diameterInMeters}
                diameterInFeet={m.diameterInFeet}
                massInKg={m.massInKg}
                massInLb={m.massInLb}
                image={m.image}
            />
        ))
    )
}

export default function Info ({ tabId, data }) {
    if (tabId === 0) {
        return <History data={data} />
    } else if (tabId === 1) {
        return <Rockets data={data} />
    } else if (tabId === 2) {
        return <Dragons data={data} />
    } else if (tabId === 3) {
        return <Launches data={data} />
    }
}