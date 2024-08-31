import './mainPageBanner.css'

function MainPageBanner({ heading, spanHeading }) {
    return (
        <div className='Page-Heading-Container'>
            <h1 className='Page-Heading'>{heading} <span>{spanHeading}</span> </h1>
        </div>
    )
}

export default MainPageBanner;