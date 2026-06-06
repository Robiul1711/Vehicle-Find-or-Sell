export const CommonPageWrapper = ({ children, pdy = true, className = "" }) => {
    return (
        <div className={`section-padding-x py-5 sm:py-8 md:py-10 border  flex flex-col  gap-5 md:gap-10 ${pdy ? '' : ''} ${className}`}>
            {children}
        </div>
    );
};
