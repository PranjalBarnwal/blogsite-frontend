const Loader = () => {
    return (
      <>
        <div className="loader-container">
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </div>
        <style>
          {`
            .loader-container {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 90vh;
              width: 90vw;
            }
            .lds-ripple {
              color: #1c4c5b;
            }
            .lds-ripple,
            .lds-ripple div {
              box-sizing: border-box;
            }
            .lds-ripple {
              display: inline-block;
              position: relative;
              width: 80px;
              height: 80px;
            }
            .lds-ripple div {
              position: absolute;
              border: 4px solid currentColor;
              opacity: 1;
              border-radius: 50%;
              animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
            }
            .lds-ripple div:nth-child(2) {
              animation-delay: -0.5s;
            }
            @keyframes lds-ripple {
              0% {
                top: 36px;
                left: 36px;
                width: 8px;
                height: 8px;
                opacity: 0;
              }
              4.9% {
                top: 36px;
                left: 36px;
                width: 8px;
                height: 8px;
                opacity: 0;
              }
              5% {
                top: 36px;
                left: 36px;
                width: 8px;
                height: 8px;
                opacity: 1;
              }
              100% {
                top: 0;
                left: 0;
                width: 80px;
                height: 80px;
                opacity: 0;
              }
            }
          `}
        </style>
      </>
    );
  };
  
  export default Loader;