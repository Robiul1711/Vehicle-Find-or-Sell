export const CommonPageWrapper = ({ children, pdy = true }) => {
    return (
        <div className={`section-padding-x section-padding-y border  flex flex-col  gap-[45px] xmd:gap-[140px] ${pdy ? '' : ''}`}>
            {children}
        </div>
    );
};
