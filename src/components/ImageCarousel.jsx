export function ImageCarousel ({ backgroundImages, activeBckgImg }) {
    return (
        <div className="fixed inset-0 -z-10">
            {
                backgroundImages.map((image, index) => {
                const opacity = index === activeBckgImg
                    ? 100
                    : 0
                return (
                    <div
                    key={index} 
                    className={
                        `absolute inset-0 bg-cover bg-center fade opacity-${opacity} transition-opacity duration-1500 ease-in-out`
                    } 
                    style={{backgroundImage: `url(${image})`}}>
                    </div>
                )})
            }
        </div>
    )
}