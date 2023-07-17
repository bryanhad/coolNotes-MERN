function Title({children, className}: {children: React.ReactNode, className?: string}) {
  return (
    <h1 className={`font-bold text-5xl text-white ${className ? className : ''}`}>
      {children}
    </h1>
  )
}

export default Title
