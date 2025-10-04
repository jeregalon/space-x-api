import Card from './Card'

export function History({ data }) {
    if (!data) return
    return (
        data.map(m => (
            <Card 
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
            <Card 
                key={m.id}
                title={m.title}
                article={m.article}
                date={m.date}
                details={m.details}
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