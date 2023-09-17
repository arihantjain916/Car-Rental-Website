// "use client";

const customButton = (props: {
  handleClick?: any;
  containerStyles?: string;
  title: string;
  btnType?: "button" | "submit";
  textStyles?: string;
  Icon?: string;
}) => {
  return (
    <button
      disabled={false}
      type={props.btnType}
      className={`custom-btn ${props.containerStyles}`}
      onClick={props.handleClick}
    >
      <span className="flex-1">{props.title}</span>

      {props.Icon ? (
        <div className="relative w-6 h-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      ) : null}
    </button>
  );
};

export default customButton;
