import clsx from 'clsx';

const LifetimeBox = (props) => {
    const baseclass = "lifetime-box display-block display-flex flex-column align-items-center justify-items-center p-3 px-8 rounded-xl w-[200px]";
    const propclass = props.className
    const finalclass = clsx(baseclass, propclass);
    return (
        <div className={finalclass}>
            <h2>{props.name}</h2> 
            <h1 className='text-4xl'>{props.amount}</h1>
        </div>
    )
}

export default LifetimeBox;