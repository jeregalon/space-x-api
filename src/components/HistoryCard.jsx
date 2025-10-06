import Card from "./Card"

export default function HistoryCard({ title, article, date, details }) {
  return (
    <Card 
      title={title}
      article={article}
      date={date}
      details={details}
    />
  )
}
