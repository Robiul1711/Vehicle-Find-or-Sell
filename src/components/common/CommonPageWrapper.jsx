export const CommonPageWrapper = ({ children, pdy = true }) => {
    return (
        <div className={`section-padding-x section-padding-y border  flex flex-col items-center gap-[45px] xmd:gap-[140px] ${pdy ? '' : ''}`}>
            {children}
        </div>
    );
};
