import { useState } from "react"

export default function useTabs() {
    const [activeTab, setActiveTab] = useState(1)

    const moveToTab = (id) => {
        setActiveTab(id)
    }

    return { activeTab,  moveToTab }
}