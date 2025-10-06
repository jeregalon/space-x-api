import HistoryCard from './HistoryCard'
import LaunchesCard from './LaunchesCard'
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
        return <History data={data} />
    } else if (tabId === 3) {
        return <Launches data={data} />
    }
}