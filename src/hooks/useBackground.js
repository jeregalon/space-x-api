import { useState } from 'react'

export default function useBackground () {
    const [activeBckgImg, setActiveBckgImg] = useState(0)

    const backgroundImages = [
        'https://images.unsplash.com/photo-1541185934-01b600ea069c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mnx8fGVufDB8fHx8fA%3D%3D',
        'https://images.alphacoders.com/112/1128962.jpg',
        'https://images.pexels.com/photos/23764/pexels-photo.jpg?cs=srgb&dl=pexels-spacex-23764.jpg&fm=jpg',
        'https://media.idownloadblog.com/wp-content/uploads/2025/09/SpaceX-Starship-render-of-setting-up-civilization.jpg',
        'https://images.unsplash.com/photo-1517976547714-720226b864c1?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Nnx8fGVufDB8fHx8fA%3D%3D',
        'https://wallpapercave.com/wp/wp7239098.png'
    ]

    return { activeBckgImg, setActiveBckgImg, backgroundImages }
}