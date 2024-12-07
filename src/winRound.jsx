function WinRound({ state, round, setRoundButton, gameReset }) {
  const nextRoundButton = (
    <button onClick={() => setRoundButton()} className={`winButton ${round}`}>
      Next
    </button>
  );
  const resetGameBtn = (
    <button onClick={() => gameReset()} className={`winButton ${round}`}>
      Replay?
    </button>
  );

  return (
    <>
      <div className="betweenRoundDiv">
        {round === 'thirdRound' ? resetGameBtn : nextRoundButton}
        {round === 'firstRound' && (
          <video className="winVideo" autoPlay muted loop playsInline typeof="video/webm" src="src\assets\win\Triss.webm"></video>
        )}
        {round === 'secondRound' && (
          <video className="winVideo" autoPlay muted loop playsInline typeof="video/webm" src="src\assets\win\Ciri.webm"></video>
        )}
        {round === 'thirdRound' && (
          <video className="winVideo" autoPlay muted loop playsInline typeof="video/webm" src="src\assets\win\Geralt.webm"></video>
        )}
      </div>
    </>
  );
}

export default WinRound;