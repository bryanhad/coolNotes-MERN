function HorizontalBreak({className}:{className?: string}) {
   return <hr className={`border-b-2 border-white rounded-full ${className ? className : ''}`} />
}

export default HorizontalBreak
