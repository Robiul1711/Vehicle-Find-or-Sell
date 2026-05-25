export const CommonPageWrapper = ({ children, pdy = true, className = "" }) => {
    return (
        <div className={`section-padding-x section-padding-y border  flex flex-col  gap-5 md:gap-[45px] ${pdy ? '' : ''} ${className}`}>
            {children}
        </div>
    );
};
