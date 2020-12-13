import React from "react";
import Lottie from "react-lottie";
import FadeIn from "react-fade-in";
import * as legoData from "../lotties/lego.json";
import * as doneData from "../lotties/done.json";

const legoOptions = {
  loop: true,
  autoplay: true,
  animationData: legoData.default,
  rendererSettings: {
    preserveAspectRatio: "xMaxYMid slice",
  },
};

const doneOptions = {
  autoplay: true,
  loop: true,
  animationData: doneData.default,
  rendererSettings: {
    preserveAspectRatio: "xMaxYMid slice",
  },
};

const Loader = (props) => {
  const { loading, loadingText, done } = props;

  return (
    <div className="loader" style={{ marginTop: "1rem" }}>
      <FadeIn>
        {!done && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {
                loading ? (
                    <>
                        <Lottie options={legoOptions} height={120} width={120} style={{ margin: '0' }}/>
                        <span style={{ fontWeight: '500', fontSize: '1.5rem' }}>{loadingText}</span>
                    </>
                ) : (
                    <>
                        <Lottie options={doneOptions} height={40} width={40} style={{ margin: '0' }} />
                        <span style={{ fontWeight: '500', fontSize: '1.5rem' }}>Done</span>
                    </>
                )
            }
          </div>
        )}
      </FadeIn>
    </div>
  );
};

export default Loader;
