import HistoryCard from './HistoryCard'
import LaunchesCard from './LaunchesCard'

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

export default function Info ({ tabId, data }) {
    if (tabId === 0) {
        return <History data={data} />
    } else if (tabId === 1) {
        return <History data={data} />
    } else if (tabId === 2) {
        return <History data={data} />
    } else if (tabId === 3) {
        return <Launches data={data} />
    }
}